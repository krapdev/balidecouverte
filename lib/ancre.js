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
 * dans globals.css, et le défilement doux de `html { scroll-behavior }` —
 * ne rien ajouter ici.
 */
export function versAncre(e, href) {
  if (!href?.startsWith("#")) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const cible = document.getElementById(href.slice(1));
  if (!cible) return;
  e.preventDefault();
  history.replaceState(null, "", href);
  cible.scrollIntoView({ block: "start" });
}
