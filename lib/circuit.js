/**
 * Le jour par jour du circuit de quinze jours.
 *
 * ⚠️ Ce fichier renverse une décision inscrite dans le README, et il faut
 * savoir pourquoi. La règle était : « le jour par jour reste absent, et
 * c'est délibéré : c'est le livrable d'Agus et la raison même de lui
 * écrire. » Deux choses l'ont rendue caduque :
 *
 *   1. **Ce texte est déjà public.** Il est en ligne sur balidecouverte.fr,
 *      mot pour mot. Le cacher ici ne protégeait donc rien : ça privait
 *      seulement le nouveau site de la seule page qui prouve le travail.
 *   2. **C'est ce qu'on vient chercher.** « Quinze jours, sept étapes,
 *      1 210 € » ne se décide pas sur un résumé. Quelqu'un qui hésite
 *      veut savoir ce qu'il fait le neuvième jour.
 *
 * Ce qui reste vrai de l'ancienne règle : **l'accueil n'en montre que le
 * résumé.** Le détail vit sur `/circuit`, où l'on va quand on est
 * intéressé — pas dans la page d'accueil, où il ajouterait huit écrans
 * de défilement à quelqu'un qui n'a pas encore décidé.
 *
 * Le texte suit celui d'Agus. Les durées, les mentions « guide de sentier
 * obligatoire », « boissons non incluses », les noms de lieux : rien n'a
 * été arrondi. **Ne pas embellir** — un programme est un engagement, et
 * c'est lui qu'on lui opposera.
 */

/** Ce que le devis suppose. Ses conditions, pas les nôtres. */
export const CADRE = {
  personnes: "2 voyageurs",
  jours: 15,
  joursGuides: 14,
  nuits: 14,
  periode: "Janvier, février, mars, novembre et décembre 2026",
  /* Sa page dit « 4 personnes (y compris moi-même) » à un endroit et
     « 3 personnes avec les valises » à un autre : c'est la même chose
     dite deux fois, et c'est la formulation de data.js qui tranche —
     quatre à bord, chauffeur-guide compris, donc trois voyageurs avec
     les bagages. Ne pas écrire « 4 voyageurs » : ce serait faux. */
  vehicule:
    "Toyota Avanza climatisée — quatre personnes à bord, moi compris, avec les valises",
  degressif:
    "À trois ou quatre voyageurs, le prix par personne baisse. À vous de me dire combien vous êtes.",
};

/**
 * Les quinze jours. `nuit` est l'étape où l'on dort le soir même ; le
 * quinzième n'en a pas, c'est le retour.
 */
