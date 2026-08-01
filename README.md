# Bali Découverte

Prototype de site pour **Bali Découverte** — voyages privés sur-mesure à Bali
avec Agus Yudiarta, guide balinais francophone indépendant.

L'objectif produit tient en une phrase : amener le visiteur à envoyer une
demande de devis **déjà rédigée** sur le WhatsApp d'Agus, sans formulaire, sans
compte, sans intermédiaire.

## Statut du contenu — à lire avant de reprendre le projet

Le site existant est **https://www.balidecouverte.fr/**. Il renvoie 403 à toute
récupération automatisée, donc les faits ci-dessous ont été relevés via l'index
de recherche : **fiables sur les chiffres, partiels sur les formulations**.

`lib/data.js` sépare explicitement deux natures de données :

| Bloc | Nature |
| --- | --- |
| `CONTACT`, `AGUS`, `TARIFS` | **Faits relevés sur le site réel.** À ne corriger que sur indication d'Agus. |
| `EXPERIENCES`, `ROUTE`, `ISLANDS` | **Exemples de démonstration.** Le vrai catalogue est une série d'excursions à la journée numérotées et de circuits packagés à prix fixe. |

Reste à reprendre depuis le site actuel, une fois le contenu récupéré :

- la liste complète des **excursions à la journée numérotées** (n° 12 Nusa
  Penida, n° 13 le nord et les dauphins, Besakih, Tamblingan…) ;
- les **cinq circuits packagés** et leurs prix : Bali 15 j (2 420 € pour 2),
  Bali+Lombok 16 j (3 180 € pour 2), Bali+Java, Bali+Komodo/Rinca 14 j,
  Flores+Komodo/Rinca 14 j ;
- le **livre d'or** — des témoignages réels, à substituer à toute note globale ;
- **mentions légales, CGV, politique de confidentialité, conditions
  d'annulation** : absentes du site actuel, et obligatoires pour une clientèle
  française.

Le tarif affiché est **par jour et par véhicule**, jamais par personne. Toute
tentation d'afficher un prix « à partir de X € / pers. » contredit le modèle
commercial d'Agus.

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

Registre : **classe, joyeux, zen**. Fond ivoire chaud, beaucoup d'air, et une
couleur qui chante sans crier.

**Palette.** Elle vient des choses qu'on voit vraiment sur l'île.

| Jeton | Couleur | Origine | Rôle |
| --- | --- | --- | --- |
| `--jade` | `#0f6b5c` | Le vert laqué des temples et des rizières mûres | **Toutes les actions** + les panneaux pleins |
| `--soleil` | `#f2b134` | Le safran des ombrelles et des offrandes | Éclaire — CTA du hero, îles sœurs |
| `--lagon` | `#189aa4` | Le turquoise des passes et du lac d'Ijen | Illustrations |
| `--bougain` | `#c8455f` | Le rose des murs de Sanur | Étiquettes uniquement |
| `--ivoire` / `--sable` | `#fbf7ee` / `#f2e9d8` | Pierre et sable | Surfaces de lecture, en alternance |
| `--encre` | `#22302b` | | Texte |

Discipline : le jade porte l'action, le soleil éclaire, le bougainvillier ne
sert qu'aux étiquettes, le lagon vit dans les illustrations. Aucune de ces
couleurs n'est décorative.

Monde clair unique et assumé : **pas de variante nocturne**. La direction est
solaire, elle n'a pas d'envers.

**Typographie** — *Eczar* pour les titres : dessinée pour accompagner le
devanagari, elle porte une énergie de manuscrit qui renvoie à la racine hindoue
de Bali, loin de la capitale romaine des brochures d'hôtel. *Mulish* pour le
texte courant.

**Tri Hita Karana.** Les trois causes du bien-être — l'harmonie avec le divin
(*Parahyangan*), avec les hommes (*Pawongan*), avec la nature (*Palemahan*) —
remplacent les trois puces d'argumentaire. Elles recouvrent presque exactement
ce qu'Agus a à dire, avec une assise que trois arguments marketing n'ont pas.

