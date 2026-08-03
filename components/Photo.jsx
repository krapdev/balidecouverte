import { Camera } from "lucide-react";
import Scene from "./Scene";

/**
 * Emplacement photo — placeholder aujourd'hui, vraie image demain.
 *
 * Deux partis pris :
 *
 *  1. **Le fond reste beau.** Le placeholder n'est pas un rectangle gris :
 *     c'est l'illustration SVG déjà dessinée. La page ne se dégrade pas en
 *     attendant les images.
 *  2. **Le placeholder porte le brief.** `brief` décrit la photo à
 *     prendre — la section devient de fait la liste de prises de vue à
 *     donner à Agus, au lieu d'une note perdue dans un fichier à part.
 *
 * Le jour où la photo existe : passer `src` (et `alt`). Rien d'autre à
 * changer, ni ici ni chez les appelants.
 */
export default function Photo({
  src,
  alt,
  scene = "terraces",
  /* Certaines illustrations ne sont pas des `kind` de <Scene> — le
     portrait d'Agus, par exemple. On les passe telles quelles. */
  fallback,
  uid,
  brief,
  className = "",
  ratio = "aspect-[16/11]",
  priority = false,
}) {
  return (
    <span className={`relative block overflow-hidden ${ratio} ${className}`}>
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt ?? ""}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          {fallback ?? (
            <Scene kind={scene} uid={uid ?? scene} className="h-full w-full" />
          )}
          {brief && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-start gap-2 bg-immersive-deep px-3 py-2 text-on-immersive">
              <Camera size={13} className="mt-0.5 shrink-0" strokeWidth={1.8} />
              <span className="text-[0.6875rem] leading-snug">
                <b className="font-semibold">Photo à venir</b> — {brief}
              </span>
            </span>
          )}
        </>
      )}
    </span>
  );
}
