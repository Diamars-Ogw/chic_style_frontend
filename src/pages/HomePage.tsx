import { Link } from 'react-router-dom';
import { MessageCircle, Send, ShoppingBag, PackageCheck, Truck, Heart, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useProducts } from '../hooks/useProducts';
import { useSettings } from '../hooks/useSettings';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { ProductGrid } from '../components/product/ProductGrid';
import { buildWhatsAppLink, sheinLinkMessage } from '../lib/whatsapp';
import { FALLBACK_WHATSAPP_NUMBER } from '../lib/constants';

export default function HomePage() {
  useDocumentTitle();
  const { settings } = useSettings();
  const { products, loading } = useProducts({ featured: true });
  const { products: recentProducts, loading: loadingRecent } = useProducts();

  const whatsappNumber = settings?.whatsappNumber || FALLBACK_WHATSAPP_NUMBER;
  const heroWhatsappLink = buildWhatsAppLink(
    whatsappNumber,
    'Bonjour ! Je découvre votre site et j\u2019aimerais en savoir plus 😊'
  );
  const sheinWhatsappLink = buildWhatsAppLink(whatsappNumber, sheinLinkMessage());

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100svh] sm:min-h-[92vh] flex items-center overflow-hidden bg-surface-950">
        <div className="absolute inset-0">
          <img
            src="/products/produit-09.jpeg"
            alt=""
            className="w-full h-full object-cover object-[center_20%] opacity-35 sm:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/75 to-surface-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-950 sm:via-surface-950/50 via-surface-950/70 to-transparent" />
        </div>

        <div className="absolute top-24 right-6 sm:right-16 w-48 sm:w-72 h-48 sm:h-72 bg-brand-500/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-24 left-6 sm:left-10 w-56 sm:w-80 h-56 sm:h-80 bg-accent-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1.5s' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 w-full">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-brand-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-5 sm:mb-6 animate-fade-in-down">
              <Heart className="w-3.5 h-3.5" />
              {settings?.shopName || 'Chic Style'} · Groupe Shein & Temu
            </span>
            <h1 className="text-[2.25rem] leading-[1.12] sm:text-5xl sm:leading-[1.1] lg:text-6xl font-display font-semibold text-white mb-5 sm:mb-6 animate-fade-in-up stagger-1 opacity-0 text-balance">
              {settings?.tagline || 'Tu trouves l\u2019article. Je m\u2019occupe du reste.'}
            </h1>
            <p className="text-white/70 text-base sm:text-lg mb-8 sm:mb-10 max-w-md animate-fade-in-up stagger-2 opacity-0">
              Vêtements, accessoires, chaussures et petites merveilles beauté — sélectionnés avec soin
              ou commandés spécialement pour toi, avec suivi et livraison assurés.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-in-up stagger-3 opacity-0">
              <Link
                to="/boutique"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 active:scale-[0.98] transition-all shadow-xl shadow-brand-600/30 text-sm sm:text-base"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                Voir la boutique
              </Link>
              <a
                href={heroWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 active:scale-[0.98] transition-all text-sm sm:text-base"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PERSONNELLE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <AnimatedSection animation="slide-in-left">
              <div className="relative max-w-sm mx-auto md:mx-0">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-200 to-accent-200 rounded-[2rem] rotate-3" />
                <img
                  src="/brand/ophelia.jpg"
                  alt={settings?.ownerName || 'La fondatrice de Chic Style'}
                  className="relative w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-right">
              <span className="inline-block text-brand-600 text-sm font-semibold uppercase tracking-wider mb-3">
                Derrière {settings?.shopName || 'Chic Style'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-surface-900 mb-6">
                {settings?.ownerName || 'Dahounto Ophélia'}
              </h2>
              <p className="text-surface-600 text-lg leading-relaxed mb-6">
                {settings?.ownerBio ||
                  "Passionnée de mode et titulaire d'une licence professionnelle en journalisme, j'ai lancé Chic Style pour permettre à mes clientes de s'habiller stylé sans le stress des commandes en ligne. Je m'occupe de tout, de la sélection à la livraison, avec la même rigueur et le même sérieux que dans mon métier."}
              </p>
              <div className="flex items-center gap-3 text-surface-500">
                <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-brand-500" />
                </div>
                <span className="text-sm">Votre satisfaction, notre priorité.</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PRODUITS VEDETTES */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-brand-600 text-sm font-semibold uppercase tracking-wider">Sélection</span>
              <h2 className="text-3xl font-display font-semibold text-surface-900 mt-1">Coups de cœur du moment</h2>
            </div>
            <Link to="/boutique" className="inline-flex items-center gap-1.5 text-brand-600 font-semibold text-sm hover:gap-2.5 transition-all">
              Toute la boutique
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
          <ProductGrid products={(products.length ? products : recentProducts).slice(0, 8)} loading={loading && loadingRecent} />
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-wider">Simple et sans stress</span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-surface-900 mt-2">Comment ça fonctionne</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: 'Choisis ton article',
                text: 'Parcours la boutique, ou trouve un article ailleurs (SHEIN, Temu...) et envoie-moi simplement le lien.',
              },
              {
                icon: MessageCircle,
                title: 'On échange sur WhatsApp',
                text: 'Je confirme la disponibilité, le prix et les délais avec toi, en direct.',
              },
              {
                icon: Truck,
                title: 'Je gère tout le reste',
                text: 'Commande, réception, groupage, et remise ou livraison — tu n\u2019as plus qu\u2019à attendre ton colis.',
              },
            ].map((step, i) => (
              <AnimatedSection key={step.title} delay={`stagger-${i + 1}`} animation="fade-in-up">
                <div className="text-center px-4">
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-surface-900 mb-2">{step.title}</h3>
                  <p className="text-surface-500 text-sm leading-relaxed">{step.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE SHEIN/TEMU */}
      <section className="py-24 bg-gradient-to-br from-brand-600 to-accent-700 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <PackageCheck className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white mb-4">
              Tu as trouvé quelque chose ailleurs ?
            </h2>
            <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto">
              Envoie simplement le lien de l'article vu sur SHEIN, Temu ou une autre plateforme.
              Je m'occupe de la commande, de la réception, et je te tiens informée à chaque étape.
            </p>
            <a
              href={sheinWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-full hover:bg-brand-50 active:scale-[0.98] transition-all shadow-xl"
            >
              <Send className="w-4.5 h-4.5" />
              Envoyer le lien sur WhatsApp
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
