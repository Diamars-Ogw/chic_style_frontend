import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <div className="skeleton aspect-[4/5] rounded-none" />
            <div className="p-4 space-y-2">
              <div className="skeleton h-3 w-1/2" />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <PackageSearch className="w-14 h-14 text-surface-300 mb-4" />
        <p className="text-surface-500">Aucun article ici pour le moment.</p>
        <p className="text-surface-400 text-sm mt-1">Reviens un peu plus tard, de nouveaux articles arrivent souvent ✨</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
