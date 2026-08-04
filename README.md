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

### La voix : Agus parle, on ne parle pas de lui

Tout le site est à la **première personne**. « Je viens vous chercher à votre
hôtel », pas « Agus vient vous chercher ». La différence n'est pas cosmétique :
le site vend une personne, et parler d'elle à la troisième personne remet
exactement l'intermédiaire que la page passe son temps à nier.

Deux exceptions assumées :
- le **pied de page** et les **libellés d'interface**, qui sont la voix du site
  et non celle d'Agus ;
- dans les récits, le « **on** » collectif reste — « on marche trois heures »,
  « on déjeune de ce qu'on a fait ». Passer tout en « je » alourdirait ; le
  français préfère alterner. Règle : **« je » quand Agus agit, « on » quand
  l'expérience est partagée.**

### Les motifs sérigraphiés

Une trame très pâle court sur les fonds de section : le **tressage de la
feuille de palme**, celui du panier du canang sari. Opacité 3,6 à 4,2 % — elle
se lit comme un grain de papier, pas comme un décor. Un **filigrane de jepun**
occupe l'angle vide des grandes cartes de chemins.

**Trois règles à tenir :**

1. **Le motif est sur le fond de section, jamais sous un bloc de texte.** Les
   cartes gardent leur surface pleine. C'est là que la lisibilité meurt, et
   c'est aussi un angle mort de l'outil : **l'audit de contraste ne sait
   mesurer qu'une couleur de fond, pas une image**. Un motif sous du texte ne
   serait donc surveillé par personne.
2. **Pas de poleng.** Le damier noir et blanc a été essayé au début du projet
   et rejeté — « ça fait course automobile ». Ne pas y revenir.
3. **Pas de filigrane sur les petites cartes.** Essayé sur les cartes
   d'activités (84 px de haut) : invisible, et il frôlait le texte. Retiré.

### La présentation : une promesse, puis une fiche

L'argument n'est pas « voilà qui je suis » mais **« vous n'avez rien à
organiser »**. C'est ce qu'achète quelqu'un qui part à 12 000 km : pas une
biographie, la certitude qu'un professionnel diplômé prend tout en charge.

> « Libérez-vous de l'organisation. Je m'occupe de tout — vous n'avez plus
> qu'à profiter. »

Le paragraphe qui suit **énumère** ce que « tout » recouvre — véhicule,
carburant, assurances, parkings, entrées, guides de sentier obligatoires,
horaires, hôtels sur demande. Une promesse sans liste n'est qu'un slogan.

La **fiche d'identité** porte les faits qui lèvent le doute : certification,
ancienneté, langues, union, **famille**, véhicules. La famille y a basculé
depuis le récit : elle rassure comme une ligne d'état civil, elle diluait la
promesse en paragraphe.

En dessous, le **panneau jade des valeurs** ferme la section — voir « Les
valeurs » plus bas pour le partage des rôles entre ce qui est visible et ce qui
est replié.

**C'est un dépliant `<details>`, pas une modale ni une page.** Une modale
volerait le focus pour une liste qu'on veut survoler ; une page éloignerait les
faits de l'endroit où naît le doute. Le dépliant coûte un tap, se referme, et
marche au clavier sans une ligne de JS. Il économise **455 px de défilement**
sur mobile (99 px fermé contre 554 ouvert).

> **Condition non négociable : le résumé porte l'essentiel même fermé.**
> « Guide diplômé · 20 ans de métier · français et anglais » est lu par tous
> ceux qui n'ouvriront jamais le dépliant — et sur mobile, personne n'ouvre
> tout. Replier de la crédibilité derrière un clic sans résumé, c'est la
> perdre.

**Pourquoi pas une page `/agus`** : ces faits sont exactement ce qui rassure un
voyageur qui s'apprête à confier quinze jours à un inconnu. Les envoyer sur une
page à part, c'est les mettre là où personne ne va. Ils restent là où naît la
question.

### Les emplacements photo

`components/Photo.jsx` tient la place des vraies images. Deux partis pris :

1. **Le fond reste beau** — le placeholder n'est pas un rectangle gris, c'est
   l'illustration SVG déjà dessinée. La page ne se dégrade pas en attendant.
