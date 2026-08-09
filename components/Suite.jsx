import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * La suite — le pas d'après, en bas d'une page.
 *
 * ⚠️ **Une page qui se termine sans pas suivant est une impasse**, et le
 * site en comptait trois sur cinq. Relevé page par page, au bas du
 * contenu et avant le pied :
 *
 *   - `/agus` : **rien**. Huit écrans, la page qui convainc, et pour
 *     seule sortie le pied de page. Celui qui vient d'être convaincu par
 *     l'homme n'avait aucun moyen d'aller voir le voyage.
 *   - `/envies` : rien **tant qu'on n'a rien coché**. Or on lit d'abord
 *     et on choisit ensuite : le visiteur qui parcourt la liste sans
 *     cocher arrivait au vide.
 *   - `/tarifs` : « Retour à l'accueil ». Un retour, pas une suite —
 *     après avoir lu les prix, on veut demander, pas rebrousser chemin.
 *   - `/circuit` et `/livre-d-or` finissaient bien, et c'est de la
 *     sortie du circuit que ce composant est tiré.
 *
 * ⚠️ **Un seul composant, et `/circuit` s'en sert aussi.** Le motif y
 * était écrit à la main ; le laisser en double aurait rejoué ce qui est
 * arrivé aux entrées de navigation, qui ont vécu en trois exemplaires
 * avant de diverger.
 *
 * `secondaire` est facultatif : deux sorties valent mieux qu'une quand
 * la page mène honnêtement à deux endroits, mais une page qui n'a qu'une
 * suite ne doit pas s'en inventer une deuxième.
 */
export default function Suite({
  titre,
  children,
  principal,
  secondaire,
  className = "",
}) {
  return (
    <section
      className={`rounded-[18px] bg-immersive px-[clamp(1.5rem,5vw,3rem)] py-[clamp(2rem,6vw,3rem)] text-on-immersive ${className}`}
    >
      <h2 className="max-w-[24ch] text-[clamp(1.5rem,4.5vw,2rem)] leading-tight">
        {titre}
      </h2>
      <p className="mt-4 max-w-[62ch] leading-relaxed text-on-immersive-soft">
        {children}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link className="btn btn-sun" href={principal.href}>
          {principal.icone}
          {principal.label}
        </Link>
        {secondaire && (
          /* Posé à la main : le bambou de `LienPage` serait illisible sur
             ce fond. */
          <Link
            className="group flex min-h-11 items-center gap-2.5 text-sm text-on-immersive-soft no-underline hover:text-on-immersive"
            href={secondaire.href}
          >
            <span className="underline decoration-[color-mix(in_srgb,var(--on-immersive)_45%,transparent)] underline-offset-4">
              {secondaire.label}
            </span>
            <ArrowRight
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
              className="shrink-0"
            />
          </Link>
        )}
      </div>
    </section>
  );
}
