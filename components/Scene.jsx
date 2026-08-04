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

/* Lumière du jour, franche mais douce. Le lagon et le jade portent les
   paysages, le soleil éclaire, le bougainvillier ne sert qu'aux détails. */
const C = {
  cielHaut: "#bfe3e4",
  cielBas: "#eaf3ea",
  cielChaud: "#fdf0d2",
  soleil: "#f2b134",
  soleilPale: "#fbe0a5",
  lagon: "#189aa4",
  lagonPale: "#7fc9cd",
  lagonProfond: "#0d6570",
  jade: "#0f6b5c",
  jadeSombre: "#084a40",
  jadeClair: "#3f9a7f",
  padi: "#7fa64a",
  padiClair: "#a8c46a",
  brique: "#b5674a",
  briqueSombre: "#8c4733",
  roche: "#5c5a52",
  rocheSombre: "#3c3a34",
  bougain: "#c8455f",
  clair: "#fbf7ee",
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
/**
 * Le jepun en bouton : contour quand il attend, plein quand il est
 * choisi. C'est la fleur du site, et « cueillir » est exactement le
 * geste qu'on fait en composant son voyage — un « + » mathématique
 * n'avait rien à dire de plus, et disait moins bien.
 *
 * Icône graphique, donc seuil de contraste 3:1 (WCAG 1.4.11) et non
 * 4,5:1 : c'est ce qui autorise un bambou plus clair que le glyphe
 * texte ne le permettait.
 */
export function JepunPuce({ size = 20, plein = false, className = "" }) {
  const petale =
    "M0 2 C 13 -6, 27 -22, 19 -36 C 13 -46, -5 -47, -12 -35 C -19 -22, -9 -7, 0 2 Z";
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill={plein ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={plein ? 0 : 7}
      strokeLinejoin="round"
    >
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} transform={`rotate(${a})`} d={petale} />
      ))}
      <circle r={plein ? 7 : 5} fill="currentColor" stroke="none" />
    </svg>
  );
}

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
      <g stroke={C.rocheSombre} fill="none" strokeLinecap="round">
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
          <circle r="7" fill={C.soleil} />
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
      <circle cx="43" cy="20" r="7" fill={C.soleil} />
      <path
        d="M30 16 c 8 -10 16 -12 22 -10 c -6 4 -10 10 -12 16 z"
        fill={C.padi}
      />
    </svg>
  );
}

