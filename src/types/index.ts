export interface Admin {
  id: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  displayOrder: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  categoryId: string | null;
  sourceUrl?: string | null;
  badge?: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category | null;
}

export interface Settings {
  id: string;
  shopName: string;
  whatsappNumber: string;
  whatsappGroupLink?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  facebook?: string | null;
  tagline?: string | null;
  ownerName?: string | null;
  ownerBio?: string | null;
  ownerPhotoUrl?: string | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  contact: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';
