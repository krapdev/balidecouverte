"use client";

import { useEffect } from "react";
import { ecouterLesAncres } from "@/lib/ancre";

/**
 * Un écouteur, aucun balisage. Monté dans `app/layout.js` pour que tous
 * les liens d'ancre du site — y compris ceux des composants serveur —
 * défilent en 420 ms au lieu des 683 que donnait
 * `scroll-behavior: smooth`. Voir `lib/ancre.js` pour le pourquoi.
 */
export default function Ancres() {
  useEffect(() => ecouterLesAncres(), []);
  return null;
}
