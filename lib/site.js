/**
 * Les constantes du site, au sens des moteurs de recherche.
 *
 * ⚠️ `ORIGINE` doit être **l'origine canonique réelle**, celle que le
 * serveur sert vraiment. Un canonical qui pointe vers un hôte différent
 * de celui qui répond (www contre apex, http contre https) est pire que
 * pas de canonical du tout : il dit à Google d'indexer une URL qui
 * redirige. À confirmer auprès d'Agus avant mise en ligne, et à
 * surcharger par `NEXT_PUBLIC_SITE_URL` sans toucher au code.
 */
export const ORIGINE = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.balidecouverte.fr"
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
