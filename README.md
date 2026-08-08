# Bali Découverte

Prototype de site pour **Bali Découverte** — voyages privés sur-mesure à Bali
avec Agus Yudiarta, guide balinais francophone indépendant.

L'objectif produit tient en une phrase : amener le visiteur à envoyer une
demande de devis **déjà rédigée** dans la messagerie du voyageur, sans formulaire, sans
compte, sans intermédiaire.

**Où en est le site.** Huit routes, un accueil de 12,4 écrans de mobile, une
maquette autonome à six vues, et un audit qui passe au vert sur les trois
largeurs. Ce qui manque tient en trois lignes : **les 42 photos** (les briefs
sont écrits, aucune image n'est posée), **la relecture d'Agus** sur les textes
rédigés d'après ses pages et les neuf trous de son portrait, et **six sujets
légaux** que lui seul peut renseigner. Voir « Reste à faire avant une mise en
production », en bas.

## Statut du contenu — à lire avant de reprendre le projet

Le site existant est **https://www.balidecouverte.fr/**. Il renvoie 403 à toute
récupération automatisée : le contenu ci-dessous a été fourni par copier-coller.

Le contenu est réparti sur cinq fichiers, et la nature des données n'y est pas
la même :

| Fichier | Ce qu'il porte | Nature |
| --- | --- | --- |
| `lib/data.js` | 20 exports — `CONTACT`, `AGUS`, `TARIFS`, `CIRCUITS`, `ACTIVITES`, `CHEMINS`, `VALEURS`, `USAGES`… | **Réel**, tiré des pages d'Agus. À ne corriger que sur son indication. |
| `lib/circuit.js` | `CADRE`, `JOURS` (15), `COMPRIS`, `NON_COMPRIS`, `TEMPS_FORTS` | **Réel** — c'est le devis d'Agus, mot pour mot. Un programme est un engagement : **ne pas embellir.** |
| `lib/temoignages.js` | `TEMOIGNAGES` (7), `TEMOIGNAGES_VEDETTE`, `LIVRE_OR` | **Réel**, fourni par le client. |
| `lib/portrait.js` | `UNION`, `HISTOIRE`, `QUESTIONS` | **Neuf trous** que seul Agus peut combler — cinq sur l'union, quatre sur son histoire. |
| `lib/legal.js` | `EDITEUR`, `ASSURANCE`, `MEDIATEUR`… | **Brouillon** : douze champs à `null`, sur six sujets, plus un acompte non confirmé (`acompteValide: false`). |

⚠️ **Ce qui n'est ni dans `data.js`, ni dans les pastes d'Agus, porte un
marqueur `<AComplete>`.** Les 14 textes `recit`, le bloc `VALEURS` et les
citations sont **rédigés d'après ses pages, pas dictés par lui** : à faire
relire avant mise en ligne.

> **Trois règles qui ne se négocient pas**, et qui ont chacune failli être
> enfreintes :
> **1.** Ne jamais inventer un témoignage ni une note. Les sept sont réels ;
> le JSON-LD ne porte **ni `aggregateRating` ni `reviewRating`**, parce que
> personne n'a donné d'étoiles — déduire « visiblement 5/5 » du ton
> fabriquerait une donnée que nul n'a produite.
> **2.** Ne jamais inventer un fait sur un homme réel. « Formé et enregistré à
> Bali » a été écrit puis retiré : ce n'était nulle part dans les sources.
> **3.** Les places secrètes se **nomment**, leur adresse et leur itinéraire ne
> se publient jamais. Elles existent parce que quelqu'un du pays y a ses
> entrées, et cessent d'exister le jour où on en publie l'accès.

### Le parcours : deux chemins, et un seul but

Le voyageur ne choisit pas un produit : il choisit **par où il entre dans la
conversation**. `CHEMINS` pose la fourche avant tout le reste :

| Chemin | Ce qu'il fait | Où il mène |
| --- | --- | --- |
| **Partir de mon circuit** | Le circuit de 15 jours devient la base (`baseCircuit`), à déformer. | `/circuit` — le jour par jour complet |
| **Partir de vos envies** | Les activités cochées deviennent le squelette du sur-mesure. | `/envies` — les 14 activités, cochables |

⚠️ **Les deux chemins ne sont plus des sections de l'accueil mais des pages**,
et c'est ce qui donne enfin un sens à la fourche — voir « La fourche coupe
enfin quelque chose ». `components/Chemins.jsx` ne porte que les deux cartes ;
le contenu vit dans `app/circuit/page.js` et `app/envies/page.js`.

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

### La présentation : une promesse, puis une préférence

L'argument n'est pas « voilà qui je suis » mais **« vous n'avez rien à
organiser »**. C'est ce qu'achète quelqu'un qui part à 12 000 km : pas une
biographie, la certitude que tout est pris en charge.

Le paragraphe **énumère** ce que « tout » recouvre — véhicule, carburant,
assurances, parkings, entrées, guides de sentier obligatoires, horaires, hôtels
sur demande. Une promesse sans liste n'est qu'un slogan.

Restent deux registres :

1. **La promesse** — ce dont on est déchargé.
2. **La préférence** — le panneau bambou : pourquoi lui plutôt qu'une agence.

#### Trois blocs de preuve se sont succédé ici, et il n'en reste aucun

Dans l'ordre : un dépliant « Fiche d'identité » de six faits repliés derrière un
`<details>` ; puis une phrase de trois lignes ; puis une ligne de quatre
mentions sous l'intitulé « Ce qui se vérifie ». Chacun est tombé pour la même
raison — il redisait ce qui était dit ailleurs.

Le dépliant portait cette condition écrite noir sur blanc : **« le résumé porte
l'essentiel même fermé »**. C'est elle qui l'a condamné : sur mobile personne
n'ouvre un dépliant, la page ne montrait donc en pratique **que** sa ligne de
résumé. La phrase, elle, répétait le bandeau du hero et le chapô de la section à
trois centimètres près — le diplôme s'annonçait **neuf fois** sur le site, et un
fait répété ne rassure pas davantage : il finit par sonner comme un argument de
vente. La ligne de mentions est tombée en dernier, après que le bandeau du hero
eut été retiré à son tour : à ce moment-là, elle était le doublon de `/agus`.

> ⚠️ **L'accueil ne dit donc plus nulle part qu'Agus est un professionnel
> certifié.** La preuve vit sur `/agus` — la fiche l'y développe — et dans le
> pied de page. C'est un choix assumé, et il a un coût qu'il faut connaître
> avant d'y toucher : **les deux liens vers le portrait sont devenus le seul
> chemin vers cette preuve** — celui sous la photo (« Mon portrait, ma famille,
> mon union ») et celui du bas de la présentation (« Mon parcours, mes diplômes,
> mes véhicules »), plus celui du panneau des valeurs. Les affaiblir couperait
> la réassurance du site ; les supprimer la supprimerait.
>
> Et **ne pas remettre un `<details>` ici.** Si un bloc devait un jour reporter
> ces faits, c'est qu'il porterait trop : le reste a une page.

### La voix : « mon », jamais « son »

Le site pose depuis le début qu'**Agus parle, et qu'on ne parle pas de lui**. La
règle avait fui à un endroit qu'on ne regarde jamais : les libellés de
navigation. La barre disait « Qui je suis », puis « Son engagement », puis « Mon
portrait » sous le libellé « Son portrait » — trois entrées côte à côte, deux
voix. Le visiteur ne se formule pas la raison, mais il enregistre qu'on lui
parle d'Agus par moments et qu'Agus lui parle à d'autres, et c'est exactement ce
que ferait un site tenu par un intermédiaire.

Tout est passé à la première personne — barre, menu mobile, pied de page,
libellés de retour, appels vers le portrait. Sur `/agus`, c'est là que ça compte
le plus : **une page de présentation écrite à la troisième personne est le signe
qu'un tiers l'a rédigée**, ce qui est l'inverse de ce que cette page prouve.

Deux endroits gardent volontairement la troisième personne, et il faut savoir
pourquoi : le **JSON-LD** (c'est une fiche d'entreprise lue par une machine, pas
une parole) et le **bandeau de travail** de `/agus` (il s'adresse à qui construit
le site, pas au voyageur).

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

- **Ma famille d'abord** — « **vous m'aidez** à faire vivre ma famille », et non
  « ce que vous payez les fait vivre » : la première formule met le voyageur en
  position d'**agir**, la seconde en position de **payer**. C'est la même
  transaction, ce n'est pas le même geste. Suit une phrase sur ce que « famille »
  veut dire ici — la cour où vivent plusieurs générations autour du temple des
  ancêtres, et non ce que le mot recouvre en France. La version longue (`texte`,
  lue par `/agus`) nomme le **tri hita karana**, les trois causes du bonheur :
  l'entente avec le divin, avec les autres et avec la terre.
  C'est un concept balinais documenté, nommé comme le sont le *canang sari* ou
  le *penjor* ailleurs sur le site — **on ne prête à Agus aucune parole qu'il
  n'aurait pas dite, on nomme une chose de son pays.**
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

**Le sommaire de `/tarifs` a été retiré.** Il listait « Les trois formules · Le
prix de la journée · Ce qui est compris » — soit les trois titres visibles trois
centimètres plus bas, sur une page qui en compte trois. Un sommaire sert quand
on ne voit pas la fin ; celui-ci retardait la première ligne utile d'un écran de
mobile. **Les ancres `#formules`, `#grille` et `#compris` restent posées sur les
titres** : elles ont pu être partagées ou envoyées par mail.

> Si un sommaire devait revenir un jour, attention au décalage : les cibles
> portent `[id] { scroll-margin-top: 5rem }` dans `globals.css`, qui dégage la
> navbar. Ajouter un `scroll-padding-top` sur `html` **doublerait** l'écart et
> ferait atterrir à 176 px au lieu de 80. Ne pas cumuler les deux.

Les autres îles ne sont plus mentionnées dans les tarifs : les détailler là
rouvrirait une porte que le parcours a fermée. Une ligne renvoie à un échange
de vive voix.

**Les tarifs ont quitté la page d'accueil** pour `app/tarifs/page.js`. Ils y
étaient trop longs (2,4 écrans sur mobile) et surtout trop flous : la grille au
jour et par véhicule cohabitait avec les forfaits de circuit par personne, sans
que rien ne dise que ce sont deux modèles différents.

La page d'accueil est passée de **23,6 à 14,7 écrans sur mobile** au moment de
ce dégraissage. Elle est remontée à **19,2** depuis, avec les « Us et
coutumes » puis le livre d'or — c'est le prix de deux sections entières, et il
est assumé ; mais le compteur est là pour qu'on le voie, pas pour qu'on
l'oublie. Le mesurer à chaque ajout (390 × 844).

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

Le chapô **annonce le pays, il ne s'excuse pas de la section.** Il disait
« Rien à réviser : je vous les raconte en route. Elles sont ici pour que le pays
ne soit pas une surprise muette » — deux phrases pour désamorcer une corvée que
personne n'avait redoutée, et qui ne disaient rien de Bali. Il dit maintenant
*« Bali est hindoue et le montre partout : sur les trottoirs, dans les cours, au
calendrier. Voici ce que vous croiserez. »* — un fait sur le pays, les trois
endroits où il se voit, et l'annonce de ce qui suit.

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

La formule exacte est posée à trois endroits, et les trois doivent rester
d'accord : la liste du non-compris de `lib/circuit.js` (« Vos hébergements —
mais je peux les choisir, vous les proposer et les réserver »), le dernier
paragraphe de `app/circuit/page.js`, et le bloc `HEBERGEMENT` que
`components/TripBuilder.jsx` affiche juste au-dessus de l'aperçu du message.
**Ne pas la réduire à « hébergements non compris »** : ce serait perdre
l'argument.

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

### « On l'ajuste ensemble » — pourquoi pas « déjà préparé »

La fourche disait « Partir de son circuit » et le bouton « Partir de ce
circuit ». Deux corrections y ont été apportées, et la seconde mérite d'être
tenue.

**« Mon » et non « son ».** Toute la page est à la première personne — c'est
même une règle inscrite plus haut dans ce fichier. La paire se lit désormais
*mon circuit / vos envies*, ce qui oppose enfin deux points de vue au lieu de
mélanger les deux voix.

**« On l'ajuste ensemble » plutôt que « déformez-le ».** La promesse n'est pas
que le circuit soit modifiable — n'importe quel voyagiste dit ça. Elle est
qu'Agus est dans la pièce quand on le modifie. C'est exactement ce qui le
distingue d'une agence, et ça n'était nulle part dans les mots du choix.

