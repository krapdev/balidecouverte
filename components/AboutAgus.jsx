import Link from "next/link";
import {
  BadgeCheck,
  Users,
  HandCoins,
  Heart,
} from "lucide-react";
import { PortraitAgus } from "./Scene";
import { Symbole } from "./Symboles";
import LienPage from "./LienPage";
import Photo from "./Photo";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { AGUS, VALEURS } from "@/lib/data";

/**
 * La présentation : une promesse, une preuve, une préférence.
 *
 * L'argument n'est pas « voilà qui je suis » mais **« vous n'avez rien à
 * organiser »**. C'est ce qu'achète quelqu'un qui part à 12 000 km : pas
 * une biographie, la certitude que tout est pris en charge par un
 * professionnel diplômé.
 *
 * Trois registres, et il en faut trois — en retirer un coûterait la
 * moitié du travail :
 *
 *  1. **La promesse** (le chapô, puis le paragraphe) : ce dont on est
 *     déchargé.
 *  2. **La preuve** (la ligne de certification) : de quoi lever le doute.
 *     Qui ne fait pas confiance ne sera pas ému par des valeurs.
 *  3. **La préférence** (le panneau bambou) : pourquoi lui plutôt qu'une
 *     agence. Qui fait confiance sans préférer ne réserve pas non plus.
 *
 * ⚠️ **Il y avait ici un dépliant « Fiche d'identité »** — six faits
 * repliés derrière un `<details>`. Il a été retiré, et ce n'est pas un
 * revirement : la condition qui le justifiait était « le résumé porte
 * l'essentiel même fermé », et sur mobile personne n'ouvre un dépliant,
 * si bien que la page ne montrait en pratique **que** sa ligne de
 * résumé. Depuis que /agus développe ces faits, garder un tiroir fermé
 * au-dessus d'un lien qui mène à la version complète était deux fois le
 * même geste. On garde donc la ligne, à découvert, et on la lie au
 * portrait.
 *
 * Ce qui reste ici n'est pas choisi au hasard : la certification est le
 * seul de ces faits qui **répond à une inquiétude** plutôt qu'à une
 * curiosité. Ses véhicules, son union et sa famille sont intéressants ;
 * ils n'apaisent rien tant que « est-ce un professionnel ? » est ouvert.
 */

/* Dans l'ordre des points de VALEURS : ce que l'argent fait vivre, le
   collectif de guides, la mission. */
const ICONES_VALEURS = [HandCoins, Users, Heart];

/* La fiche complète vit sur /agus. */

export default function AboutAgus() {
  return (
    <section id="esprit" className="ground-ivoire band">
      <div className="shell">
        {/* Le chapô s'ouvrait sur « Guide diplômé, professionnel depuis
            2005 » — que le bandeau du hero venait de dire deux écrans
            plus haut, et que la ligne de faits redit trois centimètres
            plus bas. Le diplôme s'annonce **une fois**, au premier
            écran ; ici on est déjà passé à ce qu'il fait. */}
        <SectionHead eyebrow="Votre guide" title="Laissez-vous guider.">
          Je conduis moi-même et je traduis moi-même. Vous n&apos;avez ni
          véhicule à louer, ni billets à prendre, ni horaires à caler :
          je m&apos;occupe de tout.
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
              aria-label="Mon portrait : ma famille, mon pays, mon union de guides"
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
              {/* La porte et non la flèche : c'est la grammaire du site
                  depuis LienPage.jsx — une porte, on change de page ; une
                  flèche, on reste ici. Elle n'est pas reprise du
                  composant parce que la cible cliquable, ici, c'est la
                  photo entière. */}
              <span className="mt-3.5 flex min-h-11 items-center gap-2.5 border-t border-rule pt-3 text-sm text-accent">
                <Symbole
                  nom="porte"
                  size={17}
                  strokeWidth={1.5}
                  className="shrink-0 transition-transform group-hover:-translate-y-0.5"
                />
                <span className="underline decoration-accent underline-offset-4">
                  Mon portrait, ma famille, mon union
                </span>
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

            {/* ---------- Ce qui se vérifie ----------
                Trois formes se sont succédé ici : un dépliant de six
                faits, puis une phrase de trois lignes, maintenant une
                ligne de quatre mentions séparées par des points.

                La phrase disait « Diplômé guide francophone,
                professionnel depuis octobre 2005. Je guide en français
                et anglais, et je conduis moi-même » — soit, à trois
                centimètres près, le bandeau du hero et le chapô de la
                section. Le site répétait le diplôme **neuf fois**. Un
                fait répété ne rassure pas davantage : il finit par
                sonner comme un argument de vente.

                Une liste de mentions, elle, ne se lit pas comme une
                phrase : on la balaye, on vérifie, on passe. C'est le bon
                registre pour des faits qu'on consulte. */}
            <Reveal delay={0.05}>
              <div className="rounded-[14px] border border-rule bg-surface-alt p-4">
                <p className="label flex items-center gap-2 text-eyebrow">
                  <BadgeCheck size={14} strokeWidth={1.9} className="shrink-0" />
                  Ce qui se vérifie
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  {[
                    AGUS.diplome,
                    `Depuis ${AGUS.depuis}`,
                    `Je guide en ${AGUS.langues}`,
                    "Je conduis moi-même",
                  ].join(" · ")}
                </p>
                <LienPage href="/agus?de=esprit" className="mt-1">
                  Tout mon parcours
                </LienPage>
              </div>
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
              {/* Même grammaire que partout — la porte — mais sur fond
                  bambou : le composant LienPage est réglé pour les fonds
                  clairs, et son bambou y serait illisible. */}
              <Link
                href="/agus?de=valeurs"
                className="group inline-flex min-h-11 items-center gap-3 font-display text-[clamp(1.05rem,2.8vw,1.3rem)] leading-snug text-on-immersive no-underline"
              >
                <Symbole
                  nom="porte"
                  size={20}
                  strokeWidth={1.4}
                  className="shrink-0 text-soleil transition-transform group-hover:-translate-y-0.5"
                />
                <span className="underline decoration-soleil underline-offset-[6px]">
                  Ma famille, mon pays, mon union de guides
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
