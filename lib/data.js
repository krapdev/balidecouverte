/**
 * Deux natures de données cohabitent ici, et il faut les distinguer :
 *
 *  — CONTACT, AGUS, TARIFS : faits relevés sur balidecouverte.fr. À
 *    corriger seulement sur indication d'Agus.
 *  — EXPERIENCES, ROUTE, ISLANDS : exemples de démonstration écrits pour
 *    la maquette. Le vrai catalogue est une série d'excursions à la
 *    journée numérotées et de circuits packagés à prix fixe ; il reste à
 *    reprendre depuis le site actuel.
 */

/* ---------- Faits vérifiés sur balidecouverte.fr ---------- */

export const WHATSAPP_NUMBER = "628123688936";
export const WHATSAPP_DISPLAY = "+62 81 236 88 936";

export const CONTACT = {
  email: "agus.yudiarta@balidecouverte.fr",
  /* Les deux adresses existent : celle-ci figure en pied de toutes les
     pages, la gmail est donnée sur la page Présentation. */
  emailPerso: "agus.guidebali@gmail.com",
  telephone: "+62 81 236 88 936",
  adresse: "JL. Letda Reta Utara No 3, 80234 Denpasar — Bali",
  facebook: "https://www.facebook.com/agus.guidebali",
  instagram: "https://www.instagram.com/agus.guidebali",
  pseudo: "agus.guidebali",
};

export const AGUS = {
  nom: "Agus Yudiarta",
  depuis: "octobre 2005",
  langues: "français et anglais",
  diplome: "Diplômé guide francophone",
  /* Ses mots exacts : « une union de guides de Bali », pas un syndicat. */
  union: "Membre d'une union de guides de Bali",
  enfants: "deux filles de 12 et 9 ans, un garçon de 5 ans",
  territoires:
    "Bali, Lombok, Java Centre et Est, Sumbawa, Flores, Komodo et Rinca",
  vehicules: [
    "Toyota Avanza — 4 personnes chauffeur-guide compris, avec bagages",
    "Suzuki APV — 5 personnes chauffeur-guide compris, avec bagages",
    "Minibus — au-delà de 6 personnes, 11 places maximum",
  ],
};

/**
 * Les cinq circuits d'Agus, réduits à ce qui aide à choisir.
 *
 * Les pages d'origine déroulent chaque journée activité par activité :
 * complet, mais ça se lit comme un devis. Ici trois niveaux — le
 * tempérament et trois chiffres pour trancher, le squelette des étapes
 * pour se projeter, trois places secrètes pour donner envie. Le jour par
 * jour reste chez Agus : c'est son travail, et c'est le prétexte au
 * premier message.
 *
 * Attention en comparant : les vols intérieurs sont compris dans
 * Bali + Komodo et pas dans Flores. Sans cette mention, Flores paraît
 * moins cher alors qu'il va plus loin.
 */
/**
 * Un seul circuit exposé : celui de Bali.
 *
 * Les quatre autres — Bali + Lombok, Bali + Java, Bali + Komodo,
 * Flores + Komodo — sortent de l'île et ont été retirés le temps de
 * recentrer le parcours sur Bali. **Les données restent dans l'historique
 * git** : les remettre est l'affaire de cinq minutes, ne pas les réécrire
 * de mémoire.
 */
