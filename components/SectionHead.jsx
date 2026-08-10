import Reveal from "./Reveal";

/**
 * En-tête de section : eyebrow filetée, titre, chapô.
 *
 * `niveau` existe pour /tarifs, qui démarrait en `h2` et n'avait donc
 * **aucun titre de premier niveau** : sur l'accueil le `h1` est dans le
 * hero, mais la page tarifs n'a pas de hero. Le niveau se choisit par la
 * place dans le document, jamais par la taille voulue — celle-ci vient
 * de la classe.
 *
 * ⚠️ Il a porté un temps un `epingle` qui remplaçait le filet par un
 * jepun jaune. `Broche` fait mieux — elle épingle la fleur à l'angle de
 * la fiche, pas devant le mot — et plus personne ne passait la propriété.
 * Elle a été retirée plutôt que laissée à dormir : **une option que
 * personne n'utilise ne se maintient pas, elle diverge.**
 */
export default function SectionHead({
  eyebrow,
  title,
  children,
  onImmersive,
  niveau = 2,
}) {
  const Titre = `h${niveau}`;
  return (
    <Reveal className="mb-[clamp(2rem,5vw,3.25rem)] flex max-w-[62ch] flex-col gap-3.5">
      <p
        className={`label flex items-center gap-3 before:h-px before:w-6 before:bg-current before:content-[''] ${
          onImmersive ? "text-soleil-pale" : "text-eyebrow"
        }`}
      >
        {eyebrow}
      </p>
      <Titre className="text-[clamp(1.9rem,5.2vw,2.375rem)]">{title}</Titre>
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
