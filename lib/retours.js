/**
 * D'où l'on vient, et comment y retourner.
 *
 * Les tarifs vivent sur leur propre page. Jusqu'ici le lien « Retour à
 * l'accueil » renvoyait à `/`, c'est-à-dire **tout en haut** : quelqu'un
 * qui consultait le prix depuis la fiche du circuit, à sept écrans de
 * défilement, se retrouvait devant le hero et devait tout refaire. C'est
 * le genre de détail qui fait fermer l'onglet.
 *
 * Le trajet aller mémorise donc sa section de départ (`?de=circuit`), et
 * le retour ramène à cette ancre. Volontairement un paramètre d'URL et
 * non `history.back()` : avec la navigation client de l'App Router,
 * `document.referrer` garde la valeur du **chargement du document**, pas
 * du dernier écran vu — le test « d'où vient-on » y est donc faux
 * précisément dans le cas courant. Une ancre, elle, est vraie partout,
 * se partage, et survit à un rechargement.
 */

/* Dans l'ordre de la page : `sectionCourante()` les parcourt de haut en
   bas et garde la dernière franchie. */
export const SECTIONS = [
  { id: "top", label: "Retour à l'accueil" },
  { id: "esprit", label: "Retour à la présentation" },
  { id: "chemins", label: "Retour aux deux chemins" },
  { id: "circuit", label: "Retour au circuit" },
  { id: "envies", label: "Retour à mes envies" },
  { id: "usages", label: "Retour aux us et coutumes" },
  { id: "sur-mesure", label: "Retour à ma demande" },
];

const PAR_ID = Object.fromEntries(SECTIONS.map((s) => [s.id, s]));

/** L'ancre et le libellé du retour, pour une valeur de `?de=` quelconque. */
export function retour(de) {
  const s = PAR_ID[de] ?? SECTIONS[0];
  return { href: s.id === "top" ? "/" : `/#${s.id}`, label: s.label };
}

/**
 * La section actuellement sous les yeux. Le seuil de 140 px correspond
 * à la barre collante (68) plus une marge : sans lui, la section qui
 * vient d'entrer par le bas serait déclarée courante.
 */
export function sectionCourante() {
  if (typeof document === "undefined") return "top";
  let courante = "top";
  for (const { id } of SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 140) courante = id;
  }
  return courante;
}

/** L'URL des tarifs, lestée de la section d'où l'on part. */
export function urlTarifs() {
  const de = sectionCourante();
  return de === "top" ? "/tarifs" : `/tarifs?de=${de}`;
}
