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
  /**
   * **L'adresse publique, confirmée par Agus.** C'est elle et elle seule
   * qui s'affiche et qui reçoit : pied de page, aperçu du message,
   * lien `mailto:` et données structurées — cinq endroits, une seule
   * source.
   */
  email: "agus.yudiarta@balidecouverte.fr",
  /* La gmail existe et figure sur la page Présentation du site actuel.
     Elle est gardée ici comme **fait relevé**, utile le jour où le reste
     du contenu sera repris — pas comme adresse de contact. Ne pas
     l'afficher : Agus a tranché en faveur de l'adresse du domaine. */
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
  famille: "Marié, deux filles de 12 et 9 ans et un garçon de 5 ans",
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
    /* « Mon » et non « son » : tout le reste de la page est à la première
       personne, et la paire se lit mieux — mon circuit / vos envies.

       « On l'ajuste ensemble » plutôt que « déformez-le » : la promesse
       n'est pas que le circuit est modifiable, c'est qu'Agus est dans la
       pièce quand on le modifie. On évite en revanche « déjà préparé »,
       qui est le vocabulaire du produit sur étagère — exactement ce que
       la section du circuit passe son temps à démentir. Ce qui vaut ici,
       c'est qu'il l'ait **conduit**, pas qu'il l'ait préparé. */
    titre: "Partir de mon circuit",
    texte:
      "Commencez par mon circuit : quinze jours à travers Bali que j'ai déjà conduits des dizaines de fois. Puis on l'ajuste ensemble — on garde, on jette, on rallonge.",
    detail: "Le squelette existe, on l'ajuste ensemble.",
    ancre: "#circuit",
    action: "Voir le circuit",
  },
  {
    id: "envies",
    titre: "Partir de vos envies",
    texte:
      "Les classiques qu'on vient chercher à Bali, et les endroits que je suis à peu près seul à montrer. Vous cochez, j'en fais un itinéraire.",
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
 * **Même structure pour les deux familles** : trois prises de vue, un
 * texte court pour la carte, un récit pour le plein écran. Seule la
 * rubrique change, pas la fiche — deux gabarits auraient laissé croire
 * que les classiques comptent moins.
 *
 *   `texte`  — la carte. Court : il est coupé à trois lignes, calé sur
 *              la hauteur de la vignette.
 *   `recit`  — le plein écran. Ce qu'on ne peut pas dire en trois
 *              lignes : le déroulé, ce qu'on ressent, l'utile.
 *   `photos` — trois briefs qui ne se répètent pas : un plan large, un
 *              détail, une présence humaine.
 *
 * ⚠️ Les `recit` sont **rédigés à partir des pages d'Agus**, pas dictés
 * par lui. Les faits (lieux, durées, saisons) en viennent ; la mise en
 * mots est de nous. À lui faire relire avant mise en ligne.
 *
 * On nomme la place secrète et on donne envie ; on ne donne ni l'adresse
 * ni le chemin. Ce qui se monnaie, c'est de l'y conduire.
 */
export const ACTIVITES = [
  {
    id: "ubud-temples",
    famille: "classique",
    titre: "Ubud et ses temples",
    texte: "Goa Gajah, la Lune de Pejeng, le mausolée de Gunung Kawi, les bains sacrés de Tirta Empul et le village de Penglipuran.",
    recit: "La journée qui donne les clés du reste du séjour. On entre par Goa Gajah, la grotte de l'Éléphant, puis la Lune de Pejeng — le plus grand tambour de bronze d'Asie du Sud-Est, coulé il y a plus de deux mille ans. Gunung Kawi et ses mausolées taillés dans la falaise se méritent : trois cents marches à descendre, autant à remonter. À Tirta Empul, les Balinais viennent se purifier sous les fontaines ; on peut y entrer, sarong obligatoire. Penglipuran ferme la journée — un village où chaque portail est identique au suivant, sur toute la longueur de la rue.",
    photos: [
      { scene: "wayang", brief: "plan large : les mausolées de Gunung Kawi dans la falaise", alt: "Les mausolées taillés dans la falaise de Gunung Kawi", src: null },
      { scene: "canyon", brief: "détail : l'eau qui sort des fontaines de Tirta Empul", alt: "Les fontaines de purification de Tirta Empul", src: null },
      { scene: "terraces", brief: "la rue de Penglipuran et ses portails alignés", alt: "La rue centrale du village de Penglipuran", src: null },
    ],
  },
  {
    id: "jatiluwih",
    famille: "classique",
    titre: "Les rizières de Jatiluwih",
    texte: "Les terrasses classées à l'UNESCO, et le subak — le système d'irrigation que les villages se partagent depuis le IXe siècle.",
    recit: "Six cents hectares de terrasses, et pas une clôture. Ce qui est classé à l'UNESCO ici, ce n'est pas le paysage mais le subak : la façon dont les villages se partagent l'eau depuis le IXe siècle, temple par temple, canal par canal, sans qu'aucune administration n'ait jamais eu à trancher. Je vous explique comment ça tient — c'est une leçon de gouvernance autant qu'une promenade. On marche autant qu'on veut, le sentier est plat, et la lumière de fin d'après-midi vaut le détour.",
    photos: [
      { scene: "terraces", brief: "plan large : l'étagement des terrasses jusqu'à l'horizon", alt: "Les terrasses de Jatiluwih s'étageant jusqu'à l'horizon", src: null },
      { scene: "terraces", brief: "détail : un canal du subak, l'eau qui passe d'un niveau à l'autre", alt: "Un canal d'irrigation du subak", src: null },
      { scene: "plantation", brief: "un riziculteur au travail, chapeau conique", alt: "Un riziculteur travaillant dans les terrasses", src: null },
    ],
  },
  {
    id: "besakih",
    famille: "classique",
    titre: "Besakih et le Batur",
    texte: "Le temple mère sur les flancs de l'Agung, puis une heure de marche dans la coulée de lave du Batur.",
    recit: "Besakih est le temple mère de Bali : vingt-trois sanctuaires étagés sur le flanc de l'Agung, le volcan que les Balinais tiennent pour le centre du monde. En 1963, l'éruption a tout ravagé autour et s'est arrêtée aux marches du temple — je vous montrerai où. L'après-midi, on marche une heure dans la coulée de lave du Batur : du noir à perte de vue, encore tiède par endroits, et la végétation qui recommence. Prévoyez des chaussures fermées.",
    photos: [
      { scene: "terraces", brief: "plan large : les toits étagés de Besakih devant l'Agung", alt: "Les toits étagés du temple de Besakih devant le mont Agung", src: null },
      { scene: "canyon", brief: "la coulée de lave noire du Batur, texture au sol", alt: "La coulée de lave noire du Batur", src: null },
      { scene: "wayang", brief: "une offrande déposée sur un autel du temple", alt: "Une offrande déposée sur un autel de Besakih", src: null },
    ],
  },
  {
    id: "dauphins",
    famille: "classique",
    titre: "Les dauphins de Lovina",
    texte: "Bateau à balancier à l'aube, petit-déjeuner au bord de l'eau, temple bouddhiste de Brahma Vihara Arama et bain chaud à Banjar.",
    recit: "Départ à cinq heures quarante-cinq, en bateau à balancier, alors qu'il fait encore nuit. Le soleil sort de la mer de Java et les dauphins passent — ils sont sauvages, personne ne les appelle, certains matins ils ne viennent pas. Retour pour le petit-déjeuner au bord de l'eau. La suite est plus douce : Brahma Vihara Arama, le seul monastère bouddhiste de l'île, puis les bains chauds sulfureux de Banjar, sous les gargouilles de pierre. Prévoyez un maillot.",
    photos: [
      { scene: "dauphins", brief: "les bateaux à balancier au lever du soleil sur la mer de Java", alt: "Des bateaux à balancier au lever du soleil au large de Lovina", src: null },
      { scene: "wayang", brief: "le monastère de Brahma Vihara Arama, les stupas dorées", alt: "Les stupas du monastère bouddhiste de Brahma Vihara Arama", src: null },
      { scene: "canyon", brief: "les bains chauds de Banjar, la vapeur et les gargouilles", alt: "Les bassins d'eau chaude sulfureuse de Banjar", src: null },
    ],
  },
  {
    id: "cuisine",
    famille: "classique",
    titre: "Cuisine balinaise face aux rizières",
    texte: "La danse du Barong le matin, puis deux heures de cuisine dans un warung — et on déjeune de ce qu'on a fait.",
    recit: "Le matin, la danse du Barong à Batubulan : le lion mythique contre la sorcière Rangda, un combat que personne ne gagne jamais — c'est le propos. L'après-midi, deux heures de cuisine dans un warung face aux rizières. On commence par le bumbu, la pâte d'épices qu'on pile au mortier et qui sert de base à presque tout. Puis le sate lilit, le lawar, le nasi campur. On déjeune de ce qu'on a fait, et on repart avec les recettes.",
    photos: [
      { scene: "wayang", brief: "le Barong en scène, masque et crinière", alt: "Le Barong, lion mythique, pendant la danse à Batubulan", src: null },
      { scene: "plantation", brief: "le bumbu au mortier, les épices en gros plan", alt: "La pâte d'épices bumbu pilée au mortier", src: null },
      { scene: "terraces", brief: "la table dressée face aux rizières, les plats terminés", alt: "Le repas préparé, servi face aux rizières", src: null },
    ],
  },
  {
    id: "sportive",
    famille: "classique",
    titre: "Journée sportive",
    texte: "Rafting dans les gorges d'Ayung le matin, descente à vélo depuis le volcan l'après-midi — 90 % en roue libre.",
    recit: "Deux heures de rafting dans les gorges de l'Ayung le matin : des rapides de classe II et III, rien qui exige de l'expérience, et des parois sculptées en bas-reliefs par des artistes locaux au fil des années. L'après-midi, on monte en voiture jusqu'à la région du volcan et on redescend à vélo jusqu'à Ubud — quatre-vingt-dix pour cent en roue libre, à travers les villages et les plantations. Faisable dès dix ans. Prévoyez des vêtements de rechange.",
    photos: [
      { scene: "canyon", brief: "le raft dans les gorges, l'eau blanche", alt: "Descente en raft dans les gorges de l'Ayung", src: null },
      { scene: "canyon", brief: "détail : les bas-reliefs sculptés dans la paroi", alt: "Bas-reliefs sculptés dans les parois des gorges de l'Ayung", src: null },
      { scene: "plantation", brief: "la descente à vélo entre les plantations", alt: "La descente à vélo depuis le volcan à travers les plantations", src: null },
    ],
  },
  {
    id: "nusa-penida",
    famille: "classique",
    titre: "Nusa Penida",
    texte: "Klingking, Broken Beach, Angel Billabong, et les raies manta si elles veulent bien. Forfait à part, de novembre à mars.",
    recit: "Bateau rapide depuis Sanur, voiture et chauffeur des deux côtés. Klingking et sa falaise en dos de dinosaure, Broken Beach — une arche que la mer a percée dans la roche —, Angel Billabong et son bassin naturel qui ne se découvre qu'à marée basse. Puis Manta Point, où les raies passent si elles veulent bien : elles sont sauvages, ce n'est jamais garanti. La route sur l'île est rude et la journée longue ; c'est un forfait à part, de novembre à mars, à 230 € pour deux.",
    photos: [
      { scene: "canyon", brief: "plan large : la falaise de Klingking en dos de dinosaure", alt: "La falaise de Klingking vue depuis le belvédère", src: null },
      { scene: "canyon", brief: "l'arche de Broken Beach, la mer dessous", alt: "L'arche naturelle de Broken Beach", src: null },
      { scene: "dauphins", brief: "une raie manta en snorkeling à Manta Point", alt: "Une raie manta à Manta Point", src: null },
    ],
  },

  /* Les places secrètes — remontées des fiches circuits, où personne
     n'allait les chercher. */
  {
    id: "ficus",
    famille: "secret",
    titre: "Le grand ficus",
    texte: "Un arbre qui enjambe la route, au fond de la région de Munduk. Aucun car ne s'y arrête, aucune brochure n'en parle.",
    recit: "Il faut savoir qu'il existe, et savoir par où passer. Un ficus dont les racines aériennes ont fini par enjamber la route : on passe dessous en voiture, et on ne comprend l'échelle qu'en descendant se mettre à côté. Aucun car ne s'y arrête, aucune brochure n'en parle, il n'y a ni panneau ni billetterie. C'est exactement le genre d'endroit pour lequel il faut quelqu'un du pays au volant — sans quelqu'un qui sait, on passe devant sans le voir.",
    photos: [
      { scene: "plantation", brief: "plan large : le ficus qui enjambe la route, quelqu'un dessous pour l'échelle", alt: "Le grand ficus de Munduk enjambant la route", src: null },
      { scene: "plantation", brief: "détail : l'enchevêtrement des racines aériennes", alt: "Les racines aériennes du grand ficus", src: null },
      { scene: "terraces", brief: "le chemin qui y mène, entre girofliers et caféiers", alt: "Le chemin bordé de girofliers menant au grand ficus", src: null },
    ],
  },
  {
    id: "saline",
    famille: "secret",
    titre: "La saline de quatre cents hectares",
    texte: "La plus grande de Bali, du côté de Pemuteran — et personne. Les cars passent devant sans ralentir.",
    recit: "Quatre cents hectares de bassins peu profonds, la plus grande saline de l'île, et pas un touriste. Les sauniers travaillent comme leurs pères : on remplit, on attend que le soleil fasse le reste, on ratisse. La croûte craque sous le râteau et la lumière s'y accroche — en fin de journée l'ensemble vire au rose. On peut parler avec eux, je traduis. Les cars passent devant sans ralentir : il n'y a rien à vendre ici, c'est bien pour ça que c'est intact.",
    photos: [
      { scene: "terraces", brief: "plan large : les bassins au soleil rasant, l'étendue jusqu'à l'horizon", alt: "Les bassins de la saline de Pemuteran au soleil rasant", src: null },
      { scene: "terraces", brief: "un saunier au travail, le râteau sur l'épaule", alt: "Un saunier ratissant le sel", src: null },
      { scene: "dauphins", brief: "détail : la croûte de sel qui craque, la lumière dedans", alt: "Gros plan sur la croûte de sel", src: null },
    ],
  },
  {
    id: "tenganan",
    famille: "secret",
    titre: "Tenganan, à pied",
    texte: "Deux heures trente de marche depuis Kastala à travers rizières et villages, jusqu'à l'un des rares villages bali aga qui vit encore selon ses règles d'avant l'hindouisme.",
    recit: "Deux heures trente de marche depuis Kastala, à travers rizières et hameaux — un guide de sentier vous accompagne, c'est la règle ici et elle n'est pas négociable. Au bout, Tenganan : l'un des derniers villages bali aga, ceux d'avant l'arrivée de l'hindouisme javanais. Le village vit selon ses propres lois, on n'y épouse personne de l'extérieur, et on y tisse le geringsing — un double ikat qu'on ne fabrique qu'à trois endroits au monde, et dont une pièce demande plusieurs années.",
    photos: [
      { scene: "terraces", brief: "le sentier entre les rizières, au départ de Kastala", alt: "Le sentier de Kastala à travers les rizières", src: null },
      { scene: "terraces", brief: "une ruelle du village, les maisons alignées", alt: "Une ruelle du village de Tenganan", src: null },
      { scene: "wayang", brief: "le tissage du geringsing sur le métier", alt: "Le tissage du geringsing à Tenganan", src: null },
    ],
  },
  {
    id: "peche",
    famille: "secret",
    titre: "Pêcher avec un pêcheur",
    texte: "Au filet et à la ligne, en bateau à balancier, puis on cuisine la prise et on partage le repas avec sa famille. Et la saline de Kusamba.",
    recit: "On part avec lui, pas à côté de lui. Bateau à balancier, filet et ligne, et le travail se fait à quatre mains — vous apprenez en le faisant, il corrige. Ce qu'on remonte, on le rapporte, on le cuisine, et on déjeune avec sa famille : c'est le moment dont les voyageurs reparlent le plus. En chemin, la saline de Kusamba, où le sel se récolte encore dans des troncs de cocotier évidés.",
    photos: [
      { scene: "dauphins", brief: "le bateau à balancier à l'aube, silhouette contre le ciel", alt: "Un bateau à balancier au lever du jour", src: null },
      { scene: "dauphins", brief: "les mains sur le filet, la prise qui remonte", alt: "Les mains du pêcheur relevant son filet", src: null },
      { scene: "plantation", brief: "le repas partagé avec la famille, après", alt: "Le repas partagé avec la famille du pêcheur", src: null },
    ],
  },
  {
    id: "habitant",
    famille: "secret",
    titre: "Une journée de vie balinaise",
    texte: "Chez une famille au nord-est de Tabanan : offrandes, torréfaction du café, huile de coco, labour et plantation du riz. Prévoyez des vêtements de rechange.",
    recit: "Une journée entière chez une famille, au nord-est de Tabanan, et vous ne regardez pas : vous faites. Tresser le canang sari, torréfier le café sur le feu de bois, presser l'huile de coco, puis descendre dans la rizière pour le labour et le repiquage — pieds dans l'eau, dos courbé, et le fou rire qui vient assez vite. On déjeune avec eux. Prévoyez des vêtements de rechange, ce n'est pas une figure de style.",
    photos: [
      { scene: "plantation", brief: "les mains qui tressent l'offrande, en gros plan", alt: "Des mains tressant une offrande de feuille de palme", src: null },
      { scene: "plantation", brief: "la torréfaction du café sur le feu de bois", alt: "La torréfaction du café sur un feu de bois", src: null },
      { scene: "terraces", brief: "le labour et la plantation du riz, pieds dans l'eau", alt: "La plantation du riz, pieds dans l'eau", src: null },
    ],
  },
  {
    id: "marionnettiste",
    famille: "secret",
    titre: "Chez le marionnettiste",
    texte: "Il vous met un gender et un rindik entre les mains — le xylophone de métal et celui de bambou — puis éteint la lumière et lance son théâtre d'ombres.",
    recit: "En fin de journée, chez lui, dans la région d'Ubud. Il commence par vous mettre les instruments entre les mains — le gender, xylophone de métal, et le rindik, son cousin de bambou — et vous fait jouer, mal, ce qui le fait rire. Puis il allume la lampe derrière l'écran, éteint le reste, et lance le wayang kulit : des marionnettes de cuir découpé, une voix pour chaque personnage, des histoires tirées du Mahabharata. Vingt minutes, et on ne regarde plus Bali de la même façon.",
    photos: [
      { scene: "wayang", brief: "l'écran éclairé de dos, la silhouette de la marionnette", alt: "Le théâtre d'ombres : marionnette découpée sur l'écran", src: null },
      { scene: "wayang", brief: "le marionnettiste de profil, la lampe et les tiges", alt: "Le marionnettiste au travail derrière son écran", src: null },
      { scene: "wayang", brief: "le gender et le rindik entre les mains d'un voyageur", alt: "Les mains d'un voyageur sur le rindik de bambou", src: null },
    ],
  },
  {
    id: "munduk",
    famille: "secret",
    titre: "Les trois cascades de Munduk",
    texte: "Trois heures de marche entre girofliers, cacaoyers et caféiers, puis une source d'eau chaude. Guide de sentier obligatoire.",
    recit: "Trois heures de marche d'une cascade à l'autre, à travers les plantations : girofliers, cacaoyers, caféiers — je vous fais ouvrir une cabosse et goûter la pulpe autour de la fève, ce qui surprend tout le monde. Le sentier descend puis remonte, il est glissant après la pluie, et un guide de sentier est obligatoire. On finit dans une source d'eau chaude, ce qui, après trois heures de dénivelé, se mérite.",
    photos: [
      { scene: "canyon", brief: "la cascade en contre-plongée, un marcheur pour l'échelle", alt: "L'une des trois cascades de Munduk vue d'en bas", src: null },
      { scene: "plantation", brief: "le sentier entre cacaoyers et caféiers", alt: "Le sentier de marche entre les plantations", src: null },
      { scene: "canyon", brief: "la source d'eau chaude, la vapeur au petit matin", alt: "La source d'eau chaude en fin de parcours", src: null },
    ],
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
    texte: "Ce que je suis à peu près seul à montrer. C'est là que le voyage bascule.",
  },
];

export const ACTIVITES_EPIGRAPHE =
  "Être en vacances, c'est n'avoir rien à faire et avoir toute la journée pour le faire.";

export const ACTIVITES_RESTE =
  "Trois journées ou quinze, c'est vous qui voyez : je viens vous chercher à votre hôtel pour une seule journée, ou je construis le circuit entier. Et cette liste n'est pas fermée — il y en a d'autres, par région : le sud et la presqu'île de Bukit, l'est et Tirta Gangga, le centre-nord et Tamblingan, le sud-ouest et Tanah Lot. Je vous propose celles qui collent à l'endroit où vous logez.";

/**
 * « Partir en paix » — Agus peut prendre en charge les hébergements.
 * Le site le taisait, et c'est une réassurance majeure : sur les
 * circuits, la formule peut être globale, hôtels compris et réservés.
 */
export const HEBERGEMENT = {
  titre: "Je peux aussi m'occuper des hôtels.",
  texte:
    "Par défaut vous réservez vous-même, et je vous dis où dormir et pourquoi. Mais si vous préférez n'avoir à penser à rien, je les choisis, je vous les propose et je réserve : la formule devient globale — hôtels, activités, transport et chauffeur-guide réunis. Vous n'avez plus qu'à venir.",
};

/**
 * Les valeurs — pourquoi lui, et pas un autre.
 *
 * Ce bloc vivait dans une bande pleine à part, juste avant le
 * configurateur. Il est remonté dans la présentation : l'argument
 * « pourquoi lui » appartient à la personne, pas à une bande abstraite
 * posée avant un formulaire. Quand on arrive au configurateur, on a
 * déjà décidé — on n'a plus besoin d'être convaincu, mais d'un champ.
 *
 * **Règle d'écriture à tenir** : écrit par le positif, ce que le direct
 * rend possible. Jamais une charge contre des agences nommées, qu'on ne
 * pourrait ni documenter ni défendre. L'argument est plus fort ainsi, et
 * il n'expose pas Agus.
 *
 * Vocabulaire : il écrit « une **union** de guides de Bali », pas un
 * syndicat. Ne pas corriger vers un mot qui n'est pas le sien.
 */
/**
 * `court` et `texte` : la même chose dite en une phrase et en trois.
 *
 * L'accueil affiche `court`, la page portrait affiche `texte`. Ce n'est
 * pas un raccourci d'affichage mais une répartition du travail : sur
 * l'accueil, ces trois points doivent **créer la préférence** en un coup
 * d'œil, au milieu d'une page qui doit encore présenter un circuit, des
 * envies et un formulaire. Sur /agus, ils sont le sujet — on y arrive
 * après avoir décidé de vouloir en savoir plus, et là la version longue
 * est ce qu'on est venu lire.
 *
 * ⚠️ `court` n'est pas un résumé mécanique de `texte` : chaque version
 * garde une phrase entière et vraie. Tronquer `texte` à l'exécution
 * couperait au milieu d'une proposition.
 */
export const VALEURS = {
  titre: "Voyager avec moi, c'est faire vivre les guides de Bali.",
  chapo:
    "Je suis balinais et je travaille en direct depuis vingt ans. Ce n'est pas seulement une façon de baisser le prix : c'est une façon de faire vivre un métier, et de tenir la promesse que je fais à mon pays.",
  points: [
    {
      titre: "Ma famille d'abord",
      court: "Marié, trois enfants. Ce que vous payez les fait vivre — pas une commission d'intermédiaire.",
      texte: "Marié, trois enfants. Ce que vous payez les fait vivre — comme il fait vivre le chauffeur et les familles qui vous accueillent chez elles, pas une commission d'intermédiaire.",
    },
    {
      titre: "Une union de guides, pas un homme seul",
      court: "Si je ne suis pas libre, je passe le relais à un guide que je connais — jamais à une centrale.",
      texte: "Je travaille avec d'autres guides francophones et anglophones au sein d'une union de guides de Bali. Quand je ne suis pas disponible, je passe le relais à quelqu'un que je connais — jamais à un inconnu envoyé par une centrale.",
    },
    {
      titre: "Ambassadeur de mon pays",
      court: "« Je suis un ambassadeur du tourisme de mon pays, et je travaille avec tout mon cœur. »",
      texte: "« En tant que guide, je suis un ambassadeur du tourisme de mon pays, et je peux donc vous assurer que je travaille professionnellement et surtout avec tout mon cœur. »",
      citation: true,
    },
  ],
  chute:
    "Chaque voyage organisé en direct, c'est un guide balinais de plus qui vit de son métier sans dépendre d'une agence — et une famille de Sidemen, de Munduk ou de Tenganan qui accueille chez elle plutôt que de servir un autocar.",
};

/**
 * Les tarifs.
 *
 * Le reproche fait à cette page était le bon : on ne savait pas de quoi
 * on parlait. Trois façons de compter cohabitaient — la journée au
 * véhicule, le forfait de circuit au voyageur, le forfait Nusa Penida —
 * sans que rien ne dise laquelle s'applique. Le lecteur voyait « 80 € »
 * et « 1 210 € » sur le même écran et ne pouvait pas les rapprocher.
 *
 * `formules` règle ça d'entrée : on annonce les trois modèles avant de
 * montrer un seul chiffre. Et `exemple` donne le calcul en toutes
 * lettres — un total posé vaut mieux que trois paragraphes de méthode.
 */
/**
 * Les usages — ce qu'on comprend en arrivant, et qu'on n'a lu nulle part.
 *
 * Ce bloc a une double fonction, et c'est la condition pour qu'il ne
 * soit pas du folklore : chaque entrée est **immersive et utile le même
 * jour**. Savoir qu'on enjambe une offrande évite de la piétiner ;
 * savoir pourquoi trois personnes s'appellent Wayan évite de croire à
 * un malentendu ; savoir que Nyepi ferme l'aéroport change une date de
 * billet. Une rubrique « culture » qui ne sert à rien le jour même
 * serait un dépliant d'agence — exactement ce que cette page évite.
 *
 * Deux règles de rédaction :
 *
 * 1. **Ce sont des usages, pas des règles à faire respecter.** On dit ce
 *    qui se fait, jamais ce qu'il « faut » faire : personne n'a envie
 *    d'être corrigé avant même d'avoir décollé.
 * 2. **Rien qui engage Agus sur une date.** Galungan suit le cycle
 *    pawukon de 210 jours, Nyepi le calendrier saka : les deux se
 *    déplacent chaque année. On dit ce que c'est et on renvoie à lui
 *    pour quand — voir la même prudence dans periodNote().
 */
/**
 * ⚠️ **Chaque texte tient en trois lignes à 390 px, et c'est la
 * contrainte de ce bloc.** Six paragraphes empilés sur une bande pleine,
 * c'est un écran et demi de mobile : au-delà, la « pause » de la page
 * devient un mur. Les versions longues énuméraient joliment (« seuil de
 * boutique, tableau de bord, capot de scooter ») ; ce qui sert le
 * voyageur le jour même, c'est la règle — « on l'enjambe, on ne la
 * ramasse pas ». Garder la règle, couper l'énumération.
 */
export const USAGES = {
  titre: "Six choses qu'on comprend en arrivant",
  chapo:
    "Rien à réviser : je vous les raconte en route. Elles sont ici pour que le pays ne soit pas une surprise muette.",
  liste: [
    {
      symbole: "canang",
      titre: "Les offrandes au sol",
      texte:
        "Le canang sari se dépose partout, plusieurs fois par jour. On l'enjambe, on ne la ramasse pas.",
    },
    {
      symbole: "rangs",
      titre: "Wayan, Made, Nyoman, Ketut",
      texte:
        "Pas des prénoms, des rangs de naissance : au cinquième enfant on repart à Wayan. D'où vos trois Wayan du jour.",
    },
    {
      /* Le candi bentar, et non un vêtement : voir Symboles.jsx, un
         sarong porté ne tient pas dans 24 px de trait. La porte qu'on
         s'habille pour franchir dit la même chose et se reconnaît. */
      symbole: "candi",
      titre: "Le sarong et le selendang",
      texte:
        "Jambes couvertes et taille ceinte d'une écharpe pour entrer au temple. Je les ai dans la voiture : rien à acheter.",
    },
    {
      symbole: "poleng",
      titre: "Le damier noir et blanc",
      texte:
        "Il habille statues, arbres et pierres de gardien. À parts égales : le bien et le mal tenus ensemble, pas l'un contre l'autre.",
    },
    {
      symbole: "penjor",
      titre: "Les bambous arqués de Galungan",
      texte:
        "Tous les 210 jours, chaque maison courbe devant sa porte un bambou de cinq mètres. Les routes en sont bordées dix jours.",
    },
    {
      symbole: "nyepi",
      titre: "Nyepi, le jour du silence",
      texte:
        "Une fois l'an, l'île s'arrête 24 h : ni circulation, ni lumière, aéroport fermé. Magnifique, mais ça se prépare.",
    },
  ],
};

export const TARIFS = {
  /* Les trois façons de compter, annoncées avant la grille. */
  formules: [
    {
      cle: "journee",
      titre: "À la journée",
      resume: "Vous payez ma journée et mon véhicule.",
      texte:
        "Le prix ne dépend pas du nombre de voyageurs mais du véhicule : le même tarif que vous soyez deux ou trois. Vous réglez à part les entrées des sites, vos repas et votre hôtel. C'est la formule des excursions au départ de votre lieu de séjour.",
    },
    {
      cle: "circuit",
      titre: "En circuit, sur plusieurs jours",
      resume: "Un forfait global, par personne.",
      texte:
        "Transport, chauffeur-guide, activités et entrées sont réunis dans un seul prix : vous ne sortez plus votre porte-monnaie à chaque site. C'est la formule des itinéraires d'une semaine et plus.",
    },
    {
      cle: "penida",
      titre: "Nusa Penida à la journée",
      resume: "Un forfait à part, pour deux.",
      texte:
        "L'île se rejoint en bateau : la journée forme un tout indissociable — traversée, voiture et chauffeur des deux côtés, entrées des plages — et se compte donc à part du reste.",
    },
  ],
  colonnes: ["1 à 3 voyageurs", "4 à 5 voyageurs"],
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
  /* La légende de la grille. Sans elle, « 1 à 3 voyageurs » se lit
     comme une tranche de prix par personne, ce qui est l'inverse. */
  grilleNote:
    "Un prix par journée et par véhicule, chauffeur-guide compris — pas par personne. À trois, la journée coûte le même prix qu'à un.",
  auDela: "Au-delà de 5 personnes, je vous établis un devis.",
  /**
   * Le calcul en toutes lettres. C'est ce qui manquait le plus : trois
   * chiffres posés côte à côte n'expliquent pas comment ils s'ajoutent.
   * Ubud est délibérément choisi — la région n'ouvre pas le supplément
   * de nuitée, l'exemple reste donc un total complet.
   */
  exemple: {
    titre: "Un exemple, pour fixer les idées",
    lignes: [
      ["Vous êtes deux, en février, logés à Ubud.", ""],
      ["Trois journées d'excursion, basse saison", "3 × 80 €"],
      ["Total du véhicule et du chauffeur-guide", "240 €"],
      ["Soit, par personne et par jour", "40 €"],
    ],
    chute:
      "S'y ajoutent les entrées des sites, vos repas et votre hôtel — comptez-les comme un voyage ordinaire. Depuis Ubud, aucun supplément de nuitée : je rentre dormir chez moi.",
  },
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
   *
   * Il a sa propre place à l'écran, sous la grille : c'est le seul
   * poste qui change le total sans apparaître dans le tableau. Enfoui
   * dans un « bon à savoir », il ressemblait à un détail — et une
   * addition qui grimpe après coup est ce qui abîme le plus la
   * confiance.
   */
  supplement: {
    titre: "Si vous logez loin de Denpasar",
    montant: "15 € par nuit",
    texte:
      "Je dors et je mange sur place plutôt que de faire la route deux fois. C'est le seul poste qui s'ajoute à la grille, et je préfère l'annoncer maintenant.",
    regions: [
      "L'est — Candidasa, Sidemen, Amed, Tulamben",
      "Le nord-centre — Jatiluwih, Munduk, Kintamani",
      "Le nord et le nord-ouest — Lovina, Pemuteran",
    ],
  },
  nusaPenida: {
    montant: "230 € pour deux",
    periode: "De novembre à mars",
    texte:
      "Bateau rapide aller-retour depuis Sanur, voiture et chauffeur des deux côtés de la traversée, entrées des plages comprises.",
  },
  circuits:
    "Sur un circuit de plusieurs jours, la formule change : activités, entrées, transport et chauffeur-guide sont réunis dans un forfait global.",
  /* Les autres îles sont sorties du parcours : les mentionner ici
     rouvrirait une porte que la page a fermée. */
  ailleurs:
    "Au-delà de Bali — Java, Lombok, Sumbawa, Flores, Komodo — j'organise aussi, mais ça se discute de vive voix : écrivez-moi.",
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
/**
 * ⚠️ Ces notes s'affichent **dans le formulaire**, sur mobile, entre le
 * nombre de voyageurs et le style recherché. C'est le seul endroit du
 * site où un texte explicatif s'intercale au milieu d'une saisie : il
 * doit donc tenir en deux lignes chacune. La version longue (« la
 * fenêtre pour le Rinjani et pour Komodo, où les traversées deviennent
 * difficiles le reste de l'année ») faisait quatre lignes pour dire
 * « c'est la bonne saison » — et parlait d'îles que le site ne propose
 * plus.
 * Règle : une note = un fait + sa conséquence pratique. Pas de troisième
 * proposition.
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
      "Ciel dégagé, mer calme, routes sûres : la meilleure fenêtre de l'année."
    );
  } else {
    notes.push(
      "Averses courtes en fin d'après-midi, rizières éclatantes, sites déserts. Et les tarifs sont plus doux."
    );
  }
  if (m === "Juillet" || m === "Août") {
    notes.push(
      "Haute saison : Sidemen et Munduk se réservent des mois à l'avance."
    );
  }
  if (m === "Mars") {
    notes.push(
      "Nyepi tombe en mars : 24 h où l'île s'arrête, aucun vol, personne dehors. Rare, mais ça se prépare — je vous confirme la date."
    );
  }
  notes.push(
    "Galungan et Kuningan se déplacent chaque année : demandez-moi si elles tombent pendant votre séjour."
  );
  return { saison, notes };
}
