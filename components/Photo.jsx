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
 * changer, ni ici ni chez les appelants — le bandeau du brief disparaît
 * de lui-même, puisqu'il n'est rendu que dans la branche sans `src`.
 *
 * ⚠️ **Le cadre est réservé par `ratio`, pas par la photo.** C'est ce qui
 * évite le décalage de mise en page à l'arrivée de l'image : le `aspect-*`
 * tient la boîte avant même que le premier octet soit là. Ne pas retirer
 * `ratio` en croyant que l'image suffit à donner sa hauteur.
 */
export default function Photo({
  src,
  /**
   * Les variantes servies avant `src`, dans l'ordre de préférence :
   * `[{ type: "image/webp", srcSet: "…600.webp 600w, ….webp 840w" }]`.
   * `src` reste le **repli universel** — un JPEG que tout navigateur lit.
   *
   * ⚠️ `sizes` n'est pas décoratif : sans lui le navigateur suppose que
   * l'image occupe toute la largeur de la fenêtre et télécharge la plus
   * grande variante pour un cadre de 280 px.
   */
  sources,
  sizes,
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
        <picture>
          {sources?.map((s) => (
            <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            sizes={sizes}
            alt={alt ?? ""}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
      ) : (
        <>
          {fallback ?? (
            <Scene kind={scene} uid={uid ?? scene} className="h-full w-full" />
          )}
          {brief && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-start gap-2 bg-immersive-deep px-3 py-2 text-on-immersive">
              <Camera size={13} className="mt-0.5 shrink-0" strokeWidth={1.8} />
              <span className="text-xs leading-snug">
                <b className="font-semibold">Photo à venir</b> — {brief}
              </span>
            </span>
          )}
        </>
      )}
    </span>
  );
}
