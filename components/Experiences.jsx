import { EXPERIENCES } from "@/lib/data";
import ExperienceCard from "./ExperienceCard";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Experiences() {
  return (
    <section id="experiences" className="py-[clamp(3.5rem,10vw,6.5rem)]">
      <div className="shell">
        <SectionHead eyebrow="Expériences" title="Coups de cœur d'Agus">
          Ajoutez celles qui vous parlent : elles alimentent votre demande de
          devis, en bas de page. Rien n&apos;est réservé ni payé ici.
        </SectionHead>

        <div className="grid gap-6 sm:grid-cols-2">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.id} delay={(i % 2) * 0.08} className="h-full">
              <ExperienceCard experience={e} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
