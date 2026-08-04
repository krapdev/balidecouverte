/**
 * Apparition douce à l'entrée dans le viewport. Une seule fois.
 *
 * **Composant serveur.** Il l'était avec framer-motion : chaque `Reveal`
 * — et il y en a une soixantaine sur l'accueil — était une frontière
 * client de plus à hydrater, pour une transition d'opacité. Le travail
 * est désormais fait par une classe CSS et **un seul** observateur monté
 * une fois pour toute la page (`RevealObserver`).
 *
 * Le retrait de framer-motion a coûté deux transitions qui ne
 * manqueront à personne (la sortie animée d'une ligne du panier, le
 * décalage de la barre mobile) et rendu 74 ko de JavaScript.
 *
 * `delay` reste exprimé en secondes, comme avant, pour ne pas avoir à
 * relire les soixante appels.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
