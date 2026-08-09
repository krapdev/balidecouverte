"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Le diaporama du hero — trois photos de Bali qui se succèdent en fondu.
 *
 * ## Deux règles d'accessibilité, et elles ne sont pas négociables
 *
 * **1. WCAG 2.2.2, niveau A.** Tout contenu qui démarre seul, dure plus de
 * cinq secondes et cohabite avec d'autres contenus doit offrir un moyen de
 * l'arrêter. D'où le bouton pause, qui n'est pas une option de confort :
 * sans lui le site échoue à un critère de niveau A. Il est discret, mais
 * il est là, il fait 44 px de cible et il annonce son état.
 *
 * **2. `prefers-reduced-motion`.** Le défilement automatique **ne démarre
 * pas** si le système le demande — pas « plus lentement », pas « sans
 * fondu » : il ne démarre pas. Un mouvement automatique est exactement ce
 * que ce réglage existe pour supprimer, et pour certaines personnes c'est
 * une question de nausée, pas de goût. Les pastilles restent, la
 * navigation manuelle aussi.
 *
 * ## Le reste des choix
 *
 * - **Fondu et non glissement.** Un glissement déplace le regard ; un
 *   fondu laisse l'œil où il est. Sur une photo qu'on regarde plutôt
 *   qu'on ne lit, c'est plus reposant — et c'est ce que « doucement »
 *   veut dire.
 * - **Sept secondes.** Assez pour regarder une photo sans s'impatienter,
 *   assez peu pour qu'on voie qu'il y en a d'autres. Le fondu dure 1,1 s.
 * - **Les trois images sont empilées, pas montées/démontées.** Elles sont
 *   toutes dans le DOM en permanence, seule l'opacité change : sans ça la
 *   deuxième photo se télécharge au moment où elle doit apparaître, et le
 *   fondu se fait sur du vide.
 * - **`object-position` par photo.** Les trois n'ont pas le même format —
 *   16/9 pour les rizières, 4/3 pour les deux autres — et le cadre est un
 *   bandeau. Recadrées au centre, le temple perdait sa tour et la cascade
 *   sa chute. Chaque photo dit donc où est son sujet.
 * - **Le survol ne met pas en pause.** C'était tentant, mais ça ne sert
 *   personne au tactile, et ça rend le comportement imprévisible à la
 *   souris — on ne sait plus si le diaporama est arrêté ou lent. Le
 *   bouton est explicite, il suffit.
 */

const DUREE = 7000;

export default function Diaporama({ photos, className = "" }) {
  const [i, setI] = useState(0);
  const [enPause, setEnPause] = useState(false);
  /* `null` tant qu'on n'a pas lu la préférence système : on ne démarre
     rien avant de savoir. */
  const [anime, setAnime] = useState(null);
  const minuteur = useRef(null);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const lire = () => setAnime(!mq.matches);
    lire();
    mq.addEventListener("change", lire);
    return () => mq.removeEventListener("change", lire);
  }, []);

  useEffect(() => {
    if (!anime || enPause) return;
    minuteur.current = setInterval(
      () => setI((n) => (n + 1) % photos.length),
      DUREE
    );
    return () => clearInterval(minuteur.current);
  }, [anime, enPause, photos.length]);

  /* Le bouton n'a de sens que si quelque chose bouge. Sous
     `prefers-reduced-motion`, rien ne bouge : il disparaît. */
  const montrerPause = anime === true;

  return (
    <div
      className={`relative overflow-hidden rounded-[16px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] ${className}`}
      role="group"
      aria-roledescription="diaporama"
      aria-label="Bali en images"
    >
      {/* Le cadre est réservé par le ratio, pas par les photos : sans ça
          la page saute à l'arrivée de la première image. */}
      <div className="relative aspect-[1.8/1] w-full md:aspect-[2.2/1]">
        {photos.map((p, n) => (
          <picture key={p.src}>
            <source type="image/webp" srcSet={p.webp} sizes={p.sizes} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              sizes={p.sizes}
              alt={p.alt}
              /* ⚠️ **Les trois sont en `eager`, et la deuxième ne l'était
                 pas.** Avec `lazy`, la photo qui apparaît n'est pas
                 encore téléchargée au moment du fondu : son opacité passe
                 à 1 sur une image vide, et on voit **à travers** celle du
                 dessous. Mesuré — un clic sur la troisième pastille
                 affichait la deuxième photo.
                 C'est contre-intuitif parce que `lazy` est presque
                 toujours le bon défaut ; ici les trois occupent le même
                 cadre visible, elles sont donc toutes « au-dessus de la
                 ligne de flottaison » même quand deux sont transparentes.
                 `fetchPriority` fait le tri : la première passe devant,
                 les deux autres suivent sans lui disputer la bande. */
              loading="eager"
              fetchPriority={n === 0 ? "high" : "low"}
              decoding="async"
              aria-hidden={n !== i}
              style={{ objectPosition: p.position ?? "center" }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-in-out motion-reduce:transition-none ${
                n === i ? "opacity-100" : "opacity-0"
              }`}
            />
          </picture>
        ))}
      </div>

      {/* Les commandes, sur un voile pour rester lisibles quelle que soit
          la photo dessous — une pastille claire sur un ciel clair
          disparaît, et l'audit ne peut rien conclure d'un contraste posé
          sur une image. */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent)] px-3 py-2.5">
        <div className="flex items-center gap-2">
          {photos.map((p, n) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Photo ${n + 1} sur ${photos.length}`}
              aria-current={n === i ? "true" : undefined}
              /* La cible fait 44 px, la pastille 8 : c'est la zone
                 tactile qui doit être confortable, pas le dessin. */
              className="grid h-11 w-6 place-items-center"
            >
              <span
                className={`block h-2 w-2 rounded-full transition-[background-color,transform] ${
                  n === i ? "scale-125 bg-white" : "bg-white/55"
                }`}
              />
            </button>
          ))}
        </div>

        {montrerPause && (
          <button
            type="button"
            onClick={() => setEnPause((v) => !v)}
            aria-label={
              enPause ? "Reprendre le diaporama" : "Mettre le diaporama en pause"
            }
            className="grid h-11 w-11 place-items-center rounded-full text-white"
          >
            {enPause ? <Play size={16} /> : <Pause size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