2. **Le placeholder porte le brief** — `brief` décrit la photo à prendre. La
   page *est* la liste des prises de vue à donner à Agus, au lieu d'une note
   perdue ailleurs.

Le jour où la photo existe : passer `src` (et `alt`). Rien d'autre à changer,
ni dans `Photo.jsx` ni chez les appelants.

**Les quatorze activités** — classiques comprises — portent une galerie de
trois prises : `photos: [{ scene, brief, alt, src: null }, …]` dans
`lib/data.js`. Les trois briefs ne se répètent pas : **un plan large, un
détail, une présence humaine**. Quarante-deux prises de vue décrites, une
commande photo utilisable telle quelle plutôt qu'une intention.

Le brief le plus important est celui du portrait : **tout le site dit « un
homme, pas une agence » et c'est le seul endroit où on peut le prouver.**

### La visionneuse

`components/Lightbox.jsx` — clic sur la vignette d'une place, plein écran, et on
passe d'une **photo de cette place** à l'autre. Trois façons de naviguer parce
qu'aucune ne couvre tout le monde : swipe, flèches du clavier, boutons visibles.

**Le swipe reste à l'intérieur de la place ouverte.** Une version précédente
faisait défiler les sept places entre elles : on partait regarder le grand
ficus et on se retrouvait à la saline sans l'avoir demandé. Changer de place
est une décision — elle se prend sur la page, en refermant, pas par accident au
bout d'un geste. La visionneuse reçoit donc `place` (une place) et non `items`
(toutes).

Sur une place à photo unique, les flèches et l'invitation au balayage
disparaissent : `seule` les masque plutôt que de proposer une navigation qui ne
mène nulle part.

**Deux gestes, deux zones.** Toute la carte ouvre le plein écran — récit
complet et défilé de photos. Un **« + » net à droite**, cerclé d'accent en
44 × 44, ajoute l'activité à la demande et devient une coche pleine une fois
choisie. C'est l'inverse de la version précédente, où la vignette ouvrait et le
texte cochait : **on découvre bien plus souvent qu'on ne sélectionne**, donc le
geste fréquent prend la grande surface et le geste rare une cible franche.

Corollaire à tenir : les deux boutons sont **frères dans un `<article>`**,
jamais imbriqués — un bouton dans un bouton est invalide et impraticable au
clavier.

**Une seule carte pour les deux familles.** Vignette carrée de 84 px, pastille
du nombre de photos, titre, et le texte coupé à trois lignes — calé sur la
hauteur de l'image, si bien que les cartes d'une même rangée font la même
taille. Deux gabarits distincts auraient laissé croire que les classiques
comptent moins, alors qu'elles sont souvent ce qui décide du voyage. Seule la
rubrique les sépare.

**Deux niveaux de texte, et c'est structurel.** `texte` est écrit pour la carte
(court, il sera coupé) ; `recit` pour le plein écran — le déroulé, ce qu'on
ressent, l'utile. Écrire un seul texte pour les deux, c'est le rendre trop long
pour la carte ou trop maigre pour l'écran.

> ⚠️ Les `recit` sont **rédigés à partir des pages d'Agus**, pas dictés par
> lui. Les faits en viennent, la mise en mots est de nous. À lui faire relire
> avant mise en ligne.

> **Piège Tailwind.** `line-clamp-3` pose `display: -webkit-box` ; une classe
> `block` sur le même élément l'écrase et **annule silencieusement la coupe**
> — six lignes s'affichaient au lieu de trois, et seule la mesure des hauteurs
> de cartes l'a montré. Ne pas remettre `block` à côté d'un `line-clamp`.

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

### Les valeurs — l'argument le plus fort, et il est de lui

`VALEURS` (dans `lib/data.js`) se lit **à l'intérieur de la présentation
d'Agus**, sur un panneau jade en bas de la section `#esprit`. C'était une bande
à part, posée après les tarifs ; elle est remontée parce que « pourquoi lui »
appartient à la personne, pas à une bande coincée avant un formulaire.

**Les valeurs sont visibles, les faits sont repliés — et pas l'inverse.** Les
deux registres ne font pas le même travail : les faits (diplôme, vingt ans,
langues, véhicules) **lèvent le doute**, on les consulte quand la question se
pose, donc le dépliant suffit ; les valeurs **créent la préférence**, elles ne
servent à rien si personne ne les lit. Remplacer les uns par les autres
perdrait la moitié du travail : qui ne fait pas confiance ne sera pas ému par
des valeurs, et qui fait confiance sans préférer ne réserve pas non plus.