export const JOURS = [
  {
    j: 1,
    nuit: "Candidasa",
    titre: "L'arrivée, sans rien à porter",
    etapes: [
      "Je vous accueille à l'aéroport",
      "Massage balinais à côté de l'aéroport",
      "Transfert vers l'est de Bali",
    ],
  },
  {
    j: 2,
    nuit: "Candidasa",
    titre: "Le royaume de Karangasem",
    etapes: [
      "Marché traditionnel d'Amlapura, où la vie locale se déroule sans nous attendre",
      "Palais royal de Karangasem",
      "Palais d'eau de Tirta Gangga, puis promenade dans les rizières voisines (environ 45 minutes)",
      "La corniche est en voiture",
      "Baignade à la plage de Pasir Putih",
    ],
  },
  {
    j: 3,
    nuit: "Sidemen",
    titre: "Tenganan, à pied",
    etapes: [
      "Marche d'environ 2 h 30 du village de Kastala au village indigène de Tenganan, par les rizières et les villages. La présence d'un guide de sentier est obligatoire",
      "Visite du village indigène de Tenganan",
      "Baignade ou snorkeling au Blue Lagoon, près du port de Padang Bai",
      "L'ancienne cour de justice de Klungkung",
    ],
  },
  {
    j: 4,
    nuit: "Ubud",
    titre: "Le temple mère, et les laves du Batur",
    etapes: [
      "Temple mère de Besakih, le plus vénéré des Balinais hindous",
      "Marche d'environ une heure dans la coulée de lave du volcan Batur (1 717 mètres)",
      "Temple des bains sacrés de Tirta Empul",
      "Les rizières de Tegallalang",
    ],
  },
  {
    j: 5,
    nuit: "Ubud",
    titre: "Barong, les singes et le cochon grillé",
    etapes: [
      "Spectacle de Barong à Batubulan — la bataille du Bien et du Mal, qui se termine sur un match nul. Quinze minutes de Legong, puis une opérette masquée d'environ trois quarts d'heure",
      "Ateliers de sculpture sur pierre et sur bois",
      "Forêt des singes d'Ubud",
      "Déjeuner de cochon grillé à la broche chez Mère Oka (boissons non incluses)",
      "Marché d'Ubud et ses rues commerçantes",
      "Soin du corps dans un spa d'Ubud — massage, gommage, bain floral, environ deux heures",
    ],
  },
  {
    j: 6,
    nuit: "Ubud",
    titre: "La grotte de l'éléphant, et le théâtre d'ombres",
    etapes: [
      "Temple de Goa Gajah, littéralement la grotte de l'éléphant (XIᵉ siècle)",
      "Marché traditionnel et artisanal de Sukawati",
      "Déjeuner de poisson grillé sur la plage de Lebih, très fréquentée par les Balinais (boissons non incluses)",
      "Village traditionnel de Penglipuran",
      "Rencontre avec un marionnettiste : vous apprenez à jouer du gender (xylophone de métal) et du rindik (xylophone de bambou), puis vous assistez à un théâtre d'ombres d'une vingtaine de minutes",
    ],
  },
  {
    j: 7,
    nuit: "Ubud",
    titre: "Descente à vélo, rafting sur l'Ayung",
    etapes: [
      "Descente à vélo depuis la région du Batur jusqu'à Ubud — 90 % de descente, à travers les plantations de mandariniers et les rizières",
      "Rafting dans les gorges de l'Ayung, déjeuner et deux boissons sans alcool inclus",
    ],
  },
  {
    j: 8,
    nuit: "Munduk",
    titre: "Jatiluwih, et la cuisine chez l'habitant",
    etapes: [
      "Rizières de Jatiluwih, au patrimoine mondial de l'UNESCO depuis 2012, avec une balade possible d'environ 45 minutes",
      "Marché composite de Bedugul — fruits, légumes, fleurs, épices, artisanat",
      "Temple d'Ulun Danu Beratan, le plus photographié de l'île",
      "Cours de cuisine balinaise et d'offrandes chez l'habitant, à Munduk, suivi du dîner que vous aurez préparé",
    ],
  },
  {
    j: 9,
    nuit: "Munduk",
    titre: "Blimbing, le café et le grand ficus",
    etapes: [
      "Marche d'environ 1 h 30 dans les rizières en terrasse de Blimbing, très peu visitées",
      "Montée dans la plantation de caféiers jusqu'à la cascade de Pujungan (une heure aller-retour)",
      "Le grand ficus, un arbre qui enjambe la route au fond de la région, loin de tout circuit touristique",
    ],
  },
  {
    j: 10,
    nuit: "Lovina",
    titre: "Tamblingan en pirogue, Sekumpul à pied",
    etapes: [
      "Cascade de Munduk",
      "Forêt primaire de Tamblingan, et tour du lac en pirogue (environ 1 h 45)",
      "Marche d'environ deux heures jusqu'à la cascade de Sekumpul, la plus belle du nord de Bali, où l'on peut se baigner. La présence d'un guide de sentier est obligatoire",
    ],
  },
  {
    j: 11,
    nuit: "Pemuteran",
    titre: "Les dauphins, à 5 h 45",
    etapes: [
      "Départ à 5 h 45 en bateau à balancier : le lever du jour sur la mer, et les dauphins",
      "Retour à l'hôtel pour le petit-déjeuner",
      "Temple bouddhiste de Banjar",
      "Baignade dans la source d'eau chaude de Banjar",
      "Temple de Melanting, avec une promenade possible dans les vignes voisines (environ 30 minutes)",
    ],
  },
  {
    j: 12,
    nuit: "Pemuteran",
    titre: "Menjangan, et la plus grande saline de Bali",
    etapes: [
      "Snorkeling autour de l'île de Menjangan — tombants vertigineux, coraux, myriades de poissons (non compris dans la formule)",
      "La plus grande saline de Bali, environ 400 hectares, que les cars ne connaissent pas",
      "Le coucher du soleil depuis une colline de Pemuteran",
    ],
  },
  {
    j: 13,
    nuit: "Sanur",
    titre: "La côte ouest, jusqu'à Tanah Lot",
    etapes: [
      "La corniche nord-ouest puis sud-ouest de l'île, en voiture",
      "Village chrétien de Palasari, son église et sa grotte de Marie qui rappelle Lourdes",
      "Port de Perancak et ses grands bateaux de pêche multicolores",
      "Temple de Tanah Lot",
    ],
  },
  {
    j: 14,
    nuit: "Sanur",
    titre: "Denpasar, puis le Bukit",
    etapes: [
      "Marché traditionnel et marché aux oiseaux de Denpasar",
      "La presqu'île de Bukit, et la plage de Padang-Padang",
      "Temple d'Uluwatu, bâti sur une falaise qui rappelle Étretat",
      "Fin de mes prestations",
    ],
  },
  {
    j: 15,
    nuit: null,
    titre: "Le retour",
    etapes: [
      "Transfert à l'aéroport par un chauffeur",
      "Fin de ma gestion. Je vous souhaite un bon retour",
    ],
  },
];

