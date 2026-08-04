import { Route, Sparkles, ArrowRight } from "lucide-react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { CHEMINS } from "@/lib/data";

const ICONES = { circuit: Route, envies: Sparkles };

/**
 * La fourche, posée avant tout le reste.
 *
 * Elle ne propose pas deux produits mais **deux façons d'entrer dans la
 * conversation** : partir du circuit qu'Agus a déjà conduit, ou partir de
 * ce qui donne envie. Les deux mènent au même endroit — un sur-mesure et
 * un message.
 *
 * Ne jamais rajouter une seconde fourche à côté : le voyageur ne saurait
 * plus laquelle l'engage.
 */
export default function Chemins() {
  return (
    <section id="chemins" className="ground-sable band">
      <div className="shell">
        <SectionHead eyebrow="Par où commencer" title="Deux façons de partir.">
          Rien de ce que vous cochez ici n&apos;est réservé. C&apos;est la
          matière de votre premier message — de quoi que je sache qui vous êtes
          avant de vous répondre.
        </SectionHead>

        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2">
          {CHEMINS.map((c, i) => {
            const Icon = ICONES[c.id] ?? Route;
            return (
              <Reveal as="li" key={c.id} delay={i * 0.06} className="h-full">
                <a
                  href={c.ancre}
                  className="filigrane relative flex h-full flex-col gap-2.5 overflow-hidden rounded-[16px] border border-rule bg-surface p-6 no-underline transition-colors duration-200 hover:border-accent"
                >
                  <Icon size={22} className="text-accent" strokeWidth={1.5} />
                  <h3 className="text-[1.375rem] leading-tight">{c.titre}</h3>
                  <p className="text-sm leading-relaxed text-soft">{c.texte}</p>
                  <p className="label mt-1 text-faint">{c.detail}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm text-accent">
                    {c.action}
                    <ArrowRight size={15} />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
