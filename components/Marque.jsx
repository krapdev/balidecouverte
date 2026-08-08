/**
 * La marque de Bali Découverte — le vrai logo d'Agus, sans son texte.
 *
 * Le tracé vit dans `public/logo.svg`, vectorisé depuis le PNG qu'Agus a
 * fourni. **Ce n'est plus un redessin.** Une version dessinée à la main
 * a occupé cette place le temps qu'un fichier propre existe ; elle est
 * dans l'historique git, et il n'y a aucune raison d'y revenir — le
 * fichier source rend la simplification inutile.
 *
 * ## Pourquoi un `<img>` et non un SVG en ligne
 *
 * Le reste des dessins du site est inliné, et c'est le bon choix pour
 * eux : ce sont des symboles de quelques centaines d'octets qui héritent
 * de `currentColor`. Le logo est l'inverse des deux :
 *
 *  - **Il pèse 80 ko** (28,6 une fois compressé). Inliné, il repartirait
 *    dans le HTML des huit pages, à chaque visite. En fichier, le
 *    navigateur le télécharge une fois et le garde en cache.
 *  - **Il ne doit hériter d'aucune couleur.** Un logo garde les siennes
 *    partout — c'est ce qui en fait un logo. `currentColor` serait ici
 *    un défaut, pas une fonctionnalité.
 *
 * `alt=""` et `aria-hidden` : le nom « Bali Découverte » est écrit en
 * toutes lettres juste à côté, dans le même lien. Un texte de
 * remplacement le ferait annoncer deux fois de suite.
 *
 * ⚠️ **Les dimensions sont posées en attributs, et la hauteur est
 * calculée.** Sans `width`/`height`, le navigateur réserve zéro pixel
 * jusqu'à ce que le fichier arrive et toute la barre saute à son
 * arrivée — un décalage de mise en page sur chaque page. Et le logo
 * **n'est pas carré** : son `viewBox` fait 512 × 519. Poser `height =
 * size` l'écraserait de 1,4 %, ce qui ne se voit pas mais réserve la
 * mauvaise boîte. D'où le rapport, tenu ici et nulle part ailleurs.
 */
const RATIO = 519 / 512;

export default function Marque({ size = 38, className = "" }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/logo.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={Math.round(size * RATIO)}
      className={`shrink-0 ${className}`}
    />
  );
}
