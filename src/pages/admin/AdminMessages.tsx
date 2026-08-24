import { useEffect, useState, useCallback } from 'react';
import { Mail, MailOpen, Trash2, Phone } from 'lucide-react';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';
import { Spinner } from '../../components/ui/Spinner';
import { cn, formatDateTime } from '../../lib/utils';
import type { ContactMessage } from '../../types';

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get<ContactMessage[]>('/api/contact');
      setMessages(data);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleRead = async (msg: ContactMessage) => {
    try {
      await api.patch(`/api/contact/${msg.id}/toggle-read`);
      fetchMessages();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    }
  };

  const handleDelete = async (msg: ContactMessage) => {
    if (!confirm('Supprimer ce message ?')) return;
    try {
      await api.delete(`/api/contact/${msg.id}`);
      showToast('Message supprimé');
      fetchMessages();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold text-surface-900">Messages</h1>
          <p className="text-surface-500 text-sm mt-1">
            {messages.length} message(s){unreadCount > 0 && ` · ${unreadCount} non lu(s)`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-surface-500">Aucun message reçu pour le moment.</div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'bg-white rounded-2xl border p-5 transition-colors',
                msg.isRead ? 'border-surface-100' : 'border-brand-200 bg-brand-50/30'
              )}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-surface-900">{msg.name}</p>
                    {!msg.isRead && <span className="w-2 h-2 rounded-full bg-brand-500" />}
                  </div>
                  {msg.contact && (
                    <p className="text-xs text-surface-500 flex items-center gap-1 mb-2">
                      <Phone className="w-3 h-3" />
                      {msg.contact}
                    </p>
                  )}
                  <p className="text-surface-700 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-xs text-surface-400 mt-2">{formatDateTime(msg.createdAt)}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleRead(msg)}
                    className="p-2 rounded-lg hover:bg-surface-100 text-surface-600"
                    title={msg.isRead ? 'Marquer non lu' : 'Marquer lu'}
                  >
                    {msg.isRead ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(msg)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
