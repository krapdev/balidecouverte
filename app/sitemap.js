import { ORIGINE } from "@/lib/site";

/* Deux pages, et c'est bien le sujet : un sitemap de deux entrées n'aide
   pas Google à découvrir quoi que ce soit qu'il ne trouverait pas seul,
   mais il fixe les URL canoniques et donne une date de dernière
   modification. Il faudra l'étendre le jour où les mentions légales, les
   CGV et la politique de confidentialité arriveront. */
export default function sitemap() {
  const maj = new Date();
  return [
    { url: `${ORIGINE}/`, lastModified: maj, changeFrequency: "monthly", priority: 1 },
    { url: `${ORIGINE}/tarifs`, lastModified: maj, changeFrequency: "monthly", priority: 0.8 },
  ];
}
