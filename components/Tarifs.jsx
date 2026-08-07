import { Check, X, Ship, Route, Compass, Car, Moon, CalendarDays } from "lucide-react";
import { TARIFS, AGUS, CIRCUITS } from "@/lib/data";
import { Symbole } from "./Symboles";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

/**
 * La grille tarifaire du site actuel, reprise telle quelle — mais dite
 * autrement.
 *
 * Le reproche était juste : le détail n'était pas clair. Trois façons de
 * compter cohabitaient sans être annoncées (la journée au véhicule, le
 * forfait de circuit au voyageur, le forfait Nusa Penida), le lecteur
 * voyait « 80 € » et « 1 210 € » sur le même écran sans pouvoir les
 * rapprocher, et le supplément de nuitée — le seul poste qui fait monter
 * l'addition — dormait dans un « bon à savoir » en bas de page.
 *
 * L'ordre est désormais : **quelles formules existent → laquelle vous
 * concerne → combien ça fait, en toutes lettres → ce qui s'ajoute**.
 *
 * Sur mobile, la grille n'est plus un tableau qui défile latéralement.
 * Un tableau de prix qu'il faut pousser du doigt pour voir la seconde
 * colonne cache précisément l'information qu'on est venu chercher : en
 * dessous de `sm`, chaque saison devient une carte où les deux prix
 * sont côte à côte. Le `<table>` reste servi aux lecteurs d'écran et
 * réapparaît dès qu'il y a la place.
 */
