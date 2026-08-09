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

/**
 * ⚠️ **`UNION` a été supprimé, et pas parce qu'on l'a rempli.**
 *
 * Le bloc demandait le nom exact de l'union, son année de fondation, son
 * effectif et ses actions — quatre champs qui supposaient tous une
 * **association constituée**. Agus a précisé qu'il n'y en a pas : « ce
 * n'est pas une association officielle des guides actuellement,
 * uniquement une entraide et union des guides indépendants ».
 *
 * La leçon vaut d'être gardée : **un formulaire vide n'est neutre que si
 * la chose qu'il décrit existe.** Quatre cases en attente d'un nom
 * d'association affirmaient, par leur seule présence, qu'une association
 * existait — c'est-à-dire exactement le genre de fait inventé que ce
 * fichier est censé empêcher. Ne pas le recréer.
 */

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
  /**
   * Où il a grandi — **le village**, pas l'île.
   *
   * On sait qu'il est balinais, originaire de Bali et qu'il y vit
   * toujours : c'est écrit sur la page. Ce qui manque est le grain
   * fin — un village se raconte, une île ne se raconte pas.
   */
  origine: null,
  /**
   * ✅ **Répondu.** Trois ans à l'Alliance Française, puis un travail
   * personnel acharné, puis plusieurs séjours en Europe — en Belgique
   * surtout, avec des vacances en France.
   *
   * Ce n'est pas un champ interpolé : c'est écrit en toutes lettres
   * dans la partie « Le français, et l'Histoire » de app/agus/page.js.
   * La valeur ci-dessous ne sert qu'à marquer la question comme close.
   */
  francais:
    "Trois ans à l'Alliance Française, puis plusieurs séjours en Europe — la Belgique surtout",
  /** Ce qui l'a mené au métier en 2005. Toujours inconnu. */
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
/* Les trois questions sur l'union sont parties avec le bloc `UNION` :
   elles demandaient le nom, les actions et l'effectif d'une association
   dont Agus a précisé qu'elle n'existe pas comme telle. */
export const QUESTIONS = [
  "Dans quel village avez-vous grandi ?",
  "Qu'est-ce qui vous a fait devenir guide en 2005 ?",
  "Vous dites avoir été l'un des premiers à quitter le système des agences — premier de votre groupe, de votre région, de l'île ? C'est écrit tel quel en attendant votre précision.",
  "Votre licence : délivrée par le gouvernement régional, renouvelée tous les trois ans auprès du ministère du tourisme — est-ce exact ?",
  "Que voulez-vous qu'on dise de votre famille — et que préférez-vous garder pour vous ?",
];
