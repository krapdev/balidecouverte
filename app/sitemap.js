import { ORIGINE } from "@/lib/site";

/* Un sitemap de deux entrées n'aide pas Google à découvrir quoi que ce
   soit qu'il ne trouverait pas seul, mais il fixe les URL canoniques et
   donne une date de dernière modification.

   Les mentions légales et les CGV n'y figurent pas, et c'est délibéré :
   elles sont encore en `noindex` tant qu'elles ne sont pas complétées et
   relues. Les ajouter ici le jour où elles le seront.

   `/agus` non plus, pour la même raison : la page porte encore des
   marqueurs « à compléter » que seul Agus peut lever. Les trois choses
   vont ensemble — le marqueur, le `noindex` de ses métadonnées, et
   cette ligne manquante. */
export default function sitemap() {
  const maj = new Date();
  return [
    { url: `${ORIGINE}/`, lastModified: maj, changeFrequency: "monthly", priority: 1 },
    { url: `${ORIGINE}/circuit`, lastModified: maj, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGINE}/envies`, lastModified: maj, changeFrequency: "monthly", priority: 0.85 },
    { url: `${ORIGINE}/tarifs`, lastModified: maj, changeFrequency: "monthly", priority: 0.8 },
    { url: `${ORIGINE}/livre-d-or`, lastModified: maj, changeFrequency: "monthly", priority: 0.7 },
  ];
}
