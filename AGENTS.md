<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Bali Découverte — les règles du projet

Le `README.md` explique le pourquoi de chaque choix. Ce fichier-ci ne liste que
ce qui **casse quelque chose en silence** si on l'ignore. Chaque ligne a coûté
un bug.

## Le contenu parle d'un homme réel

Agus Yudiarta existe, et le site est son gagne-pain.

- **Pas d'âge dans une biographie.** Deux sources donnaient trois âges
  différents pour les mêmes trois enfants : les deux étaient vraies le jour où
  elles ont été écrites. Une source réelle mais **périmée** est aussi fausse
  qu'une source inventée, et plus dangereuse parce qu'elle se vérifie.
  `AGUS.famille` dit « deux filles et un garçon » — ne pas y remettre de
  chiffres, pas même à jour.
- **Vérifier les homoglyphes de tout texte collé.** Le texte officiel d'Agus
  contenait « faҫon » avec un `ҫ` cyrillique (U+04AB). Invisible à l'œil, il
  casse la recherche et la synthèse vocale. Rejeter tout caractère au-dessus de
  U+2000 dont `unicodedata.name()` commence par CYRILLIC, GREEK ou FULLWIDTH.
- **Ne jamais inventer un fait le concernant.** Ce qui n'est ni dans
  `lib/data.js`, ni dans `lib/circuit.js`, ni dans un message de l'utilisateur
  doit porter un marqueur `<AComplete>`. « Formé et enregistré à Bali » a été
  écrit puis retiré : ce n'était nulle part dans les sources.
- **Ne jamais inventer un témoignage ni une note.** Les sept de
  `lib/temoignages.js` sont réels et fournis par le client. Le JSON-LD ne porte
  **ni `aggregateRating` ni `reviewRating`** : personne n'a donné d'étoiles, et
  en déduire « visiblement 5/5 » fabriquerait une donnée que nul n'a produite —
  c'est aussi une violation des règles de Google, sanctionnée par la perte de
  tous les résultats enrichis du domaine.
- **Les places secrètes se nomment, leur adresse ne se publie jamais.** On crée
  le désir, on ne donne ni l'itinéraire ni le point GPS.
- **L'union n'est pas une association constituée.** Agus a précisé : « ce
  n'est pas une association officielle des guides actuellement, uniquement
  une entraide et union des guides indépendants ». Il écrit **« une union de
  guides »**, jamais « syndicat » ni « association ». Le bloc `UNION` de
  `lib/portrait.js` a été supprimé pour cette raison — **un formulaire vide
  n'est neutre que si la chose qu'il décrit existe.** Quatre cases en
  attente d'un nom d'association affirmaient, par leur seule présence,
  qu'une association existait. Ne pas le recréer.
- Le texte des valeurs s'écrit **par le positif**. La règle s'est précisée
  depuis qu'Agus a témoigné de son passage en agence : **jamais d'agence
  nommée, jamais de grief qu'on ne pourrait attribuer à quelqu'un.** Son vécu
  lui appartient et il peut le dire ; on ne le généralise pas à sa place.
- **On ne dit pas « autocar » à Bali** — un bus de touristes est un bus.
- Le jour par jour de `lib/circuit.js` est **un engagement contractuel**. Ne
  pas arrondir une durée, ne pas retirer une mention « guide de sentier
  obligatoire », ne pas embellir.
- Les données des quatre circuits retirés et des îles sœurs sont **dans
  l'historique git** (`git show <commit>:lib/data.js`). Les restaurer, jamais
  les réécrire de mémoire : on produirait des prix faux.

## Les pièges techniques

- **`lib/data.js` ne se modifie pas au script sans vérifier après.** Une
  réécriture par tranche a déjà avalé un export entier. Il y en a **20** ;
  les recompter après toute édition scriptée.
