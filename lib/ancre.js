"use client";

/**
 * Aller à une ancre de la page courante — **même si l'URL la porte déjà**.
 *
 * C'est un bug qu'on ne trouve qu'en le vivant, et il était bien là :
 * on coche deux places sur `/envies`, on touche « Ma demande », on
 * atterrit sur `/#sur-mesure`. On remonte lire quelque chose, la barre du
 * panier est toujours là, on la retouche… **et rien ne se passe.**
 *
 * La cause est la même pour `<Link>` et pour un `<a>` géré par le
 * routeur : naviguer vers le fragment sur lequel on est déjà n'est pas
 * une navigation. Aucun événement, donc aucun défilement. Le bouton le
 * plus important de la page mobile devenait inerte dès qu'on s'en était
 * servi une fois.
 *
 * On force donc le défilement à la main quand on est déjà sur la bonne
 * page. `history.replaceState` plutôt que `pushState` : réappuyer sur un
 * bouton qui ne change pas de page ne doit pas empiler une entrée dans
 * l'historique — sinon le bouton « retour » du téléphone ne fait plus
 * que remonter les allers-retours qu'on vient de faire.
 *
 * Ce qui n'est **pas** intercepté, et qui doit continuer de ne pas
 * l'être : le clic milieu, ctrl/cmd/maj-clic, et tout lien qui change
 * réellement de page. On ne se met jamais en travers d'un « ouvrir dans
 * un nouvel onglet ».
 *
 * Le décalage sous la barre collante vient de `[id] { scroll-margin-top }`
 * dans globals.css.
 */

/* Le plafond de durée, en millisecondes, et la pente qui y mène.
   `240 + 0,07 × distance`, plafonné à 420 : environ 280 ms pour un saut de
   section, 420 ms pour la traversée la plus longue de la page (2 723 px du
   hero à la fourche). En dessous de 400 ms sur cette distance on ne suit
   plus le trajet des yeux et l'arrivée ressemble à une téléportation — on
   perd alors ce que le défilement sert justement à donner : le sentiment
   d'où l'on vient. */
const PLANCHER = 240;
const PENTE = 0.07;
const PLAFOND = 420;

let annuler = null;

function douxRefuse() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * ⚠️ **`scroll-behavior: smooth` en CSS n'a aucune durée réglable, et la
 * sienne croît avec la distance.** Du bouton « Par où commencer » à la
 * fourche il y a 2 723 px, et le trajet prenait **683 ms** — mesuré au
 * départ du haut de page, les deux chemins comparés depuis la même
 * position. Ici, plafonné, il en prend **420**.
 *
 * ⚠️ **Se méfier de la première mesure.** Elle annonçait 2,2 s, et elle
 * était fausse deux fois : Playwright fait défiler jusqu'au bouton avant
 * de cliquer — donc le départ n'était pas celui qu'on croyait — et le
 * repère de fin comptait des variations d'un demi-pixel bien après
 * l'arrêt réel. Un écart de ×3 sur la mesure censée justifier le
 * correctif. Comparer deux chemins **depuis le même point de départ**,
 * toujours.
 *
 * Le CSS reste déclaré : il sert de repli quand JavaScript ne répond pas,
 * et pour les défilements que l'on ne déclenche pas nous-mêmes.
 *
 * ⚠️ `behavior: "instant"` sur chaque image est **obligatoire** : sans
 * lui, le `scroll-behavior: smooth` du CSS ré-anime chaque petit saut et
 * les deux animations se combattent — le défilement devient poisseux et
 * n'arrive jamais tout à fait.
 */