**Ce qu'il ne faut pas écrire : « mon circuit déjà préparé ».** La formule
vient naturellement, et elle coûte cher : « préparé » est le vocabulaire du
produit sur étagère, c'est-à-dire précisément ce que la section du circuit
passe son temps à démentir (« Ce n'est pas un produit sur étagère »). Ce qui
vaut, ici, ce n'est pas qu'Agus ait **préparé** cet itinéraire, c'est qu'il
l'ait **conduit** des dizaines de fois. Le texte dit donc « que j'ai déjà
conduits », et la promesse de co-construction est portée par le verbe qui
suit, pas par l'adjectif qui précède.

Le bouton passe de « Partir de ce circuit » à « **Commencer par ce circuit** » :
le verbe annonce qu'il y a une suite, et la suite est la conversation. Le
libellé une fois choisi reste court (« C'est ma base de départ ») — c'est un
état, pas une phrase, et il doit tenir sur une ligne à 320 px.

### Le champ libre

Tout le configurateur ne sait poser que des **questions fermées** : des listes,
des compteurs, des cases à cocher. C'est ce qui le rend rapide, et c'est aussi
sa limite — sans case vide, le voyageur doit faire entrer sa demande dans
celles qu'on a prévues, et **ce qui n'y entre pas se perd**. Or c'est presque
toujours là que se trouve ce qui fait le voyage : un anniversaire, un genou qui
ne fait plus les marches, un bébé, un lieu vu quelque part dont on ne connaît
pas le nom.

Trois choix à ne pas défaire :

- **L'exemple est au-dessus du champ, pas dedans.** Un `placeholder` s'efface à
  la frappe, c'est-à-dire au moment précis où on en aurait besoin. La ligne
  d'aide est un vrai paragraphe, relié par `aria-describedby`.
- **`maxlength="1200"`.** Le message part par `mailto:`, et une URL trop longue
  est tronquée sans avertissement par certains clients. 1 200 caractères
  laissent de quoi écrire sans risquer de perdre la fin. Le jour où un
  formulaire serveur remplacera le `mailto:`, cette limite peut sauter.
- **Le texte est repris tel quel**, sauts de ligne compris, sous « ✍️ Ce que je
  voulais vous dire ». Le reformater serait réécrire ce que le voyageur a
  voulu dire. Il est placé **après** les cases cochées et **avant** la demande
  de devis : il commente ce qui précède et c'est la dernière chose lue.

Le champ nom demande désormais **prénom et nom** (`autocomplete="name"`) : le
message devient un devis, puis une réservation, puis un nom sur un vol
intérieur et sur une fiche d'hôtel. Le demander ici évite un aller-retour de
mail, et l'objet du message reste retrouvable dans la boîte d'Agus six semaines
plus tard. Il reste facultatif — rien ici n'est un formulaire à valider.

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
- Une incohérence relevée **sur le site actuel**, à corriger à la source :
  « Munduk (centre-nord de Java) » — Munduk est à Bali.
- ~~L'Avanza annoncée à « 3 personnes » et à « 4 personnes » sur la même page.~~
  **Réglé** : la page du circuit dit « 4 personnes (y compris moi-même) » à un
  endroit et « 3 personnes avec les valises » à un autre. C'est la même chose
  dite deux fois. `AGUS.vehicules` tranche depuis toujours dans le bon sens —
  « 4 personnes chauffeur-guide compris » — et `lib/circuit.js` reprend la même
  formule. **Ne jamais écrire « 4 voyageurs »** : ce serait faux d'un siège.
- **Mentions légales, CGV, politique de confidentialité, conditions
  d'annulation** : absentes du site actuel, obligatoires pour une clientèle
  française.

## Deux livrables

| Fichier | Rôle |
| --- | --- |
| `design/prototype.html` | Maquette autonome, un seul fichier, ouvrable directement dans un navigateur. Polices intégrées en base64 : aucune requête sortante. Sert à valider la direction artistique sans rien installer. |
| L'app Next.js (racine) | L'implémentation componentisée de cette même maquette, en **huit routes**. |

### Les huit routes, et les six vues qui les simulent

| Route | Ce qu'on y trouve | Vue de la maquette |
| --- | --- | --- |
| `/` | Hero, présentation, valeurs, la fourche, us et coutumes, témoignages, configurateur | `home` |
| `/circuit` | Le jour par jour des 15 jours, le cadre, le compris/non-compris | `circuit` |
| `/envies` | Les 14 activités cochables, classiques et places secrètes | `envies` |
| `/agus` | Le portrait : son parcours, sa famille, son pays, son union | `portrait` |
| `/tarifs` | Les trois formules, la grille par saison, le compris | `tarifs` |
| `/livre-d-or` | Les sept témoignages réels, en entier | `livre` |
| `/cgv`, `/mentions-legales` | Les pages légales, encore en brouillon | *(aucune)* |

La maquette simule les six premières dans son fichier unique : `<body data-view>`
bascule entre `.view-home`, `.view-circuit`, `.view-envies`, `.view-portrait`,
`.view-tarifs` et `.view-livre`, les déclencheurs portant `data-goto`. Les deux
pages légales n'y sont pas : ce sont des documents de travail, pas des écrans à
valider visuellement.

> **À six vues, écrire les règles d'affichage en toutes lettres plutôt qu'en
> négation.** « Tout sauf la vue courante » est déjà illisible à trois, et
> devient une source de bugs muets à six : un bloc oublié dans la négation
> s'affiche sur cinq écrans où il n'a rien à faire.

> Piège rencontré : le déclencheur s'appelait d'abord `data-view="tarifs"`.
> Comme l'état de vue vit sur `<body data-view>`, `closest('[data-view="tarifs"]')`
> remontait jusqu'au `<body>` lui-même — **chaque clic de la vue tarifs partait
> dans cette branche et se faisait `preventDefault()`**. Ne jamais donner à un
> déclencheur le nom de l'attribut d'état qui le contient.

> ⚠️ **Retirer du balisage sans retirer son rendu tue tout ce qui suit.**
> `renderCircuit()` écrivait encore dans un `#circuitUn` supprimé de la
> maquette : la fonction levait une exception, et **toutes les fonctions de
> rendu appelées après elle ne s'exécutaient plus** — jour par jour vide,
> portrait vide, envies à moitié remplies. Aucun message visible, juste des
> écrans creux. Après toute suppression de balisage dans la maquette, ouvrir la
> console **et** parcourir les six vues.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

**Pour un lien de relecture** (Agus, un proche, n'importe qui) : rien à poser.
Le site part alors en `noindex` complet, ce qui est le comportement voulu — voir
« Le garde-fou d'indexation ». Le seul réglage utile est de faire pointer les
canoniques sur le domaine de test :

```bash
NEXT_PUBLIC_SITE_URL=https://mon-domaine-de-test npm run build
```

**Pour la vraie mise en production**, et une seule fois : `.env.example` donne
les deux variables à poser. Il n'y a pas de troisième configuration valide.

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

### La barre réchauffée — et pourquoi pas le soleil plein

La demande était « le même fond que le bouton *Créer mon voyage* », c'est-à-dire
le **soleil plein**. Mesuré, il coûtait trop cher :

| | sur soleil plein | sur soleil à 12 % |
| --- | --- | --- |
| Texte encre | 7,28 ✅ | **12,06** ✅ |
| Bouton « Devis » (bambou) | 3,45 — passe, mais vert saturé sur jaune saturé | **5,72** ✅ |
| **Le CTA soleil** | **1,00 — il disparaît** | 1,66 (hors barre) |

Ce n'est donc pas un problème de lisibilité du texte : c'est que **le soleil est
la couleur de l'action sur ce site**, pas une surface. Le README le pose depuis
le début — *« le bambou porte l'action, le soleil éclaire »*. Peindre une surface
en soleil ne change pas une teinte, ça change **le rôle** d'une couleur, et
oblige à repeindre le bouton le plus important du site pour qu'il reste visible.

**À 12 %, il réchauffe sans prendre ce rôle.** Le fond de barre vaut `#faefd8`,
tout passe, et rien d'autre n'a eu à bouger.

> ⚠️ **Ne pas monter le taux sans remesurer le CTA.** C'est le seul garde-fou :
> le texte de la barre restera lisible très longtemps avant que le bouton ne
> redevienne visible.

### Le hero porte maintenant deux photos

Dans l'ordre : le titre, puis **un bloc photo d'Agus à gauche / texte à droite**,
puis **la photo du pays**, puis les boutons. On montre ce qu'on vend au moment
exact où l'on demande de cliquer.

**Le sous-titre a déménagé dans le bloc, il n'est pas en double.** Poser une
photo d'Agus sous un paragraphe déjà écrit à la première personne, puis répéter
ce paragraphe à côté d'elle, aurait fait dire deux fois la même promesse à trois
centimètres d'écart.

> ⚠️ **Le visage d'Agus apparaît maintenant deux fois sur l'accueil** — ici en
> petit, et un écran plus bas dans l'arche de la présentation. C'est assumé mais
> ce n'est pas gratuit : **si la page doit maigrir, la question se pose ici**,
> pas dans la présentation, qui est le seul chemin vers `/agus`.

**La photo du pays est un bandeau au-delà de 768 px, et ce n'est pas
cosmétique.** En 16/9 sur toute la gouttière elle faisait **639 px de haut à
1280** et portait le hero à 1 449 px : le CTA tombait très loin sous la ligne de
flottaison. En 2,4/1 elle perd 473 px, garde tout son sujet — c'est un paysage
horizontal, le ciel et l'herbe se rognent sans rien perdre — et le hero
redescend à 1 291 px. Sur mobile le 16/9 reste : à cette largeur, un bandeau
serait une fente.

> Le CTA du hero reste sous la ligne de flottaison sur grand écran, et c'est
> acceptable : **la barre collante porte « Demander un devis » en permanence**,
> donc il y a toujours un appel à l'action visible.

### Le hero : une compétence plutôt qu'une opposition

Le titre disait « Bali loin des **foules**. Votre guide **privé francophone
local**. » Il dit « Bali loin des **sentiers battus**. Votre guide **local
francophone privé**. » Deux déplacements, et le second n'est pas cosmétique :
« loin des foules » décrit ce qu'on fuit, « hors des sentiers battus » décrit ce
qu'on trouve — et c'est la formule d'Agus lui-même, celle de sa présentation.

⚠️ **La chute du sous-titre a changé d'argument, et c'est le point à connaître.**
Elle disait « c'est à moi que vous écrivez, pas à une agence » ; elle dit « je
connais bien mon île ». On troque une **opposition** contre une **compétence**.

Le hero y gagne : opposer sans preuve, au premier écran, oblige le lecteur à
croire sur parole quelqu'un qu'il ne connaît pas encore. La preuve existe
désormais — Agus a raconté son passage en agence — mais elle est sur `/agus`, à
sa place, développée. Au premier écran, « je connais bien mon île » est vérifiable
par tout ce qui suit ; « pas une agence » ne l'est pas encore.

> **Conséquence : le premier écran ne dit plus qu'il n'y a pas
> d'intermédiaire.** L'argument vit dans le panneau des valeurs, plus bas sur la
> même page, et en entier sur le portrait. Si le hero devait le redire un jour,
> ce serait la troisième fois — voir « Neuf fois “guide diplômé” » pour ce que ça
> coûte.

### La marque — le vrai logo d'Agus, vectorisé

`public/logo.svg`, monté par `components/Marque.jsx`. **Ce n'est pas un
redessin** : le tracé suit le fichier qu'Agus a fourni, couche de couleur par
couche de couleur.

Deux choses ont occupé cette place avant lui, et aucune n'était la sienne. Un
**dessin générique** — un disque, deux feuilles et un trait — dont l'une des
feuilles était peinte en `#d96b43` : une couleur absente de tous les jetons de
la palette, survivante de la direction abandonnée avant le bambou, restée en dur
dans le seul fichier où personne ne relisait les couleurs, et affichée sur les
huit pages. Puis un **redessin à la main**, fait faute de fichier source. Les
deux sont dans l'historique git ; il n'y a pas de raison d'y revenir.

#### Comment il a été produit, pour pouvoir le refaire

Le PNG source est propre, mais l'anticrénelage y fabrique **2 500 couleurs** :
le tracer tel quel donne 1,2 Mo et 2 753 chemins. La chaîne qui marche :

1. **Postériser sur les 7 couleurs réelles** — vert, vert foncé, beige, brun,
   gris, jaune, jaune pâle — par plus proche voisin pondéré comme la luminance
   perçue. Sans la pondération, le beige et le brun s'échangent sur les pixels
   d'anticrénelage.
2. **Un masque binaire par couleur, tracé séparément** (vtracer, mode `binary`,
   `spline`). C'est ce qui garantit exactement 7 aplats : le mode couleur, même
   sur une image déjà postérisée, en ressortait 94.
3. **Réassembler en `<g fill>`**, du fond vers les contours, coordonnées
   arrondies au dixième, sur une source réduite à 512 px.

Résultat : **124 chemins, 7 couleurs, 80 ko** — 28,6 ko une fois compressé.

> ⚠️ **Chaque `<path>` de vtracer porte son propre
> `transform="translate(...)"`.** Extraire les seuls attributs `d` fait tout
> s'effondrer sur l'origine. C'est arrivé, et le résultat ne ressemblait pas à
> un logo cassé mais à un tas de traits — on cherche la cause dans le tracé
> alors qu'elle est dans le réassemblage.

#### Pourquoi un `<img>` et non un SVG en ligne

Le reste des dessins du site est inliné, et c'est le bon choix pour eux : des
symboles de quelques centaines d'octets qui héritent de `currentColor`. Le logo
est l'inverse des deux. **Il pèse 80 ko** — inliné, il repartirait dans le HTML
des huit pages à chaque visite ; en fichier, le navigateur le télécharge une
fois. Et **il ne doit hériter d'aucune couleur** : un logo garde les siennes
partout, c'est ce qui en fait un logo.

`alt=""` et `aria-hidden` : le nom est écrit en toutes lettres dans le même
lien, un texte de remplacement le ferait annoncer deux fois.

> **La maquette, elle, l'inline** — c'est un fichier autonome, elle ne peut rien
> référencer de l'extérieur, comme pour ses polices en base64. Ne pas recopier
> ce choix dans l'app.

> ⚠️ **Le logo n'est pas carré** : son `viewBox` fait 512 × 519. Poser
> `height = width` l'écrase de 1,4 % et réserve la mauvaise boîte. Les deux
> dimensions doivent être posées en attributs — sans elles, le navigateur
> réserve zéro pixel et toute la barre saute à l'arrivée du fichier.

**Le favicon est le logo lui-même** (`app/icon.svg`), à deux écarts près : un
`viewBox` élargi pour de l'air autour du dessin, et un fond ivoire arrondi sans
quoi les parties claires disparaissent sur un onglet en thème sombre. Il portait
avant un jepun de substitution, et avant lui **le logo du gabarit Next.js** —
l'onglet du navigateur affichait Next sur le site d'Agus.

### Le piège de l'en-tête : `flex-shrink`, qui ne se voit pas à la mesure

Quatre défauts d'affichage ont été trouvés dans la barre, **tous les quatre
présents à toutes les largeurs, y compris 1920 px où elle est à moitié vide**.
Ce n'étaient donc pas des manques de place, et c'est ce qui les rendait
difficiles à croire :

- Tous les libellés de deux mots se cassaient en deux lignes — « Qui je /
  suis », « Mon / engagement ».
- Le bouton affichait « Demander un / devis ».
- Le sous-titre affichait « GUIDE FRANCOPHO… ».
- À 1024 px, le **nom du site** se tronquait en « Bali D… ».

Les trois premiers ont la même cause : ce sont des éléments d'un conteneur
`flex`, donc ils portent `flex-shrink: 1` et **se rétrécissent jusqu'à leur mot
le plus long** avant que le conteneur ne déborde. D'où `whitespace-nowrap` sur
les liens et sur le bouton.

> **Ce défaut ne se voit pas à la mesure.** `min-h-11` impose 44 px à chaque
> lien : la hauteur ne bouge pas quand le texte passe à deux lignes, et un
> audit qui compare des hauteurs ne voit rien. Ce qui l'attrape, c'est le
> nombre de **boîtes de ligne** — `document.createRange()` sur le contenu, puis
> `getClientRects().length`. Sur un conteneur `flex`, viser le **nœud texte**
> et non l'élément : un élément flex rend une boîte par enfant, ce qui donne
> trois « lignes » pour un bouton parfaitement sur une seule.

Le sous-titre, lui, débordait de 2 à 4 px parce que `.label` porte
`letter-spacing: 0.16em` **qui s'applique aussi après la dernière lettre** —
assez pour déclencher l'ellipsis, pas assez pour que rien dépasse vraiment. Une
marge négative a été essayée : elle rétrécit aussi le conteneur, si bien que le
déficit se divisait par deux à chaque essai sans jamais s'annuler. `truncate` a
donc été remplacé par le seul `whitespace-nowrap` — plus d'`overflow: hidden`,
donc plus d'ellipsis possible, et deux pixels qui débordent d'une boîte sans
bordure ne se voient pas.

**Et la barre de liens est passée de `lg` (1024) à `xl` (1280).** Entre les
deux, elle affichait six liens, le bouton entier et le burger : le budget était
dépassé de plusieurs dizaines de pixels et le bloc de marque tombait à 122 px
pour 202 px de contenu. Un site dont l'en-tête n'arrive pas à écrire son propre
nom a un problème plus grave que l'absence de liens — et le menu est disponible
à toutes les largeurs, donc rien n'est perdu dans la bande 1024–1279.

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

### Ce que l'accueil a rendu au portrait

Une fois `/agus` en place, la présentation de l'accueil portait deux fois la
même charge. Elle est passée de **3,45 à 2,55 écrans mobiles** (−26 %), et la
page entière de 19,4 à 18,5 — sans qu'aucun argument ne disparaisse du site.

Quatre coupes, et chacune a sa raison propre. C'est ce qui les distingue d'un
dégraissage à la louche :

- **La citation de travail est supprimée**, pas déplacée. « Libérez-vous de
  l'organisation. Je m'occupe de tout » disait mot pour mot ce que le chapô de
  la section dit six centimètres plus haut. C'était la même promesse deux fois
  — et c'était l'un des deux seuls textes encore inventés de la page. La retirer
  enlève une redite **et** une chose à faire relire par Agus.
- **Les deux paragraphes fusionnent.** Le premier donne la liste concrète (le
  véhicule, le carburant, les assurances, les guides de sentier) ; le second ne
  faisait que la commenter.
- **Le canang du tableau de bord part sur `/agus`.** Il était en triple : là,
  sur la page portrait, et dans l'usage « les offrandes au sol » de la section
  Us et coutumes.
- **L'explication du jepun part aussi.** Trois lignes d'atmosphère au milieu du
  chemin de quelqu'un qui n'a encore rien décidé ; le lecteur qui veut savoir ce
  qu'est cette fleur est exactement celui qui clique sur le portrait.

Et une réduction plutôt qu'une coupe : **le panneau des valeurs a deux
longueurs.** `VALEURS.points[].court` sur l'accueil, `.texte` sur `/agus`. Ce
n'est pas un raccourci d'affichage mais une répartition du travail — sur
l'accueil, ces trois points doivent créer la préférence en un coup d'œil, au
milieu d'une page qui doit encore présenter un circuit, des envies et un
formulaire ; sur le portrait, ils sont le sujet, et la version longue est ce
qu'on est venu lire. ⚠️ **`court` n'est pas une troncature de `texte`** : chaque
version est une phrase entière et vraie. Découper `texte` à l'exécution
couperait au milieu d'une proposition.

L'icône des trois points est passée sur la ligne du titre : empilée au-dessus,
elle coûtait une ligne par point pour une information qui n'en vaut pas une.

**Ce qui n'a pas bougé, et ne doit pas bouger** : le chapô de la section (c'est
la promesse), la photo (c'est l'homme), le dépliant « fiche d'identité » (c'est
ce qui lève le doute), et les trois titres des valeurs. Réduire le panneau à ses
seuls titres en ferait un mur de slogans.

### La fourche coupe enfin quelque chose

L'accueil annonçait deux chemins — le circuit ou les envies — et les déroulait
**tous les deux immédiatement en dessous**. Ce n'était pas une fourche : c'était
un sommaire décoratif posé au-dessus de son propre contenu, et cinq écrans et
demi de mobile. Un choix qui ne coupe rien n'est pas un choix.

Chaque carte mène désormais à sa page : `/circuit` et `/envies`. **L'accueil
passe de 17,9 à 12,4 écrans mobiles** (−31 %), et de 11,3 à 8,0 sur grand écran.
Les allègements qui ont suivi (bandeau du hero, ligne « Ce qui se vérifie »,
sommaire des tarifs) l'y ont maintenu ; `/tarifs` est à 6,8 écrans mobiles,
`/agus` à 8,3, `/envies` à 5,1 et `/circuit` à 13,0.

#### Ce que ce déplacement exige en retour

⚠️ **Les cartes doivent montrer, pas annoncer.** Quelqu'un qui descend l'accueil
sans cliquer ne verra plus jamais ni le circuit ni les places secrètes —
c'est-à-dire ni le travail d'Agus ni ce qui le distingue d'une agence. Chaque
carte porte donc :

- **trois chiffres** en petites capitales (`15 jours · 7 étapes · 1 210 € /
  pers.`, `7 classiques · 7 places secrètes`) — c'est ce qu'on lit en balayant,
  et c'est ce qui fait choisir ;
- **trois noms de lieux** sous un filet (« le grand ficus de Munduk, la saline de
  Pemuteran, les rizières de Blimbing »). « Voir les envies » ne donne envie de
  rien ; « le grand ficus de Munduk » si.

Les nombres d'activités sont **comptés**, pas écrits : une place ajoutée à
`ACTIVITES` se voit sur la carte sans qu'on pense à mettre un chiffre à jour.

Le jour où quelqu'un réduit ces cartes à un titre et un bouton, on aura remplacé
deux sections riches par deux portes fermées.

#### Le chapô

Il disait : « Rien de ce que vous cochez ici n'est réservé. C'est la matière de
votre premier message — de quoi que je sache qui vous êtes avant de vous
répondre. » Il répondait à une question qu'on ne se pose pas encore (« est-ce que
je m'engage ? ») sans jamais répondre à celle qu'on se pose (« entre quoi et quoi
est-ce que je choisis ? »), et sa dernière proposition n'était même pas
grammaticale. L'ordre est maintenant celui de la décision : **entre quoi on
choisit, où ça mène, et seulement ensuite que rien n'engage.**

#### Le piège qu'il fallait désamorcer d'abord

Découper en pages ne marche que si **l'état survit à la navigation**. Le
`TripProvider` vivait dans `app/page.js` : cocher trois places sur `/envies` et
revenir au formulaire aurait tout effacé, puisqu'un provider posé dans une page
est recréé à chaque changement de route.

Il est donc remonté dans `app/layout.js`. Deux conséquences à retenir :

- ⚠️ **Tout lien interne passe par `next/link`.** Un `<a href="/…">` provoque un
  chargement complet, et un chargement complet recrée le gabarit — donc vide le
  magasin. Le bug s'est produit exactement là : le bouton « préparer ma demande »
  d'`/envies` était un `<a>`, et les envies cochées disparaissaient en route. La
  règle vaut aussi pour les liens qui ne pointent que vers une ancre : depuis une
  autre page, ils deviennent « /#ancre ».
- Limite connue et assumée : un **rechargement complet** vide la sélection. Le
  jour où ça gêne, la réponse n'est pas de déplacer le provider mais de le
  doubler d'un `sessionStorage`.

#### L'autre piège, dans la maquette

Retirer le balisage d'une section **sans retirer son rendu**. `renderCircuit()`
écrivait dans `#circuitUn`, supprimé avec la section : l'appel restant levait une
exception et **tout ce qui le suivait dans `render()` ne s'exécutait plus** — le
jour par jour, le portrait, les envies. Les vues s'affichaient à moitié vides
sans qu'aucune erreur ne soit visible à l'œil.

### Le sous-titre du hero

Il disait : « Circuits 100 % sur-mesure, authenticité garantie et 0
intermédiaire. Vous m'écrivez directement — je suis guide balinais
indépendant. » Trois formules de brochure en une ligne — et **« authenticité
garantie » est exactement le genre de promesse qu'aucune agence n'a jamais tenue
en la prononçant.** Un chiffre rond ne prouve rien ; une liste de choses dont on
est déchargé, si.

> Détendez-vous, je m'occupe de tout : le véhicule, les horaires, les entrées,
> les bons jours pour chaque endroit. Je suis balinais et indépendant — c'est à
> moi que vous écrivez, pas à une agence.

Deux registres, dans cet ordre : **le soulagement d'abord** (c'est ce qu'on
achète en partant à 12 000 km), **l'indépendance ensuite** (c'est ce qui fait
choisir lui). La liste concrète est ce qui empêche « je m'occupe de tout » de
n'être qu'un slogan de plus.

