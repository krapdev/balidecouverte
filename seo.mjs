import { chromium } from "playwright";

/* Relevé SEO page par page : ce que Lighthouse ne regarde pas — unicité
   et longueur des titres, canoniques, hiérarchie des titres, alternatives
   textuelles, données structurées. */

const BASE = process.env.APP || "http://127.0.0.1:3401";
const ROUTES = ["/", "/circuit", "/envies", "/agus", "/tarifs", "/livre-d-or", "/cgv", "/mentions-legales"];

const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const vus = { titres: new Map(), descriptions: new Map() };
let alertes = 0;
const dire = (r, m) => { alertes++; console.log("  ✗ " + m); };

for (const route of ROUTES) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const rep = await p.goto(BASE + route);
  await p.waitForTimeout(300);

  const d = await p.evaluate(() => {
    const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.content ?? null;
    const prop = (n) => document.querySelector(`meta[property="${n}"]`)?.content ?? null;
    const titres = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter((e) => e.offsetParent !== null)
      .map((e) => ({ n: +e.tagName[1], t: e.textContent.trim().slice(0, 40) }));
    /* ⚠️ **Une image sans `width`/`height` ne décale rien si sa boîte est
       déjà réservée.** La première version signalait les six images du
       site — toutes fausses : `Photo` et `Diaporama` réservent la place
       par `aspect-ratio`, et le décalage cumulé mesuré vaut zéro sur les
       six routes. Ce qu'on cherche, c'est une image dont AUCUN ancêtre
       proche ne réserve la hauteur. */
    const reserve = (el) => {
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        const s = getComputedStyle(n);
        if (s.aspectRatio && s.aspectRatio !== "auto") return true;
        if (s.position === "absolute" && s.inset !== "auto") return true;
        if (parseFloat(s.height) > 0 && s.height !== "auto" && n !== el) return true;
      }
      return false;
    };
    const imgs = [...document.querySelectorAll("img")].map((i) => ({
      alt: i.getAttribute("alt"), src: (i.currentSrc || i.src).split("/").pop().slice(0, 40),
      loading: i.loading, w: i.getAttribute("width"), h: i.getAttribute("height"),
      reservee: reserve(i),
    }));
    const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent);
    return {
      titre: document.title,
      description: meta("description"),
      robots: meta("robots"),
      canonique: document.querySelector('link[rel="canonical"]')?.href ?? null,
      lang: document.documentElement.lang,
      og: { titre: prop("og:title"), desc: prop("og:description"), image: prop("og:image"), type: prop("og:type"), url: prop("og:url") },
      titres, imgs, jsonld,
      liensVides: [...document.querySelectorAll("a[href]")].filter((a) => a.offsetParent && !a.textContent.trim() && !a.getAttribute("aria-label")).length,
    };
  });

  console.log(`\n── ${route}  [${rep.status()}]`);
  console.log(`   titre (${d.titre.length}) : ${d.titre}`);
  console.log(`   desc  (${d.description ? d.description.length : 0}) : ${(d.description || "MANQUANTE").slice(0, 110)}`);
  console.log(`   robots: ${d.robots ?? "(hérité)"}  canonique: ${d.canonique ?? "MANQUANTE"}  lang: ${d.lang}`);

  if (!d.titre) dire(route, "titre absent");
  else if (d.titre.length > 60) dire(route, `titre trop long (${d.titre.length} > 60) — tronqué dans les résultats`);
  if (!d.description) dire(route, "meta description absente");
  else if (d.description.length < 70 || d.description.length > 160)
    dire(route, `description hors plage utile (${d.description.length}, viser 70–160)`);
  if (vus.titres.has(d.titre)) dire(route, `titre identique à ${vus.titres.get(d.titre)}`);
  vus.titres.set(d.titre, route);
  if (d.description && vus.descriptions.has(d.description)) dire(route, `description identique à ${vus.descriptions.get(d.description)}`);
  if (d.description) vus.descriptions.set(d.description, route);
  if (!d.canonique) dire(route, "canonique absente");
  if (d.lang !== "fr") dire(route, `lang = ${d.lang}`);
  for (const [k, v] of Object.entries(d.og)) if (!v) dire(route, `og:${k} absent`);

  /* Un seul h1, et aucun saut de niveau : c'est le plan du document que
     lisent le moteur et le lecteur d'écran. */
  const h1 = d.titres.filter((t) => t.n === 1);
  if (h1.length !== 1) dire(route, `${h1.length} h1 (il en faut exactement un)`);
  let precedent = 0;
  for (const t of d.titres) {
    if (precedent && t.n > precedent + 1) dire(route, `saut de titre h${precedent} → h${t.n} : « ${t.t} »`);
    precedent = t.n;
  }

  for (const i of d.imgs) {
    if (i.alt === null) dire(route, `img sans attribut alt : ${i.src}`);
    else if (i.alt.trim() === "") { /* alt="" = décorative, légitime */ }
    if (!i.w && !i.h && !i.reservee)
      dire(route, `img sans dimensions ET sans boîte réservée (décalage certain) : ${i.src}`);
  }
  if (d.liensVides) dire(route, `${d.liensVides} lien(s) sans intitulé ni aria-label`);

  for (const j of d.jsonld) {
    try {
      const o = JSON.parse(j);
      /* Le JSON-LD du site est un `@graph` : lire `@type` à la racine ne
         donnait rien, et le relevé affichait une ligne vide. */
      const noeuds = Array.isArray(o) ? o : o["@graph"] ? o["@graph"] : [o];
      const types = noeuds.map((x) => [].concat(x["@type"]).join("+")).join(", ");
      console.log(`   JSON-LD : ${types}`);
      const brut = JSON.stringify(o);
      if (/aggregateRating|reviewRating/.test(brut))
        dire(route, "JSON-LD porte une note — INTERDIT : personne n'a donné d'étoiles");
    } catch (e) {
      dire(route, "JSON-LD illisible : " + e.message);
    }
  }
  await p.close();
}

console.log(`\n=== ${alertes} alerte(s)`);
await b.close();