/**
 * Ce que la formule comprend. La liste est longue et c'est exactement
 * l'argument : le prix ne se compare pas à celui d'une voiture de
 * location tant qu'on n'a pas vu ce qu'il y a dedans.
 */
export const COMPRIS = [
  "Toutes les entrées : temples, palais, sites archéologiques, rizières, plages, parkings",
  "Un massage balinais (1ᵉʳ jour)",
  "Deux prestations de guide de sentier, obligatoires sur ces chemins (3ᵉ et 10ᵉ jour)",
  "Un spectacle de danse-opérette balinaise (5ᵉ jour)",
  "Deux entrées à la forêt des singes (5ᵉ jour)",
  "Un soin du corps (5ᵉ jour)",
  "Trois déjeuners (5ᵉ, 6ᵉ et 7ᵉ jour)",
  "La rencontre avec le marionnettiste (6ᵉ jour)",
  "La location des vélos et toute sa logistique (7ᵉ jour)",
  "Le rafting sur l'Ayung (7ᵉ jour)",
  "Le cours de cuisine balinaise et d'offrandes, et le dîner (8ᵉ jour)",
  "La promenade en pirogue sur le lac Tamblingan (10ᵉ jour)",
  "La sortie en bateau à balancier à la rencontre des dauphins (11ᵉ jour)",
  "Le bain chaud de Banjar (11ᵉ jour)",
  "Ma rémunération pendant 14 jours, mon propre hébergement compris",
  "Le véhicule climatisé, son assurance et l'essence pendant 14 jours",
];

/** Ce qu'elle ne comprend pas. Dit d'avance, jamais découvert au devis. */
export const NON_COMPRIS = [
  "Vos hébergements — mais je peux les choisir, vous les proposer et les réserver",
  "Les petits-déjeuners, les déjeuners (sauf les 5ᵉ, 6ᵉ et 7ᵉ jour) et les dîners (sauf le 8ᵉ)",
  "Masque, tuba, palmes, plongée sous-marine, bateau et ticket pour le snorkeling autour de Menjangan (12ᵉ jour)",
  "Les frais supplémentaires dus à un changement de programme de dernière minute à votre initiative",
  "Les assurances particulières auxquelles vous souhaiteriez souscrire",
];

/**
 * Le résumé de l'accueil : six lignes, et pas une de plus.
 *
 * Elles sont choisies pour ce qu'elles font faire, pas pour ce qu'elles
 * font voir — c'est la différence entre un circuit et une liste de
 * temples. Chacune renvoie à un jour réel du programme.
 */
export const TEMPS_FORTS = [
  { jour: 3, texte: "Deux heures et demie à pied jusqu'à Tenganan, par les rizières" },
  { jour: 7, texte: "La descente du Batur à vélo, puis le rafting dans les gorges de l'Ayung" },
  { jour: 8, texte: "Cuisiner chez l'habitant à Munduk, et dîner de ce qu'on a fait" },
  { jour: 10, texte: "Deux heures de marche jusqu'à la cascade de Sekumpul, et la baignade" },
  { jour: 11, texte: "Les dauphins à 5 h 45, en bateau à balancier" },
  { jour: 12, texte: "Les quatre cents hectares de la saline de Pemuteran, sans personne" },
];
