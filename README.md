# Bali Découverte

Prototype de site pour **Bali Découverte** — voyages privés sur-mesure à Bali
avec Agus Yudiarta, guide balinais francophone indépendant.

L'objectif produit tient en une phrase : amener le visiteur à envoyer une
demande de devis **déjà rédigée** dans la messagerie du voyageur, sans formulaire, sans
compte, sans intermédiaire.

## Statut du contenu — à lire avant de reprendre le projet

Le site existant est **https://www.balidecouverte.fr/**. Il renvoie 403 à toute
récupération automatisée : le contenu ci-dessous a été fourni par copier-coller.

`lib/data.js` sépare explicitement deux natures de données :

| Bloc | Nature |
| --- | --- |
| `CONTACT`, `AGUS`, `TARIFS`, `CIRCUIT` | **Contenu réel du site.** À ne corriger que sur indication d'Agus. |
| `CIRCUITS` | **Le circuit réel de 15 jours**, résumé à ses étapes. |
| `ACTIVITES` | **Réel** : excursions à la journée et places secrètes tirées des pages d'Agus, résumées à une ligne. |

### Le parcours : deux chemins, et un seul but

Le voyageur ne choisit pas un produit : il choisit **par où il entre dans la
conversation**. `CHEMINS` pose la fourche avant tout le reste :

| Chemin | Ce qu'il fait | Section |
| --- | --- | --- |
| **Partir de son circuit** | Le circuit de 15 jours devient la base (`baseCircuit`), à déformer. | `Circuit.jsx` |
| **Partir de vos envies** | Les activités cochées deviennent le squelette du sur-mesure. | `Activites.jsx` |

Les deux mènent au même endroit, et se cumulent : on peut prendre le circuit
pour base **et** cocher des envies. L'e-mail dit lequel a servi de
point de départ, parce que ça change le travail d'Agus — adapter un itinéraire
qu'il connaît, ou en construire un.