export const CIRCUITS = [
  {
    id: "bali",
    nom: "Bali",
    iles: ["bali"],
    temperament: "Culture, rizières et rencontres",
    jours: 15,
    joursGuides: 14,
    nuits: 14,
    prixPers: "1 210 €",
    prixDeux: "2 420 €",
    scene: "terraces",
    vols: null,
    etapes: [
      { lieu: "Candidasa", region: "est", nuits: 2 },
      { lieu: "Sidemen", region: "centre-est", nuits: 1 },
      { lieu: "Ubud", region: "centre", nuits: 4 },
      { lieu: "Munduk", region: "centre-nord", nuits: 2 },
      { lieu: "Lovina", region: "nord", nuits: 1 },
      { lieu: "Pemuteran", region: "nord-ouest", nuits: 2 },
      { lieu: "Sanur", region: "sud", nuits: 2 },
    ],
    secrets: [
      {
        titre: "Le grand ficus",
        texte: "Un arbre qui enjambe la route, au fond de la région de Munduk, loin de toute visite touristique.",
      },
      {
        titre: "La saline de Pemuteran",
        texte: "Quatre cents hectares, la plus grande de Bali, et personne — les cars passent à côté sans s'arrêter.",
      },
      {
        titre: "Les dauphins à 5 h 45",
        texte: "En bateau à balancier depuis Lovina, avant le petit-déjeuner. Le jour se lève sur la mer de Java.",
      },
    ],
  }
];



/**
 * Grille tarifaire des excursions à la journée, telle qu'affichée sur le
 * site. Le prix est par jour et par véhicule, pas par personne.
 */
/**
 * L'engagement — l'angle le plus fort du positionnement, et il est
 * entièrement dans les mots d'Agus : « ambassadeur du tourisme de mon
 * pays », l'union de guides, le travail en direct.
 *
 * Écrit par le positif : ce que le direct permet, plutôt qu'une charge
 * contre des tiers qu'on ne peut pas documenter.
 */
/**
 * Les deux chemins — le cœur du parcours.
 *
 * Le voyageur ne choisit pas un produit, il choisit **par où il entre
 * dans la conversation** : partir du circuit qu'Agus a déjà conduit, ou
 * partir de ce qui lui donne envie. Les deux mènent au même endroit — un
 * voyage sur mesure, et un message à Agus.
 *
 * Ne pas rajouter une seconde fourche à côté (l'ancienne opposait « à la
 * journée » et « en circuit ») : avec deux fourches, le voyageur ne sait
 * plus laquelle l'engage.
 */
export const CHEMINS = [
  {
    id: "circuit",
    titre: "Partir de son circuit",
    texte:
      "Quinze jours à travers Bali qu'Agus a conduits des dizaines de fois. Vous le prenez comme base et vous le déformez : on garde, on jette, on rallonge.",
    detail: "Le squelette existe, vous l'ajustez.",
    ancre: "#circuit",
    action: "Voir le circuit",
  },
  {
    id: "envies",
    titre: "Partir de vos envies",
    texte:
      "Les classiques qu'on vient chercher à Bali, et les endroits qu'Agus est à peu près seul à montrer. Vous cochez, il en fait un itinéraire.",
    detail: "Vos choix deviennent le circuit.",
    ancre: "#envies",
    action: "Voir les envies",
  },
];

/**
 * Les activités — la matière du chemin « partir de vos envies ».
 *
 * Deux familles, et la distinction n'est pas cosmétique :
 *
 *   - `classique` : ce qu'on vient chercher à Bali. Le voyageur les
 *     connaît déjà de nom, il veut savoir qu'Agus les fait.
 *   - `secret` : ce qu'Agus est à peu près seul à montrer. C'est son
 *     avantage, et c'était jusqu'ici enterré au troisième niveau de
 *     lecture — il fallait déplier une fiche circuit pour tomber sur le
 *     grand ficus ou la saline.
 *
 * On nomme la place secrète et on donne envie ; on ne donne ni l'adresse
 * ni le chemin. Ce qui se monnaie, c'est de l'y conduire.
 *
 * Cocher n'achète rien : c'est le squelette du sur-mesure, et ce que le
 * voyageur dira en ouvrant la conversation.
 */
