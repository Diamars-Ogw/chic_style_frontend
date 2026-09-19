import { Heart } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useSettings } from '../hooks/useSettings';
import { AnimatedSection } from '../components/ui/AnimatedSection';

export default function AboutPage() {
  useDocumentTitle('À propos');
  const { settings } = useSettings();

  return (
    <main className="min-h-screen bg-white pt-24 pb-24 sm:pt-28 sm:pb-28">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <AnimatedSection>
          <span className="text-sm font-medium uppercase tracking-wide text-pink-500">
            Derrière Chic Style
          </span>

          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-surface-900 sm:text-4xl">
            {settings?.ownerName || 'Dahounto Ophélia'}
          </h1>

          <p className="mt-5 text-base leading-[1.7] text-surface-600 sm:text-[17px]">
            {settings?.ownerBio ||
              "Bienvenue dans votre boutique en ligne Ici, vous trouverez une sélection d’articles de beauté, de soins, de cheveux et de petites choses utiles au quotidien, soigneusement sélectionnés pour vous. Mais notre boutique ne s’arrête pas là… 🪩 Vous cherchez un article précis mais vous ne savez pas où le trouver ? Ne perdez plus votre temps à chercher partout. Envoyez-nous simplement ce que vous recherchez. Nous nous chargeons de le rechercher pour vous et de vous proposer une solution. Vous cherchez, nous trouvons. Vous commandez, nous nous occupons du reste. 💕 Votre petite envie, votre besoin du quotidien ou cet article que vous cherchez depuis longtemps : dites-nous simplement ce qu’il vous faut."}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50">
              <Heart className="h-5 w-5 fill-transparent text-pink-500" strokeWidth={1.8} />
            </span>
            <span className="text-sm text-surface-500">Votre satisfaction, notre priorité.</span>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
