import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Le gabarit des pages légales.
 *
 * Colonne unique, pas d'illustration, pas d'apparition au défilement :
 * on ne met pas d'effet sur un texte qu'on lit pour se rassurer. La
 * seule chose qui compte ici est de trouver vite ce qu'on cherche —
 * d'où le sommaire ancré, et des titres numérotés.
 */

/* Le marqueur de champ manquant a déménagé dans son propre fichier : le
   portrait d'Agus s'en sert aussi, et il n'avait pas à importer le
   gabarit des CGV pour ça. Réexporté ici — les pages légales
   l'importent depuis ce module depuis le début. */
export { AComplete, Valeur } from "./AComplete";

/* Le décalage des ancres sous la barre collante vient de la règle `[id]`
   de globals.css — ne pas ajouter de `scroll-mt` ici, les deux
   s'additionneraient et les articles atterriraient trop bas. */
export function Article({ n, titre, children }) {
  const id = `art-${n}`;
  return (
    <section className="mt-10" id={id}>
      <h2 className="flex gap-3 text-[1.25rem] leading-snug">
        <span className="font-sans text-base font-bold tabular-nums text-eyebrow">
          {n}.
        </span>
        {titre}
      </h2>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </section>
  );
}

export default function PageLegale({ titre, chapo, articles, children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="shell pt-[clamp(5.5rem,12vw,7rem)]">
          <Link
            href="/"
            className="label inline-flex min-h-11 items-center gap-2 text-accent no-underline"
          >
            <ArrowLeft size={14} />
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="ground-ivoire band pt-[clamp(1.5rem,4vw,2.5rem)]">
          <div className="shell">
            <div className="max-w-[74ch]">
              <h1 className="text-[clamp(1.9rem,5.2vw,2.375rem)]">{titre}</h1>
              {chapo && (
                <p className="mt-4 text-lg leading-relaxed text-soft">{chapo}</p>
              )}

              {/* Ce bandeau disparaît quand tous les champs sont remplis
                  et que les barèmes sont validés. Tant qu'il est là, la
                  page n'est pas opposable. */}
              <div className="mt-8 flex items-start gap-3.5 rounded-[14px] border border-eyebrow bg-[color-mix(in_srgb,var(--bougain)_10%,transparent)] p-5">
                <AlertTriangle
                  size={19}
                  className="mt-0.5 shrink-0 text-eyebrow"
                  strokeWidth={1.8}
                />
                <p className="text-sm leading-relaxed">
                  <b>Document de travail — ne pas mettre en ligne en l&apos;état.</b>{" "}
                  Les mentions signalées en rouge doivent être renseignées, et
                  l&apos;ensemble relu par un professionnel du droit français du
                  tourisme. Les points à faire trancher sont listés dans le
                  README du projet.
                </p>
              </div>

              {articles?.length > 0 && (
                <nav
                  className="mt-8 border-y border-rule py-2"
                  aria-label="Sommaire"
                >
                  <ol className="m-0 grid list-none gap-x-8 gap-y-0 p-0 sm:grid-cols-2">
                    {articles.map(([n, t]) => (
                      <li key={n}>
                        <a
                          href={`#art-${n}`}
                          className="flex min-h-11 items-center gap-2.5 text-sm text-accent no-underline hover:text-ink"
                        >
                          <span className="font-sans text-[0.6875rem] tabular-nums text-faint">
                            {String(n).padStart(2, "0")}
                          </span>
                          {t}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="texte-legal">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
