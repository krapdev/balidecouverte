"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  MessageSquare,
  Send,
  CalendarDays,
  Compass,
} from "lucide-react";
import { useTrip } from "@/lib/trip-store";
import { buildMessage, whatsappUrl } from "@/lib/whatsapp";
import {
  DURATIONS,
  HEBERGEMENT,
  STYLES,
  WHATSAPP_DISPLAY,
  monthOptions,
  periodNote,
} from "@/lib/data";
import SectionHead from "./SectionHead";

function Counter({ label, field, value, onStep }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="label text-soft">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onStep(field, -1)}
          className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded border border-rule bg-surface text-soft transition-colors hover:border-eyebrow hover:text-eyebrow"
          aria-label={`Retirer un ${label.toLowerCase().replace(/s$/, "")}`}
        >
          <Minus size={15} />
        </button>
        <output className="min-w-[2.4ch] text-center font-sans text-sm tabular-nums">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onStep(field, 1)}
          className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded border border-rule bg-surface text-soft transition-colors hover:border-eyebrow hover:text-eyebrow"
          aria-label={`Ajouter un ${label.toLowerCase().replace(/s$/, "")}`}
        >
          <Plus size={15} />
        </button>
        <span className="ml-0.5 text-sm text-soft">{label.toLowerCase()}</span>
      </div>
    </div>
  );
}

