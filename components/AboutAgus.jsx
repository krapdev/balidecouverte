import { BadgeCheck, CalendarClock, Languages, Users, MapPin, Car, ChevronDown } from "lucide-react";
import { PortraitAgus, Canang, Jepun } from "./Scene";
import Photo from "./Photo";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { AGUS } from "@/lib/data";

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
 * Pourquoi pas une page /agus : ces faits sont exactement ce qui lève le
 * doute, et les envoyer sur une page à part, c'est les mettre là où
 * personne ne va. Ils restent là où naît la question.
 */
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
          <Reveal
            as="figure"
            className="m-0 mx-auto w-full max-w-[300px] md:max-w-none"
          >
            <div className="arch bg-immersive-deep shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
              <Photo
                fallback={<PortraitAgus className="h-full w-full" />}
                uid="agus"
                ratio="aspect-[46/50]"
                priority
                brief="LA photo à faire en premier — Agus de face, en extérieur, lumière douce"
                alt="Agus Yudiarta, guide francophone à Bali"
                className="w-full"
              />
            </div>
            <figcaption className="mt-3.5 border-t border-rule pt-3">
              <span className="flex items-baseline justify-between gap-4 text-faint">
                <span className="label">{AGUS.nom}</span>
                <span className="label">Denpasar · 08°39&apos;S 115°13&apos;E</span>
              </span>
              <span className="mt-2 flex items-start gap-3 text-sm leading-relaxed text-soft">
                <Jepun size={22} tone="var(--eyebrow)" className="mt-1 shrink-0" />
                <span>
                  La fleur derrière mon oreille est un <em>jepun</em>, le
                  frangipanier : on la porte au temple, on la dépose sur les
                  offrandes.
                </span>
              </span>
            </figcaption>
          </Reveal>

          <div className="flex flex-col gap-6 md:mt-16">
            <Reveal>
              {/* Citation de travail : à remplacer par les mots d'Agus. */}
              <blockquote className="border-l-3 border-accent pl-5 text-[clamp(1.25rem,3.6vw,1.6rem)] italic leading-snug text-pretty">
                « Libérez-vous de l&apos;organisation. Je m&apos;occupe de
                tout — vous n&apos;avez plus qu&apos;à profiter. »
              </blockquote>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="max-w-[62ch] text-soft">
                Le véhicule climatisé, le carburant, les assurances, les
                parkings, les entrées, les guides de sentier obligatoires sur
                certains chemins, les horaires qui s&apos;enchaînent sans temps
                mort — tout cela est mon travail, et vous n&apos;avez pas à y
                penser. Si vous le souhaitez, je choisis et je réserve aussi vos
                hôtels.
              </p>
              <p className="mt-4 max-w-[62ch] text-soft">
                Vingt ans de métier, ça sert surtout à ça : savoir ce qui
                s&apos;enchaîne bien, quel jour éviter tel temple, à quelle
                heure une route se vide. Vous découvrez, je m&apos;occupe du
                reste.
              </p>
              <p className="mt-4 font-display text-xl">— Agus</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-start gap-4 border-y border-rule py-5">
                <Canang size={52} className="mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed text-soft">
                  Chaque matin, avant de prendre la route, je dépose un{" "}
                  <em>canang sari</em> sur le tableau de bord : quelques fleurs
                  dans un panier de feuille de palme tressée. C&apos;est trois
                  minutes, et c&apos;est le vrai début de la journée.
                </p>
              </div>
            </Reveal>

            {/* ---------- La fiche : les faits, pas les adjectifs ---------- */}
            <Reveal delay={0.14}>
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
      </div>
    </section>
  );
}
