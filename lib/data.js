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
 * Le circuit de 15 jours proposé sur le site, résumé.
 *
 * La page d'origine déroule les quatorze journées activité par activité :
 * c'est complet, mais ça se lit comme un devis. Ici on ne garde que les
 * étapes et une phrase par étape — de quoi donner envie et rappeler que
 * tout se réécrit. Le détail reste disponible auprès d'Agus.
 */
export const CIRCUIT = {
  titre: "Quinze jours, sept étapes",
  jours: 15,
  joursGuides: 14,
  nuits: 14,
  personnes: 2,
  prix: "2 420 €",
  prixParPersonne: "1 210 €",
  saison: "en basse saison — janvier, février, mars, novembre, décembre",
  formule:
    "Activités + transport + chauffeur-guide francophone. Entrées des sites, activités du programme, véhicule climatisé, carburant et assurance compris.",
  horsForfait: "Hébergements et repas restent à votre charge.",
  degressif:
    "À trois ou quatre, le prix par personne baisse : c'est le même véhicule et le même guide.",
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
