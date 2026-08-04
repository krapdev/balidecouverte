import Navbar from "@/components/Navbar";
import Tarifs from "@/components/Tarifs";
import RetourLien from "@/components/RetourLien";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tarifs — Bali Découverte",
  description:
    "Le tarif d'Agus Yudiarta, guide privé francophone à Bali : au jour et par véhicule, par saison, ce qui est compris et ce qui ne l'est pas.",
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
