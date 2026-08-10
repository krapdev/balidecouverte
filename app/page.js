import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutAgus from "@/components/AboutAgus";
import Chemins from "@/components/Chemins";
import Usages from "@/components/Usages";
import Temoignages from "@/components/Temoignages";
import TripBuilder from "@/components/TripBuilder";
import MobileBar from "@/components/MobileBar";
import Footer from "@/components/Footer";
import DonneesStructurees from "@/components/DonneesStructurees";
import RevealObserver from "@/components/RevealObserver";
import PreselectionCircuit from "@/components/PreselectionCircuit";
import Separateur from "@/components/Separateur";

/**
 * Le parcours : qui est Agus, la fourche, le pays qu'on va traverser,
 * ce qu'en disent ceux qui sont partis, puis le message.
 *
 * ⚠️ **Le circuit et les envies ne sont plus ici.** Ils occupaient cinq
 * écrans et demi de mobile, juste sous une fourche qui annonçait deux
 * chemins — et les déroulait tous les deux immédiatement. Une fourche
 * qui ne coupe rien n'est pas une fourche : c'est un sommaire décoratif
 * posé au-dessus de son propre contenu. Le clic mène désormais à
 * `/circuit` et à `/envies`, et le choix redevient un choix.
 *
 * Ce que ça exige en retour, et qui n'est pas négociable : **les deux
 * cartes doivent montrer, pas annoncer.** Un chiffre, un prix, un temps
 * fort. Sinon on a remplacé deux sections riches par deux boutons, et
 * quelqu'un qui descend sans cliquer ne voit plus rien de ce qu'Agus
 * sait faire.
 *
 * Le fond alterne à chaque section — ivoire, sable, bambou, ivoire,
 * sable — et ce n'est pas un caprice : deux sections de même fond qui se
 * touchent se lisent comme une seule, très longue.
 *
 * Bali seulement. Les autres îles sont sorties du parcours le temps de
 * le recentrer — voir lib/data.js.
 */
/**
 * Le séparateur, **à cheval sur la frontière** entre deux sections.
 *
 * ⚠️ Il était posé DANS la section qu'il ouvrait, sur le fond de
 * celle-ci. La raison tenait : les fonds alternent, et un séparateur
 * laissé dans l'intervalle serait tombé dans une bande nue. La couture à
 * cheval règle le même problème autrement — elle **est** l'intervalle :
 * sa moitié haute porte le fond d'avant, sa moitié basse celui d'après,
 * et la fleur se pose exactement sur la ligne qui les sépare.
 *
 * C'est ce que fait un délimiteur : il n'appartient à aucun des deux
 * côtés. Là où les deux fonds sont identiques — la fourche et le
 * formulaire, qui forment une même séquence — la frontière est
 * invisible et la fleur devient la seule séparation. C'est voulu.
 */
function Couture({ avant, apres }) {
  return (
    <div className="relative" aria-hidden="true">
      {/* ⚠️ **Le plancher du clamp gouvernait tout le mobile.** À 1,75rem
          il valait 28 px, alors que 4,5vw n'en fait que 17,6 à 390 : la
          couture mesurait 56 px de haut sur un écran de téléphone, soit
          plus qu'à 1280 en proportion de la page. Descendu à 0,9rem, le
          vw reprend la main sous 620 px et l'espace suit la largeur. */}
      <div className={`${avant} h-[clamp(0.9rem,4.5vw,2.5rem)]`} />
      <div className={`${apres} h-[clamp(0.9rem,4.5vw,2.5rem)]`} />
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="shell w-full">
          <Separateur />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <DonneesStructurees />
      <RevealObserver />
      {/* Reçoit la sélection venue de /circuit par `?circuit=`. */}
      <PreselectionCircuit />
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/* ⚠️ **La seule frontière du site qui n'avait pas sa couture.**
            Le hero touchait la présentation directement, et le passage du
            vert profond à l'ivoire se faisait à cru — c'était le seul
            endroit où l'on changeait de monde sans que rien ne le dise.
            La moitié haute porte donc le fond du hero. */}
        <Couture avant="bg-immersive-deep" apres="ground-ivoire" />
        <AboutAgus />
        {/* ⚠️ **La couture ouvre la section, elle ne se pose pas entre
            deux.** Les fonds alternent — ivoire, sable, bambou, ivoire,
            sable — et un séparateur posé dans l'intervalle tomberait sur
            le fond de la page, c'est-à-dire dans une bande nue entre deux
            bandes colorées. Chaque `<Couture>` porte donc le fond de la
            section qu'elle introduit.

            Le `Divider` en bambou qui vivait ici n'apparaissait qu'une
            fois sur tout le site : un motif qui ne sert qu'une fois n'est
            pas un motif, c'est une exception. Il est remplacé par
            `<Separateur>`, en bougainvillier, et il est partout. */}
        <Couture avant="ground-ivoire" apres="ground-sable" />
        <Chemins />
        {/* ⚠️ **Le formulaire remonte juste après la fourche.** L'ordre
            était fourche → usages → témoignages → formulaire ; il est
            maintenant fourche → formulaire. On choisit son chemin, puis
            on écrit : les deux gestes se suivent au lieu d'être séparés
            par deux écrans de lecture.
            Ce que ça coûte : les témoignages passent APRÈS la demande.
            La preuve sociale travaille au moment du doute, et le doute
            est juste avant d'écrire à un inconnu à 12 000 km — elle est
            donc moins bien placée qu'avant. Arbitrage assumé, pas
            oubli. */}
        <Couture avant="ground-sable" apres="ground-sable" />
        <TripBuilder />
        <Couture avant="ground-sable" apres="ground-ivoire" />
        <Usages />
        <Couture avant="ground-ivoire" apres="ground-sable" />
        <Temoignages />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
