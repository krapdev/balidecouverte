"use client";

import { Check, Plus } from "lucide-react";
import Scene from "./Scene";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { ISLANDS, CIRCUITS } from "@/lib/data";
import { useTrip } from "@/lib/trip-store";

/**
 * Les îles sœurs — Bali d'abord, le reste ensuite.
 *
 * Version allégée. La précédente affichait quatre grandes cartes avec
 * accès, durée, niveau ET un prix par île — soit un second système de
 * prix qui contredisait celui des circuits pour les mêmes destinations
 * (Java « à partir de 185 € » contre 2 210 € pour le circuit Bali + Java).
 * Ici chaque île renvoie au circuit qui la contient : un seul chiffre fait
 * foi, et l'au-delà de Bali reste une extension, pas un rayon parallèle.
 */
export default function Islands() {
  const { isIslandSelected, toggleIsland } = useTrip();

  return (
    <section id="iles" className="ground-jade band">
      <div className="shell">
        <SectionHead
          eyebrow="Îles sœurs"
          title="Bali d'abord. Puis, si vous voulez aller plus loin."
          onImmersive
        >
          Bali tient sur 150 km. À une heure de bateau ou d&apos;avion
          commencent Java, Lombok et Komodo. Chacune se greffe sur un circuit
          qu&apos;Agus conduit déjà — cochez celle qui vous appelle, elle
          partira dans votre message.
        </SectionHead>

        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {ISLANDS.map((e, i) => {
            const on = isIslandSelected(e.id);
            const circuit = CIRCUITS.find((c) => c.id === e.circuit);
            return (
              <Reveal as="li" key={e.id} delay={(i % 2) * 0.06}>
                <button
                  type="button"
                  onClick={() => toggleIsland(e.id)}
                  aria-pressed={on}
                  className={`flex h-full w-full cursor-pointer items-start gap-4 rounded-[14px] border p-4 text-left transition-colors duration-200 ${
                    on
                      ? "border-soleil bg-[color-mix(in_srgb,var(--immersive-deep)_55%,transparent)]"
                      : "border-[color-mix(in_srgb,var(--on-immersive)_22%,transparent)] hover:border-[color-mix(in_srgb,var(--on-immersive)_48%,transparent)]"
                  }`}
                >
                  <span className="hidden shrink-0 overflow-hidden rounded-[10px] sm:block sm:w-[86px]">
                    <Scene
                      kind={e.scene}
                      uid={`ile-${e.id}`}
                      className="aspect-square w-full"
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="label text-soleil-pale">{e.island}</span>
                    <span className="mt-1 block font-display text-lg leading-tight">
                      {e.title}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-on-immersive-soft">
                      {e.text}
                    </span>
                    {/* Un seul fait dur, et le circuit qui porte le prix. */}
                    <span className="label mt-3 block text-on-immersive-soft">
                      {e.fait}
                    </span>
                    {circuit && (
                      <span className="mt-1 block text-[0.8125rem] text-soleil-pale">
                        Circuit « {circuit.nom} » · {circuit.jours} jours
                      </span>
                    )}
                  </span>

                  <span
                    className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${
                      on
                        ? "border-soleil bg-soleil text-immersive-deep"
                        : "border-[color-mix(in_srgb,var(--on-immersive)_38%,transparent)] text-on-immersive-soft"
                    }`}
                    aria-hidden="true"
                  >
                    {on ? <Check size={13} strokeWidth={3} /> : <Plus size={13} />}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[70ch] text-sm leading-relaxed text-on-immersive-soft">
            Agus organise le transport et vous accompagne, ou passe le relais à
            un guide de confiance sur place selon la destination. Sumbawa et
            Rinca aussi — demandez-lui.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