export const ACTIVITES = [
  {
    id: "ubud-temples",
    famille: "classique",
    titre: "Ubud et ses temples",
    texte: "Goa Gajah, la Lune de Pejeng, le mausolée de Gunung Kawi, les bains sacrés de Tirta Empul et le village de Penglipuran.",
  },
  {
    id: "jatiluwih",
    famille: "classique",
    titre: "Les rizières de Jatiluwih",
    texte: "Les terrasses classées à l'UNESCO, et le subak — le système d'irrigation que les villages se partagent depuis le IXe siècle.",
  },
  {
    id: "besakih",
    famille: "classique",
    titre: "Besakih et le Batur",
    texte: "Le temple mère sur les flancs de l'Agung, puis une heure de marche dans la coulée de lave du Batur.",
  },
  {
    id: "dauphins",
    famille: "classique",
    titre: "Les dauphins de Lovina",
    texte: "Bateau à balancier à l'aube, petit-déjeuner au bord de l'eau, temple bouddhiste de Brahma Vihara Arama et bain chaud à Banjar.",
  },
  {
    id: "cuisine",
    famille: "classique",
    titre: "Cuisine balinaise face aux rizières",
    texte: "La danse du Barong le matin, puis deux heures de cuisine dans un warung — et on déjeune de ce qu'on a fait.",
  },
  {
    id: "sportive",
    famille: "classique",
    titre: "Journée sportive",
    texte: "Rafting dans les gorges d'Ayung le matin, descente à vélo depuis le volcan l'après-midi — 90 % en roue libre.",
  },
  {
    id: "nusa-penida",
    famille: "classique",
    titre: "Nusa Penida",
    texte: "Klingking, Broken Beach, Angel Billabong, et les raies manta si elles veulent bien. Forfait à part, de novembre à mars.",
  },

  /* Les places secrètes — remontées des fiches circuits, où personne
     n'allait les chercher. */
  {
    id: "ficus",
    famille: "secret",
    photo: {
      scene: "plantation",
      brief: "le ficus qui enjambe la route, quelqu'un dessous pour l'échelle",
      alt: "Le grand ficus de Munduk, ses racines enjambant la route",
      src: null, // ← remplacer par le chemin de la vraie photo
    },
    titre: "Le grand ficus",
    texte: "Un arbre qui enjambe la route, au fond de la région de Munduk. Aucun car ne s'y arrête, aucune brochure n'en parle.",
  },
  {
    id: "saline",
    famille: "secret",
    photo: {
      scene: "terraces",
      brief: "les bassins au soleil rasant, un saunier au travail",
      alt: "Les bassins de la saline de Pemuteran au soleil couchant",
      src: null, // ← remplacer par le chemin de la vraie photo
    },
    titre: "La saline de quatre cents hectares",
    texte: "La plus grande de Bali, du côté de Pemuteran — et personne. Les cars passent devant sans ralentir.",
  },
  {
    id: "tenganan",
    famille: "secret",
    photo: {
      scene: "terraces",
      brief: "le sentier entre les rizières, puis une ruelle du village",
      alt: "Le sentier de Kastala à Tenganan à travers les rizières",
      src: null, // ← remplacer par le chemin de la vraie photo
    },
    titre: "Tenganan, à pied",
    texte: "Deux heures trente de marche depuis Kastala à travers rizières et villages, jusqu'à l'un des rares villages bali aga qui vit encore selon ses règles d'avant l'hindouisme.",
  },
  {
    id: "peche",
    famille: "secret",
    photo: {
      scene: "dauphins",
      brief: "le bateau à balancier à l'aube, les mains sur le filet",
      alt: "Un pêcheur relevant son filet depuis un bateau à balancier",
      src: null, // ← remplacer par le chemin de la vraie photo
    },
    titre: "Pêcher avec un pêcheur",
    texte: "Au filet et à la ligne, en bateau à balancier, puis on cuisine la prise et on partage le repas avec sa famille. Et la saline de Kusamba.",
  },
  {
    id: "habitant",
    famille: "secret",
    photo: {
      scene: "plantation",
      brief: "les mains qui tressent l'offrande, la torréfaction du café",
      alt: "Des mains balinaises tressant une offrande de feuille de palme",
      src: null, // ← remplacer par le chemin de la vraie photo
    },
    titre: "Une journée de vie balinaise",
    texte: "Chez une famille au nord-est de Tabanan : offrandes, torréfaction du café, huile de coco, labour et plantation du riz. Prévoyez des vêtements de rechange.",
  },
  {
    id: "marionnettiste",
    famille: "secret",
    photo: {
      scene: "wayang",
      brief: "l'écran éclairé de dos, la silhouette de la marionnette",
      alt: "Le théâtre d'ombres : marionnette découpée sur l'écran éclairé",
      src: null, // ← remplacer par le chemin de la vraie photo
    },
    titre: "Chez le marionnettiste",
    texte: "Il vous met un gender et un rindik entre les mains — le xylophone de métal et celui de bambou — puis éteint la lumière et lance son théâtre d'ombres.",
  },
  {
    id: "munduk",
    famille: "secret",
    photo: {
      scene: "canyon",
      brief: "la cascade en contre-plongée, un marcheur pour l'échelle",
      alt: "L'une des trois cascades de Munduk vue d'en bas",
      src: null, // ← remplacer par le chemin de la vraie photo
    },
    titre: "Les trois cascades de Munduk",
    texte: "Trois heures de marche entre girofliers, cacaoyers et caféiers, puis une source d'eau chaude. Guide de sentier obligatoire.",
  },
];

