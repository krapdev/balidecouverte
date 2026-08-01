/**
 * Données de démonstration.
 * À remplacer par un CMS (Sanity, Payload…) ou de simples fichiers MDX.
 */

export const WHATSAPP_NUMBER = "628123688936";
export const WHATSAPP_DISPLAY = "+62 812 3688 936";

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
