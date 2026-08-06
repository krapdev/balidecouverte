import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * La grammaire de navigation du site, en un seul composant.
 *
 * Le reproche de départ : sur mobile, on ne sait pas ce que fait un
 * lien. « Tout mon parcours », « Ce que comprend ce prix », « Les quinze
 * journées en détail » — trois libellés, trois habillages, et aucun ne
 * se voyait assez pour qu'on le vise du pouce.
 *
 * ⚠️ **Une porte balinaise a été essayée à cette place, et retirée.**
 * L'idée était de dire « on change de page » avec le candi bentar. Elle
 * échouait sur le seul critère qui compte ici : à 17 px, un symbole
 * qu'il faut apprendre ne se lit pas plus vite qu'un mot — et il
 * remplaçait la flèche, c'est-à-dire le seul signe que tout le monde
 * sait lire sans notice. Sur un écran de 390 px, on n'a pas le luxe
 * d'un vocabulaire à apprendre.
 *
 * Reste donc la flèche, mais **franche** : 18 px et un trait de 2,2 au
 * lieu des 15 px filiformes d'avant. C'est ce qui manquait vraiment.
 *
 * Ce que le composant garantit, et qu'il ne faut pas défaire :
 *
 *  - **44 px de haut.** C'était le vrai défaut sur mobile : des liens de
 *    20 px pris dans un paragraphe, impossibles à viser.
 *  - **Un soulignement**, pas seulement la couleur. Un lien signalé par
 *    la seule couleur n'existe pas pour qui ne la distingue pas
 *    (WCAG 1.4.1).
 *  - **La flèche est `aria-hidden`.** Le libellé porte le sens, et un
 *    lecteur d'écran annonce déjà « lien ».
 */
export default function LienPage({
  href,
  children,
  /* `discret` : même grammaire, moins de poids — pour un lien secondaire
     posé à côté d'un bouton, qui ne doit pas lui disputer l'œil. */
  discret = false,
  className = "",
  ...reste
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2.5 text-sm no-underline ${
        discret ? "text-soft" : "text-accent"
      } ${className}`}
      {...reste}
    >
      <span
        className={`underline underline-offset-4 ${
          discret ? "decoration-rule" : "decoration-accent"
        }`}
      >
        {children}
      </span>
      <ArrowRight
        size={18}
        strokeWidth={2.2}
        aria-hidden="true"
        className="shrink-0 transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}
