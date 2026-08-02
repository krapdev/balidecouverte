"use client";

/**
 * L'archipel, d'ouest en est : Java, Bali, Lombok, Sumbawa, Komodo et
 * Flores. Silhouettes très simplifiées — ce n'est pas une carte, c'est
 * un repère. Les îles du circuit choisi s'allument, les autres restent
 * en retrait.
 *
 * C'est ce qui répond à « où » sans le répéter cinq fois en texte.
 */

const ILES = [
  {
    id: "java",
    nom: "Java",
    label: [186, 76],
    d: "M18 96 C 60 70, 120 62, 190 68 C 250 73, 300 84, 344 96 C 320 116, 260 126, 190 124 C 120 122, 56 114, 18 96 Z",
  },
  {
    id: "bali",
    nom: "Bali",
    label: [404, 78],
    d: "M372 98 C 386 84, 412 80, 432 88 C 444 93, 444 110, 430 118 C 410 128, 382 122, 372 108 Z",
  },
  {
    id: "lombok",
    nom: "Lombok",
    label: [486, 76],
    d: "M462 96 C 472 82, 496 80, 508 90 C 518 98, 516 114, 502 120 C 486 126, 466 116, 462 104 Z",
  },
  {
    id: "sumbawa",
    nom: "Sumbawa",
    label: [604, 72],
    d: "M540 100 C 566 86, 596 88, 614 96 C 630 88, 660 90, 676 100 C 662 118, 632 122, 612 112 C 594 124, 558 120, 540 108 Z",
  },
  {
    id: "komodo",
    nom: "Komodo",
    label: [712, 74],
    d: "M700 98 C 708 90, 722 90, 728 98 C 732 106, 724 116, 714 114 C 704 112, 696 106, 700 98 Z M686 116 C 692 112, 700 114, 700 120 C 700 126, 690 128, 686 122 Z",
  },
  {
    id: "flores",
    nom: "Flores",
    label: [872, 72],
    d: "M754 104 C 786 88, 830 88, 862 96 C 894 90, 934 94, 962 106 C 936 122, 894 124, 864 114 C 830 124, 782 120, 754 108 Z",
  },
];

export default function Archipel({ actives = [], className = "" }) {
  const isOn = (id) => actives.length === 0 || actives.includes(id);

  return (
    <svg
      viewBox="0 54 980 92"
      className={className}
      role="img"
      aria-label={
        actives.length
          ? `Archipel indonésien, îles du circuit : ${actives.join(", ")}`
          : "Archipel indonésien : Java, Bali, Lombok, Sumbawa, Komodo, Flores"
      }
    >
      {/* La mer, en fil */}
      <path
        d="M0 132 Q 245 122 490 132 T 980 132"
        fill="none"
        stroke="var(--lagon)"
        strokeWidth="1.5"
        opacity=".35"
      />
      {ILES.map((ile) => {
        const on = isOn(ile.id);
        return (
          <g key={ile.id} style={{ transition: "opacity .35s ease" }} opacity={on ? 1 : 0.34}>
            <path
              d={ile.d}
              fill={on ? "var(--jade)" : "var(--text-faint)"}
              style={{ transition: "fill .35s ease" }}
            />
            <text
              x={ile.label[0]}
              y={ile.label[1]}
              textAnchor="middle"
              className="label"
              fill={on ? "var(--eyebrow)" : "var(--text-faint)"}
              style={{ fontSize: 12, letterSpacing: "0.16em" }}
            >
              {ile.nom}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
