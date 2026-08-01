import { TripProvider } from "@/lib/trip-store";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutAgus from "@/components/AboutAgus";
import Experiences from "@/components/Experiences";
import Circuits from "@/components/Circuits";
import TripBuilder from "@/components/TripBuilder";
import MobileBar from "@/components/MobileBar";
import Footer from "@/components/Footer";
import { Poleng } from "@/components/Scene";

export default function Home() {
  return (
    <TripProvider>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutAgus />
        <Experiences />
        <Poleng />
        <Circuits />
        <TripBuilder />
      </main>
      <Poleng />
      <Footer />
      <MobileBar />
    </TripProvider>
  );
}
