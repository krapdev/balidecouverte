# Bali Découverte

Prototype de site pour **Bali Découverte** — voyages privés sur-mesure à Bali
avec Agus Yudiarta, guide balinais francophone indépendant.

L'objectif produit tient en une phrase : amener le visiteur à envoyer une
demande de devis **déjà rédigée** sur le WhatsApp d'Agus, sans formulaire, sans
compte, sans intermédiaire.

## Deux livrables

| Fichier | Rôle |
| --- | --- |
| `design/prototype.html` | Maquette autonome, un seul fichier, ouvrable directement dans un navigateur. Polices intégrées en base64 : aucune requête sortante. Sert à valider la direction artistique sans rien installer. |
| L'app Next.js (racine) | L'implémentation componentisée de cette même maquette. |

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

## Direction artistique

Registre : **spa balinais haut de gamme** — pierre calcaire, bambou sec, teck
sombre — sans perdre l'esprit d'excursion dans la nature.

**Palette.** Les couleurs gardent leur origine dans le *nawa sanga*, la boussole
chromatique de l'île — celle des offrandes, des ombrelles et des étoffes de
temple — mais désaturées : on cherche le calme, pas l'affiche.

| Jeton | Couleur | Origine | Rôle |
| --- | --- | --- | --- |
| `--laut` | `#0f4d59` | Bleu de la mer — Wisnu, le nord | Panneaux immersifs |
| `--kunyit` | `#dfa441` | Miel et soleil — Mahadewa, l'ouest | **Toutes les actions** |
| `--padi` | `#7d9152` | Sauge des rizières | Illustrations |
| `--bata` | `#b8654a` | Argile des temples — Brahma, le sud | Eyebrows, accents rares |
| `--pasir` | `#f7f2e8` | Pierre calcaire | Surface de lecture |
| `--bambou` | `#e6d9c2` | Bambou sec, chanvre | Aplats secondaires |
| `--teck` | `#322b22` | Teck sombre | Texte |

Le miel est réservé aux actions : dès qu'il sert à décorer, il cesse d'être un
repère. Il est aussi illisible en petit corps sur la pierre — les eyebrows
passent donc par l'argile (`--eyebrow`), et les boutons miel portent du teck,
jamais du blanc.

**Typographie** — *Marcellus* pour les titres : des capitales romaines gravées,
la pierre taillée plutôt que le serif de magazine, et une seule graisse, ce qui
force la sobriété. *Jost* pour le texte courant, les étiquettes et les boutons —
géométrique, calme, tabulaire. Deux familles, pas trois : le registre spa vit de
retenue. Les étiquettes sont en capitales très espacées (`0.22em`), les grands
boutons aussi.

**Ornements balinais.** Le vocabulaire vient de ce qu'on voit vraiment sur
l'île, jamais d'un décor générique :

- le **jepun** (frangipanier) — glissé derrière l'oreille d'Agus, posé sur les
  offrandes, et repris comme séparateur de sections ;
- une **branche de jepun** qui déborde en haut du hero, comme par-dessus un mur
  de cour de temple ;
- le **canang sari**, l'offrande de fleurs déposée chaque matin, illustrée dans
  « L'Esprit » et au pied de page ;
- le **tedung**, l'ombrelle à étages, planté devant la source sacrée ;
- le **candi bentar**, le portail fendu en brique, avec ses assises marquées.

Le motif est toujours expliqué au lecteur : il veut dire quelque chose, ce n'est
pas de la décoration. Le vocabulaire suit — *subak*, *melukat*, *bumbu*,
*songket*, *warung*, et le *Om Swastiastu* qui ouvre le pied de page.

> Deux directions ont été essayées et abandonnées, elles restent dans
> l'historique git : le **poleng** (le damier noir et blanc des temples) comme
> couture entre les sections — il lisait comme un drapeau de course automobile ;
> et le **penjor** (le bambou cérémoniel) dans les paysages — à cette échelle il
> lisait comme un lampadaire.

**Layout** — des panneaux immersifs bleu mer (hero, circuits, pied de page)
alternent avec des surfaces pierre de lecture, avec beaucoup d'air entre les
sections. Le portrait et les cartes s'ouvrent en **arc**, celui des alcôves et
des portes de pavillon. La section Circuits est un rail d'itinéraire numéroté —
la numérotation encode une vraie séquence de jours, pas une décoration. L'aperçu
du message WhatsApp est posé sur un fond réglé comme une page de carnet.

Thèmes clair et sombre suivent la préférence système, sans sélecteur : la marque
vit dans un seul monde chromatique, simplement décliné pour la nuit.

## Architecture

```
app/
  layout.js          polices, métadonnées, thème
  page.js            assemblage de la page d'accueil
  globals.css        tokens de design, thème sombre, classes de base
components/
  Navbar.jsx         nav collante + menu plein écran mobile
  Hero.jsx           panneau immersif, entrée en cascade, bandeau des étapes
  AboutAgus.jsx      storytelling + 3 piliers
  Experiences.jsx    catalogue
  ExperienceCard.jsx carte + bouton « Ajouter à mon circuit »
  Circuits.jsx       rail d'itinéraire type
  TripBuilder.jsx    configurateur + générateur WhatsApp
  MobileBar.jsx      rappel du circuit en cours, sur mobile
  Scene.jsx          paysages SVG + ornements (jepun, canang, séparateur)
  Reveal.jsx         apparition au scroll
  SectionHead.jsx    en-tête de section
lib/
  data.js            données de démonstration
  trip-store.jsx     état partagé (Context + useReducer)
  whatsapp.js        composition du message et de l'URL wa.me
```

### État partagé

`lib/trip-store.jsx` expose `<TripProvider>` et `useTrip()` (React Context +
`useReducer`). `ExperienceCard` y écrit, `TripBuilder` et `MobileBar` le
lisent — ajouter une expérience met immédiatement à jour le récapitulatif, le
compteur et l'aperçu du message.

Pas de Zustand : un seul provider, un état plat, aucun besoin de sélecteurs ni
de persistance à ce stade. Un passage à Zustand ne toucherait que ce fichier.

### Lien WhatsApp

`lib/whatsapp.js` compose le message, `encodeURIComponent` l'encode, et le
bouton pointe vers `https://wa.me/628123688936?text=…`. Le message est affiché
en clair au-dessus du bouton : on n'envoie rien que le voyageur n'ait pu relire.

Le numéro se change dans `lib/data.js` (`WHATSAPP_NUMBER`).

## Illustrations

Les visuels sont des scènes SVG dessinées à la main dans `components/Scene.jsx`
— rizières de Sidemen sous un Gunung Agung aux arêtes adoucies, source sacrée et
son *candi bentar* de brique flanqué de ses *tedung*, canyon des cascades,
plantation de café la nuit. Couches douces et brume de vallée plutôt qu'aplats
d'affiche. Le même fichier abrite les ornements réutilisables : `Jepun`,
`JepunBranch`, `Canang`, `Divider`. Aucune dépendance externe, aucun chargement,
un rendu identique partout.

Pour passer à de vraies photos : remplacer `<Scene>` par `<Image>` dans
`Hero.jsx` et `ExperienceCard.jsx`. Les proportions (`16/10` pour les cartes,
plein cadre pour le hero) sont déjà posées, rien d'autre ne bouge.

## Reste à faire avant une mise en production

- Photos réelles d'Agus et des expériences.
- Contenus définitifs : tarifs, disponibilités, mentions légales, RGPD.
- Pages de détail par expérience et par circuit.
- Suivi de conversion sur le clic WhatsApp.
