/**
 * Les symboles balinais — la famille dont la puce jepun a ouvert la voie.
 *
 * Tous suivent la même règle : **un trait, une couleur héritée, aucun
 * remplissage**. Ils se posent donc partout où va une icône, prennent la
 * couleur du texte qui les entoure, et se mesurent comme des objets
 * graphiques (WCAG 1.4.11, seuil 3:1) et non comme du texte.
 *
 * Ils ne sont pas décoratifs au sens où on pourrait les intervertir :
 * chacun désigne une chose précise, et chaque endroit où l'un apparaît
 * est un endroit où cette chose est nommée dans le texte. Un symbole
 * qu'on ne peut pas expliquer au lecteur est un motif de brochure — ce
 * que cette page essaie justement de ne pas être.
 *
 * Le `viewBox` est celui de lucide (24 × 24) et l'épaisseur est
 * volontairement un peu plus fine (1,6 contre 2) : ces dessins portent
 * plus de détail qu'une icône d'interface, un trait épais les empâte.
 */

/* Le jepun, la fleur du site, vit dans Scene.jsx avec les paysages :
   il sert aussi de puce de sélection, ce que ces symboles-ci ne font
   pas. On ne le duplique pas ici. */

const D = {
  /** Tedung — l'ombrelle à étages plantée devant les sanctuaires.
      Les festons du bord font toute la lecture : sans eux, deux arcs
      sur un mât donnaient une antenne. */
  tedung: (
    <>
      <circle cx="12" cy="2.2" r=".9" />
      <path d="M12 3.1V21" />
      <path d="M7 8.6Q12 3.7 17 8.6" />
      <path d="M7 8.6q1.25 1.5 2.5 0 1.25 1.5 2.5 0 1.25 1.5 2.5 0 1.25 1.5 2.5 0" />
      <path d="M4 14.4Q12 7.7 20 14.4" />
      <path d="M4 14.4q2 1.7 4 0 2 1.7 4 0 2 1.7 4 0 2 1.7 4 0" />
    </>
  ),

  /** Penjor — le grand bambou arqué des Galungan, planté devant chaque
      maison. Les ornements **pendent** du mât : accolés, ils faisaient
      une plume. */
  penjor: (
    <>
      <path d="M4.4 21C4.4 13 6 6.2 12.6 4.2c3.9-1.1 6.2.2 6.6 2.4" />
      <path d="M19.2 6.6v2.1" />
      <path d="M17.5 8.7h3.4v3l-1.7 1.9-1.7-1.9z" />
      <path d="M6.6 15.1v2.6M8.7 10.9v2.6M12.2 7.9v2.6" />
    </>
  ),

  /** Candi bentar — la porte fendue en deux, par où l'on entre au temple. */
  candi: (
    <>
      <path d="M2.5 21h19" />
      <path d="M3.6 21V10L6.2 4h2.6v17" />
      <path d="M20.4 21V10L17.8 4h-2.6v17" />
      <path d="M4.6 9h4.2M4.1 13h4.7M3.7 17h5.1" />
      <path d="M19.4 9h-4.2M19.9 13h-4.7M20.3 17h-5.1" />
    </>
  ),

  /** Le gong du gamelan, suspendu à sa traverse de bois. Cordes
      verticales, pas obliques : en oblique on lisait un pendentif. */
  gong: (
    <>
      <path d="M4.6 3.4h14.8" />
      <path d="M8.8 3.4v3.4M15.2 3.4v3.4" />
      <circle cx="12" cy="13.4" r="5.9" />
      <circle cx="12" cy="13.4" r="1.8" />
    </>
  ),

  /** Poleng — le damier noir et blanc noué autour des arbres et des statues. */
  poleng: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.4" />
      <path d="M9.33 4v16M14.67 4v16M4 9.33h16M4 14.67h16" />
      <path d="M4 4h5.33v5.33H4zM14.67 4H20v5.33h-5.33zM9.33 9.33h5.34v5.34H9.33zM4 14.67h5.33V20H4zM14.67 14.67H20V20h-5.33z" fill="currentColor" stroke="none" />
    </>
  ),

  /** Padma — le lotus à huit pétales, l'assise du dieu suprême. */
  padma: (
    <>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path
          key={a}
          transform={`rotate(${a} 12 12)`}
          d="M12 12c-1.9-2.5-1.9-5.9 0-8.4 1.9 2.5 1.9 5.9 0 8.4Z"
        />
      ))}
    </>
  ),

  /** Canang sari — l'offrande du matin, sur son plateau de feuille tressée. */
  canang: (
    <>
      <path d="M2.8 14.4h18.4l-1 5.6H3.8z" />
      <path d="M7.4 16.4v3.6M12 16.4v3.6M16.6 16.4v3.6" />
      <circle cx="8" cy="11.8" r="2.1" />
      <circle cx="12.2" cy="10.6" r="2.4" />
      <circle cx="16.4" cy="11.8" r="2.1" />
      <path d="M13.8 8.8q2.7-3 5.6-2.7-2.2 1.6-2.8 3.7" />
    </>
  ),

  /** Les quatre rangs de naissance : Wayan, Made, Nyoman, Ketut — et le
      cinquième qui repart à Wayan. Un **cycle** de quatre, donc, et non
      quatre barres croissantes : la première version lisait comme un
      graphique de statistiques. */
  rangs: (
    <>
      <path d="M12 3.6a8.4 8.4 0 1 1-5.9 2.4" />
      <path d="M6.1 6 5.4 2.6l3.4.6" />
      <circle cx="12" cy="3.6" r="1.9" fill="currentColor" stroke="none" />
      <circle cx="20.4" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="20.4" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="3.6" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),

  /* Pas de symbole « sarong ». Trois dessins ont été essayés — le
     trapèze porté, l'écharpe nouée, le tissu drapé — et les trois
     lisaient autre chose : un abat-jour, un bonhomme bras écartés, une
     jupe. Un vêtement porté ne tient pas dans 24 px de trait. L'usage
     qui en parle emprunte donc le candi bentar : c'est bien la porte
     qu'on est habillé pour franchir, et elle, elle se reconnaît.

     La règle qui vaut pour toute la famille : un symbole qui a besoin
     de sa légende pour être compris n'est pas un symbole, c'est une
     énigme. Mieux vaut en avoir neuf qui parlent que dix dont un
     bafouille. */

  /** Nyepi — la nuit où l'île s'éteint, et où le ciel se remplit. */
  nyepi: (
    <>
      <path d="M20 14.8A8.4 8.4 0 0 1 9.2 4a8.6 8.6 0 1 0 10.8 10.8Z" />
      <path d="M17.6 3.2l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7z" />
      <path d="M13.4 8.6l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4z" />
    </>
  ),
};

export const NOMS_SYMBOLES = Object.keys(D);

export function Symbole({ nom, size = 28, className = "", strokeWidth = 1.6 }) {
  const d = D[nom];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d}
    </svg>
  );
}
