import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';
import { useToast } from '../../context/ToastContext';
import { api } from '../../lib/api';
import type { Category } from '../../types';
import { Spinner } from '../../components/ui/Spinner';

export default function AdminCategories() {
  const { categories, loading, refetch } = useCategories();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/api/categories/${editingId}`, { name, description });
        showToast('Catégorie modifiée');
      } else {
        await api.post('/api/categories', { name, description });
        showToast('Catégorie ajoutée');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Supprimer la catégorie "${cat.name}" ? Les produits associés resteront mais sans catégorie.`)) return;
    try {
      await api.delete(`/api/categories/${cat.id}`);
      showToast('Catégorie supprimée');
      refetch();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-surface-900">Catégories</h1>
          <p className="text-surface-500 text-sm mt-1">{categories.length} catégorie(s)</p>
        </div>
        <button onClick={openCreate} className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-surface-100 overflow-hidden divide-y divide-surface-100">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-4 p-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-surface-900">{cat.name}</p>
                {cat.description && <p className="text-sm text-surface-500 truncate">{cat.description}</p>}
              </div>
              <button onClick={() => openEdit(cat)} className="p-2 rounded-lg hover:bg-surface-100 text-surface-600">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(cat)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-surface-100">
              <h2 className="text-xl font-display font-semibold">{editingId ? 'Modifier' : 'Nouvelle catégorie'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-surface-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Nom *</label>
                <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Description</label>
                <textarea className="input-field" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1">
                  Annuler
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
                  {saving ? <Spinner size="sm" className="border-white/30 border-t-white" /> : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
