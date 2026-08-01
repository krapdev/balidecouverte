/**
 * Paysages et ornements de Bali, dessinés en SVG.
 *
 * Le registre a changé : plus d'aplats d'affiche, mais des couches
 * douces et un vocabulaire ornemental emprunté à ce qu'on voit vraiment
 * sur l'île — le jepun (frangipanier) posé sur les offrandes et derrière
 * l'oreille, le penjor (le grand bambou arqué des cérémonies), le canang
 * sari (l'offrande quotidienne), le tedung (l'ombrelle de temple).
 *
 * Pour passer en production : remplacer <Scene> par <Image> (next/image)
 * dans Hero.jsx et ExperienceCard.jsx — les proportions sont déjà posées.
 */

/* Toutes les scènes sont nocturnes ou à l'aube. La lumière n'est jamais
   un aplat : c'est un halo, un reflet, une braise. */
const C = {
  cielHaut: "#061520",
  cielBas: "#1d3f4a",
  aubeChaude: "#8a5a3a",
  lueur: "#e8a33f",
  lueurPale: "#f6d79b",
  mer: "#0d3944",
  merProfonde: "#061e26",
  merClaire: "#14606d",
  padi: "#2f4a33",
  padiClair: "#456b40",
  brique: "#6b3a2c",
  briqueSombre: "#4a2820",
  nuitDense: "#04101a",
  clair: "#f2ece0",
};

/** Bande à bord ondulé — la brique de base de tous les paysages. */
function band(y, amp, w, h, phase = 0, steps = 5) {
  let d = `M0 ${y}`;
  const seg = w / steps;
  for (let i = 0; i < steps; i++) {
    const x = i * seg;
    d += ` Q ${x + seg / 2} ${y - amp * Math.sin(i * 1.7 + phase)} ${x + seg} ${
      y - amp * 0.35 * Math.sin((i + 1) * 1.7 + phase)
    }`;
  }
  return `${d} L${w} ${h} L0 ${h} Z`;
}

/* ================= Ornements ================= */

/** Jepun — le frangipanier. Cinq pétales en hélice, cœur miel. */
export function Jepun({ size = 26, className = "", tone = "currentColor" }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <g fill={tone}>
        {[0, 72, 144, 216, 288].map((a) => (
          <path
            key={a}
            transform={`rotate(${a})`}
            d="M0 2 C 13 -6, 27 -22, 19 -36 C 13 -46, -5 -47, -12 -35 C -19 -22, -9 -7, 0 2 Z"
          />
        ))}
      </g>
      <circle r="6" fill="#dfa441" />
    </svg>
  );
}

/**
 * Branche de jepun — le frangipanier des cours de temple, qui déborde
 * toujours par-dessus les murs. Sert de cadre végétal en haut du hero.
 * (Un penjor avait été essayé ici : à cette échelle il lisait comme un
 * lampadaire, la branche porte bien mieux l'idée.)
 */
export function JepunBranch({ className = "", flip = false }) {
  const petal =
    "M0 2 C 13 -6, 27 -22, 19 -36 C 13 -46, -5 -47, -12 -35 C -19 -22, -9 -7, 0 2 Z";
  const flowers = [
    { x: 96, y: 150, s: 0.62, r: 18 },
    { x: 172, y: 96, s: 0.5, r: -24 },
    { x: 44, y: 78, s: 0.44, r: 8 },
  ];
  const leaves = [
    { x: 214, y: 44, r: 32, s: 1 },
    { x: 150, y: 34, r: 68, s: 0.85 },
    { x: 128, y: 128, r: 112, s: 0.8 },
    { x: 216, y: 128, r: 4, s: 0.7 },
    { x: 70, y: 20, r: 96, s: 0.66 },
  ];
  return (
    <svg
      viewBox="0 0 280 210"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <g stroke={C.nuitDense} fill="none" strokeLinecap="round">
        <path d="M280 4 C 226 22, 178 54, 150 96" strokeWidth="7" />
        <path d="M186 62 C 150 74, 120 104, 100 146" strokeWidth="5" />
        <path d="M212 34 C 178 34, 120 44, 66 74" strokeWidth="4" />
      </g>
      <g fill={C.padi}>
        {leaves.map((l, i) => (
          <ellipse
            key={i}
            cx={l.x}
            cy={l.y}
            rx={34 * l.s}
            ry={12 * l.s}
            transform={`rotate(${l.r} ${l.x} ${l.y})`}
          />
        ))}
      </g>
      {flowers.map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.r}) scale(${f.s})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <path key={a} transform={`rotate(${a})`} d={petal} fill={C.clair} />
          ))}
          <circle r="7" fill={C.lueur} />
        </g>
      ))}
    </svg>
  );
}

