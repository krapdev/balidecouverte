# La section « Envies » — brief pour projet Claude

Document de cadrage pour faire évoluer la section activités du site
*Bali Découverte* (le guide Agus Yudiarta, Denpasar). Il est fait pour être
importé dans la base de connaissances d'un projet Claude et servir de point de
départ à la réflexion — pas pour être appliqué.

## Comment s'en servir

**Ce document ne recopie pas le catalogue, volontairement.** Les vingt-deux
activités, leurs textes, les prix et les saisons vivent dans `lib/data.js` :
les résumer ici en créerait une deuxième version, qui divergerait au premier
changement. C'est déjà arrivé sur ce projet entre l'application et sa maquette
— quarante-deux phrases propres à l'une, quarante à l'autre.

À joindre au projet, en plus de ce fichier :

| Fichier | Ce qu'il apporte |
| --- | --- |
| `lib/data.js` | **Source de vérité.** Les 22 activités, les tarifs, les circuits. Rien ne s'invente contre lui. |
| `AGENTS.md` | Les règles du projet. Chaque ligne a coûté un bug ou un contresens sur un homme réel. |
| `components/Activites.jsx` | Le rendu actuel, et le pourquoi de chaque choix en commentaire. |
| `lib/message.js` | Ce que la sélection devient : le message envoyé à Agus. |

Une proposition d'instructions personnalisées du projet figure en fin de
document.

## Ce que la section est aujourd'hui

Une page entière, `/envies`, et une seule.

- **22 fiches** : 15 « classiques », 7 « places secrètes ». Deux familles, et
  la distinction porte tout le propos commercial — les classiques rassurent,
  les places secrètes donnent la raison de passer par Agus plutôt que par une
  agence.
- **Une grille plate**, deux colonnes à partir de `sm`, dans l'ordre du
  tableau. Pas de filtre, pas de tri, pas de recherche, pas de pagination.
- **Une carte, deux gestes** : toute la surface ouvre le plein écran (récit
  long + photos) ; un « + » de 44 px ajoute l'activité à la demande. Le geste
  fréquent — découvrir — a la grande surface.
- **La sélection survit à la navigation** (le magasin vit dans `app/layout.js`)
  et ressort dans le message envoyé à Agus, en deux listes séparées :
  « Ce que je ne veux pas manquer » / « Et ces endroits-là m'ont donné envie ».
- **Sortie inconditionnelle** en bas de page : le bouton d'envoi n'apparaît
  qu'avec au moins une envie cochée, mais la page ne se termine jamais sur rien.

### Le modèle de données

Six champs par activité, pas un de plus :

```
id · famille ("classique" | "secret") · titre · texte (résumé, 3 lignes)
recit (paragraphe long) · photos[] { scene, brief, alt, src }
```

Tout le reste — durée, région, saison, effort, prix, matériel, âge minimum —
n'existe pas comme donnée. Quand l'information est là, elle est **noyée dans
la prose** : « Forfait à part, de novembre à mars » vit dans le `texte` de Nusa
Penida, « un guide de sentier est obligatoire » dans le `recit` de Munduk. Un
humain le lit ; le site ne peut rien en faire.

## Les besoins qui ne trouvent pas de place

Chacun est constaté dans le dépôt, pas supposé.

**1. Où vous logez.** `ACTIVITES_RESTE` promet mot pour mot : « Je vous
propose celles qui collent à l'endroit où vous logez. » Rien dans les données
ne dit où se trouve une activité. La page fait donc une promesse qu'elle est
seule à ne pas pouvoir tenir — alors que la notion de région existe ailleurs :
`TARIFS.supplement` liste l'est, le nord-centre, le nord et le nord-ouest,
avec 15 € de nuitée à la clé.

**2. Ce qui tient dans une journée.** Le tarif se compte **par journée et par
véhicule**, pas par personne ni par activité. Savoir ce qui s'enchaîne et ce
qui se dilue est explicitement le métier d'Agus — c'est écrit dans le chapô de
la page. Mais cocher sept envies ne dit pas si ça fait trois jours ou six, ni
au voyageur, ni au site, ni au message.

**3. La saison et l'heure.** Nusa Penida ne se fait que de novembre à mars ;
le Batur est un lever de soleil ; les dauphins de Lovina se voient tôt ; le
sentier de Munduk glisse après la pluie. Le formulaire, lui, sait déjà le mois
du voyage (`monthOptions`, `periodNote`) — et la liste d'activités l'ignore.
Une activité impossible en août reste cochable en août.

**4. Avec qui on voyage.** Le formulaire collecte `adults` et `children`. La
liste n'en tient aucun compte, alors que l'écart est réel entre une « Journée
sportive », trois heures de dénivelé à Munduk, l'ascension nocturne du Batur —
et une cuisine face aux rizières.