**Une seule fourche, jamais deux.** L'ancienne opposait « à la journée » et
« en circuit » : elle portait sur le format et le prix, pas sur ce que le
voyageur a besoin de décider. Deux fourches sur la même page, et il ne sait
plus laquelle l'engage. Le service « à la journée » n'a pas disparu pour
autant — il est redit en une phrase dans `ACTIVITES_RESTE` (« trois journées
ou quinze, c'est vous qui voyez »), et la grille au jour vit sur `/tarifs`.

### Les classiques et les places secrètes

`ACTIVITES` porte un champ `famille`, et la distinction n'est pas cosmétique :

- **`classique`** — ce qu'on vient chercher à Bali. Le voyageur les connaît de
  nom ; il veut savoir qu'Agus les fait.
- **`secret`** — ce qu'Agus est à peu près seul à montrer. C'est son avantage,
  et **c'était jusqu'ici enterré au troisième niveau de lecture** : il fallait
  déplier une fiche circuit pour tomber sur le grand ficus de Munduk ou la
  saline de quatre cents hectares. Les remonter en surface est le vrai gain de
  cette refonte.

L'e-mail les annonce séparément (« Ce que je ne veux pas manquer »
puis « Et ces endroits-là m'ont donné envie ») : ce n'est pas la même demande,
et Agus lit la seconde comme un signal sur le voyageur qu'il a en face.

**Règle d'écriture** : on nomme la place secrète et on donne envie ; on ne
publie ni l'adresse ni le chemin. Ce qui se monnaie, c'est d'y conduire.

### Le canal : l'e-mail, pas WhatsApp

Le configurateur produit un **e-mail** (`lib/message.js`), pas un lien
`wa.me`. La raison n'est pas technique : un fil d'e-mail se retrouve, se cite
et se complète — c'est le support naturel d'un aller-retour de devis, là où
WhatsApp remonte et se perd. WhatsApp reste dans le pied de page pour une
question rapide ; ce n'est pas le même moment.

Trois pièces :

- `buildMessage()` — le corps, inchangé dans sa logique ;
- `buildSubject()` — « Demande de devis Bali — Marie, Juillet 2027, 10 à 14
  jours ». L'objet dit l'essentiel avant l'ouverture : Agus trie sa boîte au
  premier coup d'œil ;
- `mailtoUrl()` — le lien. **`URLSearchParams` encode l'espace en `+`**, que
  les clients mail n'interprètent pas : on repasse en `%20`. Sans ça, le
  message arrive truffé de `+`.

**Limite assumée, et son garde-fou.** Un `mailto:` très long est tronqué par
certains clients, et un utilisateur de webmail sans client configuré ne voit
rien s'ouvrir. D'où le bouton **« Copier le message »** juste en dessous. En
production, un formulaire côté serveur enverrait le même texte — le corps est
déjà isolé dans `buildMessage()`, il n'y a que le transport à brancher.

### Les emplacements photo

`components/Photo.jsx` tient la place des vraies images. Deux partis pris :

1. **Le fond reste beau** — le placeholder n'est pas un rectangle gris, c'est
   l'illustration SVG déjà dessinée. La page ne se dégrade pas en attendant.
2. **Le placeholder porte le brief** — `brief` décrit la photo à prendre. La
   page *est* la liste des prises de vue à donner à Agus, au lieu d'une note
   perdue ailleurs.

Le jour où la photo existe : passer `src` (et `alt`). Rien d'autre à changer,
ni dans `Photo.jsx` ni chez les appelants. Les sept places secrètes portent
déjà leur `photo: { scene, brief, alt, src: null }` dans `lib/data.js`.

Le brief le plus important est celui du portrait : **tout le site dit « un
homme, pas une agence » et c'est le seul endroit où on peut le prouver.**

### La visionneuse

`components/Lightbox.jsx` — clic sur la photo d'une place secrète, plein écran,
et on passe de l'une à l'autre. Trois façons de naviguer parce qu'aucune ne
couvre tout le monde : swipe, flèches du clavier, boutons visibles.

**La photo et la case à cocher sont deux boutons frères, pas imbriqués.**
Un bouton dans un bouton est invalide et impraticable au clavier ; la carte
est donc un `<article>` qui contient les deux.

> **Piège corrigé, à ne pas réintroduire.** `touchend` lisait l'écart depuis
> l'état React. Sur un geste rapide, `touchmove` et `touchend` tombent dans le
> même tick et la mise à jour n'est pas encore commitée : le swipe était
> ignoré. L'écart vit maintenant dans une **ref** (la décision) *et* dans
> l'état (le rendu qui suit le doigt).

### Bali seulement — et ce qui a été mis de côté

Le parcours a été recentré sur Bali. Sont sortis de l'interface :

- les **quatre autres circuits** (Bali + Lombok, Bali + Java, Bali + Komodo,
  Flores + Komodo) ;
- la section **îles sœurs** et ses quatre extensions ;
- `Archipel.jsx`, la carte schématique de l'archipel, qui n'avait plus d'objet.

C'est provisoire. **Les données sont dans l'historique git**
(`git show <commit>:lib/data.js`) — les remettre prend cinq minutes, les
réécrire de mémoire produirait des prix faux. Ne pas les recomposer à la main.

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

### Ce qui a été supprimé, et pourquoi

**La section « Quatre moments, sur une quarantaine » (`EXPERIENCES`) n'existe
plus.** Trois de ses quatre entrées doublaient mot pour mot les journées :

| Expérience supprimée | Où elle vivait déjà |
| --- | --- |
| Les dauphins au lever du jour | journée « Le nord et les dauphins » |
| Cuisine et offrandes chez l'habitant | journées « Cuisine balinaise », « Vie balinaise », « Munduk » |
| À pied jusqu'à Tenganan | étape Sidemen du circuit de 15 jours |
| Chez le marionnettiste | **nulle part — récupéré comme 9ᵉ journée** |

Le vrai problème n'était pas la redondance mais ses conséquences : deux
mécaniques de sélection coexistaient (`selectedIds` et `dayIds`), le voyageur
cochait deux fois la même envie, et le message partait avec **deux
listes séparées**. Le store n'a plus qu'une mécanique. **Ne pas réintroduire un
catalogue parallèle aux journées.**

**Les trois harmonies (Tri Hita Karana) ont quitté la présentation.** C'était
la partie la plus conceptuelle de la page, et l'une des trois — « En direct,
sans agence » — redisait mot pour mot la section Engagement. Il reste un
visage, une voix, et deux détails concrets (le jepun, le canang sari) : de quoi
donner envie de partir avec lui sans en faire trop.

**Le bloc « Ce qu'Agus met dans presque tous ses circuits » (`SIGNATURES`) a
disparu.** Il redisait en quatre lignes ce que les fiches circuits montrent déjà
— le marionnettiste, la cuisine chez l'habitant, la marche vers Tenganan, la
pirogue de Tamblingan — juste après les avoir montrées. Une récapitulation
n'apporte rien à qui vient de lire.

**Les tarifs ont quitté la page d'accueil** pour `app/tarifs/page.js`. Ils y
étaient trop longs (2,4 écrans sur mobile) et surtout trop flous : la grille au
jour et par véhicule cohabitait avec les forfaits de circuit par personne, sans
que rien ne dise que ce sont deux modèles différents. L'`Engagement` les suit sur
cette page — le prix pose la question « où va mon argent ? », l'engagement y
répond — tout en restant aussi sur l'accueil.

La page d'accueil est passée de **23,6 à 14,7 écrans sur mobile**.

### Le prix d'un circuit ne se lit jamais seul

Les cartes affichent « à partir de 1 210 € — par personne, **hors
hébergement** ». Le nombre nu était la première source de malentendu : il ne
comprend pas les nuits d'hôtel, soit quatorze nuits pour le circuit de 15 jours.
La condition est collée au chiffre, et la fiche renvoie vers `/tarifs` par un
lien « Ce que comprend ce prix ». **Ne jamais afficher le montant sans sa
condition.**

### « Pas trop de détails » — la règle de la section Envies

Le brief est explicite : *le but n'est pas d'acter un circuit sur le site, mais
de donner envie de contacter Agus en ayant réfléchi au type de voyage qu'on
souhaite.* La section est donc **volontairement pauvre en détail** : un titre,
deux lignes, une case à cocher. Pas d'horaire, pas de prix à la journée, pas de
programme heure par heure.

Deux raisons, et elles tiennent :

1. Ce qui est faisable dans la journée **dépend de l'hôtel** où le voyageur
   loge. Publier un programme fixe, c'est promettre ce qu'on ne peut pas tenir
   depuis n'importe où sur l'île. Seul Agus peut trancher.
2. Quatorze activités sont affichées, `ACTIVITES_RESTE` mentionne les autres par
   région sans les détailler. La page reste lisible, et la conversation garde
   une raison d'exister.

L'épigraphe (`ACTIVITES_EPIGRAPHE`) est **d'Agus**, reprise telle quelle de sa
page Excursions : *« Être en vacances, c'est n'avoir rien à faire et avoir toute
la journée pour le faire. »* Elle donne le ton de la section mieux qu'une
promesse commerciale.

Cocher ne réserve rien : ça alimente `actIds` dans le store, et les
activités choisies partent dans l'e-mail, réparties selon leur
famille. C'est ce que le voyageur dira en ouvrant la conversation.

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
  repartir de zéro, et l'e-mail l'annonce comme telle — « Je pars de
  votre circuit X et j'aimerais l'adapter ».
- Les activités se cochent librement, et se cumulent avec le circuit pris pour
  base : prendre le squelette d'Agus n'interdit pas d'y ajouter ses envies.
- Le message part avec ce que le voyageur a **réfléchi**, pas avec ce qu'il a
  acheté.

Le voyageur reste l'auteur de son voyage. Toute évolution qui transformerait la
page en tunnel de réservation va contre le brief.

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
| L'app Next.js (racine) | L'implémentation componentisée de cette même maquette, en deux routes : `/` et `/tarifs`. |

Le site ayant désormais deux pages, la maquette simule les deux dans son fichier
unique : `<body data-view>` bascule entre `.view-home` et `.view-tarifs`, les
déclencheurs portant `data-goto`.

> Piège rencontré : le déclencheur s'appelait d'abord `data-view="tarifs"`.
> Comme l'état de vue vit sur `<body data-view>`, `closest('[data-view="tarifs"]')`
> remontait jusqu'au `<body>` lui-même — **chaque clic de la vue tarifs partait
> dans cette branche et se faisait `preventDefault()`**. Ne jamais donner à un
> déclencheur le nom de l'attribut d'état qui le contient.

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
| `--soleil` | `#f2b134` | Le safran des ombrelles et des offrandes | Éclaire — CTA du hero |
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
colonne de journées descend d'un cran, la colonne de texte d'Agus est poussée
sous son portrait, et les trois harmonies se répondent.

**Le portrait a été réduit** — colonne plus étroite, image moins haute, largeur
plafonnée sur mobile où elle s'étalait sur toute la page. Il tient encore
l'esprit du guide, il ne le monopolise plus. Le vide qu'il laissait à gauche a
servi : **les trois harmonies sont passées en pleine largeur** sous les deux
colonnes, au lieu de s'écraser sur trois colonnes de 200 px où chaque glose
partait sur deux lignes.

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

Trois pièges si l'audit est réécrit :

- Chromium sérialise `color-mix()` en **`color(srgb r g b / a)`**, composantes
  en 0–1. Les lire comme du 0–255 fait passer un fond ivoire pour du noir et
  produit des échecs fantômes.
- Le décoratif (`aria-hidden="true"`) doit sortir de l'audit : les séparateurs
  du bandeau défilant ne sont lus par personne, et les compter noie les vraies
  régressions.
- Ce qui est masqué par `hidden` (la visionneuse fermée) aussi, pour la même
  raison.

**Et un fond translucide au-dessus d'une illustration est indémontrable.** Le
bandeau « Photo à venir » était à 82 % d'opacité : selon la couleur de la scène
en dessous, le contraste pouvait passer ou non, et l'audit ne pouvait rien
conclure. Il est désormais opaque. Règle générale : **du texte au-dessus d'une
image ou d'une illustration exige un fond plein.**

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
  AboutAgus.jsx      storytelling + Tri Hita Karana
  Chemins.jsx        la fourche : partir du circuit, ou de ses envies
  Circuit.jsx        le circuit de 15 jours, déplié d'emblée
  Activites.jsx      classiques et places secrètes, cochables
  Tarifs.jsx         grille saisonnière, inclus et à régler sur place
  Engagement.jsx     où va l'argent, et pourquoi c'est un argument
  Photo.jsx          emplacement photo — placeholder porteur du brief
  Lightbox.jsx       visionneuse plein écran, swipe et clavier
  TripBuilder.jsx    configurateur + rédaction de l'e-mail
  MobileBar.jsx      rappel du voyage en cours, sur mobile
  Scene.jsx          paysages SVG + ornements (jepun, canang, séparateur)
  Reveal.jsx         apparition au scroll
  SectionHead.jsx    en-tête de section
lib/
  data.js            données de démonstration, îles sœurs, notes de saison
  trip-store.jsx     état partagé (Context + useReducer)
  message.js         objet, corps et lien mailto:
```

### État partagé

`lib/trip-store.jsx` expose `<TripProvider>` et `useTrip()` (React Context +
`useReducer`). `Activites` et `Circuit` y écrivent, `TripBuilder` et `MobileBar`
le lisent — cocher une activité met immédiatement à jour le récapitulatif, le
compteur et l'aperçu du message.

Le sélecteur `activites` **filtre `ACTIVITES` dans l'ordre de la liste**, pas
dans l'ordre des clics : le récapitulatif et le message se lisent comme la
page.

Pas de Zustand : un seul provider, un état plat, aucun besoin de sélecteurs ni
de persistance à ce stade. Un passage à Zustand ne toucherait que ce fichier.

### Ce qui se passe à la période choisie

`periodNote()` dans `lib/data.js` répond au mois sélectionné : saison sèche ou
des pluies, ce que ça change pour le Rinjani et Komodo, haute saison, et Nyepi
pour mars.

**Aucune date de cérémonie n'est codée en dur, et c'est volontaire.** Galungan
et Kuningan suivent le cycle pawukon de 210 jours et se déplacent chaque année ;
Nyepi suit le calendrier saka. Afficher un calendrier faux serait pire que de ne
rien afficher : le texte dit ce qui est fiable et renvoie à Agus pour le reste.
Si Agus fournit les dates exactes, elles se branchent dans cette seule fonction.

### Lien e-mail

`lib/message.js` compose l'objet et le corps, et le bouton pointe vers un
`mailto:`. **L'objet et le message sont affichés en clair au-dessus du
bouton** : on n'envoie rien que le voyageur n'ait pu relire.

L'adresse se change dans `lib/data.js` (`CONTACT.email`), le numéro WhatsApp
du pied de page dans `WHATSAPP_NUMBER`.

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

- Photos réelles d'Agus et des journées.
- Contenus définitifs : tarifs, disponibilités, mentions légales, RGPD.
- Pages de détail par circuit.
- Suivi de conversion sur le clic WhatsApp.
