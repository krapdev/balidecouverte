import { TripProvider } from "@/lib/trip-store";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutAgus from "@/components/AboutAgus";
import Journees from "@/components/Journees";
import Circuits from "@/components/Circuits";
import TripBuilder from "@/components/TripBuilder";
import MobileBar from "@/components/MobileBar";
import Islands from "@/components/Islands";
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
        <div className="shell text-accent">
          <Divider />
        </div>
        <Journees />
        <Circuits />
        <Islands />
        <Engagement />
        <TripBuilder />
      </main>
      <Footer />
      <MobileBar />
    </TripProvider>
  );
}
