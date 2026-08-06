import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutAgus from "@/components/AboutAgus";
import Chemins from "@/components/Chemins";
import Usages from "@/components/Usages";
import Temoignages from "@/components/Temoignages";
import TripBuilder from "@/components/TripBuilder";
import MobileBar from "@/components/MobileBar";
import Footer from "@/components/Footer";
import DonneesStructurees from "@/components/DonneesStructurees";
import RevealObserver from "@/components/RevealObserver";
import PreselectionCircuit from "@/components/PreselectionCircuit";
import { Divider } from "@/components/Scene";

/**
 * Le parcours : qui est Agus, la fourche, le pays qu'on va traverser,
 * ce qu'en disent ceux qui sont partis, puis le message.
 *
 * ⚠️ **Le circuit et les envies ne sont plus ici.** Ils occupaient cinq
 * écrans et demi de mobile, juste sous une fourche qui annonçait deux
 * chemins — et les déroulait tous les deux immédiatement. Une fourche
 * qui ne coupe rien n'est pas une fourche : c'est un sommaire décoratif
 * posé au-dessus de son propre contenu. Le clic mène désormais à
 * `/circuit` et à `/envies`, et le choix redevient un choix.
 *
 * Ce que ça exige en retour, et qui n'est pas négociable : **les deux
 * cartes doivent montrer, pas annoncer.** Un chiffre, un prix, un temps
 * fort. Sinon on a remplacé deux sections riches par deux boutons, et
 * quelqu'un qui descend sans cliquer ne voit plus rien de ce qu'Agus
 * sait faire.
 *
 * Le fond alterne à chaque section — ivoire, sable, bambou, ivoire,
 * sable — et ce n'est pas un caprice : deux sections de même fond qui se
 * touchent se lisent comme une seule, très longue.
 *
 * Bali seulement. Les autres îles sont sorties du parcours le temps de
 * le recentrer — voir lib/data.js.
 */
export default function Home() {
  return (
    <>
      <DonneesStructurees />
      <RevealObserver />
      {/* Reçoit la sélection venue de /circuit par `?circuit=`. */}
      <PreselectionCircuit />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutAgus />
        <div className="horizon" aria-hidden="true" />
        <div className="shell text-accent">
          <Divider />
        </div>
        <Chemins />
        <Usages />
        <Temoignages />
        <TripBuilder />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
