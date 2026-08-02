import { Leaf, Flame, Handshake } from "lucide-react";
import { PortraitAgus, Canang, Jepun } from "./Scene";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

/**
 * Tri Hita Karana — les trois causes du bien-être, la philosophie qui
 * organise la vie balinaise. Elle recouvre presque exactement ce qu'Agus
 * a à dire, et lui donne une assise que trois puces marketing n'ont pas.
 */
const HARMONIES = [
  {
    nom: "Parahyangan",
    gloss: "l'harmonie avec le divin",
    icon: Flame,
    title: "Les portes s'ouvrent",
    text: "Agus est balinais et hindou. Il vous emmène aux cérémonies de son village et aux sources que les groupes ne voient jamais — parce qu'on l'y attend.",
  },
  {
    nom: "Pawongan",
    gloss: "l'harmonie avec les hommes",
    icon: Handshake,
    title: "En direct, sans agence",
    text: "Une seule personne du premier au dernier jour, en français ou en anglais. Aucune commission d'agence : ce que vous payez fait vivre le guide, le chauffeur et les familles qui vous accueillent.",
  },
  {
    nom: "Palemahan",
    gloss: "l'harmonie avec la nature",
    icon: Leaf,
    title: "Hors des sentiers battus",
    text: "Bali, Lombok, Java, Sumbawa, Flores, Komodo et Rinca — hors des sentiers battus. Des petits groupes, jamais un site où l'on fait la queue.",
  },
];

export default function AboutAgus() {
  return (
    <section
      id="esprit"
      className="ground-ivoire band"
    >
      <div className="shell">
        <SectionHead eyebrow="L'Esprit" title="Un Balinais, pas une agence.">
          Derrière Bali Découverte, il n&apos;y a ni plateforme, ni centrale de
          réservation. Il y a Agus Yudiarta, guide diplômé francophone,
          professionnel depuis octobre 2005, qui travaille avec d&apos;autres
          guides au sein d&apos;une union de guides de Bali. Il guide aussi en
          anglais, et connaît personnellement les gens chez qui vous déjeunerez.
        </SectionHead>

        <div className="grid items-start gap-[clamp(2rem,6vw,3.5rem)] md:grid-cols-[0.9fr_1.1fr]">
          <Reveal as="figure" className="m-0">
            <div className="arch bg-immersive-deep shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
              <PortraitAgus className="aspect-[46/58] w-full" />
            </div>
            <figcaption className="mt-3.5 border-t border-rule pt-3">
              <span className="flex items-baseline justify-between gap-4 text-faint">
                <span className="label">Agus Yudiarta</span>
                <span className="label">Denpasar · 08°39&apos;S 115°13&apos;E</span>
              </span>
              <span className="mt-2 flex items-start gap-3 text-sm leading-relaxed text-soft">
                <Jepun size={22} tone="var(--eyebrow)" className="mt-1 shrink-0" />
                <span>
                  La fleur glissée derrière l&apos;oreille est un <em>jepun</em>,
                  le frangipanier. On la porte au temple, on la dépose sur les
                  offrandes — elle revient tout au long de ce site.
                </span>
              </span>
            </figcaption>
          </Reveal>

          <div className="flex flex-col gap-6 md:mt-16">
            <Reveal>
              {/* Citation de travail : à remplacer par les mots d'Agus.
                  Les détails personnels inventés ont été retirés. */}
              <blockquote className="border-l-3 border-accent pl-5 text-[clamp(1.25rem,3.6vw,1.6rem)] italic leading-snug text-pretty">
                « Je ne vends pas un circuit. Je vous emmène là où j&apos;emmènerais
                un ami, et je vous explique ce que vous regardez. »
              </blockquote>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="max-w-[62ch] text-soft">
                J&apos;ai quarante ans, je suis marié, et père de deux filles de
                douze et neuf ans et d&apos;un garçon de cinq ans. Je guide en
                français depuis octobre 2005. Je conduis moi-même, je traduis
                moi-même, et je construis chaque itinéraire avec vous — au rythme
                de votre famille, pas de celui d&apos;un autocar.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-[62ch] text-soft">
                Je suis passionné d&apos;histoire, et particulièrement de celle de
                l&apos;Europe — la Belgique et la France, où je me suis rendu à
                plusieurs reprises. C&apos;est ce qui rend la conversation possible
                dans les deux sens : je vous raconte mon île, et vous me racontez
                la vôtre.
              </p>
              <p className="mt-4 max-w-[62ch] text-soft">
                Passer en direct change tout : le prix que vous payez va aux
                familles qui vous accueillent, et vous gardez mon numéro pendant
                tout le séjour. Je me considère comme un ambassadeur du tourisme
                de mon pays, et je travaille de tout mon cœur — dans la joie et
                la bonne humeur.
              </p>
              <p className="mt-4 font-display text-xl">— Agus</p>
            </Reveal>

            <Reveal delay={0.13}>
              <div className="flex items-start gap-4 border-y border-rule py-5">
                <Canang size={52} className="mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed text-soft">
                  Chaque matin, avant de prendre la route, je dépose un{" "}
                  <em>canang sari</em> sur le tableau de bord : quelques fleurs
                  dans un panier de feuille de palme tressée. C&apos;est trois
                  minutes, et c&apos;est le vrai début de la journée.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="label mb-5 text-accent">
                Tri Hita Karana — les trois harmonies
              </p>
              <ul className="grid list-none gap-8 p-0 sm:grid-cols-3">
                {HARMONIES.map(({ icon: Icon, nom, gloss, title, text }, i) => (
                  <li
                    key={nom}
                    className="flex flex-col gap-2.5 border-t border-rule pt-5"
                    /* Décalage : les trois harmonies ne sont pas alignées
                       au cordeau, elles se répondent. */
                    style={{ marginTop: `${i * 18}px` }}
                  >
                    <Icon size={20} className="text-accent" strokeWidth={1.5} />
                    <h3 className="text-xl leading-tight">{nom}</h3>
                    <p className="label -mt-1 text-faint">{gloss}</p>
                    <p className="mt-1 font-semibold">{title}</p>
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
