export function formatPrice(price: number): string {
  // Prix en Francs CFA (XOF), sans décimales
  return `${new Intl.NumberFormat('fr-FR').format(Math.round(price))} FCFA`;
}

export function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getDiscountPercentage(price: number, compareAt: number | null): number {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
