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
 *
 * ⚠️ **Une entrée par destination, et une destination par entrée.** La
 * liste en a compté neuf, dont trois qui n'emmenaient nulle part de
 * nouveau — mesuré, pas supposé :
 *
 *   - `#valeurs` est **à l'intérieur** de `#esprit` (y 2057 dans une
 *     section qui va de 1392 à 2721). Sauter sur « Qui je suis » posait
 *     déjà le panneau « Mon engagement » à 745 px sur un écran de 900.
 *     Deux entrées, un écran. Le panneau avait été ajouté au menu parce
 *     qu'aucun lien n'y menait ; ce n'est plus vrai, et son sujet est
 *     désormais nommé dans le `gloss` de « Qui je suis ».
 *   - « Mon portrait » promettait « Ma famille, mon pays, mon union » —
 *     mot pour mot les trois points du panneau « Mon engagement ». Le
 *     `gloss` dit maintenant ce que la page **ajoute** : le métier, le
 *     français, le parcours.
 *   - `#chemins` est la fourche, et ses deux branches sont déjà dans le
 *     menu, juste en dessous. Envoyer quelqu'un choisir entre deux
 *     choses qu'on vient de lui lister est un détour. La fourche reste
 *     desservie par le bouton du hero, où elle a un sens : là, on n'a
 *     encore rien listé.
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
    /* Le `gloss` porte les deux sujets de la section, parce que la
       section en porte deux : ce dont Agus vous décharge, puis ce que le
       direct fait vivre. C'est ce qui a permis de retirer l'entrée
       « Mon engagement » sans perdre son sujet. */
    label: "Qui je suis",
    gloss: "Ce dont je vous décharge, ce que le direct fait vivre",
    symbole: "canang",
    barre: true,
  },
  {
    href: "/agus",
    label: "Mon portrait",
    gloss: "Mon métier, le français, mon parcours",
    symbole: "rangs",
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
    /* Promue dans la barre à la place de « Mon engagement » : c'est une
       destination réellement distincte, et `/agus` ne peut pas y monter
       tant que la page porte ses marqueurs « à compléter ». */
    href: "#usages",
    label: "Us et coutumes",
    gloss: "Ce qu'on comprend en arrivant",
    symbole: "nyepi",
    barre: true,
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

/**
 * Les ancres de l'accueil, dans l'ordre de la page — pour le repère.
 *
 * ⚠️ Elle reste **dérivée de NAV** et ne liste donc que les sections du
 * menu. En traversant `#valeurs` ou `#chemins`, qui n'y sont plus, le
 * repère garde la dernière entrée dépassée — « vous êtes quelque part
 * après ce point », la même sémantique que la barre. Y ajouter les
 * sections hors menu éteindrait le repère à chaque fois qu'on les
 * traverse, ce qui est pire que pas de repère du tout.
 */
export const ANCRES = NAV.filter((l) => l.href.startsWith("#")).map((l) =>
  l.href.slice(1)
);
