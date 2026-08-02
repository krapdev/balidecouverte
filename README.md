# Bali Découverte

Prototype de site pour **Bali Découverte** — voyages privés sur-mesure à Bali
avec Agus Yudiarta, guide balinais francophone indépendant.

L'objectif produit tient en une phrase : amener le visiteur à envoyer une
demande de devis **déjà rédigée** sur le WhatsApp d'Agus, sans formulaire, sans
compte, sans intermédiaire.

## Statut du contenu — à lire avant de reprendre le projet

Le site existant est **https://www.balidecouverte.fr/**. Il renvoie 403 à toute
récupération automatisée : le contenu ci-dessous a été fourni par copier-coller.

`lib/data.js` sépare explicitement deux natures de données :

| Bloc | Nature |
| --- | --- |
| `CONTACT`, `AGUS`, `TARIFS`, `CIRCUIT` | **Contenu réel du site.** À ne corriger que sur indication d'Agus. |
| `CIRCUITS`, `SIGNATURES` | **Les cinq circuits réels**, résumés à leurs étapes et à trois places secrètes. |
| `EXPERIENCES` | **Extraits du circuit réel de 15 jours**. |
| `ISLANDS` | Réel dans les destinations, **résumé rédigé** pour les descriptions. |

### Le parti pris éditorial : trois niveaux, jamais quatorze journées

Les pages d'origine déroulent chaque circuit activité par activité. C'est
complet, mais ça se lit comme un devis. `components/Circuits.jsx` organise
l'information en trois niveaux :

1. **La carte-repère** — nom, tempérament en une phrase, trois chiffres
   (jours, nuits, étapes) et le prix par personne. De quoi trancher.
2. **La fiche dépliable**, au clic et sur place — le squelette des étapes avec
   le nombre de nuits, **trois places secrètes**, et le bouton « Partir de ce
   circuit ».
3. **Le jour par jour — délibérément absent.** C'est le livrable d'Agus et la
   raison même de lui écrire. Le publier serait à la fois surcharger la page et
   donner gratuitement ce qui justifie le premier échange. Le site dit : « Le
   détail jour par jour ? Demandez-le à Agus. »

L'**archipel** en tête de section (`components/Archipel.jsx`) répond à la
question « où » sans que le texte ait à la répéter cinq fois : les îles du
circuit survolé ou ouvert s'allument.

Les **places secrètes** ne sont pas inventées : ce sont les endroits que les
pages d'Agus signalent elles-mêmes comme « peu connus par des touristes » ou
« loin des visites touristiques » — le grand ficus de Munduk, la saline de
quatre cents hectares, les sept Gili du sud-ouest de Lombok, Mesangin sur la
grande place de Yogyakarta, la nuit à Waerebo.

### L'engagement — l'argument le plus fort, et il est de lui

`components/Engagement.jsx` est placé **juste après les tarifs**, et ce n'est
pas anodin : la grille de prix pose la question « où va mon argent ? », cette
section y répond. Elle transforme un argument commercial (« sans
intermédiaire ») en raison de choisir.

Trois points, tous tirés des mots d'Agus :

- **En direct, sans agence** — ce que vous payez fait vivre le guide, le
  chauffeur et les familles, pas une commission.
- **Une union de guides, pas un homme seul** — Agus écrit qu'il travaille « au
  sein d'une union de guides de Bali », avec d'autres francophones et
  anglophones. Quand il n'est pas disponible, il passe le relais à quelqu'un
  qu'il connaît.
- **« Ambassadeur du tourisme de mon pays »** — sa formule, citée telle quelle.

La chute : *« Chaque voyage organisé en direct, c'est un guide balinais de plus
qui vit de son métier sans dépendre d'une agence. »*

**Une règle de rédaction à tenir** : la section est écrite **par le positif** —
ce que le direct rend possible. Jamais une charge contre des agences nommées,
qu'on ne pourrait ni documenter ni défendre. L'argument est plus fort ainsi, et
il n'expose pas Agus.

Vocabulaire : il écrit **« une union de guides »**, pas un syndicat. Ne pas
corriger vers un mot qui n'est pas le sien.

### La fourche : à la journée, ou en circuit

`components/Journees.jsx` s'ouvre sur **deux cartes seulement** (`FORMULES`),
posées avant tout le reste de la section :

- **À la journée** — le voyageur loge où il veut, Agus vient le chercher le
  matin. Une journée ou dix, sans engagement de circuit. Tarif **au jour et par
  véhicule**.
- **En circuit** — d'un bout à l'autre de l'île ou de plusieurs. Formule
  globale, **prix par personne**.

C'est la seule information de structure dont le voyageur a besoin pour se
situer. Les deux modèles de prix étant différents, les confondre est l'erreur
qui coûte le plus cher : chaque carte porte le sien.

### « Pas trop de détails » — la règle de la section Journées

Le brief est explicite : *le but n'est pas d'acter un circuit sur le site, mais
de donner envie de contacter Agus en ayant réfléchi au type de voyage qu'on
souhaite.* La section est donc **volontairement pauvre en détail** : un titre,
deux lignes, une case à cocher. Pas d'horaire, pas de prix à la journée, pas de
programme heure par heure.

