import Link from "next/link";
import {
  Users,
  CalendarDays,
  MoonStar,
  Car,
  Check,
  X as Croix,
  Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import RetourLien from "@/components/RetourLien";
import { Symbole } from "@/components/Symboles";
import { CIRCUITS } from "@/lib/data";
import { CADRE, JOURS, COMPRIS, NON_COMPRIS } from "@/lib/circuit";

/**
 * La fiche détaillée du circuit — le jour par jour.
 *
 * Pourquoi une page et pas un dépliant sur l'accueil : quinze journées
 * détaillées font huit écrans de défilement. Sur l'accueil, elles
 * passeraient entre quelqu'un qui n'a pas encore décidé et la suite du
 * parcours. Ici, on n'arrive que si on veut savoir — et alors on veut
 * tout savoir, pas un résumé de plus.
 *
 * Le programme n'est **pas** un formulaire de réservation, et la page ne
 * doit jamais le devenir. Elle se termine comme le reste du site : par
 * un message à écrire, où l'on dit ce qu'on garde et ce qu'on jette.
 */

export const metadata = {
  title: "Le circuit de 15 jours à Bali, jour par jour",
  description:
    "Le programme complet du circuit de quinze jours d'Agus Yudiarta : sept étapes, quatorze jours guidés, ce que le prix comprend et ce qu'il ne comprend pas.",
  alternates: { canonical: "/circuit" },
  /* ⚠️ Déclarer `openGraph` dans une page **remplace** celui du layout,
     il ne le complète pas — /tarifs y avait perdu son type et son image
     sans que rien ne le signale. */
  openGraph: {
    type: "article",
    locale: "fr_FR",
    url: "/circuit",
    siteName: "Bali Découverte",
    title: "Le circuit de 15 jours à Bali, jour par jour",
    description:
      "Sept étapes, quatorze jours guidés, et le détail de ce que le prix comprend.",
  },
};

function Chiffre({ icon: Icon, label, valeur }) {
  return (
    <div className="flex items-start gap-3 rounded-[12px] border border-rule bg-surface p-4">
      <Icon size={17} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.7} />
      <span>
        <span className="label block text-faint">{label}</span>
        <span className="text-sm leading-snug">{valeur}</span>
      </span>
    </div>
  );
}

