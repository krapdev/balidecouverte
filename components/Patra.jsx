/**
 * Le patra punggel — l'ornement d'angle de la sculpture balinaise.
 *
 * ⚠️ **Ce n'est pas un membre de `Symboles.jsx`, et c'est délibéré.** La
 * famille des symboles obéit à une règle : chacun désigne une chose
 * précise, et n'apparaît qu'à un endroit où cette chose est nommée dans
 * le texte. Le penjor et le tedung qui décoraient ces deux cartes la
 * violaient déjà — rien, sur la fourche, ne parle de bambou de Galungan
 * ni d'ombrelle de sanctuaire ; ils y étaient parce qu'ils ornaient
 * l'entrée de menu correspondante, ce qui est un écho interne que
 * personne ne peut lire.
 *
 * Le patra punggel, lui, ne prétend désigner rien. C'est **l'ornement**
 * de Bali : la volute de fougère qui se déroule, sculptée dans le bois
 * des portes, la pierre des porches et le linteau de toute maison de
 * l'île. Un ornement n'a pas à être nommé dans le texte, il a seulement
 * à être de l'endroit. Celui-ci l'est.
 *
 * ⚠️ **Il est complet, et petit.** Ce qui rendait le symbole laid en
 * mobile n'était pas son motif mais son échelle : 170 px de trait fin
 * rognés par l'angle d'une carte de 294 px ne donnent pas un dessin
 * discret, ils donnent **des lignes qui ne se rejoignent pas**. Un trait
 * de 0,6 px ne devient pas plus léger en grandissant, il devient plus
 * long. Un ornement qui tient tout entier dans le coin se lit comme un
 * ornement ; un grand dessin coupé se lit comme un accident.
 *
 * Il se pose dans l'angle **bas-droit** — celui que le filigrane de
 * jepun occupait, et qu'il remplace : deux ornements de coin sur une
 * carte de six lignes, c'est un de trop.
 */
export default function Patra({ size = 104, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* ⚠️ Le dessin est écrit dans les coordonnées où il se lit, puis
          agrandi d'un bloc pour remplir la boîte. Le recalculer nombre
          par nombre l'aurait rendu illisible à la relecture, et c'est
          exactement le genre de fichier qu'on rouvre un an après.
          L'échelle est compensée sur `stroke-width` (1,15 × 1,4 ≈ 1,6),
          sinon l'ornement s'épaissit en même temps qu'il grandit. */}
      <g transform="translate(100 98) scale(1.4) translate(-100 -95)">
        {/* La tige maîtresse, qui monte du coin et se déroule en volute.
            C'est le geste du patra : une fougère qui s'ouvre. */}
        <path d="M99 92c-16 0-31-6-42-18C47 63 43 51 45 41" />
        <path d="M45 41c1.6-8.4 8.6-13.6 16-12.4 6.8 1.1 11 7 10 13.6-.9 5.8-6 9.6-11.4 8.8-4.6-.7-7.6-4.8-7-9.2.5-3.5 3.6-5.9 6.9-5.4 2.6.4 4.3 2.7 4 5.2" />

        {/* Kuping guling — « l'oreille », la petite volute qui repart en
            sens inverse à mi-tige. C'est elle qui empêche l'ornement de
            n'être qu'une spirale. */}
        <path d="M69 76c-6.6-2.6-10-9.4-7.6-15.8 2-5.4 8-8 13.2-5.8 4.4 1.8 6.4 6.8 4.4 11-1.7 3.5-5.8 5-9.2 3.4-2.7-1.3-3.9-4.5-2.7-7.1" />

        {/* Batun poh — « le noyau de mangue », la goutte pointue qui
            referme la composition contre le bord. */}
        <path d="M86 84c1.4-8 6.6-13.4 14-15-.4 8.2-5.4 14-14 15z" />

        {/* Jengger siap — « la crête du coq » : les dents qui bordent la
            tige. Deux, pas trois, et courtes : à cette échelle, trois
            traits parallèles ne font plus une crête, ils font des
            rayures. */}
        <path d="M72 87l-3.6 5.2M60.5 80.5l-4.3 4.6" />
      </g>
    </svg>
  );
}