### Le bouton qui devient inerte au deuxième appui

Un bug qu'on ne trouve qu'en le vivant, et qui touchait le bouton le plus
important de la version mobile. On coche deux places sur `/envies`, on touche
« Ma demande », on atterrit sur `/#sur-mesure`. On remonte lire quelque chose,
la barre du panier est toujours là, on la retouche… **et rien ne se passe.**

La cause vaut d'être retenue parce qu'elle ne dépend pas de la bibliothèque :
**naviguer vers le fragment sur lequel on est déjà n'est pas une navigation.**
Ni `<Link>` ni un `<a>` géré par le routeur n'émettent quoi que ce soit, donc
aucun défilement. Le bouton fonctionnait une fois, puis mourait — et c'était
invisible en test, parce qu'on ne teste jamais deux fois d'affilée.

`lib/ancre.js` force donc le défilement à la main quand on est déjà sur la bonne
page. Trois détails :

- **`history.replaceState`, pas `pushState`.** Réappuyer sur un bouton qui ne
  change pas de page ne doit pas empiler une entrée d'historique — sinon le
  bouton « retour » du téléphone ne fait plus que remonter les allers-retours
  qu'on vient de faire.
- **Le clic milieu et ctrl/cmd/maj-clic ne sont jamais interceptés.** On ne se
  met pas en travers d'un « ouvrir dans un nouvel onglet ».
- Le décalage sous la barre collante vient de `[id] { scroll-margin-top }` et le
  défilement doux de `html { scroll-behavior }` — **ne rien ajouter** dans le
  gestionnaire.

Le correctif est appliqué partout où un lien peut viser l'ancre courante : la
barre du panier, les six liens de la barre du haut, les neuf plaques du menu, et
les deux boutons « Demander un devis ».

Dans la maquette, le même bouton cumulait les deux problèmes : depuis la vue des
envies, `#sur-mesure` ne mène nulle part puisque la section n'est pas affichée.
Il porte donc `data-goto="home"` **et** `data-de="sur-mesure"`, et le
gestionnaire de vues sait maintenant que « même vue demandée » veut dire « pas
de navigation, mais un défilement quand même ».

⚠️ **En testant un lien d'ancre, cliquer deux fois.** Le premier appui masque le
défaut du second.

### Les pastilles de la visionneuse

Trois points sous la photo, dans la visionneuse des places secrètes. Ils disent
**deux choses d'un seul coup d'œil** : combien il y a de photos — donc qu'il y en
a d'autres — et où l'on en est.

C'est ce qui les rend meilleures que le compteur « 2 / 3 » qu'elles remplacent :
**le compteur se lit, les pastilles se voient.** C'est la différence entre savoir
qu'on peut balayer et y penser. Le compteur vivait d'ailleurs dans l'en-tête,
loin de la photo, c'est-à-dire loin de l'endroit où l'on regarde ; le rang reste
annoncé aux lecteurs d'écran par l'`aria-label` du dialogue et par celui de
chaque pastille.

Quatre décisions à ne pas défaire :

- **Elles sont sous la photo, pas sous la figure.** Sur écran court (téléphone
  tourné), la figure passe en deux colonnes — photo à gauche, texte à droite —
  et des pastilles posées au niveau de la figure atterriraient sous la légende.
  D'où le bloc `photo + pastilles` qui fait un seul élément flex.
- **Ce sont de vrais boutons.** On tape les pastilles ; ne pas les rendre
  cliquables serait un piège de plus. 44 × 44 de cible pour un point de 8 px : la
  surface est du rembourrage, pas du dessin.
- **L'active est un bâtonnet, pas un point plus gros.** À cette taille, deux
  cercles de diamètres voisins se distinguent mal ; deux formes différentes, non.
  La couleur ne porte donc pas seule l'information (WCAG 1.4.1). Mesuré : 4,63
  pour le bâtonnet safran, 8,14 pour les points au repos — seuil graphique 3:1.
- **La ligne « Balayez pour voir les autres photos » reste**, sur mobile. Les
  pastilles montrent qu'il y a d'autres photos ; cette ligne dit **comment** y
  aller. Un geste ne se devine pas d'un dessin.

### La navigation : une flèche, franche

Le reproche était que sur mobile on ne sait pas ce que fait un lien — quatre
libellés, quatre habillages, et aucun assez visible pour qu'on le vise du pouce.

**Une porte balinaise a été essayée à cette place, et retirée.** L'idée était de
dire « on change de page » avec le candi bentar, cohérente avec le reste du
vocabulaire du site. Elle échouait sur le seul critère qui compte ici : à 17 px,
**un symbole qu'il faut apprendre ne se lit pas plus vite qu'un mot** — et il
prenait la place de la flèche, c'est-à-dire du seul signe que tout le monde lit
sans notice. Sur un écran de 390 px, on n'a pas le luxe d'un vocabulaire à
apprendre.

