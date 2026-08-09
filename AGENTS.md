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
- Agus écrit **« une union de guides de Bali »**, jamais « syndicat ».
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
  Contrôle : `curl -s "$URL" | grep -oE "</(em|b|strong|i|code)>[a-zàâçéèêëîïôûùüÿñæœ]"`.
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
- **Un défilement automatique impose deux choses.** WCAG 2.2.2 (niveau A) : un
  moyen de l'arrêter au-delà de cinq secondes. Et `prefers-reduced-motion` doit
  **l'empêcher de démarrer**, pas le ralentir.
- **Dans un diaporama, toutes les images sont en `loading="eager"`.** Avec
  `lazy`, celle qui apparaît n'est pas chargée au moment du fondu et on voit à
  travers celle du dessous — le DOM est juste, le rendu est faux.
- **Après toute génération d'images, en faire une planche et la regarder.** Deux
  fichiers ont été produits inversés d'après leur date de téléversement ; aucune
  assertion sur le DOM ne l'attrape, seul l'œil le voit.
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
- **Retirer du balisage sans retirer son rendu tue tout ce qui suit.** Une
  fonction de rendu qui écrit dans un élément supprimé lève une exception, et
  **aucune des fonctions appelées après elle ne s'exécute** — des écrans vides,
  sans message. Après toute suppression : ouvrir la console **et** parcourir les
  six vues.
- **Ne jamais réindenter un bloc extrait contenant des gabarits.** Deux espaces
  ajoutés après chaque retour à la ligne ont transformé les lignes vides en
  lignes de deux espaces : `split("\n\n")` n'a plus rien trouvé et les sept
  témoignages se sont affichés d'un seul tenant, sans erreur visible.
- **`querySelector` est singulier.** La fleur des coutures était posée par un
  `querySelector` : avec quatre coutures, trois sont restées des `<span>` vides
  sans qu'aucune erreur ne soit levée. Vérifier le compte après coup.
- Le fichier n'a **pas de `<head>`** et embarque ses polices en base64.

## L'audit

Boucle établie : `npm run build` → `setsid npx next start -p NNNN` **dans une
commande séparée** (`pkill -f "next start"` tue la chaîne du shell qui
l'exécute) → Playwright sur les huit routes et les six vues, à 1280 / 390 / 320
→ `npm uninstall --no-save playwright` **avant** de committer.

- Chromium est à `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- **Le décodage des couleurs passe par un canvas.** `color-mix()` se sérialise
  tantôt en `color(srgb …)`, tantôt en `oklab(…)` ; les parser à la main a
  produit **24 échecs fantômes** en une passe. Peindre la couleur sur un canvas
  1 × 1 et relire les octets, et **composer les couches translucides**.
- WCAG visées : 2.5.5 (44 × 44), 2.5.8 (24 × 24, avec l'exception « lien en
  pleine phrase »), 1.4.11 (3:1 pour les objets graphiques, **contour des champs
  de saisie compris**), 1.4.1 (jamais la couleur seule).
