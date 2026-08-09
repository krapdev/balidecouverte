"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTrip } from "@/lib/trip-store";
import { versAncre } from "@/lib/ancre";

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
  /* La barre vit aussi sur /envies, où « #sur-mesure » ne mène nulle
     part : hors accueil, l'ancre est absolue. */
  const accueil = usePathname() === "/";

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-3.5 border-t border-rule bg-[color-mix(in_srgb,var(--page)_94%,transparent)] px-[clamp(1.25rem,5vw,3rem)] py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur-lg transition-[transform,visibility] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none lg:hidden ${
        visible ? "visible translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <p className="font-sans text-xs leading-tight text-soft">
        <b className="block font-sans text-base font-bold text-ink">
          {count} envie{count > 1 ? "s" : ""}
        </b>{" "}
        {/* ⚠️ Le `{" "}` est nécessaire bien que le `<b>` soit en
            `display: block` : la coupure de ligne est visuelle, la couche
            texte, elle, collait « 0 enviedans votre voyage » — c'est ce
            que lit un lecteur d'écran et ce qu'extrait une recherche. */}
        dans votre voyage
      </p>
      {/* Deux pièges se croisent sur ce seul bouton, et il a fallu les
          deux corrections :

          1. `<Link>` et non `<a>` quand on change de page. Un
             `<a href="/…">` provoque un **chargement complet**, et le
             magasin vit dans le gabarit : il survit aux navigations
             client, pas aux rechargements. Cocher trois envies sur
             /envies puis toucher ce bouton effaçait tout.
          2. `versAncre` quand on **ne** change **pas** de page. Une fois
             arrivé sur `/#sur-mesure`, retoucher le bouton ne
             renavigue pas — le fragment est déjà celui-là — et le
             bouton devenait inerte. Voir lib/ancre.js. */}
      <Link
        className="btn btn-accent ml-auto"
        href={accueil ? "#sur-mesure" : "/#sur-mesure"}
        onClick={(e) => accueil && versAncre(e, "#sur-mesure")}
        tabIndex={visible ? undefined : -1}
      >
        Ma demande
      </Link>
    </div>
  );
}
