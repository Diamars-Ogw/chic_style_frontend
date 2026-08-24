import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageSpinner } from '../ui/Spinner';

// Protège les routes /admin/* : redirige vers /admin/login si aucun admin connecté.
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageSpinner />;
  if (!admin) return <Navigate to="/admin/login" state={{ from: location }} replace />;

  return <>{children}</>;
}
