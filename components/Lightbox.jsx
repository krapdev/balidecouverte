"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Photo from "./Photo";

/**
 * Visionneuse plein écran — les photos d'UNE place secrète.
 *
 * Le swipe reste à l'intérieur de la place ouverte : on regarde le grand
 * ficus sous trois angles, on ne dérive pas vers la saline. Passer d'une
 * place à l'autre est une décision, elle se prend sur la page en
 * refermant — pas par accident au bout d'un geste.
 *
 * Trois façons de naviguer, parce qu'aucune ne couvre tout le monde :
 * le swipe sur mobile, les flèches du clavier au bureau, et deux boutons
 * visibles pour qui n'a ni l'un ni l'autre en tête.
 *
 * Détails d'accessibilité qui ne se voient pas mais se sentent :
 * `role="dialog"` + `aria-modal`, le focus qui part sur la fermeture et
 * revient d'où il vient, Échap qui ferme, et le défilement de la page
 * bloqué tant que la visionneuse est ouverte.
 */
export default function Lightbox({ place, index, onClose, onIndex }) {
  const fermer = useRef(null);
  const depart = useRef(null);
  /* L'écart vit dans une ref autant que dans l'état : l'état sert au
     rendu (l'image suit le doigt), la ref sert à la décision. Lire
     l'état dans touchend rate les gestes rapides — la mise à jour n'est
     pas encore commitée quand touchmove et touchend tombent dans le
     même tick. */
  const ecart = useRef(0);
  const [glisse, setGlisse] = useState(0);

  const photos = place?.photos ?? [];
  const ouvert = index != null && photos.length > 0;
  const vue = ouvert ? photos[index] : null;
  const seule = photos.length < 2;

  const aller = useCallback(
    (pas) => {
      if (!ouvert) return;
      /* On boucle : depuis la dernière, « suivant » ramène à la première.
         Rien à gagner à bloquer le voyageur en bout de liste. */
      onIndex((index + pas + photos.length) % photos.length);
    },
    [index, photos.length, onIndex, ouvert]
  );

  useEffect(() => {
    if (!ouvert) return;

    const rendreLeFocus = document.activeElement;
    fermer.current?.focus();

    const auClavier = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") aller(1);
      else if (e.key === "ArrowLeft") aller(-1);
    };
    document.addEventListener("keydown", auClavier);

    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", auClavier);
      document.body.style.overflow = defilement;
      if (rendreLeFocus instanceof HTMLElement) rendreLeFocus.focus();
    };
  }, [ouvert, aller, onClose]);

  if (!ouvert) return null;

  const debutTouche = (e) => {
    depart.current = e.touches[0].clientX;
  };
  const pendantTouche = (e) => {
    if (depart.current == null) return;
    ecart.current = e.touches[0].clientX - depart.current;
    setGlisse(ecart.current);
  };
  const finTouche = () => {
    /* 60 px : assez pour ne pas déclencher sur un simple appui,
       assez peu pour rester confortable au pouce. */
    if (ecart.current > 60) aller(-1);
    else if (ecart.current < -60) aller(1);
    depart.current = null;
    ecart.current = 0;
    setGlisse(0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${place.titre} — photo ${index + 1} sur ${photos.length}`}
      className="fixed inset-0 z-[100] flex flex-col bg-[color-mix(in_srgb,var(--immersive-deep)_94%,transparent)] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-4 px-[clamp(1rem,4vw,2rem)] py-4 text-on-immersive">
        <span className="label text-on-immersive-soft">
          {place.titre}
          {!seule && (
            <span className="ml-3 tabular-nums">
              {index + 1} / {photos.length}
            </span>
          )}
        </span>
        <button
          ref={fermer}
          type="button"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center rounded-full border border-[color-mix(in_srgb,var(--on-immersive)_30%,transparent)] text-on-immersive transition-colors hover:border-soleil hover:text-soleil"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
      </div>

      <div
        className="flex flex-1 items-center gap-2 overflow-y-auto px-[clamp(0.5rem,3vw,2rem)] pb-6"
        onTouchStart={debutTouche}
        onTouchMove={pendantTouche}
        onTouchEnd={finTouche}
      >
        {!seule && (
          <button
            type="button"
            onClick={() => aller(-1)}
            className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--on-immersive)_30%,transparent)] text-on-immersive transition-colors hover:border-soleil hover:text-soleil sm:grid"
            aria-label="Photo précédente"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <figure
          /* Écran court (téléphone tourné) : la photo et le texte
             passent côte à côte, sinon la légende sort de l'écran. */
          className="m-0 flex min-w-0 flex-1 flex-col justify-center gap-4 [@media(max-height:560px)]:flex-row [@media(max-height:560px)]:items-center"
          style={{
            transform: `translateX(${glisse * 0.4}px)`,
            transition: glisse ? "none" : "transform .25s ease",
          }}
        >
          <Photo
            src={vue.src}
            alt={vue.alt}
            scene={vue.scene}
            uid={`lb-${place.id}-${index}`}
            brief={vue.brief}
            ratio="aspect-[3/2]"
            priority
            className="w-full rounded-[14px] [@media(max-height:560px)]:max-w-[52%]"
          />
          <figcaption className="text-on-immersive [@media(max-height:560px)]:flex-1">
            <p className="font-display text-[clamp(1.25rem,4vw,1.75rem)] leading-tight">
              {place.titre}
            </p>
            <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-on-immersive-soft">
              {place.recit ?? place.texte}
            </p>
          </figcaption>
        </figure>

        {!seule && (
          <button
            type="button"
            onClick={() => aller(1)}
            className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--on-immersive)_30%,transparent)] text-on-immersive transition-colors hover:border-soleil hover:text-soleil sm:grid"
            aria-label="Photo suivante"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {!seule && (
        <p className="pb-[calc(1rem+env(safe-area-inset-bottom,0px))] text-center text-xs text-on-immersive-soft sm:hidden">
          Balayez pour voir les autres photos de cette place
        </p>
      )}
    </div>
  );
}
