"use client";

import { Check, Plus, Ship, Gauge, Clock } from "lucide-react";
import Scene from "./Scene";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { ISLANDS } from "@/lib/data";
import { useTrip } from "@/lib/trip-store";

/**
 * Les îles sœurs. Panneau jade plein : on quitte Bali, la page le dit.
 * Chaque extension porte ses faits durs — accès, durée, niveau — parce
 * que c'est ce qui distingue l'aventure de la carte postale.
 */
export default function Islands() {
  const { isIslandSelected, toggleIsland } = useTrip();

  return (
    <section id="iles" className="ground-jade band">
      <div className="shell">
        <SectionHead
          eyebrow="Îles sœurs"
          title="L'aventure ne s'arrête pas au détroit."
          onImmersive
        >
          Bali tient sur 150 km. À une heure de bateau ou d&apos;avion commencent
          Java, Lombok et Komodo — des volcans qu&apos;on monte de nuit, des
          villages sasak en bambou, des îles où l&apos;on dort à bord. Agus
          organise le transport et vous accompagne, ou passe le relais à un guide
          de confiance sur place.
        </SectionHead>

        <ul className="grid list-none gap-8 p-0 lg:grid-cols-3">
          {ISLANDS.map((e, i) => {
            const on = isIslandSelected(e.id);
            return (
              <Reveal
                as="li"
                key={e.id}
                delay={i * 0.08}
                className={`flex h-full flex-col ${
                  i === 1 ? "lg:mt-10" : i === 2 ? "lg:mt-20" : ""
                }`}
              >
                <article
                  className={`flex h-full flex-col overflow-hidden rounded-[18px_18px_4px_4px] border bg-[color-mix(in_srgb,var(--immersive-deep)_45%,transparent)] transition-[transform,border-color] duration-300 hover:-translate-y-1 ${
                    on
                      ? "border-soleil"
                      : "border-[color-mix(in_srgb,var(--on-immersive)_22%,transparent)] hover:border-[color-mix(in_srgb,var(--on-immersive)_45%,transparent)]"
                  }`}
                >
                  <div className="relative aspect-[16/11]">
                    <Scene kind={e.scene} uid={e.id} className="h-full w-full" />
                    <span className="label absolute left-4 top-4 rounded-full bg-[color-mix(in_srgb,var(--immersive-deep)_78%,transparent)] px-3 py-1.5 text-on-immersive backdrop-blur-sm">
                      {e.island}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
                    <h3 className="text-[1.375rem]">{e.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-on-immersive-soft">
                      {e.text}
                    </p>

                    <dl className="m-0 flex flex-col gap-1.5 border-t border-[color-mix(in_srgb,var(--on-immersive)_18%,transparent)] pt-3.5 text-sm text-on-immersive-soft">
                      <div className="flex gap-2.5">
                        <dt className="mt-0.5"><Ship size={14} /></dt>
                        <dd className="m-0">{e.access}</dd>
                      </div>
                      <div className="flex gap-2.5">
                        <dt className="mt-0.5"><Clock size={14} /></dt>
                        <dd className="m-0">{e.duration}</dd>
                      </div>
                      <div className="flex gap-2.5">
                        <dt className="mt-0.5"><Gauge size={14} /></dt>
                        <dd className="m-0">{e.level}</dd>
                      </div>
                    </dl>

                    <div className="mt-1 flex items-center justify-between gap-4">
                      <span className="text-sm tabular-nums">
                        {e.price}{" "}
                        <small className="text-[0.6875rem] text-on-immersive-soft">
                          {e.priceNote}
                        </small>
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleIsland(e.id)}
                        aria-pressed={on}
                        className={`btn whitespace-nowrap ${
                          on
                            ? "border-soleil-pale bg-transparent text-soleil-pale"
                            : "btn-sun"
                        }`}
                      >
                        {on ? (
                          <>
                            <Check size={15} /> Dans mon circuit
                          </>
                        ) : (
                          <>
                            <Plus size={15} /> Ajouter
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
