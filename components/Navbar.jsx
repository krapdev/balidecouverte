"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Mail } from "lucide-react";
import { urlTarifs } from "@/lib/retours";
import { JepunPuce } from "./Scene";

/* Les tarifs vivent sur leur propre page ; tout le reste est une ancre
   de l'accueil. Depuis /tarifs, une ancre nue ne mène nulle part — d'où
   le préfixe « / » ajouté hors accueil par hrefFor().

   Le lien Tarifs emporte la section d'où l'on part (`?de=`), pour que
   le retour ne renvoie pas en haut de page. L'attribut href reste
   `/tarifs` tout court : le clic milieu, la copie de lien et les robots
   ne passent pas par le gestionnaire. */
/* `menuSeul` : présent dans le menu mobile, absent de la barre du haut.
   Six entrées est le maximum qui tienne sur une ligne à 1280 px — au
   septième, elles passent à la ligne et cassent la hauteur de la barre. */
const LINKS = [
  { href: "#esprit", label: "Qui je suis" },
  /* Le panneau des valeurs avait une ancre mais **aucun lien ne pointait
     dessus** : l'argument le plus fort d'Agus était, en pratique,
     inaccessible dès qu'on avait dépassé la présentation. C'est la cause
     directe du « on ne peut pas revenir facilement sur son engagement ».
     Sa place dans la barre est prise à « Sur-Mesure », que le bouton
     « Demander un devis » juste à côté dessert déjà. */
  { href: "#valeurs", label: "Son engagement" },
  { href: "#chemins", label: "Par où commencer", menuSeul: true },
  { href: "#circuit", label: "Le circuit" },
  { href: "#envies", label: "Vos envies" },
  { href: "#usages", label: "Us et coutumes", menuSeul: true },
  { href: "#temoignages", label: "Livre d'or" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "#sur-mesure", label: "Sur-Mesure", menuSeul: true },
];

/* Les ancres suivies par le repère de position, dans l'ordre de la page. */
const ANCRES = LINKS.filter((l) => l.href.startsWith("#")).map((l) =>
  l.href.slice(1)
);

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
  const [courante, setCourante] = useState(null);
  const router = useRouter();
  const home = usePathname() === "/";
  const hrefFor = (h) => (home || !h.startsWith("#") ? h : `/${h}`);

  /**
   * Le repère de position : quelle section est sous les yeux.
   *
   * Il ne sert pas à décorer. Le reproche était qu'après avoir descendu
   * la page, on ne sait plus où l'on est ni comment revenir en arrière —
   * marquer la section courante répond à la première moitié, et rend la
   * seconde évidente : on voit d'un coup d'œil ce qui est au-dessus.
   *
   * Écouteur de défilement plutôt qu'`IntersectionObserver` : la règle
   * est « la dernière section dont le haut est passé sous la barre », et
   * elle est directement lisible ici, alors qu'il faudrait la déduire de
   * marges racines acrobatiques avec un observateur. Le calcul est
   * limité à une image par trame.
   */
  useEffect(() => {
    if (!home) return;
    let attendue = false;
    const calculer = () => {
      attendue = false;
      let vue = null;
      for (const id of ANCRES) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) vue = id;
      }
      setCourante(vue);
    };
    const surDefilement = () => {
      if (attendue) return;
      attendue = true;
      requestAnimationFrame(calculer);
    };
    calculer();
    addEventListener("scroll", surDefilement, { passive: true });
    addEventListener("resize", surDefilement);
    return () => {
      removeEventListener("scroll", surDefilement);
      removeEventListener("resize", surDefilement);
    };
  }, [home]);

  const ici = (h) => home && h.startsWith("#") && h.slice(1) === courante;

  /**
   * Le repère de la barre du haut, qui ne montre pas toutes les sections.
   *
   * Sans ça, traverser « Par où commencer » ou « Us et coutumes » —
   * absentes de la barre — éteint le repère : il clignote au fil du
   * défilement, ce qui est pire que pas de repère du tout. On marque
   * donc la dernière entrée **de la barre** que l'on a dépassée, ce qui
   * se lit « vous êtes quelque part après ce point ».
   */
  const rangCourant = courante === null ? -1 : ANCRES.indexOf(courante);
  const ancreBarre = LINKS.filter(
    (l) => !l.menuSeul && l.href.startsWith("#")
  )
    .filter((l) => ANCRES.indexOf(l.href.slice(1)) <= rangCourant)
    .pop()?.href;
  const iciBarre = (h) => home && h === ancreBarre;

  function versTarifs(e) {
    if (!home || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    router.push(urlTarifs());
  }

  /**
   * Le menu plein écran ne doit pas laisser la page défiler derrière lui.
   *
   * ⚠️ Le verrou était posé sur `<body>`, et **il déplaçait la page** :
   * le `<body>` porte `min-h-screen flex flex-col`, lui donner
   * `overflow: hidden` le transforme en conteneur de défilement, la
   * hauteur du document change et le navigateur ramène la position dans
   * les nouvelles bornes — 428 px de saut mesurés à mi-page. On ouvrait
   * le menu, on le refermait, et on n'était plus au même endroit.
   *
   * Le verrou est donc posé sur `<html>`, qui est l'élément défilant :
   * rien n'est reflué, rien ne bouge. Le rembourrage compense la barre
   * de défilement qui disparaît, sinon la page tressaute
   * horizontalement sur les navigateurs de bureau.
   */
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const compense = window.innerWidth - html.clientWidth;
    const overflow = html.style.overflow;
    const padding = html.style.paddingRight;
    html.style.overflow = "hidden";
    if (compense > 0) html.style.paddingRight = `${compense}px`;
    return () => {
      html.style.overflow = overflow;
      html.style.paddingRight = padding;
    };
  }, [open]);

  return (
    <>
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
              aria-current={iciBarre(l.href) ? "true" : undefined}
              className={`inline-flex min-h-11 items-center border-b text-sm no-underline transition-colors hover:border-accent hover:text-ink ${
                iciBarre(l.href)
                  ? "border-accent font-semibold text-ink"
                  : "border-transparent text-soft"
              }`}
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

    </header>

      {/* ⚠️ Le panneau est **hors du `<header>`**, et ce n'est pas un
          détail de rangement. L'en-tête porte `backdrop-blur`, et un
          `backdrop-filter` fait de l'élément le **bloc conteneur de ses
          descendants en position fixe** : à l'intérieur, `top: 68px;
          bottom: 0` se calculait sur les 68 px de la barre et donnait un
          panneau de **1 px de haut**. Les liens débordaient, donc ça
          avait l'air de marcher — mais le fond ne couvrait rien et la
          page défilait visiblement derrière le menu. */}
      {open && (
        <div className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto border-t border-rule bg-page lg:hidden">
          <nav className="shell flex flex-col gap-1 py-6" aria-label="Navigation mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={hrefFor(l.href)}
                onClick={(e) => {
                  setOpen(false);
                  if (l.href === "/tarifs") versTarifs(e);
                }}
                aria-current={ici(l.href) ? "true" : undefined}
                className={`flex items-center gap-3 border-b border-rule py-4 font-display text-2xl no-underline ${
                  ici(l.href) ? "text-accent" : ""
                }`}
              >
                {/* Le repère est doublé d'une puce : la couleur seule ne
                    suffit pas à porter une information (WCAG 1.4.1). */}
                {ici(l.href) && <JepunPuce size={16} plein className="shrink-0" />}
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
    </>
  );
}
