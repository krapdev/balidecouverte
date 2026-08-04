import { Check, X, Bed, Ship, Route, Compass, Car } from "lucide-react";
import { TARIFS, AGUS, CIRCUITS } from "@/lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

/**
 * La grille tarifaire du site actuel, reprise telle quelle.
 *
 * Le point important, et c'est ce que la maquette taisait jusqu'ici :
 * le prix est **par jour et par véhicule**, pas par personne. Deux ou
 * cinq voyageurs paient presque la même chose, ce qui est un argument
 * commercial fort — il fallait le montrer.
 */
export default function Tarifs() {
  return (
    <section id="tarifs" className="ground-ivoire band">
      <div className="shell">
        <SectionHead eyebrow="Tarifs" title="Au jour, et par véhicule.">
          Vous ne payez pas par personne : vous payez ma journée et ma
          voiture. À deux comme à cinq, le tarif bouge à peine — c&apos;est ce
          qui rend le guide privé abordable en famille ou entre amis.
        </SectionHead>

        {/* Trois blocs, trois ancres : on doit pouvoir aller droit à
            « ce qui est compris » sans relire la grille. */}
        <Reveal>
          <nav
            className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-rule py-3.5"
            aria-label="Sommaire des tarifs"
          >
            {[
              ["#grille", "La grille par saison"],
              ["#compris", "Ce qui est compris"],
              ["#savoir", "Bon à savoir"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                /* min-h-11 : liste de navigation, pas lien en pleine
                   phrase — l'exception « inline » de la WCAG 2.5.8 ne
                   s'applique pas ici. */
                className="label inline-flex min-h-11 items-center text-accent no-underline hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>
        </Reveal>

        <Reveal>
          <div id="grille" className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
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

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <Reveal delay={0.06}>
            <h3 id="compris" className="mb-4 text-xl">Compris dans le tarif</h3>
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
            <h3 className="mb-4 text-xl">À régler sur place</h3>
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

        <Reveal delay={0.16}>
          <div className="mt-10 grid gap-x-8 gap-y-5 rounded border border-rule bg-tint p-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p id="savoir" className="label mb-2 text-tint-ink">Bon à savoir</p>
            </div>

            <p className="flex gap-3 text-sm leading-relaxed">
              <Bed size={16} className="mt-1 shrink-0 text-tint-ink" />
              {TARIFS.supplement}
            </p>
            <p className="flex gap-3 text-sm leading-relaxed">
              <Ship size={16} className="mt-1 shrink-0 text-tint-ink" />
              {TARIFS.nusaPenida}
            </p>
            <p className="flex gap-3 text-sm leading-relaxed">
              <Route size={16} className="mt-1 shrink-0 text-tint-ink" />
              {TARIFS.circuits} Le circuit Bali de {CIRCUITS[0].jours} jours
              revient à {CIRCUITS[0].prixPers} par personne.
            </p>
            <p className="flex gap-3 text-sm leading-relaxed">
              <Compass size={16} className="mt-1 shrink-0 text-tint-ink" />
              {TARIFS.ailleurs}
            </p>

            <div className="sm:col-span-2">
              <p className="label mb-2.5 mt-2 text-tint-ink">
                Le véhicule, selon le nombre
              </p>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {AGUS.vehicules.map((v) => (
                  <li key={v} className="flex gap-3 text-sm leading-relaxed">
                    <Car size={16} className="mt-1 shrink-0 text-tint-ink" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
