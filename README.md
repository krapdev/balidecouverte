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

**Le site est nocturne.** Bali spirituelle se vit avant le jour : le *melukat* à
l'aube, les cérémonies de nuit, la brume de Munduk à cinq heures. C'est aussi ce
qui sort la page du registre « magazine de voyage », où tout est éclairé à midi.

**La page suit la montée du jour.** On entre dans la nuit profonde, chaque
section se réchauffe d'un cran, et le configurateur — le moment du départ —
arrive à l'aube. Ce n'est pas un dégradé décoratif : c'est la structure de la
page.

| Palier | Couleur | Section |
| --- | --- | --- |
| `--nuit` | `#061520` | Hero, pied de page |
| `--nuit-2` | `#0a1e28` | L'Esprit |
| `--nuit-3` | `#0e2630` | Expériences |
| `--aube-1` | `#123037` | Circuits |
| `--aube-2` | `#17383a` | Sur-mesure — le départ |

Monde chromatique unique et assumé : **pas de thème clair, pas de sélecteur**.
Une aube n'a pas de variante diurne.

**La lumière est une matière, jamais un aplat.** Halo de l'astre qui déborde de
sa source, brume qui monte de la vallée, eau des terrasses qui attrape la lueur,
liseré de contre-jour sur l'épaule d'Agus, lampes-tempête entre les caféiers, et
un fil de lumière en guise d'horizon entre deux sections. Chaque étape du rail
d'itinéraire est une lampe qui vacille lentement.

| Jeton | Couleur | Rôle |
| --- | --- | --- |
| `--lueur` | `#e8a33f` | La lueur de l'horizon — **toutes les actions** |
| `--laut` | `#12707f` | La mer |
| `--padi` | `#7d9152` | Les rizières |
| `--bata` | `#b8654a` | La brique de temple |
| `--sable` | `#f2ece0` | Le texte |

**Typographie** — *Eczar* pour les titres : dessinée pour accompagner le
devanagari, elle porte une énergie de manuscrit qui renvoie à la racine hindoue
de Bali, loin de la capitale romaine des brochures d'hôtel. *Mulish* pour le
texte courant : humaniste, douce, très lisible sur fond sombre, et son italique
porte les moments de rêverie qu'Eczar ne sait pas tenir.

**Tri Hita Karana.** Les trois causes du bien-être — l'harmonie avec le divin
(*Parahyangan*), avec les hommes (*Pawongan*), avec la nature (*Palemahan*) —
remplacent les trois puces d'argumentaire. Elles recouvrent presque exactement
ce qu'Agus a à dire, avec une assise que trois arguments marketing n'ont pas.

**Ornements balinais**, toujours expliqués au lecteur plutôt que décoratifs :
le **jepun** (frangipanier) derrière l'oreille d'Agus, posé sur les offrandes et
repris comme séparateur ; une **branche de jepun** qui déborde en haut du hero ;
le **canang sari**, l'offrande de fleurs du matin ; le **tedung**, l'ombrelle à
étages ; le **candi bentar**, le portail fendu en brique avec ses assises. Le
vocabulaire suit — *subak*, *melukat*, *bumbu*, *songket*, *warung*, et le
*Om Swastiastu* qui ouvre le pied de page.

**La grille est cassée**, mais jamais au point de faire collision : la seconde
colonne d'expériences descend d'un cran, la colonne de texte d'Agus est poussée
sous son portrait, et les trois harmonies se répondent en escalier.

**Le garde-fou.** Le risque du registre onirique, c'est le site de retraite
bien-être. L'antidote est la tension, pas l'adoucissement : imagerie nocturne
d'un côté, faits durs de l'autre — coordonnées GPS, durées, « faisable dès
10 ans », prix à la ligne, itinéraire jour par jour. C'est ce contraste qui fait
l'aventure haut de gamme.

### Contraste

Le texte du hero était devenu illisible (1,67:1 pour un titre) après le passage
à un fond clair. Un audit automatique parcourt maintenant chaque section et
compare la couleur déclarée au premier fond opaque au-dessus, avec le seuil WCAG
correspondant à la taille et à la graisse. Toutes les combinaisons passent. À
refaire après toute modification de palette.

> Trois directions ont été essayées et abandonnées, elles restent dans
> l'historique git : le **poleng** (le damier noir et blanc des temples) comme
> couture entre les sections — il lisait comme un drapeau de course automobile ;
> le **penjor** (le bambou cérémoniel) dans les paysages — à cette échelle il
> lisait comme un lampadaire ; et une direction **spa diurne** en pierre
> calcaire — élégante, mais trop proche de la brochure d'hôtel.

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

Les visuels sont des scènes SVG dessinées à la main dans `components/Scene.jsx`,
toutes nocturnes ou à l'aube — rizières de Sidemen sous un Gunung Agung en ombre,
source sacrée au moment du *melukat*, canyon où la lumière ne tombe qu'une heure
par jour, plantation de café éclairée à la lampe-tempête. Le même fichier abrite les ornements réutilisables : `Jepun`,
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