> La règle qui en sort, et qui vaut au-delà de ce cas : **un symbole d'interface
> n'a de valeur que s'il économise une lecture.** Les symboles de
> `Symboles.jsx` nomment des choses que le texte nomme aussi — ils décorent une
> compréhension déjà acquise. La porte, elle, prétendait remplacer une
> convention. Elle reste dans l'historique git.

Reste donc la flèche, mais **franche** : 18 px et un trait de 2,2 au lieu des
15 px filiformes d'avant, 20 px et 2,4 pour les retours. C'est ce qui manquait
vraiment. `components/LienPage.jsx` la porte et garantit trois choses qu'il ne
faut pas défaire : **44 px de haut** (c'était le vrai défaut — des liens de
20 px pris dans un paragraphe), **un soulignement** en plus de la couleur
(WCAG 1.4.1), et la flèche en `aria-hidden`.

**Rien à droite des plaques du menu**, sauf le jepun de la section courante.
Deux marques y ont été essayées pour signaler les entrées qui quittent la page —
une porte, puis une flèche — et toutes deux retirées. La raison est différente de
la précédente et vaut d'être retenue : dans une liste où **chaque ligne est déjà
un lien**, un signe posé sur deux lignes sur neuf ne se lit pas « celle-ci change
de page » mais « celle-ci est différente », sans qu'on sache en quoi. Une nuance
qu'on ne peut pas expliquer coûte plus qu'elle ne rapporte.

⚠️ **Un seul signe de direction par lien.** La maquette portait, dans ses liens
de retour, une flèche SVG *et* un caractère `&larr;` hérité de la version
précédente : deux flèches côte à côte devant le même libellé. Vérifier après
chaque remplacement d'icône qu'on a bien retiré ce qu'on remplace.

### Les retours, agrandis

Un retour est la commande la plus utile d'une page qu'on n'a pas choisie, et
c'était **la plus petite de l'écran** : petite capitale de 11 px et flèche de
13 ou 14 px, dans `RetourLien.jsx` comme dans le gabarit des pages légales — qui
avait d'ailleurs son propre lien, jamais aligné sur l'autre. Les deux sont
désormais du texte courant à 15 px, en demi-gras, avec une flèche de 20 px.

### Le typographe, un cran au-dessus

`text-sm` valait **0,875 rem — 14 px** (13 dans la maquette). C'est la taille
d'une mention légale, et elle portait ici des paragraphes entiers : les six us
et coutumes, les temps forts du circuit, les trois valeurs, tout le jour par
jour. À bout de bras, sur un téléphone, ça se lit en plissant les yeux.

- `text-sm` → **15 px**, `text-xs` → **13 px**, `.btn` → **15 px**.
- Plus rien sous 12 px : les annotations écrites en `text-[0.6875rem]` (11 px)
  et le badge des envies (10 px) sont passés à `text-xs`.
- **Ça ne coûte presque rien en défilement** — l'accueil passe de 18,3 à 18,3
  écrans mobiles : ces blocs sont larges, la ligne accueille encore le même
  nombre de mots.

### Les retours à la ligne en trop

Trois causes, trois corrections :

1. **L'interlettrage des petites capitales.** `.label` était à `0.2em`, ce qui
   **allonge le mot de 15 %** : « US ET COUTUMES », « CE QUI SE VÉRIFIE »
   passaient à la ligne dans des colonnes où ils tenaient à un cheveu près.
   Ramené à `0.16em` — assez pour que la petite capitale reste une petite
   capitale.
2. **Des libellés trop longs pour leur colonne.** Les gloses du menu
   (« Ma famille, mon pays, mon union de guides » → « … mon union »,
   « Quinze jours, sept étapes, et le jour par jour » → « Quinze jours, sept
   étapes ») et la ligne de faits (« Diplômé guide francophone · Depuis octobre
   2005 · … » → « Diplômé · Depuis 2005 · Français et anglais · Je conduis »).
   Le mot inutile est celui que le lecteur reconstitue seul.
3. **`text-wrap: pretty`** sur `p, li, dd, figcaption, blockquote` : le
   navigateur rééquilibre les deux dernières lignes pour éviter l'orpheline —
   un mot seul en bas d'un paragraphe. Sur mobile, où une colonne fait quarante
   caractères, l'orpheline est la règle et non l'exception. Aucun coût : ignoré
   par les navigateurs qui ne le connaissent pas.

### Condenser sans amputer

Deux blocs étaient trop longs sur mobile, et la méthode a été la même pour les
deux : **d'abord la mise en page, ensuite le texte** — jamais l'inverse, sinon on
coupe du sens pour rattraper une gouttière.

**Us et coutumes** (1 336 px → **1 184**, soit 1,40 écran de mobile) :

- Le symbole était dans une gouttière de gauche, et cette gouttière coûtait 46 px
  de colonne à **chacun des six paragraphes** — soit une ligne de plus par usage
  à 390 px. Il est passé sur la ligne du titre. Le dessin reste au même endroit
  dans l'œil, puisqu'un titre commence là où commençait le symbole.
- Puis les textes. Les versions longues énuméraient joliment — « seuil de
  boutique, tableau de bord, capot de scooter » — mais ce qui sert le voyageur le
  jour même, c'est la règle : « on l'enjambe, on ne la ramasse pas ». **Garder la
  règle, couper l'énumération.** Chaque texte tient désormais en trois lignes à
  390 px, et c'est la contrainte de ce bloc.

**L'encart de période, dans le formulaire** (222 px → **~175**) : c'est le seul
endroit du site où un texte explicatif s'intercale **au milieu d'une saisie**,
entre le nombre de voyageurs et le style recherché. Trois paragraphes empilés s'y
lisaient comme un texte ; ils sont devenus une liste à puces, qui se balaye. Et
les notes elles-mêmes ont été réécrites sous une règle simple : **une note = un
fait + sa conséquence pratique, pas de troisième proposition.** La version longue
faisait quatre lignes pour dire « c'est la bonne saison » — et parlait du Rinjani
et de Komodo, que le site ne propose plus.

### Le pied de page n'est plus un second sommaire

Sa colonne « Explorer » reprenait les onze sections du site, c'est-à-dire
exactement le sommaire du menu — et un sommaire en double est un sommaire qu'on
ne maintient qu'à moitié : les deux listes avaient déjà divergé (le pied de page
ignorait `/circuit`, le menu ignorait Sur-Mesure).

⚠️ **Condition à laquelle ce retrait est acceptable, et il faut la tenir : le
menu s'ouvre désormais à toutes les largeurs.** Le burger était `lg:hidden`.
Sans ce changement, les écrans larges se retrouvaient avec les six entrées de la
barre et rien d'autre — plus d'accès à « Par où commencer », « Us et coutumes »,
« Mon portrait » ni au programme jour par jour. Le pied de page était la seule
chose qui rendait le site navigable au-delà de six liens ; le menu était
justement ce qu'ils n'avaient pas.

### Neuf fois « guide diplômé »

Le compte a été fait : le diplôme était annoncé **neuf fois** — bandeau du hero,
chapô de la présentation, ligne de certification, chapô des valeurs, sous-titre
de la barre, pied de page, glose du menu, en-tête de `/agus`, fiche de `/agus`.
Un fait répété ne rassure pas davantage ; passé la troisième fois, il finit par
sonner comme un argument de vente.

Il ne s'annonce **plus du tout sur l'accueil**. Ont été retirés, dans cet
ordre : l'ouverture du chapô de la présentation, « diplômé » dans le chapô des
valeurs, la glose du menu (« Guide diplômé, vingt ans de route » → « Ce dont je
vous décharge »), l'en-tête de `/agus`, le bandeau du hero, et enfin la ligne
« Ce qui se vérifie » de la présentation. Restent la fiche de `/agus` et le pied
de page — voir l'avertissement de « Trois blocs de preuve se sont succédé ici »
plus haut : **c'est le lien vers le portrait qui porte désormais toute la
réassurance de l'accueil.**

⚠️ **Le bandeau du hero est parti en dernier, et il remplace une règle par une
autre.** La version précédente de ce paragraphe disait « une fois en pleine
force, au premier écran ». Elle laissait le diplôme s'annoncer deux fois avant
qu'on ait lu la moindre ligne sur Agus — dans le hero, puis un écran et demi
plus bas. La règle est donc maintenant :

> **Le hero vend ce qu'on va ressentir, la présentation donne ce qui se
> vérifie.** Ne pas remettre de preuve dans le hero : ce serait redire, pas
> rassurer.

**La ligne de faits a changé de registre**, et c'est le point important. Elle
disait, en prose : « Diplômé guide francophone, professionnel depuis octobre
2005. Je guide en français et anglais, et je conduis moi-même. » C'est une
phrase — donc quelque chose qui se lit, qui se compare à la phrase d'à côté, et
qui se met à sonner comme un argument. Elle est devenue une **liste de mentions
séparées par des points**, sous un intitulé qui dit ce qu'elle est : « Ce qui se
vérifie ». Une liste ne se lit pas, elle se balaye ; c'est le bon registre pour
des faits qu'on consulte.

### Le menu : un seuil, pas une barre

Le reproche était juste — c'était la barre de n'importe quel site. Logo à
gauche, six liens au milieu, un bouton, trois traits à droite. Rien là-dedans ne
disait Bali, alors que la page entière essaie de le dire.

La contrainte posée était « sans perdre en visibilité », et elle a écarté d'un
coup la moitié des idées : un candi bentar à la place du bouton de menu aurait
été plus balinais et parfaitement illisible, ce qui n'aurait servi personne.
Quatre déplacements ont survécu, tous mesurés :

1. **Le linteau.** Le filet gris de 1 px sous la barre est devenu une frise de
   dents — celle qui court sur la pierre au-dessus des portes de temple. Une
   séparation devait exister de toute façon ; elle est maintenant sculptée au
   lieu d'être droite. Sept pixels, un SVG en ligne, aucune requête réseau.
   ⚠️ **La barre mesure donc 75 px et non 68**, et le haut du panneau mobile
   suit (`top: 75px`). Les deux valeurs vont ensemble.
2. **Le bouton de menu est un meru.** Trois traits de largeurs décroissantes :
   c'est la silhouette du toit à étages qui se rétrécit vers le ciel, et c'est
   en même temps, trait pour trait, le hamburger que tout le monde sait lire. On
   ne troque pas une convention contre un symbole — on la redessine.
3. **Le repère de position est une fleur.** La section où l'on se trouve n'est
   plus soulignée d'un rectangle bambou mais marquée d'un jepun posé sous le
   libellé, la fleur qui sert déjà de puce de sélection ailleurs. La graisse du
   texte double l'information : ni la couleur ni la forme ne la portent seules
   (WCAG 1.4.1).
4. **Le panneau mobile devient un seuil**, et c'est là que se joue l'essentiel.

#### Les plaques

Chaque entrée du menu mobile porte désormais un numéro, un symbole, son libellé
et **une ligne qui dit ce qu'il y a derrière**. C'est ce dernier point qui fait
tout le travail : sur mobile, le menu est le seul plan de la page dont on
dispose, et une liste de titres nus oblige à ouvrir pour savoir. « Le circuit »
ne dit rien ; « Quinze jours, sept étapes, et le jour par jour » fait décider.
**La visibilité s'est gagnée là, pas dans la taille du texte.**

Les symboles viennent de la famille de `Symboles.jsx`, et la règle de ce
fichier vaut ici mot pour mot : **ce ne sont pas des décorations
interchangeables.** Chacun est choisi parce qu'il nomme une chose que la section
contient vraiment.

| Entrée | Symbole | Pourquoi celui-là |
| --- | --- | --- |
| Qui je suis | canang | l'offrande qu'il dépose chaque matin sur son tableau de bord, et qui est dans le texte de la section |
| Son engagement | padma | déjà le filigrane du panneau des valeurs |
| Son portrait | rangs | Wayan, Made, Nyoman, Ketut : une page sur un homme, sa famille et son nom |
| Par où commencer | candi | la porte fendue **en deux**, là où la page propose deux chemins |
| Le circuit | penjor | les bambous arqués qui bordent les routes, et que la note de période mentionne |
| Vos envies | tedung | l'ombrelle qui signale ce qu'on honore |
| Us et coutumes | nyepi | le jour du silence est l'un des six usages listés |
| Livre d'or | gong | ce qui résonne après |
| Tarifs | poleng | le damier : la règle dite en noir et blanc |

Deux choses à ne pas défaire :

- **La bordure gauche des plaques existe dans les deux états**, transparente au
  repos. Sans elle, l'entrée courante se décalerait de 3 px et la liste
  sauterait d'une ligne à l'autre au défilement.
- **Sur-Mesure n'est plus une plaque.** Le panneau se termine par le bouton
  « Demander un devis », qui mène au même endroit ; l'ancienne version affichait
  les deux, à trois centimètres l'un de l'autre.

Et une règle qui a failli être enfreinte : la porte fendue devait d'abord être
posée en filigrane dans l'angle du panneau, comme le padma des valeurs. À
390 px, le panneau est trop étroit pour qu'un dessin de 240 px trouve un coin
sans texte — il passait sous trois libellés. **Le motif va sur un fond de
section, jamais sous du texte.** Il ferme donc le panneau, en clair, seul sur sa
ligne.

### Le portrait — `/agus`

La page que l'on atteint en cliquant sur sa photo. Elle existe parce qu'un
guide indépendant ne se vend pas sur une prestation mais sur une personne, et
que l'accueil ne peut pas porter les deux registres : les faits qui lèvent le
doute (ils y restent), et l'homme qui donne envie de choisir lui plutôt qu'une
agence.

**Le portrait est cliquable, et il le dit.** Une photo qui navigue sans le
montrer est un piège : on l'apprend en cliquant par hasard, ou jamais. La ligne
d'appel sous la photo porte l'affordance ; la photo ne fait que l'élargir à une
cible confortable.

**Ce qui a été retiré de l'accueil** : la chute du panneau des valeurs, qui
ouvre désormais le développement sur `/agus`. Le titre, le chapô et les trois
points restent — c'est ce qui embarque. La démonstration complète, elle, trouve
sa place là où quelqu'un a choisi d'aller lire.