export function defilerVers(cible) {
  if (!cible) return;

  const marge = parseFloat(getComputedStyle(cible).scrollMarginTop) || 0;
  const depart = window.scrollY;
  const arrivee = Math.max(
    0,
    Math.min(
      cible.getBoundingClientRect().top + depart - marge,
      document.documentElement.scrollHeight - window.innerHeight,
    ),
  );
  const distance = arrivee - depart;
  if (Math.abs(distance) < 2) return;

  /* `prefers-reduced-motion` ne ralentit pas le mouvement : il l'empêche.
     Pour certaines personnes un défilement filé est une question de
     nausée, pas de goût. */
  if (douxRefuse()) {
    window.scrollTo({ top: arrivee, behavior: "instant" });
    return;
  }

  annuler?.();
  const duree = Math.min(PLAFOND, PLANCHER + Math.abs(distance) * PENTE);
  const t0 = performance.now();
  let image = 0;

  /* Si la personne reprend la main — molette, doigt, touche — on s'arrête
     net. Un défilement automatique qui lutte contre le geste de
     l'utilisateur est pire que pas de défilement du tout. */
  const rendreLaMain = () => annuler?.();
  const gestes = ["wheel", "touchstart", "keydown", "pointerdown"];
  for (const g of gestes)
    window.addEventListener(g, rendreLaMain, { passive: true, once: true });

  annuler = () => {
    cancelAnimationFrame(image);
    for (const g of gestes) window.removeEventListener(g, rendreLaMain);
    annuler = null;
  };

  const pas = (t) => {
    const p = Math.min(1, (t - t0) / duree);
    /* easeOutCubic : part vite, se pose doucement. On veut que le
       mouvement soit lisible dès la première image — c'est ce qui dit
       « le bouton a pris » — et qu'il ne s'arrête pas en butée. */
    const e = 1 - Math.pow(1 - p, 3);
    window.scrollTo({ top: depart + distance * e, behavior: "instant" });
    if (p < 1) image = requestAnimationFrame(pas);
    else annuler?.();
  };
  image = requestAnimationFrame(pas);
}

/**
 * Rendre le focus au clavier, que `preventDefault` nous a fait perdre.
 *
 * ⚠️ Un lien d'ancre natif **déplace le focus** vers sa cible ; l'annuler
 * pour animer le défilement retire donc, sans le vouloir, la seule chose
 * qui rendait le lien utile au clavier et au lecteur d'écran. Le
 * `tabindex="-1"` est posé à la volée et retiré au premier `blur` : on ne
 * laisse pas derrière soi un attribut qui traîne dans le DOM.
 */
function donnerLeFocus(cible) {
  if (cible.tabIndex < 0 && !cible.hasAttribute("tabindex")) {
    cible.setAttribute("tabindex", "-1");
    cible.addEventListener("blur", () => cible.removeAttribute("tabindex"), {
      once: true,
    });
  }
  cible.focus({ preventScroll: true });
}

export function versAncre(e, href) {
  if (!href?.startsWith("#")) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const cible = document.getElementById(href.slice(1));
  if (!cible) return;
  e.preventDefault();
  history.replaceState(null, "", href);
  donnerLeFocus(cible);
  defilerVers(cible);
}

/**
 * La délégation, posée une fois pour toute la page par `<Ancres />`.
 *
 * ⚠️ **Elle existe parce que le hero est un composant serveur.** Son
 * bouton « Par où commencer » est un `<a href="#chemins">` nu, sans
 * gestionnaire ; lui en donner un aurait imposé de passer tout le hero au
 * client pour une seule ligne. Un écouteur délégué corrige **tous** les
 * liens d'ancre du site d'un coup, y compris ceux qu'on écrira demain.
 *
 * ⚠️ Elle se retire devant `defaultPrevented` : les composants qui
 * appellent déjà `versAncre` eux-mêmes (la barre, la barre du bas) ont
 * consommé l'événement, et le traiter deux fois lancerait deux
 * animations concurrentes.
 */
export function ecouterLesAncres() {
  const surClic = (e) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const lien = e.target.closest?.('a[href^="#"]');
    if (!lien || lien.target === "_blank") return;
    const href = lien.getAttribute("href");
    if (!href || href === "#") return;
    if (!document.getElementById(href.slice(1))) return;
    versAncre(e, href);
  };
  document.addEventListener("click", surClic);
  return () => document.removeEventListener("click", surClic);
}
