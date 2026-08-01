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

const C = {
  sky: "#cfdfd9",
  skyWarm: "#f3e5cd",
  sun: "#dfa441",
  sunPale: "#eec97f",
  sea: "#0f4d59",
  seaDeep: "#08333c",
  seaMid: "#2e7b83",
  padi: "#7d9152",
  padiMid: "#647a44",
  padiDeep: "#4f6438",
  brick: "#a05a41",
  brickDeep: "#7d4230",
  teck: "#322b22",
  stone: "#f7f2e8",
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
      <g stroke={C.teck} fill="none" strokeLinecap="round">
        <path d="M280 4 C 226 22, 178 54, 150 96" strokeWidth="7" />
        <path d="M186 62 C 150 74, 120 104, 100 146" strokeWidth="5" />
        <path d="M212 34 C 178 34, 120 44, 66 74" strokeWidth="4" />
      </g>
      <g fill={C.padiDeep}>
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
            <path key={a} transform={`rotate(${a})`} d={petal} fill={C.stone} />
          ))}
          <circle r="7" fill={C.sun} />
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
      <circle cx="18" cy="20" r="7" fill={C.stone} />
      <circle cx="30" cy="16" r="8" fill="#b8654a" />
      <circle cx="43" cy="20" r="7" fill={C.sun} />
      <path
        d="M30 16 c 8 -10 16 -12 22 -10 c -6 4 -10 10 -12 16 z"
        fill={C.padi}
      />
    </svg>
  );
}

/** Tedung — l'ombrelle à étages plantée devant les sanctuaires. */
function Tedung({ x, y, s = 1, tone = C.sun }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-3 0 L3 0 L2 -74 L-2 -74 Z" fill={C.teck} />
      <path d="M-46 -74 C -30 -102, 30 -102, 46 -74 Z" fill={tone} />
      <path
        d="M-46 -74 q 11 10 15 0 q 11 10 16 0 q 11 10 15 0"
        fill={tone}
        opacity=".75"
      />
      <circle cy="-102" r="4" fill={C.teck} />
    </g>
  );
}

/* ================= Paysages ================= */

