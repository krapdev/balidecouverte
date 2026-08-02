import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Tarifs from "@/components/Tarifs";
import Engagement from "@/components/Engagement";
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
 * L'Engagement suit, comme il suivait la grille sur l'accueil : le prix
 * pose la question « où va mon argent ? », l'engagement y répond.
 */
export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="shell pt-[clamp(5.5rem,12vw,7rem)]">
          <Link
            href="/"
            className="label inline-flex items-center gap-2 text-accent no-underline"
          >
            <ArrowLeft size={14} />
            Retour à l&apos;accueil
          </Link>
        </div>
        <Tarifs />
        <Engagement />
      </main>
      <Footer />
    </>
  );
}
