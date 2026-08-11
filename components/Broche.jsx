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
 * ⚠️ **48 et non 40, la taille des coutures.** Ce n'est pas une
 * exception qui a échappé à l'harmonisation : c'est une taille par
 * fonction, et la broche n'a pas la même que la fleur d'une couture.
 * Celle-ci s'interrompt sur un fil, entre deux traits de la même
 * teinte, et se lit par contraste avec eux ; la broche est posée
 * seule sur un aplat vert, sans rien à côté pour donner l'échelle.
 * À 40 elle s'y lisait comme une pastille.
 *
 * `aria-hidden` par `Jepun`, et rien à annoncer : la fiche a déjà son
 * titre et son eyebrow.
 */
export default function Broche({ size = 48, className = "" }) {
  return (
    <span
      className={`pointer-events-none absolute -left-5 -top-6 z-10 drop-shadow-[0_3px_6px_rgba(20,30,18,0.35)] ${className}`}
    >
      {/* Le cœur rouge : sur des pétales jaunes, le cœur doré d'origine
          était de la même famille de teinte et la fleur se lisait comme
          une tache unie. Le bougainvillier tranche, et il rappelle celui
          des coutures — la même fleur, l'autre couleur. */}
      <Jepun size={size} tone="var(--soleil)" coeur="var(--bougain)" />
    </span>
  );
}
