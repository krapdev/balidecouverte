import Link from "next/link";
import {
  BadgeCheck,
  CalendarClock,
  Languages,
  Users,
  Car,
  HandCoins,
  Heart,
  AlertTriangle,
  Mail,
} from "lucide-react";
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
 * Le README disait le contraire il y a peu : « pourquoi pas une page
 * /agus — ces faits sont exactement ce qui lève le doute, et les envoyer
 * sur une page à part, c'est les mettre là où personne ne va ». La
 * raison était bonne, et elle tient toujours pour **le fait qui lève le
 * doute** : la certification est restée sur l'accueil, en clair. Ce qui
 * part ici, c'est le développement — l'homme, sa famille, son pays, son
 * union de guides, et le détail de ses véhicules. Personne ne lit ça
 * avant d'avoir décidé de faire confiance ; tout le monde le lit après,
 * et c'est ce moment-là qui décide d'écrire ou de refermer.
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
 */

export const metadata = {
  title: "Agus Yudiarta, guide francophone à Bali",
  description:
    "Guide balinais diplômé, francophone, je travaille en direct depuis 2005. Ma famille, mon métier, et l'union de guides de Bali dont je fais partie.",
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
 */
const FICHE = [
  { icon: BadgeCheck, label: "Ma certification", valeur: `Je suis ${AGUS.diplome.toLowerCase()}` },
  { icon: CalendarClock, label: "Mon métier", valeur: `Je l'exerce depuis ${AGUS.depuis}` },
  { icon: Languages, label: "Mes langues", valeur: `Je guide en ${AGUS.langues}` },
  { icon: Car, label: "Mes véhicules", valeur: `${AGUS.vehicules.map((v) => v.split(" — ")[0]).join(" · ")} — je conduis moi-même` },
];

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
                <p className="mt-4 text-lg leading-relaxed text-soft">
                  Je suis balinais, je conduis moi-même, je traduis moi-même,
                  et je travaille en direct — sans agence entre vous et moi.
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
            <Partie n={1} symbole="tedung" titre="Le métier, en faits">
              <p>
                Avant de vous raconter quoi que ce soit, voici ce qui se
                vérifie. Le reste de cette page ne vaut que si ces quatre
                lignes-là tiennent.
              </p>
              <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
                {FICHE.map(({ icon: Icon, label, valeur }) => (
                  <li
                    key={label}
                    className="flex items-start gap-3 rounded-[12px] border border-rule bg-surface p-4"
                  >
                    <Icon size={17} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.7} />
                    <span>
                      <span className="label block text-faint">{label}</span>
                      <span className="text-sm leading-snug text-ink">{valeur}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p>
                Je guide à {AGUS.territoires.toLowerCase()}. Ce site est
                aujourd&apos;hui recentré sur Bali, et c&apos;est là que je
                passe l&apos;essentiel de mes jours.
              </p>
            </Partie>

            {/* ---------- 2. La famille ---------- */}
            <Partie n={2} symbole="rangs" titre="Ma famille">
              <p className="text-[1.0625rem] text-ink">{AGUS.famille}.</p>
              {/* Le point « Ma famille d'abord » du panneau des valeurs
                  s'ouvre sur « Marié, trois enfants » — la ligne
                  au-dessus le dit déjà, et en plus précis. On ne reprend
                  donc que sa seconde moitié, écrite ici en clair plutôt
                  que découpée à l'exécution : une découpe sur un point
                  se casse à la première virgule déplacée. */}
              <p>
                Ce que vous payez les fait vivre — comme il fait vivre le
                chauffeur et les familles qui vous accueillent chez elles, pas
                une commission d&apos;intermédiaire.
              </p>
              <div className="flex items-start gap-4 rounded-[14px] border border-rule bg-surface p-5">
                <Canang size={50} className="mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">
                  Chaque matin, avant de prendre la route, je dépose un{" "}
                  <em>canang sari</em> sur le tableau de bord : quelques fleurs
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

            {/* ---------- 3. Le pays ---------- */}
            <Partie n={3} symbole="padma" titre="Mon pays, et ce que j'en montre">
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
            </Partie>

            {/* ---------- 4. L'union de guides ---------- */}
            <Partie n={4} symbole="gong" titre="Les guides de Bali, et mon union">
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

              {/* Le bloc où presque tout manque. Il est présenté comme un
                  bloc et non fondu dans le texte : ce qui manque doit se
                  voir d'un seul regard, sinon on le lit sans le voir. */}
              <dl className="m-0 grid gap-4 rounded-[14px] border border-rule bg-surface p-5 sm:grid-cols-2">
                {[
                  ["Son nom", UNION.nom, "le nom exact, et sa traduction"],
                  ["Membre depuis", UNION.depuis, "l'année"],
                  ["Son rôle", UNION.role, "membre, ou une responsabilité"],
                  ["Combien de guides", UNION.effectif, "l'effectif, et les langues"],
                ].map(([label, v, quoi]) => (
                  <div key={label}>
                    <dt className="label text-faint">{label}</dt>
                    <dd className="m-0 mt-1 text-sm leading-snug">
                      <Valeur v={v} quoi={quoi} />
                    </dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <dt className="label text-faint">Ce qu&apos;elle fait</dt>
                  <dd className="m-0 mt-1 text-sm leading-relaxed">
                    <Valeur
                      v={UNION.actions}
                      quoi="trois actions concrètes valent mieux qu'une définition"
                    />
                  </dd>
                </div>
              </dl>
            </Partie>

            {/* ---------- 5. Ce que ça change ---------- */}
            <Partie n={5} symbole="canang" titre="Ce que ça change pour vous">
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {[
                  [HandCoins, "Vous payez le travail, pas la chaîne. Ce que vous versez va au guide, au chauffeur et aux familles qui vous reçoivent."],
                  [Users, "Si je ne suis pas libre à vos dates, je passe le relais à un guide que je connais — jamais à un inconnu envoyé par une centrale."],
                  [Heart, "Vous écrivez à quelqu'un, pas à un formulaire. C'est moi qui réponds, en français, sous 24 heures."],
                ].map(([Icon, texte]) => (
                  <li key={texte} className="flex items-start gap-3.5">
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
