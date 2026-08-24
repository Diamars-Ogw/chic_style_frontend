import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Layout } from './components/layout/Layout';
import { AdminGuard } from './components/layout/AuthGuard';
import { ToastContainer } from './components/ui/ToastContainer';
import { PageSpinner } from './components/ui/Spinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ToastContainer />
          <ErrorBoundary>
            <Suspense fallback={<PageSpinner />}>
              <Routes>
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/boutique" element={<Layout><ShopPage /></Layout>} />
                <Route path="/produit/:slug" element={<Layout><ProductDetailPage /></Layout>} />
                <Route path="/a-propos" element={<Layout><AboutPage /></Layout>} />
                <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                  <Route index element={<AdminProducts />} />
                  <Route path="produits" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="parametres" element={<AdminSettings />} />
                  <Route path="messages" element={<AdminMessages />} />
                </Route>

                <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
