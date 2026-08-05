import Link from "next/link";
import {
  BadgeCheck,
  CalendarClock,
  Languages,
  Users,
  MapPin,
  Car,
  ChevronDown,
  HandCoins,
  Heart,
  ArrowRight,
} from "lucide-react";
import { PortraitAgus } from "./Scene";
import { Symbole } from "./Symboles";
import Photo from "./Photo";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { AGUS, VALEURS } from "@/lib/data";

/**
 * La présentation : une promesse professionnelle, puis une fiche.
 *
 * L'argument n'est plus « voilà qui je suis » mais **« vous n'avez rien
 * à organiser »**. C'est ce qu'achète quelqu'un qui part à 12 000 km :
 * pas une biographie, la certitude que tout est pris en charge par un
 * professionnel diplômé.
 *
 * La famille a basculé dans la fiche. Elle rassure comme un fait dans
 * une ligne d'état civil ; en paragraphe, elle diluait la promesse.
 *
 * **La fiche est un dépliant, pas une modale ni une page.** Une modale
 * volerait le focus pour une liste qu'on veut survoler ; une page
 * éloignerait les faits de l'endroit où naît le doute. `<details>` coûte
 * un tap, se referme, et marche au clavier sans une ligne de JS.
 *
 * Condition tenue : **le résumé porte l'essentiel même fermé.** Sans ça,
 * on cacherait la crédibilité à qui ne clique pas — et sur mobile,
 * personne ne clique sur tout.
 *
 * **Deux registres, deux traitements.** Les valeurs sont visibles, sur
 * un panneau bambou : elles créent la préférence, elles doivent être lues.
 * Les faits sont repliés : ils lèvent le doute, on les consulte quand la
 * question se pose. Remplacer les uns par les autres perdrait la moitié
 * du travail — qui ne fait pas confiance ne sera pas ému par des
 * valeurs, qui fait confiance sans préférer ne réserve pas non plus.
 *
 * Pourquoi pas une page /agus : ces faits sont exactement ce qui lève le
 * doute, et les envoyer sur une page à part, c'est les mettre là où
 * personne ne va. Ils restent là où naît la question.
 */
/* Dans l'ordre des points de VALEURS : ce que l'argent fait vivre, le
   collectif de guides, la mission. */
const ICONES_VALEURS = [HandCoins, Users, Heart];

const FICHE = [
  { icon: BadgeCheck, label: "Certification", valeur: AGUS.diplome },
  { icon: CalendarClock, label: "Métier", valeur: `Professionnel depuis ${AGUS.depuis}` },
  { icon: Languages, label: "Langues", valeur: `Je guide en ${AGUS.langues}` },
  { icon: MapPin, label: "Union", valeur: AGUS.union },
  { icon: Users, label: "Famille", valeur: AGUS.famille },
];

