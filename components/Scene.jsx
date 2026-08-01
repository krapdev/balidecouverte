/**
 * Scènes de Bali en aplats sérigraphiés — rizières de Sidemen, source
 * sacrée, canyon, plantation de nuit. Formes pleines, couleurs franches,
 * trame de points : le vocabulaire de l'affiche imprimée, pas de la photo
 * retouchée. Aucune dépendance externe, rendu identique partout.
 *
 * Pour passer en production : remplacer <Scene> par <Image> (next/image)
 * dans Hero.jsx et ExperienceCard.jsx — les proportions sont déjà posées.
 */

const C = {
  sky: "#a9d4dc",
  skyWarm: "#fbe3b4",
  sun: "#f0a91c",
  sunPale: "#ffd166",
  sea: "#0b4f63",
  seaDeep: "#063342",
  seaMid: "#12707f",
  padi: "#8ba626",
  padiMid: "#6f8f22",
  padiDeep: "#4a6b1f",
  brick: "#a8442a",
  brickDeep: "#7e3220",
  lava: "#14232a",
  sand: "#faf1e2",
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

function Palm({ x, y, s = 1, flip = false }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      fill={C.lava}
    >
      <path d="M0 0 C -4 -40, -6 -80, -2 -118 L6 -118 C 8 -80, 6 -40, 8 0 Z" />
      {[
        "M2 -116 C -30 -132, -58 -128, -76 -110 C -50 -118, -22 -114, 0 -104 Z",
        "M4 -118 C -14 -150, -40 -164, -66 -162 C -40 -152, -18 -136, 2 -110 Z",
        "M6 -118 C 6 -152, 22 -174, 48 -180 C 30 -162, 18 -140, 12 -110 Z",
        "M8 -116 C 34 -130, 62 -126, 80 -108 C 54 -116, 26 -112, 8 -104 Z",
        "M6 -114 C 30 -104, 46 -88, 52 -68 C 36 -88, 18 -100, 4 -104 Z",
      ].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
}

/* ---------------- Rizières de Sidemen, fin de journée ---------------- */
function Terraces({ w, h }) {
  return (
    <>
      <circle cx={w * 0.74} cy={h * 0.34} r={h * 0.19} fill={C.sun} />
      {/* Le Gunung Agung, sommet tronqué par le cratère */}
      <path
        d={`M${w * 0.06} ${h * 0.62} L${w * 0.36} ${h * 0.2} L${w * 0.44} ${
          h * 0.2
        } L${w * 0.72} ${h * 0.62} Z`}
        fill={C.sea}
      />
      <path d={band(h * 0.6, h * 0.05, w, h, 0.4)} fill={C.seaMid} />
      <path d={band(h * 0.68, h * 0.045, w, h, 2.1)} fill={C.padiDeep} />
      <path d={band(h * 0.78, h * 0.04, w, h, 3.3)} fill={C.padiMid} />
      <path d={band(h * 0.88, h * 0.03, w, h, 1.2)} fill={C.padi} />
      {/* Courbes de niveau des terrasses */}
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${h * (0.9 + i * 0.028)} Q ${w * 0.5} ${
            h * (0.86 + i * 0.028)
          } ${w} ${h * (0.92 + i * 0.028)}`}
          fill="none"
          stroke={C.sand}
          strokeWidth="2"
          opacity="0.32"
        />
      ))}
      <Palm x={w * 0.14} y={h} s={h / 420} />
      <Palm x={w * 0.93} y={h * 1.02} s={h / 520} flip />
    </>
  );
}

/* ---------------- Source sacrée : le candi bentar ---------------- */
function Spring({ w, h }) {
  const cx = w * 0.5;
  const gy = h * 0.66;
  return (
    <>
      <circle cx={cx} cy={h * 0.3} r={h * 0.21} fill={C.sunPale} />
      <path d={band(h * 0.56, h * 0.035, w, h, 1.9)} fill={C.padiDeep} />
      {/* Portail fendu, en brique, avec ses épaulements en gradins */}
      {[-1, 1].map((side) => (
        <g key={side}>
          <path
            d={`M${cx + side * 128} ${gy}
                L${cx + side * 112} ${gy - h * 0.11}
                L${cx + side * 98} ${gy - h * 0.15}
                L${cx + side * 88} ${gy - h * 0.29}
                L${cx + side * 72} ${gy - h * 0.34}
                L${cx + side * 64} ${gy - h * 0.5}
                L${cx + side * 24} ${gy - h * 0.48}
                L${cx + side * 30} ${gy} Z`}
            fill={C.brick}
          />
          <path
            d={`M${cx + side * 64} ${gy - h * 0.5} L${cx + side * 24} ${
              gy - h * 0.48
            } L${cx + side * 26} ${gy - h * 0.42} L${cx + side * 66} ${
              gy - h * 0.44
            } Z`}
            fill={C.brickDeep}
          />
        </g>
      ))}
      {/* Bassin */}
      <rect y={gy} width={w} height={h - gy} fill={C.sea} />
      {/* Jets des gargouilles */}
      {Array.from({ length: 5 }, (_, j) => (
        <path
          key={j}
          d={`M${cx - 56 + j * 28} ${gy - 4} q 3 22 0 40`}
          stroke={C.sand}
          strokeWidth="4"
          opacity=".85"
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
          stroke={C.sand}
          strokeWidth="2"
          opacity={0.42 - k * 0.11}
        />
      ))}
    </>
  );
}

/* ---------------- Canyon des cascades oubliées ---------------- */
function Canyon({ w, h }) {
  return (
    <>
      <circle cx={w * 0.5} cy={h * 0.14} r={h * 0.1} fill={C.sunPale} />
      <path d={band(h * 0.4, h * 0.04, w, h, 2.6)} fill={C.padiDeep} />
      {/* Chute */}
      <path
        d={`M${w * 0.44} ${h * 0.3} L${w * 0.42} ${h * 0.86} L${w * 0.58} ${
          h * 0.86
        } L${w * 0.56} ${h * 0.3} Z`}
        fill={C.sand}
      />
      {/* Parois qui se referment */}
      <path
        d={`M0 ${h * 0.1} L${w * 0.36} ${h * 0.26} L${w * 0.3} ${h} L0 ${h} Z`}
        fill={C.lava}
      />
      <path
        d={`M${w} ${h * 0.06} L${w * 0.64} ${h * 0.28} L${w * 0.7} ${h} L${w} ${h} Z`}
        fill={C.lava}
      />
      {/* Végétation accrochée aux rebords */}
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
      {/* Vasque */}
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
          strokeWidth="3"
          opacity={0.8 - k * 0.22}
        />
      ))}
    </>
  );
}

/* ---------------- Munduk, nuit dans les plantations ---------------- */
function Plantation({ w, h }) {
  return (
    <>
      {Array.from({ length: 46 }, (_, s) => (
        <circle
          key={s}
          cx={(s * 97) % w}
          cy={(s * 53) % Math.round(h * 0.5)}
          r={s % 5 === 0 ? 2 : 1.2}
          fill={C.sand}
          opacity={s % 3 === 0 ? 0.9 : 0.45}
        />
      ))}
      {/* Lune en croissant */}
      <circle cx={w * 0.78} cy={h * 0.2} r={h * 0.1} fill={C.sun} />
      <circle
        cx={w * 0.74}
        cy={h * 0.175}
        r={h * 0.092}
        fill={C.seaDeep}
      />
      <path d={band(h * 0.58, h * 0.05, w, h, 0.9)} fill={C.sea} />
      <path d={band(h * 0.72, h * 0.04, w, h, 2.4)} fill={C.seaDeep} />
      {/* Rangées de caféiers */}
      {Array.from({ length: 20 }, (_, c) => (
        <path
          key={c}
          d={`M${20 + c * (w / 19)} ${h * 0.86 + (c % 3) * 14} q 13 -24 0 -44 q -13 20 0 44`}
          fill={C.lava}
        />
      ))}
      <rect y={h * 0.9} width={w} height={h * 0.1} fill={C.lava} />
      {/* Lampes-tempête le long du sentier */}
      {[0.22, 0.42, 0.62].map((p, i) => (
        <circle
          key={i}
          cx={w * p}
          cy={h * (0.88 + i * 0.01)}
          r="4"
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
  // Les dégradés et motifs vivent dans l'espace de noms global du document :
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
              <stop offset="0" stopColor="#03141a" />
              <stop offset="1" stopColor="#0b4f63" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor={C.sky} />
              <stop offset="0.62" stopColor={C.skyWarm} />
              <stop offset="1" stopColor="#f8cf86" />
            </>
          )}
        </linearGradient>
        {/* Trame de points : le grain de l'impression sérigraphiée */}
        <pattern
          id={`dots-${ns}`}
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="1.5" fill={night ? C.sand : C.sun} />
        </pattern>
      </defs>

      <rect width={w} height={h} fill={`url(#sky-${ns})`} />
      <rect
        width={w}
        height={h * 0.62}
        fill={`url(#dots-${ns})`}
        opacity={night ? 0.07 : 0.22}
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
          <stop offset="0" stopColor={C.sky} />
          <stop offset="0.7" stopColor={C.skyWarm} />
        </linearGradient>
        <clipPath id="portrait-head">
          <circle cx="230" cy="318" r="76" />
        </clipPath>
      </defs>

      <rect width="460" height="560" fill="url(#portrait-sky)" />
      <circle cx="352" cy="128" r="72" fill={C.sun} />
      <path d="M0 268 Q120 226 246 268 T460 254 L460 560 L0 560 Z" fill={C.sea} />
      <path
        d="M0 330 Q140 290 262 340 T460 328 L460 560 L0 560 Z"
        fill={C.padiDeep}
      />
      <path
        d="M0 392 Q150 356 268 400 T460 388 L460 560 L0 560 Z"
        fill={C.padi}
      />

      {/* Silhouette */}
      <path d="M96 560 c0-118 46-176 134-176 s134 58 134 176 z" fill={C.lava} />
      <circle cx="230" cy="318" r="76" fill={C.lava} />

      {/* Udeng — le jaune cérémoniel, découpé sur le crâne */}
      <g clipPath="url(#portrait-head)">
        <rect x="150" y="240" width="160" height="46" fill={C.sun} />
        <path d="M150 286 q80 22 160 0 v-14 q-80 20 -160 0z" fill="#d18f12" />
      </g>

      {/* Poleng au bas du cadre : l'équilibre des contraires */}
      {Array.from({ length: 20 }, (_, i) => (
        <rect
          key={i}
          x={i * 23}
          y="536"
          width="23"
          height="24"
          fill={i % 2 ? "#f7f2e6" : C.lava}
        />
      ))}
    </svg>
  );
}

/** Couture entre deux grandes sections. */
export function Poleng({ className = "" }) {
  return <div className={`poleng ${className}`} aria-hidden="true" />;
}