**5. Ce qui coûte en plus.** Les entrées de sites et les activités payantes
sont hors forfait à la journée (`TARIFS.exclus`), Nusa Penida est un forfait à
part à 230 € pour deux. Cocher des envies ne laisse rien deviner de l'addition
— et « une addition qui grimpe après coup est ce qui abîme le plus la
confiance » est déjà la règle assumée de la page tarifs.

**6. Le style annoncé.** `STYLES` propose Nature, Culture, Aventure, Détente,
Famille, Gastronomie dans le formulaire. Aucune activité ne porte de style. Le
voyageur déclare ce qu'il cherche, et rien ne l'y conduit.

**7. Le catalogue réel n'est pas importé.** L'en-tête de `lib/data.js` le dit :
le vrai catalogue d'Agus est « une série d'excursions à la journée numérotées
et de circuits packagés à prix fixe ; il reste à reprendre depuis le site
actuel ». Les 22 fiches actuelles sont **rédigées à partir des pages d'Agus**,
pas dictées par lui, et doivent lui être relues avant mise en ligne. Toute
refonte du modèle se heurtera d'abord à ça.

**8. L'échelle.** `ACTIVITES_RESTE` annonce déjà d'autres activités « par
région : le sud et la presqu'île de Bukit, l'est et Tirta Gangga, le
centre-nord et Tamblingan ». Une grille plate de 22 cartes tient ; à 35 ou 40,
la page devient un catalogue qu'on parcourt au pouce, et le rapport 15/7 qui
fait tout le propos se dilue.

**9. Une envie n'est pas un jour.** Le message part comme deux listes de noms,
sans ordre, sans dates, sans regroupement géographique. Agus refait à la main
le tri que le site avait sous la main.

## Ce que le relevé des axes a montré

