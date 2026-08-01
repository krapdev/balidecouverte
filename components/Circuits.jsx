import { ROUTE } from "@/lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

/**
 * Rail d'itinéraire. La numérotation est ici porteuse de sens :
 * c'est une séquence de jours, pas une décoration.
 */
export default function Circuits() {
  return (
    <section
      id="circuits"
      className="bg-immersive band text-on-immersive"
    >
      <div className="shell">
        <SectionHead
          eyebrow="Circuits"
          title="Une trame de 12 jours, à déformer."
          onImmersive
        >
          Voici comment s&apos;enchaîne un itinéraire type dans l&apos;est et le
          nord. Chaque étape se rallonge, se raccourcit ou se remplace — c&apos;est
          le point de départ de votre conversation avec Agus.
        </SectionHead>

        <ol className="m-0 list-none p-0">
          {ROUTE.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.04}
              className="grid grid-cols-[auto_1fr] gap-5 pb-9"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--on-immersive)_35%,transparent)] bg-immersive-deep font-util text-[0.6875rem] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < ROUTE.length - 1 && (
                  <span className="w-px flex-1 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--on-immersive)_30%,transparent),color-mix(in_srgb,var(--on-immersive)_8%,transparent))]" />
                )}
              </div>

              <div className="pb-1">
                <span className="label mb-2 block text-accent">{step.days}</span>
                <h3 className="mb-1.5 text-[1.375rem]">{step.title}</h3>
                <p className="max-w-[58ch] text-sm leading-relaxed text-on-immersive-soft">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