Trois points, tous tirés des mots d'Agus :

- **Ma famille d'abord** — marié, trois enfants ; ce que vous payez les fait
  vivre, comme il fait vivre le chauffeur et les familles qui accueillent, pas
  une commission d'intermédiaire.
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

**Effet de bord à ne pas oublier** : la bande jade séparait « Vos envies » du
configurateur. Sans elle, deux fonds sable se touchaient — `TripBuilder` est
passé en `ground-ivoire` pour rendre l'alternance ivoire / sable / ivoire /
sable / ivoire.

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
sans agence » — redisait mot pour mot le panneau des valeurs. Il reste un
visage, une voix, et deux détails concrets (le jepun, le canang sari) : de quoi
donner envie de partir avec lui sans en faire trop.

**Le bloc « Ce qu'Agus met dans presque tous ses circuits » (`SIGNATURES`) a
disparu.** Il redisait en quatre lignes ce que les fiches circuits montrent déjà
— le marionnettiste, la cuisine chez l'habitant, la marche vers Tenganan, la
pirogue de Tamblingan — juste après les avoir montrées. Une récapitulation
n'apporte rien à qui vient de lire.

La page `/tarifs` porte un **sommaire** en tête — trois ancres vers la grille,
l'inclus/exclus et le « bon à savoir ». Attention au décalage : `html` porte
déjà `scroll-padding-top: 5rem`, qui dégage la navbar ; ajouter un
`scroll-margin` sur les cibles **double** l'écart et fait atterrir à 176 px au
lieu de 80. Ne pas cumuler les deux.

Les autres îles ne sont plus mentionnées dans les tarifs : les détailler là
rouvrirait une porte que le parcours a fermée. Une ligne renvoie à un échange
de vive voix.

**Les tarifs ont quitté la page d'accueil** pour `app/tarifs/page.js`. Ils y
étaient trop longs (2,4 écrans sur mobile) et surtout trop flous : la grille au
jour et par véhicule cohabitait avec les forfaits de circuit par personne, sans
que rien ne dise que ce sont deux modèles différents.

La page d'accueil est passée de **23,6 à 14,7 écrans sur mobile** au moment de
ce dégraissage. Elle est remontée à **17,7** depuis, avec l'ajout des « Us et
coutumes » — c'est le prix d'une section entière, et il est assumé ; mais le
compteur est là pour qu'on le voie, pas pour qu'on l'oublie. Le mesurer à
chaque ajout (390 × 844).

### Le prix d'un circuit ne se lit jamais seul

Les cartes affichent « à partir de 1 210 € — par personne, **hors
hébergement** ». Le nombre nu était la première source de malentendu : il ne
comprend pas les nuits d'hôtel, soit quatorze nuits pour le circuit de 15 jours.
La condition est collée au chiffre, et la fiche renvoie vers `/tarifs` par un
lien « Ce que comprend ce prix ». **Ne jamais afficher le montant sans sa
condition.**

### Les tarifs : trois façons de compter, annoncées avant les chiffres

Le reproche fait à cette page — « le détail sur le tarif n'est pas très
clair » — était le bon, et le diagnostic tient en une phrase : **trois modèles
de prix cohabitaient sans être annoncés.** La journée au véhicule (80 €), le
forfait de circuit au voyageur (1 210 €), le forfait Nusa Penida (230 € pour
deux). Le lecteur voyait ces montants sur le même écran et n'avait aucun moyen
de les rapprocher.

L'ordre de la page est désormais **quelles formules existent → laquelle vous
concerne → combien ça fait, en toutes lettres → ce qui s'ajoute** :

1. **`TARIFS.formules`** — trois cartes, avant le premier chiffre. C'est le
   bloc qui règle le malentendu ; ne pas le déplacer sous la grille.
2. **La grille**, avec sa légende (`grilleNote`). Les colonnes disent
   « 1 à 3 voyageurs » et non « 1 à 3 personnes » ; la légende répète que
   **le prix est du véhicule, pas de la tête**. Sans elle, l'en-tête se lit
   comme une tranche de prix par personne, soit l'inverse du modèle d'Agus.
