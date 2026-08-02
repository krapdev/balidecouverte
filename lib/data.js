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
  },
  {
    id: "bali-lombok",
    nom: "Bali + Lombok",
    iles: ["bali", "lombok"],
    temperament: "Îlots déserts et plages blanches",
    jours: 16,
    joursGuides: 15,
    nuits: 15,
    prixPers: "1 590 €",
    prixDeux: "3 180 €",
    scene: "rinjani",
    vols: "Trois traversées en bateau rapide comprises",
    etapes: [
      { lieu: "Ubud", region: "Bali, centre", nuits: 4 },
      { lieu: "Munduk", region: "Bali, centre-nord", nuits: 2 },
      { lieu: "Sidemen", region: "Bali, centre-est", nuits: 2 },
      { lieu: "Senaru", region: "Lombok, nord", nuits: 1 },
      { lieu: "Tetebatu", region: "Lombok, est", nuits: 1 },
      { lieu: "Sekotong", region: "Lombok, sud-ouest", nuits: 3 },
      { lieu: "Senggigi", region: "Lombok, ouest", nuits: 1 },
      { lieu: "Sanur", region: "Bali, sud", nuits: 1 },
    ],
    secrets: [
      {
        titre: "Sept Gili que personne ne nomme",
        texte: "Sudak, Kedis, Nanggu, puis Layar, Goleng, Asahan et Rengit — en bateau traditionnel, grillade de poissons sur un îlot désert. Rien à voir avec les Gili des brochures.",
      },
      {
        titre: "Une journée dans les rizières",
        texte: "Chez l'habitant au nord-est de Tabanan : confection des offrandes, huile de coco, labour, plantation du riz, poissons attrapés à la main. Prévoir des vêtements de change.",
      },
      {
        titre: "Loyok et ses paniers d'osier",
        texte: "Un village d'artisans à l'est de Lombok, puis deux heures de marche dans les rizières de Tetebatu.",
      },
    ],
  },
  {
    id: "bali-java",
    nom: "Bali + Java",
    iles: ["java", "bali"],
    temperament: "Volcans mythiques et temples monumentaux",
    jours: 19,
    joursGuides: 18,
    nuits: 18,
    prixPers: "2 210 €",
    prixDeux: "4 420 €",
    scene: "ijen",
    vols: "Traversée en ferry Java–Bali comprise",
    etapes: [
      { lieu: "Yogyakarta", region: "Java, centre", nuits: 2 },
      { lieu: "Malang", region: "Java, est", nuits: 1 },
      { lieu: "Bromo", region: "Java, est", nuits: 1 },
      { lieu: "Banyuwangi", region: "Java, est", nuits: 1 },
      { lieu: "Pemuteran", region: "Bali, nord-ouest", nuits: 2 },
      { lieu: "Munduk", region: "Bali, centre-nord", nuits: 2 },
      { lieu: "Ubud", region: "Bali, centre", nuits: 4 },
      { lieu: "Amed", region: "Bali, est", nuits: 2 },
      { lieu: "Sidemen", region: "Bali, centre-est", nuits: 2 },
      { lieu: "Sanur", region: "Bali, sud", nuits: 1 },
    ],
    secrets: [
      {
        titre: "La flamme bleue de l'Ijen",
        texte: "Départ à une heure du matin. Le soufre brûle en bleu dans le cratère — on ne voit ça qu'ici et en Islande.",
      },
      {
        titre: "Mesangin, sur la grande place",
        texte: "Le soir à Yogyakarta : traverser les yeux fermés entre deux grands ficus. Les habitants disent que si vous passez, ça porte bonheur. Presque personne n'y arrive.",
      },
      {
        titre: "Trois volcans avant le jour",
        texte: "Le Bromo en 4×4 à 3 h, l'Ijen à 1 h, le Batur à 2 h 15. Trois levers de soleil depuis trois sommets.",
      },
    ],
  },
  {
    id: "bali-komodo",
    nom: "Bali + Komodo",
    iles: ["bali", "komodo"],
    temperament: "Deux nuits en mer, chez les dragons",
    jours: 14,
    joursGuides: 13,
    nuits: 13,
    prixPers: "2 135 €",
    prixDeux: "4 270 €",
    scene: "komodo",
    vols: "Vols intérieurs Denpasar–Labuan Bajo compris",
    etapes: [
      { lieu: "Candidasa", region: "Bali, est", nuits: 2 },
      { lieu: "Sidemen", region: "Bali, centre-est", nuits: 1 },
      { lieu: "Ubud", region: "Bali, centre", nuits: 3 },
      { lieu: "Munduk", region: "Bali, centre-nord", nuits: 1 },
      { lieu: "Lovina", region: "Bali, nord", nuits: 1 },
      { lieu: "Sanur", region: "Bali, sud", nuits: 1 },
      { lieu: "À bord", region: "baies de Komodo et Rinca", nuits: 2 },
      { lieu: "Labuan Bajo", region: "Flores", nuits: 1 },
      { lieu: "Jimbaran", region: "Bali, sud", nuits: 1 },
    ],
    secrets: [
      {
        titre: "L'île de Kalong au crépuscule",
        texte: "Des milliers de roussettes quittent l'île toutes ensemble au coucher du soleil. On regarde ça depuis le pont du bateau.",
      },
      {
        titre: "Taka Makassar",
        texte: "Un banc de sable en croissant au milieu de nulle part, et le Manta Point juste à côté.",
      },
      {
        titre: "Dormir dans une baie",
        texte: "Deux nuits à bord, à Loh Buaya puis Loh Liang. Repas compris, et le silence.",
      },
    ],
  },
  {
    id: "flores-komodo",
    nom: "Flores + Komodo",
    iles: ["flores", "komodo"],
    temperament: "L'expédition — villages et Kelimutu",
    jours: 14,
    joursGuides: 12,
    nuits: 13,
    prixPers: "1 870 €",
    prixDeux: "3 740 €",
    scene: "kelimutu",
    vols: "Vols intérieurs à votre charge, y compris ceux d'Agus",
    etapes: [
      { lieu: "Sanur", region: "Bali", nuits: 1 },
      { lieu: "Maumere", region: "Flores, est", nuits: 2 },
      { lieu: "Moni", region: "Flores", nuits: 1 },
      { lieu: "Riung", region: "Flores", nuits: 2 },
      { lieu: "Bajawa", region: "Flores", nuits: 2 },
      { lieu: "Ruteng", region: "Flores", nuits: 1 },
      { lieu: "Waerebo", region: "Flores, montagne", nuits: 1 },
      { lieu: "Labuan Bajo", region: "Flores, ouest", nuits: 2 },
      { lieu: "Sanur", region: "Bali", nuits: 1 },
    ],
    secrets: [
      {
        titre: "Une nuit à Waerebo",
        texte: "Moto-taxi, puis deux heures et demie de marche avec un guide de sentier, pour dormir dans une maison traditionnelle en cône. Confort minimum : un matelas. C'est le moment fort du circuit.",
      },
      {
        titre: "Linko Randang",
        texte: "Des rizières dessinées en toile d'araignée, visibles de nulle part ailleurs au monde.",
      },
      {
        titre: "Les roussettes d'Ontoloe",
        texte: "Dans le parc national des 17 îles, en bateau traditionnel, avec un déjeuner de poisson grillé sur une plage désertique.",
      },
    ],
  },
];