/** Canang sari — l'offrande de fleurs déposée chaque matin. */
export function Canang({ size = 44, className = "" }) {
  return (
    <svg
      viewBox="0 0 60 44"
      width={size}
      height={(size * 44) / 60}
      className={className}
      aria-hidden="true"
    >
      {/* Le petit plateau tressé en feuille de palme */}
      <path d="M6 24 L54 24 L50 42 L10 42 Z" fill="#c8b98f" />
      <path d="M6 24 L54 24 L52 30 L8 30 Z" fill="#b0a074" />
      {[14, 22, 30, 38, 46].map((x) => (
        <path
          key={x}
          d={`M${x} 30 L${x} 42`}
          stroke="#9a8a60"
          strokeWidth="1"
          opacity=".7"
        />
      ))}
      {/* Les fleurs : blanche, rouge, jaune — les directions */}
      <circle cx="18" cy="20" r="7" fill={C.clair} />
      <circle cx="30" cy="16" r="8" fill="#b8654a" />
      <circle cx="43" cy="20" r="7" fill={C.lueur} />
      <path
        d="M30 16 c 8 -10 16 -12 22 -10 c -6 4 -10 10 -12 16 z"
        fill={C.padi}
      />
    </svg>
  );
}

/** Tedung — l'ombrelle à étages plantée devant les sanctuaires. */
function Tedung({ x, y, s = 1, tone = C.lueur }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-3 0 L3 0 L2 -74 L-2 -74 Z" fill={C.nuitDense} />
      <path d="M-46 -74 C -30 -102, 30 -102, 46 -74 Z" fill={tone} />
      <path
        d="M-46 -74 q 11 10 15 0 q 11 10 16 0 q 11 10 15 0"
        fill={tone}
        opacity=".75"
      />
      <circle cy="-102" r="4" fill={C.nuitDense} />
    </g>
  );
}

/* ================= Paysages ================= */

