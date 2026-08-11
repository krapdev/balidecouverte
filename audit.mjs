import { chromium } from "playwright";

const EXE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const APP = process.env.APP || "http://127.0.0.1:3213";
const PROTO = "file:///home/user/balidecouverte/design/prototype.html";
const ROUTES = ["/", "/agus", "/circuit", "/envies", "/tarifs", "/livre-d-or", "/cgv", "/mentions-legales"];
const VUES = ["home", "circuit", "envies", "portrait", "tarifs", "livre"];
const TAILLES = [[1280, 900], [390, 844], [320, 700]];

/* Décodage par canvas : color-mix() se sérialise tantôt en color(srgb …),
   tantôt en oklab(…), et les parser à la main a produit 24 échecs
   fantômes en une passe. On peint sur un canvas 1 × 1 et on relit les
   octets — et on compose les couches translucides. */
const OUTILS = `
window.__rgba = (css) => {
  const c = document.createElement("canvas"); c.width = c.height = 1;
  const x = c.getContext("2d", { willReadFrequently: true });
  x.clearRect(0,0,1,1); x.fillStyle = css; x.fillRect(0,0,1,1);
  const d = x.getImageData(0,0,1,1).data;
  return [d[0], d[1], d[2], d[3]/255];
};
window.__sur = (h, b) => [0,1,2].map(i => Math.round(h[i]*h[3] + b[i]*(1-h[3]))).concat([1]);
window.__fond = (el) => {
  const pile = [];
  for (let n = el; n; n = n.parentElement) {
    const c = window.__rgba(getComputedStyle(n).backgroundColor);
    if (c[3] === 0) continue;
    pile.push(c);
    if (c[3] === 1) break;
  }
  let out = pile.length && pile[pile.length-1][3] === 1 ? pile.pop() : [255,255,255,1];
  while (pile.length) out = window.__sur(pile.pop(), out);
  return out;
};
window.__lum = (c) => {
  const f = c.slice(0,3).map(v => { v/=255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); });
  return 0.2126*f[0] + 0.7152*f[1] + 0.0722*f[2];
};
window.__ratio = (a, b) => {
  const l1 = window.__lum(a), l2 = window.__lum(b);
  return (Math.max(l1,l2) + 0.05) / (Math.min(l1,l2) + 0.05);
};
/* ⚠️ On vise le NŒUD TEXTE et non l'élément : sur un conteneur flex,
   chaque enfant compte pour une boîte de ligne et le compte ment. */
window.__lignes = (el) => {
  let n = 0;
  for (const noeud of el.childNodes) {
    if (noeud.nodeType !== 3 || !noeud.textContent.trim()) continue;
    const r = document.createRange();
    r.selectNodeContents(noeud);
    n = Math.max(n, r.getClientRects().length);
  }
  return n;
};
`;

let echecs = 0;
const dire = (ok, ligne) => { if (!ok) echecs++; console.log((ok ? "✓" : "✗") + " " + ligne); };

