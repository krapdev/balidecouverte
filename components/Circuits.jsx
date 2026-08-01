import { ROUTE, CIRCUIT } from "@/lib/data";
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
      className="ground-ivoire band"
    >
      <div className="shell">
        <SectionHead
          eyebrow="Circuits"
          title="Quinze jours, sept étapes, quatorze nuits."
        >
          Un circuit qu&apos;Agus a réellement construit, résumé à ses étapes.
          Chacune se rallonge, se raccourcit ou se remplace : c&apos;est un point
          de départ, pas un catalogue.
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
                {/* Une lampe par étape : le halo dit l'avancée de la nuit */}
                <span className="relative grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-surface text-[0.6875rem] font-semibold tabular-nums text-accent">
                  <span className="relative">{String(i + 1).padStart(2, "0")}</span>
                </span>
                {i < ROUTE.length - 1 && (
                  <span className="w-px flex-1 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--accent)_40%,transparent),color-mix(in_srgb,var(--accent)_5%,transparent))]" />
                )}
              </div>

              <div className="pb-1">
                <span className="label mb-2 block text-eyebrow">
                  {step.days}
                </span>
                <h3 className="mb-1.5 text-[1.375rem]">{step.title}</h3>
                <p className="max-w-[58ch] text-sm leading-relaxed text-soft">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-col gap-4 border-t border-rule pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-[1.75rem] tabular-nums">
                {CIRCUIT.prix}
                <span className="ml-2 font-sans text-base text-soft">
                  pour deux, soit {CIRCUIT.prixParPersonne} par personne
                </span>
              </p>
              <p className="mt-1 max-w-[52ch] text-sm text-soft">
                {CIRCUIT.formule} {CIRCUIT.horsForfait} {CIRCUIT.saison
                  .charAt(0)
                  .toUpperCase() + CIRCUIT.saison.slice(1)}.
              </p>
              <p className="mt-2 max-w-[52ch] text-sm text-soft">
                {CIRCUIT.degressif}
              </p>
            </div>
            <a className="btn btn-accent shrink-0" href="#sur-mesure">
              Partir de ce circuit
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
