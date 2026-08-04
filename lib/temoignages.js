/**
 * Le livre d'or — les vrais témoignages, enfin.
 *
 * **Provenance.** Extraits du livre d'or du site actuel. Sur vingt-deux
 * entrées, sept sont d'authentiques retours de voyageurs ; les quinze
 * autres étaient du spam, dont plusieurs publicités pour de la fraude
 * bancaire et des faux papiers. Voir le README, section « Le livre d'or »,
 * pour ce que ça implique.
 *
 * **Ce qui a été touché, et rien d'autre.** L'orthographe et la
 * ponctuation, là où la faute était manifeste : accords de participe
 * (« nous avons contactés » → « contacté »), espaces manquantes autour
 * des points d'exclamation, « Nous seulement » → « Non seulement ».
 * **Aucun mot n'a été ajouté, retiré ni déplacé**, les émojis sont
 * conservés — ils font partie de la voix des gens qui écrivent. Un
 * témoignage réécrit n'est plus un témoignage.
 *
 * **L'attribution a été vérifiée.** Dans l'export du site, l'auteur
 * figure *après* le texte auquel il correspond : le spam intercalé
 * décale l'œil d'un cran et fait attribuer chaque avis au voisin. Les
 * sept associations ci-dessous ont été reconstituées entrée par entrée.
 *
 * ⚠️ **Ne jamais ajouter d'entrée ici sans qu'elle vienne d'un
 * voyageur.** C'est la règle depuis le premier jour du projet, et elle
 * n'a pas changé parce qu'on a enfin de la matière.
 *
 * `extrait` est la phrase mise en exergue sur les cartes : elle est
 * toujours **tirée mot pour mot** du témoignage, jamais résumée.
 */
