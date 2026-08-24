export const APP_NAME = 'Chic Style';

// Numéro de secours si jamais les paramètres n'ont pas pu être chargés depuis l'API
// (évite que les boutons WhatsApp deviennent des liens morts en cas de souci réseau/API)
export const FALLBACK_WHATSAPP_NUMBER = '22960194915';

export const ITEMS_PER_PAGE = 12;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Nouveautés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name', label: 'Nom : A-Z' },
] as const;
