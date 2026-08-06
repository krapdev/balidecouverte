import Link from "next/link";
import { Symbole } from "./Symboles";

/**
 * La grammaire de navigation du site, en un seul composant.
 *
 * Le reproche : sur mobile, on ne sait pas ce que fait un lien. « Tout
 * mon parcours », « Ce que comprend ce prix », « Les quinze journées en
 * détail », « Lire les sept témoignages » — quatre libellés, quatre
 * habillages différents, et aucun ne disait s'il déplaçait dans la page
 * ou s'il changeait de page. Sur un écran de 390 px où l'on ne voit
 * jamais plus d'un tiers d'une section, c'est la différence entre
 * « je jette un œil » et « je perds ma place ».
 *
 * La règle est désormais unique et vaut partout :
 *
 *   **une porte → on change de page.  une flèche → on reste ici.**
 *
 * La porte est le candi bentar, la porte fendue en deux par laquelle on
 * entre dans un temple balinais. Ce n'est pas un ornement plaqué : c'est
 * déjà le symbole du seuil dans le menu mobile, et c'est littéralement
 * ce qu'on fait — franchir. Sa version `porte` est dépouillée de ses
 * assises gravées, illisibles sous 20 px (voir Symboles.jsx).
 *
 * Ce que le composant garantit, et qu'il ne faut pas défaire :
 *
 *  - **44 px de haut.** C'était le vrai défaut sur mobile : des liens de
 *    20 px pris dans un paragraphe, impossibles à viser.
 *  - **Un soulignement**, pas seulement la couleur. Un lien signalé par
 *    la seule couleur n'existe pas pour qui ne la distingue pas
 *    (WCAG 1.4.1).
 *  - **La porte est `aria-hidden`.** C'est une redondance visuelle ; le
 *    libellé porte déjà le sens, et un lecteur d'écran annonce déjà
 *    « lien ».
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
      className={`group inline-flex min-h-11 items-center gap-2 text-sm no-underline ${
        discret ? "text-soft" : "text-accent"
      } ${className}`}
      {...reste}
    >
      <Symbole
        nom="porte"
        size={17}
        strokeWidth={1.5}
        className={`shrink-0 transition-transform group-hover:-translate-y-0.5 ${
          discret ? "text-faint" : "text-accent"
        }`}
      />
      <span
        className={`underline underline-offset-4 ${
          discret ? "decoration-rule" : "decoration-accent"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}
