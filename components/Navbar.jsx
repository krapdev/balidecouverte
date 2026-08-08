"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X, Mail } from "lucide-react";
import { urlTarifs } from "@/lib/retours";
import { versAncre } from "@/lib/ancre";
import { NAV, ANCRES } from "@/lib/navigation";
import { Symbole } from "./Symboles";
import Marque from "./Marque";
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
 * ⚠️ **Tous les liens internes passent par `next/link`.** Un `<a
 * href="/…">` provoque un chargement complet de la page ; or le magasin
 * du configurateur vit dans le gabarit et survit aux navigations
 * client, pas aux rechargements. Cocher trois envies sur /envies puis
 * toucher « Demander un devis » effaçait tout. La règle vaut pour
 * n'importe quel lien du site, y compris ceux qui ne pointent que vers
 * une ancre : depuis une autre page, ils deviennent « /#ancre ».
 *
 * Ce qui n'a pas bougé, et ne doit pas bouger : la barre reste collante,
 * les libellés restent des mots français ordinaires, les cibles font
 * 44 px, et le panneau mobile reste **hors du `<header>`** (voir le
 * commentaire du piège `backdrop-filter`, plus bas).
 */

/* ⚠️ **Le logo est le vrai logo d'Agus**, vectorisé depuis le fichier
   qu'il a fourni — voir `components/Marque.jsx` et `public/logo.svg`.

   Deux choses l'ont précédé à cette place, et aucune n'était la sienne.
   D'abord un dessin générique — un disque, deux feuilles et un trait —
   dont l'une des feuilles était peinte en `#d96b43` : une couleur
   absente de tous les jetons de la palette, **survivante de la direction
   abandonnée avant le bambou**, restée en dur dans le seul fichier où
   personne ne relisait les couleurs, et affichée sur les huit pages.
   Ensuite un redessin à la main de son logo, fait faute de fichier
   source. Les deux sont dans l'historique git ; il n'y a pas de raison
   d'y revenir maintenant qu'un tracé fidèle existe. */

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

  /* Sur l'accueil, une ancre déjà présente dans l'URL ne renavigue
     pas : le lien devient inerte dès qu'on s'en est servi une fois.
     Voir lib/ancre.js. */
  const surClic = (h) => (e) => {
    if (h === "/tarifs") versTarifs(e);
    else if (home) versAncre(e, h);
  };

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
      {/* ⚠️ **Le fond de la barre est un soleil dilué, et le taux compte.**
          La demande était « le même fond que le bouton Créer mon voyage »,
          c'est-à-dire le soleil plein. Mesuré, il coûtait trop cher : le
          CTA soleil sur un fond soleil tombe à **1,00 de contraste** — il
          disparaît —, et le bouton « Devis » en bambou à 3,45, ce qui
          passe la norme mais donne du vert saturé sur du jaune saturé, en
          permanence, sur les huit pages.
          ⚠️ **Correction d'un argument donné trop vite** : le « CTA qui
          disparaît » supposait une adjacence qui n'existe pas — le bouton
          soleil vit sur le hero sombre, jamais sur la barre. Le vrai
          plafond est ailleurs, et il est plus bas :

          **les liens de la barre sont en `--text-soft`, qui tombe à 4,46
          dès 30 % de soleil** — sous le seuil AA de 4,5. À 25 % il vaut
          4,62, l'encre 11,21 et le bambou du bouton 5,31. C'est donc la
          limite, et elle tient à la couleur la plus discrète de la barre,
          pas à la plus visible.
          **Ne pas monter le taux sans remesurer `--text-soft`.** */}
      <header className="sticky top-0 z-50 bg-[color-mix(in_srgb,color-mix(in_srgb,var(--soleil)_25%,var(--page))_92%,transparent)] backdrop-blur-lg backdrop-saturate-150">
        {/* Les écarts se resserrent sous 640 px. À 320 — le plus petit
            écran que le site prétend tenir — logo + titre + « Devis » +
            burger faisaient 360 px de large dans 280 px utiles, et le
            burger sortait de l'écran de 40 px. */}
        <div className="shell flex h-[68px] items-center gap-3 sm:gap-6">
          <Link
            href={home ? "#top" : "/"}
            className="mr-auto flex min-h-11 min-w-0 items-center gap-2.5 no-underline sm:gap-3"
          >
            <Marque size={56} />
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-lg font-semibold tracking-tight min-[380px]:text-xl">
                Bali Découverte
              </span>
              {/* Masquée sous 640 px plutôt que tronquée : « GUIDE
                  FRANCOPH… » a l'air d'un bug, l'absence non.

                  ⚠️ **`whitespace-nowrap` et non `truncate`.** Ce libellé
                  s'affichait « GUIDE FRANCOPHO… » à *toutes* les largeurs,
                  jusqu'à 1920 px où la barre est à moitié vide. Ce n'était
                  donc pas un manque de place : `.label` porte
                  `letter-spacing: 0.16em`, **qui s'applique aussi après la
                  dernière lettre**, et la boîte finissait deux à quatre
                  pixels trop courte pour son propre contenu — assez pour
                  déclencher l'ellipsis, pas assez pour que rien dépasse
                  vraiment.
                  Une marge négative a été essayée pour reprendre cet
                  espace fantôme : elle rétrécit aussi le conteneur, si
                  bien que le déficit se divisait par deux à chaque essai
                  sans jamais s'annuler. `truncate` a donc été remplacé par
                  le seul `whitespace-nowrap` : plus d'`overflow: hidden`,
                  donc plus d'ellipsis possible, et deux pixels qui
                  débordent d'une boîte sans bordure ne se voient pas. Le
                  libellé est masqué sous 640 px, là où la place manque
                  pour de bon. */}
              <span className="label hidden whitespace-nowrap text-faint sm:block">
                Guide francophone
              </span>
            </span>
          </Link>

          {/* ⚠️ **La barre de liens apparaît à `xl` (1280) et non plus à
              `lg` (1024).** Entre les deux, elle affichait six liens, le
              bouton entier et le burger, et le budget était dépassé de
              plusieurs dizaines de pixels : le bloc de marque tombait à
              122 px pour 202 px de contenu, et **le nom du site se
              tronquait en « Bali D… »**. Un site dont l'en-tête n'arrive
              pas à écrire son propre nom a un problème plus grave que
              l'absence de liens — et le menu est disponible à toutes les
              largeurs depuis qu'il a été rendu accessible partout, donc
              rien n'est perdu dans la bande 1024–1279.
              1280 est la largeur d'audit et celle de la plupart des
              portables ; en dessous, c'est le seuil qui sert. */}
          <nav className="hidden gap-6 xl:flex" aria-label="Navigation principale">
            {NAV.filter((l) => l.barre).map((l) => (
              <Link
                key={l.href}
                href={hrefFor(l.href)}
                onClick={surClic(l.href)}
                aria-current={iciBarre(l.href) ? "true" : undefined}
                /* Le soulignement ne sert plus qu'au survol. La section
                   courante, elle, porte un jepun — même information, même
                   place, dessinée. La graisse la double : ni la couleur
                   ni la forme ne portent seules le sens (WCAG 1.4.1). */
                /* ⚠️ `whitespace-nowrap` : **sans lui, tous les libellés de
                   deux mots se cassaient en deux lignes, à toutes les
                   largeurs** — « Qui je / suis », « Mon / engagement »,
                   jusqu'à 1600 px où la place ne manque pourtant pas. Ce
                   n'est pas un défaut de place mais de flex : ces liens
                   sont des éléments d'un conteneur `flex`, ils ont donc
                   `flex-shrink: 1` et se rétrécissent jusqu'à la largeur
                   de leur mot le plus long avant que le conteneur ne
                   déborde. Le défaut se voit à l'œil et pas à la mesure :
                   `min-h-11` impose 44 px à chaque lien, si bien que la
                   hauteur ne bouge pas quand le texte passe à deux
                   lignes. Ce qui l'attrape, c'est le nombre de boîtes de
                   ligne — `document.createRange()` sur le contenu, puis
                   `getClientRects().length`. */
                className={`relative inline-flex min-h-11 items-center whitespace-nowrap border-b border-transparent text-sm no-underline transition-colors hover:border-accent hover:text-ink ${
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
              </Link>
            ))}
          </nav>

          <Link
            /* `whitespace-nowrap` pour la même raison que les liens : c'est
               un élément d'un conteneur flex, donc il se rétrécit
               jusqu'à son mot le plus long et rendait « Demander un /
               devis » sur deux lignes — à 1280 comme à 1500, ce qui
               montre bien que la place n'y était pour rien. */
            className="btn btn-accent hidden whitespace-nowrap xl:inline-flex"
            href={hrefFor("#sur-mesure")}
            onClick={surClic("#sur-mesure")}
          >
            <Mail size={16} />
            Demander un devis
          </Link>

          {/* ⚠️ **Le bouton « Devis » mobile a été retiré**, et c'est un
              arbitrage, pas un nettoyage. Il était là pour une bonne
              raison — donner une porte de sortie à qui ne coche rien —,
              mais il ne tenait plus dans le budget de la barre une fois
              le logo passé à 56 px et le nom du site d'un cran : mesuré,
              **le nom se tronquait de 20 px à 320 et de 14 à 390**, et il
              se tronquait *plus* à 390 qu'à 360 parce que le bouton y
              passe de l'icône seule au mot entier.
              Entre un bouton de plus et le nom du site écrit en entier,
              c'est le nom qui gagne. La maquette n'a jamais eu ce bouton
              sous 1280 ; l'app la rejoint.

              **Ce qui reste comme porte de sortie sur mobile** : le CTA du
              hero, visible au premier écran ; l'entrée « Demander un
              devis » du menu ; et la barre du bas dès qu'une envie est
              cochée. Si le nom du site raccourcissait un jour, ce bouton
              est le premier à remettre. */}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            /* ⚠️ **Plus de `lg:hidden`.** Le pied de page portait
               jusqu'ici la liste complète des sections, et c'est lui
               qui rendait le site navigable au-delà des six entrées de
               la barre. En le retirant — « on a déjà le menu » —, on
               laissait les écrans larges sans aucun accès à
               « Par où commencer », « Us et coutumes », « Mon
               portrait » ou le programme jour par jour : le menu était
               justement la seule chose qu'ils n'avaient pas.
               Le meru est donc là partout. La barre garde ses six
               raccourcis, le menu porte le sommaire complet. */
            className="grid h-11 w-11 shrink-0 place-items-center rounded border border-rule text-soft"
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
        <div className="ground-sable fixed inset-x-0 bottom-0 top-[75px] z-40 overflow-y-auto">
          {/* `max-w` sur grand écran : une liste de neuf plaques étalée
              sur 1180 px se lit en balayant la tête de gauche à droite.
              Le sommaire garde la largeur d'une colonne de lecture. */}
          <nav
            className="shell relative py-5 lg:max-w-[42rem]"
            aria-label="Sommaire du site"
          >
            <ul className="m-0 flex list-none flex-col p-0">
              {NAV.map((l, i) => {
                const actif = ici(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={hrefFor(l.href)}
                      onClick={(e) => {
                        setOpen(false);
                        surClic(l.href)(e);
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
                      <span className="w-5 shrink-0 font-sans text-xs tabular-nums text-faint">
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
                      {/* Une seule marque à droite, et seulement quand
                          on y est : le jepun **plein**. La couleur ne
                          porte jamais seule une information (WCAG 1.4.1).

                          Deux marques ont été essayées à côté, pour
                          signaler les entrées qui quittent la page — une
                          porte balinaise, puis une flèche. Toutes deux
                          retirées : dans une liste où **chaque ligne
                          est déjà un lien**, un signe sur deux lignes
                          sur neuf ne se lit pas comme « celle-ci change
                          de page » mais comme « celle-ci est
                          différente », sans qu'on sache en quoi. Une
                          nuance qu'on ne peut pas expliquer coûte plus
                          qu'elle ne rapporte. */}
                      {actif && (
                        <JepunPuce size={16} plein className="shrink-0 text-accent" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              className="btn btn-accent btn-lg mt-6 w-full"
              href={hrefFor("#sur-mesure")}
              onClick={(e) => {
                setOpen(false);
                surClic("#sur-mesure")(e);
              }}
            >
              <Mail size={18} />
              Demander un devis
            </Link>
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
              <p className="text-center text-xs text-faint">
                Om Swastiastu — réponse sous 24 h, en français.
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
