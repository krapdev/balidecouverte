"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Photo from "./Photo";

/**
 * Visionneuse plein écran pour les places secrètes.
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
export default function Lightbox({ items, index, onClose, onIndex }) {
  const fermer = useRef(null);
  const depart = useRef(null);
  /* L'écart vit dans une ref autant que dans l'état : l'état sert au
     rendu (l'image suit le doigt), la ref sert à la décision. Lire
     l'état dans touchend rate les gestes rapides — la mise à jour n'est
     pas encore commitée quand touchmove et touchend tombent dans le
     même tick. */
  const ecart = useRef(0);
  const [glisse, setGlisse] = useState(0);

  const ouvert = index != null;
  const item = ouvert ? items[index] : null;

  const aller = useCallback(
    (pas) => {
      if (!ouvert) return;
      /* On boucle : depuis la dernière, « suivant » ramène à la première.
         Rien à gagner à bloquer le voyageur en bout de liste. */
      onIndex((index + pas + items.length) % items.length);
    },
    [index, items.length, onIndex, ouvert]
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
      aria-label={`${item.titre} — ${index + 1} sur ${items.length}`}
      className="fixed inset-0 z-[100] flex flex-col bg-[color-mix(in_srgb,var(--immersive-deep)_94%,transparent)] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-4 px-[clamp(1rem,4vw,2rem)] py-4 text-on-immersive">
        <span className="label tabular-nums text-on-immersive-soft">
          {index + 1} / {items.length}
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
        className="flex flex-1 items-center gap-2 px-[clamp(0.5rem,3vw,2rem)] pb-6"
        onTouchStart={debutTouche}
        onTouchMove={pendantTouche}
        onTouchEnd={finTouche}
      >
        <button
          type="button"
          onClick={() => aller(-1)}
          className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--on-immersive)_30%,transparent)] text-on-immersive transition-colors hover:border-soleil hover:text-soleil sm:grid"
          aria-label="Place précédente"
        >
          <ChevronLeft size={22} />
        </button>

        <figure
          className="m-0 flex min-w-0 flex-1 flex-col justify-center"
          style={{
            transform: `translateX(${glisse * 0.4}px)`,
            transition: glisse ? "none" : "transform .25s ease",
          }}
        >
          <Photo
            src={item.photo?.src}
            alt={item.photo?.alt}
            scene={item.photo?.scene}
            uid={`lb-${item.id}`}
            brief={item.photo?.brief}
            ratio="aspect-[3/2]"
            priority
            className="w-full rounded-[14px]"
          />
          <figcaption className="mt-4 text-on-immersive">
            <p className="font-display text-[clamp(1.25rem,4vw,1.75rem)] leading-tight">
              {item.titre}
            </p>
            <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-on-immersive-soft">
              {item.texte}
            </p>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => aller(1)}
          className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--on-immersive)_30%,transparent)] text-on-immersive transition-colors hover:border-soleil hover:text-soleil sm:grid"
          aria-label="Place suivante"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <p className="pb-[calc(1rem+env(safe-area-inset-bottom,0px))] text-center text-[0.6875rem] text-on-immersive-soft sm:hidden">
        Balayez pour passer d&apos;une place à l&apos;autre
      </p>
    </div>
  );
}
