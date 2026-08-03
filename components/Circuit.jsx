"use client";

import { MoonStar, Check } from "lucide-react";
import Scene from "./Scene";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { CIRCUITS } from "@/lib/data";
import { useTrip } from "@/lib/trip-store";

/**
 * Le chemin A — le circuit clé en main d'Agus, pris comme base de travail.
 *
 * Un seul circuit désormais, celui de Bali : plus de liste de cinq cartes
 * à comparer, donc plus de fiche dépliable. Les étapes sont visibles
 * d'emblée — c'est ce que le voyageur doit voir pour décider s'il part
 * de là.
 *
 * Le jour par jour reste absent, et c'est délibéré : c'est le livrable
 * d'Agus et la raison même de lui écrire.
 */
export default function Circuit() {
  const { baseCircuit, setBaseCircuit } = useTrip();
  const c = CIRCUITS[0];
  const base = baseCircuit === c.id;

  return (
    <section id="circuit" className="ground-ivoire band">
      <div className="shell">
        <SectionHead
          eyebrow="Le circuit d'Agus"
          title="Quinze jours, et tout Bali."
        >
          Ce n&apos;est pas un produit sur étagère : c&apos;est l&apos;itinéraire
          qu&apos;Agus a conduit des dizaines de fois, et qu&apos;il connaît
          assez bien pour le défaire. Prenez-le comme base — on garde ce qui
          vous plaît, on jette le reste.
        </SectionHead>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="overflow-hidden rounded-[18px] border border-rule">
              <Scene kind={c.scene} uid="circuit-bali" w={640} h={440} className="aspect-[16/11] w-full" />
            </div>
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
              <span className="label flex flex-wrap gap-x-4 gap-y-1 text-faint">
                <span>{c.jours} jours</span>
                <span>{c.nuits} nuits</span>
                <span>{c.etapes.length} étapes</span>
              </span>
              <span className="text-right">
                <span className="block text-[0.6875rem] text-faint">
                  à partir de
                </span>
                <span className="block font-display text-[1.375rem] leading-tight tabular-nums">
                  {c.prixPers}
                </span>
                <span className="block text-[0.6875rem] text-faint">
                  par personne — hors hébergement
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="label mb-4 text-eyebrow">Où vous dormez</p>
            <ol className="m-0 flex list-none flex-col gap-0 p-0">
              {c.etapes.map((e) => (
                <li
                  key={e.lieu}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5 last:border-0"
                >
                  <span>
                    <span className="font-semibold">{e.lieu}</span>
                    <span className="ml-2 text-sm text-soft">{e.region}</span>
                  </span>
                  <span className="label shrink-0 tabular-nums text-faint">
                    {e.nuits} {e.nuits > 1 ? "nuits" : "nuit"}
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-4 flex gap-2.5 text-sm text-soft">
              <MoonStar size={15} className="mt-1 shrink-0 text-faint" />
              Hébergements à votre charge par défaut — mais Agus peut les
              choisir, vous les proposer et les réserver.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-rule pt-5">
              <button
                type="button"
                onClick={() => setBaseCircuit(base ? null : c.id)}
                className={`btn ${base ? "btn-outline text-accent" : "btn-accent"}`}
              >
                {base ? (
                  <>
                    <Check size={15} /> C&apos;est ma base de départ
                  </>
                ) : (
                  "Partir de ce circuit"
                )}
              </button>
              <a
                className="text-sm text-soft underline decoration-rule underline-offset-4 hover:text-ink"
                href="/tarifs"
              >
                Ce que comprend ce prix
              </a>
            </div>

            {base && (
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Vous pouvez maintenant descendre cocher ce que vous voulez y
                ajouter — ou l&apos;envoyer tel quel et laisser Agus proposer.
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
