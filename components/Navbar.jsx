"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X, Mail } from "lucide-react";
import { urlTarifs } from "@/lib/retours";
import { NAV, ANCRES } from "@/lib/navigation";
import { Symbole } from "./Symboles";
import { JepunPuce } from "./Scene";

/**
 * La navigation.
 *
 * Le reproche était juste : c'était la barre de n'importe quel site.
 * Logo à gauche, six liens au milieu, un bouton, trois traits à droite.
 * Rien là-dedans ne disait Bali, alors que la page entière essaie de le
 * dire.
 *
 * Trois déplacements, et aucun ne coûte en lisibilité — c'était la
 * condition :
 *
 *  1. **Le linteau.** Le filet gris sous la barre devient une frise de
 *     dents, celle qui court sur la pierre au-dessus des portes de
 *     temple. Une séparation devait être là de toute façon ; elle est
 *     maintenant sculptée au lieu d'être droite.
 *  2. **Le repère est une fleur.** La section où l'on se trouve n'est
 *     plus soulignée d'un rectangle bambou mais marquée d'un jepun — la
 *     fleur du site, déjà la puce de sélection ailleurs. Même
 *     information, même place, dessinée.
 *  3. **Le menu mobile devient un seuil.** Voir plus bas : c'est là que
 *     se joue l'essentiel, et c'est aussi là qu'on gagne en clarté.
 *
 * Ce qui n'a pas bougé, et ne doit pas bouger : la barre reste collante,
 * les libellés restent des mots français ordinaires, les cibles font
 * 44 px, et le panneau mobile reste **hors du `<header>`** (voir le
 * commentaire du piège `backdrop-filter`, plus bas).
 */

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

/**
 * Le bouton du menu : trois traits, mais de largeurs décroissantes.
 *
 * C'est la silhouette du **meru**, le toit à étages qui se rétrécit vers
 * le ciel — et c'est en même temps, trait pour trait, le hamburger que
 * tout le monde sait lire. On ne troque pas une convention contre un
 * symbole : on la redessine. Un candi bentar à cette place aurait été
 * plus balinais et parfaitement illisible, ce qui n'aurait servi
 * personne.
 */
function Meru({ size = 20 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 6.5h8M5.5 12h13M3 17.5h18" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [courante, setCourante] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const home = pathname === "/";
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

  /* Sur l'accueil, la section sous les yeux. Ailleurs, la page courante :
     depuis /agus ou /tarifs, c'est cette entrée-là qui est marquée. */
  const ici = (h) =>
    h.startsWith("#") ? home && h.slice(1) === courante : pathname === h;

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
  const ancreBarre = NAV.filter((l) => l.barre && l.href.startsWith("#"))
    .filter((l) => ANCRES.indexOf(l.href.slice(1)) <= rangCourant)
    .pop()?.href;
  const iciBarre = (h) =>
    h.startsWith("#") ? home && h === ancreBarre : pathname === h;

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
      <header className="sticky top-0 z-50 bg-[color-mix(in_srgb,var(--page)_88%,transparent)] backdrop-blur-lg backdrop-saturate-150">
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
            {NAV.filter((l) => l.barre).map((l) => (
              <a
                key={l.href}
                href={hrefFor(l.href)}
                onClick={l.href === "/tarifs" ? versTarifs : undefined}
                aria-current={iciBarre(l.href) ? "true" : undefined}
                /* Le soulignement ne sert plus qu'au survol. La section
                   courante, elle, porte un jepun — même information, même
                   place, dessinée. La graisse la double : ni la couleur
                   ni la forme ne portent seules le sens (WCAG 1.4.1). */
                className={`relative inline-flex min-h-11 items-center border-b border-transparent text-sm no-underline transition-colors hover:border-accent hover:text-ink ${
                  iciBarre(l.href) ? "font-semibold text-ink" : "text-soft"
                }`}
              >
                {l.label}
                {iciBarre(l.href) && (
                  <JepunPuce
                    size={13}
                    plein
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-accent"
                  />
                )}
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
            {open ? <X size={18} /> : <Meru />}
          </button>
        </div>

        {/* Le linteau. Il remplace le `border-b` : une frise de dents,
            celle qui court sur la pierre au-dessus des portes de temple.
            Sept pixels, une image SVG en ligne, aucune requête. */}
        <div className="linteau" aria-hidden="true" />
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
        <div className="ground-sable fixed inset-x-0 bottom-0 top-[75px] z-40 overflow-y-auto lg:hidden">
          <nav className="shell relative py-5" aria-label="Navigation mobile">
            <ul className="m-0 flex list-none flex-col p-0">
              {NAV.map((l, i) => {
                const actif = ici(l.href);
                return (
                  <li key={l.href}>
                    <a
                      href={hrefFor(l.href)}
                      onClick={(e) => {
                        setOpen(false);
                        if (l.href === "/tarifs") versTarifs(e);
                      }}
                      aria-current={actif ? "true" : undefined}
                      /* La bordure gauche est là dans les deux états,
                         transparente au repos : sans elle, l'entrée
                         courante se décalerait de 3 px et la liste
                         sauterait d'une ligne à l'autre. */
                      className={`flex items-center gap-3.5 border-b border-l-3 border-b-rule py-3 pl-3 no-underline ${
                        actif
                          ? "border-l-accent bg-tint/60"
                          : "border-l-transparent"
                      }`}
                    >
                      <span className="w-5 shrink-0 font-sans text-[0.6875rem] tabular-nums text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Symbole
                        nom={l.symbole}
                        size={26}
                        className="shrink-0 text-accent"
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-[1.3rem] leading-tight ${
                            actif ? "font-semibold text-accent" : ""
                          }`}
                        >
                          {l.label}
                        </span>
                        {/* La ligne qui fait du menu un sommaire. Sur
                            mobile, c'est le seul plan de la page dont on
                            dispose : une liste de titres nus oblige à
                            ouvrir pour savoir ce qu'il y a derrière. */}
                        <span className="mt-0.5 block text-sm leading-snug text-soft">
                          {l.gloss}
                        </span>
                      </span>
                      {/* La couleur ne porte jamais seule une
                          information (WCAG 1.4.1) : le jepun la double. */}
                      {actif && (
                        <JepunPuce size={16} plein className="shrink-0 text-accent" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <a
              className="btn btn-accent btn-lg mt-6 w-full"
              href={hrefFor("#sur-mesure")}
              onClick={() => setOpen(false)}
            >
              <Mail size={18} />
              Demander un devis
            </a>
            {/* La porte fendue ferme le panneau — le seuil qu'on vient
                de franchir. Elle a d'abord été posée en filigrane dans
                l'angle haut, comme le padma du panneau des valeurs : à
                390 px, le panneau est trop étroit pour qu'un dessin de
                240 px trouve un coin sans texte, et il passait sous
                trois libellés. La règle de la maison tient : **le motif
                va sur un fond de section, jamais sous du texte.** Ici il
                est donc au bout, en clair, seul sur sa ligne. */}
            <div className="mt-7 flex flex-col items-center gap-2 text-accent">
              <Symbole nom="candi" size={44} strokeWidth={1.1} className="opacity-60" />
              <p className="text-center text-[0.6875rem] text-faint">
                Om Swastiastu — réponse sous 24 h, en français.
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
