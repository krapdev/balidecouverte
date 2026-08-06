import { Symbole } from "./Symboles";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { USAGES } from "@/lib/data";

/**
 * Les usages balinais, juste avant la demande.
 *
 * **Pourquoi ici.** On vient de choisir ce qu'on veut voir ; il reste à
 * donner envie du pays lui-même, et pas seulement de ses sites. C'est
 * aussi le seul endroit où ce bloc travaille pour la conversion : ce
 * qu'il montre — le nœud du selendang, les dates de Galungan, la
 * préparation de Nyepi — ce sont exactement des choses qu'un guide
 * règle et qu'une agence oublie. La culture sert ici de preuve.
 *
 * **Pourquoi une bande pleine.** C'est la seule pause de la page : on a
 * fini de choisir, on n'a pas encore commencé à demander. Le fond
 * bambou fait chapitre, et le trait des symboles y respire mieux que
 * sur un fond clair — un dessin fin sur ivoire s'efface, sur vert
 * profond il tient.
 *
 * **Pourquoi si court.** La page fait déjà quinze écrans sur mobile.
 * Une rangée par usage, jamais deux colonnes de texte sous `lg` : à
 * 390 px, deux colonnes donnent des mots coupés, et un pavé de six
 * paragraphes ne se lit pas.
 */
export default function Usages() {
  return (
    <section id="usages" className="ground-bambou band">
      <div className="shell">
        <SectionHead eyebrow="Us et coutumes" title={USAGES.titre} onImmersive>
          {USAGES.chapo}
        </SectionHead>

        <ul className="m-0 grid list-none gap-x-[clamp(2rem,5vw,3.5rem)] gap-y-0 p-0 lg:grid-cols-2">
          {USAGES.liste.map((u, i) => (
            <Reveal as="li" key={u.titre} delay={(i % 2) * 0.05}>
              {/* Le symbole était dans une gouttière de gauche, et la
                  gouttière coûtait 46 px de colonne à chacun des six
                  paragraphes — soit, à 390 px, une ligne de plus par
                  usage. Il est passé sur la ligne du titre : le texte
                  récupère toute la largeur, la rangée perd une ligne, et
                  le dessin reste au même endroit dans l'œil puisqu'un
                  titre commence là où commençait le symbole. */}
              <div className="h-full border-t border-[color-mix(in_srgb,var(--on-immersive)_24%,transparent)] py-4">
                <h3 className="flex items-center gap-3 font-display text-[1.15rem] leading-snug">
                  <Symbole
                    nom={u.symbole}
                    size={26}
                    className="shrink-0 text-soleil"
                  />
                  {u.titre}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-on-immersive-soft">
                  {u.texte}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
