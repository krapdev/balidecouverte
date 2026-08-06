import Link from "next/link";
import { Symbole } from "./Symboles";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { TEMOIGNAGES_VEDETTE, LIVRE_OR } from "@/lib/temoignages";

/**
 * Trois témoignages, juste avant la demande.
 *
 * **Pourquoi ici et pas plus haut.** La preuve sociale travaille au
 * moment du doute, pas au moment de la curiosité. Le voyageur vient de
 * choisir ce qu'il veut voir et s'apprête à écrire à un inconnu à
 * 12 000 km : c'est là, et seulement là, qu'il a besoin de lire que
 * d'autres l'ont fait avant lui.
 *
 * **Trois, pas sept.** Sept blocs de texte d'affilée ne se lisent pas,
 * ils se survolent — et l'accueil fait déjà dix-sept écrans sur mobile.
 * Les trois retenus ne disent pas la même chose : l'un porte l'émotion,
 * l'autre l'organisation sans imprévu, le troisième une expérience rare.
 * Les sept entiers vivent sur `/livre-d-or`.
 *
 * **Les extraits sont tirés mot pour mot**, jamais résumés : une
 * citation entre guillemets qui ne figure pas telle quelle dans le texte
 * source est un faux, même bien intentionné.
 */
export default function Temoignages() {
  return (
    <section id="temoignages" className="ground-ivoire band">
      <div className="shell">
        <SectionHead eyebrow="Livre d'or" title={LIVRE_OR.titre}>
          {LIVRE_OR.chapo}
        </SectionHead>

        <ul className="m-0 grid list-none gap-4 p-0 lg:grid-cols-3">
          {TEMOIGNAGES_VEDETTE.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 0.06} className="h-full">
              <figure className="m-0 flex h-full flex-col rounded-[14px] border border-rule bg-surface p-[clamp(1.25rem,4vw,1.6rem)]">
                <Symbole
                  nom="padma"
                  size={26}
                  className="mb-4 shrink-0 text-accent"
                />
                <blockquote className="m-0 flex-1 font-display text-[1.15rem] leading-snug text-pretty">
                  « {t.extrait} »
                </blockquote>
                <figcaption className="mt-5 border-t border-rule pt-3.5">
                  <span className="block font-semibold">{t.auteur}</span>
                  <span className="label block text-faint">
                    {t.pays} · {t.quand}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.14}>
          <p className="mt-8">
            {/* `?de=temoignages` : le retour du livre d'or ramène ici, et
                non en haut de l'accueil — même mécanique que les tarifs,
                voir lib/retours.js. Depuis le pied de page, où il n'y a
                pas de provenance à mémoriser, le lien reste nu. */}
            <Link
              className="btn btn-outline text-accent"
              href="/livre-d-or?de=temoignages"
            >
              {/* La porte, pas la flèche : ce bouton change de page.
                  C'est la grammaire posée dans LienPage.jsx. */}
              <Symbole nom="porte" size={17} strokeWidth={1.6} />
              Lire les {LIVRE_OR.nombre} témoignages
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