export const FAMILLES = [
  {
    id: "classique",
    titre: "Les classiques",
    texte: "Ce qu'on vient chercher à Bali, et qu'il serait dommage de manquer.",
  },
  {
    id: "secret",
    titre: "Les places secrètes",
    texte: "Ce qu'Agus est à peu près seul à montrer. C'est là que le voyage bascule.",
  },
];

export const ACTIVITES_EPIGRAPHE =
  "Être en vacances, c'est n'avoir rien à faire et avoir toute la journée pour le faire.";

export const ACTIVITES_RESTE =
  "Trois journées ou quinze, c'est vous qui voyez : Agus vient vous chercher à votre hôtel pour une seule journée, ou construit le circuit entier. Cette liste n'est pas fermée : d'autres journées existent, par région — le sud et la presqu'île de Bukit, l'est et Tirta Gangga, le centre-nord et Tamblingan, le sud-ouest et Tanah Lot. Agus vous propose celles qui collent à l'endroit où vous logez.";

/**
 * « Partir en paix » — Agus peut prendre en charge les hébergements.
 * Le site le taisait, et c'est une réassurance majeure : sur les
 * circuits, la formule peut être globale, hôtels compris et réservés.
 */
export const HEBERGEMENT = {
  titre: "Il peut aussi s'occuper des hôtels.",
  texte:
    "Par défaut, vous réservez vos hébergements vous-même — Agus vous dit où dormir et pourquoi. Mais si vous préférez ne rien avoir à faire, il les choisit, vous les propose et les réserve : la formule devient globale, hôtels, activités, transport et chauffeur-guide réunis. Vous n'avez plus qu'à venir.",
};

export const ENGAGEMENT = {
  titre: "Voyager avec Agus, c'est faire vivre les guides de Bali.",
  points: [
    {
      titre: "En direct, sans agence",
      texte: "Ce que vous payez va au guide, au chauffeur et aux familles qui vous accueillent — pas à une commission d'intermédiaire. C'est ce qui rend le métier vivable, et c'est ce qui permet à Agus de refuser les cadences imposées par les groupes.",
    },
    {
      titre: "Une union de guides, pas un homme seul",
      texte: "Agus travaille avec d'autres guides francophones et anglophones au sein d'une union de guides de Bali. Quand il n'est pas disponible, il passe le relais à quelqu'un qu'il connaît — jamais à un inconnu envoyé par une centrale.",
    },
    {
      titre: "Ambassadeur, et il le dit ainsi",
      texte: "« En tant que guide, je suis un ambassadeur du tourisme de mon pays, et je peux donc vous assurer que je travaille professionnellement et surtout avec tout mon cœur. »",
      citation: true,
    },
  ],
  chute:
    "Chaque voyage organisé en direct, c'est un guide balinais de plus qui vit de son métier sans dépendre d'une agence — et une famille de Sidemen, de Munduk ou de Tenganan qui accueille chez elle plutôt que de servir un autocar.",
};

