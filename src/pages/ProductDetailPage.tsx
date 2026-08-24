import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ChevronLeft, ExternalLink, Truck, ShieldCheck } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useSettings } from '../hooks/useSettings';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice, getDiscountPercentage, cn } from '../lib/utils';
import { buildWhatsAppLink, productOrderMessage } from '../lib/whatsapp';
import { FALLBACK_WHATSAPP_NUMBER } from '../lib/constants';
import { PageSpinner } from '../components/ui/Spinner';
import { ProductGrid } from '../components/product/ProductGrid';
import { useProducts } from '../hooks/useProducts';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading } = useProduct(slug);
  const { settings } = useSettings();
  const [activeImage, setActiveImage] = useState(0);

  useDocumentTitle(product?.name);

  const { products: related } = useProducts({ category: product?.category?.slug });

  if (loading) return <PageSpinner />;

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <p className="text-surface-500 mb-4">Cet article n'existe pas ou n'est plus disponible.</p>
        <Link to="/boutique" className="text-brand-600 font-semibold">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const discount = getDiscountPercentage(product.price, product.compareAtPrice);
  const images = product.images?.length ? product.images : [''];
  const whatsappLink = buildWhatsAppLink(settings?.whatsappNumber || FALLBACK_WHATSAPP_NUMBER, productOrderMessage(product));

  return (
    <div className="pt-28 pb-20 bg-surface-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/boutique" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-brand-600 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Retour à la boutique
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-sm mb-4">
              <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-accent-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  -{discount}%
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors',
                      activeImage === i ? 'border-brand-500' : 'border-transparent'
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {product.category && (
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
                {product.category.name}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-display font-semibold text-surface-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-surface-900">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-surface-400 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
              <span
                className={cn(
                  'ml-2 px-3 py-1 rounded-full text-xs font-semibold',
                  product.isAvailable ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                )}
              >
                {product.isAvailable ? 'Disponible' : 'Sur commande'}
              </span>
            </div>

            {product.description && (
              <p className="text-surface-600 leading-relaxed mb-8">{product.description}</p>
            )}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 active:scale-[0.98] transition-all shadow-xl shadow-brand-500/25 mb-4"
            >
              <MessageCircle className="w-5 h-5" />
              Commander via WhatsApp
            </a>

            {product.sourceUrl && (
              <a
                href={product.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-brand-600 transition-colors mb-8"
              >
                Voir la source d'origine
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-surface-200">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-surface-900">Livraison suivie</p>
                  <p className="text-xs text-surface-500">Groupage et remise organisés avec toi</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-surface-900">Achat en confiance</p>
                  <p className="text-xs text-surface-500">Suivi personnalisé à chaque étape</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.filter((p) => p.id !== product.id).length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-display font-semibold text-surface-900 mb-8">Tu pourrais aussi aimer</h2>
            <ProductGrid products={related.filter((p) => p.id !== product.id).slice(0, 4)} />
          </div>
        )}
      </div>
    </div>
  );
}
