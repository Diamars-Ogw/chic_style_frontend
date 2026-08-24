# Chic Style — Frontend

Site public + espace admin pour la boutique Chic Style. React 18 + TypeScript + Vite + Tailwind.

Voir le `README.md` à la racine du projet complet pour les instructions de déploiement (Render).

## Démarrage rapide

```bash
cp .env.example .env
# renseigne VITE_API_URL avec l'URL de l'API backend
npm install
npm run dev
```

Le site tourne alors sur http://localhost:5173, et l'admin sur http://localhost:5173/admin/login.

## Structure

```
src/
  components/   Navbar, Footer, cartes produits, éléments d'UI réutilisables
  pages/        Accueil, Boutique, Fiche produit, À propos, Contact + pages /admin
  hooks/        Récupération des produits, catégories, paramètres depuis l'API
  context/      Auth admin, notifications (toasts)
  lib/          Client API, helpers WhatsApp, utilitaires
```
