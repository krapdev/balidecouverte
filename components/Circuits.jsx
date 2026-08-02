"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Sparkles, Plane, MoonStar } from "lucide-react";
import Scene from "./Scene";
import Archipel from "./Archipel";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { CIRCUITS, SIGNATURES } from "@/lib/data";
import { useTrip } from "@/lib/trip-store";

/**
 * Cinq points de départ, aucun point d'arrivée.
 *
 * Trois niveaux de lecture, pour ne pas noyer la page :
 *   1. la carte-repère — tempérament et trois chiffres, on tranche
 *   2. la fiche dépliable — étapes, places secrètes, ce qui est compris
 *   3. le jour par jour — pas ici : c'est le travail d'Agus, et le
 *      prétexte au premier message
 *
 * L'archipel en haut s'allume selon le circuit survolé ou ouvert : il
 * répond à « où » sans que le texte ait à le répéter cinq fois.
 */
export default function Circuits() {
  const [ouvert, setOuvert] = useState(null);
  const [survole, setSurvole] = useState(null);
  const { baseCircuit, setBaseCircuit } = useTrip();
  const still = useReducedMotion();

  const misEnAvant = CIRCUITS.find((c) => c.id === (survole ?? ouvert));

  return (
    <section id="circuits" className="ground-ivoire band">
      <div className="shell">
        <SectionHead
          eyebrow="Circuits"
          title="Cinq points de départ, aucun point d'arrivée."
        >
          Ce ne sont pas des produits sur étagère : ce sont cinq circuits qu&apos;Agus
          a réellement conduits, et que vous allez déformer. Choisissez celui
          qui vous ressemble, gardez ce qui vous plaît, jetez le reste — la
          conversation part de là.
        </SectionHead>

        <Reveal>
          <Archipel
            actives={misEnAvant ? misEnAvant.iles : []}
            className="mb-10 w-full"
          />
        </Reveal>

        <ul className="m-0 grid list-none gap-5 p-0">
          {CIRCUITS.map((c, i) => {
            const open = ouvert === c.id;
            const base = baseCircuit === c.id;
            return (
              <Reveal as="li" key={c.id} delay={i * 0.05}>
                <article
                  onMouseEnter={() => setSurvole(c.id)}
                  onMouseLeave={() => setSurvole(null)}
                  className={`overflow-hidden rounded-[18px] border bg-surface transition-colors duration-300 ${
                    base
                      ? "border-accent"
                      : open
                        ? "border-[color-mix(in_srgb,var(--jade)_45%,var(--rule))]"
                        : "border-rule"
                  }`}
                >
                  {/* ---------- Niveau 1 : la carte-repère ---------- */}
                  <button
                    type="button"
                    onClick={() => setOuvert(open ? null : c.id)}
                    aria-expanded={open}
                    aria-controls={`fiche-${c.id}`}
                    className="grid w-full cursor-pointer grid-cols-[auto_1fr] items-center gap-5 p-4 text-left sm:grid-cols-[128px_1fr_auto] sm:p-5"
                  >
                    <span className="hidden overflow-hidden rounded-[12px] sm:block">
                      <Scene
                        kind={c.scene}
                        uid={`circ-${c.id}`}
                        w={320}
                        h={220}
                        className="aspect-[16/11] w-full"
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="block font-display text-[1.375rem] leading-tight">
                        {c.nom}
                      </span>
                      <span className="mt-0.5 block text-sm text-soft">
                        {c.temperament}
                      </span>
                      <span className="label mt-2 flex flex-wrap gap-x-4 gap-y-1 text-faint">
                        <span>{c.jours} jours</span>
                        <span>{c.nuits} nuits</span>
                        <span>{c.etapes.length} étapes</span>
                      </span>
                    </span>

                    <span className="col-span-2 flex items-center justify-between gap-4 border-t border-rule pt-3 sm:col-span-1 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                      {/* Le prix ne peut plus être lu sans sa condition :
                          il ne comprend pas les nuits d'hôtel, et c'était
                          la première source de malentendu. */}
                      <span className="text-right">
                        <span className="block text-[0.6875rem] text-faint">
                          à partir de
                        </span>
                        <span className="block font-display text-[1.375rem] tabular-nums leading-tight">
                          {c.prixPers}
                        </span>
                        <span className="block text-[0.6875rem] text-faint">
                          par personne — hors hébergement
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-accent">
                        {open ? "Replier" : "Voir les étapes"}
                        <ChevronDown
                          size={16}
                          className="transition-transform duration-300"
                          style={{ transform: open ? "rotate(180deg)" : "none" }}
                        />
                      </span>
                    </span>
                  </button>

                  {/* ---------- Niveau 2 : la fiche ---------- */}
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`fiche-${c.id}`}
                        initial={still ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.2, 0.7, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 border-t border-rule p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
                          {/* Le squelette : où je dors, combien de temps */}
                          <div>
                            <p className="label mb-4 text-eyebrow">
                              Où vous dormez
                            </p>
                            <ol className="m-0 flex list-none flex-col gap-0 p-0">
                              {c.etapes.map((e) => (
                                <li
                                  key={e.lieu + e.region}
                                  className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5 last:border-0"
                                >
                                  <span>
                                    <span className="font-semibold">{e.lieu}</span>
                                    <span className="ml-2 text-sm text-soft">
                                      {e.region}
                                    </span>
                                  </span>
                                  <span className="label shrink-0 tabular-nums text-faint">
                                    {e.nuits} {e.nuits > 1 ? "nuits" : "nuit"}
                                  </span>
                                </li>
                              ))}
                            </ol>
                            {c.vols && (
                              <p className="mt-4 flex gap-2.5 text-sm text-soft">
                                <Plane size={15} className="mt-1 shrink-0 text-faint" />
                                {c.vols}
                              </p>
                            )}
                            <p className="mt-2 flex gap-2.5 text-sm text-soft">
                              <MoonStar size={15} className="mt-1 shrink-0 text-faint" />
                              Hébergements à votre charge par défaut — mais Agus
                              peut les choisir, vous les proposer et les réserver.
                            </p>
                          </div>

                          {/* Les places secrètes */}
                          <div>
                            <p className="label mb-4 flex items-center gap-2 text-eyebrow">
                              <Sparkles size={14} />
                              Trois places secrètes
                            </p>
                            <ul className="m-0 flex list-none flex-col gap-4 p-0">
                              {c.secrets.map((s) => (
                                <li key={s.titre}>
                                  <p className="font-display text-lg leading-tight">
                                    {s.titre}
                                  </p>
                                  <p className="mt-1 text-sm leading-relaxed text-soft">
                                    {s.texte}
                                  </p>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-rule pt-5">
                              <button
                                type="button"
                                onClick={() => setBaseCircuit(base ? null : c.id)}
                                className={`btn ${base ? "btn-outline text-accent" : "btn-accent"}`}
                              >
                                {base
                                  ? "✓ C'est ma base de départ"
                                  : "Partir de ce circuit"}
                              </button>
                              <a
                                className="text-sm text-soft underline decoration-rule underline-offset-4 hover:text-ink"
                                href="/tarifs"
                              >
                                Ce que comprend ce prix
                              </a>
                              <a
                                className="text-sm text-soft underline decoration-rule underline-offset-4 hover:text-ink"
                                href="#sur-mesure"
                              >
                                Le détail jour par jour ? Demandez-le à Agus.
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}
        </ul>

        {/* Ce que tous les circuits partagent */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded border border-rule bg-surface-alt p-6">
            <p className="label mb-3 text-eyebrow">
              Ce qu&apos;Agus met dans presque tous ses circuits
            </p>
            <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2">
              {SIGNATURES.map((t) => (
                <li key={t} className="text-sm leading-relaxed text-soft">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
