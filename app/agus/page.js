import Link from "next/link";
import { Users, Heart, AlertTriangle, Mail, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import RetourLien from "@/components/RetourLien";
import { Valeur } from "@/components/AComplete";
import LienPage from "@/components/LienPage";
import { Symbole } from "@/components/Symboles";
import { Jepun, Canang } from "@/components/Scene";
import Separateur from "@/components/Separateur";
import { AGUS, VALEURS, USAGES } from "@/lib/data";
import { UNION, QUESTIONS } from "@/lib/portrait";

/**
 * Le portrait — la page qu'on atteint en cliquant sur sa photo.
 *
 * ⚠️ **Cette page porte désormais TOUTE la preuve du site.** L'accueil
 * a perdu ses trois blocs de certification l'un après l'autre ; le
 * diplôme, l'année, les langues et la licence ne se disent plus que
 * ici et dans le pied de page. Les liens vers le portrait sont donc le
 * seul chemin vers cette preuve — les affaiblir couperait la
 * réassurance du site.
 *
 * Personne ne lit une biographie avant d'avoir décidé de faire
 * confiance ; tout le monde la lit après, et c'est ce moment-là qui
 * décide d'écrire ou de refermer.
 *
 * Toute la page est à la première personne. C'est la règle du site —
 * Agus parle, on ne parle pas de lui — et c'est ici qu'elle compte le
 * plus : une page de présentation écrite à la troisième personne est le
 * signe qu'un tiers l'a rédigée, ce qui est exactement l'inverse de ce
 * que cette page essaie de prouver.
 *
 * Deux règles tenues à la lettre :
 *
 *  1. **Rien d'inventé sur un homme réel.** Ce qui est su vient de
 *     `AGUS` et de `VALEURS`. Ce qui ne l'est pas porte un marqueur
 *     rouge, et la liste des questions à lui poser est au bas de la
 *     page — c'est plus utile qu'un fichier de notes que personne ne
 *     rouvre.
 *  2. **Toujours par le positif.** L'union de guides se raconte par ce
 *     qu'elle permet, jamais comme une charge contre des agences qu'on
 *     ne peut pas documenter.
 *
 * ---
 *
 * ## Les quatre registres de la page, et la règle qui les tient
 *
 * La page portait **cinq blocs encadrés** — quatre cartes de faits, un
 * aparté illustré, une fiche d'union, un bandeau d'avertissement, un
 * bloc de questions. Deux d'entre eux voulaient dire quelque chose, les
 * trois autres étaient des boîtes pour faire des boîtes, et l'effet
 * cumulé était celui d'un **formulaire** : des champs bordés, alignés
 * par paires, avec un intitulé au-dessus de chaque valeur. Sur une page
 * qui ne demande rien et ne fait que répondre.
 *
 * Il n'en reste que quatre registres, et **chacun se distingue par ce
 * qu'il veut dire, jamais par le seul plaisir de border** :
 *
 *  1. **Le texte courant** — aucun ornement.
 *  2. **Les faits** — `<ListeFaits>` : un filet horizontal, l'intitulé à
 *     gauche, la valeur à droite. Ni fond, ni bordure, ni coin arrondi.
 *     C'est le même trait que sous les titres de partie et sous la
 *     légende du portrait : la page n'a plus qu'une seule façon de
 *     séparer deux choses.
 *  3. **L'aparté** — filet vertical à gauche. La citation d'ouverture et
 *     le canang du tableau de bord le partagent, parce que c'est le même
 *     geste : une voix qui sort un instant de l'argument.
 *  4. **Le travail en cours** — bordure bougainvillier et fond teinté.
 *     Le bandeau du haut et les six questions du bas, et eux seuls.
 *     **C'est le seul registre qui a le droit d'encadrer**, justement
 *     parce qu'il signale ce qui n'est pas fini — et les deux blocs
 *     partiront ensemble le jour où Agus aura répondu.
 *
 * > ⚠️ **Ne pas rajouter de bloc `border-rule bg-surface` ici.** C'est
 * > exactement ce qui a été retiré, et c'est le réflexe qui revient dès
 * > qu'un contenu semble « mériter d'être mis en avant ». Un fait mis en
 * > avant par un cadre ressemble à un champ à remplir ; ce qui met un
 * > fait en avant sur cette page, c'est sa place dans la liste.
 */

export const metadata = {
  title: "Agus Yudiarta, guide francophone à Bali",
  description:
    "Guide balinais licencié, francophone depuis l'Alliance Française, je travaille en direct depuis 2005. Mon métier, ma famille, et l'union de guides dont je fais partie.",
  alternates: { canonical: "/agus" },
  /* `noindex` tant que la page porte des marqueurs « à compléter ».
     Trois choses vont ensemble le jour où Agus a répondu : ce bloc, le
     bandeau d'avertissement ci-dessous, et l'entrée dans le sitemap. */
  robots: { index: false, follow: true },
  /* ⚠️ Déclarer `openGraph` dans une page **remplace** celui du layout,
     il ne le complète pas. D'où la reprise du type et de la locale :
     /tarifs avait silencieusement perdu son `og:type` et son image. */
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: "/agus",
    siteName: "Bali Découverte",
    title: "Agus Yudiarta, guide francophone à Bali",
    description:
      "Guide balinais diplômé, francophone, professionnel depuis 2005.",
  },
};

