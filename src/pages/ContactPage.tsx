import { useState } from 'react';
import { Send, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useSettings } from '../hooks/useSettings';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { api } from '../lib/api';
import { buildWhatsAppLink, generalContactMessage, contactFormFollowUpMessage } from '../lib/whatsapp';
import { FALLBACK_WHATSAPP_NUMBER } from '../lib/constants';
import { Spinner } from '../components/ui/Spinner';

export default function ContactPage() {
  useDocumentTitle('Contact');
  const { settings } = useSettings();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const whatsappLink = buildWhatsAppLink(settings?.whatsappNumber || FALLBACK_WHATSAPP_NUMBER, generalContactMessage());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    setError('');
    try {
      await api.post('/api/contact', { name, contact, message });
      setSent(true);
      // Le message est enregistré côté site ET envoyé directement sur WhatsApp,
      // pour qu'Ophélia le voie tout de suite sans attendre de consulter l'admin.
      const followUpLink = buildWhatsAppLink(
        settings?.whatsappNumber || FALLBACK_WHATSAPP_NUMBER,
        contactFormFollowUpMessage(name, message)
      );
      window.open(followUpLink, '_blank');
      setName('');
      setContact('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Le message n'a pas pu être envoyé");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-surface-50 min-h-screen relative overflow-hidden">
      <div className="absolute top-40 -left-20 w-72 h-72 bg-brand-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-accent-200/40 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-brand-600 text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Un mot pour Ophélia
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-surface-900 mt-2">
            Laisse-moi un message
          </h1>
          <p className="text-surface-500 mt-3">
            Une question, une envie particulière, ou juste envie de dire bonjour — je lis chaque message.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <AnimatedSection animation="slide-in-left" className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border border-surface-100 p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-50 rounded-full" />

              {sent ? (
                <div className="relative text-center py-10 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-surface-900 mb-2">Message bien reçu !</h3>
                  <p className="text-surface-500 max-w-sm mx-auto mb-6">
                    Ton message a été envoyé, et WhatsApp vient de s'ouvrir dans un nouvel onglet
                    pour qu'Ophélia le voie tout de suite — il ne te reste plus qu'à appuyer sur "Envoyer" là-bas.
                  </p>
                  <button onClick={() => setSent(false)} className="text-brand-600 font-semibold text-sm hover:underline">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-5">
                  {error && (
                    <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                      {error}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-surface-700 mb-1.5">
                        Ton prénom *
                      </label>
                      <input
                        id="name"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex : Aïcha"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium text-surface-700 mb-1.5">
                        WhatsApp ou email
                      </label>
                      <input
                        id="contact"
                        className="input-field"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Pour te répondre plus vite"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-surface-700 mb-1.5">
                      Ton message *
                    </label>
                    <textarea
                      id="message"
                      className="input-field resize-none"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Dis-moi tout..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg shadow-brand-500/25 disabled:opacity-60 w-full sm:w-auto"
                  >
                    {sending ? (
                      <Spinner size="sm" className="border-white/30 border-t-white" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-in-right" className="lg:col-span-2">
            <div className="bg-surface-950 rounded-3xl p-8 sm:p-10 text-white h-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-400/40 mb-5">
                  <img src="/brand/logo.png" alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">Réponse plus rapide ?</h3>
                <p className="text-surface-300 text-sm leading-relaxed mb-8">
                  WhatsApp reste le moyen le plus rapide de me joindre — parfait pour les commandes
                  urgentes ou une question précise sur un article.
                </p>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-400 active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                Écrire sur WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
