import { Eczar, Mulish } from "next/font/google";
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
  title: "Bali Découverte — Guide privé francophone à Bali",
  description:
    "Circuits 100 % sur-mesure hors des sentiers battus avec Agus Yudiarta, guide balinais francophone indépendant. Sans intermédiaire, devis en direct sur WhatsApp.",
  openGraph: {
    title: "Bali Découverte — Guide privé francophone à Bali",
    description:
      "Circuits 100 % sur-mesure hors des sentiers battus avec un guide balinais francophone indépendant.",
    locale: "fr_FR",
    type: "website",
  },
};

/* Monde nocturne assumé : la barre du navigateur suit, quel que soit
   le réglage système du visiteur. */
export const viewport = {
  themeColor: "#061520",
  colorScheme: "dark",
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