/**
 * Quatre lignes, et pas six.
 *
 * « Union » et « Famille » y figuraient aussi — et chacune est le titre
 * d'une partie de cette page, trente centimètres plus bas. Une fiche qui
 * annonce en trois mots ce qu'un paragraphe va dire ne résume pas : elle
 * dit deux fois. Ne restent que les faits qui **n'ont pas** leur
 * développement ailleurs.
 *
 * Tout est à la première personne, comme le reste du site : ces lignes
 * sont dites par Agus, pas par un annuaire qui parlerait de lui.
 *
 * ⚠️ **Plus d'icône par ligne.** Chacune redisait son propre intitulé —
 * un écusson devant « Ma certification », une voiture devant « Mes
 * véhicules ». Une icône qui répète le mot d'à côté n'aide personne à
 * lire ; elle prend la place où la valeur pourrait tenir sur une ligne
 * de moins. Le symbole du titre de partie suffit à situer le passage.
 */
const FICHE = [
  ["Ma certification", `Je suis ${AGUS.diplome.toLowerCase()}`],
  /* ⚠️ **La ligne la plus utile de la page.** « Diplômé en 2005 » se dit
     d'un homme qui n'a rien fait depuis vingt ans ; « revalidée tous les
     trois ans » décrit quelqu'un que l'État recontrôle. C'est exactement
     la question du voyageur qui confie quinze jours à un inconnu à
     12 000 km — et c'est le seul fait du site qui ne se périme pas.
     Ne pas la raccourcir en « licence officielle » : ce qui rassure
     n'est pas le mot licence, c'est le renouvellement. */
  ["Ma licence", "Délivrée par le gouvernement régional balinais, je la renouvelle tous les trois ans après une formation auprès du ministère du tourisme"],
  ["Mon métier", `Je l'exerce depuis ${AGUS.depuis}`],
  ["Mes langues", `Je guide en ${AGUS.langues}`],
  ["Mes véhicules", `${AGUS.vehicules.map((v) => v.split(" — ")[0]).join(" · ")} — je conduis moi-même`],
];

/**
 * **Le seul motif de liste de faits de la page.**
 *
 * Il remplace deux présentations différentes qui disaient la même chose
 * en se contredisant visuellement : quatre cartes bordées en grille de
 * deux pour le métier, et un `<dl>` encadré en grille de deux pour
 * l'union. Bordure, fond, coins arrondis, champs alignés par paires —
 * l'œil y lisait **un formulaire**, sur une page qui ne demande rien et
 * ne fait que répondre.
 *
 * Ce qui reste : un filet horizontal entre deux faits. C'est le même
 * geste que le `figcaption` du portrait et que le trait sous les titres
 * de partie, donc la page n'a plus qu'une seule façon de séparer deux
 * choses. Et c'est **plus court** — les cartes coûtaient leur padding et
 * leur bordure sur chaque ligne.
 *
 * L'intitulé passe à gauche à partir de `sm` et au-dessus en deçà :
 * « Ma certification » et sa valeur ne tiennent pas côte à côte dans
 * 288 px utiles.
 */
