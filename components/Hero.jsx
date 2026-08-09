import { JepunBranch } from "./Scene";
import Photo from "./Photo";
import Diaporama from "./Diaporama";

/**
 * Le hero — et, depuis le retrait de la bibliothèque d'animation, un
 * **composant serveur**. Il n'avait besoin du client que pour sa
 * cascade d'entrée ; celle-ci est devenue une animation CSS
 * (`.monte`) dont le retard est posé en ligne, un cran par enfant.
 *
 * Différence assumée : l'animation part à l'affichage et non à
 * l'hydratation. Elle est donc **plus tôt**, ce qui est mieux — et elle
 * ne dépend plus du JavaScript.
 */
const cran = (n) => ({ animationDelay: `${0.05 + n * 0.09}s` });

/**
 * Les trois photos du diaporama.
 *
 * ⚠️ **Les légendes ne nomment aucun lieu**, et c'est délibéré. Le temple
 * et la cascade sont reconnaissables pour qui connaît l'île, mais je ne
 * peux pas les identifier avec certitude — et une légende qui nomme le
 * mauvais temple sur le site d'un guide balinais est pire qu'une légende
 * qui décrit. Le jour où Agus les nomme, elles se précisent.
 *
 * `position` : les trois n'ont pas le même format — 16/9 pour les
 * rizières, 4/3 pour les deux autres — et le cadre est un bandeau.
 * Recadrées au centre, le temple perdait sa tour et la cascade sa chute.
 *
 * ⚠️ **Les deux fichiers ont été produits inversés une première fois**, en
 * associant le nom au fichier source d'après sa date de téléversement.
 * `bali-cascade` contenait le temple. Le DOM était juste, l'opacité était
 * juste, le composant marchait — et le lecteur d'écran aurait annoncé
 * « une cascade dans la jungle » sur une photo de temple.
 * **Ce genre d'erreur ne se voit qu'en regardant les fichiers produits**,
 * jamais en relisant le code qui les produit. Après toute génération
 * d'images : en faire une planche et l'ouvrir.
 */
/* ⚠️ **Chaque cran s'arrête à la largeur native de son fichier** — 1672
   pour les rizières, 1447 pour les trois autres — et jamais au gabarit du
   voisin. Deux fichiers ont porté `1600w` pour une source de 1447 : le
   navigateur téléchargeait donc *plus lourd* pour une image *moins nette*,
   le pire des deux mondes. Un descripteur `w` décrit le fichier.

   ⚠️ **Le plafond de netteté est la source, pas l'encodage.** Le cadre fait
   1084 px CSS ; un écran à DPR 2 en réclame 2168 et le meilleur fichier en
   offre 1600 — le navigateur agrandit de 35 %, et de 103 % à DPR 3. Aucun
   réglage de compression ne rattrape ça : il faut des originaux d'au moins
   2400 px. Les fichiers actuels plafonnent à 1447–1672, largeurs typiques
   d'une photo passée par une messagerie. */
/* 1084 px et non 1136 : c'est la largeur mesurée du cadre, identique à
   1280 comme à 1440 puisque la coquille est plafonnée. Annoncer 52 px de
   trop faisait franchir un cran à certains écrans pour rien. */
const SIZES = "(min-width: 1280px) 1084px, 92vw";
const PHOTOS = [
  {
    src: "/bali-rizieres.jpg",
    webp: "/bali-rizieres-640.webp 640w, /bali-rizieres-1000.webp 1000w, /bali-rizieres-1672.webp 1672w",
    sizes: SIZES,
    alt: "Rizières en terrasses et bale traditionnel sous les cocotiers, dans l'intérieur de Bali",
  },
  {
    src: "/bali-temple.jpg",
    webp: "/bali-temple-640.webp 640w, /bali-temple-1000.webp 1000w, /bali-temple-1447.webp 1447w",
    sizes: SIZES,
    position: "center 38%",
    alt: "Un temple balinais et son escalier gardé par des naga, sous les parasols dorés",
  },
  {
    src: "/bali-cascade.jpg",
    webp: "/bali-cascade-640.webp 640w, /bali-cascade-1000.webp 1000w, /bali-cascade-1447.webp 1447w",
    sizes: SIZES,
    position: "center 45%",
    alt: "Une cascade en rideau dans la jungle, et son bassin d'eau turquoise",
  },
  {
    src: "/bali-plage.jpg",
    webp: "/bali-plage-640.webp 640w, /bali-plage-1000.webp 1000w, /bali-plage-1447.webp 1447w",
    sizes: SIZES,
    position: "center 55%",
    alt: "Une plage de sable clair bordée d'arbres, son eau turquoise et deux bateaux à l'ancre",
  },
];