**Ornements balinais**, toujours expliqués au lecteur : le **jepun**
(frangipanier) derrière l'oreille d'Agus et en séparateur, une **branche de
jepun** qui déborde en haut du hero, le **canang sari** (l'offrande du matin),
le **tedung** (l'ombrelle à étages), le **candi bentar** et ses assises de
brique. Le vocabulaire suit — *subak*, *melukat*, *bumbu*, *songket*, *warung*,
et le *Om Swastiastu* du pied de page.

**La grille est cassée**, mais jamais au point de faire collision : la seconde
colonne d'expériences descend d'un cran, les trois îles sœurs montent en
escalier, la colonne de texte d'Agus est poussée sous son portrait, et les trois
harmonies se répondent.

**Le garde-fou.** Le risque d'une direction douce, c'est le site de retraite
bien-être. L'antidote est la tension : imagerie apaisée d'un côté, faits durs de
l'autre — coordonnées GPS, dénivelé, « faisable dès 10 ans », accès et niveau
pour chaque île, prix à la ligne, itinéraire jour par jour.

### Contraste

Un audit automatique parcourt chaque section, compare la couleur déclarée au
premier fond opaque au-dessus et applique le seuil WCAG correspondant à la
taille et à la graisse. Il a rattrapé dix régressions lors du passage à cette
palette — badges devenus invisibles, texte de pied de page en jade sur jade,
blanc sur vert WhatsApp à 4,31. Toutes les combinaisons passent. **À rejouer
après toute modification de palette.**

> Quatre directions ont été essayées et abandonnées, elles restent dans
> l'historique git : le **poleng** (damier noir et blanc) en couture de
> sections — il lisait comme un drapeau de course ; le **penjor** dans les
> paysages — à cette échelle, un lampadaire ; une direction **spa diurne** en
> pierre calcaire — trop proche de la brochure d'hôtel ; et une direction
> **nocturne** où la page suivait la montée du jour — belle, mais trop grave
> pour le propos.

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
  Islands.jsx        extensions Java, Lombok, Flores, Komodo
  Tarifs.jsx         grille saisonnière, inclus et à régler sur place
  Scene.jsx          paysages SVG + ornements (jepun, canang, séparateur)
  Reveal.jsx         apparition au scroll
  SectionHead.jsx    en-tête de section
lib/
  data.js            données de démonstration, îles sœurs, notes de saison
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

### Les îles sœurs

`components/Islands.jsx` propose trois extensions au-delà de Bali — le Kawah
Ijen à Java, le Rinjani à Lombok, Padar et les dragons à Komodo. Elles vivent
dans le même état partagé que les expériences mais dans une liste distincte
(`islandIds`), et apparaissent sous leur propre rubrique dans le message
WhatsApp. Chaque carte porte ses faits durs : accès depuis Bali, durée, niveau.

### Ce qui se passe à la période choisie

`periodNote()` dans `lib/data.js` répond au mois sélectionné : saison sèche ou
des pluies, ce que ça change pour le Rinjani et Komodo, haute saison, et Nyepi
pour mars.

**Aucune date de cérémonie n'est codée en dur, et c'est volontaire.** Galungan
et Kuningan suivent le cycle pawukon de 210 jours et se déplacent chaque année ;
Nyepi suit le calendrier saka. Afficher un calendrier faux serait pire que de ne
rien afficher : le texte dit ce qui est fiable et renvoie à Agus pour le reste.
Si Agus fournit les dates exactes, elles se branchent dans cette seule fonction.

### Lien WhatsApp

`lib/whatsapp.js` compose le message, `encodeURIComponent` l'encode, et le
bouton pointe vers `https://wa.me/628123688936?text=…`. Le message est affiché
en clair au-dessus du bouton : on n'envoie rien que le voyageur n'ait pu relire.

Le numéro se change dans `lib/data.js` (`WHATSAPP_NUMBER`).

## Illustrations

Les visuels sont des scènes SVG dessinées à la main dans `components/Scene.jsx` —
rizières de Sidemen sous le Gunung Agung, source sacrée et son *candi bentar*,
canyon des cascades, plantation de café la nuit, plus les trois îles sœurs : le
lac acide du Kawah Ijen, le cône du Rinjani et son lac Segara Anak, les trois
baies de Padar. Le même fichier abrite les ornements réutilisables : `Jepun`,
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
