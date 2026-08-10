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
    <div
      className={`flex items-center gap-5 ${className}`}
      aria-hidden="true"
    >
      {/* Le filet est à 45 % et non à 35 % comme celui qu'il remplace :
          le bougainvillier est plus sombre que le bambou, et à 35 % sur
          le sable il devenait un souvenir de trait. */}
      <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--bougain)_45%,transparent)]" />
      <Jepun size={size} tone="var(--bougain)" />
      <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--bougain)_45%,transparent)]" />
    </div>
  );
}
