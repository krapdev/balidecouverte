"use client";

import Link from "next/link";
import { MoonStar, Check, ArrowRight } from "lucide-react";
import Photo from "./Photo";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { CIRCUITS } from "@/lib/data";
import { TEMPS_FORTS } from "@/lib/circuit";
import { useTrip } from "@/lib/trip-store";

/**
 * Le chemin A — le circuit d'Agus, en résumé.
 *
 * **Résumé, et plus catalogue d'étapes.** La section listait les sept
 * lieux où l'on dort. C'est le squelette du circuit, ce n'est pas ce qui
 * donne envie d'y aller : « Ubud, 4 nuits » ne dit pas qu'on descend le
 * Batur à vélo le septième jour. Les temps forts disent ce qu'on **fait**,
 * la ligne des étapes garde le squelette en une seule ligne, et les
 * quinze journées détaillées vivent sur `/circuit`.
 *
 * Pourquoi le détail n'est pas ici, en dépliant : quinze journées font
 * huit écrans de défilement au milieu d'une page qui en fait déjà
 * dix-neuf. On ne le déplie pas non plus au clic — un dépliant de cette
 * taille casse la position de lecture de tous ceux qui le referment.
 *
 * Ce qui ne change pas : la section reste un **point d'entrée**, pas une
 * fiche produit. Le bouton n'achète rien, il déclare une base de départ.
 */
export default function Circuit() {
  const { baseCircuit, setBaseCircuit } = useTrip();
  const c = CIRCUITS[0];
  const base = baseCircuit === c.id;

  return (
    <section id="circuit" className="ground-ivoire band">
      <div className="shell">
        <SectionHead eyebrow="Mon circuit" title="Quinze jours, et tout Bali.">
          Ce n&apos;est pas un produit sur étagère : c&apos;est l&apos;itinéraire
          que j&apos;ai conduit des dizaines de fois, et que je connais assez
          bien pour le défaire. Prenez-le comme base — on garde ce qui vous
          plaît, on jette le reste.
        </SectionHead>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="overflow-hidden rounded-[18px] border border-rule">
              <Photo
                scene={c.scene}
                uid="circuit-bali"
                brief="une vue large du circuit — rizières de Sidemen ou de Jatiluwih"
                alt="Les rizières en terrasses traversées par le circuit"
                className="w-full"
              />
            </div>
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
              <span className="label flex flex-wrap gap-x-4 gap-y-1 text-faint">
                <span>{c.jours} jours</span>
                <span>{c.nuits} nuits</span>
                <span>{c.etapes.length} étapes</span>
              </span>
              <span className="text-right">
                <span className="block text-[0.6875rem] text-faint">
                  à partir de
                </span>
                <span className="block font-display text-[1.375rem] leading-tight tabular-nums">
                  {c.prixPers}
                </span>
                <span className="block text-[0.6875rem] text-faint">
                  par personne — hors hébergement
                </span>
              </span>
            </div>
            {/* Le squelette en une ligne. Il tenait sur sept lignes de
                liste ; à cet endroit on n'a besoin que de savoir que le
                circuit fait le tour de l'île. */}
            <p className="mt-4 border-t border-rule pt-4 text-sm leading-relaxed text-soft">
              <span className="label mb-1 block text-faint">L&apos;itinéraire</span>
              {c.etapes.map((e) => e.lieu).join(" · ")}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="label mb-4 text-eyebrow">Six journées sur quinze</p>
            {/* On montre ce qu'on **fait**, pas où l'on dort : c'est la
                différence entre un itinéraire et un voyage. Chaque ligne
                renvoie à un jour réel du programme, et le numéro le
                prouve — sans lui, ce serait une liste d'arguments. */}
            <ul className="m-0 flex list-none flex-col gap-0 p-0">
              {TEMPS_FORTS.map((t) => (
                <li
                  key={t.jour}
                  className="flex items-baseline gap-3.5 border-b border-rule py-2.5 last:border-0"
                >
                  <span className="label shrink-0 tabular-nums text-eyebrow">
                    J{t.jour}
                  </span>
                  <span className="text-sm leading-relaxed">{t.texte}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 flex gap-2.5 text-sm text-soft">
              <MoonStar size={15} className="mt-1 shrink-0 text-faint" />
              Hébergements à votre charge par défaut — mais je peux les
              choisir, vous les proposer et les réserver.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-rule pt-5">
              <button
                type="button"
                onClick={() => setBaseCircuit(base ? null : c.id)}
                className={`btn ${base ? "btn-outline text-accent" : "btn-accent"}`}
              >
                {/* « Commencer par » et non « partir de » : le verbe dit
                    qu'il y a une suite, et la suite est la conversation
                    avec Agus. « Partir de ce circuit » se lisait comme
                    le bouton d'achat d'un séjour. Le libellé une fois
                    choisi reste court — c'est un état, pas une phrase,
                    et il doit tenir sur une ligne à 320 px. */}
                {base ? (
                  <>
                    <Check size={15} /> C&apos;est ma base de départ
                  </>
                ) : (
                  "Commencer par ce circuit"
                )}
              </button>
              {/* `?de=circuit` : le retour ramènera ici, et non en haut
                  de l'accueil. */}
              <Link
                className="group flex min-h-11 items-center gap-1.5 text-sm text-accent no-underline"
                href="/circuit?de=circuit"
              >
                Les quinze journées en détail
                <ArrowRight
                  size={15}
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                className="flex min-h-11 items-center text-sm text-soft underline decoration-rule underline-offset-4 hover:text-ink"
                href="/tarifs?de=circuit"
              >
                Ce que comprend ce prix
              </Link>
            </div>

            {base && (
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Descendez cocher ce que vous voulez y ajouter — ou
                envoyez-le tel quel : on l&apos;ajustera ensemble par
                retour de mail.
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
