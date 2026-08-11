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
 * `rouge` teint le titre en bougainvillier encré. **La règle est de
 * fonction, pas de goût** — sinon on finit par en mettre partout, et une
 * page dont tous les titres sont rouges n'est pas plus gaie, elle est
 * rouge. Le rouge va aux titres qui **invitent** : la fourche, le livre
 * d'or, et l'ouverture des deux pages où mène la fourche. Il ne va pas
 * aux titres qui **outillent** — le formulaire, les tarifs, les pages
 * légales restent à l'encre. Un visiteur ne se formule pas la règle,
 * mais il enregistre le rythme.
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
  rouge = false,
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
      {/* ⚠️ **`--bougain-ink` et non `--bougain`.** Le bougainvillier
          courant mesure 3,90 sur le sable : au-dessus du seuil des grands
          titres, en dessous de celui du texte courant, donc juste au bord
          — et un titre au bord ne laisse aucune marge le jour où le fond
          change. Le bougainvillier encré donne **5,12 sur le sable et
          5,77 sur l'ivoire**, au-dessus du seuil du texte courant.
          ⚠️ Il ne se pose **jamais sur `onImmersive`** : rouge sur le
          vert profond, on tombe sous 2. Là, le titre reste clair.
          ⚠️ Et il reste **rare**. La couleur donne du rythme parce que la
          plupart des titres n'en ont pas ; teindre tous les titres ne
          rendrait pas la page plus gaie, ça la rendrait rouge. */}
      <Titre
        className={`text-[clamp(1.9rem,5.2vw,2.375rem)] ${
          rouge && !onImmersive ? "text-bougain-ink" : ""
        }`}
      >
        {title}
      </Titre>
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
