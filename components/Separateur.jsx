import { Jepun } from "./Scene";

/**
 * La couture entre deux sections : un filet mince interrompu par un
 * jepun **bougainvillier**.
 *
 * Il remplace le `Divider` en bambou, qui n'apparaissait qu'une fois sur
 * tout le site — entre la présentation et la fourche. Le motif existait
 * donc sans être un motif : une exception isolée n'est pas un système.
 *
 * ## Pourquoi le bougainvillier, et pourquoi seulement ici
 *
 * La palette pose depuis le début que **le bambou porte l'action, le
 * soleil éclaire, le bougainvillier ne fait ni l'un ni l'autre**. C'est
 * la seule couleur du site qui n'a aucune fonction — elle ne signale
 * rien, elle ne se clique pas. Elle est donc la seule qui puisse
 * décorer sans mentir : un séparateur en bambou ressemble à quelque
 * chose qu'on peut toucher, un séparateur en bougainvillier ne
 * ressemble à rien d'autre qu'à une fleur.
 *
 * ⚠️ **Ne pas s'en servir ailleurs que comme couture.** Le jour où le
 * bougainvillier apparaît sur un bouton ou un lien, cette couleur perd
 * ce qui la rend utilisable ici.
 *
 * ## Pourquoi il vit DANS la section et non entre deux
 *
 * Les fonds de l'accueil alternent — ivoire, sable, bambou, ivoire,
 * sable. Un séparateur posé *entre* deux sections tomberait sur le fond
 * de la page, c'est-à-dire dans une bande nue entre deux bandes
 * colorées. Il ouvre donc la section qui suit, sur le fond de
 * celle-ci — la couture appartient à ce qu'elle introduit.
 *
 * `aria-hidden` : c'est un ornement. La structure du document est déjà
 * portée par les `<section>` et leurs titres ; l'annoncer une seconde
 * fois n'ajouterait qu'un « image » de plus à traverser au lecteur
 * d'écran.
 */
/* ⚠️ **40, et la même valeur partout.** Trois tailles ont coexisté — 44
   dans les coutures, 28 dans celles du portrait, 54 pour la broche — et
   c'était une taille par endroit plutôt qu'une par fonction : la fleur
   est le même objet dans les trois cas, elle n'a pas à changer de
   grandeur selon la page où on la pose.
   Le plancher reste ce qu'il était : à 34 elle se lisait comme un nœud
   sur le fil plutôt que comme une fleur. Elle est le seul objet coloré
   de la page qui ne serve à rien d'autre qu'à faire respirer — autant
   qu'elle se voie. */
export default function Separateur({ className = "", size = 40 }) {
  return (
    /* `couture` ne porte aucun style : c'est la prise de l'audit. Le
       motif des flancs s'est perdu une fois en silence — trois vues sur
       six, aucune erreur, rien qui déborde — et rien dans la passe ne
       pouvait le voir. Nommer la couture rend l'invariant vérifiable :
       tout flanc de couture porte un masque. */
    <div
      className={`couture flex items-center gap-5 ${className}`}
      aria-hidden="true"
    >
      {/* ⚠️ **Le patra courant** — la tige et ses feuilles alternées,
          c'est-à-dire l'ornement de `Patra.jsx` déroulé : le même, lové
          dans l'angle des cartes, couché sur la ligne ici.
          Quatre états ont précédé celui-ci, et chacun a appris une
          chose. Deux filets droits : la page portait deux dessins pour
          une seule idée, « ici, ça se sépare », dont un seul était de
          Bali. La dent du linteau telle quelle : elle penchait — un
          motif qui pend sous une poutre dit de quel côté est le poids,
          or une couture sépare deux choses de même rang. Une chaîne de
          losanges : symétrique, mais elle ne se lisait plus comme une
          frise. La dent tenue entre deux filets : symétrique et
          reconnaissable, mais la réglure enfermait la fleur.
          Ce qui restait à trouver n'était donc pas une correction de
          plus, c'était un motif qui n'ait jamais eu à pendre.
          Le tracé vit dans `.frise-patra` et sa couleur vient de
          `currentColor` : voir globals.css, où est écrit **pourquoi ce
          tracé-là** — il a été choisi sur planche, à sa taille réelle. */}
      <span className="frise frise-patra flex-1 text-[color-mix(in_srgb,var(--bougain)_55%,transparent)]" />
      <Jepun size={size} tone="var(--bougain)" />
      <span className="frise frise-patra flex-1 text-[color-mix(in_srgb,var(--bougain)_55%,transparent)]" />
    </div>
  );
}
