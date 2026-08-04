import { ORIGINE } from "@/lib/site";

/* Tout est indexable : il n'y a ni espace privé, ni page de résultats, ni
   variante d'URL à masquer. Le fichier existe surtout pour déclarer le
   sitemap — sans lui, il faut le soumettre à la main dans la Search
   Console, et personne ne le fait. */
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${ORIGINE}/sitemap.xml`,
    host: ORIGINE,
  };
}
