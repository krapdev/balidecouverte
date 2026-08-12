"use client";

import Separateur from "@/components/Separateur";
import Suite from "@/components/Suite";
import Link from "next/link";
import { useState } from "react";
import { Images, Route } from "lucide-react";
import { JepunPuce } from "./Scene";
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
 * **Deux gestes, deux zones.** Le grand : toute la carte ouvre le plein
 * écran — récit complet et défilé de photos. Le petit : un « + » net à
 * droite ajoute l'activité à la demande. C'est l'inverse de la version
 * précédente, où la vignette ouvrait et le texte cochait : on découvre
 * bien plus souvent qu'on ne sélectionne, donc le geste fréquent prend
 * la grande surface.
 *
 * On nomme et on donne envie, on ne publie ni adresse ni chemin.
 *
 * ⚠️ **Ce bloc a quitté l'accueil pour `/envies`.** Il faisait trois
 * écrans et demi de mobile juste sous une fourche qui prétendait faire
 * choisir entre lui et le circuit. Il est désormais la page entière, et
 * son en-tête passe donc en `h1` — c'est le titre du document, plus une
 * section parmi d'autres.
 */
export default function Activites({ niveau = 2 }) {
  /* ⚠️ **Le titre de famille se déduit du niveau de l'en-tête, il ne
     s'écrit pas en dur.** Il était figé en `h3` : sur /envies, où
     l'en-tête passe en `h1` parce que la page est devenue la page
     entière, le plan sautait donc de h1 à h3. Un saut de niveau n'est
     pas une faute de style — c'est le plan du document, et c'est ce que
     lit un lecteur d'écran qui navigue de titre en titre. Relevé par
     Lighthouse ET par le contrôle maison, tous deux sur /envies. */
  const TitreFamille = `h${niveau + 1}`;
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
          title="Cochez, j&apos;en fais un itinéraire."
          niveau={niveau}
          rouge
        >
          Rien ici n&apos;est une commande. Ce que vous cochez part dans votre
          message, et je construis le circuit autour — c&apos;est mon métier de
          savoir ce qui s&apos;enchaîne bien et ce qui se dilue.
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
              {/* La couture ouvre la seconde famille — « Les places
                  secrètes » — et pas la première, qui suit déjà le
                  chapô. Voir components/Separateur.jsx : une couture
                  appartient à ce qu'elle introduit. */}
              {fi > 0 && <Separateur className="mb-10" />}
              <Reveal>
                {/* Pas de `border-t` : la couture bougainvillier qui précède EST la
             séparation. Les deux ensemble donnaient un filet rose, un blanc,
             puis un filet gris — on lisait un accident, pas un motif. */}
                <div
                  className={`mb-6 pt-5 ${fi ? "" : "border-t border-rule"}`}
                >
                  <TitreFamille className="font-display text-[1.5rem] leading-tight">
                    {f.titre}
                  </TitreFamille>
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
                        className={`flex h-full items-stretch gap-1 overflow-hidden rounded-[14px] border p-2.5 transition-colors duration-200 ${
                          on
                            ? "border-accent bg-tint"
                            : "border-rule bg-surface hover:border-[color-mix(in_srgb,var(--bambou)_40%,var(--rule))]"
                        }`}
                      >
                        {/* Toute la carte ouvre le détail : c'est le geste
                            qu'on fait le plus souvent. */}
                        <button
                          type="button"
                          onClick={() => {
                            setOuverte(a);
                            setPhoto(0);
                          }}
                          className="flex flex-1 cursor-pointer items-stretch gap-3 text-left"
                          aria-label={`Voir ${a.titre} en détail`}
                        >
                          {a.photos?.length > 0 && (
                            <span className="relative block shrink-0 self-start">
                              <Photo
                                src={a.photos[0].src}
                                alt={a.photos[0].alt}
                                scene={a.photos[0].scene}
                                uid={`act-${a.id}`}
                                ratio="aspect-square"
                                className="w-[84px] rounded-[10px] sm:w-[96px]"
                              />
                              <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-immersive-deep px-2 py-0.5 text-xs text-on-immersive">
                                <Images size={10} strokeWidth={2} />
                                {a.photos.length}
                              </span>
                            </span>
                          )}
                          <span className="min-w-0 flex-1 py-1.5">
                            <span className="block font-display text-[1.0625rem] leading-tight">
                              {a.titre}
                            </span>
                            {/* Trois lignes : le texte se cale sur la
                                hauteur de la vignette, toutes les cartes
                                font la même taille. */}
                            <span className="mt-1 line-clamp-3 text-[0.8125rem] leading-relaxed text-soft">
                              {a.texte}
                            </span>
                          </span>
                        </button>

                        {/* Le « + » : petite surface, geste rare, mais
                            franchement visible — c'est lui qui construit
                            la demande. */}
                        <button
                          type="button"
                          onClick={() => toggleActivite(a.id)}
                          aria-pressed={on}
                          aria-label={
                            on
                              ? `Retirer ${a.titre} de ma demande`
                              : `Ajouter ${a.titre} à ma demande`
                          }
                          className={`grid h-11 w-11 shrink-0 cursor-pointer self-center place-items-center rounded-full border-2 transition-colors duration-200 ${
                            on
                              ? "border-pousse bg-pousse text-page"
                              : "border-pousse bg-pousse-pale text-pousse hover:bg-[color-mix(in_srgb,var(--pousse)_18%,var(--pousse-pale))]"
                          }`}
                        >
                          <JepunPuce size={20} plein={on} />
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

        {/* ⚠️ **La sortie ne dépend plus d'avoir coché.** Elle était
            sous `count > 0`, et la page se terminait donc sur rien pour
            qui parcourt la liste sans rien cocher — c'est-à-dire pour
            qui lit d'abord et choisit ensuite, soit le cas ordinaire.
            Le bouton d'envoi reste conditionnel : proposer « préparer ma
            demande » avec une sélection vide serait un mensonge. C'est
            la *suite* qui devient inconditionnelle, en changeant de
            destination selon l'état.

            `/#sur-mesure` et non `#sur-mesure` : depuis /envies, une
            ancre nue ne mène nulle part. La sélection, elle, survit — le
            magasin vit dans le gabarit (layout.js). */}
        <Separateur className="mt-[clamp(2.5rem,7vw,3.5rem)]" />

        {count > 0 ? (
          <Reveal>
            <p className="mt-8">
              <Link className="btn btn-accent btn-lg" href="/#sur-mesure">
                {count} envie{count > 1 ? "s" : ""} — préparer ma demande
              </Link>
            </p>
          </Reveal>
        ) : (
          <Reveal>
            <Suite
              className="mt-[clamp(2.5rem,7vw,3.5rem)]"
              titre="Rien ne vous saute aux yeux ?"
              principal={{
                href: "/circuit",
                label: "Le circuit, jour par jour",
                icone: <Route size={17} />,
              }}
              secondaire={{ href: "/#sur-mesure", label: "Ou m'écrire directement" }}
            >
              Cochez ce qui vous attire et j&apos;en fais un itinéraire — mais
              rien ne vous y oblige. Quinze jours déjà construits vous
              diront peut-être mieux ce dont vous avez envie qu&apos;une
              liste à trier.
            </Suite>
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
