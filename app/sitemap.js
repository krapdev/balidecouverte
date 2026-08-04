import { ORIGINE } from "@/lib/site";

/* Un sitemap de deux entrées n'aide pas Google à découvrir quoi que ce
   soit qu'il ne trouverait pas seul, mais il fixe les URL canoniques et
   donne une date de dernière modification.

   Les mentions légales et les CGV n'y figurent pas, et c'est délibéré :
   elles sont encore en `noindex` tant qu'elles ne sont pas complétées et
   relues. Les ajouter ici le jour où elles le seront. */
export default function sitemap() {
  const maj = new Date();
  return [
    { url: `${ORIGINE}/`, lastModified: maj, changeFrequency: "monthly", priority: 1 },
    { url: `${ORIGINE}/tarifs`, lastModified: maj, changeFrequency: "monthly", priority: 0.8 },
    { url: `${ORIGINE}/livre-d-or`, lastModified: maj, changeFrequency: "monthly", priority: 0.7 },
  ];
}
