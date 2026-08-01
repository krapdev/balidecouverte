import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/data";
import { Canang } from "./Scene";

const LINKS = [
  { href: "#esprit", label: "L'Esprit" },
  { href: "#experiences", label: "Expériences" },
  { href: "#circuits", label: "Circuits" },
  { href: "#sur-mesure", label: "Sur-Mesure" },
];

export default function Footer() {
  return (
    <footer className="bg-immersive-deep pb-28 pt-[clamp(2.5rem,7vw,4rem)] text-on-immersive lg:pb-16">
      <div className="shell grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="label mb-3 text-accent">Om Swastiastu</p>
          <h3 className="mb-2 text-[1.375rem]">Bali Découverte</h3>
          <p className="text-sm text-on-immersive-soft">
            Voyages privés sur-mesure à Bali, conçus et guidés en français par
            Agus Yudiarta, guide indépendant basé à Sidemen, Karangasem.
          </p>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Pied de page">
          <p className="label mb-1 text-accent">Explorer</p>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-on-immersive-soft no-underline transition-colors hover:text-on-immersive"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="label mb-1 text-accent">Contact direct</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-on-immersive-soft no-underline transition-colors hover:text-on-immersive"
          >
            WhatsApp · {WHATSAPP_DISPLAY}
          </a>
          <a
            href="mailto:contact@balidecouverte.com"
            className="text-sm text-on-immersive-soft no-underline transition-colors hover:text-on-immersive"
          >
            contact@balidecouverte.com
          </a>
          <p className="text-sm text-on-immersive-soft">
            Réponse sous 24 h · GMT+8
          </p>
          <Canang size={54} className="mt-4 opacity-90" />
        </div>
      </div>

      <div className="shell mt-10 flex flex-wrap justify-between gap-3 border-t border-[color-mix(in_srgb,var(--on-immersive)_15%,transparent)] pt-5 text-[0.6875rem] text-on-immersive-soft">
        <span>© {new Date().getFullYear()} Bali Découverte — Prototype</span>
        <span className="label">Sidemen · Bali · Indonésie</span>
      </div>
    </footer>
  );
}