function ListeFaits({ items }) {
  return (
    <dl className="m-0 p-0">
      {items.map(([label, valeur]) => (
        <div
          key={label}
          className="flex flex-col gap-1 border-b border-rule py-3.5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
        >
          <dt className="label shrink-0 text-faint sm:w-[11rem]">{label}</dt>
          <dd className="m-0 text-ink">{valeur}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Un titre de partie, avec son symbole. Pas de `Reveal` : on ne fait
    pas apparaître en fondu un texte qu'on lit pour se décider. */
function Partie({ n, symbole, titre, children }) {
  return (
    <section className="mt-[clamp(3rem,8vw,4.5rem)]" id={`part-${n}`}>
      <div className="flex items-center gap-3.5 border-b border-rule pb-4">
        <Symbole nom={symbole} size={30} className="shrink-0 text-accent" />
        <h2 className="text-[clamp(1.375rem,4vw,1.75rem)] leading-tight">
          {titre}
        </h2>
      </div>
      <div className="mt-5 flex max-w-[64ch] flex-col gap-4 leading-relaxed text-soft">
        {children}
      </div>
    </section>
  );
}

export default function PagePortrait() {
  const rangs = USAGES.liste.find((u) => u.symbole === "rangs");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="shell pt-[clamp(5.5rem,12vw,7rem)]">
          <RetourLien />
        </div>

        {/* ⚠️ **La décoration est en filigrane, jamais en icône.** Un
            symbole affiché en clair demande à être expliqué — c'est
            exactement les trois lignes de glose du jepun qu'on vient de
            retirer. En texture, il ne demande rien : il colore la page en
            balinais sans rien réclamer au lecteur.
            Le padma, lotus à huit pétales, est l'assise du dieu suprême et
            l'orientation de tout temple. Il est posé là où aucun texte ne
            passe, et `overflow-hidden` l'empêche d'élargir la page — sans
            quoi il crée un débordement horizontal que l'audit signale mais
            que l'œil ne trouve pas. */}
        <div className="ground-ivoire band relative overflow-hidden pt-[clamp(1.5rem,4vw,2.5rem)]">
          <Symbole
            nom="padma"
            size={300}
            strokeWidth={0.5}
            className="pointer-events-none absolute -right-24 -top-16 hidden text-accent opacity-[0.07] lg:block"
            aria-hidden="true"
          />
          <div className="shell relative">
            {/* ---------- L'en-tête ---------- */}
            <div className="grid items-start gap-[clamp(1.75rem,5vw,3rem)] md:grid-cols-[0.62fr_1.38fr]">
              <figure className="m-0 mx-auto w-full max-w-[280px] md:max-w-none">
                <div className="arch bg-immersive-deep shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
                  {/* La même photo que l'accueil, dans un cadre un peu plus
                      petit — c'est voulu : reconnaître le visage qu'on
                      vient de quitter fait partie de l'arrivée. */}
                  <Photo
                    src="/agus-portrait.jpg"
                    sources={[
                      {
                        type: "image/webp",
                        srcSet:
                          "/agus-portrait-600.webp 600w, /agus-portrait.webp 840w",
                      },
                    ]}
                    sizes="(min-width: 768px) 360px, 280px"
                    uid="agus-portrait"
                    ratio="aspect-[46/50]"
                    priority
                    alt="Agus Yudiarta sur une plage de galets de l'est de Bali, au soleil couchant"
                    className="w-full"
                  />
                </div>
                <figcaption className="mt-3.5 border-t border-rule pt-3">
                  <span className="label block text-faint">
                    Denpasar · 08°39&apos;S 115°13&apos;E
                  </span>
                  {/* ⚠️ **La glose du jepun a été retirée** — trois lignes
                      qui expliquaient la fleur derrière son oreille. Elle
                      avait déjà quitté l'accueil pour venir ici ; elle
                      quitte maintenant la page pour de bon, et ce n'est pas
                      une perte : l'usage « les offrandes au sol » de la
                      section Us et coutumes raconte la même chose en mieux,
                      avec cinq autres à côté.
                      La fleur reste, elle ; c'est le lien qui a changé de
                      destination. Expliquer un symbole coûtait trois
                      lignes ; **ouvrir la porte de tous les autres** coûte
                      la même place et mène quelque part. */}
                  <Link
                    href="/#usages"
                    className="group mt-2.5 flex min-h-11 items-center gap-3 text-sm text-accent no-underline"
                  >
                    <Jepun size={22} tone="currentColor" className="shrink-0" />
                    <span className="underline decoration-accent underline-offset-4">
                      Les traditions que vous croiserez
                    </span>
                    <ArrowRight
                      size={17}
                      strokeWidth={2.2}
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </figcaption>
              </figure>

              <div>
                <p className="label text-eyebrow">Le portrait</p>
                <h1 className="mt-2 text-[clamp(2rem,6vw,3rem)] leading-[1.05]">
                  {AGUS.nom}
                </h1>
                {/* Le diplôme et l'année sont dans la fiche, quatre
                    centimètres plus bas, et sur le bandeau du hero de
                    l'accueil. Trois fois la même phrase sur le même
                    parcours de lecture : elle ne rassure pas trois fois
                    plus, elle finit par sonner comme un argument. */}
                {/* Reprise de l'ouverture de son propre texte — « Je suis
                    Agus Yudiarta, guide francophone à Bali. Balinais… » —
                    à quoi s'ajoute ce que le site doit dire et que sa
                    présentation ne dit pas : qu'il n'y a personne entre
                    lui et le voyageur. */}
                <p className="mt-4 text-lg leading-relaxed text-soft">
                  Je suis balinais, né sur cette île et j&apos;y vis toujours.
                  Je conduis moi-même, je traduis moi-même, et je travaille en
                  direct — sans agence entre vous et moi.
                </p>

                <blockquote className="mt-6 border-l-3 border-accent pl-5 text-[clamp(1.15rem,3.4vw,1.45rem)] italic leading-snug text-pretty">
                  {VALEURS.points[2].texte}
                </blockquote>

                {/* Le bandeau de travail. Il disparaît quand les marqueurs
                    rouges de la page ont tous une valeur — voir
                    lib/portrait.js. */}
                <div className="mt-7 flex items-start gap-3.5 rounded-[14px] border border-eyebrow bg-[color-mix(in_srgb,var(--bougain)_10%,transparent)] p-5">
                  <AlertTriangle
                    size={19}
                    className="mt-0.5 shrink-0 text-eyebrow"
                    strokeWidth={1.8}
                  />
                  <p className="text-sm leading-relaxed">
                    <b>Cette page attend les mots d&apos;Agus.</b> Les faits
                    vérifiés y sont ; ce qui est signalé en rouge ne peut venir
                    que de lui, et n&apos;a surtout pas à être deviné. Les
                    questions sont listées en bas de page.
                  </p>
                </div>
              </div>
            </div>

            {/* ---------- 1. Le métier ---------- */}
            {/* Le titre disait « Le métier, en faits », et une phrase le
                précédait : « Avant de vous raconter quoi que ce soit,
                voici ce qui se vérifie. Le reste de cette page ne vaut
                que si ces quatre lignes-là tiennent. »
                Les deux ont sauté ensemble, et pour la même raison : ils
                **commentaient la page au lieu de la faire**. « En faits »
                annonce le registre d'une liste qui est déjà visiblement
                une liste ; la phrase expliquait pourquoi on allait lire
                quatre lignes qu'on aurait lues plus vite que son
                explication. Une page qui se présente elle-même retarde ce
                qu'elle a à dire. */}
            <Partie n={1} symbole="tedung" titre="Mon métier">
              <ListeFaits items={FICHE} />
              <p>
                Je guide à {AGUS.territoires.toLowerCase()}. Ce site est
                aujourd&apos;hui recentré sur Bali, et c&apos;est là que je
                passe l&apos;essentiel de mes jours.
              </p>
            </Partie>

            {/* ---------- 2. Le français, et l'Histoire ----------
                Trois paragraphes ramenés à deux : le troisième expliquait
                pourquoi il préfère guider en français, ce que le lecteur
                d'une page en français a déjà compris. */}
            <Partie n={2} symbole="candi" titre="Le français, et l'Histoire">
              <p className="text-[1.0625rem] text-ink">
                J&apos;ai appris le français pendant trois ans à
                l&apos;Alliance Française, puis j&apos;ai continué seul, et je
                suis allé le pratiquer là où il se parle — plusieurs séjours
                en Europe, en Belgique surtout.
              </p>
              <p>
                Je suis passionné d&apos;Histoire, et pas seulement de la
                mienne : celle de l&apos;Europe m&apos;intéresse depuis
                longtemps. Ça n&apos;est pas de la curiosité de
                collectionneur. Quand je vous explique pourquoi un temple est
                orienté vers le Gunung Agung, ou ce qu&apos;un village décide
                vraiment quand il se partage l&apos;eau du subak, j&apos;ai
                besoin de m&apos;appuyer sur quelque chose que vous
                connaissez déjà — sinon je vous donne des noms, pas une
                compréhension.
              </p>
            </Partie>

            {/* ---------- 3. La famille ---------- */}
            <Partie n={3} symbole="rangs" titre="Ma famille">
              <p className="text-[1.0625rem] text-ink">{AGUS.famille}.</p>
              {/* `court` et non `texte` : la version longue développait le
                  tri hita karana sur six lignes, sur une page qu'on
                  raccourcit. Le concept reste nommé dans la partie
                  suivante, où il porte l'argument au lieu de l'illustrer. */}
              <p>{VALEURS.points[0].court}</p>
              {/* L'aparté : filet à gauche, comme la citation d'ouverture.
                  C'est le même geste — une voix qui sort de l'argument. */}
              <div className="flex items-start gap-4 border-l-3 border-accent pl-5">
                <Canang size={44} className="mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">
                  Chaque matin, avant de prendre la route, je dépose un{" "}
                  <em>canang sari</em>{" "}
                  sur le tableau de bord : quelques fleurs dans un panier de
                  feuille de palme tressée. C&apos;est trois minutes, et
                  c&apos;est le vrai début de la journée.
                </p>
              </div>
            </Partie>

            {/* ---------- 4. Pourquoi je travaille en direct ----------
                ⚠️ **C'est le cœur de la page, et c'est nouveau.** Deux
                parties se sont fondues ici — « Mon pays, et ce que j'en
                montre » et « Les guides de Bali, et mon union » —, parce
                qu'elles plaidaient la même chose sans le dire : que
                travailler en direct fait vivre un métier. Séparées, elles
                se répétaient sur deux écrans ; ensemble, elles racontent
                enfin une histoire.

                Et cette histoire est la sienne. Le site argumentait
                jusqu'ici **par le positif** — « voyager en direct fait
                vivre les guides » — parce qu'aucune charge contre les
                agences n'était documentée. Elle l'est maintenant : il a
                commencé en agence, il y a vécu ce système, il en est
                sorti. Ce n'est plus une thèse, c'est un témoignage.

                ⚠️ **La règle « par le positif » ne disparaît pas, elle se
                précise** : jamais d'agence nommée, jamais de grief qu'on
                ne pourrait pas attribuer à quelqu'un. Son vécu lui
                appartient et il peut le dire ; ce qu'on ne peut pas faire,
                c'est le généraliser à sa place.

                ⚠️ « J'ai été le premier à en sortir » est **sa formule**,
                et c'est une revendication forte — premier de son groupe,
                de sa région, de l'île ? À lui préciser : la question est
                dans la liste du bas. Écrite telle quelle en attendant,
                parce que l'atténuer serait déjà l'interpréter. */}
            <Partie n={4} symbole="gong" titre="Pourquoi je travaille en direct">
              <p className="text-[1.0625rem] text-ink">
                J&apos;ai commencé comme guide d&apos;agence. Je sais donc de
                l&apos;intérieur ce que ce système fait à un guide : on lui
                dit où aller, combien de temps rester, dans quelle boutique
                s&apos;arrêter, sans considération et prendre en compte son
                expérience et on garde l&apos;essentiel de ce que le voyageur
                a payé. Je l&apos;ai vécu, et malheureusement je ne
                suis pas le seul.
              </p>
              <p>
                J&apos;en suis sorti — l&apos;un des premiers à le faire — et
                j&apos;ai ouvert le chemin pour d&apos;autres. C&apos;est ce
                que je défends depuis : un métier, et pas une prestation
                revendue. Un guide balinais qui travaille en direct
                répond de son travail devant les voyageurs eux-mêmes et leur
                profiter de son expérience. C&apos;est pour ça que je fais
                partie d&apos;une union de guides de Bali.
              </p>
              <p>
                Je ne fais pas ça pour moi seul. Chaque voyage organisé en
                direct, c&apos;est un guide de plus qui vit de son métier
                sans dépendre de personne, une famille de Sidemen, de Munduk
                ou de Tenganan qui reçoit chez elle, et un peu de mon pays
                qui reste à ceux qui y vivent.
              </p>
              <p>
                Ce que je montre n&apos;est pas ce qu&apos;un bus de
                touristes peut atteindre. Une saline où personne ne
                s&apos;arrête, un ficus qui enjambe une route au fond de
                Munduk, un village qui reçoit chez lui parce qu&apos;on
                s&apos;y connaît : ces endroits existent parce que
                quelqu&apos;un du pays y a ses entrées, et ils cessent
                d&apos;exister le jour où on en publie l&apos;adresse.
              </p>

              {/* Le seul bloc entièrement vide qui reste. Même motif que la
                  fiche du métier — ce qui manque se voit par le rouge de
                  `<Valeur>`, pas par un cadre. */}
              <ListeFaits
                items={[
                  ["Son nom", <Valeur key="n" v={UNION.nom} quoi="le nom exact, et sa traduction" />],
                  ["Membre depuis", <Valeur key="d" v={UNION.depuis} quoi="l'année" />],
                  ["Combien de guides", <Valeur key="e" v={UNION.effectif} quoi="l'effectif, et les langues" />],
                  ["Ce qu'elle fait", <Valeur key="a" v={UNION.actions} quoi="trois actions concrètes valent mieux qu'une définition" />],
                ]}
              />
            </Partie>

            {/* ---------- 5. Ce que ça change pour vous ---------- */}
            <Partie n={5} symbole="canang" titre="Ce que ça change pour vous">
              {/* Trois points ramenés à deux : le premier — « vous payez le
                  travail, pas la chaîne » — est devenu le sujet entier de
                  la partie précédente, il y était dit en trois paragraphes
                  au lieu d'une ligne. */}
              <ul className="m-0 flex list-none flex-col p-0">
                {[
                  [Users, "Si je ne suis pas libre à vos dates, je passe le relais à un guide que je connais — jamais à un inconnu envoyé par une centrale."],
                  [Heart, "Vous écrivez à quelqu'un, pas à un formulaire. C'est moi qui réponds, en français, sous 24 heures."],
                ].map(([Icon, texte]) => (
                  <li
                    key={texte}
                    className="flex items-start gap-3.5 border-b border-rule py-3.5 last:border-b-0"
                  >
                    <Icon size={18} className="mt-1 shrink-0 text-accent" strokeWidth={1.6} />
                    <span>{texte}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Link className="btn btn-accent" href="/#sur-mesure">
                  <Mail size={16} />
                  Lui écrire
                </Link>
                <LienPage href="/#valeurs" discret>
                  Revenir à mon engagement
                </LienPage>
              </div>

              {/* Sa propre plaisanterie, en post-scriptum. Elle ferme la
                  page sur un sourire plutôt que sur un bouton, et elle en
                  dit plus long sur l'homme que trois lignes de qualités. */}
              <p className="mt-8 border-l-3 border-accent pl-5 leading-relaxed">
                <span className="label block text-faint">
                  Un petit trait d&apos;humour
                </span>
                <span className="mt-1.5 block">
                  <b className="font-semibold text-ink">AGUS</b> pour{" "}
                  <b className="font-semibold text-ink">A</b>gence{" "}
                  <b className="font-semibold text-ink">G</b>lobale{" "}
                  <b className="font-semibold text-ink">U</b>niverselle{" "}
                  (de la) <b className="font-semibold text-ink">S</b>ympathie.
                </span>
              </p>
            </Partie>

            {/* La même couture que sur l'accueil : ce séparateur était
                écrit à la main ici, en gris, avant que le motif existe.
                Il ferme la lecture comme la fleur l'ouvre sous le
                portrait. */}
            <Separateur className="mt-[clamp(2.5rem,7vw,3.5rem)]" size={28} />

            {/* ---------- Les questions ---------- */}
            <section className="mt-[clamp(3rem,8vw,4.5rem)] rounded-[16px] border border-eyebrow bg-[color-mix(in_srgb,var(--bougain)_8%,transparent)] p-[clamp(1.25rem,4vw,2rem)]">
              <h2 className="text-[1.25rem] leading-snug">
                Les questions à poser à Agus
              </h2>
              <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-soft">
                Elles sont affichées ici, et non rangées dans un fichier de
                notes, parce qu&apos;un fichier de notes ne se rouvre pas. Ce
                bloc part avec le bandeau du haut, le jour où les réponses sont
                dans <code className="font-sans text-[0.9em]">lib/portrait.js</code>.
              </p>
              <ol className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
                {QUESTIONS.map((q, i) => (
                  <li key={q} className="flex gap-3 text-sm leading-relaxed">
                    <span className="font-sans text-xs tabular-nums text-eyebrow">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {q}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
