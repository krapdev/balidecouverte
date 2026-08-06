"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Symbole } from "./Symboles";
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
      {/* Porte **et** flèche vers la gauche : la porte dit qu'on change
          de page, la flèche dit dans quel sens. Les deux ensemble, et
          seulement ici — c'est le seul endroit du site où l'on revient
          en arrière. */}
      <Symbole nom="porte" size={16} strokeWidth={1.6} />
      <ArrowLeft size={13} />
      {label}
    </Link>
  );
}

export default function RetourLien({ className = "" }) {
  const classes = `label inline-flex min-h-11 items-center gap-2 text-accent no-underline ${className}`;
  return (
    <Suspense
      fallback={
        <Link href="/" className={classes}>
          <Symbole nom="porte" size={16} strokeWidth={1.6} />
          <ArrowLeft size={13} />
          Retour à l&apos;accueil
        </Link>
      }
    >
      <Lien className={classes} />
    </Suspense>
  );
}