- **Une page qui se termine sans pas suivant est une impasse.** Trois sur cinq
  en étaient : `/agus` ne proposait rien du tout, `/envies` rien tant qu'on
  n'avait pas coché, `/tarifs` un retour et non une suite. Le pas suivant vit
  dans `components/Suite.jsx`, et `/circuit` s'en sert aussi — le motif y était
  écrit à la main, le laisser en double l'aurait fait diverger. Vérifier au bas
  du contenu et **avant le pied de page**, pas dans le pied.
- **Une sortie ne doit pas dépendre d'un état ni d'un échafaudage.** Sur
  `/agus` la suite est posée avant le bloc des questions, qui disparaîtra ; sur
  `/envies` c'est la suite qui est inconditionnelle et non le bouton d'envoi,
  qui mentirait avec une sélection vide.
- **Une entrée de menu par destination, et une destination par entrée.**
  `lib/navigation.js` en portait neuf pour six endroits : `#valeurs` est à
  l'intérieur de `#esprit` (le saut sur l'un pose déjà l'autre à l'écran),
  `/agus` promettait mot pour mot les trois points du panneau des valeurs, et
  `#chemins` est une fourche dont les deux branches sont listées juste en
  dessous. Vérifier au saut, pas au `href` : deux ancres dans la même section
  ne font pas deux endroits où aller.
- **La barre du haut ne tient que six entrées** — au septième les liens
  passent à la ligne à 1280 px. `ANCRES` reste dérivée de `NAV` : y mettre
  des sections hors menu éteint le repère de position à chaque passage.
- **Tout lien interne passe par `next/link`.** Le magasin du voyageur vit dans
  `app/layout.js` ; un `<a href="/…">` provoque un chargement complet qui
  recrée le gabarit et **vide la sélection**, sans le moindre message.
- **Naviguer vers le fragment où l'on se trouve déjà n'émet rien.** D'où
  `lib/ancre.js`. Quand on teste un lien d'ancre, **cliquer deux fois** : le
  premier clic marche toujours.
- **Ne pas remettre de `scroll-padding-top` sur `html`.** Le dégagement vit dans
  `[id] { scroll-margin-top: 5rem }` ; cumuler les deux fait atterrir à 176 px
  au lieu de 80.
- **JSX rogne l'espace de tête de chaque ligne d'un texte multiligne.** Un
  espace collé à une balise a besoin de son `{" "}` **des deux côtés** dès que
  le paragraphe passe à la ligne — sinon « canang sarisur le tableau de bord ».
  Contrôle : `curl -s "$URL" | grep -oE "</(em|b|strong|i|code)>[A-Za-zÀ-ÿ]"`.
  ⚠️ **La classe de caractères doit contenir les majuscules.** Elle n'avait que
  les minuscules, et cinq mots collés ont vécu des mois derrière : « d'Agus.Les
  faits », « seule.Le Guide », « collecte.Le formulaire », « traité.Le
  courriel », « droits.Vous disposez » — tous suivis d'une capitale, donc tous
  invisibles au contrôle censé les trouver. Ils ont été révélés par une
  comparaison app/maquette, pas par le contrôle.
  ⚠️ **`display: block` ne sauve pas.** La barre du bas donnait « 0 envie
  **dans** votre voyage » sur deux lignes à l'écran et « 0 enviedans votre
  voyage » dans la couche texte — celle que lit un lecteur d'écran. La coupure
  était visuelle, pas textuelle.
  ⚠️ Les `</b>` suivis d'une minuscule sur `/agus` sont l'acronyme AGUS déplié
  (**A**gence **G**lobale **U**niverselle…) : le seul faux positif connu du
  contrôle. Ne pas le ranger avec eux sans regarder le contexte — c'est
  exactement l'erreur qui a laissé passer celui de la barre du bas.
- **Les métadonnées d'une page remplacent celles du gabarit**, elles ne s'y
  ajoutent pas. Une page qui déclarerait `robots: { index: true }` s'indexerait
  même en préproduction.
