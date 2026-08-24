import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Upload, Loader2 } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useToast } from '../../context/ToastContext';
import { api } from '../../lib/api';
import { formatPrice, cn } from '../../lib/utils';
import type { Product } from '../../types';
import { Spinner } from '../../components/ui/Spinner';

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  compareAtPrice: string;
  categoryId: string;
  sourceUrl: string;
  badge: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isActive: boolean;
  images: string[];
}

const emptyForm: ProductFormState = {
  name: '',
  description: '',
  price: '',
  compareAtPrice: '',
  categoryId: '',
  sourceUrl: '',
  badge: '',
  isAvailable: true,
  isFeatured: false,
  isActive: true,
  images: [],
};

export default function AdminProducts() {
  const { products, loading, refetch } = useProducts({ adminView: true });
  const { categories } = useCategories();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : '',
      categoryId: product.categoryId || '',
      sourceUrl: product.sourceUrl || '',
      badge: product.badge || '',
      isAvailable: product.isAvailable,
      isFeatured: product.isFeatured,
      isActive: product.isActive,
      images: product.images || [],
    });
    setModalOpen(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await api.upload(file);
      setForm((f) => ({ ...f, images: [...f.images, result.url] }));
      showToast('Image ajoutée');
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Échec de l'upload", 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (idx: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      showToast('Nom et prix sont obligatoires', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        categoryId: form.categoryId || null,
        sourceUrl: form.sourceUrl,
        badge: form.badge,
        isAvailable: form.isAvailable,
        isFeatured: form.isFeatured,
        isActive: form.isActive,
        images: form.images,
      };
      if (editingId) {
        await api.put(`/api/products/${editingId}`, payload);
        showToast('Produit modifié');
      } else {
        await api.post('/api/products', payload);
        showToast('Produit ajouté');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Supprimer "${product.name}" ? Cette action est définitive.`)) return;
    try {
      await api.delete(`/api/products/${product.id}`);
      showToast('Produit supprimé');
      refetch();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      await api.patch(`/api/products/${product.id}/toggle-active`);
      refetch();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-surface-900">Produits</h1>
          <p className="text-surface-500 text-sm mt-1">{products.length} article(s)</p>
        </div>
        <button onClick={openCreate} className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Ajouter un produit
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-surface-500">Aucun produit pour le moment.</div>
      ) : (
        <div className="bg-white rounded-2xl border border-surface-100 overflow-hidden">
          <div className="divide-y divide-surface-100">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 flex-wrap sm:flex-nowrap">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-surface-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-surface-900 truncate">{product.name}</p>
                  <p className="text-sm text-surface-500">
                    {product.category?.name || 'Sans catégorie'} · {formatPrice(product.price)}
                  </p>
                </div>
                <span
                  className={cn(
                    'text-xs font-semibold px-2.5 py-1 rounded-full',
                    product.isActive ? 'bg-green-100 text-green-700' : 'bg-surface-200 text-surface-600'
                  )}
                >
                  {product.isActive ? 'Visible' : 'Masqué'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(product)}
                    className="p-2 rounded-lg hover:bg-surface-100 text-surface-600"
                    title={product.isActive ? 'Masquer' : 'Afficher'}
                  >
                    {product.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => openEdit(product)}
                    className="p-2 rounded-lg hover:bg-surface-100 text-surface-600"
                    title="Modifier"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg my-8 animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-surface-100">
              <h2 className="text-xl font-display font-semibold">
                {editingId ? 'Modifier le produit' : 'Nouveau produit'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-surface-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Nom *</label>
                <input
                  className="input-field"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Description</label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">Prix (FCFA) *</label>
                  <input
                    type="number"
                    className="input-field"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">Prix barré</label>
                  <input
                    type="number"
                    className="input-field"
                    value={form.compareAtPrice}
                    onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Catégorie</label>
                <select
                  className="input-field"
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                >
                  <option value="">Aucune</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Lien de la plateforme d'origine</label>
                <input
                  className="input-field"
                  placeholder="https://shein.com/..."
                  value={form.sourceUrl}
                  onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Badge (optionnel)</label>
                <input
                  className="input-field"
                  placeholder="Ex : Coup de cœur, Populaire..."
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Images</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {form.images.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16">
                      <img src={img} className="w-full h-full object-cover rounded-lg" alt="" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label className="w-16 h-16 rounded-lg border-2 border-dashed border-surface-300 flex items-center justify-center cursor-pointer hover:border-brand-400 transition-colors">
                    {uploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-surface-400" />
                    ) : (
                      <Upload className="w-5 h-5 text-surface-400" />
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                  </label>
                </div>
                <p className="text-xs text-surface-400">
                  Nécessite Cloudinary configuré côté serveur. Sinon, colle une URL d'image directement ci-dessous.
                </p>
                <input
                  className="input-field mt-2"
                  placeholder="Ou colle une URL d'image et appuie sur Entrée"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (value) {
                        setForm((f) => ({ ...f, images: [...f.images, value] }));
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-surface-700">
                  <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                  />
                  Disponible
                </label>
                <label className="flex items-center gap-2 text-sm text-surface-700">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  />
                  Mettre en avant
                </label>
                <label className="flex items-center gap-2 text-sm text-surface-700">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  />
                  Visible sur le site
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1">
                  Annuler
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 gap-2 disabled:opacity-60">
                  {saving ? <Spinner size="sm" className="border-white/30 border-t-white" /> : editingId ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
