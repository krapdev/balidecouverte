import { TripProvider } from "@/lib/trip-store";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutAgus from "@/components/AboutAgus";
import Chemins from "@/components/Chemins";
import Circuit from "@/components/Circuit";
import Activites from "@/components/Activites";
import Engagement from "@/components/Engagement";
import TripBuilder from "@/components/TripBuilder";
import MobileBar from "@/components/MobileBar";
import Footer from "@/components/Footer";
import { Divider } from "@/components/Scene";

/**
 * Le parcours, dans l'ordre : qui est Agus, puis la fourche, puis les
 * deux chemins, puis pourquoi passer par lui, puis le message.
 *
 * Bali seulement. Les autres îles sont sorties du parcours le temps de
 * le recentrer — voir lib/data.js.
 */
export default function Home() {
  return (
    <TripProvider>
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
        <Engagement />
        <TripBuilder />
      </main>
      <Footer />
      <MobileBar />
    </TripProvider>
  );
}
