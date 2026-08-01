import { EXPERIENCES } from "@/lib/data";
import ExperienceCard from "./ExperienceCard";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Experiences() {
  return (
    <section id="experiences" className="ground-sable band">
      <div className="shell">
        <SectionHead eyebrow="Expériences" title="Quatre moments, sur une quarantaine">
          Voici ce qu&apos;on retient d&apos;un circuit de quinze jours. Il y en a
          bien d&apos;autres — marché aux oiseaux, rafting dans les gorges
          d&apos;Ayung, saline de quatre cents hectares, cochon grillé chez Mère
          Oka. Ajoutez ceux qui vous parlent, ils alimentent votre demande.
        </SectionHead>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {EXPERIENCES.map((e, i) => (
            <Reveal
              key={e.id}
              delay={(i % 2) * 0.08}
              className={`h-full ${i % 2 ? "sm:mt-16" : ""}`}
            >
              <ExperienceCard experience={e} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