/** Ce que tous les circuits ont en commun — les signatures d'Agus. */
export const SIGNATURES = [
  "La rencontre avec le marionnettiste — gender, rindik et théâtre d'ombres — revient dans quatre circuits sur cinq.",
  "Le cours de cuisine et d'offrandes chez l'habitant, dans trois circuits.",
  "La marche de deux heures trente vers Tenganan, avec un guide de sentier.",
  "La forêt primaire de Tamblingan en pirogue, et les rizières de Jatiluwih.",
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
 * Deux façons de voyager, et la distinction est structurante : on ne
 * construit pas la même chose selon qu'on garde son hôtel ou qu'on
 * traverse l'île. La poser tôt évite au voyageur de lire tout le site
 * avant de comprendre ce qu'il cherche.
 */
export const FORMULES = [
  {
    id: "journee",
    titre: "À la journée",
    texte:
      "Vous logez où vous voulez, Agus vient vous chercher le matin et vous ramène le soir. Une journée ou dix, sans engagement de circuit.",
    detail: "Tarif au jour et par véhicule.",
  },
  {
    id: "circuit",
    titre: "En circuit",
    texte:
      "On traverse l'île, ou plusieurs îles, d'un bout à l'autre. Agus organise tout et peut réserver vos hébergements.",
    detail: "Formule globale, prix par personne.",
  },
];

/**
 * Les journées types d'Agus, ramenées à une ligne chacune.
 *
 * La page d'origine en détaille quatorze, matin et après-midi. Ici on
 * n'en garde que le caractère : le voyageur coche ce qui lui parle, il
 * n'achète pas un programme. Le contenu exact se discute avec Agus —
 * c'est lui qui sait ce qui est faisable depuis votre hôtel.
 */
export const JOURNEES = [
  {
    id: "ubud-temples",
    titre: "Ubud et ses temples",
    texte: "Goa Gajah, la Lune de Pejeng, le mausolée de Gunung Kawi, les bains sacrés de Tirta Empul et le village de Penglipuran.",
  },
  {
    id: "cuisine",
    titre: "Cuisine balinaise face aux rizières",
    texte: "La danse du Barong le matin, puis deux heures de cuisine dans un warung — et on déjeune de ce qu'on a fait.",
  },
  {
    id: "habitant",
    titre: "Une journée de vie balinaise",
    texte: "Chez une famille au nord-est de Tabanan : offrandes, torréfaction du café, huile de coco, labour et plantation du riz. Prévoyez des vêtements de rechange.",
  },
  {
    id: "sportive",
    titre: "Journée sportive",
    texte: "Rafting dans les gorges d'Ayung le matin, descente à vélo depuis le volcan l'après-midi — 90 % en roue libre.",
  },
  {
    id: "munduk",
    titre: "Les trois cascades de Munduk",
    texte: "Trois heures de marche entre girofliers, cacaoyers et caféiers, puis une source d'eau chaude. Guide de sentier obligatoire.",
  },
  {
    id: "dauphins",
    titre: "Le nord et les dauphins",
    texte: "Bateau à balancier à l'aube, petit-déjeuner au bord de l'eau, temple bouddhiste de Brahma Vihara Arama et bain chaud à Banjar.",
  },
  {
    id: "peche",
    titre: "Pêcher avec un pêcheur",
    texte: "Au filet et à la ligne, en bateau à balancier, puis on cuisine la prise et on partage le repas avec sa famille. Et la saline de Kusamba.",
  },
  {
    id: "nusa-penida",
    titre: "Nusa Penida",
    texte: "Klingking, Broken Beach, Angel Billabong, et les raies manta si elles veulent bien. Forfait à part, de novembre à mars.",
  },
  /* Récupéré de l'ancienne section « Quatre moments » : c'était le seul
     des quatre à ne pas déjà figurer dans cette liste. */
  {
    id: "marionnettiste",
    titre: "Chez le marionnettiste",
    texte: "En fin de journée, région d'Ubud. Il vous met un gender et un rindik entre les mains — le xylophone de métal et celui de bambou — puis éteint la lumière et lance son théâtre d'ombres.",
  },
];

export const JOURNEES_EPIGRAPHE =
  "Être en vacances, c'est n'avoir rien à faire et avoir toute la journée pour le faire.";

export const JOURNEES_RESTE =
  "Six autres journées existent, organisées par région — le sud et la presqu'île de Bukit, l'est et Tirta Gangga, le centre-est et Besakih, le centre-nord et Tamblingan, le sud-ouest et Tanah Lot. Agus vous propose celles qui collent à l'endroit où vous logez.";

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
  "Sembalun",
  "Tulamben",
  "Banyuwedang",
];

