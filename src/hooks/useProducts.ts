import { useEffect, useState, useCallback } from 'react';
import { api } from '../lib/api';
import type { Product } from '../types';

interface UseProductsOptions {
  category?: string;
  featured?: boolean;
  adminView?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (options.category) params.set('category', options.category);
      if (options.featured) params.set('featured', '1');
      if (options.adminView) params.set('all', '1');
      const data = await api.get<Product[]>(`/api/products?${params.toString()}`);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement des produits');
    } finally {
      setLoading(false);
    }
  }, [options.category, options.featured, options.adminView]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api
      .get<Product>(`/api/products/${slug}`)
      .then(setProduct)
      .catch((err) => setError(err instanceof Error ? err.message : 'Produit introuvable'))
      .finally(() => setLoading(false));
  }, [slug]);

  return { product, loading, error };
}
