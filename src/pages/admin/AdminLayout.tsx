import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Package, Tag, Settings, LogOut, MessageSquare, ExternalLink, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

const links = [
  { to: '/admin/produits', label: 'Produits', icon: Package },
  { to: '/admin/categories', label: 'Catégories', icon: Tag },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

export default function AdminLayout() {
  const { admin, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const SidebarContent = (
    <>
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-brand-400/40">
          <img src="/brand/logo.png" alt="" className="w-full h-full object-cover" />
        </div>
        <span className="text-lg font-display font-semibold text-white">Chic Style</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                isActive ? 'bg-brand-600 text-white' : 'text-surface-300 hover:bg-surface-800 hover:text-white'
              )
            }
          >
            <link.icon className="w-4.5 h-4.5" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 pb-6 space-y-1 border-t border-surface-800 pt-4 mt-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-300 hover:bg-surface-800 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4.5 h-4.5" />
          Voir le site
        </a>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-300 hover:bg-red-600/20 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          Déconnexion
        </button>
        {admin && <p className="px-4 text-xs text-surface-500 mt-2 truncate">{admin.email}</p>}
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-surface-50">
      <aside className="hidden lg:flex lg:flex-col w-64 bg-surface-950 flex-shrink-0">{SidebarContent}</aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <aside
            className="w-64 h-full bg-surface-950 flex flex-col animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            {SidebarContent}
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-surface-950">
          <span className="text-white font-display font-semibold">Chic Style · Admin</span>
          <button onClick={() => setSidebarOpen(true)} className="text-white p-2">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>
        <main className="p-4 sm:p-8 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
