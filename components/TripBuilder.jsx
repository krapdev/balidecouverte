"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  X,
  Minus,
  Plus,
  MessageSquare,
  CalendarDays,
  Compass,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { useTrip } from "@/lib/trip-store";
import { buildMessage, buildSubject, mailtoUrl } from "@/lib/message";
import {
  DURATIONS,
  HEBERGEMENT,
  STYLES,
  CONTACT,
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
          className="grid h-11 w-11 shrink-0 place-items-center rounded border border-rule bg-surface text-soft transition-colors hover:border-bougain-ink hover:text-bougain-ink"
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
          className="grid h-11 w-11 shrink-0 place-items-center rounded border border-rule bg-surface text-soft transition-colors hover:border-bougain-ink hover:text-bougain-ink"
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
  const objet = buildSubject(trip);
  const href = mailtoUrl(trip, message);
  const [copie, setCopie] = useState(false);

  /* Repli pour les webmails : sans client mail configuré, un lien
     mailto: n'ouvre rien. Le presse-papiers sauve la demande. */
  async function copier() {
    try {
      await navigator.clipboard.writeText(`${objet}\n\n${message}`);
      setCopie(true);
      setTimeout(() => setCopie(false), 2400);
    } catch {
      /* Navigateur sans presse-papiers : le texte reste sélectionnable
         juste au-dessus, rien de cassé. */
    }
  }

  return (
    <section
      id="sur-mesure"
      /* Sable : la section précédente (le livre d'or) est ivoire.
         L'alternance de la page se lit dans app/page.js — deux fonds
         identiques qui se touchent forment un seul bloc interminable. */
      className="ground-sable band"
    >
      <div className="shell">
        <SectionHead eyebrow="Sur-Mesure" title="Construisez votre demande." rouge>
          Quelques questions, une case libre pour tout le reste, et votre
          e-mail m&apos;arrive déjà rédigé. Je
          réponds sous 24 h, en français — et c&apos;est ce fil-là qui devient
          votre devis.
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
                    personne. On l&apos;ajuste ensemble, autant que vous
                    voulez.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => trip.setBaseCircuit(null)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-sm text-faint transition-colors hover:text-bougain-ink"
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
              {/* « Remontez choisir » était vrai tant que les envies
                  vivaient sur cette page. Elles ont leur page : le texte
                  donne donc le lien, il ne désigne plus un endroit qui
                  n'existe plus. */}
              {trip.activites.length === 0 ? (
                <p className="border-y border-dashed border-rule py-4 text-sm text-faint">
                  {trip.circuit
                    ? "Rien d'ajouté au circuit pour l'instant — envoyez tel quel, je vous proposerai la suite."
                    : "Rien de coché pour l'instant. "}
                  {!trip.circuit && (
                    <Link
                      href="/envies"
                      className="whitespace-nowrap text-accent underline decoration-accent underline-offset-4"
                    >
                      Voir les envies
                    </Link>
                  )}
                  {!trip.circuit &&
                    " — ou envoyez votre demande telle quelle : je vous proposerai un itinéraire complet."}
                </p>
              ) : (
                /* L'ancienne version animait aussi la sortie d'une
                   ligne. Une transition CSS ne sait pas animer ce qu'on
                   retire de l'arbre : l'entrée reste animée, le retrait
                   est immédiat. C'est le seul recul du retrait de la
                   bibliothèque d'animation, et il ne se remarque pas —
                   on retire une ligne en sachant ce qu'on fait. */
                trip.activites.map((a, i) => (
                    <div key={a.id} className="monte overflow-hidden">
                      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-rule py-3">
                        <span className="font-sans text-xs tabular-nums text-eyebrow">
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
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-sm text-faint transition-colors hover:text-bougain-ink"
                          aria-label={`Retirer ${a.titre}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))
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
              {/* Resserré : c'est un encart d'information posé **au
                  milieu d'une saisie**, et à 390 px il faisait un tiers
                  d'écran entre deux champs. Le rembourrage descend, les
                  notes deviennent une vraie liste à puces — trois
                  paragraphes empilés se lisaient comme un texte, une
                  liste se balaye — et les textes eux-mêmes ont été
                  raccourcis dans lib/data.js. */}
              <div className="rounded border border-rule bg-tint/60 px-3.5 py-3 sm:col-span-2">
                <p className="label flex items-center gap-2 text-tint-ink">
                  <CalendarDays size={14} className="shrink-0" />
                  {trip.month} · {period.saison}
                </p>
                <ul className="m-0 mt-1.5 flex list-none flex-col gap-1 p-0">
                  {period.notes.map((n) => (
                    <li
                      key={n}
                      className="flex gap-2 text-sm leading-snug text-soft"
                    >
                      <span aria-hidden="true" className="text-tint-ink">
                        ·
                      </span>
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
                        className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
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

              {/* Prénom **et** nom : le message devient un devis, puis
                  une réservation, puis un nom sur un vol intérieur et
                  sur une fiche d'hôtel. Le demander ici évite un
                  aller-retour de mail, et `autocomplete="name"` le fait
                  remplir d'un tap sur mobile. Reste facultatif : rien
                  ici n'est un formulaire à valider. */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="label text-soft" htmlFor="name">
                  Vos prénom et nom{" "}
                  <span className="font-sans normal-case tracking-normal text-faint">
                    (facultatif)
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="field-input"
                  placeholder="Ex. Camille Rousseau"
                  autoComplete="name"
                  value={trip.name}
                  onChange={(e) => trip.setField("name", e.target.value.trimStart())}
                />
              </div>

              {/* ---------- Le champ libre ----------
                  Tout ce qui précède est fermé : des listes, des
                  compteurs, des cases. Un configurateur sans case vide
                  oblige le voyageur à faire entrer sa demande dans les
                  cases qu'on a prévues — et ce qui n'y entre pas se
                  perd. C'est pourtant là que se trouve presque toujours
                  ce qui fait le voyage.

                  L'exemple est donné au-dessus du champ et non en
                  substitut d'étiquette : un `placeholder` disparaît à
                  la frappe, et il ne faut pas qu'une consigne
                  s'efface au moment où on en a besoin. */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="label text-soft" htmlFor="note">
                  Ce que vous voulez me dire{" "}
                  <span className="font-sans normal-case tracking-normal text-faint">
                    (facultatif)
                  </span>
                </label>
                <p id="note-aide" className="text-sm leading-relaxed text-faint">
                  Un anniversaire à fêter, un genou qui ne fait plus les
                  marches, un bébé, un lieu vu quelque part dont vous ne
                  connaissez pas le nom, une question. C&apos;est ce que je
                  lis en premier.
                </p>
                <textarea
                  id="note"
                  rows={4}
                  className="field-input"
                  aria-describedby="note-aide"
                  /* Le message part par mailto:, et une URL trop longue
                     est tronquée par certains clients. 1200 caractères
                     laissent largement de quoi écrire sans risquer de
                     perdre la fin. */
                  maxLength={1200}
                  value={trip.note}
                  onChange={(e) => trip.setField("note", e.target.value.trimStart())}
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
              {/* `break-all` sur l'adresse : une adresse e-mail est un
                  mot insécable, et celle-ci fait à elle seule 349 px en
                  petites capitales espacées. Elle poussait la colonne du
                  configurateur hors de l'écran à 320 et 360 px — c'était
                  la seule cause du débordement horizontal restant. */}
              <div className="mb-3.5 flex items-start gap-2.5 text-faint">
                <MessageSquare size={15} strokeWidth={1.7} className="mt-0.5 shrink-0" />
                <span className="label min-w-0">
                  Aperçu — e-mail à{" "}
                  <span className="break-all">{CONTACT.email}</span>
                </span>
              </div>
              <p className="mb-3 border-b border-rule pb-3 text-sm">
                <span className="label text-faint">Objet</span>
                <br />
                <span className="font-semibold leading-[28px]">{objet}</span>
              </p>
              <pre className="m-0 max-h-[300px] overflow-y-auto whitespace-pre-wrap break-words font-sans text-sm leading-[28px]">
                {message}
              </pre>
            </div>

            <a className="btn btn-accent btn-lg w-full" href={href}>
              <Mail size={18} />
              Envoyer ma demande
            </a>

            <button
              type="button"
              onClick={copier}
              className="btn btn-outline w-full text-accent"
            >
              {copie ? <Check size={16} /> : <Copy size={16} />}
              {copie ? "Copié — collez-le dans votre messagerie" : "Copier le message"}
            </button>

            <p className="text-center text-xs leading-relaxed text-faint">
              Ouvre votre messagerie avec le message déjà rédigé. Vous relisez
              avant d&apos;envoyer — aucun engagement. Je réponds sous 24 h, et
              le devis se discute par retour de mail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
