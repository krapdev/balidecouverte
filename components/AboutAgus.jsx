import { Jepun } from "./Scene";
import Link from "next/link";
import { Users, HandCoins, Heart } from "lucide-react";
import { Symbole } from "./Symboles";
import LienPage from "./LienPage";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { AGUS, VALEURS } from "@/lib/data";

/**
 * La présentation : une promesse, puis une préférence.
 *
 * L'argument n'est pas « voilà qui je suis » mais **« vous n'avez rien à
 * organiser »**. C'est ce qu'achète quelqu'un qui part à 12 000 km : pas
 * une biographie, la certitude que tout est pris en charge.
 *
 * ⚠️ **Trois blocs de preuve se sont succédé ici, et il n'en reste
 * aucun.** Un dépliant « Fiche d'identité » de six faits, puis une
 * phrase de trois lignes, puis une ligne de quatre mentions sous
 * l'intitulé « Ce qui se vérifie ». Chacun a été retiré pour la même
 * raison : il redisait ce qui était dit ailleurs — d'abord le bandeau du
 * hero, ensuite `/agus`.
 *
 * Ce qu'il faut savoir avant d'y toucher : **l'accueil ne dit donc plus
 * nulle part qu'Agus est un professionnel certifié.** La preuve vit sur
 * `/agus` et dans le pied de page. Les deux liens vers le portrait — sous
 * la photo, et au bas du panneau des valeurs — sont devenus le seul
 * chemin vers elle. Les affaiblir couperait la réassurance du site ; les
 * supprimer la supprimerait.
 *
 * Restent donc deux registres :
 *
 *  1. **La promesse** (le chapô, puis le paragraphe) : ce dont on est
 *     déchargé.
 *  2. **La préférence** (le panneau bambou) : pourquoi lui plutôt qu'une
 *     agence.
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
            2005 ». Le diplôme se dit maintenant sur /agus et nulle part
            ailleurs ; ici on est passé à ce qu'il fait. */}
        <SectionHead eyebrow="Votre guide" title="Laissez-vous guider.">
          Je conduis moi-même et je traduis moi-même. Vous n&apos;avez ni
          véhicule à louer, ni billets à prendre, ni horaires à caler :
          je m&apos;occupe de tout.
        </SectionHead>

        {/* ⚠️ **La photo a été retirée d'ici, et la grille avec elle.**
            Elle apparaissait deux fois sur la même page : dans le hero, à
            un demi-écran de là, et ici en grand. Deux fois le même visage
            sur un seul défilement, c'est le visage qui perd de sa force,
            pas la page qui en gagne.

            ⚠️ **Ce qui NE DOIT PAS partir avec elle, c'est le lien.** La
            photo était la cible cliquable vers `/agus` — et `/agus` porte
            désormais toute la preuve du site : le diplôme, la licence
            renouvelée tous les trois ans, les langues. L'accueil ne les
            dit plus nulle part. Le lien ci-dessous, et celui du panneau
            des valeurs, sont donc **le seul chemin** vers cette preuve ;
            les supprimer la supprimerait.

            Il était habillé à la main pour épouser la photo ; il reprend
            maintenant `LienPage`, le motif de lien de page du site.
            `?de=esprit` : le retour depuis /agus ramène ici, pas en haut
            de l'accueil (voir lib/retours.js). */}
        <div>
          <div className="flex flex-col gap-6">
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

            {/* ⚠️ **La ligne « Ce qui se vérifie » a été retirée**, après
                le bandeau du hero. Le diplôme, l'année et les langues ne
                sont donc plus nulle part sur l'accueil : ils vivent sur
                /agus, où la fiche les développe, et dans le pied de page.

                C'est un choix assumé, et il a un coût qu'il faut
                connaître : **plus rien sur l'accueil ne dit qu'Agus est
                un professionnel certifié.** Le seul chemin vers cette
                preuve est le lien du portrait — celui sous la photo et
                celui du panneau des valeurs. Ces deux liens sont donc
                devenus critiques : les affaiblir, c'est couper la
                réassurance du site. */}
            <Reveal delay={0.05}>
              <LienPage href="/agus?de=esprit">
                Mon parcours, mes diplômes, mes véhicules
              </LienPage>
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
            {/* La puce épingle : un jepun jaune posé en tête de fiche,
                comme sur « À savoir ». C'est le seul jaune du panneau,
                et il sert à dire « ici commence quelque chose » — le
                padma en filigrane, lui, ne dit rien, il habille. */}
            <Jepun
              size={26}
              tone="var(--soleil)"
              className="relative mb-3 block"
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
            {/* ⚠️ **Le lien « Ma famille, mon pays, mon union » a été
                retiré.** Il promettait mot pour mot les trois points
                qu'on venait de lire, et le portrait reste desservi par
                « Mon parcours, mes diplômes, mes véhicules » plus haut
                dans la présentation, ainsi que par le menu. */}
          </div>
        </div>
      </div>
    </section>
  );
}
