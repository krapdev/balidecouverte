import { Jepun } from "./Scene";

/**
 * La broche : le jepun jaune épinglé à l'angle d'une fiche verte.
 *
 * ⚠️ **Elle est SŒUR de la fiche, pas fille.** La fiche porte
 * `overflow-hidden` — nécessaire pour que son filigrane de 230 px reste
 * dans les angles arrondis. Une broche posée dedans serait donc rognée
 * exactement là où elle doit dépasser. D'où le conteneur `relative` qui
 * enveloppe les deux : la fiche découpe ce qu'elle contient, la broche
 * flotte au-dessus sans être concernée.
 *
 * ⚠️ **Le décalage est asymétrique**, et c'est ce qui fait la broche.
 * Centrée sur l'angle, elle ressemble à un badge collé ; posée aux deux
 * tiers dedans et un tiers dehors, elle ressemble à quelque chose qu'on a
 * épinglé. Un objet posé sur un tissu ne l'est jamais tout à fait au
 * bord.
 *
 * `aria-hidden` par `Jepun`, et rien à annoncer : la fiche a déjà son
 * titre et son eyebrow.
 */
export default function Broche({ size = 54, className = "" }) {
  return (
    <span
      className={`pointer-events-none absolute -left-3 -top-4 z-10 drop-shadow-[0_3px_6px_rgba(20,30,18,0.35)] ${className}`}
    >
      <Jepun size={size} tone="var(--soleil)" />
    </span>
  );
}
