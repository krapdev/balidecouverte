import { Eczar, Mulish } from "next/font/google";
import { ORIGINE, NOM_SITE, TITRE, DESCRIPTION } from "@/lib/site";
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