export default function Tarifs() {
  return (
    <section id="tarifs" className="ground-ivoire band">
      <div className="shell">
        {/* niveau 1 : cette page n'a pas de hero, ce titre est son h1. */}
        <SectionHead eyebrow="Tarifs" title="Au jour, et par véhicule." niveau={1}>
          Vous ne payez pas par personne : vous payez ma journée et ma
          voiture. La même journée revient à 40 € par personne quand vous
          êtes deux, et à 20 € quand vous êtes cinq — c&apos;est ce qui rend
          le guide privé abordable en famille ou entre amis.
        </SectionHead>

        {/* ⚠️ **Le sommaire a été retiré d'ici.** Il listait « Les trois
            formules · Le prix de la journée · Ce qui est compris » —
            c'est-à-dire les trois titres qu'on voit en descendant, sur
            une page de sept écrans dont le premier tiers est déjà le
            premier de ces titres. Un sommaire n'aide que s'il annonce
            ce qu'on ne voit pas ; celui-ci annonçait ce qui arrivait
            trois centimètres plus bas.
            Les ancres `#formules`, `#grille` et `#compris` restent :
            elles servent aux liens entrants et se partagent. */}

        {/* ---------- 1. De quoi parle-t-on ---------- */}
        <Reveal>
          <h2 id="formules" className="text-xl">
            Trois façons de compter
          </h2>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-soft">
            Elles ne se mélangent pas, et c&apos;est la première chose à
            savoir avant de lire un chiffre.
          </p>
          <ul className="m-0 mt-6 grid list-none gap-3 p-0 lg:grid-cols-3">
            {TARIFS.formules.map((f) => (
              <li
                key={f.cle}
                className="flex flex-col gap-2 rounded-[14px] border border-rule bg-surface p-5"
              >
                <span className="label text-eyebrow">{f.titre}</span>
                <span className="font-display text-[1.15rem] leading-snug">
                  {f.resume}
                </span>
                <span className="text-sm leading-relaxed text-soft">
                  {f.texte}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---------- 2. La grille de la journée ---------- */}
        <Reveal>
          <div className="mt-14 flex items-start gap-4 border-t border-rule pt-8">
            <Symbole nom="tedung" size={38} className="mt-1 hidden shrink-0 text-accent sm:block" />
            <div>
              <h2 id="grille">La journée, par saison</h2>
              <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-soft">
                {TARIFS.grilleNote}
              </p>
            </div>
          </div>

          {/* Cartes sous 640 px, tableau au-dessus : voir l'en-tête. */}
          <ul className="m-0 mt-6 grid list-none gap-3 p-0 sm:hidden">
            {TARIFS.saisons.map((s) => (
              <li
                key={s.nom}
                className="rounded-[14px] border border-rule bg-surface p-4"
              >
                <p className="font-display text-xl leading-tight">{s.nom}</p>
                <p className="mt-0.5 text-sm text-soft">{s.mois}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-rule pt-3">
                  {s.prix.map((p, i) => (
                    <p key={i}>
                      <span className="label block text-faint">
                        {TARIFS.colonnes[i]}
                      </span>
                      <span className="font-display text-[1.6rem] tabular-nums">
                        {p}
                      </span>
                      <span className="ml-1 text-sm text-soft">/ jour</span>
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 hidden sm:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Tarifs des excursions à la journée, par jour et par véhicule
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="label pb-3 pr-4 text-faint">
                    Saison
                  </th>
                  {TARIFS.colonnes.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="label pb-3 pr-4 text-right text-faint"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TARIFS.saisons.map((s) => (
                  <tr key={s.nom} className="border-t border-rule">
                    <th scope="row" className="py-5 pr-4 font-normal">
                      <span className="block font-display text-xl">{s.nom}</span>
                      <span className="text-sm text-soft">{s.mois}</span>
                    </th>
                    {s.prix.map((p, i) => (
                      <td
                        key={i}
                        className="py-5 pr-4 text-right align-middle font-display text-[1.75rem] tabular-nums"
                      >
                        {p}
                        <span className="ml-1 font-sans text-sm text-soft">
                          / jour
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-soft">{TARIFS.auDela}</p>
        </Reveal>

        {/* ---------- 3. Le calcul, en toutes lettres ---------- */}
        <Reveal delay={0.06}>
          <div className="mt-8 rounded-[14px] border border-accent bg-pousse-pale p-[clamp(1.25rem,4vw,1.75rem)]">
            <p className="label mb-4 text-accent">{TARIFS.exemple.titre}</p>
            <dl className="m-0 grid gap-0">
              {TARIFS.exemple.lignes.map(([quoi, combien], i) => (
                <div
                  key={quoi}
                  className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2.5 ${
                    i ? "border-t border-[color-mix(in_srgb,var(--accent)_22%,transparent)]" : ""
                  }`}
                >
                  <dt
                    className={`text-sm leading-snug ${
                      combien ? "" : "font-semibold"
                    }`}
                  >
                    {quoi}
                  </dt>
                  {combien && (
                    <dd
                      /* Le total en gros, le prix par personne en
                         accent : l'un est ce qu'on paie, l'autre est ce
                         qui décide. */
                      className={`m-0 font-display tabular-nums ${
                        i === TARIFS.exemple.lignes.length - 2
                          ? "text-[1.6rem] text-accent"
                          : i === TARIFS.exemple.lignes.length - 1
                            ? "text-xl text-accent"
                            : "text-lg"
                      }`}
                    >
                      {combien}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              {TARIFS.exemple.chute}
            </p>
          </div>
        </Reveal>

        {/* ---------- 4. Ce qui s'ajoute ---------- */}
        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-col gap-4 rounded-[14px] border border-rule bg-tint p-[clamp(1.25rem,4vw,1.75rem)] sm:flex-row sm:items-start sm:gap-6">
            <Moon size={20} className="shrink-0 text-tint-ink" strokeWidth={1.6} />
            <div className="flex-1">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-xl leading-tight">
                  {TARIFS.supplement.titre}
                </span>
                <span className="font-display text-xl text-tint-ink tabular-nums">
                  {TARIFS.supplement.montant}
                </span>
              </p>
              <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-soft">
                {TARIFS.supplement.texte}
              </p>
              <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0">
                {TARIFS.supplement.regions.map((r) => (
                  <li key={r} className="text-sm leading-snug">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ---------- 5. Compris / à régler sur place ---------- */}
        <div className="mt-14 grid gap-8 border-t border-rule pt-8 sm:grid-cols-2">
          <Reveal delay={0.06}>
            <h2 id="compris" className="mb-4 text-xl">
              Compris dans la journée
            </h2>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {TARIFS.inclus.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed">
                  <Check
                    size={17}
                    className="mt-1 shrink-0 text-accent"
                    strokeWidth={2}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="mb-4 text-xl">À régler sur place</h2>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {TARIFS.exclus.map((t) => (
                <li
                  key={t}
                  className="flex gap-3 text-sm leading-relaxed text-soft"
                >
                  <X size={17} className="mt-1 shrink-0 text-faint" strokeWidth={2} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---------- 6. Les deux autres formules, et le véhicule ---------- */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex items-start gap-4 border-t border-rule pt-8">
            <Symbole nom="gong" size={38} className="mt-1 hidden shrink-0 text-accent sm:block" />
            <h2 id="savoir">Les deux autres formules</h2>
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            <div className="rounded-[14px] border border-rule bg-surface p-5">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <Route size={16} className="shrink-0 text-accent" />
                <span className="font-display text-lg">En circuit</span>
                <span className="font-display text-lg text-accent tabular-nums">
                  {CIRCUITS[0].prixPers} / personne
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-soft">
                {TARIFS.circuits} Le circuit Bali de {CIRCUITS[0].jours} jours
                revient à ce prix-là, tout compris hors hôtel et repas.
              </p>
            </div>

            <div className="rounded-[14px] border border-rule bg-surface p-5">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <Ship size={16} className="shrink-0 text-accent" />
                <span className="font-display text-lg">Nusa Penida</span>
                <span className="font-display text-lg text-accent tabular-nums">
                  {TARIFS.nusaPenida.montant}
                </span>
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-soft">
                <CalendarDays size={14} className="shrink-0" />
                {TARIFS.nusaPenida.periode}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-soft">
                {TARIFS.nusaPenida.texte}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-x-8 gap-y-5 rounded-[14px] border border-rule bg-surface-alt p-[clamp(1.25rem,4vw,1.75rem)]">
            <div>
              <p className="label mb-2.5 text-eyebrow">
                Le véhicule, selon le nombre
              </p>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {AGUS.vehicules.map((v) => (
                  <li key={v} className="flex gap-3 text-sm leading-relaxed">
                    <Car size={16} className="mt-1 shrink-0 text-accent" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex gap-3 border-t border-rule pt-4 text-sm leading-relaxed text-soft">
              <Compass size={16} className="mt-1 shrink-0 text-accent" />
              {TARIFS.ailleurs}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