3. **`TARIFS.exemple`** — le calcul posé : deux voyageurs, février, Ubud,
   trois journées, 240 €, soit 40 € par personne et par jour. **Un total en
   toutes lettres vaut mieux que trois paragraphes de méthode.** Ubud est
   choisi exprès : la région n'ouvre pas le supplément de nuitée, l'exemple
   reste donc un total complet.
4. **`TARIFS.supplement`** — sorti du « bon à savoir ». C'est le seul poste
   qui fait monter l'addition sans figurer au tableau ; enfoui dans une liste,
   il ressemblait à un détail, et une addition qui grimpe après coup est ce
   qui abîme le plus la confiance.

Le chapô ne dit plus « à deux comme à cinq, le tarif bouge à peine » — c'était
faux au sens strict (80 € contre 100 €). Il dit ce qui est à la fois vrai et
plus fort : **40 € par personne à deux, 20 € à cinq.**

**Sur mobile, la grille n'est plus un tableau qui défile latéralement.** Un
tableau de prix qu'il faut pousser du doigt pour voir la seconde colonne cache
exactement l'information qu'on est venu chercher. Sous 640 px, chaque saison
devient une carte où les deux prix sont côte à côte ; le `<table>` réapparaît
dès qu'il y a la place.

Coût assumé : la page passe de 4,4 à **7,0 écrans sur mobile**. C'est une page
de référence qu'on consulte avec un sommaire, pas une page d'accroche — la
clarté valait les deux écrans et demi.

### La navigation retour, et pourquoi ce n'est pas `history.back()`

Le lien « Retour à l'accueil » des tarifs renvoyait à `/`, c'est-à-dire **tout
en haut**. Quelqu'un qui consultait le prix depuis la fiche du circuit, à sept
écrans de défilement, se retrouvait devant le hero et devait tout refaire.

Le trajet aller mémorise donc sa section de départ — `/tarifs?de=circuit` — et
le retour ramène à cette ancre, avec le libellé qui va avec (« Retour au
circuit »). Le paramètre est posé au clic par `urlTarifs()`, qui lit la
section sous les yeux ; l'attribut `href` reste `/tarifs` tout court pour que
le clic milieu, « copier le lien » et les robots trouvent une URL propre.

> **Pourquoi pas `history.back()`**, qui restaurerait pourtant le défilement au
> pixel près : avec la navigation client de l'App Router, `document.referrer`
> garde la valeur du **chargement du document**, pas du dernier écran vu. Le
> test « d'où vient-on ? » y est donc faux précisément dans le cas courant —
> arrivée sur `/`, puis navigation douce vers `/tarifs`. Une ancre, elle, est
> vraie partout, se partage et survit à un rechargement.

Le retour est répété **en bas de page** : à sept écrans, remonter pour repartir
est le même défaut sous une autre forme.

`useSearchParams` fait basculer en rendu client tout ce qui se trouve sous la
frontière `<Suspense>` la plus proche, et sur une route prérendue **son absence
fait échouer le build**. `RetourLien` porte donc sa propre frontière, et son
repli n'est pas un squelette gris mais le lien correct par défaut : « Retour à
l'accueil » est vrai dans tous les cas où l'origine est inconnue.

### Us et coutumes — de l'immersion qui sert le jour même

Six usages balinais, entre « Vos envies » et la demande. La règle qui les
qualifie : **chaque entrée doit être immersive et utile le même jour.** Savoir
qu'on enjambe une offrande évite de la piétiner ; savoir pourquoi trois
personnes s'appellent Wayan évite de croire à un malentendu ; savoir que Nyepi
ferme l'aéroport change une date de billet. Une rubrique « culture » qui ne
sert à rien le jour même serait un dépliant d'agence.

C'est aussi le seul endroit où la culture travaille pour la conversion : le
nœud du selendang, les dates de Galungan, la préparation de Nyepi sont
exactement des choses qu'un guide règle et qu'une agence oublie.

Deux règles de rédaction :

1. **Ce sont des usages, pas des règles à faire respecter.** On dit ce qui se
   fait, jamais ce qu'il « faut » faire — personne n'a envie d'être corrigé
   avant d'avoir décollé.