/**
 * Les îles sœurs — Bali d'abord, le reste ensuite.
 *
 * Ces quatre entrées ne sont PAS un second catalogue : chacune renvoie au
 * circuit qui la contient déjà (`circuit`). L'ancienne version affichait
 * ses propres prix — Java « à partir de 185 € » quand le circuit Bali +
 * Java est à 2 210 € — soit deux grilles incompatibles pour la même
 * destination. C'était la principale source de confusion sur les prix.
 * Un seul chiffre fait foi désormais : celui du circuit.
 *
 * Un fait dur par île, pas trois : ce qui rend la chose concrète, sans
 * transformer la section en fiche technique.
 */
export const ISLANDS = [
  {
    id: "java-ijen",
    scene: "ijen",
    island: "Java",
    title: "Le feu bleu du Kawah Ijen",
    fait: "Départ à 1 h du matin, 3 h de marche de nuit",
    circuit: "bali-java",
    text: "Les fumerolles de soufre brûlent en flammes bleues avant l'aube — on ne voit ça qu'ici et en Islande. Puis Borobudur, Prambanan, le Bromo.",
  },
  {
    id: "lombok-rinjani",
    scene: "rinjani",
    island: "Lombok",
    title: "Le Rinjani et les villages sasak",
    fait: "Trek au cratère, ou version vallée sans dénivelé",
    circuit: "bali-lombok",
    text: "Le lac Segara Anak et ses sources chaudes pour les marcheurs ; pour les autres, la vallée de Sembalun, la cascade de Tiu Kelep et les maisons de bambou.",
  },
  {
    id: "komodo-padar",
    scene: "komodo",
    island: "Komodo",
    title: "Les trois baies de Padar",
    fait: "Vie à bord, marches courtes — faisable en famille",
    circuit: "bali-komodo",
    text: "Padar au lever du soleil, les dragons de Rinca avec un ranger, la plage rose et les raies manta de Manta Point.",
  },
  {
    id: "flores-kelimutu",
    scene: "kelimutu",
    island: "Flores",
    title: "Les trois lacs du Kelimutu",
    fait: "Ascension avant l'aube, les lacs changent de couleur",
    circuit: "flores-komodo",
    text: "Trois cratères qui ne sont jamais de la même couleur d'une saison à l'autre, le parc des 17 îles, et la nuit à Waerebo.",
  },
];

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