- **Un texte dans un conteneur `flex` se casse en deux lignes sans manquer de
  place.** `flex-shrink: 1` le rétrécit jusqu'à son mot le plus long — **six**
  défauts sont venus de là, tous présents jusqu'à 1920 px. D'où
  `whitespace-nowrap` sur les liens et les boutons de barre. **Ça ne se voit pas
  à la mesure** : `min-h-11` fige la hauteur. Compter les boîtes de ligne —
  `document.createRange()` sur le contenu puis `getClientRects().length`, en
  visant le **nœud texte** et non l'élément, sinon chaque enfant flex compte
  pour une ligne.
  ⚠️ **Corriger dans l'app ne corrige pas la maquette**, qui a ses propres
  sélecteurs. Les deux derniers cas dormaient dans `design/prototype.html`
  depuis que le nom du site avait grossi dans l'app seule.
- **Un fond qui oblige à repeindre ce qu'on pose dessus n'est pas le bon
  fond.** La barre en soleil plein a demandé deux jetons de couleur inventés
  pour l'occasion, un linteau relevé de 32 % à 70 %, puis **un disque blanc
  construit dans `public/logo.svg`** — et ce disque se voyait. Sur l'ivoire,
  rien de tout ça n'est nécessaire. Chaque correctif se défendait seul ; c'est
  leur **nombre** qui était le signal, et il a fallu trois itérations pour le
  lire. Ne pas remettre de fond au logo : ni plaque, ni disque, ni fond sombre
  (le bambou profond avale les terrasses).
- **Un descripteur `w` décrit le fichier, il ne recopie pas le voisin.** Les
  sources font 1447 à 1672 px ; deux crans annonçaient `1600w` pour 1447 px de
  détail réel — **plus lourds et moins nets** que leur propre source. Chaque
  cran s'arrête à la largeur native.
- **Le plafond de netteté est la source, jamais l'encodage.** Le cadre du
  diaporama fait 1084 px CSS, donc 2168 sur un écran DPR 2. Avant de toucher à
  la compression, mesurer ce que l'écran réclame. Et **ne pas ajouter de
  netteté artificielle** : un `unsharp` après réduction dégrade la fidélité sur
  trois photos sur quatre.
- **La maquette embarque ses images à la largeur exacte de son cadre**
  (1084 px). Elles ont fait 760 px pendant tout un temps : la maquette
  agrandissait de 43 % et donnait donc, du site, un avis photographique plus
  sévère que l'app — alors que c'est elle qu'on ouvre pour valider le design.
- **`letter-spacing` s'applique aussi après la dernière lettre.** Un `.label`
  en `truncate` affichait une ellipsis pour 2 px fantômes, à toutes les
  largeurs. Ne pas compenser par une marge négative : elle rétrécit aussi le
  conteneur et le déficit ne fait que se diviser par deux. Retirer `truncate`.
- **Un `<clipPath id>` est global au document.** Deux instances d'un même
  composant SVG avec le même `id` et la première définition s'applique aux
  deux — voir la convention `uid` de `Scene` et `Photo`.
- **`overflow: hidden` ne rogne un descendant absolu que s'il est aussi son
  bloc conteneur.** Sans `position`, l'élément est transparent au découpage :
  le filigrane du panneau des valeurs se référait à l'enveloppe de la broche,
  deux crans plus haut, et traversait le panneau sans le voir. Toute fiche qui
  porte un filigrane en débord veut donc `relative` **et** `overflow-hidden`,
  les deux ensemble — l'app les avait, la maquette avait perdu les deux.
  ⚠️ **Un débord identique à deux largeurs d'écran désigne un absolu de taille
  fixe.** 28 px à 390 comme à 320 : un élément fluide donnerait deux chiffres
  différents. C'est ce qu'il fallait lire, et trois relevés d'éléments l'ont
  manqué en cherchant qui dépassait — la bonne question était **qui aurait dû
  rogner**. Méthode qui a fini par trouver : cacher chaque enfant à tour de
  rôle et regarder si `scrollWidth` tombe, en descendant l'arbre.
