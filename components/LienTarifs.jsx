"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { urlTarifs } from "@/lib/retours";

/**
 * Le lien vers les tarifs, qui emporte la section d'où l'on part.
 *
 * Le pied de page est un composant serveur ; ce petit client isolé
 * évite de faire basculer tout le pied pour un seul lien.
 *
 * `href` reste `/tarifs` tout court : le clic milieu, « copier le lien »
 * et les robots ne passent pas par le gestionnaire, et doivent trouver
 * une URL propre. Le paramètre n'est ajouté que sur un vrai clic gauche
 * depuis l'accueil, seul cas où il y a une section à mémoriser.
 */
export default function LienTarifs({ className, children }) {
  const router = useRouter();
  const home = usePathname() === "/";

  return (
    <Link
      href="/tarifs"
      className={className}
      onClick={(e) => {
        if (!home || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        router.push(urlTarifs());
      }}
    >
      {children}
    </Link>
  );
}
