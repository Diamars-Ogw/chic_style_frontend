import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { ProductGrid } from '../components/product/ProductGrid';
import { cn } from '../lib/utils';
import { SORT_OPTIONS } from '../lib/constants';
import type { SortOption } from '../types';

export default function ShopPage() {
  useDocumentTitle('Boutique');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [sort, setSort] = useState<SortOption>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { categories } = useCategories();
  const { products, loading } = useProducts({ category: activeCategory || undefined });

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [products, sort]);

  const setCategory = (slug: string) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
    setFiltersOpen(false);
  };

  return (
    <div className="pt-28 pb-20 bg-surface-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-brand-600 text-sm font-semibold uppercase tracking-wider">La boutique</span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-surface-900 mt-1">
            Tous les articles
          </h1>
        </div>

        <div className="flex items-center justify-between mb-6 gap-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="md:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-surface-200 rounded-xl text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Catégories
          </button>

          <div className="hidden md:flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                !activeCategory ? 'bg-brand-600 text-white' : 'bg-white text-surface-600 border border-surface-200 hover:border-brand-300'
              )}
            >
              Tout
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.slug)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  activeCategory === cat.slug
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-surface-600 border border-surface-200 hover:border-brand-300'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-4 py-2.5 bg-white border border-surface-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-400"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {filtersOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/40 flex items-end" onClick={() => setFiltersOpen(false)}>
            <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg">Catégories</h3>
                <button onClick={() => setFiltersOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategory('')}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium',
                    !activeCategory ? 'bg-brand-600 text-white' : 'bg-surface-100 text-surface-600'
                  )}
                >
                  Tout
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.slug)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium',
                      activeCategory === cat.slug ? 'bg-brand-600 text-white' : 'bg-surface-100 text-surface-600'
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <ProductGrid products={sorted} loading={loading} />
      </div>
    </div>
  );
}
