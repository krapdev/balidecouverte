import Link from "next/link";
import { Users, HandCoins, Heart, AlertTriangle, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import RetourLien from "@/components/RetourLien";
import { Valeur } from "@/components/AComplete";
import LienPage from "@/components/LienPage";
import { Symbole } from "@/components/Symboles";
import { PortraitAgus, Jepun, Canang } from "@/components/Scene";
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

        <div className="ground-ivoire band pt-[clamp(1.5rem,4vw,2.5rem)]">
          <div className="shell">
            {/* ---------- L'en-tête ---------- */}
            <div className="grid items-start gap-[clamp(1.75rem,5vw,3rem)] md:grid-cols-[0.62fr_1.38fr]">
              <figure className="m-0 mx-auto w-full max-w-[280px] md:max-w-none">
                <div className="arch bg-immersive-deep shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
                  <Photo
                    fallback={<PortraitAgus className="h-full w-full" />}
                    uid="agus-portrait"
                    ratio="aspect-[46/50]"
                    priority
                    brief="Agus de face, en extérieur, lumière douce — la même que sur l'accueil, en plus grand"
                    alt="Agus Yudiarta, guide francophone à Bali"
                    className="w-full"
                  />
                </div>
                <figcaption className="mt-3.5 border-t border-rule pt-3">
                  <span className="label block text-faint">
                    Denpasar · 08°39&apos;S 115°13&apos;E
                  </span>
                  {/* Venu de l'accueil, où il tenait trois lignes
                      d'atmosphère au milieu du chemin de quelqu'un qui
                      n'a encore rien décidé. Ici, on est venu pour ça. */}
                  <span className="mt-2.5 flex items-start gap-3 text-sm leading-relaxed text-soft">
                    <Jepun size={22} tone="var(--eyebrow)" className="mt-1 shrink-0" />
                    <span>
                      La fleur derrière mon oreille est un <em>jepun</em>, le
                      frangipanier : on la porte au temple, on la dépose sur les
                      offrandes.
                    </span>
                  </span>
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
                **La partie la plus distinctive de la page, et le site
                n'en disait rien.** Un guide francophone à Bali, il y en
                a ; un guide qui a appris le français trois ans à
                l'Alliance Française, qui a vécu en Belgique et qui
                connaît l'histoire de l'Europe assez pour s'en servir
                comme miroir, c'est autre chose — et c'est exactement ce
                qui fait qu'on ne se lasse pas de parler avec lui.

                Le symbole est le `candi bentar`, la porte fendue des
                temples : un passage entre deux mondes. C'est ce que fait
                quelqu'un qui explique Bali en s'appuyant sur ce que son
                interlocuteur connaît déjà. */}
            <Partie n={2} symbole="candi" titre="Le français, et l'Histoire">
              <p className="text-[1.0625rem] text-ink">
                J&apos;ai appris le français pendant trois ans à
                l&apos;Alliance Française, puis j&apos;ai continué seul, et
                je suis allé le pratiquer là où il se parle — plusieurs
                séjours en Europe, en Belgique surtout, avec des vacances en
                France.
              </p>
              <p>
                Je suis passionné d&apos;Histoire, et pas seulement de la
                mienne : celle de l&apos;Europe m&apos;intéresse depuis
                longtemps, la Belgique et la France en particulier. Ça
                n&apos;est pas de la curiosité de collectionneur. Quand je
                vous explique pourquoi un temple est orienté vers le Gunung
                Agung, ou ce qu&apos;un village décide vraiment quand il se
                partage l&apos;eau du subak, j&apos;ai besoin de m&apos;appuyer
                sur quelque chose que vous connaissez déjà — sinon je vous
                donne des noms, pas une compréhension.
              </p>
              <p>
                C&apos;est aussi pour ça que je préfère guider en français
                plutôt qu&apos;en anglais quand j&apos;ai le choix. Une
                langue qu&apos;on parle bien laisse la place aux nuances,
                aux plaisanteries, aux questions qu&apos;on n&apos;ose pas
                poser dans une langue approximative. Quinze jours en voiture,
                ça fait beaucoup d&apos;heures de conversation.
              </p>
            </Partie>

            {/* ---------- 3. La famille ---------- */}
            <Partie n={3} symbole="rangs" titre="Ma famille">
              <p className="text-[1.0625rem] text-ink">{AGUS.famille}.</p>
              {/* La version longue du point « Ma famille d'abord » du
                  panneau des valeurs — celle que l'accueil ne montre pas.
                  Elle était recopiée à la main ici, et les deux textes ont
                  divergé au premier remaniement : c'est `texte` qui est lu
                  maintenant, comme pour les points 2 et 3 plus bas.
                  Sa première ligne ne redit pas « Marié, trois enfants » :
                  `AGUS.famille`, juste au-dessus, le dit en plus précis. */}
              <p>{VALEURS.points[0].texte}</p>
              {/* L'aparté : même filet à gauche que la citation d'ouverture,
                  parce que c'est le même geste — une voix qui sort un
                  instant de l'argument. C'était une boîte, et une boîte de
                  plus sur une page qui en avait cinq. */}
              <div className="flex items-start gap-4 border-l-3 border-accent pl-5">
                <Canang size={50} className="mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">
                  Chaque matin, avant de prendre la route, je dépose un{" "}
                  {/* ⚠️ `{" "}` obligatoire APRÈS la balise, pas seulement
                      avant : JSX rogne l'espace de tête de chaque ligne
                      d'un texte multiligne, et le rendu donnait
                      « canang sarisur le tableau de bord ». */}
                  <em>canang sari</em>{" "}
                  sur le tableau de bord : quelques fleurs
                  dans un panier de feuille de palme tressée. C&apos;est trois
                  minutes, et c&apos;est le vrai début de la journée.
                </p>
              </div>
              {rangs && (
                <p>
                  <b className="font-semibold text-ink">{rangs.titre}.</b>{" "}
                  {rangs.texte} Mes enfants portent les leurs, comme tout le
                  monde ici.
                </p>
              )}

            </Partie>

            {/* ---------- 4. Le pays ---------- */}
            <Partie n={4} symbole="padma" titre="Mon pays, et ce que j'en montre">
              <p>{VALEURS.chapo}</p>
              <p>{VALEURS.chute}</p>
              <p>
                Ce que je montre n&apos;est pas ce qu&apos;un autocar peut
                atteindre. Une saline où personne ne s&apos;arrête, un ficus
                qui enjambe une route au fond de Munduk, un village qui reçoit
                chez lui parce qu&apos;on s&apos;y connaît : ces endroits
                existent parce que quelqu&apos;un du pays y a ses entrées, et
                ils cessent d&apos;exister le jour où on en publie l&apos;adresse.
              </p>
              {/* Son objectif, dans ses mots — la seule phrase de la page
                  qui énumère ce qu'il montre plutôt que ce qu'il évite.
                  « Dans la joie et la bonne humeur » est de lui aussi, et
                  ce n'est pas une formule creuse : le professionnel qui le
                  recommande écrit « toujours de bonne humeur » en premier,
                  avant même de parler de ses compétences. */}
              <p>
                Ce que je veux vous faire découvrir, c&apos;est ces îles hors
                des sentiers battus : leurs traditions, la nature, les plats
                locaux, leurs habitants avec leur façon de vivre, leur
                religion. Le tout selon vos souhaits — et dans la joie et la
                bonne humeur.
              </p>
            </Partie>

            {/* ---------- 5. L'union de guides ---------- */}
            <Partie n={5} symbole="gong" titre="Les guides de Bali, et mon union">
              {/* `AGUS.union` est un libellé de fiche (« Membre d'une
                  union… ») ; ici c'est une phrase qu'il dit. Ce qu'il
                  faut préserver mot pour mot, c'est « une union de
                  guides de Bali » — pas « syndicat ». */}
              <p className="text-[1.0625rem] text-ink">
                Je fais partie d&apos;une union de guides de Bali.
              </p>
              <p>{VALEURS.points[1].texte}</p>
              <p>
                Un guide balinais qui travaille en direct fixe son prix, choisit
                ses journées et répond de son travail devant les voyageurs
                eux-mêmes. C&apos;est un métier, pas une prestation revendue :
                il tient debout tant que des guides se tiennent ensemble — pour
                se passer le relais, se former, et ne pas se laisser mettre en
                concurrence les uns contre les autres.
              </p>

              {/* Le bloc où presque tout manque. Il était encadré, avec
                  ses quatre champs alignés par paires — c'était la chose
                  la plus proche d'un formulaire de toute la page, et
                  l'argument qui le justifiait ne tient plus : « ce qui
                  manque doit se voir d'un seul regard ». C'est vrai, et
                  ce n'est pas le cadre qui le fait — c'est `<Valeur>`,
                  qui écrit « à compléter » en rouge. Le bandeau du haut
                  de page le dit déjà une fois de plus.
                  Même motif que la fiche du métier, donc : la page n'a
                  plus qu'une seule façon de présenter des faits. */}
              <ListeFaits
                items={[
                  ["Son nom", <Valeur key="n" v={UNION.nom} quoi="le nom exact, et sa traduction" />],
                  ["Membre depuis", <Valeur key="d" v={UNION.depuis} quoi="l'année" />],
                  ["Son rôle", <Valeur key="r" v={UNION.role} quoi="membre, ou une responsabilité" />],
                  ["Combien de guides", <Valeur key="e" v={UNION.effectif} quoi="l'effectif, et les langues" />],
                  ["Ce qu'elle fait", <Valeur key="a" v={UNION.actions} quoi="trois actions concrètes valent mieux qu'une définition" />],
                ]}
              />
            </Partie>

            {/* ---------- 6. Ce que ça change ---------- */}
            <Partie n={6} symbole="canang" titre="Ce que ça change pour vous">
              {/* Même rythme vertical que les listes de faits — filet et
                  `py-3.5` —, mais l'icône reste : ici il n'y a pas
                  d'intitulé qu'elle redirait, et les trois pictogrammes
                  distinguent trois natures de promesse (l'argent, le
                  relais, la personne). Une icône se garde quand elle
                  ajoute, se retire quand elle répète. */}
              <ul className="m-0 flex list-none flex-col p-0">
                {[
                  [HandCoins, "Vous payez le travail, pas la chaîne. Ce que vous versez va au guide, au chauffeur et aux familles qui vous reçoivent."],
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

              {/* Sa propre plaisanterie, en post-scriptum de sa
                  présentation. Elle ferme la page sur un sourire plutôt
                  que sur un bouton, et elle en dit plus long sur l'homme
                  que trois lignes de qualités.
                  Registre de l'aparté — filet à gauche, comme la citation
                  d'ouverture et le canang. Ne pas l'encadrer. */}
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

            {/* ---------- Les questions ---------- */}
            <section className="mt-[clamp(3rem,8vw,4.5rem)] rounded-[16px] border border-eyebrow bg-[color-mix(in_srgb,var(--bougain)_8%,transparent)] p-[clamp(1.25rem,4vw,2rem)]">
              <h2 className="text-[1.25rem] leading-snug">
                Les six questions à poser à Agus
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
