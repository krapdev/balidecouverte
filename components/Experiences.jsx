import { EXPERIENCES } from "@/lib/data";
import ExperienceCard from "./ExperienceCard";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Experiences() {
  return (
    <section id="experiences" className="ground-sable band">
      <div className="shell">
        <SectionHead eyebrow="Expériences" title="Coups de cœur d'Agus">
          Ajoutez celles qui vous parlent : elles alimentent votre demande de
          devis, en bas de page. Rien n&apos;est réservé ni payé ici.
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
