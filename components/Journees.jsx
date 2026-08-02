"use client";

import { Check, Plus, Sun, Route } from "lucide-react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import {
  FORMULES,
  JOURNEES,
  JOURNEES_EPIGRAPHE,
  JOURNEES_RESTE,
} from "@/lib/data";
import { useTrip } from "@/lib/trip-store";

const ICONES = { journee: Sun, circuit: Route };

/**
 * Les journées, et la fourche « à la journée ou en circuit ».
 *
 * Volontairement pauvre en détail : on ne vend pas un programme, on
 * aide le voyageur à savoir ce qu'il veut avant d'écrire à Agus. Une
 * ligne par journée, une case à cocher, et c'est tout — le contenu
 * exact se discute avec lui, qui seul sait ce qui est faisable depuis
 * l'hôtel choisi.
 */
export default function Journees() {
  const { isDaySelected, toggleDay } = useTrip();

  return (
    <section id="journees" className="ground-sable band">
      <div className="shell">
        {/* La fourche, posée avant tout le reste */}
        <Reveal>
          <ul className="m-0 mb-14 grid list-none gap-5 p-0 sm:grid-cols-2">
            {FORMULES.map((f) => {
              const Icon = ICONES[f.id] ?? Sun;
              return (
                <li
                  key={f.id}
                  className="flex flex-col gap-2 rounded-[14px] border border-rule bg-surface p-5"
                >
                  <Icon size={20} className="text-accent" strokeWidth={1.5} />
                  <h3 className="text-xl leading-tight">{f.titre}</h3>
                  <p className="text-sm leading-relaxed text-soft">{f.texte}</p>
                  <p className="label mt-1 text-faint">{f.detail}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <SectionHead eyebrow="Vos journées" title="On compose vos jours ensemble.">
          Agus accompagne aussi à la journée, depuis l&apos;hôtel où vous logez.
          Cochez les journées qui vous tentent — ce n&apos;est pas une commande,
          c&apos;est ce que vous lui direz en ouvrant la conversation.
        </SectionHead>

        <Reveal>
          <p className="mb-10 max-w-[46ch] border-l-3 border-accent pl-5 font-display text-[clamp(1.15rem,3vw,1.4rem)] leading-snug">
            « {JOURNEES_EPIGRAPHE} »
          </p>
        </Reveal>

        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {JOURNEES.map((j, i) => {
            const on = isDaySelected(j.id);
            return (
              <Reveal as="li" key={j.id} delay={(i % 2) * 0.05}>
                <button
                  type="button"
                  onClick={() => toggleDay(j.id)}
                  aria-pressed={on}
                  className={`flex h-full w-full cursor-pointer items-start gap-4 rounded-[14px] border p-5 text-left transition-colors duration-200 ${
                    on
                      ? "border-accent bg-tint"
                      : "border-rule bg-surface hover:border-[color-mix(in_srgb,var(--jade)_40%,var(--rule))]"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${
                      on
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-rule text-faint"
                    }`}
                    aria-hidden="true"
                  >
                    {on ? <Check size={13} strokeWidth={3} /> : <Plus size={13} />}
                  </span>
                  <span>
                    <span className="block font-display text-lg leading-tight">
                      {j.titre}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-soft">
                      {j.texte}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[70ch] text-sm leading-relaxed text-soft">
            {JOURNEES_RESTE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
