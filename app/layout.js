import { Eczar, Mulish, Kadwa } from "next/font/google";
import { TripProvider } from "@/lib/trip-store";
import { ORIGINE, NOM_SITE, TITRE, DESCRIPTION, INDEXABLE } from "@/lib/site";
import Ancres from "@/components/Ancres";
import "./globals.css";

/* Eczar : dessinée pour accompagner le devanagari, elle porte une énergie
   de manuscrit qui renvoie à la racine hindoue de Bali — loin de la
   capitale romaine des brochures d'hôtel.
   Mulish : humaniste, douce, très lisible sur fond sombre. Son italique
   sert les moments de rêverie, qu'Eczar ne sait pas porter. */
const display = Eczar({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});
/**
 * ⚠️ **Kadwa ne sert QU'au logotype**, pas aux titres.
 *
 * La demande était « une police plus traditionnelle Bali ». Le piège est
 * connu : les polices vendues sous le nom « Bali » imitent l'aksara
 * balinais en alphabet latin et donnent du bar à cocktails — illisibles,
 * et fausses, puisqu'elles miment une écriture qu'elles n'écrivent pas.
 *
 * La voie honnête est de prendre une police **dessinée pour une écriture
 * brahmique**, dont le latin porte la trace du même ductus. Six ont été
 * comparées côte à côte, à la taille réelle, sur le fond réel de la
 * barre : Eczar, Rozha One, Yatra One, Chonburi, Trirong, Kadwa.
 *
 * Kadwa gagne sur trois points. Elle porte le **trait horizontal
 * supérieur** du devanagari — la caractéristique visuelle la plus proche
 * de l'aksara balinais. C'est une linéale à empattements carrés, donc
 * elle tient à 20 px là où une display à fort contraste se disloque. Et
 * elle ne coûte que **+10 % de largeur** contre Eczar : Chonburi, plus
 * frappante, en coûtait +24 %, ce qui ferait sauter le budget de la barre
 * qu'on vient tout juste d'équilibrer.
 *
 * **Un logotype a le droit d'avoir sa propre police.** Les titres restent
 * en Eczar, dont le choix est défendu ci-dessus et dans le README.
 */
const logotype = Kadwa({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-logo",
});

const body = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata = {
  /* Sans metadataBase, Next ne peut pas fabriquer d'URL absolue : les
     canoniques et les images de partage sortent en relatif, et les
     réseaux sociaux ne savent pas les résoudre. */
  metadataBase: new URL(ORIGINE),
  title: {
    default: TITRE,
    /* Les pages déclarent un titre court, le gabarit ajoute la marque —
       sans quoi chaque page répète « Bali Découverte » à la main et
       finit par diverger. */
    template: `%s — ${NOM_SITE}`,
  },
  description: DESCRIPTION,
  applicationName: NOM_SITE,
  authors: [{ name: "Agus Yudiarta" }],
  creator: "Agus Yudiarta",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: NOM_SITE,
    title: TITRE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITRE,
    description: DESCRIPTION,
  },
  /* ⚠️ **Piège de Next à connaître avant d'y toucher : les métadonnées
     d'une page REMPLACENT celles du gabarit, elles ne s'y ajoutent pas.**
     Une page qui déclare son propre `robots` — /agus, /cgv et
     /mentions-legales le font, toutes trois en `index: false` — ne verra
     jamais cette valeur-ci. Ça tombe bien dans ce sens (elles sont plus
     restrictives), mais si une page déclarait un jour `index: true`, elle
     s'indexerait **même en préproduction**. Le garde-fou est ici, il
     n'est pas hérité de force. */
  robots: INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
      }
    : { index: false, follow: false, nocache: true },
};

/* La direction est solaire et n'a pas d'envers : `globals.css` déclare
   `color-scheme: light`. Le layout annonçait pourtant `dark` et un thème
   #061520 — vestiges de la direction nocturne abandonnée en cours de
   route. Ce n'était pas cosmétique : `color-scheme: dark` fait rendre au
   navigateur ses propres contrôles en sombre — c'est-à-dire les
   `<select>` du configurateur et l'ascenseur — et colorait la barre du
   navigateur mobile en bleu nuit au-dessus d'une page ivoire. */
export const viewport = {
  themeColor: "#476635",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${logotype.variable} antialiased`}
    >
      {/* ⚠️ Le `TripProvider` est ici, et non dans la page d'accueil.
          C'est ce qui rend possible le découpage en pages : depuis que
          les envies vivent sur `/envies` et le circuit sur `/circuit`,
          cocher une place puis revenir au formulaire **traverse une
          navigation**. Un provider posé dans une page est recréé à
          chaque changement de route ; posé dans le gabarit, il survit
          aux navigations client — c'est-à-dire à tous les liens du
          site.
          Limite connue, et assumée pour l'instant : un **rechargement
          complet** vide la sélection. Le jour où ça gêne, la réponse
          n'est pas de déplacer le provider mais de le doubler d'un
          `sessionStorage`. */}
      <body className="flex min-h-screen flex-col">
        {/* Un écouteur délégué, aucun balisage : il rend tous les liens
            d'ancre du site rapides, y compris ceux des composants
            serveur comme le bouton du hero. Voir `lib/ancre.js`. */}
        <Ancres />
        <TripProvider>{children}</TripProvider>
      </body>
    </html>
  );
}
