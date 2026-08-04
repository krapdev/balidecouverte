"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Mail } from "lucide-react";

/* Les tarifs vivent sur leur propre page ; tout le reste est une ancre
   de l'accueil. Depuis /tarifs, une ancre nue ne mène nulle part — d'où
   le préfixe « / » ajouté hors accueil par hrefFor(). */
const LINKS = [
  { href: "#esprit", label: "Qui je suis" },
  { href: "#chemins", label: "Par où commencer" },
  { href: "#circuit", label: "Le circuit" },
  { href: "#envies", label: "Vos envies" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "#engagement", label: "Engagement" },
  { href: "#sur-mesure", label: "Sur-Mesure" },
];

function Logo() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="h-9 w-9 shrink-0"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="19"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".35"
      />
      <path d="M20 31c0-6.2 3.6-11.4 9-13.4-1 6.6-4.5 11.4-9 13.4Z" fill="#d96b43" />
      <path d="M20 31c0-6.2-3.6-11.4-9-13.4 1 6.6 4.5 11.4 9 13.4Z" fill="currentColor" />
      <path d="M20 31V15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13 10h14" stroke="#d96b43" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const home = usePathname() === "/";
  const hrefFor = (h) => (home || !h.startsWith("#") ? h : `/${h}`);

  // Le menu plein écran ne doit pas laisser la page défiler derrière lui.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-[color-mix(in_srgb,var(--page)_88%,transparent)] backdrop-blur-lg backdrop-saturate-150">
      <div className="shell flex h-[68px] items-center gap-6">
        <a href={home ? "#top" : "/"} className="mr-auto flex min-h-11 items-center gap-3 no-underline">
          <Logo />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight">
              Bali Découverte
            </span>
            <span className="label block text-faint">Guide francophone</span>
          </span>
        </a>

        <nav className="hidden gap-7 lg:flex" aria-label="Navigation principale">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={hrefFor(l.href)}
              className="border-b border-transparent pb-0.5 text-sm text-soft no-underline transition-colors hover:border-accent hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn btn-accent hidden lg:inline-flex" href={hrefFor("#sur-mesure")}>
          <Mail size={16} />
          Demander un devis
        </a>

        {/* Version courte pour mobile : sans elle, quelqu'un qui ne coche
            rien n'a aucune porte de sortie avant onze écrans de défilement
            — la barre du bas ne sort qu'une fois une envie choisie. */}
        <a
          className="btn btn-accent h-11 shrink-0 px-3.5 lg:hidden"
          href={hrefFor("#sur-mesure")}
          aria-label="Demander un devis"
        >
          <Mail size={16} />
          <span className="text-sm">Devis</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded border border-rule text-soft lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[68px] bottom-0 z-40 border-t border-rule bg-page lg:hidden">
          <nav className="shell flex flex-col gap-1 py-6" aria-label="Navigation mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={hrefFor(l.href)}
                onClick={() => setOpen(false)}
                className="border-b border-rule py-4 font-display text-2xl no-underline"
              >
                {l.label}
              </a>
            ))}
            <a
              className="btn btn-accent btn-lg mt-6"
              href={hrefFor("#sur-mesure")}
              onClick={() => setOpen(false)}
            >
              <Mail size={18} />
              Demander un devis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