- **Un défilement automatique impose deux choses.** WCAG 2.2.2 (niveau A) : un
  moyen de l'arrêter au-delà de cinq secondes. Et `prefers-reduced-motion` doit
  **l'empêcher de démarrer**, pas le ralentir.
- **Dans un diaporama, toutes les images sont en `loading="eager"`.** Avec
  `lazy`, celle qui apparaît n'est pas chargée au moment du fondu et on voit à
  travers celle du dessous — le DOM est juste, le rendu est faux.
- **Après toute génération d'images, en faire une planche et la regarder.** Deux
  fichiers ont été produits inversés d'après leur date de téléversement ; aucune
  assertion sur le DOM ne l'attrape, seul l'œil le voit.
- **Un motif réemployé se pose en masque, jamais en image.** La frise du
  linteau avait sa couleur cuite dans le SVG ; le jour où la couture a voulu
  la même frise en bougainvillier, il aurait fallu une deuxième copie du
  tracé — et deux copies d'un tracé divergent, comme les entrées de
  navigation avant elles. En `mask-image`, la forme vient du SVG et la
  couleur de `currentColor` : un tracé, autant de teintes qu'on veut. Le SVG
  du masque n'a plus de couleur propre, seule son opacité compte.
- **Le rouge des titres est `--bougain-ink` (#ad3550), jamais `--bougain`.**
  Le bougainvillier courant mesure **3,90 sur le sable** : au-dessus du seuil
  des grands titres, en dessous de celui du texte courant — un titre au bord
  ne laisse aucune marge le jour où le fond change. L'encré donne 5,12 sur le
  sable et 5,77 sur l'ivoire. Il ne se pose **jamais sur le vert profond**
  (on tombe sous 2), et il reste **rare, par fonction** : le rouge va aux
  titres qui *invitent* — la fourche, le livre d'or, l'ouverture des deux
  pages où mène la fourche —, l'encre à ceux qui *outillent* : formulaire,
  tarifs, pages légales. Teindre tous les titres ne rend pas la page plus
  gaie, ça la rend rouge.
- **Un dessin discret ne s'obtient pas en agrandissant un dessin fin.** Les
  cartes de la fourche ont porté un penjor et un tedung de 170 px rognés par
  l'angle : sur une carte de 294 px en mobile, le motif en occupait plus de la
  moitié sans qu'aucune de ses lignes ne se referme. **Un trait de 0,6 px ne
  s'allège pas en grandissant, il s'allonge.** Un ornement qui tient tout
  entier dans le coin se lit comme un ornement ; un grand dessin coupé se lit
  comme un accident. Corollaire : un décalage **positif**, sinon on remet
  soi-même le rognage qu'on venait d'enlever.
- **Un ornement n'est pas un symbole, et `Patra.jsx` n'est pas de la famille
  de `Symboles.jsx`.** Chaque symbole désigne une chose nommée dans le texte
  au même endroit — c'est la règle du fichier, et le penjor de la fourche la
  violait déjà : rien, là, ne parle de bambou de Galungan. Le patra punggel,
  la volute de fougère sculptée sur les portes de l'île, ne prétend désigner
  rien ; il a seulement à être de l'endroit. **Un ornement se justifie par sa
  provenance, un symbole par le texte qu'il accompagne.**
- **Une police « traditionnelle Bali » n'existe pas en alphabet latin.** Celles
  vendues sous ce nom imitent l'aksara et donnent du bar à cocktails. Prendre
  une police dessinée **pour** une écriture brahmique — Kadwa porte le logotype,
  Eczar les titres — et comparer à la taille réelle sur le fond réel.
- **Le logo est `public/logo.svg`, servi en `<img>`.** C'est le vrai logo
  d'Agus, vectorisé depuis son fichier : ne pas le redessiner, ne pas l'inliner
  dans l'app (80 ko × 8 pages), ne pas lui faire hériter de `currentColor`. La
  maquette l'inline parce qu'elle est autonome. Il n'est **pas** membre de la
  famille de `Symboles.jsx`.
- **Le défilement vers une ancre passe par `lib/ancre.js`, jamais par le
  CSS.** `scroll-behavior: smooth` n'a aucune durée réglable et la sienne
  croît avec la distance : 683 ms pour les 2 723 px qui séparent le bouton du
  hero de la fourche. Le plafond est à 420 ms. `behavior: "instant"` sur
  chaque image est **obligatoire** — sans lui le CSS ré-anime chaque petit
  saut et les deux animations se combattent.
- **Annuler un lien d'ancre pour l'animer retire le focus** que le navigateur
  déplaçait tout seul. Le rendre à la main (`tabindex="-1"` posé à la volée,
  retiré au `blur`), sinon le lien devient inutile au clavier et au lecteur
  d'écran.
- **L'écouteur d'ancres est délégué, dans `<Ancres />`.** Le hero est un
  composant serveur : son bouton est un `<a>` nu. La délégation évite de
  passer tout le hero au client pour une ligne, et couvre les liens à venir.
  Elle se retire devant `defaultPrevented` — sinon deux animations partent
  ensemble sur les liens qui appellent déjà `versAncre`.
- **Playwright fait défiler jusqu'à l'élément avant de cliquer.** Une mesure
  de durée de défilement partie de là est fausse : le point de départ n'est
  pas celui qu'on croit. Placer le défilement à la main, puis mesurer — et
  comparer deux chemins **depuis le même point**. Une première mesure a
  annoncé 2,2 s pour 683 ms réelles, un facteur trois sur le chiffre censé
  justifier le correctif.
- `useSearchParams` exige une frontière `<Suspense>`, sinon le build de
  prérendu échoue.

## La maquette `design/prototype.html`

- **Six vues** (`home`, `circuit`, `envies`, `portrait`, `tarifs`, `livre`) via
  `<body data-view>`. Toute modification de l'app s'y porte, et réciproquement.
  ⚠️ **Ça dérive vite et en silence.** Un relevé a trouvé 42 phrases propres à
  l'app et 40 à la maquette : quatre passages à la troisième personne, un fait
  non sourcé, deux sections entières manquantes. Comparer les textes rendus des
  deux côtés, pas les fichiers. Écarts légitimes et à conserver : le pied qui se
  nomme (« Prototype » / « Maquette »), les « Retour à l'accueil » des vues (la
  maquette n'a pas d'historique de navigateur), et ce qui ne peut pas exister
  dans un fichier unique.