Quatre axes ont été envisagés — région, activité, prix, nature. La planche
`design/envies-axes.html` les met à l'épreuve sur les 22 activités réelles
(elle est **générée depuis `lib/data.js`**, rien n'y est recopié). Trois
constats en sont sortis, qu'aucune discussion n'aurait donnés :

**« Par prix » ne peut pas exister.** Le tarif se compte par journée et par
véhicule — 80 à 120 € selon la saison, le même à un ou à trois. Aucune
activité n'a de prix, et lui en attribuer un reviendrait à en inventer
vingt-deux. Ce qui varie réellement avec le choix, c'est **où l'on dort** :
15 € de supplément par nuit dès qu'on loge loin de Denpasar, et le forfait
séparé de Nusa Penida. **L'axe « région » est donc déjà l'axe « prix »** — un
seul geste répond aux deux questions, et il répond vrai.

**L'axe « région » est déséquilibré** : 9 activités dans le sud et le centre,
6 dans le nord-centre, 4 à l'est, 2 au nord-ouest, 1 aux îles. Utilisable
comme *question posée* au voyageur — « où logez-vous ? » —, pas comme sommaire :
un sommaire dont une entrée contient un seul élément se lit comme une erreur.

**`STYLES` ne trie pas.** Le vocabulaire du formulaire (Nature, Culture,
Aventure, Détente, Famille, Gastronomie) appliqué aux activités donne
« Culture » sur 14 des 22 et « Nature » sur 12 : un filtre qui ne retire rien.
La planche propose à la place un vocabulaire de **gestes** — ce qu'on *fait*,
pas de quoi ça a l'air : Regarder 11, Marcher 7, Rencontrer 6, Goûter 3, Se
poser 3. Celui-là sépare. C'est une proposition éditoriale, à valider par Agus.

Les régions et les gestes affectés activité par activité figurent au bas de la
planche, avec le passage de `lib/data.js` qui fonde chacun et un marqueur sur
les quatre cas que le texte ne tranche pas.

## Les questions à trancher

Elles sont l'ordre du jour du projet ; aucune n'a de réponse évidente.

1. **Enrichir ou segmenter ?** Ajouter des champs (région, durée, saison,
   effort) à un objet unique — ou reconnaître que « une excursion d'une
   journée numérotée » et « une envie qu'on glisse dans un circuit » sont deux
   objets différents, comme le laisse entendre l'en-tête de `data.js` ?
2. **Filtrer, ou proposer ?** Un jeu de filtres transforme la page en moteur de
   recherche — pratique, et exactement ce que fait une agence. La position du
   site est inverse : c'est Agus qui propose. Une troisième voie serait de
   n'utiliser les nouveaux champs qu'en sortie (regrouper le message par
   région, signaler une incompatibilité de saison) sans jamais rien montrer.
   Les quatre réponses possibles sont montées côte à côte dans
   `design/envies-axes.html`.
3. **La région remplace-t-elle la famille, ou s'y ajoute-t-elle ?** Grouper par
   région est ce que réclame le voyageur ; grouper par famille est ce qui vend.
   Les deux à la fois font deux axes sur une page qui n'en supporte qu'un.
4. **Faut-il montrer une addition ?** Un compteur « ≈ 3 journées, à partir de
   240 € » serait la réassurance la plus forte du site — et le premier chiffre
   que le site avancerait sans qu'Agus l'ait dit. Le dépôt interdit d'inventer
   un prix ; il n'interdit pas de lui en faire valider un.
5. **Où s'arrête la page ?** Aujourd'hui elle mène au formulaire. Doit-elle
   aussi mener au circuit de 15 jours quand la sélection ressemble à un
   circuit ?
6. **Que devient le compte 15/7** si le catalogue réel double le nombre de
   classiques ? Les places secrètes sont le cœur de l'offre ; noyées à 7 sur
   40, elles ne se voient plus.

## Les invariants — ce qu'aucune évolution ne peut casser

Extraits d'`AGENTS.md`, qui fait foi. Les plus structurants pour cette section :

- **On ne publie ni l'adresse ni l'itinéraire d'une place secrète.** On la
  nomme, on donne envie. Ce qui se monnaie, c'est d'y conduire.
- **Aucun fait inventé sur Agus, aucun prix, aucune durée inventés.** Ce qui
  n'est ni dans `lib/data.js`, ni dans `lib/circuit.js`, ni dans un message du
  client porte un marqueur `<AComplete>`.
- **Aucun témoignage ni aucune note inventés.** Pas d'`aggregateRating` ni de
  `reviewRating` dans le JSON-LD : personne n'a donné d'étoiles.
- **`lib/data.js` ne se modifie pas au script sans recompter les exports
  après** — une réécriture par tranche en a déjà avalé un entier.
- **Toute évolution de l'app se porte dans `design/prototype.html`**, et
  réciproquement. La maquette n'a pas de bibliothèque d'icônes : une icône
  posée dans l'app est à recopier à la main, depuis le rendu, jamais de
  mémoire.
- **Une page ne se termine jamais sans pas suivant**, et ce pas ne dépend
  jamais d'un état (`components/Suite.jsx`).
- **Le niveau de titre se déduit de la place dans le document**, jamais de la
  taille voulue : `Activites` reçoit `niveau` et en dérive ses titres de
  famille.
- **La barre du haut ne tient que six entrées**, et une entrée par
  destination. Une section « activités » de plus n'entre pas gratuitement.
- **Le rouge (`--bougain-ink`) est rare, par fonction** : il va aux titres du
  parcours. Une nouvelle rubrique n'y a pas droit d'office.
- **Tout lien interne passe par `next/link`** : un `<a href="/…">` vide la
  sélection sans le moindre message.
- **44 × 44 px minimum** pour toute cible, 3:1 de contraste pour tout objet
  graphique, jamais la couleur seule pour porter une information.

## Ce qu'il faudrait demander à Agus

Le projet butera vite là-dessus ; autant que la liste existe dès le début.

1. Le catalogue réel : les excursions à la journée numérotées, avec leurs
   numéros, et les circuits packagés à prix fixe.
2. Pour chaque excursion : la région de départ, la durée réelle, ce qui s'y
   enchaîne dans une même journée.
3. Les saisons et les horaires contraints (au-delà de Nusa Penida et du Batur).
4. Ce qui ne convient pas à de jeunes enfants, et ce qui demande une condition
   physique.
5. Le montant des entrées principales, s'il accepte de les publier.
6. La relecture des 22 `recit` actuels, rédigés à partir de ses pages mais pas
   dictés par lui.

---

## Instructions personnalisées du projet Claude

> Tu m'aides à faire évoluer la section « Envies » du site Bali Découverte, le
> site d'un guide francophone réel à Bali, Agus Yudiarta. Le site est son
> gagne-pain.
>
> **Le brief de cadrage et les fichiers joints font foi.** Le catalogue des
> activités est dans `lib/data.js` : ne cite jamais une activité, une durée, un
> prix ou une saison sans l'y avoir vérifié, et ne complète jamais de mémoire.
> Si un fait manque, dis qu'il manque — c'est une question à poser à Agus, pas
> un trou à combler.
>
> `AGENTS.md` liste des règles nées de bugs réels : ne propose rien qui les
> contredise sans le signaler explicitement comme un arbitrage à valider.
>
> On nomme les places secrètes, on ne publie jamais leur adresse ni le chemin
> pour y aller.
>
> Réponds en français, au ton du site : direct, concret, sans superlatif
> touristique. Quand plusieurs options se valent, tranche et dis pourquoi
> plutôt que de dérouler un tableau comparatif.
>
> Cette conversation sert à *réfléchir*, pas à produire du code : propose des
> modèles, des maquettes de parcours, des arbitrages. Le code viendra ensuite,
> dans le dépôt.
