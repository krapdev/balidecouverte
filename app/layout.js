import { Marcellus, Jost } from "next/font/google";
import "./globals.css";

/* Marcellus : des capitales romaines gravées — la pierre taillée des
   temples plutôt que le serif de magazine. Une seule graisse, ce qui
   force la sobriété.
   Jost : géométrique, calme, tabulaire — texte courant, étiquettes et
   boutons. Deux familles, pas trois : le registre spa vit de retenue. */
const display = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-display",
});
const body = Jost({
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

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2e8" },
    { media: "(prefers-color-scheme: dark)", color: "#10262b" },
  ],
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
