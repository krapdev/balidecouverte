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
  email: "agus.guidebali@gmail.com",
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
};

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
      nom: "Été",
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
  ],
  notes: [
    "Nusa Penida à la journée fait exception : forfait de 230 € pour deux personnes, de novembre à mars.",
    "Sur les circuits de plusieurs jours, l'hébergement est au contraire compris dans le forfait global, avec les activités, le transport et le chauffeur-guide.",
  ],
};

/* ---------- Exemples de démonstration, à remplacer ---------- */

export const EXPERIENCES = [
  {
    id: "cuisine-sidemen",
    title: "Immersion culinaire à Sidemen",
    place: "Sidemen, Karangasem",
    coords: "08°27'S 115°26'E",
    duration: "1 journée",
    price: "à partir de 45 €",
    priceNote: "/ pers.",
    scene: "terraces",
    tag: "Culture",
    text: "Marché du matin avec la famille, préparation du bumbu Bali au mortier de pierre, puis déjeuner assis par terre chez l'habitant, au milieu des rizières irriguées par le subak — la coopérative d'eau qui régit la vallée depuis mille ans.",
  },
  {
    id: "purification",
    title: "Purification secrète",
    place: "Source de Tirta Sudamala",
    coords: "08°25'S 115°28'E",
    duration: "Demi-journée",
    price: "à partir de 38 €",
    priceNote: "/ pers.",
    scene: "spring",
    tag: "Culture",
    text: "Melukat privé aux sources sacrées que les groupes ignorent, guidé par un pemangku (prêtre) du village. Sarong, offrandes et explications en français inclus.",
  },
  {
    id: "cascades",
    title: "Randonnée des cascades oubliées",
    place: "Canyon de Gembleng",
    coords: "08°24'S 115°25'E",
    duration: "5 à 6 h",
    price: "à partir de 52 €",
    priceNote: "/ pers.",
    scene: "canyon",
    tag: "Aventure",
    text: "Descente dans un canyon fermé au tourisme de masse, passages dans l'eau, baignade sous une chute de 20 m. Niveau modéré, faisable dès 10 ans.",
  },
  {
    id: "munduk",
    title: "Nuit sous les étoiles à Munduk",
    place: "Munduk, Buleleng",
    coords: "08°16'S 115°04'E",
    duration: "2 jours / 1 nuit",
    price: "à partir de 95 €",
    priceNote: "/ pers.",
    scene: "plantation",
    tag: "Nature",
    text: "Écolodge en bambou et bois au cœur des plantations de café et de clous de girofle. Torréfaction au feu de bois le soir, bain chaud aux fleurs, lever de soleil sur les lacs jumeaux.",
  },
];

/** Trame d'itinéraire type — le point de départ de la conversation. */
export const ROUTE = [
  {
    days: "Jours 1–2",
    title: "Arrivée & décompression à Sanur",
    text: "Récupération à l'aéroport par Agus, première nuit côté est pour caler le décalage horaire. Balade au marché de nuit, sans programme imposé.",
  },
  {
    days: "Jours 3–5",
    title: "Vallée de Sidemen",
    text: "Le cœur du séjour : rizières du subak, cuisine chez l'habitant, tissage songket, purification à la source. C'est ici qu'on ralentit.",
  },
  {
    days: "Jours 6–7",
    title: "Est sauvage — Amed & Tulamben",
    text: "Villages de pêcheurs, snorkeling sur l'épave, lever de soleil sur l'Agung. Nuits en warung, les pieds dans le sable noir.",
  },
  {
    days: "Jours 8–10",
    title: "Nord — Munduk & les lacs",
    text: "Route des plantations, cascades en série, nuit en écolodge. Températures fraîches, brume du matin sur les lacs jumeaux.",
  },
  {
    days: "Jours 11–12",
    title: "Retour par l'ouest & départ",
    text: "Dernière journée libre selon vos envies : temple d'eau, plage tranquille ou marché d'artisanat. Dépose à l'aéroport.",
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
    text: "Départ à une heure du matin pour atteindre le cratère avant l'aube : les fumerolles de soufre brûlent en flammes bleues, un phénomène qu'on ne voit qu'ici et en Islande. Au lever du jour, le plus grand lac acide du monde vire au turquoise.",
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
