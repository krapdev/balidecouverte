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

**Palette — le nawa sanga.** Les couleurs ne viennent pas d'une charte
« tropicale » mais de la boussole chromatique balinaise, celle qu'on retrouve
sur les offrandes, les ombrelles et les étoffes des temples : chaque direction
a sa couleur.

| Jeton | Couleur | Origine | Rôle |
| --- | --- | --- | --- |
| `--laut` | `#0b4f63` | Bleu de la mer — Wisnu, le nord | Fond des panneaux immersifs |
| `--kunyit` | `#f0a91c` | Curcuma et soleil — Mahadewa, l'ouest | **Toutes les actions** |
| `--padi` | `#8ba626` | Vert des jeunes rizières | Illustrations |
| `--bata` | `#c34a2c` | Brique de temple — Brahma, le sud | Eyebrows, accents rares |
| `--pasir` | `#faf1e2` | Sable clair | Surface de lecture |
| `--lava` | `#14232a` | Sable volcanique noir | Texte |

Le jaune est réservé aux actions : dès qu'il sert à décorer, il cesse d'être un
repère. Il est aussi illisible en petit corps sur le sable — les eyebrows et les
accents typographiques passent donc par la brique (`--eyebrow`), et les boutons
jaunes portent du texte noir, jamais du blanc.

**Typographie** — *Bricolage Grotesque* pour les titres (lettres volontairement
irrégulières, axe de chasse : les titres sont resserrés à la main), *Newsreader*
pour le texte courant, *Space Mono* pour les coordonnées et les durées. Un
grotesque pour les titres et un serif pour le corps de texte, soit l'inverse de
l'habitude — c'est ce qui sort le site du registre « agence ».

**Poleng.** Le damier noir et blanc qu'on noue autour des arbres et des statues,
et qui dit l'équilibre des contraires (*rwa bhineda*), sert de couture entre les
grandes sections. Il est expliqué au lecteur sous le portrait d'Agus : le motif
veut dire quelque chose, ce n'est pas un ornement.

**Layout** — des panneaux immersifs bleu mer (hero, circuits, pied de page)
alternent avec des surfaces sable de lecture ; la section Circuits est un rail
d'itinéraire numéroté — la numérotation encode une vraie séquence de jours, pas
une décoration ; l'aperçu du message WhatsApp est posé sur un fond réglé comme
une page de carnet.

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
  Scene.jsx          illustrations SVG
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

Les visuels sont des scènes SVG en **aplats sérigraphiés** dessinées à la main
dans `components/Scene.jsx` — rizières de Sidemen sous le Gunung Agung, source
sacrée et son *candi bentar* de brique, canyon des cascades, plantation de café
la nuit. Formes pleines, couleurs franches, trame de points : le vocabulaire de
l'affiche imprimée, pas de la photo retouchée. Aucune dépendance externe, aucun
chargement, un rendu identique partout.

Pour passer à de vraies photos : remplacer `<Scene>` par `<Image>` dans
`Hero.jsx` et `ExperienceCard.jsx`. Les proportions (`16/10` pour les cartes,
plein cadre pour le hero) sont déjà posées, rien d'autre ne bouge.

## Reste à faire avant une mise en production

- Photos réelles d'Agus et des expériences.
- Contenus définitifs : tarifs, disponibilités, mentions légales, RGPD.
- Pages de détail par expérience et par circuit.
- Suivi de conversion sur le clic WhatsApp.
