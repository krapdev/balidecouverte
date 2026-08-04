"use client";

import { useEffect } from "react";

/**
 * L'unique observateur des apparitions, monté une fois par page.
 *
 * Un `IntersectionObserver` partagé remplace une soixantaine de
 * frontières client. Il cesse d'observer chaque élément dès qu'il est
 * apparu : l'animation ne se rejoue pas au retour, et l'observateur se
 * vide de lui-même.
 *
 * **Le filet de sécurité compte autant que l'effet.** Les `.reveal`
 * partent à `opacity: 0` ; si le script ne s'exécute jamais, la page
 * reste blanche. Trois protections :
 *
 *  - un `<noscript>` dans `globals.css` — non, il ne peut pas y être :
 *    il est posé ici, en JSX, et neutralise `.reveal` sans JavaScript ;
 *  - `prefers-reduced-motion` neutralise aussi la classe, côté CSS ;
 *  - si `IntersectionObserver` manque, on révèle tout d'un coup.
 *
 * Googlebot exécute le JavaScript, donc l'indexation ne dépend pas de
 * ce filet ; les moteurs plus simples et les lecteurs en mode dégradé,
 * si.
 */
export default function RevealObserver() {
  useEffect(() => {
    const cibles = document.querySelectorAll(".reveal:not([data-in])");
    if (!("IntersectionObserver" in window)) {
      cibles.forEach((el) => el.setAttribute("data-in", "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-in", "true");
          io.unobserve(e.target);
        }
      },
      /* -8 % en bas : l'élément doit être franchement entré, pas
         simplement effleuré par le bord de l'écran. */
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    cibles.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <noscript>
      <style>{`.reveal{opacity:1;transform:none}`}</style>
    </noscript>
  );
}
