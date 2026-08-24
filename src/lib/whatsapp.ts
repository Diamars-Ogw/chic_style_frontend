import type { Product } from '../types';

// Construit un lien wa.me avec un message pré-rempli et naturel.
export function buildWhatsAppLink(phoneNumber: string, message: string): string {
  const cleanNumber = (phoneNumber || '').replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function productOrderMessage(product: Product): string {
  return `Bonjour ! Je suis intéressé(e) par cet article vu sur le site Chic Style :\n\n${product.name}${
    product.price ? ` — ${product.price} FCFA` : ''
  }\n\nEst-ce qu'il est toujours disponible ? 😊`;
}

export function sheinLinkMessage(): string {
  return `Bonjour ! J'ai trouvé un article sur SHEIN/Temu que j'aimerais commander. Je vous envoie le lien juste après 🛍️`;
}

export function generalContactMessage(): string {
  return `Bonjour ! Je viens du site Chic Style et j'aimerais avoir quelques informations 😊`;
}
