/**
 * La marque de Bali Découverte — le logo d'Agus, sans son texte.
 *
 * ⚠️ **Ceci est un redessin, pas une extraction.** Le logo d'origine n'a
 * été fourni qu'en image ; il n'y a aucun fichier vectoriel dans le
 * dépôt. Le tracé ci-dessous a donc été refait à la main d'après lui.
 * Le jour où le fichier source existe (SVG, AI, EPS), c'est **lui** qui
 * doit prendre cette place : un logo est une signature, et une signature
 * refaite de mémoire n'est jamais tout à fait la bonne.
 *
 * ## Ce qui a été gardé, et ce qui a été abandonné
 *
 * L'original est une **illustration**, pensée pour une carte de visite.
 * Il porte quatre motifs : le disque de rizières en terrasses, deux épis
 * de riz en arche, un meru gris, un jepun. À 38 px de haut — la taille
 * d'un logo d'en-tête — quatre motifs ne tiennent pas. Trois essais l'ont
 * montré, et chacun a échoué d'une façon différente et instructive :
 *
 *  - Disque plein + arche à traits radiaux → **un soleil levant sur une
 *    colline.** Le remplissage du haut du cercle est ce qui tuait le
 *    dessin : dans l'original, le haut du cercle est **vide**, fermé par
 *    le seul épi.
 *  - Arche décollée du cercle → **une anse de panier.**
 *  - Meru en triangles empilés → **un sapin.** Puis, en toits plats
 *    séparés → **un panneau de signalisation.**
 *
 * **Le meru a donc été retiré de la marque d'en-tête.** À cette taille il
 * fait six pixels de haut : il n'y a pas de dessin de meru qui tienne
 * dans six pixels, il n'y a que des dessins qui ressemblent à autre
 * chose. Un motif illisible n'est pas un détail perdu, c'est un motif
 * qui dit un mot faux. Ce qui reste — les terrasses, l'épi, le jepun —
 * suffit à reconnaître le logo, et c'est vérifié jusqu'à 20 px.
 *
 * Le texte « Bali Decouverte » est retiré lui aussi : il est écrit à côté
 * en Eczar, et un logo qui répète le nom qu'on lit à trois millimètres
 * de lui le dit deux fois.
 *
 * **Le style, c'est la palette du site et non celle du logo d'origine.**
 * Les verts d'origine sont un dégradé de vert pomme ; ceux-ci sont le
 * `--bambou` et le `--pousse` qui portent déjà toutes les actions de la
 * page, et l'or est le `--soleil`. La marque appartient donc au site au
 * lieu d'y être collée — c'était le « petit style » demandé.
 *
 * ⚠️ **Ce n'est pas un membre de la famille de `Symboles.jsx`**, et il ne
 * faut pas l'y ranger : ceux-là suivent la règle « un trait, la couleur
 * héritée, aucun remplissage » et prennent la couleur du texte qui les
 * entoure. Un logo, non — il garde ses couleurs partout, c'est ce qui en
 * fait un logo. C'est la seule exception du site, et elle doit le rester.
 */

const CX = 24;
const CY = 25;
const R = 15.4;

/* Le point du cercle à l'angle `a`, en degrés, mesuré depuis l'axe des x
   et **dans le sens trigonométrique** — donc `y` se soustrait, puisque
   l'axe des y d'un SVG descend. Facteur `k` pour s'écarter du cercle. */
const pt = (a, k = 1) => [
  CX + R * k * Math.cos((a * Math.PI) / 180),
  CY - R * k * Math.sin((a * Math.PI) / 180),
];

/**
 * Les grains de l'épi, calculés et non posés à la main.
 *
 * Les poser un par un a produit deux fois le même défaut : des grains
 * régulièrement espacés mais mal orientés, donc une couronne de rayons.
 * Ce qui fait lire « épi » plutôt qu'« astre », c'est **l'inclinaison** :
 * chaque grain est couché le long de la tige, incliné d'environ 50° vers
 * le sommet de l'arche. L'inclinaison change donc de sens au passage du
 * point le plus haut — sur la moitié gauche les grains montent vers la
 * droite, sur la moitié droite vers la gauche. Un signe constant redonne
 * une roue.
 */
const GRAINS = [];
for (let a = 186; a >= -6; a -= 16) {
  const [x, y] = pt(a, 1.02);
  GRAINS.push({ x, y, r: -a + (a > 90 ? -52 : 52) });
}

