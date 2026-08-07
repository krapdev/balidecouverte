import { ORIGINE, INDEXABLE } from "@/lib/site";

/* En production, tout est indexable : il n'y a ni espace privé, ni page de
   résultats, ni variante d'URL à masquer. Le fichier existe surtout pour
   déclarer le sitemap — sans lui, il faut le soumettre à la main dans la
   Search Console, et personne ne le fait.

   Partout ailleurs — préproduction, domaine de test, lien envoyé à Agus
   pour relecture — c'est `Disallow: /`, et le sitemap n'est pas annoncé :
   il désignerait des URL qu'on vient d'interdire.

   ⚠️ Le `robots.txt` ne suffit pas à lui seul. Il empêche l'exploration,
   pas l'indexation : une URL découverte par un lien entrant peut être
   listée sans être lue. C'est le `noindex` du gabarit (app/layout.js) qui
   fait le vrai travail. Les deux se posent ensemble, et se lèvent
   ensemble. */
export default function robots() {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${ORIGINE}/sitemap.xml`,
    host: ORIGINE,
  };
}
