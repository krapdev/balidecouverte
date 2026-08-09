import Link from "next/link";
import { Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetourLien from "@/components/RetourLien";
import DonneesStructurees from "@/components/DonneesStructurees";
import RevealObserver from "@/components/RevealObserver";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import { Symbole } from "@/components/Symboles";
import { TEMOIGNAGES, LIVRE_OR } from "@/lib/temoignages";
import { NOM_SITE } from "@/lib/site";
import Separateur from "@/components/Separateur";

const DESCRIPTION = `Les ${LIVRE_OR.nombre} témoignages de voyageurs partis avec Agus Yudiarta, guide privé francophone à Bali, recopiés du livre d'or sans être retouchés.`;

export const metadata = {
  title: "Livre d'or",
  description: DESCRIPTION,
  alternates: { canonical: "/livre-d-or" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/livre-d-or",
    siteName: NOM_SITE,
    title: `Livre d'or — ${NOM_SITE}`,
    description: DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `Livre d'or — ${NOM_SITE}`,
    description: DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
};

/**
 * Le livre d'or en entier.
 *
 * **Pas de formulaire de dépôt.** Celui du site actuel était ouvert à
 * tous, sans modération : sur vingt-deux entrées, quinze étaient du
 * spam, dont plusieurs publicités pour de la fraude bancaire et des faux
 * papiers — hébergées, donc, sur le site d'un guide qui vend de la
 * confiance. Ici les témoignages sont des données du site, et Agus
 * ajoute ce qu'on lui envoie. C'est un geste manuel de plus par an, et
 * une page qui ne peut pas se retourner contre lui.
 *
 * Chaque témoignage garde son paragraphage d'origine : les gens écrivent
 * par élans, et coller leurs phrases en un seul bloc leur retire leur
 * souffle.
 */
export default function LivreDOr() {
  return (
    <>
      <DonneesStructurees />
      <RevealObserver />
      <Navbar />
      <main className="flex-1">
        <div className="shell pt-[clamp(5.5rem,12vw,7rem)]">
          <RetourLien />
        </div>

        <section className="ground-ivoire band pt-[clamp(1.5rem,4vw,2.5rem)]">
          <div className="shell">
            <SectionHead eyebrow="Livre d'or" title={LIVRE_OR.titre} niveau={1}>
              {LIVRE_OR.chapo}
            </SectionHead>

            <ul className="m-0 grid max-w-[80ch] list-none gap-4 p-0">
              {/* ⚠️ La couture tous les trois témoignages, et **dans la
                  liste** : posée entre deux `<li>` elle serait un enfant
                  direct de `<ul>` que le balisage n'autorise pas, et les
                  lecteurs d'écran annonceraient sept éléments là où il y
                  en a sept plus deux ornements. Elle vit donc DANS le
                  `<li>` qu'elle ouvre, sous son `aria-hidden`.
                  Deux coutures sur sept mots : la page fait 7 200 px, on
                  reste au rythme d'une tous les ~2 400. */}
              {TEMOIGNAGES.map((t, i) => (
                <Reveal as="li" key={t.id} delay={(i % 3) * 0.05}>
                  {i > 0 && i % 3 === 0 && (
                    <Separateur className="mb-8 mt-4" />
                  )}
                  <figure className="m-0 rounded-[14px] border border-rule bg-surface p-[clamp(1.25rem,4vw,2rem)]">
                    <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule pb-3.5">
                      <span className="flex items-center gap-3">
                        <Symbole
                          nom="padma"
                          size={22}
                          className="shrink-0 text-accent"
                        />
                        <span className="font-display text-[1.15rem]">
                          {t.auteur}
                        </span>
                      </span>
                      <span className="label text-faint">
                        {t.pays} · {t.quand}
                      </span>
                    </figcaption>
                    <blockquote className="m-0 mt-4 flex flex-col gap-3.5">
                      {t.texte.split("\n\n").map((p, j) => (
                        <p key={j} className="leading-relaxed text-soft">
                          {p}
                        </p>
                      ))}
                    </blockquote>
                  </figure>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <div className="mt-10 max-w-[80ch] rounded-[14px] border border-rule bg-surface-alt p-[clamp(1.25rem,4vw,1.75rem)]">
                <p className="font-display text-xl leading-snug">
                  Vous êtes parti avec moi et vous voulez ajouter un mot ?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-soft">
                  Écrivez-le-moi, je l&apos;ajoute ici tel quel. Cette page
                  n&apos;a pas de formulaire ouvert : l&apos;ancien livre
                  d&apos;or se remplissait tout seul de publicités, et vos mots
                  s&apos;y perdaient au milieu.
                </p>
                <p className="mt-5">
                  <Link className="btn btn-accent" href="/#sur-mesure">
                    <Mail size={16} />
                    M&apos;écrire
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
