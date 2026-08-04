"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Mail } from "lucide-react";
import { urlTarifs } from "@/lib/retours";

/* Les tarifs vivent sur leur propre page ; tout le reste est une ancre
   de l'accueil. Depuis /tarifs, une ancre nue ne mène nulle part — d'où
   le préfixe « / » ajouté hors accueil par hrefFor().

   Le lien Tarifs emporte la section d'où l'on part (`?de=`), pour que
   le retour ne renvoie pas en haut de page. L'attribut href reste
   `/tarifs` tout court : le clic milieu, la copie de lien et les robots
   ne passent pas par le gestionnaire. */
const LINKS = [
  { href: "#esprit", label: "Qui je suis" },
  /* Absent de la barre du haut, présent dans le menu : sept entrées ne
     tiennent pas sur une ligne à 1280 px — elles passaient à la ligne et
     cassaient la hauteur de la barre. La fourche est de toute façon la
     deuxième chose qu'on voit en descendant, c'est elle qui coûte le
     moins à retirer. */
  { href: "#chemins", label: "Par où commencer", menuSeul: true },
  { href: "#circuit", label: "Le circuit" },
  { href: "#envies", label: "Vos envies" },
  { href: "#usages", label: "Us et coutumes" },
  { href: "/tarifs", label: "Tarifs" },
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
  const router = useRouter();
  const home = usePathname() === "/";
  const hrefFor = (h) => (home || !h.startsWith("#") ? h : `/${h}`);

  function versTarifs(e) {
    if (!home || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    router.push(urlTarifs());
  }

  // Le menu plein écran ne doit pas laisser la page défiler derrière lui.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-[color-mix(in_srgb,var(--page)_88%,transparent)] backdrop-blur-lg backdrop-saturate-150">
      {/* Les écarts se resserrent sous 640 px. À 320 — le plus petit
          écran que le site prétend tenir — logo + titre + « Devis » +
          burger faisaient 360 px de large dans 280 px utiles, et le
          burger sortait de l'écran de 40 px. */}
      <div className="shell flex h-[68px] items-center gap-3 sm:gap-6">
        <a
          href={home ? "#top" : "/"}
          className="mr-auto flex min-h-11 min-w-0 items-center gap-2.5 no-underline sm:gap-3"
        >
          <Logo />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-semibold tracking-tight min-[380px]:text-lg">
              Bali Découverte
            </span>
            {/* Masquée sous 640 px plutôt que tronquée : « GUIDE
                FRANCOPH… » a l'air d'un bug, l'absence non. */}
            <span className="label hidden truncate text-faint sm:block">
              Guide francophone
            </span>
          </span>
        </a>

        <nav className="hidden gap-6 lg:flex" aria-label="Navigation principale">
          {LINKS.filter((l) => !l.menuSeul).map((l) => (
            <a
              key={l.href}
              href={hrefFor(l.href)}
              onClick={l.href === "/tarifs" ? versTarifs : undefined}
              className="inline-flex min-h-11 items-center border-b border-transparent text-sm text-soft no-underline transition-colors hover:border-accent hover:text-ink"
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
          className="btn btn-accent h-11 w-11 shrink-0 px-0 min-[380px]:w-auto min-[380px]:px-3.5 lg:hidden"
          href={hrefFor("#sur-mesure")}
          aria-label="Demander un devis"
        >
          <Mail size={16} />
          {/* Le mot tombe sous 380 px ; l'aria-label porte le sens, et
              la cible reste 44 × 44. */}
          <span className="hidden text-sm min-[380px]:inline">Devis</span>
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
                onClick={(e) => {
                  setOpen(false);
                  if (l.href === "/tarifs") versTarifs(e);
                }}
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