/** Sidemen : les terrasses irriguées par le subak, sous l'Agung. */
function Terraces({ w, h }) {
  return (
    <>
      <circle cx={w * 0.76} cy={h * 0.32} r={h * 0.15} fill={C.sun} opacity=".9" />
      {/* Le Gunung Agung : arêtes adoucies, jamais une pyramide */}
      <path
        d={`M${w * 0.06} ${h * 0.63}
            Q ${w * 0.26} ${h * 0.44} ${w * 0.36} ${h * 0.24}
            Q ${w * 0.4} ${h * 0.19} ${w * 0.45} ${h * 0.25}
            Q ${w * 0.56} ${h * 0.45} ${w * 0.72} ${h * 0.63} Z`}
        fill={C.sea}
        opacity=".45"
      />
      <path d={band(h * 0.6, h * 0.05, w, h, 0.4)} fill={C.seaMid} opacity=".5" />
      <path d={band(h * 0.68, h * 0.045, w, h, 2.1)} fill={C.padiDeep} />
      <path d={band(h * 0.78, h * 0.04, w, h, 3.3)} fill={C.padiMid} />
      <path d={band(h * 0.88, h * 0.03, w, h, 1.2)} fill={C.padi} />
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${h * (0.9 + i * 0.028)} Q ${w * 0.5} ${
            h * (0.86 + i * 0.028)
          } ${w} ${h * (0.92 + i * 0.028)}`}
          fill="none"
          stroke={C.stone}
          strokeWidth="1.5"
          opacity="0.28"
        />
      ))}
    </>
  );
}

/** La source sacrée : candi bentar de brique et ombrelles de temple. */
function Spring({ w, h }) {
  const cx = w * 0.5;
  const gy = h * 0.68;
  return (
    <>
      <circle cx={cx} cy={h * 0.3} r={h * 0.19} fill={C.sunPale} opacity=".8" />
      <path d={band(h * 0.58, h * 0.035, w, h, 1.9)} fill={C.padiDeep} />
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
            fill={C.brick}
          />
          <path
            d={`M${cx + side * 62} ${gy - h * 0.48} L${cx + side * 24} ${
              gy - h * 0.46
            } L${cx + side * 26} ${gy - h * 0.4} L${cx + side * 64} ${
              gy - h * 0.42
            } Z`}
            fill={C.brickDeep}
          />
          {/* Les assises de brique : c'est ce qui rend le gradin lisible */}
          {[0.09, 0.19, 0.31, 0.42].map((t) => (
            <path
              key={t}
              d={`M${cx + side * (126 - t * 150)} ${gy - h * t} L${
                cx + side * (30 - t * 12)
              } ${gy - h * t}`}
              stroke={C.brickDeep}
              strokeWidth={Math.max(1.5, h * 0.008)}
              opacity=".55"
            />
          ))}
        </g>
      ))}
      <Tedung x={cx - 168} y={gy} s={h / 620} />
      <Tedung x={cx + 168} y={gy} s={h / 620} tone={C.stone} />
      <rect y={gy} width={w} height={h - gy} fill={C.sea} />
      {Array.from({ length: 5 }, (_, j) => (
        <path
          key={j}
          d={`M${cx - 56 + j * 28} ${gy - 4} q 3 20 0 36`}
          stroke={C.stone}
          strokeWidth="3.5"
          opacity=".8"
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
          stroke={C.stone}
          strokeWidth="1.5"
          opacity={0.36 - k * 0.09}
        />
      ))}
    </>
  );
}

/** Le canyon des cascades oubliées. */
function Canyon({ w, h }) {
  return (
    <>
      <circle cx={w * 0.5} cy={h * 0.13} r={h * 0.09} fill={C.sunPale} opacity=".7" />
      <path d={band(h * 0.4, h * 0.04, w, h, 2.6)} fill={C.padiDeep} />
      <path
        d={`M${w * 0.44} ${h * 0.3} L${w * 0.42} ${h * 0.86} L${w * 0.58} ${
          h * 0.86
        } L${w * 0.56} ${h * 0.3} Z`}
        fill={C.stone}
        opacity=".92"
      />
      <path
        d={`M0 ${h * 0.1} L${w * 0.36} ${h * 0.26} L${w * 0.3} ${h} L0 ${h} Z`}
        fill={C.teck}
      />
      <path
        d={`M${w} ${h * 0.06} L${w * 0.64} ${h * 0.28} L${w * 0.7} ${h} L${w} ${h} Z`}
        fill={C.teck}
      />
      <path
        d={`M0 ${h * 0.1} L${w * 0.36} ${h * 0.26} L${w * 0.34} ${h * 0.34} L0 ${
          h * 0.2
        } Z`}
        fill={C.padi}
      />
      <path
        d={`M${w} ${h * 0.06} L${w * 0.64} ${h * 0.28} L${w * 0.66} ${
          h * 0.36
        } L${w} ${h * 0.16} Z`}
        fill={C.padi}
      />
      <rect y={h * 0.84} width={w} height={h * 0.16} fill={C.sea} />
      {Array.from({ length: 3 }, (_, k) => (
        <ellipse
          key={k}
          cx={w * 0.5}
          cy={h * 0.92}
          rx={50 + k * 66}
          ry={6 + k * 4}
          fill="none"
          stroke={C.seaMid}
          strokeWidth="2"
          opacity={0.7 - k * 0.2}
        />
      ))}
    </>
  );
}

/** Munduk : la nuit dans les plantations de café. */
function Plantation({ w, h }) {
  return (
    <>
      {Array.from({ length: 46 }, (_, s) => (
        <circle
          key={s}
          cx={(s * 97) % w}
          cy={(s * 53) % Math.round(h * 0.5)}
          r={s % 5 === 0 ? 1.8 : 1}
          fill={C.stone}
          opacity={s % 3 === 0 ? 0.8 : 0.35}
        />
      ))}
      <circle cx={w * 0.78} cy={h * 0.2} r={h * 0.095} fill={C.sunPale} />
      <circle cx={w * 0.74} cy={h * 0.175} r={h * 0.088} fill={C.seaDeep} />
      <path d={band(h * 0.58, h * 0.05, w, h, 0.9)} fill={C.sea} />
      <path d={band(h * 0.72, h * 0.04, w, h, 2.4)} fill={C.seaDeep} />
      {Array.from({ length: 20 }, (_, c) => (
        <path
          key={c}
          d={`M${20 + c * (w / 19)} ${h * 0.86 + (c % 3) * 14} q 13 -24 0 -44 q -13 20 0 44`}
          fill={C.teck}
        />
      ))}
      <rect y={h * 0.9} width={w} height={h * 0.1} fill={C.teck} />
      {/* Lampes-tempête le long du sentier */}
      {[0.22, 0.42, 0.62].map((p, i) => (
        <circle
          key={i}
          cx={w * p}
          cy={h * (0.88 + i * 0.01)}
          r="3.5"
          fill={C.sun}
        />
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

const NIGHT = new Set(["plantation"]);

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
  const night = NIGHT.has(kind);

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
              <stop offset="0" stopColor="#041a1f" />
              <stop offset="1" stopColor="#0f4d59" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor={C.sky} />
              <stop offset="0.6" stopColor={C.skyWarm} />
              <stop offset="1" stopColor="#f0dcb8" />
            </>
          )}
        </linearGradient>
        {/* Brume de vallée — la douceur du matin, pas le grain d'affiche */}
        <linearGradient id={`mist-${ns}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.stone} stopOpacity="0.34" />
          <stop offset="1" stopColor={C.stone} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width={w} height={h} fill={`url(#sky-${ns})`} />
      <Motif w={w} h={h} />
      <rect
        y={h * 0.42}
        width={w}
        height={h * 0.34}
        fill={`url(#mist-${ns})`}
        opacity={night ? 0.35 : 1}
      />
    </svg>
  );
}

