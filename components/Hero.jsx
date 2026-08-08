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
            Bali loin des sentiers battus. Votre guide local{" "}
            <em className="italic text-soleil">francophone</em> privé.
          </h1>

          {/* La phrase disait : « Circuits 100 % sur-mesure, authenticité
              garantie et 0 intermédiaire. » Trois formules de brochure
              en une ligne — et « authenticité garantie » est exactement
              le genre de promesse qu'aucune agence n'a jamais tenue en
              la prononçant. Un chiffre rond ne prouve rien ; une liste
              de choses dont on est déchargé, si.
              Le registre visé : **détendez-vous, je m'occupe de tout**,
              et c'est un homme qui le dit, pas une centrale.

              ⚠️ **La chute a changé, et elle a changé d'argument.** Elle
              disait « c'est à moi que vous écrivez, pas à une agence » ;
              elle dit « je connais bien mon île ». On troque une
              *opposition* contre une *compétence* — et le hero y gagne,
              parce qu'opposer sans preuve, au premier écran, oblige le
              lecteur à croire sur parole quelqu'un qu'il ne connaît pas
              encore. La preuve existe désormais, mais elle est sur
              `/agus`, où il raconte son passage en agence.
              Conséquence à connaître : **le premier écran ne dit plus
              qu'il n'y a pas d'intermédiaire.** L'argument vit dans le
              panneau des valeurs, plus bas sur la même page, et en entier
              sur le portrait. Si le hero devait le redire un jour, ce
              serait la troisième fois. */}
          {/* ⚠️ **Le sous-titre a déménagé dans ce bloc**, il n'est pas
              en double. Poser une photo d'Agus sous un paragraphe qui
              parle déjà à la première personne, puis répéter le
              paragraphe à côté d'elle, aurait fait dire deux fois la
              même promesse à trois centimètres d'écart. Le visage et le
              texte se tiennent maintenant, et c'est plus court qu'avant.

              ⚠️ **Et c'est la deuxième fois que ce visage apparaît sur
              l'accueil** — la présentation, un écran plus bas, porte la
              même photo dans une arche plus grande. C'est assumé mais ce
              n'est pas gratuit : si la page devait maigrir, c'est ici que
              se pose la question, pas dans la présentation. */}
          <div
            style={cran(2)}
            className="monte flex items-center gap-4 sm:gap-5"
          >
            <span className="arch block w-[92px] shrink-0 bg-immersive-deep shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] sm:w-[116px]">
              <Photo
                src="/agus-portrait.jpg"
                sources={[
                  {
                    type: "image/webp",
                    srcSet:
                      "/agus-portrait-600.webp 600w, /agus-portrait.webp 840w",
                  },
                ]}
                sizes="(min-width: 640px) 116px, 92px"
                uid="agus-hero"
                ratio="aspect-[46/50]"
                priority
                alt="Agus Yudiarta sur une plage de galets de l'est de Bali"
                className="w-full"
              />
            </span>
            <p className="max-w-[46ch] text-lg leading-relaxed text-on-immersive-soft">
              Détendez-vous, je m&apos;occupe de tout : le véhicule, les
              horaires, les entrées, les bons jours pour chaque endroit. Je
              suis balinais et indépendant, je connais bien mon île.
            </p>
          </div>

          {/* La photo du pays, juste avant l'appel à l'action : on montre
              ce qu'on vend au moment exact où l'on demande de cliquer.
              `w-full` et non pleine largeur d'écran — elle reste dans la
              gouttière du `shell`, alignée sur le titre au-dessus. */}
          <div
            style={cran(3)}
            className="monte w-full overflow-hidden rounded-[16px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]"
          >
            <Photo
              src="/bali-rizieres.jpg"
              sources={[
                {
                  type: "image/webp",
                  srcSet:
                    "/bali-rizieres-640.webp 640w, /bali-rizieres-1000.webp 1000w, /bali-rizieres-1600.webp 1600w",
                },
              ]}
              sizes="(min-width: 1280px) 1136px, 92vw"
              uid="bali-hero"
              /* ⚠️ **Bandeau au-delà de `md`, et ce n'est pas cosmétique.**
                 En 16/9 sur toute la gouttière, la photo faisait 639 px
                 de haut à 1280 et poussait le hero à 1 449 px : le CTA
                 tombait très loin sous la ligne de flottaison. En 2,4/1
                 elle en fait 473 de moins, garde tout son sujet — c'est
                 un paysage horizontal, le ciel et l'herbe se rognent sans
                 rien perdre — et le hero redevient proportionné.
                 Sur mobile le 16/9 reste : la largeur y est si faible que
                 l'image serait une fente. */
              ratio="aspect-[16/9] md:aspect-[2.4/1]"
              alt="Rizières en terrasses et bale traditionnel sous les cocotiers, dans l'intérieur de Bali"
              className="w-full"
            />
          </div>

          <div style={cran(4)} className="monte flex flex-wrap gap-3">
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
