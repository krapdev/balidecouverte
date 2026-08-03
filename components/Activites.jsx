"use client";

import { Check, Plus } from "lucide-react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import {
  ACTIVITES,
  FAMILLES,
  ACTIVITES_EPIGRAPHE,
  ACTIVITES_RESTE,
} from "@/lib/data";
import { useTrip } from "@/lib/trip-store";

/**
 * Le chemin B — on part des envies, elles deviennent le circuit.
 *
 * Deux familles, et la distinction fait tout le propos : les classiques
 * rassurent, les places secrètes donnent la raison de passer par Agus
 * plutôt que par une agence. Ces dernières étaient jusqu'ici enterrées
 * au troisième niveau de lecture, dans une fiche circuit dépliable.
 *
 * Volontairement pauvre en détail : on nomme et on donne envie, on ne
 * publie ni adresse ni chemin. Ce qui se monnaie, c'est d'y conduire.
 */
export default function Activites() {
  const { isActiviteSelected, toggleActivite, count } = useTrip();

  return (
    <section id="envies" className="ground-sable band">
      <div className="shell">
        <SectionHead
          eyebrow="Vos envies"
          title="Cochez, il en fait un itinéraire."
        >
          Rien ici n&apos;est une commande. Ce que vous cochez part dans votre
          message, et Agus construit le circuit autour — c&apos;est lui qui sait
          ce qui s&apos;enchaîne bien et ce qui se dilue.
        </SectionHead>

        <Reveal>
          <p className="mb-12 max-w-[46ch] border-l-3 border-accent pl-5 font-display text-[clamp(1.15rem,3vw,1.4rem)] leading-snug">
            « {ACTIVITES_EPIGRAPHE} »
          </p>
        </Reveal>

        {FAMILLES.map((f, fi) => {
          const liste = ACTIVITES.filter((a) => a.famille === f.id);
          return (
            <div key={f.id} className={fi ? "mt-14" : ""}>
              <Reveal>
                <div className="mb-6 border-t border-rule pt-5">
                  <h3 className="font-display text-[1.5rem] leading-tight">
                    {f.titre}
                  </h3>
                  <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-soft">
                    {f.texte}
                  </p>
                </div>
              </Reveal>

              <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
                {liste.map((a, i) => {
                  const on = isActiviteSelected(a.id);
                  return (
                    <Reveal as="li" key={a.id} delay={(i % 2) * 0.05}>
                      <button
                        type="button"
                        onClick={() => toggleActivite(a.id)}
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
                          {on ? (
                            <Check size={13} strokeWidth={3} />
                          ) : (
                            <Plus size={13} />
                          )}
                        </span>
                        <span>
                          <span className="block font-display text-lg leading-tight">
                            {a.titre}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-soft">
                            {a.texte}
                          </span>
                        </span>
                      </button>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[70ch] text-sm leading-relaxed text-soft">
            {ACTIVITES_RESTE}
          </p>
        </Reveal>

        {count > 0 && (
          <Reveal>
            <p className="mt-8">
              <a className="btn btn-accent btn-lg" href="#sur-mesure">
                {count} envie{count > 1 ? "s" : ""} — préparer ma demande
              </a>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
