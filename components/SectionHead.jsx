import Reveal from "./Reveal";

/** En-tête de section : eyebrow filetée, titre, chapô. */
export default function SectionHead({ eyebrow, title, children, onImmersive }) {
  return (
    <Reveal className="mb-[clamp(2rem,5vw,3.25rem)] flex max-w-[62ch] flex-col gap-3.5">
      <p
        className={`label flex items-center gap-3 before:h-px before:w-6 before:bg-current before:content-[''] ${
          onImmersive ? "text-accent" : "text-eyebrow"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="text-[clamp(1.9rem,5.2vw,2.375rem)]">{title}</h2>
      {children && (
        <p
          className={`text-lg leading-relaxed ${
            onImmersive ? "text-on-immersive-soft" : "text-soft"
          }`}
        >
          {children}
        </p>
      )}
    </Reveal>
  );
}