#### Quatre lignes de fiche, et pas six

« Union » et « Famille » y figuraient — et chacune est le **titre d'une partie
de la même page**, trente centimètres plus bas. Une fiche qui annonce en trois
mots ce qu'un paragraphe va dire ne résume pas : elle dit deux fois. Ne restent
que les faits qui n'ont pas leur développement ailleurs — certification,
ancienneté, langues, véhicules.

Deux marqueurs « à compléter » ont disparu de la même façon : « d'où je viens /
où j'ai appris le français / ce qui m'a mené au métier » et « ce qu'Agus veut
bien qu'on dise de plus » posaient à l'écran des questions que le bloc du bas
pose déjà. Elles restent dans `lib/portrait.js` et dans les six questions ; le
jour où Agus répond, **ce seront des paragraphes écrits, pas des champs
remplis** — c'est pour ça que `HISTOIRE` n'est plus affiché nulle part.

#### Rien d'inventé sur un homme réel

C'est la règle qui commande toute la page, et elle a un coût visible. Ce qui est
su vient de `AGUS` et de `VALEURS`. **Ce qui ne l'est pas porte un marqueur
rouge** — le même composant que les pages légales, sorti dans
`components/AComplete.jsx` pour être partagé.

Il manque **huit choses**, toutes dans `lib/portrait.js`, et aucune ne se
devine. Cinq portent sur l'union (`UNION`) : son nom exact, depuis quand il en
est membre, son rôle éventuel, l'effectif, et **ce qu'elle fait concrètement** —
c'est le dernier bloc entièrement vide de la page. Trois portent sur son
histoire (`HISTOIRE`) : le village où il a grandi, ce qui l'a mené au métier en
2005, et le prénom de son épouse.

La question du français, elle, **est close** : les textes officiels fournis par
le client y répondent (trois ans à l'Alliance Française, puis plusieurs séjours
en Europe). Elle a donc quitté la liste, et une autre l'a remplacée — la
confirmation de la licence, voir plus bas.

Un nom d'association plausible glissé à la place d'un blanc traverse toutes les
relectures — c'est exactement le genre de détail que personne ne pense à
vérifier parce qu'il a l'air d'avoir été vérifié. Les six questions à lui poser
sont affichées **en bas de la page elle-même**, pas dans un fichier de notes :
un fichier de notes ne se rouvre pas.

Trois choses vont donc ensemble le jour où il a répondu : les marqueurs
disparaissent, le bandeau d'avertissement de la page part, `robots: { index:
false }` saute, et la page entre dans `app/sitemap.js`.

#### Ce que les textes officiels ont changé

Le client a fourni deux textes : la **recommandation d'un professionnel du
voyage** (à la troisième personne) et la **présentation d'Agus lui-même** (à la
première). Ils ont apporté quatre choses, et failli en faire perdre une.

**1. La licence, et c'est le fait le plus fort du site.** Elle est délivrée par
le gouvernement régional balinais et **se renouvelle tous les trois ans**, au
terme d'une formation auprès du ministère du tourisme. Ce qui rassure n'est pas
le mot « licence » mais le renouvellement : « diplômé en 2005 » se dit d'un
homme qui n'a rien fait depuis vingt ans, « revalidée tous les trois ans »
décrit quelqu'un que l'État recontrôle. **C'est aussi le seul fait du site qui
ne se périme pas.**

> Provenance : la recommandation, pas Agus. C'est un détail administratif qu'un
> tiers peut approximer de bonne foi — **une question a été ajoutée à la liste**
> pour qu'il le confirme.

**2. Une partie entière, « Le français, et l'Histoire ».** Trois ans à
l'Alliance Française, plusieurs séjours en Europe — la Belgique surtout —, et
une passion pour l'histoire européenne dont il se sert **comme miroir** pour
expliquer Bali. C'est la chose la plus distinctive des deux textes et le site
n'en disait rien : un guide francophone à Bali, il y en a ; un guide qui peut
mettre le subak en perspective avec ce que son interlocuteur connaît déjà, c'est
autre chose. Son symbole est le `candi bentar`, la porte fendue — un passage
entre deux mondes.

**3. Son objectif dans ses mots** — « hors des sentiers battus : leurs
traditions, la nature, les plats locaux, leurs habitants avec leur façon de
vivre, leur religion. Le tout selon vos souhaits — et dans la joie et la bonne
humeur. » Et **sa plaisanterie**, qui ferme la page : *AGUS* pour *Agence
Globale Universelle (de la) Sympathie*.

**4. ⚠️ Le piège : les âges.** Les deux textes donnent « 35 ans », « deux filles
de 8 et 5 ans et un garçon de 9 mois ». Le site portait « 12 et 9 ans, et 5 ».
Ce sont **les mêmes trois enfants à quatre ans d'écart** — les textes officiels
sont donc *plus anciens* que la donnée qu'ils auraient remplacée. Les reprendre
aurait fait régresser le site sans que rien ne le signale.

> **Règle qui en sort : pas d'âge dans une biographie.** Un âge est une date de
> péremption qu'on oublie de relire ; au mieux il vieillit mal, au pire il fait
> mentir un homme sur sa propre famille. `AGUS.famille` dit maintenant « Marié,
> deux filles et un garçon » — le nombre d'enfants, lui, ne bouge pas. **Ne pas
> y remettre de chiffres, pas même à jour.**
>
> Le corollaire vaut au-delà de ce cas : **une source réelle mais périmée est
> aussi fausse qu'une source inventée**, et elle est plus dangereuse parce
> qu'elle se vérifie.

**Et un caractère invisible.** Le texte fourni contenait « faҫon » avec un
**`ҫ` cyrillique** (U+04AB) au lieu du `ç` français. Rien ne le distingue à
l'œil ; il casse la recherche, le correcteur orthographique et la synthèse
vocale. Le contrôle, à passer sur tout texte collé depuis un site :
`unicodedata.name()` sur chaque caractère au-dessus de U+2000, et rejeter tout
ce qui commence par CYRILLIC, GREEK ou FULLWIDTH.

#### « J'ai commencé comme guide d'agence » — la règle qui se précise

Le site a plaidé pendant toute sa construction **par le positif** : « voyager
en direct fait vivre les guides de Bali », jamais « les agences exploitent ».
La raison était bonne — on ne peut pas documenter un grief, et une charge
anonyme contre une profession est une charge qu'on ne peut attribuer à
personne.

Agus a depuis fourni son propre témoignage : il a commencé en agence, il y a
vécu ce système, il en est sorti. **Ce n'est plus une thèse, c'est un vécu**, et
il devient la partie centrale de la page — celle qui explique enfin *pourquoi*
il travaille en direct, au lieu de se contenter d'affirmer que c'est mieux.

> ⚠️ **La règle « par le positif » ne disparaît pas, elle se précise** : jamais
> d'agence nommée, jamais de grief qu'on ne pourrait pas attribuer à quelqu'un.
> Son vécu lui appartient et il peut le dire ; ce qu'on ne peut pas faire, c'est
> le généraliser à sa place. La formulation retenue décrit **un système**, pas
> des sociétés.
>
> « L'un des premiers à en sortir » est **sa formule**, et c'est une
> revendication forte — premier de son groupe, de sa région, de l'île ? Écrite
> telle quelle en attendant sa précision, parce que l'atténuer serait déjà
> l'interpréter. La question est dans la liste du bas de page.

**Deux parties ont fusionné** pour lui faire place : « Mon pays, et ce que j'en
montre » et « Les guides de Bali, et mon union » plaidaient la même chose sans
le dire. Séparées, elles se répétaient sur deux écrans ; ensemble, elles
racontent une histoire. La page passe de six parties à cinq.

**Trois autres retraits.** La glose du jepun sous le portrait — trois lignes qui
expliquaient la fleur derrière son oreille — cède la place à un lien vers la
section Us et coutumes : expliquer un symbole coûtait trois lignes, **ouvrir la
porte de tous les autres coûte la même place et mène quelque part**. Le mot
**« autocar »** devient « bus de touristes » : personne ne dit autocar à Bali.
Et la version longue du point famille (le *tri hita karana* développé sur six
lignes) laisse la place à sa version courte, le concept restant nommé là où il
porte l'argument.

**Le résultat, mesuré** : 9,5 → **8,3 écrans mobiles**. Dont **1,2 écran de
échafaudage** qui disparaîtra — le bandeau « cette page attend les mots d'Agus »
et le bloc des questions. Le contenu réel tient donc en 7 écrans, pour une page
qui porte maintenant la licence, le français, l'Histoire, la famille, le
témoignage sur les agences et l'union.

#### La décoration : en filigrane, jamais en icône

Un symbole affiché en clair demande à être expliqué — c'est exactement les trois
lignes de glose du jepun qu'on vient de retirer. En texture, il ne demande rien :
il colore la page en balinais sans rien réclamer au lecteur. D'où le **padma** —
lotus à huit pétales, assise du dieu suprême — en filigrane dans l'angle de
l'en-tête, à 7 % d'opacité et seulement à partir de `lg`, et le **jepun** en
séparateur avant le bloc de travail : la fleur ferme la lecture comme elle
l'ouvre sous le portrait.

> ⚠️ Un filigrane posé en `absolute` déborde le conteneur et **crée un
> défilement horizontal** que l'audit signale mais que l'œil ne trouve pas.
> `overflow-hidden` sur le parent, systématiquement.

#### Les quatre registres de `/agus`, et la règle qui les tient

La page portait **cinq blocs encadrés**. Deux voulaient dire quelque chose, les
trois autres étaient des boîtes pour faire des boîtes — et l'effet cumulé était
celui d'**un formulaire** : des champs bordés, alignés par paires, un intitulé
au-dessus de chaque valeur. Sur une page qui ne demande rien et ne fait que
répondre.

Il n'en reste que quatre registres, et **chacun se distingue par ce qu'il veut
dire, jamais par le seul plaisir de border** :

1. **Le texte courant** — aucun ornement.
2. **Les faits** — `<ListeFaits>` : un filet horizontal, l'intitulé à gauche,
   la valeur à droite. Ni fond, ni bordure, ni coin arrondi. C'est le même
   trait que sous les titres de partie et sous la légende du portrait, donc la
   page n'a plus qu'une seule façon de séparer deux choses — et c'est plus
   court, les cartes coûtaient leur padding et leur bordure sur chaque ligne.
3. **L'aparté** — filet vertical à gauche. La citation d'ouverture et le canang
   du tableau de bord le partagent : c'est le même geste, une voix qui sort un
   instant de l'argument.
4. **Le travail en cours** — bordure bougainvillier et fond teinté. Le bandeau
   du haut et les six questions du bas, et eux seuls. **C'est le seul registre
   qui a le droit d'encadrer**, justement parce qu'il signale ce qui n'est pas
   fini — et les deux blocs partiront ensemble le jour où Agus aura répondu.

> ⚠️ **Ne pas rajouter de bloc `border-rule bg-surface` sur cette page.** C'est
> exactement ce qui en a été retiré, et c'est le réflexe qui revient dès qu'un
> contenu semble « mériter d'être mis en avant ». Un fait mis en avant par un
> cadre ressemble à un champ à remplir ; ce qui met un fait en avant ici, c'est
> sa place dans la liste.

Deux corollaires. **L'icône par ligne a sauté** : chacune redisait son propre
intitulé — un écusson devant « Ma certification », une voiture devant « Mes
véhicules ». Une icône se garde quand elle ajoute (les trois de « Ce que ça
change » distinguent l'argent, le relais et la personne), elle se retire quand
elle répète. Et **le bloc de l'union a perdu son cadre** malgré l'argument qui
le justifiait — « ce qui manque doit se voir d'un seul regard ». C'est vrai, et
ce n'est pas le cadre qui le fait : c'est `<Valeur>`, qui écrit « à compléter »
en rouge, et le bandeau du haut qui le dit déjà.

Le titre de la première partie disait « Le métier, en faits », précédé de
« Avant de vous raconter quoi que ce soit, voici ce qui se vérifie ». Les deux
ont sauté ensemble : ils **commentaient la page au lieu de la faire**. « En
faits » annonce le registre d'une liste qui est déjà visiblement une liste, et
la phrase était plus longue que les quatre lignes qu'elle présentait. Le titre
est maintenant **« Mon métier »**.

### Le circuit en entier — `/circuit`

⚠️ **Cette page renverse une règle inscrite plus haut dans ce fichier**, et il
faut savoir pourquoi. La règle était : « le jour par jour reste absent, et c'est
délibéré : c'est le livrable d'Agus et la raison même de lui écrire. » Deux
choses l'ont rendue caduque :

1. **Ce texte est déjà public**, mot pour mot, sur balidecouverte.fr. Le cacher
   ici ne protégeait rien : ça privait seulement le nouveau site de la seule
   page qui prouve le travail.
2. **C'est ce qu'on vient chercher.** « Quinze jours, sept étapes, 1 210 € » ne
   se décide pas sur un résumé. Quelqu'un qui hésite veut savoir ce qu'il fait
   le neuvième jour.

Ce qui reste vrai de l'ancienne règle : **l'accueil n'en montre que le résumé.**
Quinze journées détaillées font huit écrans de défilement ; au milieu d'une page
qui en fait déjà dix-neuf, elles passeraient entre quelqu'un qui n'a pas encore
décidé et la suite du parcours. On ne les déplie pas non plus au clic — un
dépliant de cette taille casse la position de lecture de tous ceux qui le
referment.

**Le résumé de l'accueil dit ce qu'on fait, pas où l'on dort.** La section
listait les sept lieux de nuit : c'est le squelette du circuit, ce n'est pas ce
qui donne envie d'y aller — « Ubud, 4 nuits » ne dit pas qu'on descend le Batur
à vélo le septième jour. Six temps forts ont remplacé la liste, chacun portant
le numéro du jour réel auquel il renvoie ; sans ce numéro, ce serait une liste
d'arguments. Le squelette tient maintenant sur une seule ligne
(« Candidasa · Sidemen · Ubud · … »).

**Le texte suit celui d'Agus.** Les durées, les « guide de sentier obligatoire »,
les « boissons non incluses », les noms de lieux : rien n'a été arrondi. **Ne
pas embellir** — un programme est un engagement, et c'est lui qu'on lui
opposera. La liste de ce que le prix comprend est longue, et c'est exactement
l'argument : tant qu'on ne l'a pas lue, 1 210 € par personne se compare à une
location de voiture.

La page se termine comme le reste du site : par un message à écrire, où l'on dit
ce qu'on garde et ce qu'on jette. **Elle ne doit jamais devenir un formulaire de
réservation.**

### La navigation : savoir où l'on est, et pouvoir remonter

Le reproche était double — « on scrolle et on ne peut pas revenir facilement
sur l'engagement d'Agus ». Il avait une cause bête et une cause de fond.

**La cause bête : `#valeurs` n'était lié de nulle part.** Le panneau qui porte
l'argument le plus fort d'Agus avait bien une ancre, mais aucun lien ne
pointait dessus. Dès qu'on avait dépassé la présentation, il était en pratique
inaccessible. Il est maintenant dans la barre du haut, dans le menu mobile et
dans le pied de page — sa place dans la barre a été prise à « Sur-Mesure », que
le bouton « Demander un devis » juste à côté dessert déjà.

