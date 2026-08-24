import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Music2, Facebook, Users, Heart } from 'lucide-react';
import { APP_NAME, FALLBACK_WHATSAPP_NUMBER } from '../../lib/constants';
import { useSettings } from '../../hooks/useSettings';
import { buildWhatsAppLink, generalContactMessage } from '../../lib/whatsapp';

export function Footer() {
  const { settings } = useSettings();
  const whatsappLink = buildWhatsAppLink(settings?.whatsappNumber || FALLBACK_WHATSAPP_NUMBER, generalContactMessage());

  const socials = [
    settings?.instagram && { href: settings.instagram, icon: Instagram, label: 'Instagram' },
    settings?.tiktok && { href: settings.tiktok, icon: Music2, label: 'TikTok' },
    settings?.facebook && { href: settings.facebook, icon: Facebook, label: 'Facebook' },
  ].filter(Boolean) as { href: string; icon: typeof Instagram; label: string }[];

  return (
    <footer className="relative bg-surface-950 text-white overflow-hidden">
      {/* Liseré doré façon logo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-accent-600/10 rounded-full blur-3xl" />

      {/* Bandeau groupe WhatsApp */}
      {settings?.whatsappGroupLink && (
        <div className="relative border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-gradient-to-r from-brand-600/20 to-accent-600/20 border border-brand-500/20 rounded-3xl px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-brand-300" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-white">Rejoins le groupe WhatsApp</h3>
                  <p className="text-sm text-surface-300 mt-0.5">
                    Promos, nouveautés et clôtures de commandes, en avant-première.
                  </p>
                </div>
              </div>
              <a
                href={settings.whatsappGroupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white text-sm font-semibold rounded-full hover:bg-brand-400 active:scale-[0.97] transition-all shadow-lg shadow-brand-500/20 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Rejoindre le groupe
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand-400/40">
                <img src="/brand/logo.png" alt={APP_NAME} className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-display font-semibold">{settings?.shopName || APP_NAME}</span>
            </Link>
            <p className="text-surface-400 text-sm leading-relaxed max-w-xs">
              {settings?.tagline || 'Tu trouves l\u2019article. Je m\u2019occupe du reste.'}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.15em] mb-5 text-brand-300/80">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/boutique', label: 'Boutique' },
                { to: '/a-propos', label: 'À propos' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-surface-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.15em] mb-5 text-brand-300/80">
              Restons connectées
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-surface-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {settings?.shopName || APP_NAME}. Tous droits réservés.
          </p>
          <p className="text-xs text-surface-600 flex items-center gap-1.5">
            Fait avec <Heart className="w-3 h-3 text-brand-500 fill-brand-500" /> pour ses clientes
          </p>
        </div>
      </div>
    </footer>
  );
}