export default function PageCircuit() {
  const c = CIRCUITS[0];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="shell pt-[clamp(5.5rem,12vw,7rem)]">
          <RetourLien />
        </div>

        <div className="ground-ivoire band pt-[clamp(1.5rem,4vw,2.5rem)]">
          <div className="shell">
            <p className="label text-eyebrow">Le circuit, en entier</p>
            <h1 className="mt-2 max-w-[18ch] text-[clamp(2rem,6vw,3rem)] leading-[1.05]">
              Quinze jours, jour par jour.
            </h1>
            <p className="mt-5 max-w-[64ch] text-lg leading-relaxed text-soft">
              Voici le programme tel que je le conduis. Il n&apos;est pas là
              pour être signé : il est là pour que vous sachiez exactement ce
              que vous achetez, et pour que vous puissiez me dire ce que vous
              voulez en retirer. {CADRE.degressif}
            </p>

            <div className="mt-8 overflow-hidden rounded-[18px] border border-rule">
              <Photo
                scene={c.scene}
                uid="circuit-detail"
                brief="une vue large du circuit — rizières de Sidemen ou de Jatiluwih"
                alt="Les rizières en terrasses traversées par le circuit"
                className="w-full"
                ratio="aspect-[21/9]"
              />
            </div>

            {/* ---------- Le cadre du devis ---------- */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Chiffre icon={Users} label="Base du devis" valeur={CADRE.personnes} />
              <Chiffre
                icon={CalendarDays}
                label="Durée"
                valeur={`${CADRE.jours} jours, dont ${CADRE.joursGuides} en ma compagnie`}
              />
              <Chiffre icon={MoonStar} label="Nuits" valeur={`${CADRE.nuits} nuits, 7 étapes`} />
              <Chiffre icon={Car} label="Véhicule" valeur={CADRE.vehicule} />
            </div>

            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4 rounded-[14px] border border-accent bg-tint/70 p-5">
              <span>
                <span className="label block text-eyebrow">
                  Activités, transport et chauffeur-guide francophone
                </span>
                <span className="mt-1 block font-display text-[1.5rem] leading-tight tabular-nums">
                  {c.prixDeux} pour deux
                </span>
                <span className="block text-sm text-soft">
                  soit {c.prixPers} par personne — hébergements non compris
                </span>
              </span>
              <span className="text-sm text-soft">
                Devis établi pour&nbsp;: {CADRE.periode.toLowerCase()}.
              </span>
            </div>

            {/* ---------- Les étapes ---------- */}
            <section className="mt-[clamp(3rem,8vw,4.5rem)]" id="etapes">
              <div className="flex items-center gap-3.5 border-b border-rule pb-4">
                <Symbole nom="candi" size={30} className="shrink-0 text-accent" />
                <h2 className="text-[clamp(1.375rem,4vw,1.75rem)] leading-tight">
                  Où vous dormez
                </h2>
              </div>
              <ol className="m-0 mt-5 flex list-none flex-col p-0">
                {c.etapes.map((e) => (
                  <li
                    key={e.lieu}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-3 last:border-0"
                  >
                    <span>
                      <span className="font-semibold">{e.lieu}</span>
                      <span className="ml-2 text-sm text-soft">{e.region} de Bali</span>
                    </span>
                    <span className="label shrink-0 tabular-nums text-faint">
                      {e.nuits} {e.nuits > 1 ? "nuits" : "nuit"}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* ---------- Le jour par jour ---------- */}
            <section className="mt-[clamp(3rem,8vw,4.5rem)]" id="jour-par-jour">
              <div className="flex items-center gap-3.5 border-b border-rule pb-4">
                <Symbole nom="penjor" size={30} className="shrink-0 text-accent" />
                <h2 className="text-[clamp(1.375rem,4vw,1.75rem)] leading-tight">
                  Le jour par jour
                </h2>
              </div>

              <ol className="m-0 mt-6 flex list-none flex-col gap-6 p-0">
                {JOURS.map((d) => (
                  <li
                    key={d.j}
                    id={`jour-${d.j}`}
                    /* La colonne du numéro est fixe : sans elle, « 1 » et
                       « 15 » ne s'alignent pas et la liste ondule. */
                    className="grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-2 border-b border-rule pb-6 last:border-0 sm:grid-cols-[3.5rem_1fr]"
                  >
                    <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-[0.08em] tabular-nums text-eyebrow">
                      Jour
                      <span className="mt-0.5 block font-display text-[1.5rem] font-normal leading-none tracking-normal text-ink">
                        {d.j}
                      </span>
                    </span>
                    <div>
                      <h3 className="text-[1.15rem] leading-snug">{d.titre}</h3>
                      <ul className="m-0 mt-2.5 flex list-none flex-col gap-2 p-0">
                        {d.etapes.map((e) => (
                          <li
                            key={e}
                            className="flex gap-2.5 text-sm leading-relaxed text-soft"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            />
                            {e}
                          </li>
                        ))}
                      </ul>
                      {d.nuit && (
                        <p className="label mt-3 flex items-center gap-2 text-faint">
                          <MoonStar size={13} className="shrink-0" />
                          Nuit à {d.nuit}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ---------- Le prix, en détail ---------- */}
            <section className="mt-[clamp(3rem,8vw,4.5rem)]" id="ce-que-comprend-le-prix">
              <div className="flex items-center gap-3.5 border-b border-rule pb-4">
                <Symbole nom="poleng" size={30} className="shrink-0 text-accent" />
                <h2 className="text-[clamp(1.375rem,4vw,1.75rem)] leading-tight">
                  Ce que le prix comprend
                </h2>
              </div>
              <p className="mt-4 max-w-[64ch] leading-relaxed text-soft">
                Cette liste est longue, et c&apos;est l&apos;argument : tant
                qu&apos;on ne l&apos;a pas lue, {c.prixPers} par personne se
                compare à une location de voiture. Une fois lue, non.
              </p>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <ul className="m-0 flex list-none flex-col gap-2.5 rounded-[14px] border border-rule bg-surface p-5">
                  {COMPRIS.map((x) => (
                    <li key={x} className="flex gap-3 text-sm leading-relaxed">
                      <Check
                        size={15}
                        className="mt-1 shrink-0 text-accent"
                        strokeWidth={2.2}
                      />
                      {x}
                    </li>
                  ))}
                </ul>
                <ul className="m-0 flex list-none flex-col gap-2.5 self-start rounded-[14px] border border-rule bg-surface-alt p-5">
                  <li className="label pb-1 text-eyebrow">Non compris</li>
                  {NON_COMPRIS.map((x) => (
                    <li key={x} className="flex gap-3 text-sm leading-relaxed">
                      <Croix
                        size={15}
                        className="mt-1 shrink-0 text-eyebrow"
                        strokeWidth={2.2}
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ---------- La sortie ---------- */}
            <section className="mt-[clamp(3rem,8vw,4.5rem)] rounded-[18px] bg-immersive px-[clamp(1.5rem,5vw,3rem)] py-[clamp(2rem,6vw,3rem)] text-on-immersive">
              <h2 className="max-w-[24ch] text-[clamp(1.5rem,4.5vw,2rem)] leading-tight">
                Maintenant, dites-moi ce que vous en gardez.
              </h2>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-on-immersive-soft">
                Ce programme est un point de départ, pas un produit. On enlève
                une journée de temples, on rallonge Munduk, on ajoute Nusa
                Penida, on supprime le rafting : dites-le-moi et je refais le
                compte. Si vous préférez n&apos;avoir à penser à rien, je
                choisis et je réserve aussi vos hôtels.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link className="btn btn-sun" href="/#sur-mesure">
                  <Mail size={17} />
                  Partir de ce circuit et l&apos;ajuster
                </Link>
                <Link
                  className="flex min-h-11 items-center text-sm text-on-immersive-soft underline decoration-[color-mix(in_srgb,var(--on-immersive)_35%,transparent)] underline-offset-4 hover:text-on-immersive"
                  href="/tarifs?de=circuit"
                >
                  Les trois façons de compter
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
