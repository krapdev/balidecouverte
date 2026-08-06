/**
 * Ce que la page portrait attend encore d'Agus.
 *
 * Même principe que `lib/legal.js`, et pour la même raison : **une case
 * vide se voit, une case inventée ne se voit pas.** Un site de guide
 * indépendant se vend sur la parole donnée ; y écrire « fondateur de
 * l'association X en 2011 » parce que ça sonne juste, c'est faire dire à
 * un homme réel une chose qu'il n'a pas dite. Tant qu'une valeur est
 * `null`, la page affiche un marqueur rouge à sa place.
 *
 * Ce qui est **su** ne vient pas d'ici mais de `lib/data.js` (AGUS,
 * VALEURS) : diplôme, année, langues, famille, territoires, véhicules,
 * appartenance à une union de guides de Bali, et sa phrase sur le rôle
 * d'ambassadeur. Tout le reste de ce fichier est une liste de questions.
 *
 * ⚠️ Le jour où c'est rempli : retirer le bandeau d'avertissement de la
 * page, retirer le `noindex` de ses métadonnées, et l'ajouter à
 * `app/sitemap.js`. Les trois vont ensemble.
 */

/** L'union de guides. Ses mots : « une union de guides de Bali ». */
export const UNION = {
  /** Le nom exact, en indonésien ou en balinais, et sa traduction. */
  nom: null,
  /** Depuis quelle année il en fait partie. */
  depuis: null,
  /** S'il y exerce une responsabilité, laquelle. Sinon : « membre ». */
  role: null,
  /** Combien de guides environ, et de quelles langues. */
  effectif: null,
  /**
   * Ce que l'union fait **concrètement** — c'est le cœur de la section
   * et c'est ce qu'on ne peut pas deviner. Formation ? Tarif plancher ?
   * Entraide quand quelqu'un tombe malade ? Représentation auprès des
   * autorités ? Une liste de trois actions vraies vaut mieux qu'un
   * paragraphe d'intentions.
   */
  actions: null,
};

/**
 * Ce qu'Agus seul peut raconter. Rien ici ne se déduit.
 *
 * ⚠️ **Ce bloc n'est affiché nulle part**, et c'est volontaire. Il l'a été
 * un temps, sous forme de trois marqueurs rouges en fin de partie — mais
 * le bloc des six questions, en bas de page, posait déjà les mêmes
 * questions à trois centimètres de là. Ce qui restait à l'écran était donc
 * la redite, pas l'information.
 *
 * Le jour où il répond, ces réponses ne remplissent pas des champs :
 * elles deviennent **des paragraphes écrits** dans `app/agus/page.js`.
 * Cette liste est là pour qu'on sache quoi lui demander, pas pour être
 * interpolée dans une phrase à trous.
 */
export const HISTOIRE = {
  /** Où il a grandi — le village, la région. */
  origine: null,
  /** Où et comment il a appris le français, et pourquoi celui-là. */
  francais: null,
  /** Ce qui l'a mené au métier en 2005. */
  debut: null,
  /** Le prénom de sa femme, s'il souhaite qu'il figure. */
  epouse: null,
};

/**
 * Les questions à lui poser, dans l'ordre où elles servent la page.
 * Elles sont affichées telles quelles en bas du portrait tant que le
 * bandeau de travail est là : c'est plus utile qu'un fichier de notes
 * que personne ne rouvre.
 */
export const QUESTIONS = [
  "Comment s'appelle exactement votre union de guides, et depuis quand en faites-vous partie ?",
  "Que fait-elle concrètement ? Trois exemples valent mieux qu'une définition.",
  "Combien de guides êtes-vous, et dans quelles langues travaillez-vous ?",
  "Où avez-vous grandi, et où avez-vous appris le français ?",
  "Qu'est-ce qui vous a fait devenir guide en 2005 ?",
  "Que voulez-vous qu'on dise de votre famille — et que préférez-vous garder pour vous ?",
];
