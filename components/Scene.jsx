/**
 * Scènes duotone dessinées en SVG — rizières, canyon, source sacrée,
 * plantation de nuit. Elles tiennent lieu de photos dans le prototype :
 * zéro dépendance externe, poids négligeable, rendu identique partout.
 *
 * Pour passer en production : remplacer <Scene> par <Image> (next/image)
 * dans Hero.jsx et ExperienceCard.jsx — les proportions sont déjà posées.
 */

const RIDGES = [
  { y: 0.44, amp: 0.075, fill: "#3c5a45", op: 0.75 },
  { y: 0.56, amp: 0.06, fill: "#2b4a36", op: 0.9 },
  { y: 0.7, amp: 0.05, fill: "#1c3a27", op: 1 },
];

function ridgePath(g, i, w, h) {
  const base = h * g.y;
  const a = h * g.amp;
  let d = `M0 ${base}`;
  for (let x = 0; x <= w; x += w / 8) {
    const peak = base - a * (i % 2 ? 0.6 : 1) * (1 + Math.sin((x / w) * 6 + i));
    d += ` Q ${x + w / 16} ${peak} ${x + w / 8} ${base}`;
  }
  return `${d} L${w} ${h} L0 ${h} Z`;
}

function Terraces({ w, h }) {
  return (
    <>
      {Array.from({ length: 9 }, (_, i) => {
        const ty = h * 0.68 + i * (h * 0.038);
        return (
          <path
            key={i}
            d={`M${-40 + i * 14} ${ty} Q ${w * 0.45} ${
              ty - h * 0.075 + i * 3
            } ${w + 40} ${ty + h * 0.02}`}
            fill="none"
            stroke="#8a9b7a"
            strokeWidth={1.6 - i * 0.08}
            opacity={0.55 - i * 0.045}
          />
        );
      })}
      {/* Le Gunung Agung au loin */}
      <path
        d={`M${w * 0.72} ${h * 0.62} l16 -34 l16 34 z`}
        fill="#0f2418"
        opacity=".55"
      />
    </>
  );
}

function Canyon({ w, h }) {
  return (
    <>
      <path
        d={`M0 ${h * 0.18} L${w * 0.34} ${h * 0.3} L${w * 0.28} ${h} L0 ${h} Z`}
        fill="#12291c"
      />
      <path
        d={`M${w} ${h * 0.14} L${w * 0.63} ${h * 0.32} L${w * 0.7} ${h} L${w} ${h} Z`}
        fill="#12291c"
      />
      <path
        d={`M${w * 0.47} ${h * 0.3} c 10 90, -14 150, 4 ${h * 0.5} l 22 0 c 16 -110, -6 -170, 2 -${h * 0.2} z`}
        fill="#f4efe6"
        opacity=".62"
      />
      <ellipse
        cx={w * 0.49}
        cy={h * 0.93}
        rx={w * 0.2}
        ry={h * 0.05}
        fill="#f4efe6"
        opacity=".22"
      />
    </>
  );
}

