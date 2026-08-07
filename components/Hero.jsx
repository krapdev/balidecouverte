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

          {/* La phrase disait : « Circuits 100 % sur-mesure, authenticité
              garantie et 0 intermédiaire. » Trois formules de brochure
              en une ligne — et « authenticité garantie » est exactement
              le genre de promesse qu'aucune agence n'a jamais tenue en
              la prononçant. Un chiffre rond ne prouve rien ; une liste
              de choses dont on est déchargé, si.
              Le registre visé : **détendez-vous, je m'occupe de tout**,
              et c'est un homme qui le dit, pas une centrale. */}
          <p
            style={cran(2)}
            className="monte max-w-[46ch] text-lg leading-relaxed text-on-immersive-soft"
          >
            Détendez-vous, je m&apos;occupe de tout : le véhicule, les
            horaires, les entrées, les bons jours pour chaque endroit. Je suis
            balinais et indépendant — c&apos;est à moi que vous écrivez, pas à
            une agence.
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

          {/* ⚠️ **Le bandeau « Guide diplômé francophone — professionnel
              depuis octobre 2005, membre d'une union de guides de Bali »
              a été retiré d'ici**, et ce n'est pas une perte de
              réassurance : il faisait doublon avec la ligne « Ce qui se
              vérifie » de la présentation, à un écran et demi de là. Le
              diplôme s'y annonçait donc deux fois avant même qu'on ait
              lu quoi que ce soit sur Agus.
              La règle qui remplace la précédente (« une fois, au premier
              écran ») : **le hero vend ce qu'on va ressentir, la
              présentation donne ce qui se vérifie.** Ne pas remettre de
              preuve ici — ce serait redire, pas rassurer. */}
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
