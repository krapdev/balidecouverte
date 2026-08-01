import { Fraunces, Karla, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* Fraunces : serif « molle », taillée main — l'artisanat, pas le luxe froid.
   Karla : grotesque humaniste, un peu bancale, qui n'assèche pas le français.
   IBM Plex Mono : coordonnées, durées, aperçu du message. */
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});
const body = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
const util = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-util",
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

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#101d16" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${util.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
