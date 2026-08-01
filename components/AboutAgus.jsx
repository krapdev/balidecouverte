import { Leaf, Languages, Handshake } from "lucide-react";
import { PortraitAgus } from "./Scene";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const PILLARS = [
  {
    icon: Leaf,
    title: "100 % hors des sentiers battus",
    text: "Villages de l'est, canyons oubliés, plantations de Munduk. Jamais un site où l'on fait la queue.",
  },
  {
    icon: Languages,
    title: "Chauffeur & guide francophone",
    text: "Une seule personne du premier au dernier jour. Pas de traduction approximative, pas de relais.",
  },
  {
    icon: Handshake,
    title: "Tarifs en direct",
    text: "Aucune commission d'agence. Le devis que vous recevez est celui d'Agus, ligne par ligne.",
  },
];

export default function AboutAgus() {
  return (
    <section
      id="esprit"
      className="border-y border-rule bg-surface py-[clamp(3.5rem,10vw,6.5rem)]"
    >
      <div className="shell">
        <SectionHead eyebrow="L'Esprit" title="Un Balinais, pas une agence.">
          Derrière Bali Découverte, il n&apos;y a ni plateforme, ni centrale de
          réservation. Il y a Agus, né dans la vallée de Sidemen, qui parle
          français et connaît les gens chez qui vous déjeunerez.
        </SectionHead>

        <div className="grid items-start gap-[clamp(2rem,6vw,3.5rem)] md:grid-cols-[0.85fr_1.15fr]">
          <Reveal as="figure" className="m-0">
            <div className="overflow-hidden rounded-[3px] bg-immersive shadow-[0_18px_46px_-22px_rgba(15,36,24,0.55)]">
              <PortraitAgus className="aspect-[46/56] w-full" />
            </div>
            <figcaption className="mt-3.5 flex items-baseline justify-between gap-4 border-t border-rule pt-3 text-faint">
              <span className="label">Agus Yudiarta</span>
              <span className="label">08°27&apos;S 115°26&apos;E</span>
            </figcaption>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal>
              <blockquote className="border-l-2 border-accent pl-5 font-display text-[clamp(1.25rem,3.6vw,1.6rem)] italic leading-snug text-pretty">
                « Je ne vends pas un circuit. Je vous emmène là où j&apos;emmènerais
                un ami : chez ma tante à Sidemen, dans la cascade où j&apos;ai appris
                à nager. »
              </blockquote>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="max-w-[62ch] text-soft">
                J&apos;ai appris le français en accompagnant des voyageurs pendant
                dix ans, avant de devenir indépendant. Aujourd&apos;hui je conduis
                moi-même, je traduis moi-même, et je construis chaque itinéraire
                avec vous — au rythme de votre famille, pas de celui d&apos;un
                autocar.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-[62ch] text-soft">
                Passer en direct change tout : le prix que vous payez va aux
                familles qui vous accueillent, et vous gardez mon numéro pendant
                tout le séjour.
              </p>
              <p className="mt-4 font-display text-lg italic">— Agus</p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="grid list-none gap-px overflow-hidden rounded border border-rule bg-rule p-0 sm:grid-cols-3">
                {PILLARS.map(({ icon: Icon, title, text }) => (
                  <li
                    key={title}
                    className="flex flex-col gap-2.5 bg-page px-5 py-6"
                  >
                    <Icon size={22} className="text-accent" strokeWidth={1.6} />
                    <h3 className="font-sans text-base font-bold tracking-normal">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-soft">{text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
