import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, CONTACT, AGUS } from "@/lib/data";
import { Canang } from "./Scene";
import LienTarifs from "./LienTarifs";

/* Le pied de page s'affiche aussi sur /tarifs : les ancres sont donc
   ancrées à la racine. Depuis l'accueil, « /#esprit » reste une simple
   navigation de fragment — pas de rechargement. */
const LINKS = [
  { href: "/#esprit", label: "Qui je suis" },
  { href: "/#chemins", label: "Par où commencer" },
  { href: "/#circuit", label: "Le circuit" },
  { href: "/#envies", label: "Vos envies" },
  { href: "/#usages", label: "Us et coutumes" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/#sur-mesure", label: "Sur-Mesure" },
];

export default function Footer() {
  return (
    <footer className="ground-bambou pb-28 pt-[clamp(2.5rem,7vw,4rem)] lg:pb-16">
      <div className="shell grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="label mb-3 text-soleil-pale">Om Swastiastu</p>
          <h3 className="mb-2 text-[1.375rem]">Bali Découverte</h3>
          <p className="text-sm text-on-immersive-soft">
            Voyages privés sur-mesure conçus et guidés en français par Agus
            Yudiarta, guide diplômé francophone à Denpasar. {AGUS.territoires}.
          </p>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Pied de page">
          <p className="label mb-1 text-soleil-pale">Explorer</p>
          {LINKS.map((l) => {
            const cls =
              "flex min-h-11 items-center text-sm text-on-immersive-soft no-underline transition-colors hover:text-on-immersive";
            return l.href === "/tarifs" ? (
              <LienTarifs key={l.href} className={cls}>
                {l.label}
              </LienTarifs>
            ) : (
              <a key={l.href} href={l.href} className={cls}>
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="label mb-1 text-soleil-pale">Contact direct</p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex min-h-11 items-center text-sm text-on-immersive-soft no-underline transition-colors hover:text-on-immersive"
          >
            {CONTACT.email}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center text-sm text-on-immersive-soft no-underline transition-colors hover:text-on-immersive"
          >
            WhatsApp · {WHATSAPP_DISPLAY}
          </a>
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center text-sm text-on-immersive-soft no-underline transition-colors hover:text-on-immersive"
          >
            Facebook · {CONTACT.pseudo}
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center text-sm text-on-immersive-soft no-underline transition-colors hover:text-on-immersive"
          >
            Instagram · {CONTACT.pseudo}
          </a>
          <p className="text-sm text-on-immersive-soft">
            J&apos;y publie mes photos des endroits où j&apos;accompagne mes voyageurs.
          </p>
          <address className="mt-1 text-sm not-italic text-on-immersive-soft">
            {CONTACT.adresse}
          </address>
          <p className="text-sm text-on-immersive-soft">
            Téléphone et WhatsApp : {WHATSAPP_DISPLAY} · Réponse sous 24 h · GMT+8
          </p>
          <Canang size={54} className="mt-4 opacity-90" />
        </div>
      </div>

      <div className="shell mt-10 flex flex-wrap justify-between gap-3 border-t border-[color-mix(in_srgb,var(--on-immersive)_22%,transparent)] pt-5 text-[0.6875rem] text-on-immersive-soft">
        <span>© {new Date().getFullYear()} Bali Découverte — Prototype</span>
        <span>Mentions légales et CGV à rédiger</span>
        <span className="label">Denpasar · Bali · Indonésie</span>
      </div>
    </footer>
  );
}