2. **Rien qui engage Agus sur une date.** Galungan suit le cycle pawukon de
   210 jours, Nyepi le calendrier saka : les deux se déplacent chaque année.
   On dit ce que c'est et on renvoie à lui pour quand — même prudence que
   `periodNote()`.

La section est une **bande pleine bambou** : c'est la seule pause de la page,
et le trait fin des symboles tient mieux sur vert profond que sur ivoire.

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
| `--bambou` | `#476635` | Le vert de la canne mûre | **Toutes les actions** + les bandes pleines |
| `--bambou-deep` | `#2f4720` | La canne à l'ombre | Fonds les plus profonds |
| `--pousse` | `#628c56` | Le bambou jeune | **Le geste de cueillette** : la puce jepun des activités |
| `--soleil` | `#f2b134` | Le safran des ombrelles et des offrandes | Éclaire — CTA du hero, symboles sur bande pleine |
| `--lagon` | `#189aa4` | Le turquoise des passes et des lagons du nord | Illustrations |
| `--bougain` | `#c8455f` | Le rose des murs de Sanur | Étiquettes uniquement |
| `--ivoire` / `--sable` | `#fbf7ee` / `#f2e9d8` | Pierre et sable | Surfaces de lecture, en alternance |
| `--encre` | `#22302b` | | Texte |

**Le bambou a remplacé un jade froid** (`#0f6b5c`). Le remplacement s'est fait
**à valeur égale, pas à l'œil** : 6,10 sur l'ivoire contre 5,99 pour le jade,
5,05 pour le texte pâle des bandes pleines contre 4,89. Rien n'a bougé côté
lisibilité, seule la teinte est passée du côté chaud.

> **Le lagon, lui, reste froid, et c'est une décision.** Sans lui la page
> virerait au monochrome tiède, et surtout la mer serait fausse : un lagon vert
> chaud ne ressemble à rien de ce qu'on voit à Bali. Ne pas « harmoniser » le
> lagon avec le bambou.

**La pousse choisit, le bambou agit.** Deux tons du même végétal, deux rôles :
le bambou mûr porte les actions de la page (boutons, liens, base de circuit),
la jeune pousse le seul geste de cueillette — plus claire, elle sélectionne
sans trancher.

**Ce n'est plus un « + », c'est une fleur.** Le bouton de sélection porte une
**puce jepun** (`JepunPuce`, dans `components/Scene.jsx`) : cinq pétales,
contour quand l'activité n'est pas prise, pleine quand elle l'est. Le signe
mathématique disait « ajouter une ligne » ; la fleur dit **cueillir**, ce qui
est exactement le geste — et elle reprend le jepun déjà présent derrière
l'oreille d'Agus et dans le séparateur.

> **Sa valeur est fixée par la mesure, pas par l'œil — et le seuil a changé
> avec le glyphe.** Tant que c'était le caractère « + », c'était du **texte** :
> 4,5:1 exigé, et `#55793a` échouait à 4,45 (quatre centièmes sous le seuil ;
> seul l'audit l'a vu). Devenue une icône SVG, la puce est un **objet
> graphique** au sens de la WCAG 1.4.11 : le seuil tombe à **3:1**, ce qui
> autorise enfin un vert assez clair pour être zen. `#628c56` donne **3,44** sur
> le fond pâle et **3,63** sur l'ivoire. **Ne pas l'éclaircir sans remesurer** :
> `#6f9662` tombe à 2,99 et échoue.

Discipline : le bambou porte l'action, le soleil éclaire, le bougainvillier ne
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
avaient remplacé les trois puces d'argumentaire. Elles sont **sorties de la
page** au recentrage : c'était la partie la plus conceptuelle, et l'une des
trois redisait le panneau des valeurs. Le repère reste noté ici, il est bon à
reprendre si la présentation regagne de la place.

### La famille de symboles

`components/Symboles.jsx` porte neuf dessins balinais — tedung, penjor, candi
bentar, gong, poleng, padma, canang, rangs, nyepi. Ils suivent la règle ouverte
par la puce jepun : **un trait, la couleur héritée, aucun remplissage.** Ils se
posent donc partout où va une icône, prennent la couleur du texte qui les
entoure, et se mesurent comme des objets graphiques (3:1) et non comme du
texte.

