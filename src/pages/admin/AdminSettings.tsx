import { useState, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { useToast } from '../../context/ToastContext';
import { api } from '../../lib/api';
import { Spinner } from '../../components/ui/Spinner';
import type { Settings } from '../../types';

export default function AdminSettings() {
  const { settings, loading, refetch } = useSettings();
  const { showToast } = useToast();
  const [form, setForm] = useState<Partial<Settings>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/api/settings', form);
      showToast('Paramètres enregistrés');
      refetch();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-20 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-display font-semibold text-surface-900 mb-1">Paramètres</h1>
      <p className="text-surface-500 text-sm mb-8">Informations de la boutique affichées sur le site</p>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-surface-100 p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Nom de la boutique</label>
          <input
            className="input-field"
            value={form.shopName || ''}
            onChange={(e) => setForm({ ...form, shopName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Numéro WhatsApp (format international)</label>
          <input
            className="input-field"
            placeholder="22960194915"
            value={form.whatsappNumber || ''}
            onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
          />
          <p className="text-xs text-surface-400 mt-1">Sans + ni espaces. Ex : 229 60 19 49 15 → 22960194915</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Lien d'invitation du groupe WhatsApp</label>
          <input
            className="input-field"
            placeholder="https://chat.whatsapp.com/..."
            value={form.whatsappGroupLink || ''}
            onChange={(e) => setForm({ ...form, whatsappGroupLink: e.target.value })}
          />
          <p className="text-xs text-surface-400 mt-1">
            Depuis WhatsApp : Groupe → Infos du groupe → Inviter via lien. Laisse vide pour masquer le bandeau sur le site.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Phrase d'accueil</label>
          <input
            className="input-field"
            value={form.tagline || ''}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          />
        </div>

        <hr className="border-surface-100" />

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Nom de la propriétaire</label>
          <input
            className="input-field"
            value={form.ownerName || ''}
            onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Présentation personnelle</label>
          <textarea
            className="input-field"
            rows={4}
            value={form.ownerBio || ''}
            onChange={(e) => setForm({ ...form, ownerBio: e.target.value })}
          />
        </div>

        <hr className="border-surface-100" />

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Instagram (lien complet)</label>
          <input
            className="input-field"
            placeholder="https://instagram.com/..."
            value={form.instagram || ''}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">TikTok (lien complet)</label>
          <input
            className="input-field"
            placeholder="https://tiktok.com/@..."
            value={form.tiktok || ''}
            onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Facebook (lien complet)</label>
          <input
            className="input-field"
            placeholder="https://facebook.com/..."
            value={form.facebook || ''}
            onChange={(e) => setForm({ ...form, facebook: e.target.value })}
          />
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto disabled:opacity-60">
          {saving ? <Spinner size="sm" className="border-white/30 border-t-white" /> : 'Enregistrer les paramètres'}
        </button>
      </form>
    </div>
  );
}