- **Retirer du balisage sans retirer son rendu tue tout ce qui suit.** Une
  fonction de rendu qui écrit dans un élément supprimé lève une exception, et
  **aucune des fonctions appelées après elle ne s'exécute** — des écrans vides,
  sans message. Après toute suppression : ouvrir la console **et** parcourir les
  six vues.
- **Ne jamais réindenter un bloc extrait contenant des gabarits.** Deux espaces
  ajoutés après chaque retour à la ligne ont transformé les lignes vides en
  lignes de deux espaces : `split("\n\n")` n'a plus rien trouvé et les sept
  témoignages se sont affichés d'un seul tenant, sans erreur visible.
- **Une couture créée par `innerHTML` reste vide.** Le remplissage des
  `.jepun-mark` tourne une fois au démarrage, avant `render()` ; ce qui naît
  ensuite passe par `couture()`, qui inline la fleur.
- **Dans la maquette, `data-goto` est obligatoire même sur une ancre.** « Us
  et coutumes » et « Livre d'or » ne l'avaient pas : depuis toute vue autre
  que `home`, elles pointaient vers un élément caché et **le clic ne faisait
  rien** — pas d'erreur, pas de mouvement, quatre clics sur six morts. Toute
  entrée visant une section de l'accueil doit d'abord y ramener ; `data-de`
  dit ensuite où atterrir. L'app n'a pas ce défaut, ses `href` étant
  préfixés par `/`.
