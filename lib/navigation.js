/**
 * Les entrées de navigation, en un seul endroit.
 *
 * Elles vivaient en trois exemplaires — barre du haut, menu mobile, pied
 * de page — et les trois listes avaient déjà divergé. Elles portent
 * désormais trois choses de plus que leur libellé :
 *
 *   - `symbole` : le dessin de la famille balinaise (voir Symboles.jsx)
 *     qui désigne cette section. **Ce n'est pas une décoration
 *     interchangeable.** La règle du fichier des symboles vaut ici : un
 *     symbole doit pouvoir s'expliquer. Chacun est choisi parce qu'il
 *     nomme quelque chose que la section contient réellement — le canang
 *     qu'Agus dépose chaque matin sur son tableau de bord, le padma déjà
 *     en filigrane du panneau des valeurs, la porte fendue en deux
 *     exactement là où la page propose deux chemins, les penjor qui
 *     bordent les routes du circuit, le damier noir et blanc pour la
 *     page où l'on dit les prix.
 *   - `gloss` : une ligne qui dit ce qu'on trouve là. Sur mobile, un
 *     menu est le seul plan de la page dont on dispose ; une liste de
 *     titres nus oblige à ouvrir pour savoir. C'est ce qui transforme le
 *     menu en sommaire, et c'est là que se gagne la « visibilité » — pas
 *     dans la taille du texte.
 *   - `barre` : présent dans la barre du haut. **Six au maximum** — au
 *     septième, les liens passent à la ligne à 1280 px et la hauteur de
 *     la barre casse.
 *
 * Sur-Mesure n'est pas dans la liste : le menu mobile se termine par le
 * bouton « Demander un devis », qui mène au même endroit. L'ancienne
 * version affichait les deux, à trois centimètres l'un de l'autre.
 */
/* ⚠️ Les libellés sont à la **première personne**, comme tout le site.
   La barre disait « Qui je suis », puis « Son engagement », puis « Son
   portrait » : trois entrées côte à côte, deux voix. Le visiteur ne
   s'en formule pas la raison, mais il enregistre qu'on lui parle
   d'Agus par moments et qu'Agus lui parle à d'autres — et c'est
   exactement ce qu'un site tenu par un intermédiaire ferait. */
export const NAV = [
  {
    href: "#esprit",
    label: "Qui je suis",
    gloss: "Ce dont je vous décharge",
    symbole: "canang",
    barre: true,
  },
  {
    href: "#valeurs",
    label: "Mon engagement",
    gloss: "Ce que le direct fait vivre",
    symbole: "padma",
    barre: true,
  },
  {
    href: "/agus",
    label: "Mon portrait",
    gloss: "Ma famille, mon pays, mon union",
    symbole: "rangs",
  },
  {
    href: "#chemins",
    label: "Par où commencer",
    gloss: "Deux façons d'entrer",
    symbole: "candi",
  },
  {
    href: "/circuit",
    label: "Le circuit",
    gloss: "Quinze jours, sept étapes",
    symbole: "penjor",
    barre: true,
  },
  {
    href: "/envies",
    label: "Vos envies",
    gloss: "Classiques et places secrètes",
    symbole: "tedung",
    barre: true,
  },
  {
    href: "#usages",
    label: "Us et coutumes",
    gloss: "Ce qu'on comprend en arrivant",
    symbole: "nyepi",
  },
  {
    href: "#temoignages",
    label: "Livre d'or",
    gloss: "Sept voyageurs, leurs mots",
    symbole: "gong",
    barre: true,
  },
  {
    href: "/tarifs",
    label: "Tarifs",
    gloss: "Trois façons de compter",
    symbole: "poleng",
    barre: true,
  },
];

/** Les ancres de l'accueil, dans l'ordre de la page — pour le repère. */
export const ANCRES = NAV.filter((l) => l.href.startsWith("#")).map((l) =>
  l.href.slice(1)
);