export const TARIFS = {
  colonnes: ["1 à 3 personnes", "4 à 5 personnes"],
  saisons: [
    {
      nom: "Basse saison",
      mois: "Janvier, février, mars, novembre, décembre",
      prix: ["80 €", "90 €"],
    },
    {
      nom: "Haute saison",
      mois: "Avril, mai, juin, octobre",
      prix: ["90 €", "100 €"],
    },
    {
      nom: "Saison estivale",
      mois: "Juillet, août, septembre",
      prix: ["100 €", "120 €"],
    },
  ],
  auDela: "Au-delà de 5 personnes, Agus établit un devis.",
  inclus: [
    "La location du véhicule climatisé",
    "Le carburant et l'assurance du véhicule",
    "Les frais de parking",
    "Les honoraires du chauffeur-guide francophone",
  ],
  exclus: [
    "Les entrées des sites : temples, sites archéologiques, palais, rizières, plages payantes",
    "Les activités payantes inscrites au programme",
    "L'hébergement, que vous réservez vous-même",
    "Les repas",
    "L'assurance voyage",
  ],
  /**
   * Le supplément est le point le plus honnête de la grille : Agus dort
   * et mange sur place quand vous logez loin de Denpasar, et il le dit
   * d'avance plutôt que de le noyer dans un devis.
   */
  supplement:
    "Si vous logez dans l'est (Candidasa, Sidemen, Amed, Tulamben), le nord-centre (Jatiluwih, Munduk, Kintamani) ou le nord et nord-ouest (Lovina, Pemuteran), comptez 15 € par nuit pour l'hébergement et les repas d'Agus.",
  nusaPenida:
    "Nusa Penida à la journée est un forfait à part : 230 € pour deux personnes de novembre à mars, bateau rapide aller-retour depuis Sanur, voiture et chauffeur des deux côtés, entrées des plages comprises.",
  circuits:
    "Sur un circuit de plusieurs jours, la formule change : activités, entrées, transport et chauffeur-guide sont réunis dans un forfait global.",
  ailleurs:
    "Java centre — Borobudur, Prambanan, le palais des sultans, le plateau de Dieng — les volcans Merapi, Bromo et Ijen, Lombok, Sumbawa, Flores et l'archipel de Komodo : Agus en parle avec vous.",
};

export const ROUTE = [
  {
    days: "2 nuits",
    title: "Candidasa — l'est",
    text: "Le marché d'Amlapura à l'heure où il vit vraiment, le palais royal de Karangasem, et le palais d'eau de Tirta Gangga qu'on quitte à pied par les rizières.",
  },
  {
    days: "1 nuit",
    title: "Sidemen — le centre-est",
    text: "Deux heures et demie de marche depuis Kastala jusqu'à Tenganan, village indigène qui vit encore selon ses propres règles. Un guide de sentier vous accompagne, c'est obligatoire ici.",
  },
  {
    days: "4 nuits",
    title: "Ubud — le centre",
    text: "Besakih le temple mère, une heure de marche dans la coulée de lave du Batur, le Barong à Batubulan, et une descente à vélo de la région du volcan jusqu'à Ubud — 90 % en roue libre.",
  },
  {
    days: "2 nuits",
    title: "Munduk — le centre-nord",
    text: "Les rizières de Jatiluwih classées à l'UNESCO, puis un cours de cuisine et d'offrandes chez l'habitant : vous dînez de ce que vous avez préparé.",
  },
  {
    days: "1 nuit",
    title: "Lovina — le nord",
    text: "Départ à 5 h 45 en bateau à balancier. Le jour se lève sur la mer, et les dauphins arrivent.",
  },
  {
    days: "2 nuits",
    title: "Pemuteran — le nord-ouest",
    text: "Les tombants de Menjangan en snorkeling, la plus grande saline de Bali — quatre cents hectares que les touristes ignorent — et le coucher de soleil depuis la colline.",
  },
  {
    days: "2 nuits",
    title: "Sanur — le sud",
    text: "Le marché aux oiseaux de Denpasar, le village chrétien de Palasari et sa grotte de Marie, Tanah Lot, puis Uluwatu sur sa falaise.",
  },
];

