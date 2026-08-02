import { HandCoins, Users, Heart } from "lucide-react";
import { ENGAGEMENT } from "@/lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const ICONES = [HandCoins, Users, Heart];

/**
 * L'engagement, placé juste après les tarifs — c'est là qu'il pèse.
 * La grille de prix pose la question « où va mon argent ? » ; cette
 * section y répond, et transforme un argument commercial (« sans
 * intermédiaire ») en raison de choisir.
 *
 * Écrit par le positif : ce que le direct rend possible, jamais une
 * charge contre des tiers qu'on ne pourrait pas documenter.
 */
export default function Engagement() {
  return (
    <section id="engagement" className="ground-jade band">
      <div className="shell">
        <SectionHead eyebrow="Engagement" title={ENGAGEMENT.titre} onImmersive>
          Agus est balinais, diplômé, et travaille en direct depuis vingt ans.
          Ce n&apos;est pas seulement une façon de baisser le prix : c&apos;est une
          façon de faire vivre un métier.
        </SectionHead>

        <ul className="m-0 grid list-none gap-8 p-0 lg:grid-cols-3">
          {ENGAGEMENT.points.map((p, i) => {
            const Icon = ICONES[i] ?? Heart;
            return (
              <Reveal
                as="li"
                key={p.titre}
                delay={i * 0.07}
                className={`flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--on-immersive)_28%,transparent)] pt-5 ${
                  i === 1 ? "lg:mt-8" : i === 2 ? "lg:mt-16" : ""
                }`}
              >
                <Icon size={20} className="text-soleil" strokeWidth={1.5} />
                <h3 className="text-xl leading-tight">{p.titre}</h3>
                <p
                  className={`text-sm leading-relaxed text-on-immersive-soft ${
                    p.citation ? "italic" : ""
                  }`}
                >
                  {p.texte}
                </p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-[62ch] border-l-3 border-soleil pl-6 font-display text-[clamp(1.15rem,3vw,1.45rem)] leading-snug">
            {ENGAGEMENT.chute}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
