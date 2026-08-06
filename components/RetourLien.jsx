"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { retour } from "@/lib/retours";

/**
 * Le lien de retour des tarifs, qui ramène là d'où l'on vient.
 *
 * `useSearchParams` fait basculer en rendu client tout ce qui se trouve
 * sous la frontière `<Suspense>` la plus proche ; sur une route
 * prérendue, l'absence de frontière fait carrément **échouer le build**
 * (« Missing Suspense boundary with useSearchParams »). D'où le
 * `<Suspense>` posé ici plutôt que laissé à l'appelant.
 *
 * Le repli n'est pas un squelette gris mais **le lien correct par
 * défaut** : « Retour à l'accueil » est vrai dans tous les cas où la
 * section d'origine est inconnue. Rien ne clignote, rien ne ment.
 */
function Lien({ className }) {
  const { href, label } = retour(useSearchParams().get("de"));
  return (
    <Link href={href} className={className}>
      <ArrowLeft size={20} strokeWidth={2.4} aria-hidden="true" />
      {label}
    </Link>
  );
}

export default function RetourLien({ className = "" }) {
  /* Plus une petite capitale de 11 px : un retour est la commande la
     plus utile d'une page qu'on n'a pas choisie, et c'était la plus
     petite de l'écran. Texte courant, 15 px, flèche de 20. */
  const classes = `inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-accent no-underline ${className}`;
  return (
    <Suspense
      fallback={
        <Link href="/" className={classes}>
          <ArrowLeft size={20} strokeWidth={2.4} aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>
      }
    >
      <Lien className={classes} />
    </Suspense>
  );
}
