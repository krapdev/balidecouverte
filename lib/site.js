/**
 * Les constantes du site, au sens des moteurs de recherche.
 *
 * `ORIGINE` est **le domaine nu, sans www** — confirmé par Agus. C'est
 * elle qui alimente les canoniques, le sitemap, le robots.txt et le
 * JSON-LD : les cinq doivent désigner le même hôte, sinon on envoie
 * Google indexer une URL qui redirige.
 *
 * Deux conséquences à tenir côté hébergement, et elles ne se voient pas
 * dans ce dépôt :
 *
 *  1. `www.balidecouverte.fr` doit **rediriger en 301** vers l'apex, et
 *     non servir le même contenu aux deux adresses — sans quoi le site
 *     existe en double pour un moteur.
 *  2. Le certificat doit couvrir l'apex, sinon la redirection casse.
 *
 * `NEXT_PUBLIC_SITE_URL` permet de pointer ailleurs (préproduction,
 * domaine de test) sans toucher au code.
 */
export const ORIGINE = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://balidecouverte.fr"
).replace(/\/$/, "");

/**
 * Le site accepte-t-il d'être indexé ?
 *
 * **Il faut le demander ; ce n'est jamais l'état par défaut.** Une
 * préproduction est une copie complète du site d'Agus : indexée, elle
 * entre en concurrence avec `balidecouverte.fr` sur ses propres mots, et
 * rien ne le signale — pas d'erreur, pas de page cassée, juste deux sites
 * qui se partagent une audience.
 *
 * D'où le sens de la variable, qui est celui qui pardonne : **oublier de
 * la poser rend le site invisible aux moteurs, ce qui se voit et se
 * répare ; l'inverse serait silencieux et durable.** À poser une seule
 * fois, le jour de la vraie mise en production, avec le domaine
 * définitif :
 *
 * ```
 * NEXT_PUBLIC_SITE_URL=https://balidecouverte.fr
 * NEXT_PUBLIC_INDEXABLE=1
 * ```
 *
 * ⚠️ Les deux vont ensemble. `NEXT_PUBLIC_SITE_URL` seule enverrait une
 * préproduction déclarer `balidecouverte.fr` dans ses canoniques, son
 * sitemap et son JSON-LD : on demanderait à Google d'indexer le vrai site
 * en lisant la copie.
 */
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "1";

export const NOM_SITE = "Bali Découverte";

/* Le titre par défaut. `template` s'applique aux pages qui déclarent un
   titre court — voir app/tarifs/page.js. */
export const TITRE = "Bali Découverte — Guide privé francophone à Bali";

/* La description a été refaite : elle annonçait « devis en direct sur
   WhatsApp » alors que le canal est devenu l'e-mail. Une description qui
   promet un canal qui n'existe plus est un mensonge affiché dans les
   résultats de recherche. 155 caractères, la limite pratique avant
   troncature. */
export const DESCRIPTION =
  "Circuits sur-mesure à Bali avec Agus Yudiarta, guide balinais diplômé francophone, indépendant depuis 2005. Sans agence : vous lui écrivez directement.";