export const TEMOIGNAGES = [
  {
    id: "vernet",
    auteur: "Valérie Vernet",
    pays: "France",
    quand: "Deux semaines, du 22 février au 7 mars",
    vedette: true,
    extrait:
      "Agus est un guide comme on rêve d'en avoir dans chaque pays qu'on visite !",
    texte: `Agus un guide d'exception 🤩 !!!

… Je ne savais pas comment commencer ni par où… et c'est sans doute pour cela que j'ai mis tant de temps pour écrire 😅 !

Grâce à lui et en sa compagnie, nous avons fait un merveilleux voyage de 2 semaines avec ma sœur Anne et mes filles Estelle & Jade. C'était du 22 février au 7 mars dernier.

Agus est un guide comme on rêve d'en avoir dans chaque pays qu'on visite ! Une parfaite maîtrise de notre langue française et de ses subtilités qui fait qu'on a grand plaisir à échanger avec lui. Il nous a fait découvrir avec passion son île et sa culture si riche. Agus a répondu à toutes nos envies qu'il a même parfois anticipées. Il est attentionné : nous trouvions chaque matin dans sa voiture des bouteilles d'eau fraîche pour chacune de nous.

Je ne suis évidemment pas la première à le recommander vivement et ne serai pas la dernière non plus, à n'en pas douter 😃 ! Dommage qu'il ne puisse pas nous accompagner à la découverte d'autres parties du monde !

… Rien que pour le plaisir de voyager avec lui, je reviendrai volontiers dans ce coin magique de l'Indonésie 🤩 !!!`,
  },
  {
    id: "bastien",
    auteur: "Bastien",
    pays: "France",
    quand: "Juillet 2025",
    vedette: true,
    extrait:
      "Une fois sur place tout est bien organisé, pas d'imprévus, et c'est vraiment confortable de voyager sereinement.",
    texte: `Nous avons contacté Bali Découverte pour notre voyage à Bali en juillet 2025 et nous sommes ravis de l'avoir fait. Agus nous a très bien conseillés sur la réalisation de notre programme et nous avons tout de suite senti un grand professionnalisme.

Une fois sur place tout est bien organisé, pas d'imprévus, et c'est vraiment confortable de voyager sereinement.

Nous avons adoré visiter cette île en compagnie de vrais Balinais qui nous ont fait découvrir leur île et leur culture avec un œil différent. Big up à Mario avec qui nous avons passé d'excellents moments de partage, de rires et de bonne humeur !

Suksma, merci pour tout !`,
  },
  {
    id: "francoise",
    auteur: "Françoise",
    pays: "France",
    quand: "Deux semaines, dont trois jours de croisière",
    vedette: true,
    extrait: "C'est l'une de nos plus belles expériences de voyageur.",
    texte: `Agus est un guide fiable. Avant notre arrivée à Bali tout était clairement défini. Il est très réactif.

Notre séjour de 2 semaines avec lui s'est majoritairement déroulé à Bali. Mais notre coup de cœur est la croisière de 3 jours, 2 nuits sur un ancien bateau de pêche. Nous étions les seuls passagers. Repos, snorkeling, balades. Paysages incroyables, poissons et coraux magnifiques, rencontre des varans, observation des roussettes…

C'est l'une de nos plus belles expériences de voyageur. Si c'était à refaire, nous le referions dans les mêmes conditions.

Merci Agus pour ce beau séjour !`,
  },
  {
    id: "blechschmidt",
    auteur: "Chantal et Jean-Marc Blechschmidt",
    pays: "France",
    quand: "Trois semaines, en mai",
    extrait:
      "Il a su rendre ce voyage exceptionnel, et j'espère que nous resterons longtemps en contact avec lui.",
    texte: `Nous venons de passer 3 semaines à Bali en mai avec Agus qui nous a fait découvrir, comprendre et aimer cette île ! Sa gentillesse et son sourire correspondent totalement à l'image qu'on nous avait donnée des Balinais, mais en plus, il a partagé avec nous toutes ses connaissances historiques, religieuses, culturelles.

Connaissant parfaitement la France où il a passé quelques mois, il pouvait mieux nous faire appréhender les différences entre nos deux cultures. L'organisation du voyage était très professionnelle et chaque détail était réglé à l'avance.

Il a su rendre ce voyage exceptionnel, et j'espère que nous resterons longtemps en contact avec lui. Nous reviendrons sans doute un jour, peut-être pour visiter Flores ? Encore merci Agus 🥰`,
  },
  {
    id: "bertrand",
    auteur: "Pascale Bertrand",
    pays: "France",
    quand: "Quatre jours, à quatre adultes",
    extrait: "Aucune mauvaise surprise.",
    texte: `Nous avons passé 4 jours à Bali avec Agus Yudiarta. Agus est vraiment un guide au top. Nous étions 4 adultes. Il a été très réactif quand il s'est agi d'organiser le voyage.

Puis sur place il était vraiment à l'écoute. Il nous a fait visiter tout ce que nous souhaitions en sachant s'adapter à notre rythme et en optimisant notre temps qui était contraint. Aucune mauvaise surprise.

Il est d'une grande culture, en ce qui concerne Bali mais aussi l'Indonésie et le reste du monde ! Son français est parfait. Il ne compte pas ses heures et les journées peuvent être longues et bien remplies si on le souhaite.

C'était vraiment un super séjour. Nous recommandons fortement Agus.`,
  },
  {
    id: "christ",
    auteur: "Roland Christ",
    pays: "Laos",
    quand: "Quatre jours",
    extrait: "Nous pouvons conseiller Agus les yeux fermés !",
    texte: `Lors de notre séjour à Bali, nous avons réservé Agus comme chauffeur-guide francophone. Nous avons passé 4 jours à visiter cette magnifique île avec lui, avec un programme défini à l'avance. Et nous avons été plus qu'enchantés de notre expérience avec Agus.

Non seulement il parle parfaitement français, mais c'est une vraie mine de savoir ! Il connaît l'histoire balinaise et indonésienne parfaitement et, à chaque visite, il nous a donné une multitude de renseignements très intéressants. Il est également très cultivé (voyages en Europe) et nous avons pu avoir avec lui différentes discussions très intéressantes sur différents thèmes.

Il conduit également très bien. Et, pour couronner le tout, il a beaucoup d'humour.

C'est dire que nous pouvons conseiller Agus les yeux fermés !`,
  },
  {
    id: "vellayen",
    auteur: "Maeva Vellayen",
    pays: "France",
    quand: "Cinq jours",
    extrait:
      "Il a été totalement à notre écoute, s'adaptant à nos envies et à notre rythme.",
    texte: `Nous avons passé 5 jours exceptionnels avec Agus à Bali. Il a été totalement à notre écoute, s'adaptant à nos envies et à notre rythme.

Son français est excellent, ce qui a rendu nos échanges très fluides. C'est une personne cultivée avec qui nous avons eu des discussions passionnantes sur la culture balinaise, l'histoire des lieux visités et sur plein d'autres sujets. Ses explications étaient toujours claires et enrichissantes.

Nous recommandons Agus sans hésitation à ceux qui souhaitent découvrir Bali avec un guide compétent et attentionné !`,
  },
];

/** Les trois mises en avant sur l'accueil. */
export const TEMOIGNAGES_VEDETTE = TEMOIGNAGES.filter((t) => t.vedette);

export const LIVRE_OR = {
  titre: "Ce qu'en disent ceux qui sont partis",
  chapo:
    "Ces mots sont les leurs, recopiés du livre d'or sans être retouchés. Je n'ai corrigé que des fautes de frappe.",
  /* Le nombre est calculé, jamais écrit à la main : sept aujourd'hui,
     huit demain, et rien à corriger ailleurs. */
  get nombre() {
    return TEMOIGNAGES.length;
  },
};
