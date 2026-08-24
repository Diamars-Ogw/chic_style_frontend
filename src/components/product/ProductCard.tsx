import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { formatPrice, getDiscountPercentage, cn } from '../../lib/utils';
import { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { buildWhatsAppLink, productOrderMessage } from '../../lib/whatsapp';
import { FALLBACK_WHATSAPP_NUMBER } from '../../lib/constants';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { settings } = useSettings();
  const [imgLoaded, setImgLoaded] = useState(false);

  const discount = getDiscountPercentage(product.price, product.compareAtPrice);
  const mainImage = product.images?.[0] || '';

  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const number = settings?.whatsappNumber || FALLBACK_WHATSAPP_NUMBER;
    window.open(buildWhatsAppLink(number, productOrderMessage(product)), '_blank');
  };

  return (
    <Link
      to={`/produit/${product.slug}`}
      className="group block opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="bg-white rounded-2xl border border-surface-100 overflow-hidden hover:shadow-xl hover:shadow-brand-200/40 hover:-translate-y-1.5 transition-all duration-300">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-50">
          {!imgLoaded && <div className="absolute inset-0 skeleton rounded-none" />}
          <img
            src={mainImage}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            className={cn(
              'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500',
              !imgLoaded && 'opacity-0'
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {product.badge && (
            <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
              {product.badge}
            </span>
          )}
          {discount > 0 && !product.badge && (
            <span className="absolute top-3 left-3 bg-accent-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
              -{discount}%
            </span>
          )}
          {!product.isAvailable && (
            <span className="absolute top-3 right-3 bg-surface-800 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
              Sur commande
            </span>
          )}

          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleOrder}
              aria-label="Commander via WhatsApp"
              className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center hover:bg-brand-700 hover:scale-110 transition-all shadow-md"
            >
              <MessageCircle className="w-4.5 h-4.5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {product.category && (
            <p className="text-xs font-medium text-brand-600 uppercase tracking-wide mb-1">
              {product.category.name}
            </p>
          )}
          <h3 className="font-semibold text-surface-900 group-hover:text-brand-700 transition-colors line-clamp-1 font-display">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-surface-900">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-surface-400 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