/** Tedung — l'ombrelle à étages plantée devant les sanctuaires. */
function Tedung({ x, y, s = 1, tone = C.soleil }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-3 0 L3 0 L2 -74 L-2 -74 Z" fill={C.rocheSombre} />
      <path d="M-46 -74 C -30 -102, 30 -102, 46 -74 Z" fill={tone} />
      <path
        d="M-46 -74 q 11 10 15 0 q 11 10 16 0 q 11 10 15 0"
        fill={tone}
        opacity=".75"
      />
      <circle cy="-102" r="4" fill={C.rocheSombre} />
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
      <circle cx={w * 0.74} cy={h * 0.56} r={h * 0.09} fill={C.soleilPale} />
      {/* Le Gunung Agung : arêtes adoucies, jamais une pyramide */}
      <path
        d={`M${w * 0.06} ${h * 0.66}
            Q ${w * 0.26} ${h * 0.46} ${w * 0.36} ${h * 0.26}
            Q ${w * 0.4} ${h * 0.21} ${w * 0.45} ${h * 0.27}
            Q ${w * 0.56} ${h * 0.47} ${w * 0.72} ${h * 0.66} Z`}
        fill={C.jadeSombre}
      />
      <path d={band(h * 0.68, h * 0.045, w, h, 2.1)} fill={C.jade} />
      <path d={band(h * 0.78, h * 0.04, w, h, 3.3)} fill={C.padi} />
      <path d={band(h * 0.88, h * 0.03, w, h, 1.2)} fill={C.rocheSombre} />
      {/* L'eau des terrasses attrape la lueur : le subak en miroir */}
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${h * (0.9 + i * 0.028)} Q ${w * 0.5} ${
            h * (0.86 + i * 0.028)
          } ${w} ${h * (0.92 + i * 0.028)}`}
          fill="none"
          stroke={C.soleil}
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
      <circle cx={cx} cy={h * 0.42} r={h * 0.12} fill={C.soleilPale} opacity=".9" />
      <path d={band(h * 0.58, h * 0.035, w, h, 1.9)} fill={C.jadeSombre} />
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
      <Tedung x={cx - 168} y={gy} s={h / 620} tone={C.soleil} />
      <Tedung x={cx + 168} y={gy} s={h / 620} tone={C.clair} />
      {/* Le bassin, et la lueur qui s'y couche */}
      <rect y={gy} width={w} height={h - gy} fill={C.jadeSombre} />
      <rect y={gy} width={w} height={h - gy} fill={`url(#mist-${ns})`} opacity=".5" />
      {Array.from({ length: 5 }, (_, j) => (
        <path
          key={j}
          d={`M${cx - 56 + j * 28} ${gy - 4} q 3 20 0 36`}
          stroke={C.soleilPale}
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
          stroke={C.soleil}
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
        fill={C.soleilPale}
        opacity=".82"
      />
      <path
        d={`M0 ${h * 0.08} L${w * 0.36} ${h * 0.26} L${w * 0.3} ${h} L0 ${h} Z`}
        fill={C.rocheSombre}
      />
      <path
        d={`M${w} ${h * 0.04} L${w * 0.64} ${h * 0.28} L${w * 0.7} ${h} L${w} ${h} Z`}
        fill={C.rocheSombre}
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
      <rect y={h * 0.84} width={w} height={h * 0.16} fill={C.jade} />
      {Array.from({ length: 3 }, (_, k) => (
        <ellipse
          key={k}
          cx={w * 0.5}
          cy={h * 0.92}
          rx={50 + k * 66}
          ry={6 + k * 4}
          fill="none"
          stroke={C.lagon}
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
      <circle cx={w * 0.78} cy={h * 0.2} r={h * 0.095} fill={C.soleilPale} />
      <circle cx={w * 0.74} cy={h * 0.175} r={h * 0.088} fill={C.cielHaut} />
      <path d={band(h * 0.6, h * 0.05, w, h, 0.9)} fill={C.jadeSombre} />
      <path d={band(h * 0.74, h * 0.04, w, h, 2.4)} fill={C.rocheSombre} />
      {Array.from({ length: 20 }, (_, c) => (
        <path
          key={c}
          d={`M${20 + c * (w / 19)} ${h * 0.88 + (c % 3) * 12} q 13 -24 0 -44 q -13 20 0 44`}
          fill={C.rocheSombre}
        />
      ))}
      <rect y={h * 0.92} width={w} height={h * 0.08} fill={C.rocheSombre} />
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
          <circle cx={w * p} cy={h * (0.86 + i * 0.02)} r="4" fill={C.soleilPale} />
        </g>
      ))}
    </>
  );
}

/** Kawah Ijen, Java : le lac acide turquoise au lever du jour. */
function Ijen({ w, h, ns }) {
  return (
    <>
      <ellipse cx={w * 0.24} cy={h * 0.3} rx={w * 0.28} ry={h * 0.3} fill={`url(#halo-${ns})`} />
      <circle cx={w * 0.24} cy={h * 0.28} r={h * 0.08} fill={C.soleilPale} />
      {/* Les lèvres du cratère, en gradins */}
      <path
        d={`M0 ${h * 0.52} L${w * 0.2} ${h * 0.34} L${w * 0.38} ${h * 0.46}
            L${w * 0.62} ${h * 0.3} L${w * 0.82} ${h * 0.44} L${w} ${h * 0.36}
            L${w} ${h} L0 ${h} Z`}
        fill={C.roche}
      />
      {/* Le lac : la couleur qui fait venir ici */}
      <path
        d={`M${w * 0.16} ${h * 0.74} Q ${w * 0.5} ${h * 0.6} ${w * 0.86} ${h * 0.76}
            Q ${w * 0.5} ${h * 0.96} ${w * 0.16} ${h * 0.74} Z`}
        fill={C.lagon}
      />
      <path
        d={`M${w * 0.24} ${h * 0.76} Q ${w * 0.5} ${h * 0.68} ${w * 0.76} ${h * 0.78}`}
        fill="none"
        stroke={C.lagonPale}
        strokeWidth="3"
        opacity=".8"
      />
      {/* Les fumerolles de soufre */}
      {[0.34, 0.44, 0.56].map((p, i) => (
        <path
          key={i}
          d={`M${w * p} ${h * 0.7} c ${w * 0.02} ${-h * 0.12}, ${-w * 0.03} ${
            -h * 0.2
          }, ${w * 0.01} ${-h * 0.3}`}
          stroke={C.clair}
          strokeWidth={5 - i}
          opacity={0.5 - i * 0.1}
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <path
        d={`M0 ${h * 0.52} L${w * 0.2} ${h * 0.34} L${w * 0.26} ${h * 0.4} L0 ${h * 0.6} Z`}
        fill={C.rocheSombre}
      />
    </>
  );
}

/** Rinjani, Lombok : le cône, le lac Segara Anak et les terrasses. */
function Rinjani({ w, h, ns }) {
  return (
    <>
      <ellipse cx={w * 0.72} cy={h * 0.32} rx={w * 0.3} ry={h * 0.3} fill={`url(#halo-${ns})`} />
      <circle cx={w * 0.74} cy={h * 0.24} r={h * 0.075} fill={C.soleilPale} />
      {/* Le grand cône, tronqué par la caldeira */}
      <path
        d={`M${w * 0.04} ${h * 0.72}
            Q ${w * 0.26} ${h * 0.42} ${w * 0.38} ${h * 0.16}
            L${w * 0.5} ${h * 0.2} L${w * 0.56} ${h * 0.14}
            Q ${w * 0.74} ${h * 0.44} ${w * 0.96} ${h * 0.72} Z`}
        fill={C.jadeSombre}
      />
      <path
        d={`M${w * 0.38} ${h * 0.16} L${w * 0.5} ${h * 0.2} L${w * 0.56} ${h * 0.14}
            L${w * 0.5} ${h * 0.1} Z`}
        fill={C.rocheSombre}
      />
      {/* Segara Anak, le lac en croissant dans la caldeira */}
      <path
        d={`M${w * 0.3} ${h * 0.7} Q ${w * 0.5} ${h * 0.62} ${w * 0.7} ${h * 0.71}
            Q ${w * 0.5} ${h * 0.82} ${w * 0.3} ${h * 0.7} Z`}
        fill={C.lagon}
      />
      <path d={band(h * 0.82, h * 0.035, w, h, 1.4)} fill={C.padi} />
      <path d={band(h * 0.92, h * 0.025, w, h, 2.8)} fill={C.padiClair} />
    </>
  );
}

/** Padar, Komodo : les trois baies vues depuis la crête. */
function Komodo({ w, h, ns }) {
  return (
    <>
      <ellipse cx={w * 0.5} cy={h * 0.24} rx={w * 0.4} ry={h * 0.26} fill={`url(#halo-${ns})`} />
      <circle cx={w * 0.5} cy={h * 0.2} r={h * 0.07} fill={C.soleilPale} />
      {/* La mer entre les caps */}
      <rect y={h * 0.5} width={w} height={h * 0.5} fill={C.lagon} />
      {/* Trois presqu'îles, celles de la vue de Padar */}
      <path
        d={`M${-w * 0.05} ${h} Q ${w * 0.1} ${h * 0.52} ${w * 0.3} ${h * 0.6}
            Q ${w * 0.42} ${h * 0.66} ${w * 0.36} ${h} Z`}
        fill={C.padi}
      />
      <path
        d={`M${w * 0.34} ${h} Q ${w * 0.46} ${h * 0.46} ${w * 0.62} ${h * 0.54}
            Q ${w * 0.72} ${h * 0.6} ${w * 0.68} ${h} Z`}
        fill={C.jade}
      />
      <path
        d={`M${w * 0.66} ${h} Q ${w * 0.8} ${h * 0.54} ${w * 1.05} ${h * 0.62}
            L${w * 1.05} ${h} Z`}
        fill={C.jadeSombre}
      />
      {/* Le liseré de plage, dont l'une est rose */}
      <path
        d={`M${w * 0.3} ${h * 0.6} Q ${w * 0.42} ${h * 0.66} ${w * 0.36} ${h * 0.74}`}
        fill="none"
        stroke={C.bougain}
        strokeWidth="5"
        opacity=".55"
        strokeLinecap="round"
      />
      <path
        d={`M${w * 0.62} ${h * 0.54} Q ${w * 0.72} ${h * 0.6} ${w * 0.69} ${h * 0.68}`}
        fill="none"
        stroke={C.clair}
        strokeWidth="4"
        opacity=".7"
        strokeLinecap="round"
      />
      {/* Un pinisi au mouillage */}
      <g transform={`translate(${w * 0.5} ${h * 0.9})`}>
        <path d="M-26 0 L26 0 L18 9 L-18 9 Z" fill={C.rocheSombre} />
        <path d="M-2 0 L-2 -30 L14 -6 Z" fill={C.clair} />
      </g>
    </>
  );
}

/** Kelimutu, Flores : les trois lacs de cratère, chacun de sa couleur. */
function Kelimutu({ w, h, ns }) {
  const lacs = [
    { cx: 0.24, cy: 0.72, rx: 0.13, ry: 0.06, fill: C.lagon },
    { cx: 0.52, cy: 0.66, rx: 0.15, ry: 0.07, fill: C.jade },
    { cx: 0.8, cy: 0.74, rx: 0.12, ry: 0.055, fill: C.brique },
  ];
  return (
    <>
      <ellipse cx={w * 0.5} cy={h * 0.26} rx={w * 0.36} ry={h * 0.28} fill={`url(#halo-${ns})`} />
      <circle cx={w * 0.5} cy={h * 0.22} r={h * 0.07} fill={C.soleilPale} />
      {/* Les crêtes du massif, en trois plans */}
      <path d={band(h * 0.46, h * 0.05, w, h, 1.1)} fill={C.jadeSombre} />
      <path
        d={`M0 ${h * 0.62} L${w * 0.18} ${h * 0.5} L${w * 0.4} ${h * 0.58}
            L${w * 0.6} ${h * 0.48} L${w * 0.82} ${h * 0.58} L${w} ${h * 0.52}
            L${w} ${h} L0 ${h} Z`}
        fill={C.roche}
      />
      {/* Les trois lacs — c'est leur couleur qui fait monter les gens */}
      {lacs.map((l, i) => (
        <g key={i}>
          <ellipse
            cx={w * l.cx}
            cy={h * l.cy}
            rx={w * l.rx}
            ry={h * l.ry}
            fill={C.rocheSombre}
          />
          <ellipse
            cx={w * l.cx}
            cy={h * l.cy}
            rx={w * l.rx * 0.86}
            ry={h * l.ry * 0.8}
            fill={l.fill}
          />
        </g>
      ))}
    </>
  );
}

/** Wayang kulit — l'écran éclairé, la lampe, et l'ombre du puppet. */
function Wayang({ w, h, ns }) {
  return (
    <>
      {/* La nuit du pavillon, et l'écran de coton tendu */}
      <rect width={w} height={h} fill={C.rocheSombre} />
      <ellipse cx={w * 0.5} cy={h * 0.5} rx={w * 0.42} ry={h * 0.42} fill={`url(#halo-${ns})`} />
      <rect
        x={w * 0.12}
        y={h * 0.14}
        width={w * 0.76}
        height={h * 0.62}
        rx="6"
        fill={C.soleilPale}
      />
      <rect
        x={w * 0.12}
        y={h * 0.14}
        width={w * 0.76}
        height={h * 0.62}
        rx="6"
        fill="none"
        stroke={C.brique}
        strokeWidth="6"
      />
      {/* La marionnette découpée, bras articulé tendu vers le haut */}
      <g fill={C.rocheSombre} transform={`translate(${w * 0.46} ${h * 0.7})`}>
        <path d="M0 0 c -10 -22, -6 -46, 6 -62 c 10 -14, 26 -18, 34 -10 c -14 4, -22 16, -24 30 c -2 16, 2 30, 6 42 z" />
        <path d="M40 -72 c 10 -8, 14 -22, 8 -32 c -8 -12, -26 -10, -30 2 c -4 12, 6 24, 22 30 z" />
        <path d="M44 -104 l 16 -20 l 6 8 l -14 18 z" />
        <path d="M18 -50 c 18 -6, 34 -22, 40 -42 l 7 4 c -6 24, -24 42, -45 48 z" />
      </g>
      {/* La lampe à huile qui projette tout ça */}
      <circle cx={w * 0.5} cy={h * 0.86} r={h * 0.06} fill={`url(#halo-${ns})`} />
      <path
        d={`M${w * 0.47} ${h * 0.9} l${w * 0.06} 0 l${-w * 0.01} ${h * 0.05} l${-w * 0.04} 0 z`}
        fill={C.brique}
      />
      <circle cx={w * 0.5} cy={h * 0.87} r="5" fill={C.soleil} />
    </>
  );
}

/** Lovina à 5 h 45 : le bateau à balancier et les dauphins. */
function Dauphins({ w, h, ns }) {
  return (
    <>
      <ellipse cx={w * 0.3} cy={h * 0.5} rx={w * 0.36} ry={h * 0.34} fill={`url(#halo-${ns})`} />
      <circle cx={w * 0.3} cy={h * 0.5} r={h * 0.1} fill={C.soleil} />
      {/* La mer, et la traînée de lumière du soleil levant */}
      <rect y={h * 0.56} width={w} height={h * 0.44} fill={C.lagon} />
      <path
        d={`M${w * 0.3} ${h * 0.56} L${w * 0.2} ${h} L${w * 0.42} ${h} Z`}
        fill={C.soleilPale}
        opacity=".5"
      />
      {Array.from({ length: 5 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${h * (0.64 + i * 0.07)} Q ${w * 0.5} ${h * (0.61 + i * 0.07)} ${w} ${h * (0.65 + i * 0.07)}`}
          fill="none"
          stroke={C.lagonPale}
          strokeWidth="2"
          opacity={0.5 - i * 0.07}
        />
      ))}
      {/* Deux dauphins qui sortent, et le jukung avec son balancier */}
      {[
        { x: 0.6, y: 0.7, s: 1 },
        { x: 0.74, y: 0.79, s: 0.7 },
      ].map((d, i) => (
        <path
          key={i}
          transform={`translate(${w * d.x} ${h * d.y}) scale(${d.s})`}
          d="M0 0 c 10 -16, 30 -26, 48 -22 c -12 -6, -8 -16, 2 -18 c -14 -4, -28 2, -36 12 c -8 10, -12 20, -14 28 z"
          fill={C.rocheSombre}
        />
      ))}
      <g transform={`translate(${w * 0.2} ${h * 0.82})`}>
        <path d="M-40 0 L40 0 L30 12 L-30 12 Z" fill={C.rocheSombre} />
        <path d="M-2 0 L-2 -44 L26 -8 Z" fill={C.clair} />
        <path d="M-46 6 L46 6" stroke={C.rocheSombre} strokeWidth="3" />
        <path d="M-30 0 L-46 6 M30 0 L46 6" stroke={C.rocheSombre} strokeWidth="2.5" />
      </g>
    </>
  );
}

const MOTIFS = {
  terraces: Terraces,
  canyon: Canyon,
  spring: Spring,
  plantation: Plantation,
  ijen: Ijen,
  rinjani: Rinjani,
  komodo: Komodo,
  kelimutu: Kelimutu,
  wayang: Wayang,
  dauphins: Dauphins,
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
          <stop offset="0.55" stopColor={C.cielBas} />
          <stop offset="1" stopColor={C.cielChaud} />
        </linearGradient>
        {/* Le halo du soleil : la lumière déborde toujours de sa source */}
        <radialGradient id={`halo-${ns}`}>
          <stop offset="0" stopColor={C.soleilPale} stopOpacity="0.9" />
          <stop offset="0.4" stopColor={C.soleil} stopOpacity="0.28" />
          <stop offset="1" stopColor={C.soleil} stopOpacity="0" />
        </radialGradient>
        {/* La brume de vallée, celle du petit matin */}
        <linearGradient id={`mist-${ns}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.clair} stopOpacity="0.4" />
          <stop offset="1" stopColor={C.clair} stopOpacity="0" />
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
          <stop offset="0.86" stopColor={C.cielChaud} />
        </linearGradient>
        <radialGradient id="portrait-halo">
          <stop offset="0" stopColor={C.soleilPale} stopOpacity="0.9" />
          <stop offset="0.4" stopColor={C.soleil} stopOpacity="0.4" />
          <stop offset="1" stopColor={C.soleil} stopOpacity="0" />
        </radialGradient>
        <clipPath id="portrait-head">
          <circle cx="230" cy="318" r="76" />
        </clipPath>
      </defs>

      <rect width="460" height="560" fill="url(#portrait-sky)" />
      {/* Le jour se lève derrière lui : la silhouette est à contre-jour */}
      <ellipse cx="300" cy="300" rx="280" ry="220" fill="url(#portrait-halo)" />
      <circle cx="316" cy="248" r="58" fill={C.soleilPale} opacity=".95" />
      <path d="M0 300 Q120 262 246 302 T460 288 L460 560 L0 560 Z" fill={C.jadeSombre} />
      <path d="M0 360 Q140 322 262 370 T460 358 L460 560 L0 560 Z" fill={C.padi} />
      <path d="M0 420 Q150 386 268 428 T460 416 L460 560 L0 560 Z" fill={C.rocheSombre} />

      <path d="M96 560 c0-118 46-176 134-176 s134 58 134 176 z" fill={C.rocheSombre} />
      <circle cx="230" cy="318" r="76" fill={C.rocheSombre} />

      {/* Udeng — le bandeau cérémoniel, découpé sur le crâne */}
      <g clipPath="url(#portrait-head)">
        <rect x="150" y="242" width="160" height="44" fill={C.brique} />
        <path d="M150 286 q80 22 160 0 v-14 q-80 20 -160 0z" fill={C.briqueSombre} />
      </g>

      {/* Le liseré de lumière sur l'épaule et la joue */}
      <path
        d="M96 560 c0-118 46-176 134-176"
        fill="none"
        stroke={C.soleil}
        strokeWidth="2.5"
        opacity=".6"
      />
      <path
        d="M292 282 a76 76 0 0 1 -6 90"
        fill="none"
        stroke={C.soleil}
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
        <circle r="6" fill={C.soleil} />
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
