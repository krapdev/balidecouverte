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