export const STYLES = [
  "Nature",
  "Culture",
  "Aventure",
  "Détente",
  "Famille",
  "Gastronomie",
];

export const DURATIONS = [
  "5 à 7 jours",
  "10 à 14 jours",
  "15 à 21 jours",
  "Plus de 3 semaines",
  "Je ne sais pas encore",
];

const MOIS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

/** 18 mois glissants à partir du mois prochain. */
export function monthOptions(from = new Date()) {
  const out = [];
  for (let i = 1; i <= 18; i++) {
    const d = new Date(from.getFullYear(), from.getMonth() + i, 1);
    out.push(`${MOIS[d.getMonth()]} ${d.getFullYear()}`);
  }
  return out;
}

/** Étapes du bandeau défilant sous le hero. */
export const DESTINATIONS = [
  "Sidemen",
  "Munduk",
  "Amed",
  "Tirta Gangga",
  "Nusa Penida",
  "Jatiluwih",
  "Pemuteran",
  "Tenganan",
  "Tulamben",
  "Banyuwedang",
];

/* Les îles sœurs (Java, Lombok, Komodo, Flores) ont été retirées le
   temps de recentrer le parcours sur Bali. Les données restent dans
   l'historique git — ne pas les réécrire de mémoire. */

/**
 * Ce qui se passe à la période choisie. Les saisons sont fiables ; les
 * dates de cérémonies, non — Galungan et Kuningan suivent le cycle
 * pawukon de 210 jours et se déplacent chaque année, Nyepi suit le
 * calendrier saka. On dit ce qu'on sait et on laisse Agus confirmer le
 * reste, plutôt que d'afficher un calendrier faux.
 */
export function periodNote(month) {
  const m = month.split(" ")[0];
  const seche = ["Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre"];
  const saison = seche.includes(m)
    ? "Saison sèche"
    : "Saison des pluies";
  const notes = [];

  if (seche.includes(m)) {
    notes.push(
      "Ciel dégagé et mer calme : c'est la fenêtre pour le Rinjani et pour Komodo, où les traversées deviennent difficiles le reste de l'année."
    );
  } else {
    notes.push(
      "Averses courtes en fin d'après-midi, rizières éclatantes et sites déserts. Les tarifs sont plus doux, mais la mer se ferme parfois du côté de Komodo."
    );
  }
  if (m === "Juillet" || m === "Août") {
    notes.push(
      "Haute saison européenne : les écolodges de Sidemen et de Munduk se réservent plusieurs mois à l'avance."
    );
  }
  if (m === "Mars") {
    notes.push(
      "Nyepi, le jour du silence, tombe en mars : pendant 24 h l'île entière s'arrête — aucun vol, aucune lumière, personne dehors. C'est une expérience rare, mais elle se prépare. La date exacte suit le calendrier saka, Agus vous la confirme."
    );
  }
  notes.push(
    "Galungan et Kuningan, les grandes fêtes des ancêtres, reviennent tous les 210 jours et se déplacent donc chaque année : demandez à Agus si elles tombent pendant votre séjour, les penjor bordent alors toutes les routes."
  );
  return { saison, notes };
}
