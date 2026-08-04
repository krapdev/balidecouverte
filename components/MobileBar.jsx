"use client";

import { useTrip } from "@/lib/trip-store";

/**
 * Rappel permanent du circuit en cours de construction, sur mobile.
 *
 * La barre est **toujours dans le DOM** et se translate hors de l'écran
 * quand le panier est vide. C'est ce qui permet d'animer l'entrée *et*
 * la sortie sans bibliothèque : une transition CSS ne peut pas animer un
 * élément qu'on retire de l'arbre.
 *
 * `visibility: hidden` en position sortie, et non seulement la
 * translation : sans elle, la barre resterait focusable au clavier et
 * annoncée par les lecteurs d'écran alors qu'elle est invisible.
 * `aria-hidden` suit la même logique.
 */
export default function MobileBar() {
  const { count } = useTrip();
  const visible = count > 0;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-3.5 border-t border-rule bg-[color-mix(in_srgb,var(--page)_94%,transparent)] px-[clamp(1.25rem,5vw,3rem)] py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur-lg transition-[transform,visibility] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none lg:hidden ${
        visible ? "visible translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <p className="font-sans text-[0.6875rem] leading-tight text-soft">
        <b className="block font-sans text-base font-bold text-ink">
          {count} envie{count > 1 ? "s" : ""}
        </b>
        dans votre voyage
      </p>
      <a
        className="btn btn-accent ml-auto"
        href="#sur-mesure"
        tabIndex={visible ? undefined : -1}
      >
        Ma demande
      </a>
    </div>
  );
}