function Spring({ w, h }) {
  const cx = w * 0.5;
  const gy = h * 0.72;
  return (
    <>
      {/* Candi bentar — le portail fendu à l'entrée du sanctuaire.
          Épaulements en gradins : c'est ce qui le rend reconnaissable. */}
      {[-1, 1].map((side) => (
        <path
          key={side}
          d={`M${cx + side * 118} ${gy}
              L${cx + side * 104} ${gy - h * 0.1}
              L${cx + side * 92} ${gy - h * 0.13}
              L${cx + side * 84} ${gy - h * 0.26}
              L${cx + side * 70} ${gy - h * 0.3}
              L${cx + side * 64} ${gy - h * 0.44}
              L${cx + side * 26} ${gy - h * 0.42}
              L${cx + side * 30} ${gy} Z`}
          fill="#0f2418"
        />
      ))}
      {Array.from({ length: 5 }, (_, j) => (
        <path
          key={j}
          d={`M${cx - 64 + j * 32} ${gy + 6} q 4 26 0 46`}
          stroke="#f4efe6"
          strokeWidth="3"
          opacity=".6"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {Array.from({ length: 3 }, (_, k) => (
        <ellipse
          key={k}
          cx={cx}
          cy={h * 0.92}
          rx={70 + k * 62}
          ry={9 + k * 5}
          fill="none"
          stroke="#f4efe6"
          strokeWidth="1.2"
          opacity={0.3 - k * 0.08}
        />
      ))}
    </>
  );
}

function Plantation({ w, h }) {
  return (
    <>
      {Array.from({ length: 40 }, (_, s) => (
        <circle
          key={s}
          cx={(s * 97) % w}
          cy={(s * 53) % Math.round(h * 0.42)}
          r={s % 5 === 0 ? 1.7 : 1}
          fill="#f4efe6"
          opacity={s % 3 === 0 ? 0.75 : 0.4}
        />
      ))}
      <circle cx={w * 0.78} cy={h * 0.16} r="24" fill="#f4efe6" opacity=".85" />
      <circle cx={w * 0.755} cy={h * 0.145} r="22" fill="#0e2018" opacity=".9" />
      {/* Rangées de caféiers */}
      {Array.from({ length: 22 }, (_, c) => (
        <path
          key={c}
          d={`M${18 + c * (w / 21)} ${h * 0.8 + (c % 3) * 16} q 12 -22 0 -40 q -12 18 0 40`}
          fill="#16301f"
        />
      ))}
      <rect y={h * 0.86} width={w} height={h * 0.14} fill="#0b1a12" />
    </>
  );
}

const MOTIFS = {
  terraces: Terraces,
  canyon: Canyon,
  spring: Spring,
  plantation: Plantation,
};

export default function Scene({
  kind = "terraces",
  w = 800,
  h = 500,
  className = "",
  label,
  uid,
}) {
  // Les <linearGradient> vivent dans l'espace de noms global du document :
  // un identifiant par instance, sinon deux scènes du même type se marchent dessus.
  const ns = uid ?? kind;
  const Motif = MOTIFS[kind] ?? Terraces;
  const night = kind === "plantation";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`sky-${ns}`} x1="0" y1="0" x2="0" y2="1">
          {night ? (
            <>
              <stop offset="0" stopColor="#0a1a14" />
              <stop offset="1" stopColor="#183227" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#d9d0bd" />
              <stop offset="0.55" stopColor="#a9b096" />
              <stop offset="1" stopColor="#5e7b5f" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`mist-${ns}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4efe6" stopOpacity="0.3" />
          <stop offset="1" stopColor="#f4efe6" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width={w} height={h} fill={`url(#sky-${ns})`} />
      {RIDGES.map((g, i) => (
        <path key={i} d={ridgePath(g, i, w, h)} fill={g.fill} opacity={g.op} />
      ))}
      <rect
        y={h * 0.3}
        width={w}
        height={h * 0.3}
        fill={`url(#mist-${ns})`}
      />
      <Motif w={w} h={h} />
    </svg>
  );
}

/** Portrait illustré d'Agus — silhouette à l'udeng devant la vallée. */
export function PortraitAgus({ className = "" }) {
  return (
    <svg
      viewBox="0 0 460 560"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Portrait illustré d'Agus Yudiarta, guide francophone à Sidemen"
    >
      <defs>
        <linearGradient id="portrait-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9c4ad" />
          <stop offset="1" stopColor="#5d7a5e" />
        </linearGradient>
        {/* L'udeng doit épouser le crâne, pas flotter devant */}
        <clipPath id="portrait-head">
          <circle cx="230" cy="318" r="76" />
        </clipPath>
      </defs>
      <rect width="460" height="560" fill="url(#portrait-sky)" />
      <path
        d="M0 250 Q115 190 230 250 T460 240 L460 560 L0 560 Z"
        fill="#2b4a36"
      />
      <path
        d="M0 330 Q140 285 260 340 T460 330 L460 560 L0 560 Z"
        fill="#1c3a27"
      />
      <circle cx="352" cy="96" r="46" fill="#f4efe6" opacity=".55" />
      <path
        d="M96 560 c0-118 46-176 134-176 s134 58 134 176 z"
        fill="#0f2418"
      />
      <circle cx="230" cy="318" r="76" fill="#0f2418" />
      {/* Udeng : bandeau frontal découpé sur le crâne, puis nœud latéral */}
      <g clipPath="url(#portrait-head)">
        <rect x="150" y="240" width="160" height="46" fill="#d96b43" />
        <path d="M150 286 q80 22 160 0 v-14 q-80 20 -160 0z" fill="#c25c37" />
      </g>
      <path d="M272 254 l44 -20 l-10 36 z" fill="#d96b43" />
      {/* Lumière rasante de fin de journée */}
      <path
        d="M96 560 c0-118 46-176 134-176"
        fill="none"
        stroke="#e2c9a8"
        strokeWidth="2.5"
        opacity=".55"
      />
      <path
        d="M160 296 a76 76 0 0 0 14 84"
        fill="none"
        stroke="#e2c9a8"
        strokeWidth="2.5"
        opacity=".45"
      />
    </svg>
  );
}