export default function AboutAgus() {
  return (
    <section id="esprit" className="ground-ivoire band">
      <div className="shell">
        <SectionHead eyebrow="Votre guide" title="Laissez-vous guider.">
          Guide diplômé, professionnel depuis 2005, je conduis moi-même et je
          traduis moi-même. Vous n&apos;avez ni véhicule à louer, ni billets à
          prendre, ni horaires à caler : je m&apos;occupe de tout.
        </SectionHead>

        <div className="grid items-start gap-[clamp(2rem,6vw,3.5rem)] md:grid-cols-[0.72fr_1.28fr]">
          {/* Le portrait est cliquable, et **il le dit**. Une photo qui
              navigue sans le montrer est un piège : on l'apprend en
              cliquant par hasard, ou jamais. D'où la ligne d'appel sous
              la légende — c'est elle qui porte l'affordance, la photo ne
              fait que l'élargir à une cible confortable.

              `?de=esprit` : le retour depuis /agus ramènera ici, pas en
              haut de l'accueil (voir lib/retours.js). */}
          <Reveal
            as="figure"
            className="m-0 mx-auto w-full max-w-[300px] md:max-w-none"
          >
            <Link
              href="/agus?de=esprit"
              className="group block no-underline"
              aria-label="Le portrait d'Agus : sa famille, son pays, son union de guides"
            >
              <span className="arch block bg-immersive-deep shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
                <Photo
                  fallback={<PortraitAgus className="h-full w-full" />}
                  uid="agus"
                  ratio="aspect-[46/50]"
                  priority
                  brief="LA photo à faire en premier — Agus de face, en extérieur, lumière douce"
                  alt="Agus Yudiarta, guide francophone à Bali"
                  className="w-full"
                />
              </span>
              <span className="mt-3.5 flex min-h-11 items-center justify-between gap-3 border-t border-rule pt-3 text-sm text-accent">
                <span>Son portrait, sa famille, son union</span>
                <ArrowRight size={15} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            {/* L'explication du jepun est partie sur /agus. C'était trois
                lignes d'atmosphère sur une page qui doit encore
                présenter un circuit, des envies et un formulaire — et le
                lecteur qui veut savoir ce qu'est cette fleur est
                exactement celui qui clique sur le portrait. */}
            {/* Une seule ligne. Le nom et les coordonnées se partageaient
                la largeur en `justify-between` : à 390 px, « AGUS
                YUDIARTA » passait à la ligne dans sa moitié et la légende
                tenait sur deux étages juste sous le lien. Les coordonnées
                GPS — le « fait dur » qui tient la direction — sont sur
                /agus, où elles ont la place. */}
            <figcaption className="label text-faint">
              {AGUS.nom} · Denpasar, Bali
            </figcaption>
          </Reveal>

          <div className="flex flex-col gap-6 md:mt-16">
            {/* Trois blocs ont quitté cet endroit, et chacun pour une
                raison qui lui est propre — ce n'est pas un dégraissage
                à la louche :

                • **La citation de travail** disait « Libérez-vous de
                  l'organisation. Je m'occupe de tout » — mot pour mot ce
                  que le chapô de la section dit six centimètres plus
                  haut. C'était la même promesse deux fois, et c'était en
                  plus l'un des deux textes encore inventés de la page.
                  La supprimer enlève une redite **et** une chose à faire
                  relire.
                • **Le second paragraphe** (« vingt ans de métier, ça sert
                  surtout à ça ») a fusionné avec le premier : le premier
                  donne la liste concrète, le second la commentait.
                • **Le canang du tableau de bord** est désormais sur
                  /agus, et l'usage « les offrandes au sol » le raconte
                  déjà dans la section Us et coutumes. Il était ici en
                  troisième exemplaire. */}
            <Reveal>
              <p className="max-w-[62ch] text-soft">
                Le véhicule climatisé, le carburant, les assurances, les
                parkings, les entrées, les guides de sentier obligatoires sur
                certains chemins, les horaires qui s&apos;enchaînent sans temps
                mort : tout cela est mon travail. Vingt ans de métier servent
                surtout à ça — savoir ce qui s&apos;enchaîne bien, quel jour
                éviter tel temple, à quelle heure une route se vide. Si vous le
                souhaitez, je choisis et je réserve aussi vos hôtels.
              </p>
              <p className="mt-4 font-display text-xl">— Agus</p>
            </Reveal>

            {/* ---------- La fiche : les faits, pas les adjectifs ---------- */}
            <Reveal delay={0.05}>
              <details className="group rounded-[14px] border border-rule bg-surface-alt [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 p-5">
                  <BadgeCheck
                    size={17}
                    className="shrink-0 text-accent"
                    strokeWidth={1.7}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="label block text-eyebrow">
                      Fiche d&apos;identité
                    </span>
                    {/* Ce résumé est lu par ceux qui n'ouvriront jamais le
                        dépliant : il doit suffire à lui seul. */}
                    <span className="mt-0.5 block text-sm leading-snug text-soft">
                      Guide diplômé · 20 ans de métier · français et anglais
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-faint transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <ul className="m-0 grid list-none gap-3.5 border-t border-rule p-5 sm:grid-cols-2">
                  {FICHE.map(({ icon: Icon, label, valeur }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Icon
                        size={16}
                        className="mt-0.5 shrink-0 text-accent"
                        strokeWidth={1.7}
                      />
                      <span>
                        <span className="label block text-faint">{label}</span>
                        <span className="text-sm leading-snug">{valeur}</span>
                      </span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 sm:col-span-2">
                    <Car
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                      strokeWidth={1.7}
                    />
                    <span>
                      <span className="label block text-faint">Véhicules</span>
                      <span className="text-sm leading-snug text-soft">
                        {AGUS.vehicules
                          .map((v) => v.split(" — ")[0])
                          .join(" · ")}{" "}
                        — chauffeur-guide compris dans le compte.
                      </span>
                    </span>
                  </li>
                </ul>
              </details>
            </Reveal>
          </div>
        </div>

        {/* ---------- Les valeurs : visibles, sur panneau bambou ----------
            Ce bloc était une section à part avant le configurateur. Le
            panneau garde la respiration visuelle qu'on perdrait à
            supprimer la bande, sans coûter une section de plus.

            Le padma en filigrane dans l'angle : le lotus à huit pétales
            est l'assise du dieu suprême, le sanctuaire vers lequel tout
            temple est orienté. En filigrane et non en icône — un
            symbole affiché en clair demande à être expliqué, une
            texture non. Il est posé là où aucun texte ne passe. */}
        {/* Pas d'apparition au défilement sur ce panneau, contrairement
            au reste : c'est devenu une **destination de navigation**, et
            un `.reveal` non encore apparu est décalé de 14 px vers le
            bas. L'ancre atterrissait donc sur la position d'avant
            l'animation, puis le panneau remontait de 14 px et passait
            sous la barre collante. On n'anime pas ce vers quoi on
            navigue. */}
        <div>
          <div
            id="valeurs"
            className="relative mt-[clamp(3rem,8vw,4.5rem)] overflow-hidden rounded-[18px] bg-immersive px-[clamp(1.5rem,5vw,3rem)] py-[clamp(2rem,6vw,3rem)] text-on-immersive"
          >
            <Symbole
              nom="padma"
              size={230}
              strokeWidth={0.5}
              className="pointer-events-none absolute -right-14 -top-16 text-on-immersive opacity-[0.13]"
            />
            <h3 className="relative max-w-[22ch] text-[clamp(1.5rem,4.5vw,2rem)] leading-tight">
              {VALEURS.titre}
            </h3>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-on-immersive-soft">
              {VALEURS.chapo}
            </p>

            {/* `court` et non `texte` : sur l'accueil, ces trois points
                doivent créer la préférence en un coup d'œil. La version
                longue est sur /agus, où l'on arrive après avoir décidé
                de vouloir en savoir plus — et où elle est ce qu'on est
                venu lire. L'icône passe sur la ligne du titre : trois
                lignes empilées par point coûtaient une demi-hauteur
                d'écran pour rien. */}
            <ul className="m-0 mt-8 grid list-none gap-6 p-0 lg:grid-cols-3">
              {VALEURS.points.map((p, i) => {
                const Icon = ICONES_VALEURS[i] ?? Heart;
                return (
                  <li
                    key={p.titre}
                    className="flex flex-col gap-2 border-t border-[color-mix(in_srgb,var(--on-immersive)_28%,transparent)] pt-4"
                  >
                    {/* h4 : globals ne donne Eczar qu'à h1–h3. */}
                    <h4 className="flex items-center gap-2.5 font-display text-lg font-medium leading-tight">
                      <Icon
                        size={18}
                        className="shrink-0 text-soleil"
                        strokeWidth={1.5}
                      />
                      {p.titre}
                    </h4>
                    <p
                      className={`text-sm leading-relaxed text-on-immersive-soft ${
                        p.citation ? "italic" : ""
                      }`}
                    >
                      {p.court ?? p.texte}
                    </p>
                  </li>
                );
              })}
            </ul>

            {/* La chute du panneau — « chaque voyage en direct, c'est un
                guide balinais de plus qui vit de son métier » — a
                déménagé sur /agus, où elle ouvre le développement.
                L'accueil garde ce qui embarque : le titre, le chapô et
                les trois points. Il ne garde pas la démonstration
                complète, qui ajoutait un écran de défilement à une page
                qui en fait déjà dix-neuf, et qui trouve sa vraie place
                là où quelqu'un a choisi d'aller lire. */}
            <p className="relative mt-10">
              <Link
                href="/agus?de=valeurs"
                className="group inline-flex min-h-11 items-center gap-2 border-b border-soleil pb-1 font-display text-[clamp(1.05rem,2.8vw,1.3rem)] leading-snug text-on-immersive no-underline"
              >
                Sa famille, son pays, son union de guides
                <ArrowRight
                  size={17}
                  className="shrink-0 text-soleil transition-transform group-hover:translate-x-1"
                />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
