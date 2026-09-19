import { MessageCircle } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useSettings } from '../hooks/useSettings';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { buildWhatsAppLink, generalContactMessage } from '../lib/whatsapp';
import { FALLBACK_WHATSAPP_NUMBER } from '../lib/constants';

export default function AboutPage() {
  useDocumentTitle('À propos');
  const { settings } = useSettings();
  const whatsappLink = buildWhatsAppLink(settings?.whatsappNumber || FALLBACK_WHATSAPP_NUMBER, generalContactMessage());

  return (
    <div className="pt-28 pb-24 bg-surface-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-600 text-sm font-semibold uppercase tracking-wider">À propos</span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-surface-900 mt-2">
            L'histoire derrière {settings?.shopName || 'Chic Style'}
          </h1>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
          <AnimatedSection animation="slide-in-left">
            <div className="flex items-center justify-center h-full min-h-[220px]">
              <div className="w-full max-w-[520px] rounded-[2rem] bg-[#f6d7e1] px-8 py-6 shadow-[0_10px_20px_rgba(18,18,18,0.08)] text-center">
                <span className="block text-[2rem] sm:text-[2.4rem] font-display font-semibold text-surface-900 leading-none">
                  {settings?.ownerName || 'Dahounto Ophélia'}
                </span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-in-right">
            <div className="max-w-xl">
              <h2 className="text-2xl font-display font-semibold text-surface-900 mb-4">
                {settings?.ownerName || 'Dahounto Ophélia'}
              </h2>
              <p className="text-surface-600 leading-relaxed mb-4">
                {settings?.ownerBio ||
                  "Passionnée de mode et titulaire d'une licence professionnelle en journalisme, j'ai lancé Chic Style pour permettre à mes clientes de s'habiller stylé sans le stress des commandes en ligne."
                }
              </p>
              <p className="text-surface-600 leading-relaxed">
                Que tu choisisses un article déjà en catalogue ou que tu m'envoies un lien trouvé sur SHEIN,
                Temu ou ailleurs, je m'occupe de tout : commande, réception, groupage et remise. Simple,
                rassurant, et toujours avec le sourire.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="bg-white rounded-3xl p-10 sm:p-14 text-center shadow-sm">
          <h3 className="text-2xl font-display font-semibold text-surface-900 mb-3">Une question ?</h3>
          <p className="text-surface-500 mb-8 max-w-md mx-auto">
            La meilleure façon de me joindre reste WhatsApp — je réponds vite, promis.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 active:scale-[0.98] transition-all shadow-xl shadow-brand-500/20"
          >
            <MessageCircle className="w-5 h-5" />
            M'écrire sur WhatsApp
          </a>
        </AnimatedSection>
      </div>
    </div>
  );
}