/** Sidemen avant le jour : l'Agung en ombre, la lueur qui monte derrière. */
function Terraces({ w, h, ns }) {
  return (
    <>
      {/* Le halo précède l'astre : c'est lui qui donne l'heure */}
      <ellipse cx={w * 0.74} cy={h * 0.6} rx={w * 0.42} ry={h * 0.34} fill={`url(#halo-${ns})`} />
      <circle cx={w * 0.74} cy={h * 0.56} r={h * 0.09} fill={C.lueurPale} />
      {/* Le Gunung Agung : arêtes adoucies, jamais une pyramide */}
      <path
        d={`M${w * 0.06} ${h * 0.66}
            Q ${w * 0.26} ${h * 0.46} ${w * 0.36} ${h * 0.26}
            Q ${w * 0.4} ${h * 0.21} ${w * 0.45} ${h * 0.27}
            Q ${w * 0.56} ${h * 0.47} ${w * 0.72} ${h * 0.66} Z`}
        fill={C.merProfonde}
      />
      <path d={band(h * 0.68, h * 0.045, w, h, 2.1)} fill={C.mer} />
      <path d={band(h * 0.78, h * 0.04, w, h, 3.3)} fill={C.padi} />
      <path d={band(h * 0.88, h * 0.03, w, h, 1.2)} fill={C.nuitDense} />
      {/* L'eau des terrasses attrape la lueur : le subak en miroir */}
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${h * (0.9 + i * 0.028)} Q ${w * 0.5} ${
            h * (0.86 + i * 0.028)
          } ${w} ${h * (0.92 + i * 0.028)}`}
          fill="none"
          stroke={C.lueur}
          strokeWidth="1.5"
          opacity={0.3 - i * 0.05}
        />
      ))}
    </>
  );
}

/** La source sacrée à l'aube : le melukat se fait avant le jour. */
function Spring({ w, h, ns }) {
  const cx = w * 0.5;
  const gy = h * 0.68;
  return (
    <>
      <ellipse cx={cx} cy={h * 0.5} rx={w * 0.34} ry={h * 0.34} fill={`url(#halo-${ns})`} />
      <circle cx={cx} cy={h * 0.42} r={h * 0.12} fill={C.lueurPale} opacity=".9" />
      <path d={band(h * 0.58, h * 0.035, w, h, 1.9)} fill={C.merProfonde} />
      {[-1, 1].map((side) => (
        <g key={side}>
          <path
            d={`M${cx + side * 126} ${gy}
                L${cx + side * 110} ${gy - h * 0.11}
                L${cx + side * 96} ${gy - h * 0.15}
                L${cx + side * 86} ${gy - h * 0.28}
                L${cx + side * 70} ${gy - h * 0.33}
                L${cx + side * 62} ${gy - h * 0.48}
                L${cx + side * 24} ${gy - h * 0.46}
                L${cx + side * 30} ${gy} Z`}
            fill={C.brique}
          />
          {/* Les assises de brique : c'est ce qui rend le gradin lisible */}
          {[0.09, 0.19, 0.31, 0.42].map((t) => (
            <path
              key={t}
              d={`M${cx + side * (126 - t * 150)} ${gy - h * t} L${
                cx + side * (30 - t * 12)
              } ${gy - h * t}`}
              stroke={C.briqueSombre}
              strokeWidth={Math.max(1.5, h * 0.008)}
              opacity=".7"
            />
          ))}
        </g>
      ))}
      <Tedung x={cx - 168} y={gy} s={h / 620} tone={C.lueur} />
      <Tedung x={cx + 168} y={gy} s={h / 620} tone={C.clair} />
      {/* Le bassin, et la lueur qui s'y couche */}
      <rect y={gy} width={w} height={h - gy} fill={C.merProfonde} />
      <rect y={gy} width={w} height={h - gy} fill={`url(#mist-${ns})`} opacity=".5" />
      {Array.from({ length: 5 }, (_, j) => (
        <path
          key={j}
          d={`M${cx - 56 + j * 28} ${gy - 4} q 3 20 0 36`}
          stroke={C.lueurPale}
          strokeWidth="3.5"
          opacity=".7"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {Array.from({ length: 3 }, (_, k) => (
        <ellipse
          key={k}
          cx={cx}
          cy={h * 0.9}
          rx={64 + k * 70}
          ry={7 + k * 4}
          fill="none"
          stroke={C.lueur}
          strokeWidth="1.5"
          opacity={0.4 - k * 0.1}
        />
      ))}
    </>
  );
}

/** Le canyon : la lumière ne tombe au fond qu'une heure par jour. */
function Canyon({ w, h, ns }) {
  return (
    <>
      <ellipse cx={w * 0.5} cy={h * 0.3} rx={w * 0.2} ry={h * 0.3} fill={`url(#halo-${ns})`} />
      <path d={band(h * 0.42, h * 0.04, w, h, 2.6)} fill={C.padi} />
      {/* La chute, seule chose claire du cadre */}
      <path
        d={`M${w * 0.44} ${h * 0.28} L${w * 0.42} ${h * 0.86} L${w * 0.58} ${
          h * 0.86
        } L${w * 0.56} ${h * 0.28} Z`}
        fill={C.lueurPale}
        opacity=".82"
      />
      <path
        d={`M0 ${h * 0.08} L${w * 0.36} ${h * 0.26} L${w * 0.3} ${h} L0 ${h} Z`}
        fill={C.nuitDense}
      />
      <path
        d={`M${w} ${h * 0.04} L${w * 0.64} ${h * 0.28} L${w * 0.7} ${h} L${w} ${h} Z`}
        fill={C.nuitDense}
      />
      <path
        d={`M0 ${h * 0.08} L${w * 0.36} ${h * 0.26} L${w * 0.34} ${h * 0.34} L0 ${
          h * 0.18
        } Z`}
        fill={C.padiClair}
        opacity=".8"
      />
      <path
        d={`M${w} ${h * 0.04} L${w * 0.64} ${h * 0.28} L${w * 0.66} ${
          h * 0.36
        } L${w} ${h * 0.14} Z`}
        fill={C.padiClair}
        opacity=".8"
      />
      <rect y={h * 0.84} width={w} height={h * 0.16} fill={C.mer} />
      {Array.from({ length: 3 }, (_, k) => (
        <ellipse
          key={k}
          cx={w * 0.5}
          cy={h * 0.92}
          rx={50 + k * 66}
          ry={6 + k * 4}
          fill="none"
          stroke={C.merClaire}
          strokeWidth="2"
          opacity={0.85 - k * 0.24}
        />
      ))}
    </>
  );
}

/** Munduk : les lampes-tempête entre les caféiers, la lune au-dessus. */
function Plantation({ w, h, ns }) {
  return (
    <>
      {Array.from({ length: 52 }, (_, s) => (
        <circle
          key={s}
          cx={(s * 97) % w}
          cy={(s * 53) % Math.round(h * 0.55)}
          r={s % 5 === 0 ? 1.8 : 1}
          fill={C.clair}
          opacity={s % 3 === 0 ? 0.85 : 0.35}
        />
      ))}
      <ellipse cx={w * 0.76} cy={h * 0.2} rx={w * 0.16} ry={h * 0.24} fill={`url(#halo-${ns})`} opacity=".7" />
      <circle cx={w * 0.78} cy={h * 0.2} r={h * 0.095} fill={C.lueurPale} />
      <circle cx={w * 0.74} cy={h * 0.175} r={h * 0.088} fill={C.cielHaut} />
      <path d={band(h * 0.6, h * 0.05, w, h, 0.9)} fill={C.merProfonde} />
      <path d={band(h * 0.74, h * 0.04, w, h, 2.4)} fill={C.nuitDense} />
      {Array.from({ length: 20 }, (_, c) => (
        <path
          key={c}
          d={`M${20 + c * (w / 19)} ${h * 0.88 + (c % 3) * 12} q 13 -24 0 -44 q -13 20 0 44`}
          fill={C.nuitDense}
        />
      ))}
      <rect y={h * 0.92} width={w} height={h * 0.08} fill={C.nuitDense} />
      {/* Les lampes-tempête : chacune éclaire son morceau de sentier */}
      {[0.2, 0.44, 0.66].map((p, i) => (
        <g key={i}>
          <circle
            cx={w * p}
            cy={h * (0.86 + i * 0.02)}
            r={h * 0.07}
            fill={`url(#halo-${ns})`}
            opacity=".85"
          />
          <circle cx={w * p} cy={h * (0.86 + i * 0.02)} r="4" fill={C.lueurPale} />
        </g>
      ))}
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
  // Les dégradés vivent dans l'espace de noms global du document :
  // un identifiant par instance, sinon deux scènes se marchent dessus.
  const ns = uid ?? kind;
  const Motif = MOTIFS[kind] ?? Terraces;

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
          <stop offset="0" stopColor={C.cielHaut} />
          <stop offset="0.52" stopColor={C.cielBas} />
          <stop offset="0.82" stopColor={C.aubeChaude} />
          <stop offset="1" stopColor={C.lueur} />
        </linearGradient>
        {/* Le halo de l'astre — la lumière déborde toujours de sa source */}
        <radialGradient id={`halo-${ns}`}>
          <stop offset="0" stopColor={C.lueurPale} stopOpacity="0.85" />
          <stop offset="0.35" stopColor={C.lueur} stopOpacity="0.42" />
          <stop offset="1" stopColor={C.lueur} stopOpacity="0" />
        </radialGradient>
        {/* La brume qui monte de la vallée avant le jour */}
        <linearGradient id={`mist-${ns}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.lueurPale} stopOpacity="0.22" />
          <stop offset="1" stopColor={C.lueurPale} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width={w} height={h} fill={`url(#sky-${ns})`} />
      <Motif w={w} h={h} ns={ns} />
      <rect y={h * 0.44} width={w} height={h * 0.36} fill={`url(#mist-${ns})`} />
    </svg>
  );
}

/** Agus avant le lever du jour, le jepun derrière l'oreille. */
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
          <stop offset="0" stopColor={C.cielHaut} />
          <stop offset="0.55" stopColor={C.cielBas} />
          <stop offset="0.86" stopColor={C.aubeChaude} />
        </linearGradient>
        <radialGradient id="portrait-halo">
          <stop offset="0" stopColor={C.lueurPale} stopOpacity="0.9" />
          <stop offset="0.4" stopColor={C.lueur} stopOpacity="0.4" />
          <stop offset="1" stopColor={C.lueur} stopOpacity="0" />
        </radialGradient>
        <clipPath id="portrait-head">
          <circle cx="230" cy="318" r="76" />
        </clipPath>
      </defs>

      <rect width="460" height="560" fill="url(#portrait-sky)" />
      {/* Le jour se lève derrière lui : la silhouette est à contre-jour */}
      <ellipse cx="300" cy="300" rx="280" ry="220" fill="url(#portrait-halo)" />
      <circle cx="316" cy="248" r="58" fill={C.lueurPale} opacity=".95" />
      <path d="M0 300 Q120 262 246 302 T460 288 L460 560 L0 560 Z" fill={C.merProfonde} />
      <path d="M0 360 Q140 322 262 370 T460 358 L460 560 L0 560 Z" fill={C.padi} />
      <path d="M0 420 Q150 386 268 428 T460 416 L460 560 L0 560 Z" fill={C.nuitDense} />

      <path d="M96 560 c0-118 46-176 134-176 s134 58 134 176 z" fill={C.nuitDense} />
      <circle cx="230" cy="318" r="76" fill={C.nuitDense} />

      {/* Udeng — le bandeau cérémoniel, découpé sur le crâne */}
      <g clipPath="url(#portrait-head)">
        <rect x="150" y="242" width="160" height="44" fill={C.brique} />
        <path d="M150 286 q80 22 160 0 v-14 q-80 20 -160 0z" fill={C.briqueSombre} />
      </g>

      {/* Le liseré de lumière sur l'épaule et la joue */}
      <path
        d="M96 560 c0-118 46-176 134-176"
        fill="none"
        stroke={C.lueur}
        strokeWidth="2.5"
        opacity=".6"
      />
      <path
        d="M292 282 a76 76 0 0 1 -6 90"
        fill="none"
        stroke={C.lueur}
        strokeWidth="2.5"
        opacity=".5"
      />

      {/* Le jepun glissé derrière l'oreille */}
      <g transform="translate(306 330) scale(0.62)">
        {[0, 72, 144, 216, 288].map((a) => (
          <path
            key={a}
            transform={`rotate(${a})`}
            d="M0 2 C 13 -6, 27 -22, 19 -36 C 13 -46, -5 -47, -12 -35 C -19 -22, -9 -7, 0 2 Z"
            fill={C.clair}
          />
        ))}
        <circle r="6" fill={C.lueur} />
      </g>
    </svg>
  );
}

/**
 * Couture entre deux sections : un filet mince interrompu par un jepun.
 * Remplace le damier poleng, qui lisait comme un drapeau de course.
 */
export function Divider({ className = "" }) {
  return (
    <div
      className={`flex items-center gap-5 py-2 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-[color-mix(in_srgb,currentColor_35%,transparent)]" />
      <Jepun size={38} tone="currentColor" className="opacity-85" />
      <span className="h-px flex-1 bg-[color-mix(in_srgb,currentColor_35%,transparent)]" />
    </div>
  );
}