export default function TripBuilder() {
  const trip = useTrip();
  const months = useMemo(() => monthOptions(), []);
  const period = useMemo(() => periodNote(trip.month), [trip.month]);
  const message = buildMessage(trip);
  const href = whatsappUrl(message);

  return (
    <section
      id="sur-mesure"
      className="ground-sable band"
    >
      <div className="shell">
        <SectionHead eyebrow="Sur-Mesure" title="Construisez votre demande.">
          Quatre questions, et votre message part sur le WhatsApp d&apos;Agus, déjà
          rédigé. Il répond sous 24 h, en français.
        </SectionHead>

        <div className="grid items-start gap-[clamp(1.75rem,4vw,2.5rem)] lg:grid-cols-[1.05fr_0.95fr]">
          {/* ---------- Colonne gauche : les choix ---------- */}
          <div className="rounded border border-rule bg-surface p-[clamp(1.25rem,3.5vw,1.85rem)]">
            {/* La base de départ, si le voyageur en a choisi une. Elle
                s'affiche en tête : c'est le point d'ancrage de tout le reste. */}
            {trip.circuit && (
              <div className="mb-6 flex items-start gap-3 rounded border border-accent bg-tint/70 p-4">
                <Compass size={17} className="mt-1 shrink-0 text-accent" />
                <div className="flex-1">
                  <p className="label text-eyebrow">Ma base de départ</p>
                  <p className="mt-1 font-semibold">
                    {trip.circuit.nom} · {trip.circuit.jours} jours
                  </p>
                  <p className="text-sm text-soft">
                    {trip.circuit.temperament} — {trip.circuit.prixPers} par
                    personne. À déformer autant que vous voulez.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => trip.setBaseCircuit(null)}
                  className="grid place-items-center rounded-sm p-1 text-faint transition-colors hover:text-eyebrow"
                  aria-label="Repartir de zéro"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <p className="label mb-4 font-sans font-bold tracking-[0.06em] text-faint">
              1 — Vos envies{" "}
              <span className="text-eyebrow">({trip.count})</span>
            </p>

            <div className="mb-6 flex flex-col">
              {trip.activites.length === 0 ? (
                <p className="border-y border-dashed border-rule py-4 text-sm text-faint">
                  {trip.circuit
                    ? "Rien d'ajouté au circuit pour l'instant — envoyez tel quel, Agus vous proposera la suite."
                    : "Rien de coché pour l'instant — remontez choisir, ou envoyez votre demande telle quelle : Agus vous proposera un itinéraire complet."}
                </p>
              ) : (
                <AnimatePresence initial={false}>
                  {trip.activites.map((a, i) => (
                    <motion.div
                      key={a.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-rule py-3">
                        <span className="font-sans text-[0.6875rem] tabular-nums text-eyebrow">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold leading-snug">
                            {a.titre}
                          </span>
                          <span className="label text-faint">
                            {a.famille === "secret"
                              ? "Place secrète"
                              : "Classique"}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => trip.removeActivite(a.id)}
                          className="grid place-items-center rounded-sm p-1 text-faint transition-colors hover:text-eyebrow"
                          aria-label={`Retirer ${a.titre}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            <p className="label mb-4 font-sans font-bold tracking-[0.06em] text-faint">
              2 — Votre voyage
            </p>

            <div className="grid gap-4.5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="label text-soft" htmlFor="month">
                  Mois de départ
                </label>
                <select
                  id="month"
                  className="field-input"
                  value={trip.month}
                  onChange={(e) => trip.setField("month", e.target.value)}
                >
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="label text-soft" htmlFor="duration">
                  Durée estimée
                </label>
                <select
                  id="duration"
                  className="field-input"
                  value={trip.duration}
                  onChange={(e) => trip.setField("duration", e.target.value)}
                >
                  {DURATIONS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <Counter
                label="Adultes"
                field="adults"
                value={trip.adults}
                onStep={trip.stepTraveller}
              />
              <Counter
                label="Enfants"
                field="children"
                value={trip.children}
                onStep={trip.stepTraveller}
              />

              {/* Ce qui se passe à la période choisie. Les saisons sont
                  fiables ; les dates de cérémonies, non — on dit ce qu'on
                  sait et Agus confirme le reste. */}
              <div className="rounded border border-rule bg-tint/60 p-4 sm:col-span-2">
                <p className="label mb-2 flex items-center gap-2 text-tint-ink">
                  <CalendarDays size={14} />
                  {trip.month} · {period.saison}
                </p>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {period.notes.map((n) => (
                    <li key={n} className="text-sm leading-relaxed text-soft">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>

              <fieldset className="m-0 border-0 p-0 sm:col-span-2">
                <legend className="label mb-1.5 text-soft">
                  Style recherché
                </legend>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((s) => {
                    const on = trip.styles.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={on}
                        onClick={() => trip.toggleStyle(s)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          on
                            ? "border-accent bg-tint font-semibold text-tint-ink"
                            : "border-rule bg-surface hover:border-faint"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="label text-soft" htmlFor="name">
                  Votre prénom{" "}
                  <span className="font-sans normal-case tracking-normal text-faint">
                    (facultatif)
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="field-input"
                  placeholder="Ex. Camille"
                  autoComplete="given-name"
                  value={trip.name}
                  onChange={(e) => trip.setField("name", e.target.value.trimStart())}
                />
              </div>
            </div>
          </div>

          {/* ---------- Colonne droite : le message ---------- */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-[92px]">
            {/* Partir en paix : le site taisait qu'Agus peut réserver les
                hôtels. C'est une réassurance majeure, elle a sa place ici,
                juste avant l'envoi. */}
            <div className="rounded border border-rule bg-surface p-5">
              <p className="font-display text-lg leading-tight">
                {HEBERGEMENT.titre}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-soft">
                {HEBERGEMENT.texte}
              </p>
            </div>
            <p className="label font-sans font-bold tracking-[0.06em] text-faint">
              3 — Votre message, prêt à envoyer
            </p>

            {/* Fond réglé comme une page de carnet */}
            <div className="rounded border border-rule bg-surface bg-[linear-gradient(to_bottom,transparent_27px,color-mix(in_srgb,var(--rule)_60%,transparent)_27px,transparent_28px)] bg-[length:100%_28px] px-5 pb-6 pt-5">
              <div className="mb-3.5 flex items-center gap-2.5 text-faint">
                <MessageSquare size={15} strokeWidth={1.7} />
                <span className="label">
                  Aperçu — WhatsApp · {WHATSAPP_DISPLAY}
                </span>
              </div>
              <pre className="m-0 max-h-[340px] overflow-y-auto whitespace-pre-wrap break-words font-sans text-sm leading-[28px]">
                {message}
              </pre>
            </div>

            <a
              className="btn btn-wa btn-lg w-full"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send size={18} />
              Envoyer ma demande à Agus
            </a>
            <p className="text-center text-[0.6875rem] text-faint">
              Ouvre WhatsApp avec le message pré-rempli. Vous relisez avant
              d&apos;envoyer — aucun engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
