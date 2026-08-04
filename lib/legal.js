/**
 * Les données des pages légales.
 *
 * ⚠️ **Ces textes sont une rédaction, pas un avis juridique.** Ils sont
 * complets et cohérents avec ce que le site annonce, mais ils doivent
 * être relus par un professionnel du droit français du tourisme avant
 * mise en ligne. Les points qui appellent cette relecture sont listés
 * dans le README, section « Les pages légales ».
 *
 * Tout ce qui est marqué `null` ci-dessous s'affiche en clair sur la
 * page, en rouge, avec la mention « à compléter ». **C'est voulu** : une
 * page légale à trous qui a l'air complète est plus dangereuse qu'une
 * page visiblement inachevée, parce qu'on la met en ligne sans la voir.
 */

export const MAJ = "à compléter avant la mise en ligne";

export const EDITEUR = {
  /* Statut confirmé : entrepreneur individuel indonésien. */
  nom: "Agus Yudiarta",
  forme: "Entrepreneur individuel de droit indonésien",
  adresse: "JL. Letda Reta Utara No 3, 80234 Denpasar — Bali, Indonésie",
  /* NIB : Nomor Induk Berusaha, l'identifiant d'entreprise indonésien.
     NPWP : le numéro fiscal. L'un des deux au moins doit figurer. */
  identifiant: null,
  identifiantLabel: "Numéro d'enregistrement (NIB) ou numéro fiscal (NPWP)",
  directeurPublication: "Agus Yudiarta",
  email: "agus.yudiarta@balidecouverte.fr",
  telephone: "+62 81 236 88 936",
  /* Le diplôme et l'union sont des faits déjà affichés sur le site. */
  qualification: "Guide touristique diplômé, francophone, en activité depuis octobre 2005",
  union: "Membre d'une union de guides de Bali",
};

export const HEBERGEUR = {
  /* Obligation française : la LCEN impose de nommer l'hébergeur, avec
     son adresse et son téléphone. Ce n'est pas facultatif, même pour un
     éditeur établi hors de France dès lors que le site vise la France. */
  nom: null,
  adresse: null,
  telephone: null,
};

export const ASSURANCE = {
  /* Responsabilité civile professionnelle : à faire figurer avec le nom
     de l'assureur, le numéro de police et surtout **l'étendue
     géographique** — une police indonésienne qui ne couvre pas les
     réclamations portées devant un tribunal français ne protège de
     rien dans le cas qui compte. */
  assureur: null,
  police: null,
  couverture: null,
};

export const GARANTIE = {
  /* Protection contre l'insolvabilité. Elle devient obligatoire dès que
     le voyage vendu est un « forfait touristique » — c'est-à-dire dès
     qu'un hébergement est vendu avec le transport. Voir le README. */
  organisme: null,
  montant: null,
};

export const MEDIATEUR = {
  /* Tout professionnel qui vend à des consommateurs français doit leur
     désigner un médiateur de la consommation, et le nommer dans ses
     CGV. Le MTV (Médiation Tourisme et Voyage) est celui du secteur. */
  nom: null,
  adresse: null,
  site: null,
};

/**
 * Le barème d'annulation.
 *
 * ⚠️ **C'est une proposition, pas les conditions d'Agus.** Elle suit ce
 * qui se pratique chez les petits opérateurs et elle est défendable en
 * droit français : les paliers sont progressifs, le premier ne retient
 * que les frais réellement engagés, et rien n'est retenu au-delà du prix
 * du voyage. Agus doit la valider ou la corriger — c'est le seul endroit
 * à changer, tout le reste des CGV y renvoie.
 */
export const ANNULATION = {
  valide: false,
  paliers: [
    {
      delai: "Plus de 45 jours avant le départ",
      retenue: "Aucune retenue",
      detail:
        "Les sommes versées sont intégralement remboursées, déduction faite des frais réellement engagés et justifiés — une nuit d'hôtel non remboursable, un billet de bateau déjà émis.",
    },
    {
      delai: "De 45 à 30 jours",
      retenue: "15 % du prix total",
      detail: "Les frais engagés et justifiés restent dus en plus si leur montant dépasse cette retenue.",
    },
    { delai: "De 29 à 15 jours", retenue: "30 % du prix total", detail: null },
    { delai: "De 14 à 7 jours", retenue: "50 % du prix total", detail: null },
    {
      delai: "Moins de 7 jours, ou non-présentation",
      retenue: "100 % du prix total",
      detail:
        "Les journées réservées ne peuvent plus être proposées à d'autres voyageurs.",
    },
  ],
};

/* Les modalités de paiement, telles qu'Agus les pratique. */
export const PAIEMENT = {
  acompte: "30 %",
  acompteValide: false,
  moyens: [
    "Virement bancaire, avant le départ",
    "Espèces sur place, en euros ou en roupies indonésiennes",
  ],
};
