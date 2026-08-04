import { BadgeCheck, Users, Languages, MapPin, Car } from "lucide-react";
import { PortraitAgus, Canang, Jepun } from "./Scene";
import Photo from "./Photo";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { AGUS } from "@/lib/data";

/**
 * La présentation : un brief, puis une fiche.
 *
 * Le brief donne envie — un visage, une voix, deux détails concrets. La
 * fiche donne les faits qui lèvent le doute : diplôme, ancienneté,
 * langues, union, véhicules. Ces données existaient dans `AGUS` sans
 * être affichées nulle part ; les sortir raccourcit la section **et**
 * la rend plus crédible, parce que le doute d'un voyageur qui s'apprête
 * à confier quinze jours à un inconnu ne se lève pas avec des adjectifs.
 *
 * Pourquoi pas une page /agus : ces faits sont exactement ce qui rassure,
 * et les envoyer sur une page à part, c'est les mettre là où personne ne
 * va. Ils restent là où naît la question.
 */
const FICHE = [
  { icon: BadgeCheck, label: "Diplôme", valeur: AGUS.diplome },
  { icon: Users, label: "Depuis", valeur: `Professionnel depuis ${AGUS.depuis}` },
  { icon: Languages, label: "Langues", valeur: `Je guide en ${AGUS.langues}` },
  { icon: MapPin, label: "Union", valeur: AGUS.union },
];

export default function AboutAgus() {
  return (
    <section id="esprit" className="ground-ivoire band">
      <div className="shell">
        <SectionHead eyebrow="Qui je suis" title="Un Balinais, pas une agence.">
          Derrière Bali Découverte, il n&apos;y a ni plateforme ni centrale de
          réservation. Il y a moi, et je connais personnellement les gens chez
          qui vous déjeunerez.
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
                « Je ne vends pas un circuit. Je vous emmène là où
                j&apos;emmènerais un ami, et je vous explique ce que vous
                regardez. »
              </blockquote>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="max-w-[62ch] text-soft">
                J&apos;ai quarante ans, je suis marié et père de trois enfants.
                Je conduis moi-même, je traduis moi-même, et je construis chaque
                itinéraire avec vous — au rythme de votre famille, pas de celui
                d&apos;un autocar. Je suis aussi passionné d&apos;histoire
                européenne, ce qui rend la conversation possible dans les deux
                sens : je vous raconte mon île, vous me racontez la vôtre.
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
              <div className="rounded-[14px] border border-rule bg-surface-alt p-5">
                <p className="label mb-4 text-eyebrow">En bref</p>
                <ul className="m-0 grid list-none gap-3.5 p-0 sm:grid-cols-2">
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
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
