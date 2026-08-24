import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { APP_NAME } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { useSettings } from '../../hooks/useSettings';
import { buildWhatsAppLink, generalContactMessage } from '../../lib/whatsapp';

export function Navbar() {
  const location = useLocation();
  const { settings } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/boutique', label: 'Boutique' },
    { to: '/a-propos', label: 'À propos' },
    { to: '/contact', label: 'Contact' },
  ];

  const isTransparent = isHome && !scrolled && !mobileOpen;
  const whatsappLink = settings ? buildWhatsAppLink(settings.whatsappNumber, generalContactMessage()) : '#';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent ? 'bg-transparent py-2' : 'bg-white/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)] py-0'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className={cn(
                'w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 transition-all duration-300 flex-shrink-0',
                isTransparent ? 'ring-white/40' : 'ring-brand-200'
              )}
            >
              <img src="/brand/logo.png" alt={APP_NAME} className="w-full h-full object-cover" />
            </div>
            <span
              className={cn(
                'text-xl sm:text-2xl font-display font-semibold tracking-tight hidden sm:inline',
                isTransparent ? 'text-white' : 'text-surface-900'
              )}
            >
              {APP_NAME}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'text-sm font-medium transition-colors relative py-1',
                  location.pathname === link.to
                    ? isTransparent
                      ? 'text-white after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-white'
                      : 'text-brand-600 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-brand-500'
                    : isTransparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-surface-600 hover:text-brand-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.97] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'md:hidden p-2 -mr-2 rounded-lg transition-colors',
              isTransparent ? 'text-white' : 'text-surface-900'
            )}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-surface-100 shadow-xl animate-fade-in-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  location.pathname === link.to
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-surface-700 hover:bg-surface-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-3 px-4 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold rounded-xl"
            >
              <MessageCircle className="w-4 h-4" />
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
