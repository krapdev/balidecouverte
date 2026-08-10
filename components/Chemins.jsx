import { Symbole } from "./Symboles";
import Link from "next/link";
import { Route, Sparkles, ArrowRight } from "lucide-react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { CHEMINS, ACTIVITES } from "@/lib/data";

/* Le symbole balinais de chaque branche, repris de `lib/navigation.js` :
   la carte et l'entrée de menu qui y mène portent le même dessin. */
const SYMBOLES_CHEMIN = { circuit: "penjor", envies: "tedung" };

const ICONES = { circuit: Route, envies: Sparkles };

/**
 * La fourche — et, depuis peu, **la seule chose qui reste sur l'accueil**
 * du circuit et des envies.
 *
 * Elle proposait deux façons d'entrer dans la conversation… et les
 * déroulait toutes les deux immédiatement en dessous. Une fourche qui ne
 * coupe rien n'est pas une fourche : c'était un sommaire décoratif posé
 * au-dessus de son propre contenu, et cinq écrans et demi de mobile.
 * Chaque carte mène désormais à sa page.
 *
 * ⚠️ **Ce que ce déplacement exige en retour.** Quelqu'un qui descend
 * l'accueil sans cliquer ne verra plus jamais ni le circuit ni les
 * places secrètes — c'est-à-dire ni le travail d'Agus ni ce qui le
 * distingue d'une agence. Les cartes doivent donc **montrer, pas
 * annoncer** : trois chiffres, trois noms de lieux. Le jour où quelqu'un
 * les réduit à un titre et un bouton, on aura remplacé deux sections
 * riches par deux portes fermées.
 *
 * Les nombres d'activités sont **comptés**, pas écrits : une place
 * ajoutée à `ACTIVITES` doit se voir ici sans qu'on pense à mettre un
 * chiffre à jour.
 *
 * Ne jamais rajouter une troisième carte à côté : le voyageur ne saurait
 * plus laquelle l'engage.
 */
export default function Chemins() {
  const classiques = ACTIVITES.filter((a) => a.famille === "classique").length;
  const secrets = ACTIVITES.filter((a) => a.famille === "secret").length;
  const chiffresParId = {
    envies: [`${classiques} classiques`, `${secrets} places secrètes`],
  };

  return (
    <section id="chemins" className="ground-sable band">
      <div className="shell">
        {/* Le chapô disait : « Rien de ce que vous cochez ici n'est
            réservé. C'est la matière de votre premier message — de quoi
            que je sache qui vous êtes avant de vous répondre. » Il
            répondait à une question qu'on ne se pose pas encore (« est-ce
            que je m'engage ? ») sans jamais répondre à celle qu'on se
            pose (« entre quoi et quoi est-ce que je choisis ? »), et sa
            dernière proposition n'était même pas grammaticale.
            L'ordre est maintenant celui de la décision : **entre quoi on
            choisit, où ça mène, et seulement ensuite que rien n'engage.** */}
        <SectionHead eyebrow="Par où commencer" title="Deux façons de partir.">
          Partez de mon circuit — quinze jours que j&apos;ai déjà conduits des
          dizaines de fois — ou de vos envies, en cochant ce qui vous attire.
          Les deux mènent au même endroit : un message que vous m&apos;écrivez,
          et un voyage qu&apos;on ajuste ensemble. Rien ici n&apos;est réservé.
        </SectionHead>

        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2">
          {CHEMINS.map((c, i) => {
            const Icon = ICONES[c.id] ?? Route;
            const chiffres = c.chiffres ?? chiffresParId[c.id] ?? [];
            return (
              <Reveal as="li" key={c.id} delay={i * 0.06} className="h-full">
                <Link
                  href={c.ancre}
                  className="filigrane group relative flex h-full flex-col gap-2.5 overflow-hidden rounded-[16px] border border-rule bg-surface p-6 no-underline transition-colors duration-200 hover:border-accent"
                >
                  {/* ⚠️ **Le grand symbole, et non le petit filigrane de
                      coin.** Les deux cartes de la fourche sont le seul
                      endroit de la page où l'on choisit ; elles étaient
                      les plus nues. Le symbole reprend celui de l'entrée
                      de menu correspondante — penjor pour le circuit,
                      tedung pour les envies — et il est posé dans
                      l'angle, là où aucun texte ne passe. */}
                  <Symbole
                    nom={SYMBOLES_CHEMIN[c.id] ?? "candi"}
                    size={170}
                    strokeWidth={0.6}
                    className="pointer-events-none absolute -right-8 -top-10 text-accent opacity-[0.09]"
                  />
                  <Icon size={22} className="relative text-accent" strokeWidth={1.5} />
                  <h3 className="text-[1.375rem] leading-tight">{c.titre}</h3>

                  {/* Les chiffres avant le texte : ce sont eux qu'on lit
                      en balayant, et ce sont eux qui font choisir. */}
                  {chiffres.length > 0 && (
                    <p className="label flex flex-wrap gap-x-3 gap-y-1 text-eyebrow">
                      {chiffres.map((n) => (
                        <span key={n}>{n}</span>
                      ))}
                    </p>
                  )}

                  <p className="text-sm leading-relaxed text-soft">{c.texte}</p>

                  {/* Trois noms de lieux. C'est la moitié du travail de
                      cette carte : « voir les envies » ne donne envie de
                      rien, « le grand ficus de Munduk » si. */}
                  {c.apercu && (
                    <p className="mt-1 border-t border-rule pt-3 text-sm leading-relaxed text-ink">
                      {c.apercu}
                    </p>
                  )}

                  <span className="mt-auto flex min-h-11 items-center gap-2.5 pt-3 text-sm text-accent">
                    <span className="underline decoration-accent underline-offset-4">
                      {c.action}
                    </span>
                    <ArrowRight
                      size={18}
                      strokeWidth={2.2}
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
