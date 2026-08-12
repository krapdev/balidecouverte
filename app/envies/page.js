import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import RetourLien from "@/components/RetourLien";
import RevealObserver from "@/components/RevealObserver";
import Activites from "@/components/Activites";

/**
 * Les envies — la liste des activités, sur sa propre page.
 *
 * Elle vivait sur l'accueil, sous une fourche qui prétendait faire
 * choisir entre elle et le circuit tout en déroulant les deux
 * immédiatement. Ce n'était pas un choix, c'était un sommaire posé
 * au-dessus de son propre contenu.
 *
 * Ce qui rend ce déplacement possible sans rien casser : **le magasin
 * vit dans le gabarit** (`app/layout.js`). Cocher une place ici et
 * revenir au formulaire traverse une navigation ; un provider posé dans
 * une page aurait été recréé à vide en route.
 *
 * La barre mobile est reprise telle quelle : c'est elle qui montre le
 * compte des envies et qui ramène au formulaire une fois qu'on a coché.
 */

export const metadata = {
  /* 55 caractères avec le suffixe du gabarit ; il en faisait 76, donc
     vingt de tronqués dans les résultats. « Les envies » est le mot du
     site, pas celui qu'on cherche — ce qu'on cherche venait après. */
  title: "Classiques de Bali et places secrètes",
  description:
    "Les sites qu'on vient chercher à Bali, et les endroits qu'Agus Yudiarta est à peu près seul à montrer. Cochez, il en fait un itinéraire.",
  alternates: { canonical: "/envies" },
  /* ⚠️ Déclarer `openGraph` dans une page **remplace** celui du layout,
     il ne le complète pas — /tarifs y avait perdu son type et son image
     sans que rien ne le signale. */
  openGraph: {
    type: "article",
    locale: "fr_FR",
    url: "/envies",
    siteName: "Bali Découverte",
    title: "Classiques de Bali et places secrètes",
    description:
      "Les classiques, et les endroits qu'Agus est à peu près seul à montrer.",
    /* ⚠️ **`images` doit être redonnée** : déclarer `openGraph` remplace
       celui du gabarit, il ne le complète pas. */
    images: ["/opengraph-image.png"],
  },
};

export default function PageEnvies() {
  return (
    <>
      <RevealObserver />
      <Navbar />
      <main className="flex-1">
        <div className="shell pb-[clamp(1rem,3vw,1.5rem)] pt-[clamp(5.5rem,12vw,7rem)]">
          <RetourLien />
        </div>
        {/* `niveau={1}` : c'est le titre du document, pas une section
            parmi d'autres. Le niveau se choisit par la place dans le
            document, jamais par la taille voulue. */}
        <Activites niveau={1} />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
