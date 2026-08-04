import { NOM_SITE } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Tarifs from "@/components/Tarifs";
import RetourLien from "@/components/RetourLien";
import Footer from "@/components/Footer";
import DonneesStructurees from "@/components/DonneesStructurees";
import RevealObserver from "@/components/RevealObserver";

const DESCRIPTION_TARIFS =
  "Le tarif d'Agus Yudiarta, guide privé francophone à Bali : à la journée et par véhicule, en circuit, ou à Nusa Penida. Ce qui est compris, ce qui ne l'est pas.";

export const metadata = {
  /* Titre court : le gabarit du layout ajoute la marque. */
  title: "Tarifs",
  description: DESCRIPTION_TARIFS,
  alternates: { canonical: "/tarifs" },
  /* Sans ce bloc, la page héritait des Open Graph de l'accueil : un lien
     vers les tarifs partagé sur Facebook ou WhatsApp annonçait « Guide
     privé francophone à Bali » et la description de l'accueil.
     ⚠️ Déclarer `openGraph` ici **remplace** celui du layout au lieu de
     le compléter : `type` et `images` doivent être redonnés, sinon la
     page perd son type et son image de partage — vérifié, ils étaient
     bien tombés à `null`. */
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/tarifs",
    siteName: NOM_SITE,
    title: "Tarifs — Bali Découverte",
    description: DESCRIPTION_TARIFS,
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs — Bali Découverte",
    description: DESCRIPTION_TARIFS,
    images: ["/opengraph-image.png"],
  },
};

/**
 * Les tarifs ont quitté la page d'accueil.
 *
 * Ils y étaient à la fois trop longs (2,4 écrans sur mobile) et trop
 * flous : la grille au jour et par véhicule cohabitait avec les forfaits
 * de circuit au voyageur, sans que rien ne dise que les deux modèles sont
 * différents. Ici ils ont la place d'être expliqués — et l'accueil garde
 * l'envie plutôt que les chiffres.
 *
 * Les valeurs ont rejoint la présentation d'Agus : « pourquoi lui »
 * appartient à la personne, pas à une bande posée avant un formulaire.
 *
 * Le retour ramène à la section d'où l'on vient, pas en haut de
 * l'accueil — voir lib/retours.js. Il est répété en bas de page.
 */
export default function TarifsPage() {
  return (
    <>
      <DonneesStructurees />
      <RevealObserver />
      <Navbar />
      <main className="flex-1">
        <div className="shell pt-[clamp(5.5rem,12vw,7rem)]">
          <RetourLien />
        </div>
        <Tarifs />
        {/* Le même retour en bas. La page fait quatre écrans sur
            mobile : sans lui, il faut tout remonter pour repartir. */}
        <div className="shell pb-[clamp(3rem,8vw,4.5rem)]">
          <RetourLien />
        </div>
      </main>
      <Footer />
    </>
  );
}
