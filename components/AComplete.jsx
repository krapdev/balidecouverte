/**
 * Le marqueur de champ manquant.
 *
 * Il vivait dans `PageLegale.jsx` ; il sert maintenant aussi au portrait
 * d'Agus, où l'enjeu est le même : **une case vide se voit, une case
 * inventée ne se voit pas.** Un nom d'association plausible glissé à la
 * place d'un blanc traverse toutes les relectures.
 *
 * Il est volontairement laid. Ce n'est pas un état par défaut élégant à
 * laisser traîner, c'est une alarme.
 */
export function AComplete({ children }) {
  return (
    <mark className="rounded-sm bg-[color-mix(in_srgb,var(--bougain)_18%,transparent)] px-1.5 py-0.5 font-sans text-[0.9em] font-bold text-bougain-ink">
      [à compléter{children ? ` — ${children}` : ""}]
    </mark>
  );
}

/** Une valeur, ou le marqueur si elle manque. */
export function Valeur({ v, quoi }) {
  return v ? <>{v}</> : <AComplete>{quoi}</AComplete>;
}
