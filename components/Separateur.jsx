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
/* 44 et non 34 : à 34 la fleur se lisait comme un nœud sur le fil plutôt
   que comme une fleur. Elle est le seul objet coloré de la page qui ne
   serve à rien d'autre qu'à faire respirer — autant qu'elle se voie. */
export default function Separateur({ className = "", size = 44 }) {
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
      {/* ⚠️ **La frise du linteau, tenue entre deux filets** — la même
          dent, au même pas, avec un second trait sous les pointes.
          Trois états ont précédé celui-ci, et chacun corrigeait le
          précédent : deux filets droits (la page portait deux dessins
          pour une seule idée, dont un seul était de Bali) ; la frise du
          linteau telle quelle (elle penchait — un motif qui pend sous
          une poutre dit de quel côté est le poids, or une couture sépare
          deux choses de même rang) ; une chaîne de losanges, symétrique
          mais qui ne se lisait plus comme la frise de la barre.
          Bornée, elle est symétrique **et** reconnaissable, et elle tient
          d'elle-même sur l'axe de la fleur — le calage de 2 px
          qu'imposait l'asymétrie a disparu avec elle.
          Le tracé vit dans `.frise-bande` et sa couleur vient de
          `currentColor` : voir globals.css. */}
      <span className="frise frise-bande flex-1 text-[color-mix(in_srgb,var(--bougain)_55%,transparent)]" />
      <Jepun size={size} tone="var(--bougain)" />
      <span className="frise frise-bande flex-1 text-[color-mix(in_srgb,var(--bougain)_55%,transparent)]" />
    </div>
  );
}
