import { TripProvider } from "@/lib/trip-store";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutAgus from "@/components/AboutAgus";
import Experiences from "@/components/Experiences";
import Circuits from "@/components/Circuits";
import TripBuilder from "@/components/TripBuilder";
import MobileBar from "@/components/MobileBar";
import Islands from "@/components/Islands";
import Tarifs from "@/components/Tarifs";
import Engagement from "@/components/Engagement";
import Footer from "@/components/Footer";
import { Divider } from "@/components/Scene";

export default function Home() {
  return (
    <TripProvider>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutAgus />
        <div className="horizon" aria-hidden="true" />
        <Experiences />
        <div className="shell text-accent">
          <Divider />
        </div>
        <Circuits />
        <Islands />
        <Tarifs />
        <Engagement />
        <TripBuilder />
      </main>
      <Footer />
      <MobileBar />
    </TripProvider>
  );
}