**La cause de fond : rien ne disait où l'on était.** Un repère de position
marque désormais la section courante. Il est calculé sur un écouteur de
défilement limité à une image par trame, et non sur un `IntersectionObserver` :
la règle est « la dernière section dont le haut est passé sous la barre », elle
est directement lisible dans le code, là où il faudrait la déduire de marges
racines acrobatiques avec un observateur.

> **La barre ne montre pas toutes les sections, et le repère doit quand même
> être continu.** Marquer strictement la section courante l'éteint quand on
> traverse « Par où commencer » ou « Us et coutumes », absentes de la barre : il
> clignote au fil du défilement, ce qui est pire que pas de repère du tout. On
> marque donc la dernière entrée **de la barre** que l'on a dépassée, ce qui se
> lit « vous êtes quelque part après ce point ». Le menu mobile, lui, les liste
> toutes et marque la section exacte — avec une puce en plus de la couleur, une
> couleur seule ne portant pas d'information (WCAG 1.4.1).

### Trois pièges trouvés en réparant ça

> **`scroll-padding-top` s'applique aussi au focus.** Le décalage des ancres
> sous la barre collante était porté par `scroll-padding-top: 5rem` sur `html`.
> Or cette propriété vaut pour **toute** mise en vue, y compris celle que le
> navigateur déclenche quand un élément reçoit le focus — et les commandes de
> la barre collante vivent par construction dans les 80 px du haut, donc dans
> la bande réservée. Le navigateur les jugeait masquées et faisait défiler la
> page pour les dégager : **ouvrir le menu mobile déplaçait la page de 428 px**,
> et la refermer encore autant. Le décalage est désormais porté par les cibles
> (`[id] { scroll-margin-top: 5rem }`). Ne pas remettre `scroll-padding-top`
> par-dessus : les deux s'additionnent et les ancres atterrissent à 176 px.

> **`backdrop-filter` fait de l'élément le bloc conteneur de ses descendants en
> position fixe.** Le panneau du menu mobile vivait dans le `<header>`, qui
> porte `backdrop-blur`. Son `top: 68px; bottom: 0` se calculait donc sur les
> 68 px de la barre : **un panneau de 1 px de haut**. Les liens débordaient, ce
> qui donnait l'illusion que ça marchait — mais le fond ne couvrait rien et la
> page restait visible derrière le menu. Le panneau est maintenant hors du
> `<header>`. Le symptôme à reconnaître : un overlay « transparent » alors que
> son `background` est bien défini.

> **On n'anime pas ce vers quoi on navigue.** Un `.reveal` qui n'est pas encore
> apparu est décalé de 14 px vers le bas. L'ancre `#valeurs` atterrissait donc
> sur la position d'avant l'animation, puis le panneau remontait de 14 px et
> passait sous la barre collante. Le panneau des valeurs n'a plus d'apparition
> au défilement, parce qu'il est devenu une destination.

### Le clignotement à la sélection

Cocher une activité faisait clignoter toute la page. La maquette rappelait
`render()`, qui reconstruit tout par `innerHTML` : **70 nœuds détruits et
recréés** à chaque clic, dont les quatre-vingt-dix SVG des vignettes. Et
surtout, **chaque `.reveal` recréé repart à `opacity: 0`** puis se rallume en
0,55 s — c'est ce que l'œil lit comme un rafraîchissement complet.

La sélection ne touche plus que la carte concernée et les trois endroits qui
en dépendent vraiment : le panier, le message, le compteur. On passe de 70
nœuds recréés à 6. L'application, elle, n'a jamais eu le défaut — React
réconcilie et ne recrée rien (2 nœuds ajoutés, 1 retiré).

> **La mesure qui l'attrape** — et il en faut une, parce que le compte de
> nœuds ne suffit pas : échantillonner l'opacité des cartes **déjà apparues**
> pendant les 500 ms qui suivent le clic. Avant le correctif, elle tombe à 0 ;
> après, elle ne bouge pas de 1. Vérifié dans les deux sens sur la version
> précédente, sinon on ne teste rien.

### Mobile — les seuils à tenir

Le site est vérifié à **320, 360, 390 et 414 px**. Quatre règles, toutes
mesurées, toutes à zéro défaut aujourd'hui :

| Règle | Seuil | Pourquoi |
| --- | --- | --- |
| Cibles tactiles | **44 × 44 px** | WCAG 2.5.5 / Apple HIG. Le minimum AA (2.5.8) est 24 px, mais 44 est le confort réel du pouce. |
| Champs de saisie | **16 px exactement** | En dessous, **iOS zoome à la mise au point** et recadre la page. Un `0.9375rem` suffit à déclencher le zoom. |
| Débordement horizontal | **0** | Un pixel de trop et la page se décale au moindre balayage. |
| Contraste | seuils WCAG | Inchangé, motifs compris. |

**L'état mesuré aujourd'hui**, sur les huit routes et les six vues de la
maquette, à 1280 / 390 / 320 : aucun débordement, aucune erreur de console,
aucun défaut de contraste, aucune cible tactile hors norme. En hauteur, exprimée
en écrans de mobile (390 × 844) :

| Route | écrans @390 | Vue de la maquette |
| --- | --- | --- |
| `/` | **12,6** | 12,9 |
| `/circuit` | 13,0 | 12,6 |
| `/envies` | 5,1 | 5,2 |
| `/agus` | 8,3 | 8,5 |
| `/tarifs` | 6,8 | 6,9 |
| `/livre-d-or` | 8,6 | 8,7 |
| `/cgv` | 16,1 | — |
| `/mentions-legales` | 8,2 | — |

Les seuls signalements restants sont des **liens en pleine phrase** de moins de
24 px, couverts par l'exception WCAG 2.5.8 : « Voir les envies » sur l'accueil,
« conditions générales de vente », « mentions légales » et « Tarifs » dans les
pages légales. Les agrandir casserait l'interligne du paragraphe. **L'audit les
signale quand même** — c'est à la relecture de trancher, en regardant si le lien
est seul sur sa ligne ou pris dans du texte.

**Pièges rencontrés, à ne pas rejouer :**

- `.btn` tombait à **43 px** — un pixel sous le seuil, mais sous quand même.
  C'est `min-height: 44px` qui le garantit, pas le padding.
- Les liens de listes (navigation, pied de page) faisaient **20 px de haut**.
  L'exception « lien en ligne dans une phrase » de WCAG 2.5.8 **ne s'applique
  pas** à une liste de navigation : il leur faut `min-h-11`.

  > **La réciproque est vraie et l'audit ne sait pas la voir.** Les liens des
  > pages légales qui vivent *à l'intérieur d'une phrase* — « décrites dans les
  > conditions générales de vente » — sont, eux, bien couverts par l'exception,
  > et il ne faut **pas** les agrandir : ça casserait l'interligne du
  > paragraphe. Quatre cas connus, tous vérifiés : « conditions générales de
  > vente », « mentions légales » et « Tarifs » dans les pages légales, et
  > « Voir les envies » sur l'accueil.
  > L'audit les signale quand même ; c'est à la relecture de
  > trancher, en regardant si le lien est seul sur sa ligne ou pris dans du
  > texte.
- `min-w-11` autant que `min-h-11` : « CGV » en pied de page ne faisait que
  **23 px de large**, un pixel sous le minimum AA. La hauteur seule ne suffit
  pas pour un libellé court.
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

- **Ne décodez pas les couleurs à la main.** Chromium sérialise `color-mix()`
  tantôt en `color(srgb r g b / a)` — composantes en 0–1 —, tantôt en
  `oklab(…)`, et les deux formes se lisent faux si on les prend pour du RGB
  0–255 : un fond ivoire passe pour du noir. La version de l'audit qui ne
  corrigeait que la première forme a produit **vingt-quatre échecs fantômes**
  sur une seule passe, dont toute la barre de navigation. La seule méthode
  fiable est de laisser le navigateur décoder : on peint la couleur sur un
  canvas 1 × 1 et on relit les octets. Elle vaut pour n'importe quelle syntaxe,
  présente ou future. Il faut aussi **composer les couches translucides** —
  `bg-tint/70` sur un fond sable n'est ni l'un ni l'autre.
- Le décoratif (`aria-hidden="true"`) doit sortir de l'audit : les séparateurs
  du bandeau défilant ne sont lus par personne, et les compter noie les vraies
  régressions.
- Ce qui est masqué par `hidden` (la visionneuse fermée) aussi, pour la même
  raison.