Deux raisons, et elles tiennent :

1. Ce qui est faisable dans la journée **dépend de l'hôtel** où le voyageur
   loge. Publier un programme fixe, c'est promettre ce qu'on ne peut pas tenir
   depuis n'importe où sur l'île. Seul Agus peut trancher.
2. Huit journées sont affichées, `JOURNEES_RESTE` mentionne les autres par
   région sans les détailler. La page reste lisible, et la conversation garde
   une raison d'exister.

L'épigraphe (`JOURNEES_EPIGRAPHE`) est **d'Agus**, reprise telle quelle de sa
page Excursions : *« Être en vacances, c'est n'avoir rien à faire et avoir toute
la journée pour le faire. »* Elle donne le ton de la section mieux qu'une
promesse commerciale.

Cocher une journée ne réserve rien : ça alimente `dayIds` dans le store, et les
journées choisies partent dans le message WhatsApp sous « Les journées qui me
tentent ». C'est ce que le voyageur dira en ouvrant la conversation.

### Les hébergements : « partir en paix »

**Correction d'une version précédente de ce fichier** : les hébergements sont à
la charge du voyageur *par défaut*, mais **Agus peut les choisir, les proposer
et les réserver**. Ce n'est pas un détail logistique, c'est un argument — le
voyageur peut tout lui confier et partir l'esprit tranquille.

La ligne exacte figure dans les fiches circuits (`components/Circuits.jsx`) et
le bloc `HEBERGEMENT` s'affiche dans le configurateur, juste au-dessus de
l'aperçu du message. Ne pas la réduire à « hébergements non compris » : ce
serait perdre l'argument.

### La co-construction

C'est **l'objectif du site**, pas une fonctionnalité parmi d'autres. Tout y est
subordonné :

- Les circuits sont **une base de réflexion**, jamais un produit. Choisir un
  circuit ne commande rien : il devient la **base de départ** (`baseCircuit`
  dans le store), s'affiche en tête du configurateur avec un bouton pour
  repartir de zéro, et le message WhatsApp l'annonce comme telle — « Je pars de
  votre circuit X et j'aimerais l'adapter ».
- Les journées, les expériences et les îles sœurs se cochent librement et se
  cumulent dans le même récapitulatif.
- Le message part avec ce que le voyageur a **réfléchi**, pas avec ce qu'il a
  acheté.

Le voyageur reste l'auteur de son voyage. Toute évolution qui transformerait la
page en tunnel de réservation va contre le brief.

### Comparer les circuits sans se tromper

Les **vols intérieurs sont compris dans Bali + Komodo et pas dans Flores**, où
les billets d'Agus sont en plus à la charge du voyageur. Sans mention explicite,
Flores paraît moins cher alors qu'il va plus loin. Chaque fiche porte donc sa
ligne « vols » — ne jamais la retirer.

### Les points de tarification à ne pas perdre

- Le tarif journée est **par jour et par véhicule**, jamais par personne.
  Afficher « à partir de X € / pers. » contredirait le modèle d'Agus.
- **15 € par nuit** de supplément si le voyageur loge dans l'est, le
  nord-centre, le nord ou le nord-ouest : Agus dort et mange sur place. C'est
  annoncé d'avance, pas noyé dans un devis — c'est un argument de confiance.
- Trois véhicules selon le nombre : Avanza (4 pers.), APV (5 pers.), minibus
  (11 pers.), chauffeur-guide compris dans le compte.
- Nusa Penida est un forfait à part : 230 € pour deux, novembre à mars.
- Circuit de 15 jours : 2 420 € pour deux, soit 1 210 € par personne, en basse
  saison. Dégressif à trois ou quatre.

### Reste à reprendre

- Le **livre d'or** — des témoignages réels, à substituer à toute note globale.
- **Quelle adresse e-mail est publique** : le pied de page du site donne
  `agus.yudiarta@balidecouverte.fr`, la page Présentation
  `agus.guidebali@gmail.com`. Les deux sont dans `CONTACT`, à trancher avec Agus.
- Deux incohérences relevées **sur le site actuel**, à corriger à la source :
  l'Avanza annoncée à « 3 personnes » et à « 4 personnes » sur la même page, et
  « Munduk (centre-nord de Java) » — Munduk est à Bali.
- **Mentions légales, CGV, politique de confidentialité, conditions
  d'annulation** : absentes du site actuel, obligatoires pour une clientèle
  française.

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

Deux pièges si l'audit est réécrit :

- Chromium sérialise `color-mix()` en **`color(srgb r g b / a)`**, composantes
  en 0–1. Les lire comme du 0–255 fait passer un fond ivoire pour du noir et
  produit des échecs fantômes.
- Le décoratif (`aria-hidden="true"`) doit sortir de l'audit : les séparateurs
  du bandeau défilant ne sont lus par personne, et les compter noie les vraies
  régressions.

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
  Circuits.jsx       cinq cartes-repères + fiches dépliables
  Archipel.jsx       carte schématique de l'archipel
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