Ils ne sont pas interchangeables : chacun désigne une chose précise, et chaque
endroit où l'un apparaît est un endroit où cette chose est **nommée dans le
texte**. Un symbole qu'on ne peut pas expliquer au lecteur est un motif de
brochure.

> **Un symbole qui a besoin de sa légende n'est pas un symbole, c'est une
> énigme.** Trois versions d'un « sarong » ont été dessinées puis jetées — le
> trapèze porté lisait un abat-jour, l'écharpe nouée un bonhomme bras écartés,
> le tissu drapé une jupe. Un vêtement porté ne tient pas dans 24 px de trait.
> L'usage qui en parle emprunte le candi bentar : c'est bien la porte qu'on
> s'habille pour franchir, et elle, elle se reconnaît. Mieux vaut neuf symboles
> qui parlent que dix dont un bafouille.
>
> Deux autres avaient le même défaut et ont été redessinés plutôt que jetés :
> les quatre rangs de naissance en barres croissantes donnaient un **graphique
> de statistiques** (ils sont devenus un cycle de quatre perles, ce qui dit en
> plus le retour à Wayan au cinquième enfant), et le tedung sans les festons de
> son bord donnait une **antenne**.

La vérification : les rendre à 150 px sur une planche de contact, puis à leur
taille réelle. Un dessin qui ne se lit qu'en grand n'est pas fini.

**La maquette les reçoit par extraction, jamais par recopie.** Le script de
portage lit `components/Symboles.jsx` et regénère le bloc `SYMBOLES` de
`design/prototype.html` entre deux marqueurs. Les deux fichiers ont déjà
divergé une fois sur les données d'activités, et ça ne se voit pas à la
relecture.