**Le contour d'un champ de saisie n'est pas un filet de texte.** L'audit ne
regardait que les couleurs de texte, et laissait donc passer une vraie faute :
les champs du configurateur étaient bordés de `--rule` (#e3d8c2), soit **1,41
sur le blanc**. C'est assez pour séparer deux paragraphes, et très insuffisant
pour le **seul** signe qu'il y a là une case où écrire — un champ blanc sur un
panneau blanc n'est identifiable que par son contour, ce qui le range sous la
règle des 3:1 des composants d'interface (WCAG 1.4.11). D'où `--rule-champ`
(#9c8a66), mesuré à **3,36** sur le blanc et 3,15 sur la page, réservé aux
`input`, `select` et `textarea`. **Ne pas l'employer pour les filets de
texte** : il les rendrait bruyants.

**Et l'audit ne voit pas les mots collés.** JSX **rogne l'espace de tête de
chaque ligne** d'un texte multiligne. Donc ceci :

```jsx
<p>
  je dépose un{" "}
  <em>canang sari</em> sur le tableau de bord : quelques fleurs
  dans un panier de feuille de palme tressée.
</p>
```

rend `canang sarisur le tableau de bord`. L'espace avant `<em>` est protégé par
son `{" "}` ; celui **après** ne l'est pas, parce qu'il ouvre une ligne. La
règle : **dès qu'un texte passe à la ligne, un espace collé à une balise a
besoin de son `{" "}` des deux côtés.**

Trois occurrences vivaient en production sans que rien ne les signale — ni le
build, ni le linter, ni l'audit de contraste : `canang sarisur` sur `/agus`,
`etque l'acompte` sur `/cgv`, `aucun cookieet n'utilise` sur
`/mentions-legales`. Le contrôle qui les a trouvées, à rejouer après toute
réécriture de paragraphe :

```sh
curl -s "$URL" | grep -oE "</(em|b|strong|i|code)>[a-zàâçéèêëîïôûùüÿñæœ]"
```

Il reste **deux faux positifs légitimes** : `</b>dans votre voyage` dans la
barre mobile (le `<b>` est en `display:block`, la ligne suivante commence
ailleurs) et `</span>Éditeur du site` dans les pages légales (conteneur `flex`
avec `gap`). Un mot collé n'est un défaut que si les deux morceaux sont sur la
même ligne de texte.

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

## Référencement

`lib/site.js` porte `ORIGINE`, surchargeable par `NEXT_PUBLIC_SITE_URL`. La
valeur par défaut est **le domaine nu, sans www**, confirmé par Agus. Un
canonical qui désigne un hôte différent de celui qui répond (www contre apex,
http contre https) est pire que pas de canonical du tout : il envoie Google
indexer une URL qui redirige.

### Le garde-fou d'indexation

**Un déploiement n'est indexable que si on le demande.** `NEXT_PUBLIC_INDEXABLE`
doit valoir exactement `1` ; toute autre valeur — `true`, `oui`, vide, absente —
laisse le site en `noindex` complet, et son `robots.txt` répond `Disallow: /`.

Le sens de la variable est celui qui pardonne, et c'est délibéré. Une
préproduction est une **copie intégrale du site d'Agus** : indexée, elle entre en
concurrence avec `balidecouverte.fr` sur ses propres mots, et rien ne le signale
— pas d'erreur, pas de page cassée, juste deux sites qui se partagent une
audience. Oublier la variable rend au contraire le site invisible aux moteurs :
ça se voit en une journée dans la Search Console, et ça se répare en une minute.
**Entre deux oublis possibles, on choisit celui qui fait du bruit.**

> ⚠️ Les deux variables vont ensemble. `NEXT_PUBLIC_SITE_URL` posée seule
> enverrait une préproduction déclarer `balidecouverte.fr` dans ses canoniques,
> son sitemap et son JSON-LD — on demanderait à Google d'indexer le vrai site en
> lisant la copie. Voir `.env.example`, qui ne décrit que les deux
> configurations valides.

Le `robots.txt` ne suffit pas à lui seul : il empêche l'**exploration**, pas
l'**indexation**. Une URL découverte par un lien entrant peut être listée sans
jamais être lue. C'est le `noindex` du gabarit qui fait le vrai travail, et
c'est pour ça que les deux se posent — et se lèvent — ensemble.

**Piège de Next à connaître avant d'y toucher : les métadonnées d'une page
remplacent celles du gabarit, elles ne s'y ajoutent pas.** `/agus`, `/cgv` et
`/mentions-legales` déclarent leur propre `robots` (toutes trois en
`index: false`, tant qu'elles portent des marqueurs « à compléter ») : elles ne
verront **jamais** la valeur du layout. Ça tombe bien dans ce sens — elles sont
plus restrictives. Mais une page qui déclarerait un jour `index: true`
s'indexerait **même en préproduction**. Le garde-fou n'est pas hérité de force.

Les deux modes, vérifiés :

| | par défaut | `NEXT_PUBLIC_INDEXABLE=1` |
| --- | --- | --- |
| `robots.txt` | `Disallow: /`, pas de sitemap annoncé | `Allow: /` + `Host` + `Sitemap` |
| les 5 pages publiques | `noindex, nofollow, nocache` | `index, follow` |
| `/agus`, `/cgv`, `/mentions-legales` | `noindex, follow` | `noindex, follow` |
| canonique, `og:url`, JSON-LD | suivent `NEXT_PUBLIC_SITE_URL` | idem |

L'adresse e-mail d'Agus contient `balidecouverte.fr` et ne suit évidemment pas
le domaine : c'est normal de la voir rester en préproduction.

Ce qui a été trouvé cassé, et qui l'était vraiment :

- **`colorScheme: "dark"` et `themeColor: "#061520"`** dans le layout —
  vestiges de la direction nocturne abandonnée en cours de route, sur un site
  qui déclare `color-scheme: light`. Ce n'était pas cosmétique : `color-scheme:
  dark` fait rendre au navigateur ses **propres** contrôles en sombre, donc les
  `<select>` du configurateur et l'ascenseur, et colorait la barre du navigateur
  mobile en bleu nuit au-dessus d'une page ivoire.
- **La description annonçait « devis en direct sur WhatsApp »** alors que le
  canal est devenu l'e-mail. Une description périmée n'est pas un détail : c'est
  la promesse affichée dans les résultats de recherche.
- **Le favicon était celui du gabarit Next.js.** L'onglet du navigateur
  affichait le logo de Next sur le site d'Agus.
- **`/tarifs` n'avait aucun `h1`** : la page démarrait en `h2`.
- **Aucun `metadataBase`**, donc aucune URL absolue possible pour les
  canoniques et les images de partage.
- **Ni `robots.txt`, ni `sitemap.xml`, ni données structurées, ni image de
  partage.**

> **Piège Next à connaître : déclarer `openGraph` dans une page *remplace*
> celui du layout, il ne le complète pas.** La page tarifs a ainsi perdu son
> `og:type` et son `og:image` au moment même où on lui donnait ses propres
> titre et description — vérifié, les deux étaient tombés à `null`. Il faut
> redonner `type`, `siteName`, `locale` et `images`. Même chose pour `twitter`,
> qui retombait en `summary` au lieu de `summary_large_image`.

### Les données structurées

`components/DonneesStructurees.jsx` émet un graphe JSON-LD :
`TravelAgency` + `LocalBusiness`, `Person` (Agus), `WebSite`. C'est le gain le
plus direct pour un guide local — ça dit à Google **ce qu'est** Agus, **où** il
exerce, **dans quelles langues** et **à quel prix**, au lieu de le lui laisser
deviner.

> **Aucun `aggregateRating`, et ce n'est pas un oubli.** Nous n'avons aucune
> note. En inventer une est à la fois un mensonge et une infraction aux règles
> de Google, sanctionnée par la perte des résultats enrichis. Le jour où le
> livre d'or arrivera, les avis viendront ici en `Review`, un par témoignage
> réel.

Deuxième règle : **rien qui ne soit visible sur la page.** Google exige que le
balisage décrive un contenu réellement affiché. Les prix, les langues,
l'adresse et la zone desservie le sont tous.

### L'image de partage

`app/opengraph-image.png` (1200 × 630), fabriquée une fois par un script qui
réutilise les polices déjà embarquées dans la maquette. Un PNG figé plutôt que
`next/og` : l'image ne change jamais, et la génération à la volée demanderait
de charger les polices à l'exécution.

Elle compte : ce site va circuler sur Facebook, Instagram et WhatsApp, où Agus
publie déjà. Un lien sans image de partage y est un rectangle gris.

## Le livre d'or

Sept témoignages, enfin réels. Ils vivent dans `lib/temoignages.js`, s'affichent
par trois sur l'accueil (`#temoignages`) et en entier sur `/livre-d-or`.

### Ce qui a été trouvé dans le livre d'or actuel

**Sur vingt-deux entrées, quinze étaient du spam.** Pas seulement du bruit :
publicités pour de la fraude bancaire (« YesCard », « Clone Card »), pour de
faux permis et de faux passeports, liens vers des places de marché du dark web,
référencement russe, jeux d'argent. Le tout hébergé sur le site d'un guide dont
le seul produit est la confiance, et lu par des voyageurs qui viennent
justement vérifier qu'on peut lui confier quinze jours.

Trois conséquences, dans l'ordre de gravité :

1. **Réputationnelle.** Un futur client qui descend la page tombe sur des
   annonces de faux papiers avant de tomber sur les avis.
2. **De référencement.** Une page qui pointe vers des sites de fraude est
   traitée comme telle par les moteurs, et elle contamine le domaine entier.
3. **Juridique.** Héberger et diffuser des offres de services illicites
   expose l'éditeur, en France comme ailleurs.

### Pourquoi il n'y a plus de formulaire de dépôt

Le formulaire du site actuel était ouvert à tous, sans modération ni
vérification — c'est exactement pour ça qu'il s'est rempli tout seul. Ici les
témoignages sont **des données du site**, et Agus ajoute ce qu'on lui envoie
par courriel. C'est un geste manuel deux ou trois fois par an, et une page qui
ne peut pas se retourner contre lui.

Si un formulaire revient un jour, il lui faut trois choses, pas une : une
modération **avant** publication, un anti-robot, et `rel="nofollow ugc"` sur
tout lien sortant. Sans les trois, ne pas le remettre.

### Les règles de reprise des textes

- **L'attribution a été reconstituée entrée par entrée.** Dans l'export du
  site, l'auteur figure *après* le texte auquel il correspond ; les quinze
  entrées de spam intercalées décalent l'œil d'un cran et font attribuer chaque
  avis au voisin. C'est le piège de cette extraction, et il est silencieux.
- **Seules les fautes manifestes ont été corrigées** : accords de participe,
  espaces manquantes autour des points d'exclamation, « Nous seulement » →
  « Non seulement ». Aucun mot ajouté, retiré ni déplacé. Les émojis restent —
  ils font partie de la voix des gens qui écrivent. Un témoignage réécrit
  n'est plus un témoignage.
- **Les extraits mis en exergue sont tirés mot pour mot.** Une citation entre
  guillemets qui ne figure pas telle quelle dans le texte source est un faux,
  même bien intentionné.
- **Le paragraphage d'origine est conservé** : les gens écrivent par élans, et
  coller leurs phrases en un seul bloc leur retire leur souffle.

### Les avis dans les données structurées

Les sept témoignages sont maintenant des `Review` dans le JSON-LD. **Toujours
pas d'`aggregateRating`, et pas de `reviewRating` non plus** : ces témoignages
sont des textes, personne n'a mis d'étoiles. En déduire « visiblement cinq sur
cinq » du ton serait fabriquer une donnée que personne n'a produite.

Conséquence assumée : **pas d'étoiles dans les résultats de recherche**, parce
que Google les réserve aux avis notés. C'est le prix de l'honnêteté sur ce
point, et il est faible comparé à celui d'un balisage trompeur — la sanction
est la perte de tous les résultats enrichis du domaine.

### Deux pièges de portage, tous deux silencieux

> **Un bouton qui pointe vers sa propre section ne va nulle part.** Dans la
> maquette, « Lire les 7 témoignages » était une ancre `#temoignages` — or le
> bouton *est* dans cette section. Rien ne bougeait, et rien n'avait l'air
> cassé. Le bouton porte désormais `data-goto="livre"` — c'est le passage qui a
> fait naître la troisième vue de la maquette, avant les six actuelles.
>
> **Le même piège existe dans l'app, sous une autre forme, et il a resurgi.**
> Naviguer vers le fragment sur lequel on se trouve déjà n'émet rien : le
> bouton du panier était donc inerte au deuxième appui. D'où `lib/ancre.js`,
> qui intercepte le clic et fait le `scrollIntoView` à la main. **Quand on teste
> un lien d'ancre, il faut cliquer deux fois** — le premier clic marche
> toujours.
>
> **Ne jamais réindenter un bloc extrait qui contient des gabarits.** Le script
> de portage ajoutait deux espaces après chaque retour à la ligne « pour faire
> joli » : les lignes vides qui séparent les paragraphes des témoignages sont
> devenues des lignes de deux espaces, `split("\n\n")` n'a plus rien trouvé,
> et les sept témoignages se sont affichés d'un seul tenant. Le rendu n'avait
> pas l'air en erreur — juste illisible. La vérification qui l'attrape est de
> **comparer le nombre de paragraphes des deux côtés** : 6, 4, 4, 3, 4, 4, 3.

### « Partir de ce circuit » depuis `/circuit`

Le bouton de fin de la fiche détaillée menait à `/#sur-mesure` et **ne faisait
rien** : on atterrissait sur un formulaire vide après avoir lu quinze journées,
et le message partait sans base de départ — Agus recevait une demande qui ne
disait pas qu'elle venait de son circuit.

La cause est structurelle et vaut d'être notée : **le magasin (`TripProvider`)
n'existe que sur l'accueil.** C'est un état React, pas un stockage ; changer de
page le recrée à vide. Un bouton sur `/circuit` ne peut donc pas « cliquer »
dans l'état de l'accueil — il faut que l'intention voyage dans l'URL.

D'où `?circuit=bali`, lu par `components/PreselectionCircuit.jsx`. Trois détails
qui ne sont pas décoratifs :

- **Un paramètre d'URL plutôt que `sessionStorage`** : un lien qu'on envoie à
  quelqu'un garde la sélection, et un rechargement aussi. C'est exactement le
  genre de trou qu'on vient de boucher.
- **Le défilement est fait en JS, pas laissé au fragment `#sur-mesure`.** La
  sélection insère le bloc « Ma base de départ » *au-dessus* du formulaire :
  le navigateur a déjà sauté avant que la page ait sa hauteur définitive. On
  attend la peinture suivante et on vise l'ancre soi-même. (Ne rien ajouter
  comme décalage : `[id] { scroll-margin-top }` s'en charge.)
- **Un garde `useRef` par valeur** : sans lui, revenir en arrière dans
  l'historique rejouerait la sélection et écraserait un choix que le voyageur
  aurait entre-temps annulé.

⚠️ `useSearchParams` fait basculer en rendu client tout ce qui est sous la
frontière `<Suspense>` la plus proche, et **sur une route prérendue, l'absence
de frontière fait échouer le build**. Elle est posée dans le composant, pas chez
l'appelant.

### Le piège du `data-de` à l'aller et au retour (prototype)

Le bouton « Partir de ce circuit et l'ajuster » atterrissait **en haut de la
page d'accueil** au lieu du formulaire, dans la maquette seulement. La cause
est instructive : le gestionnaire `data-goto` ne mémorisait la provenance
(`retourDepuis`) **que si la vue cible n'était pas l'accueil** — il était écrit
pour un aller vers une sous-page, dont on voudrait revenir. Un lien qui va
*vers* l'accueil et qui **désigne son point d'arrivée** par `data-de` voyait
donc son attribut ignoré, et le défilement retombait sur la valeur précédente,
« top ».

La règle générale, qui vaut au-delà de ce fichier : **un attribut qui nomme une
destination doit l'emporter dans les deux sens.** Ne pas le conditionner à la
direction du trajet.

### Le lien emporte sa provenance

Comme celui des tarifs : `/livre-d-or?de=temoignages` dans l'application,
`data-de="temoignages"` dans la maquette. Le retour ramène donc à la section
des avis, pas en haut de l'accueil.

`data-de` l'emporte sur la détection automatique, et c'est nécessaire : le
bouton vit *dans* la section « Livre d'or », mais au moment du clic celle-ci
peut n'être qu'à moitié entrée à l'écran, et `sectionCourante()` désigne alors
la section précédente. Quand la provenance est connue à l'avance, on l'écrit
plutôt que de la deviner.

Depuis le pied de page, où il n'y a pas de provenance à mémoriser, le lien
reste nu et le retour dit « Retour à l'accueil ».

### Où ils sont placés, et pourquoi

Juste avant le configurateur. **La preuve sociale travaille au moment du
doute, pas au moment de la curiosité** : le voyageur vient de choisir ce qu'il
veut voir et s'apprête à écrire à un inconnu à 12 000 km. C'est là, et
seulement là, qu'il a besoin de lire que d'autres l'ont fait avant lui.

Trois sur l'accueil et non sept : sept blocs de texte d'affilée ne se lisent
pas, ils se survolent. Les trois retenus ne disent pas la même chose — l'un
porte l'émotion, l'autre l'organisation sans imprévu, le troisième une
expérience rare.

## Les pages légales

Deux pages : `/mentions-legales` et `/cgv`. Elles sont **rédigées mais pas
opposables** — voir plus bas ce qu'il reste à trancher.

### Comment elles sont faites

Toutes les valeurs vivent dans `lib/legal.js`. Ce qui n'est pas encore connu y
vaut `null`, et **s'affiche alors en clair sur la page, en rouge, avec la
mention « à compléter »**. C'est délibéré : une page légale à trous qui a
l'air complète est plus dangereuse qu'une page visiblement inachevée, parce
qu'on la met en ligne sans la voir. Un bandeau d'avertissement coiffe les deux
pages, et les deux routes sont en `noindex` — elles ne sont pas non plus dans
le sitemap.

Le vocabulaire change de registre : le reste du site parle à la première
personne, les CGV disent « le Guide » et « le Client ». Ce n'est pas une
inattention. Un contrat a besoin de termes définis, et « je » ne dit pas qui
s'engage quand la prestation est reprise par un autre guide de l'union.

Le barème d'annulation de l'article 11 est **une proposition**, pas les
conditions d'Agus. Il est marqué comme telle et vit dans une seule constante
(`ANNULATION`) : tout le reste des CGV y renvoie, il n'y a qu'un endroit à
changer.

### La question qui commande tout : forfait ou pas

Le site dit aujourd'hui « si vous le souhaitez, je choisis et je réserve aussi
vos hôtels », et Agus a confirmé qu'il le fait sur demande. Or **la
combinaison d'un transport et d'un hébergement vendus pour un même voyage est
un forfait touristique** au sens de la directive européenne 2015/2302. Un site
en français, en euros, qui s'adresse à des voyageurs français « dirige son
activité » vers la France : le régime s'applique même à un opérateur établi
en Indonésie.

Ce que ça déclenche :

- une **protection contre l'insolvabilité** (garantie financière), qui est la
  contrepartie du fait d'encaisser un acompte pour des nuits qu'on n'a pas
  encore payées ;
- une **responsabilité de plein droit** sur toute la chaîne, y compris les
  prestations exécutées par les hôteliers ;
- un **formulaire d'information standard** à remettre avant la conclusion du
  contrat.

Deux issues, et c'est à Agus de choisir :

1. **Ne plus réserver les hébergements** — conseiller, envoyer les liens,
   mais laisser le voyageur contracter directement avec l'hôtel. Le voyage
   redevient une prestation unique, sans garantie financière à souscrire.
   C'est de loin le plus simple, et ça ne change presque rien pour le
   voyageur.
2. **Assumer le forfait** et souscrire la garantie. Plus protecteur pour le
   client, plus engageant pour Agus.

L'article 3 des CGV est écrit pour tenir les deux : il décrit les deux natures
de prestation et dit qu'en l'absence de garantie, seule la première est
proposée. **Ne pas retirer ce paragraphe sans avoir tranché.**

### Ce qui manque, et qui n'est pas de la rédaction

| Champ | Où | Pourquoi c'est bloquant |
| --- | --- | --- |
| Numéro d'enregistrement (NIB / NPWP) | `EDITEUR.identifiant` | Identification du professionnel |
| Hébergeur : nom, adresse, téléphone | `HEBERGEUR` | Obligation de la LCEN, pas facultative |
| Assurance RC pro : assureur, police, **étendue géographique** | `ASSURANCE` | Une police qui ne couvre pas une réclamation portée en France ne protège de rien |
| Garantie contre l'insolvabilité | `GARANTIE` | Obligatoire si forfait — voir ci-dessus |
| Médiateur de la consommation | `MEDIATEUR` | Obligatoire pour vendre à des consommateurs français |
| Montant de l'acompte, échéance du solde, validité du devis | `PAIEMENT`, article 4 et 8 | Ce sont les pratiques réelles d'Agus, pas des choix de rédaction |

Et une relecture par un professionnel du droit français du tourisme. Ce
document a été écrit avec soin, il n'a pas été écrit par un juriste.

## Performance

Mesures faites en local, `next start`, gzip actif, sur `encodedDataLength`
— **et non sur `content-length` lu côté Playwright, qui rend la taille
décompressée et triple les chiffres.** Mobile bridé : 390 × 844, 4G lente
(1,6 Mb/s, 150 ms de latence), CPU divisé par quatre.

| | avant | après |
| --- | --- | --- |
| JavaScript sur le fil | 216 ko | **170 ko** |
| Total sur le fil (accueil) | 341 ko | **275 ko** |
| LCP mobile bridé (accueil) | 2 776 ms | **1 316 ms** |
| Tâches longues (accueil) | 916 ms | 814 ms |
| CLS | 0 | 0 |

**Le gain vient d'un seul retrait : la bibliothèque d'animation.** Elle servait
quatre choses — les apparitions au défilement, la cascade d'entrée du hero, la
barre mobile, la liste du panier. Les trois premières sont exactement ce que la
maquette faisait déjà en CSS depuis le début.

Ce que ça change au-delà des octets :

- `Reveal` était un **composant client**, et il y en a une soixantaine sur
  l'accueil : autant de frontières d'hydratation pour une transition
  d'opacité. C'est maintenant un composant serveur, plus **un seul**
  `IntersectionObserver` monté une fois (`RevealObserver`).
- `Hero` est redevenu un **composant serveur**. Sa cascade part à l'affichage
  et non à l'hydratation : elle est donc plus tôt, et elle ne dépend plus du
  JavaScript. C'est ce qui explique la moitié du LCP gagné.

> **Les `.reveal` partent à `opacity: 0` : si le script ne s'exécute pas, la
> page reste blanche.** Trois filets, et ils ne couvrent pas le même cas — ne
> pas en retirer un en croyant qu'un autre suffit : un `<noscript>` qui
> neutralise la classe, un repli si `IntersectionObserver` manque, et la règle
> `prefers-reduced-motion`.

Seul recul assumé : **le retrait d'une ligne du panier n'est plus animé.** Une
transition CSS ne sait pas animer ce qu'on retire de l'arbre. L'entrée l'est
toujours.

### Ce qui reste, et ce qui n'en vaut pas la peine

- **L'accueil pèse 202 ko de HTML brut** (37,8 ko une fois compressé) et
  1 654 nœuds, à cause des paysages SVG dessinés à la main : chaque vignette
  d'activité porte les siens, gradients compris. **Ça se résoudra tout seul le
  jour où les vraies photos arriveront** — ne pas optimiser des placeholders.
- **Les deux polices pèsent 55,5 ko** et sont toutes deux utilisées. Rien à
  gagner sans en supprimer une.
- **Depuis `/tarifs`, 15,8 ko de préchargement** du contenu de l'accueil : c'est
  le lien de retour qui prépare la navigation attendue. Le coût est assumé, il
  achète un retour instantané.
- Il reste **814 ms de tâches longues** sur mobile bridé : c'est l'hydratation
  de React et du configurateur. Descendre plus bas voudrait dire rendre le
  configurateur non interactif tant qu'il n'est pas visible, ce qui est un
  chantier à part.

## Architecture

```
app/
  layout.js            polices, métadonnées, garde-fou d'indexation,
                       et le TripProvider qui enveloppe tout le site
  globals.css          tokens de design, classes de base
  page.js              l'accueil
  circuit/page.js      le jour par jour des 15 jours
  envies/page.js       les 14 activités cochables
  agus/page.js         le portrait d'Agus
  tarifs/page.js       les formules et la grille par saison
  livre-d-or/page.js   les sept témoignages, en entier
  cgv/page.js          )  brouillons : bandeau d'avertissement,
  mentions-legales/    )  noindex, absents du sitemap
components/
  Navbar.jsx         nav collante, linteau, menu Meru à toutes les largeurs
  Hero.jsx           panneau immersif, entrée en cascade, bandeau des étapes
  AboutAgus.jsx      la promesse, puis le panneau des valeurs
  Chemins.jsx        la fourche : deux cartes, deux pages
  Activites.jsx      classiques et places secrètes, cochables (/envies)
  Tarifs.jsx         trois formules, grille par saison, compris
  Usages.jsx         six usages balinais, sur bande pleine
  Temoignages.jsx    trois avis sur l'accueil, avant la demande
  Symboles.jsx       les neuf symboles balinais au trait
  LienPage.jsx       le lien vers une autre page : libellé souligné + flèche
  RetourLien.jsx     le retour, vers la section d'origine
  LienTarifs.jsx     le lien vers les tarifs, lesté de sa provenance
  PreselectionCircuit.jsx  lit ?circuit= et pose la sélection à l'arrivée
  Photo.jsx          emplacement photo — placeholder porteur du brief
  Lightbox.jsx       visionneuse plein écran, swipe, clavier et pastilles
  TripBuilder.jsx    configurateur + rédaction de l'e-mail
  MobileBar.jsx      rappel du voyage en cours, sur mobile
  Scene.jsx          paysages SVG + ornements (jepun, canang, séparateur)
  PageLegale.jsx     gabarit des pages légales
  AComplete.jsx      le marqueur « à compléter », partout où il en faut
  Reveal.jsx         apparition au scroll (serveur, pure CSS)
  RevealObserver.jsx l'unique IntersectionObserver, monté par page
  DonneesStructurees.jsx  le graphe JSON-LD
  SectionHead.jsx    en-tête de section
lib/
  data.js            le contenu du site — 20 exports, voir l'avertissement
  circuit.js         le jour par jour, le cadre, le compris/non-compris
  portrait.js        les faits du portrait, et ses neuf trous
  temoignages.js     les sept témoignages réels du livre d'or
  legal.js           identité, assurance, barèmes — et les trous
  trip-store.jsx     état partagé (Context + useReducer)
  message.js         objet, corps et lien mailto:
  navigation.js      les entrées du menu et leurs gloses
  retours.js         d'où l'on vient, et comment y retourner
  ancre.js           le clic d'ancre fait à la main — voir plus bas
  site.js            origine canonique, titre, description, indexabilité
```

⚠️ **`app/layout.js` porte le `<TripProvider>`, et ce n'est pas un détail
d'organisation.** Le magasin vit dans le gabarit pour survivre aux navigations
entre pages. Conséquence directe : **tout lien interne doit passer par
`next/link`.** Un `<a href="/…">` provoque un chargement complet, qui recrée le
gabarit et **vide la sélection du voyageur** — le panier retombe à zéro entre
`/envies` et le formulaire, sans le moindre message d'erreur.

`app/` porte aussi les conventions de fichiers de Next : `robots.js`,
`sitemap.js`, `icon.svg`, `apple-icon.png` et `opengraph-image.png`. Aucune
n'a besoin d'être déclarée dans les métadonnées, Next les ramasse et injecte
les balises.

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

### La première vraie photo

`public/agus-portrait.{jpg,webp}` — Agus sur une plage de galets de l'est de
Bali, au soleil couchant. Elle remplit les deux arches du site : celle de
l'accueil et celle du portrait. **Les 41 autres emplacements restent des
illustrations** et portent toujours leur bandeau « Photo à venir ».

Pourquoi celle-ci marche, et il vaut la peine de le savoir pour choisir les
suivantes :

- **La lumière est celle de la palette.** Or, ambre, ivoire — la photo n'a pas
  eu à être réchauffée pour s'accorder au site, elle l'était déjà.
- **Le lieu est dans le cadre.** Mer, montagnes, galets volcaniques : elle ne
  dit pas seulement « voici un homme », elle dit « il est chez lui ». C'est
  exactement l'argument de la page.
- **Elle est décontractée** — casquette, t-shirt. C'est un atout et non un
  défaut ici : tout le site plaide qu'on écrit à **un homme, pas à une
  agence**. Une photo en chemise aurait plaidé le contraire.

> ⚠️ **Le cadrage est le vrai travail.** La source est un paysage 3/2 où Agus
> occupe le tiers droit ; les cadres du site sont des arches en 46/50, presque
> carrées. Trois recadrages ont été comparés dans le vrai gabarit — pas dans un
> éditeur d'images, **dans le masque d'arche**, parce que la forme change tout :
> elle ronge les deux angles supérieurs, et un cadrage qui semble juste en
> rectangle décapite en arche.
>
> Celui retenu place le visage au tiers droit et garde l'horizon et la plage à
> gauche. **Ne pas recadrer plus serré sur le visage** : la moitié de ce que dit
> cette photo est dans le décor.

`components/Photo.jsx` sert désormais un `<picture>` : WebP en deux largeurs
(600 et 840) avec un JPEG en repli universel, et un `sizes` par appelant.
**`sizes` n'est pas décoratif** — sans lui le navigateur suppose l'image large
comme la fenêtre et télécharge la variante 840 pour un cadre de 280 px.

> Le bandeau du brief disparaît de lui-même : il n'est rendu que dans la branche
> sans `src`. Il n'y a donc rien à retirer à la main quand une photo arrive — et
> **l'illustration de repli reste**, les 41 autres emplacements s'en servent.

**La maquette l'embarque en base64** (WebP 700 px, 47 ko → 62 ko encodés) parce
qu'elle est un fichier autonome. Elle pèse maintenant 464 ko. Ne pas recopier ce
choix dans l'app.

**Pour passer à de vraies photos, il n'y a rien à remplacer.**
`components/Photo.jsx` porte déjà les deux états : si `src` est posé, il rend
un `<img>` ; sinon il rend la scène SVG **et le brief de prise de vue** en
bandeau. La section devient de fait la liste des photos à faire, au lieu d'une
note perdue dans un fichier à part.

Il y a **42 emplacements, tous vides** — 14 activités × 3 photos — plus le
portrait d'Agus et le hero. Le jour où une photo existe : poser `src` et `alt`
dans `lib/data.js`, rien d'autre ne bouge, ni ici ni chez les appelants.

> ⚠️ **`Photo.jsx` sert un `<img>` brut, sans redimensionnement.** Tant que les
> emplacements sont vides ça ne coûte rien ; le jour où on y verse 42 photos de
> téléphone à 4 Mo, le site devient plus lent que tout ce qu'on a gagné en
> allégeant les pages. Un pipeline de traitement des images est un prérequis à
> l'intégration des photos, pas une optimisation à faire ensuite.

## Reste à faire avant une mise en production

- **Poser les deux variables d'environnement** — `NEXT_PUBLIC_SITE_URL` et
  `NEXT_PUBLIC_INDEXABLE=1`, voir `.env.example`. **Sans elles, le site est
  invisible aux moteurs**, ce qui est le bon défaut pour une préproduction et
  le pire des oublis pour une mise en production. C'est la première chose à
  vérifier le jour J, et la seule qui ne se voit pas en regardant les pages.
- **Côté hébergement** : faire rediriger `www.balidecouverte.fr` en 301 vers
  l'apex, et vérifier que le certificat couvre l'apex. Le domaine canonique est
  tranché (voir `lib/site.js`), mais ces deux réglages-là vivent hors du dépôt.
- Photos réelles d'Agus et des journées (42 briefs sont prêts).
- **Purger le livre d'or du site actuel** avant toute redirection : il contient
  quinze entrées de spam, dont des publicités pour de la fraude bancaire et des
  faux papiers. Ne pas migrer la page telle quelle.
- **Compléter et faire relire les pages légales** (voir la section dédiée),
  puis lever le `noindex` et les ajouter au `sitemap.js`.
- Faire relire à Agus les 14 récits d'activités et la citation de travail.
- Suivi de conversion sur l'envoi du mail.