export default function Marque({ size = 36, className = "", uid = "marque" }) {
  /* ⚠️ `uid` n'est pas décoratif. Le détourage des terrasses passe par un
     `<clipPath id>`, et **les identifiants SVG sont globaux au document** :
     deux marques sur la même page avec le même `id` et c'est la première
     définition qui s'applique aux deux — ce qui marche par accident tant
     qu'elles sont identiques, et casse le jour où l'une change de taille.
     Tout second appel dans une même page passe donc son propre `uid`.
     Même convention que `<Scene>` et `<Photo>`. */
  const clip = `marque-disque-${uid}`;
  const [gx, gy] = pt(186, 1);
  const [dx, dy] = pt(-6, 1);

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx={CX} cy={CY} r={R} />
        </clipPath>
      </defs>

      {/* ---- Les terrasses ----
          ⚠️ **Le disque n'est pas rempli, et c'est la clé du dessin.**
          Elles n'occupent que la moitié basse du cercle ; le haut reste
          vide, fermé par le seul épi. C'est ce vide qui fait lire une
          rizière plutôt qu'un jeton — la version qui peignait un fond
          pâle sur tout le disque donnait un soleil levant.

          Trois étages seulement, et non cinq : à 38 px, cinq bandes font
          moins de 2 px chacune et se fondent en dégradé. Les courbes
          plongent franchement vers la gauche, comme des courbes de
          niveau ; presque droites, elles donnaient des bandes d'horizon. */}
      <g clipPath={`url(#${clip})`}>
        <path d="M4 30 C 10 21, 26 19, 44 23 L44 46 L4 46 Z" fill="var(--bambou-soft)" />
        <path d="M2 35 C 8 26, 25 25, 44 30 L44 46 L2 46 Z" fill="var(--pousse)" />
        <path d="M2 41 C 7 32, 24 32, 44 37 L44 46 L2 46 Z" fill="var(--bambou)" />

        {/* Le rebord de chaque marche : le filet d'eau entre deux
            niveaux. Sans lui les aplats se fondent. */}
        <g stroke="var(--pousse-pale)" strokeWidth=".85" strokeLinecap="round" fill="none" opacity=".75">
          <path d="M4 30 C 10 21, 26 19, 44 23" />
          <path d="M2 35 C 8 26, 25 25, 44 30" />
          <path d="M2 41 C 7 32, 24 32, 44 37" />
        </g>
      </g>

      {/* ---- L'épi de riz, en arche ----
          Il **suit le cercle** au lieu de le survoler : une arche posée
          au-dessus, même de deux pixels, se lit comme l'anse d'un panier.
          Elle ferme donc le haut du cercle exactement là où les terrasses
          ferment le bas. */}
      <path
        d={`M${gx.toFixed(2)} ${gy.toFixed(2)} A ${R} ${R} 0 1 1 ${dx.toFixed(2)} ${dy.toFixed(2)}`}
        stroke="var(--soleil)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <g fill="var(--soleil)">
        {GRAINS.map(({ x, y, r }) => (
          <path
            key={`${x.toFixed(1)}-${y.toFixed(1)}`}
            transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${r.toFixed(1)})`}
            d="M0 0 C 1.9 -1.7, 4.4 -1.7, 5.6 0 C 4.4 1.7, 1.9 1.7, 0 0 Z"
          />
        ))}
      </g>

      {/* ---- Le jepun ----
          Exactement le pétale de `JepunPuce` et de `Jepun`, à l'échelle :
          la fleur du logo et celle du site sont la même fleur, ce qui
          n'était vrai d'aucune des deux avant. Il chevauche le bord en
          bas à droite comme dans l'original — c'est ce débordement qui
          l'empêche de ressembler à une pastille collée à côté. */}
      <g transform="translate(37.4 36.2) scale(0.168)">
        <g fill="var(--soleil)">
          {[0, 72, 144, 216, 288].map((a) => (
            <path
              key={a}
              transform={`rotate(${a})`}
              d="M0 2 C 13 -6, 27 -22, 19 -36 C 13 -46, -5 -47, -12 -35 C -19 -22, -9 -7, 0 2 Z"
            />
          ))}
        </g>
        <circle r="12" fill="var(--soleil-pale)" />
      </g>
    </svg>
  );
}
