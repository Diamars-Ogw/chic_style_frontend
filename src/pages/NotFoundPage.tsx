import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Page introuvable');
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4 pt-20">
      <div className="text-center animate-fade-in-up">
        <h1 className="text-8xl font-display font-bold text-brand-200 mb-4">404</h1>
        <h2 className="text-2xl font-display font-semibold text-surface-900 mb-2">Page introuvable</h2>
        <p className="text-surface-500 mb-8 max-w-sm mx-auto">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn-primary gap-2">
          <Home className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
