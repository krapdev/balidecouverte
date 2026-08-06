"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTrip } from "@/lib/trip-store";
import { CIRCUITS } from "@/lib/data";

/**
 * « Partir de ce circuit et l'ajuster » — depuis /circuit.
 *
 * Le bouton menait à `/#sur-mesure` et **ne faisait rien** : on
 * atterrissait sur un formulaire vide après avoir lu quinze journées,
 * sans que rien n'indique de quoi on venait de parler. Le message
 * partait sans la base de départ, et Agus recevait une demande qui ne
 * disait pas qu'elle venait de son circuit.
 *
 * La cause est structurelle et vaut d'être écrite : **le magasin
 * (`TripProvider`) n'existe que sur l'accueil.** C'est un état React, pas
 * un stockage ; changer de page le recrée à vide. Un bouton sur /circuit
 * ne peut donc pas « cliquer » dans l'état de l'accueil — il faut que
 * l'intention voyage dans l'URL.
 *
 * D'où `?circuit=bali` : lisible, partageable, et vrai après un
 * rechargement. On aurait pu passer par `sessionStorage`, mais un lien
 * qu'on envoie à quelqu'un aurait alors perdu la sélection en route,
 * ce qui est exactement le genre de trou qu'on vient de boucher.
 *
 * ⚠️ `useSearchParams` fait basculer en rendu client tout ce qui est sous
 * la frontière `<Suspense>` la plus proche, et **sur une route prérendue,
 * l'absence de frontière fait échouer le build**. Elle est donc posée
 * ici, pas chez l'appelant.
 */
function Applique() {
  const de = useSearchParams().get("circuit");
  const { setBaseCircuit } = useTrip();
  /* Une seule fois par valeur. Sans ce garde, revenir en arrière dans
     l'historique rejouerait la sélection et écraserait un choix que le
     voyageur aurait entre-temps annulé. */
  const fait = useRef(null);

  useEffect(() => {
    if (!de || fait.current === de) return;
    if (!CIRCUITS.some((c) => c.id === de)) return;
    fait.current = de;
    setBaseCircuit(de);

    /* Le défilement est fait ici, et non laissé au fragment `#sur-mesure`
       de l'URL : la sélection ajoute au-dessus du formulaire le bloc
       « Ma base de départ », donc le navigateur a déjà sauté avant que la
       page ait sa hauteur définitive. On attend la peinture suivante et
       on vise l'ancre nous-mêmes.
       `[id] { scroll-margin-top }` de globals.css place l'atterrissage
       sous la barre collante — ne rien ajouter ici. */
    requestAnimationFrame(() => {
      document
        .getElementById("sur-mesure")
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  }, [de, setBaseCircuit]);

  return null;
}

export default function PreselectionCircuit() {
  return (
    <Suspense fallback={null}>
      <Applique />
    </Suspense>
  );
}