/** Portrait illustré d'Agus — le jepun derrière l'oreille, comme au temple. */
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
          <stop offset="0" stopColor={C.sky} />
          <stop offset="0.72" stopColor={C.skyWarm} />
        </linearGradient>
        <clipPath id="portrait-head">
          <circle cx="230" cy="318" r="76" />
        </clipPath>
      </defs>

      <rect width="460" height="560" fill="url(#portrait-sky)" />
      <circle cx="356" cy="126" r="64" fill={C.sun} opacity=".85" />
      <path
        d="M0 276 Q120 234 246 276 T460 262 L460 560 L0 560 Z"
        fill={C.sea}
        opacity=".5"
      />
      <path
        d="M0 336 Q140 296 262 346 T460 334 L460 560 L0 560 Z"
        fill={C.padiDeep}
      />
      <path d="M0 398 Q150 362 268 406 T460 394 L460 560 L0 560 Z" fill={C.padi} />

      {/* Silhouette */}
      <path d="M96 560 c0-118 46-176 134-176 s134 58 134 176 z" fill={C.teck} />
      <circle cx="230" cy="318" r="76" fill={C.teck} />

      {/* Udeng — le bandeau cérémoniel, découpé sur le crâne */}
      <g clipPath="url(#portrait-head)">
        <rect x="150" y="242" width="160" height="44" fill={C.brick} />
        <path d="M150 286 q80 22 160 0 v-14 q-80 20 -160 0z" fill={C.brickDeep} />
      </g>

      {/* Le jepun glissé derrière l'oreille */}
      <g transform="translate(306 330) scale(0.62)">
        {[0, 72, 144, 216, 288].map((a) => (
          <path
            key={a}
            transform={`rotate(${a})`}
            d="M0 2 C 13 -6, 27 -22, 19 -36 C 13 -46, -5 -47, -12 -35 C -19 -22, -9 -7, 0 2 Z"
            fill={C.stone}
          />
        ))}
        <circle r="6" fill={C.sun} />
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