**Ornements balinais**, toujours expliqués au lecteur : le **jepun**
(frangipanier) derrière l'oreille d'Agus et en séparateur, une **branche de
jepun** qui déborde en haut du hero, le **canang sari** (l'offrande du matin),
le **tedung** (l'ombrelle à étages), le **candi bentar** et ses assises de
brique. Le vocabulaire suit — *subak*, *melukat*, *bumbu*, *songket*, *warung*,
et le *Om Swastiastu* du pied de page.

**L'alternance des fonds est une règle, pas un caprice** : ivoire, sable,
ivoire, sable, bambou, ivoire. Deux sections de même fond qui se touchent se
lisent comme une seule, très longue — c'est arrivé deux fois dans ce projet, à
chaque fois qu'une bande a été déplacée. Vérifier l'ordre dans `app/page.js`
après tout ajout ou retrait de section.

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

### Mobile — les seuils à tenir

Le site est vérifié à **320, 360, 390 et 414 px**. Quatre règles, toutes
mesurées, toutes à zéro défaut aujourd'hui :

| Règle | Seuil | Pourquoi |
| --- | --- | --- |
| Cibles tactiles | **44 × 44 px** | WCAG 2.5.5 / Apple HIG. Le minimum AA (2.5.8) est 24 px, mais 44 est le confort réel du pouce. |
| Champs de saisie | **16 px exactement** | En dessous, **iOS zoome à la mise au point** et recadre la page. Un `0.9375rem` suffit à déclencher le zoom. |
| Débordement horizontal | **0** | Un pixel de trop et la page se décale au moindre balayage. |
| Contraste | seuils WCAG | Inchangé, motifs compris. |

**Pièges rencontrés, à ne pas rejouer :**

- `.btn` tombait à **43 px** — un pixel sous le seuil, mais sous quand même.
  C'est `min-height: 44px` qui le garantit, pas le padding.
- Les liens de listes (navigation, pied de page) faisaient **20 px de haut**.
  L'exception « lien en ligne dans une phrase » de WCAG 2.5.8 **ne s'applique
  pas** à une liste de navigation : il leur faut `min-h-11`.
- Ajouter un bouton à côté du burger l'a **comprimé à 37 px** : `shrink-0` est
  obligatoire sur les cibles d'une barre flexible.
- Une règle `font-size` ajoutée **au-dessus** d'une autre dans le même bloc est
  écrasée par celle du dessous. Vérifier l'ordre, pas seulement la présence.
- **À 320 px, la barre du haut ne tient pas** avec logo + titre + sous-titre +
  bouton « Devis » + burger : 360 px de contenu dans 280 px utiles, et le
  burger sortait de l'écran. Les écarts se resserrent sous 640 px, le
  sous-titre « Guide francophone » disparaît sous 640 et le mot « Devis » sous
  380 — l'`aria-label` porte le sens, la cible reste 44 × 44. Le sous-titre est
  **masqué et non tronqué** : « GUIDE FRANCOPH… » a l'air d'un bug, l'absence
  non.
- **Une adresse e-mail est un mot insécable.** `agus.yudiarta@balidecouverte.fr`
  en petites capitales espacées fait **349 px** à lui seul : il poussait la
  colonne du configurateur hors de l'écran à 320 et 360 px, et c'était la
  dernière cause de débordement horizontal. Il lui faut `break-all` — et non
  `break-words`, qui **n'affecte pas le calcul de min-content** et ne change
  donc rien à un débordement de grille.

> **Comment trouver ce qui déborde**, parce que le repérage naïf ne marche pas.
> Lister les éléments dont le bord droit dépasse la fenêtre donne surtout des
> **faux positifs SVG** : les enfants d'un `<svg>` rapportent leur géométrie en
> espace utilisateur, et une branche de jepun qui déborde exprès sous un
> conteneur clippé apparaît dans la liste sans rien casser. La méthode qui
> marche : masquer chaque élément à tour de rôle et regarder si
> `document.documentElement.scrollWidth` diminue. Elle désigne le coupable
> réel, pas ses parents ni ses voisins.

**Le sur-mesure est à onze écrans de défilement.** Un bouton « Devis » compact
est donc visible dans la barre mobile en permanence : sans lui, quelqu'un qui
ne coche rien n'a aucune porte de sortie, la barre du bas ne sortant qu'une
fois une envie choisie.

**La visionneuse en paysage** bascule photo et texte côte à côte sous 560 px de
hauteur. Sans ça, la légende sortait de l'écran de 336 px, hors d'atteinte.

> **Tester la maquette en mobile demande une précaution.** `design/prototype.html`
> n'a **pas de `<head>`** — l'enveloppe de publication fournit la balise
> `viewport`. En local avec émulation mobile, le navigateur retombe donc sur une
> fenêtre de 980 px et **les requêtes média desktop se déclenchent**. Injecter
> `<meta name="viewport" content="width=device-width, initial-scale=1">` avant
> de mesurer, sinon les résultats sont faux.

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
  AboutAgus.jsx      la promesse, la fiche dépliable, le panneau des valeurs
  Chemins.jsx        la fourche : partir du circuit, ou de ses envies
  Circuit.jsx        le circuit de 15 jours, déplié d'emblée
  Activites.jsx      classiques et places secrètes, cochables
  Tarifs.jsx         trois formules, grille, exemple chiffré, supplément
  Usages.jsx         six usages balinais, sur bande pleine
  Symboles.jsx       les neuf symboles balinais au trait
  RetourLien.jsx     le retour des tarifs, vers la section d'origine
  LienTarifs.jsx     le lien vers les tarifs, lesté de sa provenance
  Photo.jsx          emplacement photo — placeholder porteur du brief
  Lightbox.jsx       visionneuse plein écran, swipe et clavier
  TripBuilder.jsx    configurateur + rédaction de l'e-mail
  MobileBar.jsx      rappel du voyage en cours, sur mobile
  Scene.jsx          paysages SVG + ornements (jepun, puce jepun, canang, séparateur)
  Reveal.jsx         apparition au scroll
  SectionHead.jsx    en-tête de section
lib/
  data.js            données de démonstration, îles sœurs, notes de saison
  trip-store.jsx     état partagé (Context + useReducer)
  message.js         objet, corps et lien mailto:
  retours.js         d'où l'on vient, et comment y retourner
```

> **`lib/data.js` ne se modifie pas au script sans vérifier après.** Une
> réécriture par tranche (`s[:i] + bloc + s[j:]`) a **avalé `HEBERGEMENT`** au
> passage : le build est tombé sur « Export HEBERGEMENT doesn't exist ». Deux
> règles depuis : rejouer la liste complète des **19 exports** après toute
> édition scriptée du fichier, et récupérer ce qui manque avec
> `git show HEAD:lib/data.js` — **jamais de mémoire**, les prix seraient faux.

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
