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
  syndicat: "Membre du syndicat des guides de Bali",
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

/**
 * Quatre moments extraits du circuit réel de 15 jours. Ce ne sont plus
 * des exemples inventés : chacun figure au programme d'Agus. On en
 * montre quatre, pas quarante — le reste se découvre en parlant avec lui.
 */
export const EXPERIENCES = [
  {
    id: "cuisine-munduk",
    title: "Cuisine et offrandes chez l'habitant",
    place: "Munduk",
    coords: "08°16'S 115°04'E",
    duration: "Après-midi et dîner",
    price: "Compris",
    priceNote: "dans le circuit",
    scene: "plantation",
    tag: "Culture",
    text: "On cuisine avec la famille, on apprend à tresser les offrandes, et on dîne du fruit de son travail. C'est la soirée dont les voyageurs reparlent le plus.",
  },
  {
    id: "marionnettiste",
    title: "Chez le marionnettiste",
    place: "Région d'Ubud",
    coords: "08°30'S 115°15'E",
    duration: "Fin de journée",
    price: "Compris",
    priceNote: "dans le circuit",
    scene: "wayang",
    tag: "Culture",
    text: "Il vous met un gender et un rindik entre les mains — le xylophone de métal et celui de bambou — puis éteint la lumière et lance son théâtre d'ombres. Vingt minutes, et vous ne regardez plus Bali pareil.",
  },
  {
    id: "dauphins-lovina",
    title: "Les dauphins au lever du jour",
    place: "Lovina, côte nord",
    coords: "08°09'S 115°01'E",
    duration: "Départ à 5 h 45",
    price: "Compris",
    priceNote: "dans le circuit",
    scene: "dauphins",
    tag: "Nature",
    text: "En bateau à balancier, avant le petit-déjeuner. Le soleil sort de la mer de Java, et les dauphins passent. Retour à l'hôtel pour le café.",
  },
  {
    id: "tenganan",
    title: "À pied jusqu'à Tenganan",
    place: "De Kastala à Tenganan",
    coords: "08°28'S 115°34'E",
    duration: "2 h 30 de marche",
    price: "Compris",
    priceNote: "dans le circuit",
    scene: "terraces",
    tag: "Aventure",
    text: "On traverse les rizières et les villages jusqu'à Tenganan, l'un des rares villages bali aga qui vit encore selon ses règles d'avant l'hindouisme. Un guide de sentier vous accompagne — c'est la règle, ici.",
  },
];

/**
 * Les sept étapes du circuit de 15 jours, avec le nombre de nuits.
 * Une phrase par étape : on ouvre l'appétit, on ne rédige pas le devis.
 */
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
 * Les îles sœurs — l'aventure continue au-delà de Bali. Agus organise le
 * transport et accompagne, ou passe le relais à un guide de confiance sur
 * place selon la destination.
 */
export const ISLANDS = [
  {
    id: "java-ijen",
    island: "Java",
    title: "Le feu bleu du Kawah Ijen",
    place: "Banyuwangi, Java Est",
    coords: "08°03'S 114°14'E",
    duration: "2 jours / 1 nuit",
    level: "Soutenu — 3 h de marche de nuit",
    access: "Ferry depuis Gilimanuk, 1 h de traversée",
    price: "à partir de 185 €",
    priceNote: "/ pers.",
    scene: "ijen",
    text: "Départ à une heure du matin pour atteindre le cratère avant l'aube : les fumerolles de soufre brûlent en flammes bleues, un phénomène qu'on ne voit qu'ici et en Islande. À prolonger vers le centre de Java — Borobudur, Prambanan, le palais des sultans, le plateau de Dieng — et vers le Bromo et le Merapi.",
  },
  {
    id: "lombok-rinjani",
    island: "Lombok",
    title: "Le Rinjani et les villages sasak",
    place: "Sembalun, Lombok",
    coords: "08°25'S 116°28'E",
    duration: "3 à 5 jours",
    level: "Exigeant en version trek, facile en version vallée",
    access: "Vol de 30 min ou bateau rapide depuis Padangbai",
    price: "à partir de 240 €",
    priceNote: "/ pers.",
    scene: "rinjani",
    text: "Deux façons d'aborder le volcan : le trek jusqu'au cratère et au lac Segara Anak avec ses sources chaudes, ou la version douce — la vallée de Sembalun, la cascade de Tiu Kelep et les maisons de bambou des villages sasak.",
  },
  {
    id: "flores-kelimutu",
    island: "Flores",
    title: "Le Kelimutu et les 17 îles",
    place: "Moni, Flores",
    coords: "08°46'S 121°49'E",
    duration: "14 jours",
    level: "Modéré — ascension avant l'aube",
    access: "Vol depuis Denpasar, puis route",
    price: "circuit complet, sur devis",
    priceNote: "",
    scene: "kelimutu",
    text: "Les trois lacs de cratère du Kelimutu, qui changent de couleur d'une saison à l'autre, le parc national des 17 îles, les villages traditionnels et le snorkeling. Agus propose ce circuit en 14 jours, seul ou combiné avec Komodo et Rinca.",
  },
  {
    id: "komodo-padar",
    island: "Komodo",
    title: "Les trois baies de Padar",
    place: "Labuan Bajo, Flores",
    coords: "08°39'S 119°34'E",
    duration: "3 jours / 2 nuits",
    level: "Accessible — vie à bord, marches courtes",
    access: "Vol de 1 h 15 depuis Denpasar, puis bateau",
    price: "à partir de 420 €",
    priceNote: "/ pers.",
    scene: "komodo",
    text: "Trois jours en bateau entre les îles : la montée de Padar au lever du soleil sur ses trois baies, les dragons de Rinca accompagnés d'un ranger, la plage rose, et les raies manta de Manta Point.",
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
