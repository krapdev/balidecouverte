"use client";

import { useState } from "react";
import { Check, Plus, Images } from "lucide-react";
import Photo from "./Photo";
import Lightbox from "./Lightbox";
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
 * **Même carte pour les deux familles.** Seule la rubrique change : deux
 * gabarits auraient laissé croire que les classiques comptent moins,
 * alors qu'elles sont souvent ce qui décide du voyage.
 *
 * La carte est compacte et sert à choisir — vignette, titre, trois
 * lignes calées sur la hauteur de l'image. Le développement vit dans le
 * plein écran : c'est là qu'on lit le récit et qu'on fait défiler les
 * photos. On nomme et on donne envie, on ne publie ni adresse ni chemin.
 */
export default function Activites() {
  const { isActiviteSelected, toggleActivite, count } = useTrip();
  /* La visionneuse s'ouvre sur UNE place : `ouverte` porte la place,
     `photo` le rang de la vue à l'intérieur. Le swipe reste dedans. */
  const [ouverte, setOuverte] = useState(null);
  const [photo, setPhoto] = useState(0);

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
                      <article
                        className={`flex h-full items-stretch gap-3 overflow-hidden rounded-[14px] border p-2.5 transition-colors duration-200 ${
                          on
                            ? "border-accent bg-tint"
                            : "border-rule bg-surface hover:border-[color-mix(in_srgb,var(--jade)_40%,var(--rule))]"
                        }`}
                      >
                        {a.photos?.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setOuverte(a);
                              setPhoto(0);
                            }}
                            className="group relative block shrink-0 cursor-zoom-in self-start"
                            aria-label={`Voir ${a.titre} en grand`}
                          >
                            <Photo
                              src={a.photos[0].src}
                              alt={a.photos[0].alt}
                              scene={a.photos[0].scene}
                              uid={`act-${a.id}`}
                              ratio="aspect-square"
                              className="w-[84px] rounded-[10px] sm:w-[96px]"
                            />
                            <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-immersive-deep px-2 py-0.5 text-[0.625rem] text-on-immersive">
                              <Images size={10} strokeWidth={2} />
                              {a.photos.length}
                            </span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleActivite(a.id)}
                          aria-pressed={on}
                          className="flex flex-1 cursor-pointer items-start gap-3 p-1.5 text-left"
                        >
                          <span
                            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                              on
                                ? "border-accent bg-accent text-accent-ink"
                                : "border-rule text-faint"
                            }`}
                            aria-hidden="true"
                          >
                            {on ? (
                              <Check size={11} strokeWidth={3} />
                            ) : (
                              <Plus size={11} />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-[1.0625rem] leading-tight">
                              {a.titre}
                            </span>
                            {/* Trois lignes : le texte se cale sur la
                                hauteur de la vignette, toutes les cartes
                                font la même taille. La suite est dans le
                                plein écran. */}
                            <span className="mt-1 line-clamp-3 text-[0.8125rem] leading-relaxed text-soft">
                              {a.texte}
                            </span>
                          </span>
                        </button>
                      </article>
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

      <Lightbox
        place={ouverte}
        index={ouverte ? photo : null}
        onClose={() => setOuverte(null)}
        onIndex={setPhoto}
      />
    </section>
  );
}
