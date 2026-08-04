import { TripProvider } from "@/lib/trip-store";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutAgus from "@/components/AboutAgus";
import Chemins from "@/components/Chemins";
import Circuit from "@/components/Circuit";
import Activites from "@/components/Activites";
import Usages from "@/components/Usages";
import TripBuilder from "@/components/TripBuilder";
import MobileBar from "@/components/MobileBar";
import Footer from "@/components/Footer";
import DonneesStructurees from "@/components/DonneesStructurees";
import RevealObserver from "@/components/RevealObserver";
import { Divider } from "@/components/Scene";

/**
 * Le parcours, dans l'ordre : qui est Agus, la fourche, les deux
 * chemins, le pays qu'on va traverser, puis le message.
 *
 * Le fond alterne à chaque section — ivoire, sable, ivoire, sable,
 * bambou, ivoire — et ce n'est pas un caprice : deux sections de même
 * fond qui se touchent se lisent comme une seule, très longue.
 *
 * Bali seulement. Les autres îles sont sorties du parcours le temps de
 * le recentrer — voir lib/data.js.
 */
export default function Home() {
  return (
    <TripProvider>
      <DonneesStructurees />
      <RevealObserver />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutAgus />
        <div className="horizon" aria-hidden="true" />
        <div className="shell text-accent">
          <Divider />
        </div>
        <Chemins />
        <Circuit />
        <Activites />
        <Usages />
        <TripBuilder />
      </main>
      <Footer />
      <MobileBar />
    </TripProvider>
  );
}