- **Une classe utilitaire perd contre un sélecteur d'élément, et ça ne se
  voit pas.** `.sec-head p` pèse 0,1,1 et `.sec-eyebrow` 0,1,0 : le chapô
  gagnait, et **toutes les eyebrows de la maquette étaient gris-vert** là où
  l'app les a en bougainvillier. Le fond vert ne s'en tirait que par un
  `style=` en dur posé sur une seule section — un correctif local qui a
  masqué le défaut général pendant des mois. Il a survécu à plusieurs
  comparaisons app/maquette faites copie d'écran contre copie d'écran : une
  couleur d'eyebrow ne se regarde pas, on lit le titre. **Comparer les
  couleurs calculées, pas les impressions** — `getComputedStyle` sur tous
  les `.sec-eyebrow` des six vues tient en trois lignes.
- **`querySelector` est singulier.** La fleur des coutures était posée par un
  `querySelector` : avec quatre coutures, trois sont restées des `<span>` vides
  sans qu'aucune erreur ne soit levée. Vérifier le compte après coup.
- **La maquette n'a pas de bibliothèque d'icônes.** Elle inline les tracés
  lucide à la main, et une icône que l'app pose est donc une icône que la
  maquette ne pose pas tant qu'on ne l'a pas recopiée. Les deux cartes de la
  fourche ont vécu ainsi, sans leur icône de tête, du côté qu'on ouvre pour
  valider le design. **Copier le tracé depuis le rendu de l'app**
  (`curl … | grep lucide-<nom>`), jamais de mémoire : les tracés lucide
  changent d'une version à l'autre.
- Le fichier n'a **pas de `<head>`** et embarque ses polices en base64.

## L'audit

Boucle établie : `npm install --no-save playwright` → `npm run build` →
`setsid npx next start -p NNNN` **dans une commande séparée**
(`pkill -f "next start"` tue la chaîne du shell qui l'exécute) →
`node audit.mjs` sur les huit routes et les six vues, à 1280 / 390 / 320 →
`npm uninstall --no-save playwright` **avant** de committer.

- **`audit.mjs` est versionné, les scripts jetables ne le sont pas.** Il a
  vécu six mois en fichier temporaire supprimé après chaque passe, et il a
  fallu le réécrire de zéro le jour où il a servi deux fois — dont le
  contrôle des boîtes de ligne, qu'on n'écrit pas correctement du premier
  coup. Il n'ajoute aucune dépendance : `playwright` s'installe `--no-save`
  le temps de la passe.
- Chromium est à `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- **Compter les lignes d'un libellé ne suffit pas à trouver le défaut.** Un
  texte de 33 caractères sur 320 px se casse parce qu'il manque *vraiment* de
  place, et signaler ces cas-là noie le vrai défaut sous quatre faux — c'est
  ce qu'a fait la première version du contrôle, avec quatre alertes dont
  aucune n'était un bug. Ce qu'on cherche, c'est le texte qui se casse
  **alors qu'il tenait** : cloner l'élément en `white-space: nowrap`,
  mesurer, et ne retenir que ceux dont la largeur d'une ligne rentrait dans
  le parent. Le clone se pose **dans le parent** — ailleurs il n'hérite plus
  de la fonte et mesure autre chose.
- **Le décodage des couleurs passe par un canvas.** `color-mix()` se sérialise
  tantôt en `color(srgb …)`, tantôt en `oklab(…)` ; les parser à la main a
  produit **24 échecs fantômes** en une passe. Peindre la couleur sur un canvas
  1 × 1 et relire les octets, et **composer les couches translucides**.
- WCAG visées : 2.5.5 (44 × 44), 2.5.8 (24 × 24, avec l'exception « lien en
  pleine phrase »), 1.4.11 (3:1 pour les objets graphiques, **contour des champs
  de saisie compris**), 1.4.1 (jamais la couleur seule).
