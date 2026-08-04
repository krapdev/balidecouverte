import { BadgeCheck } from "lucide-react";
import { JepunBranch } from "./Scene";
import Photo from "./Photo";
import { DESTINATIONS } from "@/lib/data";

/**
 * Le hero — et, depuis le retrait de la bibliothèque d'animation, un
 * **composant serveur**. Il n'avait besoin du client que pour sa
 * cascade d'entrée ; celle-ci est devenue une animation CSS
 * (`.monte`) dont le retard est posé en ligne, un cran par enfant.
 *
 * Différence assumée : l'animation part à l'affichage et non à
 * l'hydratation. Elle est donc **plus tôt**, ce qui est mieux — et elle
 * ne dépend plus du JavaScript.
 */
const cran = (n) => ({ animationDelay: `${0.05 + n * 0.09}s` });

export default function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-immersive-deep text-on-immersive"
      >
        <div className="absolute inset-0">
          <Photo
            scene="terraces"
            uid="hero"
            ratio="h-full"
            priority
            className="h-full w-full"
            alt="Rizières en terrasses de Sidemen au lever du jour"
          />
        </div>
        {/* Le voile garde le texte lisible ; le halo, lui, est la lumière
            de l'aube qui monte derrière la vallée. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--immersive-deep)_26%,transparent)_0%,color-mix(in_srgb,var(--immersive-deep)_78%,transparent)_14%,color-mix(in_srgb,var(--immersive-deep)_86%,transparent)_34%,var(--immersive-deep)_72%)]"
          aria-hidden="true"
        />
        <div
          className="glow left-[52%] top-[46%] h-[46vh] w-[46vh] opacity-70"
          style={{ "--glow-blur": "120px" }}
          aria-hidden="true"
        />

        <JepunBranch className="pointer-events-none absolute -top-4 right-0 z-[1] w-[min(52vw,440px)] opacity-90" />

        <div className="shell relative z-10 flex min-h-[min(88vh,780px)] flex-col items-start justify-end gap-6 pb-[clamp(3rem,9vw,5.5rem)] pt-[clamp(3.5rem,12vw,7rem)]">
          <p
            style={cran(0)}
            className="monte label flex items-center gap-3 text-on-immersive before:h-px before:w-8 before:bg-soleil before:content-['']"
          >
            Sidemen · Munduk · Est de Bali
          </p>

          <h1
            style={cran(1)}
            className="monte max-w-[15ch] text-[clamp(2.5rem,8.5vw,4.75rem)] tracking-[-0.03em]"
          >
            Bali loin des foules. Votre guide privé{" "}
            <em className="italic text-soleil">francophone</em> local.
          </h1>

          <p
            style={cran(2)}
            className="monte max-w-[46ch] text-lg leading-relaxed text-on-immersive-soft"
          >
            Circuits 100 % sur-mesure, authenticité garantie et 0 intermédiaire.
            Vous m&apos;écrivez directement — je suis guide balinais indépendant.
          </p>

          <div style={cran(3)} className="monte flex flex-wrap gap-3">
            <a className="btn btn-sun btn-lg" href="#sur-mesure">
              Créer mon voyage sur-mesure
            </a>
            <a
              className="btn btn-outline btn-lg text-on-immersive"
              href="#chemins"
            >
              Par où commencer
            </a>
          </div>

          <div
            style={cran(4)}
            className="monte mt-4 flex w-full flex-wrap items-center gap-3 border-t border-[color-mix(in_srgb,var(--on-immersive)_22%,transparent)] pt-5"
          >
            {/* Une note inventée ne vaut rien : on affiche ce qui est
                vérifiable — le diplôme et vingt ans de métier. */}
            <BadgeCheck size={18} className="shrink-0 text-soleil" strokeWidth={1.8} />
            <p className="text-sm text-on-immersive-soft">
              <b className="font-semibold text-on-immersive">
                Guide diplômé francophone
              </b>{" "}
              — professionnel depuis octobre 2005, membre d&apos;une union de
              guides de Bali.
            </p>
          </div>
        </div>
      </section>

      {/* Le fil des étapes — bandeau défilant */}
      <div
        className="overflow-hidden bg-immersive py-3 text-on-immersive-soft"
        aria-hidden="true"
      >
        <div className="flex w-max gap-12 motion-safe:animate-[drift_42s_linear_infinite]">
          {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
            <span key={i} className="label whitespace-nowrap">
              {d} <span className="text-soleil">◦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