async function passe(page, nom, w) {
  const erreurs = [];
  const onErr = (m) => { if (m.type() === "error") erreurs.push(m.text()); };
  page.on("console", onErr);
  page.on("pageerror", (e) => erreurs.push(String(e)));
  await page.waitForTimeout(500);
  await page.addScriptTag({ content: OUTILS });

  const r = await page.evaluate(() => {
    const de = document.documentElement;
    const debord = de.scrollWidth - de.clientWidth;

    /* WCAG 2.5.5 (44 × 44) et 2.5.8 (24 × 24), avec l'exception du lien
       en pleine phrase — un lien dans un paragraphe n'a pas de cible
       propre à dimensionner. */
    const petits = [];
    for (const el of document.querySelectorAll("a[href], button, input, select, [role=button]")) {
      const st = getComputedStyle(el);
      if (st.display === "none" || st.visibility === "hidden" || !el.offsetParent) continue;
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) continue;
      const p = el.parentElement;
      const dansPhrase = p && ["P","LI","SPAN","H1","H2","H3","H4","TD"].includes(p.tagName) &&
        p.textContent.trim().length > el.textContent.trim().length + 12;
      if (dansPhrase) continue;
      if (b.height < 24 || b.width < 24) petits.push((el.textContent || el.tagName).trim().slice(0, 40) + " " + Math.round(b.width) + "×" + Math.round(b.height));
    }

    /* ⚠️ Un texte dans un conteneur flex se casse en deux lignes **sans
       manquer de place** : `flex-shrink: 1` le rétrécit jusqu'à son mot
       le plus long. Six défauts sont venus de là, tous présents jusqu'à
       1920 px, et aucun ne se voyait à la mesure — `min-h-11` fige la
       hauteur.
       ⚠️ **Compter les lignes ne suffit pas.** Un libellé de 33
       caractères sur un écran de 320 px se casse parce qu'il manque
       vraiment de place, et le signaler noie le vrai défaut sous quatre
       faux — c'est ce qu'a fait la première version de ce contrôle. Le
       défaut, c'est de se casser **alors qu'on tenait**. On mesure donc
       la largeur que l'élément aurait sur une seule ligne, et on ne
       retient que ceux qui rentraient dans leur parent.
       Le clone est posé DANS le parent, pas dans `body` : ailleurs il
       n'hérite plus de la fonte et mesure autre chose. */
    const casses = [];
    for (const el of document.querySelectorAll("nav a, .btn, button, [class*=barre] a, [class*=barre] span")) {
      if (!el.offsetParent) continue;
      if (window.__lignes(el) <= 1) continue;
      const parent = el.parentElement;
      const clone = el.cloneNode(true);
      Object.assign(clone.style, {
        whiteSpace: "nowrap", position: "absolute", left: "-9999px",
        width: "auto", maxWidth: "none", visibility: "hidden",
      });
      parent.appendChild(clone);
      const surUneLigne = clone.getBoundingClientRect().width;
      clone.remove();
      const ps = getComputedStyle(parent);
      const dispo = parent.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
      if (surUneLigne <= dispo + 0.5)
        casses.push((el.textContent || "").trim().slice(0, 40) + ` (tenait : ${Math.round(surUneLigne)} ≤ ${Math.round(dispo)})`);
    }

    /* ⚠️ **Un motif peut disparaître sans rien casser.** Les flancs des
       coutures ont perdu leur frise dans trois vues sur six — pas
       d'erreur console, pas de débord, pas de contraste en cause : rien
       dans cette passe ne pouvait le voir, et c'est l'œil qui l'a
       trouvé, un commit plus tard. L'invariant se vérifie pourtant en
       trois lignes : **tout flanc de couture porte un masque.**
       La fleur est exclue par ce que les deux variantes ont en commun —
       ni l'une ni l'autre n'est un `span` sans classe. */
    const coutures = [];
    for (const c of document.querySelectorAll(".couture, .divider")) {
      if (!c.offsetParent) continue;
      for (const f of c.children) {
        if (f.tagName !== "SPAN" || f.classList.contains("jepun-mark")) continue;
        const st = getComputedStyle(f);
        const masque = st.maskImage || st.webkitMaskImage;
        if (!masque || masque === "none")
          coutures.push("flanc sans masque : " + (c.className || "?").slice(0, 30));
      }
    }

    /* 1.4.11 : 3:1 pour les objets graphiques, contour des champs
       compris. */
    const contours = [];
    for (const el of document.querySelectorAll("input, textarea, select")) {
      if (!el.offsetParent) continue;
      const st = getComputedStyle(el);
      const bw = parseFloat(st.borderTopWidth);
      if (!bw) continue;
      const ratio = window.__ratio(window.__rgba(st.borderTopColor), window.__fond(el.parentElement));
      if (ratio < 3) contours.push(el.name || el.id || el.tagName, +ratio.toFixed(2));
    }

    return { debord, petits, casses, contours, coutures, ecrans: +(document.body.scrollHeight / innerHeight).toFixed(1) };
  });

  dire(
    r.debord === 0 && !r.petits.length && !r.casses.length && !r.contours.length &&
      !r.coutures.length && !erreurs.length,
    `${nom} @${w}  débord ${r.debord}  écrans ${r.ecrans}` +
      (r.petits.length ? `\n    cibles: ${JSON.stringify(r.petits)}` : "") +
      (r.casses.length ? `\n    deux lignes: ${JSON.stringify(r.casses)}` : "") +
      (r.contours.length ? `\n    contours: ${JSON.stringify(r.contours)}` : "") +
      (r.coutures.length ? `\n    coutures: ${JSON.stringify(r.coutures)}` : "") +
      (erreurs.length ? `\n    console: ${JSON.stringify(erreurs.slice(0, 3))}` : ""),
  );
  page.off("console", onErr);
}

const b = await chromium.launch({ executablePath: EXE });

for (const [w, h] of TAILLES) {
  for (const route of ROUTES) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(APP + route, { waitUntil: "networkidle" });
    await passe(p, "app " + route, w);
    await p.close();
  }
}

for (const [w, h] of TAILLES) {
  for (const vue of VUES) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(PROTO);
    await p.waitForTimeout(400);
    await p.evaluate((v) => { document.body.dataset.view = v; window.scrollTo(0, 0); }, vue);
    await passe(p, "proto " + vue, w);
    await p.close();
  }
}

console.log(`\n=== ${echecs} passe(s) en échec`);
await b.close();
process.exit(echecs ? 1 : 0);