export default function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-immersive-deep text-on-immersive"
      >
        <div className="absolute inset-0">
          <Photo
            scene="terraces"
            uid="hero"
            ratio="h-full"
            priority
            className="h-full w-full"
            alt="Rizières en terrasses de Sidemen au lever du jour"
          />
        </div>
        {/* Le voile garde le texte lisible ; le halo, lui, est la lumière
            de l'aube qui monte derrière la vallée. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--immersive-deep)_26%,transparent)_0%,color-mix(in_srgb,var(--immersive-deep)_78%,transparent)_14%,color-mix(in_srgb,var(--immersive-deep)_86%,transparent)_34%,var(--immersive-deep)_72%)]"
          aria-hidden="true"
        />
        <div
          className="glow left-[52%] top-[46%] h-[46vh] w-[46vh] opacity-70"
          style={{ "--glow-blur": "120px" }}
          aria-hidden="true"
        />

        {/* Décalée vers la droite : elle mordait sur le titre au lieu de
          le border. `-right-10` la sort partiellement du cadre, ce que
          `overflow-hidden` de la section rattrape — c'est voulu, une
          branche qui s'arrête net au bord se lit comme un autocollant. */}
        <JepunBranch className="pointer-events-none absolute -top-4 -right-10 z-[1] w-[min(52vw,440px)] opacity-90 sm:-right-16" />

        <div className="shell relative z-10 flex min-h-[min(88vh,780px)] flex-col items-start justify-end gap-6 pb-[clamp(3rem,9vw,5.5rem)] pt-[clamp(3.5rem,12vw,7rem)]">
          {/* ⚠️ **La ligne « Sidemen · Munduk · Est de Bali » a été
              retirée.** Elle nommait trois lieux avant que le lecteur
              sache de quoi on parle : à cet endroit, trois noms de
              villages balinais ne situent rien pour quelqu'un qui n'y est
              jamais allé — ils demandent au contraire un effort au
              moment où la page devrait en épargner un.
              Les trois noms n'ont pas disparu du site : le bandeau
              défilant sous le hero les fait passer, et le circuit les
              détaille. */}
          <h1
            style={cran(1)}
            className="monte max-w-[15ch] text-[clamp(2.5rem,8.5vw,4.75rem)] tracking-[-0.03em]"
          >
            Bali loin des sentiers battus. Votre guide local{" "}
            <em className="italic text-soleil">francophone</em> privé.
          </h1>

          {/* La phrase disait : « Circuits 100 % sur-mesure, authenticité
              garantie et 0 intermédiaire. » Trois formules de brochure
              en une ligne — et « authenticité garantie » est exactement
              le genre de promesse qu'aucune agence n'a jamais tenue en
              la prononçant. Un chiffre rond ne prouve rien ; une liste
              de choses dont on est déchargé, si.
              Le registre visé : **détendez-vous, je m'occupe de tout**,
              et c'est un homme qui le dit, pas une centrale.

              ⚠️ **La chute a changé, et elle a changé d'argument.** Elle
              disait « c'est à moi que vous écrivez, pas à une agence » ;
              elle dit « je connais bien mon île ». On troque une
              *opposition* contre une *compétence* — et le hero y gagne,
              parce qu'opposer sans preuve, au premier écran, oblige le
              lecteur à croire sur parole quelqu'un qu'il ne connaît pas
              encore. La preuve existe désormais, mais elle est sur
              `/agus`, où il raconte son passage en agence.
              Conséquence à connaître : **le premier écran ne dit plus
              qu'il n'y a pas d'intermédiaire.** L'argument vit dans le
              panneau des valeurs, plus bas sur la même page, et en entier
              sur le portrait. Si le hero devait le redire un jour, ce
              serait la troisième fois. */}
          {/* ⚠️ **Le sous-titre a déménagé dans ce bloc**, il n'est pas
              en double. Poser une photo d'Agus sous un paragraphe qui
              parle déjà à la première personne, puis répéter le
              paragraphe à côté d'elle, aurait fait dire deux fois la
              même promesse à trois centimètres d'écart. Le visage et le
              texte se tiennent maintenant, et c'est plus court qu'avant.

              ⚠️ **Et c'est la deuxième fois que ce visage apparaît sur
              l'accueil** — la présentation, un écran plus bas, porte la
              même photo dans une arche plus grande. C'est assumé mais ce
              n'est pas gratuit : si la page devait maigrir, c'est ici que
              se pose la question, pas dans la présentation. */}
          <div
            style={cran(2)}
            className="monte flex items-center gap-4 sm:gap-5"
          >
            <span className="arch block w-[124px] shrink-0 bg-immersive-deep shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] sm:w-[140px]">
              <Photo
                src="/agus-portrait.jpg"
                sources={[
                  {
                    type: "image/webp",
                    srcSet:
                      "/agus-portrait-600.webp 600w, /agus-portrait.webp 840w",
                  },
                ]}
                sizes="(min-width: 640px) 140px, 124px"
                uid="agus-hero"
                ratio="aspect-[46/50]"
                priority
                alt="Agus Yudiarta sur une plage de galets de l'est de Bali"
                className="w-full"
              />
            </span>
            {/* `text-base` sur mobile et `text-lg` à partir de `sm` : à 390 px,
                le paragraphe tenait sur sept lignes à côté d'un portrait
                de 124 px, et l'écart entre les deux tailles se voit
                surtout là où la colonne est étroite. */}
            <p className="max-w-[46ch] text-base leading-relaxed text-on-immersive-soft sm:text-lg">
              Détendez-vous, je m&apos;occupe de tout : le véhicule, les
              horaires, les entrées, les bons jours pour chaque endroit. Je
              suis balinais et indépendant, je connais bien mon île.
            </p>
          </div>

          {/* Les photos du pays, juste avant l'appel à l'action : on
              montre ce qu'on vend au moment exact où l'on demande de
              cliquer. Trois, en fondu lent — voir components/Diaporama.jsx
              pour les deux règles d'accessibilité qui l'encadrent, et
              pourquoi `object-position` est posé photo par photo. */}
          <div style={cran(3)} className="monte w-full">
            <Diaporama
              className="w-full"
              photos={PHOTOS}
            />
          </div>

          {/* ⚠️ **Le bouton « Créer mon voyage sur-mesure » a été retiré,
              et c'est le seul changement de cette page qui coûte
              quelque chose.** Il était le seul appel à l'action visible
              au premier écran sur mobile depuis que le « Devis » de la
              barre a sauté pour laisser la place au nom du site.

              Ce qui reste comme porte de sortie : « Par où commencer »
              juste ici, qui mène à la fourche et non au formulaire ;
              l'entrée « Demander un devis » du menu ; le formulaire au
              bas de la page ; et la barre du bas, mais **seulement une
              fois une envie cochée**.

              Autrement dit : quelqu'un qui arrive, ne coche rien et ne
              touche pas au menu n'a plus de bouton d'action avant douze
              écrans de défilement. C'est un arbitrage assumé — le hero
              n'est plus une page d'atterrissage publicitaire mais une
              ouverture — et il se répare en une ligne si les demandes
              baissent. */}
          <div style={cran(4)} className="monte flex flex-wrap gap-3">
            <a
              className="btn btn-ivoire btn-lg"
              href="#chemins"
            >
              Par où commencer
            </a>
          </div>

          {/* ⚠️ **Le bandeau « Guide diplômé francophone — professionnel
              depuis octobre 2005, membre d'une union de guides de Bali »
              a été retiré d'ici**, et ce n'est pas une perte de
              réassurance : il faisait doublon avec la ligne « Ce qui se
              vérifie » de la présentation, à un écran et demi de là. Le
              diplôme s'y annonçait donc deux fois avant même qu'on ait
              lu quoi que ce soit sur Agus.
              La règle qui remplace la précédente (« une fois, au premier
              écran ») : **le hero vend ce qu'on va ressentir, la
              présentation donne ce qui se vérifie.** Ne pas remettre de
              preuve ici — ce serait redire, pas rassurer. */}
        </div>
      </section>

      {/* ⚠️ **Le bandeau défilant des étapes a été retiré.** Il faisait
          passer les noms de lieux en boucle sous le hero.

          Deux choses partent avec lui, et il faut le savoir : les noms
          « Sidemen · Munduk · Est de Bali » **ne sont plus nulle part sur
          l'accueil** — la ligne d'accroche qui les portait avait été
          retirée en se justifiant par ce bandeau. Ils vivent maintenant
          uniquement dans `/circuit`. Et `DESTINATIONS` n'a plus aucun
          consommateur : l'export reste dans `lib/data.js` (c'est l'un des
          vingt, ne pas le compter en trop), il n'est simplement plus lu.

          L'animation `drift` de `globals.css` perd elle aussi son seul
          usage. Elle est gardée : c'est six lignes, et c'est la seule
          animation de défilement du site le jour où il en faudrait une. */}
    </>
  );
}
