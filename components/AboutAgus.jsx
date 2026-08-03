import { PortraitAgus, Canang, Jepun } from "./Scene";

/**
 * La présentation : donner envie de partir avec lui, sans en faire trop.
 *
 * Un visage, une voix, deux détails concrets. Le bloc « Tri Hita Karana »
 * qui structurait cette section en trois harmonies a été retiré : c'était
 * la partie la plus conceptuelle, et l'une des trois (« En direct, sans
 * agence ») redisait mot pour mot la section Engagement.
 */
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function AboutAgus() {
  return (
    <section
      id="esprit"
      className="ground-ivoire band"
    >
      <div className="shell">
        <SectionHead eyebrow="L'Esprit" title="Un Balinais, pas une agence.">
          Derrière Bali Découverte, il n&apos;y a ni plateforme, ni centrale de
          réservation. Il y a Agus Yudiarta, guide diplômé francophone,
          professionnel depuis octobre 2005, qui travaille avec d&apos;autres
          guides au sein d&apos;une union de guides de Bali. Il guide aussi en
          anglais, et connaît personnellement les gens chez qui vous déjeunerez.
        </SectionHead>

        <div className="grid items-start gap-[clamp(2rem,6vw,3.5rem)] md:grid-cols-[0.72fr_1.28fr]">
          <Reveal as="figure" className="m-0 mx-auto w-full max-w-[300px] md:max-w-none">
            <div className="arch bg-immersive-deep shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
              <PortraitAgus className="aspect-[46/50] w-full" />
            </div>
            <figcaption className="mt-3.5 border-t border-rule pt-3">
              <span className="flex items-baseline justify-between gap-4 text-faint">
                <span className="label">Agus Yudiarta</span>
                <span className="label">Denpasar · 08°39&apos;S 115°13&apos;E</span>
              </span>
              <span className="mt-2 flex items-start gap-3 text-sm leading-relaxed text-soft">
                <Jepun size={22} tone="var(--eyebrow)" className="mt-1 shrink-0" />
                <span>
                  La fleur derrière l&apos;oreille est un <em>jepun</em>, le
                  frangipanier : on la porte au temple, on la dépose sur les
                  offrandes.
                </span>
              </span>
            </figcaption>
          </Reveal>

          <div className="flex flex-col gap-6 md:mt-16">
            <Reveal>
              {/* Citation de travail : à remplacer par les mots d'Agus.
                  Les détails personnels inventés ont été retirés. */}
              <blockquote className="border-l-3 border-accent pl-5 text-[clamp(1.25rem,3.6vw,1.6rem)] italic leading-snug text-pretty">
                « Je ne vends pas un circuit. Je vous emmène là où j&apos;emmènerais
                un ami, et je vous explique ce que vous regardez. »
              </blockquote>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="max-w-[62ch] text-soft">
                J&apos;ai quarante ans, je suis marié, et père de deux filles de
                douze et neuf ans et d&apos;un garçon de cinq ans. Je guide en
                français depuis octobre 2005. Je conduis moi-même, je traduis
                moi-même, et je construis chaque itinéraire avec vous — au rythme
                de votre famille, pas de celui d&apos;un autocar.
              </p>
              <p className="mt-4 max-w-[62ch] text-soft">
                Je suis passionné d&apos;histoire, et particulièrement de celle de
                l&apos;Europe — la Belgique et la France, où je me suis rendu à
                plusieurs reprises. C&apos;est ce qui rend la conversation possible
                dans les deux sens : je vous raconte mon île, et vous me racontez
                la vôtre.
              </p>
              <p className="mt-4 font-display text-xl">— Agus</p>
            </Reveal>

            <Reveal delay={0.13}>
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
          </div>
        </div>

      </div>
    </section>
  );
}
