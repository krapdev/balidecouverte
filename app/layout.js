import { Bricolage_Grotesque, Newsreader, Space_Mono } from "next/font/google";
import "./globals.css";

/* Grotesque pour les titres, serif pour le texte courant : l'inverse de
   l'habitude, et c'est ce qui sort le site du registre « agence ».
   Bricolage Grotesque a des lettres volontairement irrégulières et un axe
   de chasse — les titres sont resserrés à la main.
   Newsreader tient les longs paragraphes en français sans les durcir.
   Space Mono, pour les coordonnées et les durées, apporte le grain. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
  variable: "--font-display",
});
const body = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
const util = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
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
    { media: "(prefers-color-scheme: light)", color: "#faf1e2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2730" },
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
