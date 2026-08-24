import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { APP_NAME } from '../../lib/constants';
import { Spinner } from '../../components/ui/Spinner';

export default function AdminLoginPage() {
  useDocumentTitle('Connexion admin');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950 px-4">
      <div className="absolute top-20 left-20 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 animate-fade-in-up">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-semibold text-surface-900">{APP_NAME} · Admin</span>
        </div>

        <h1 className="text-2xl font-display font-semibold text-surface-900 mb-1 text-center">Espace boutique</h1>
        <p className="text-surface-500 text-center mb-8 text-sm">Connecte-toi pour gérer tes produits</p>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="admin@chicstyle.bj"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-surface-700 mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-surface-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 text-sm gap-2 disabled:opacity-60">
            {loading ? (
              <Spinner size="sm" className="border-white/30 border-t-white" />
            ) : (
              <>
                Se connecter
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
