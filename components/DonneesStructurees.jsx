import { ORIGINE, NOM_SITE, DESCRIPTION } from "@/lib/site";
import { AGUS, CONTACT, WHATSAPP_DISPLAY, TARIFS } from "@/lib/data";

/**
 * Les données structurées, en JSON-LD.
 *
 * C'est le gain de référencement le plus direct pour un guide local : ce
 * bloc dit à Google **ce qu'est** Agus (une entreprise de tourisme, pas
 * un blog), **où** il exerce, **dans quelles langues**, et **à quel
 * prix**. Sans lui, un moteur doit le deviner à partir du texte.
 *
 * Deux règles, et elles ne sont pas négociables :
 *
 * 1. **Uniquement des faits vérifiés.** Tout ce qui est ici vient de
 *    `lib/data.js`, section « faits relevés sur balidecouverte.fr ». Pas
 *    de `aggregateRating` : nous n'avons aucune note, et en inventer une
 *    est à la fois un mensonge et une infraction aux règles de Google —
 *    sanctionnée par la perte des résultats enrichis. Le jour où le
 *    livre d'or arrivera, les avis viendront ici sous forme de `Review`,
 *    un par témoignage réel.
 * 2. **Rien qui ne soit visible sur la page.** Google exige que le
 *    balisage décrive un contenu réellement affiché. Les prix, les
 *    langues, l'adresse et la zone desservie le sont tous.
 *
 * `geo` : les coordonnées de Denpasar déjà affichées sous le portrait.
 */
export default function DonneesStructurees() {
  const graphe = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["TravelAgency", "LocalBusiness"],
        "@id": `${ORIGINE}/#entreprise`,
        name: NOM_SITE,
        description: DESCRIPTION,
        url: ORIGINE,
        email: CONTACT.email,
        telephone: WHATSAPP_DISPLAY,
        founder: { "@id": `${ORIGINE}/#agus` },
        foundingDate: "2005-10",
        priceRange: "€€",
        currenciesAccepted: "EUR",
        address: {
          "@type": "PostalAddress",
          streetAddress: "JL. Letda Reta Utara No 3",
          postalCode: "80234",
          addressLocality: "Denpasar",
          addressRegion: "Bali",
          addressCountry: "ID",
        },
        geo: { "@type": "GeoCoordinates", latitude: -8.65, longitude: 115.2167 },
        areaServed: { "@type": "AdministrativeArea", name: "Bali" },
        knowsLanguage: ["fr", "en", "id"],
        sameAs: [CONTACT.facebook, CONTACT.instagram],
        makesOffer: TARIFS.saisons.map((s) => ({
          "@type": "Offer",
          name: `Excursion à la journée avec guide francophone — ${s.nom.toLowerCase()}`,
          description: TARIFS.grilleNote,
          priceCurrency: "EUR",
          price: s.prix[0].replace(/[^\d]/g, ""),
          /* Le prix est celui du véhicule et de la journée, pas de la
             tête. `unitText` l'écrit là où un moteur le lira. */
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "EUR",
            price: s.prix[0].replace(/[^\d]/g, ""),
            unitText: "par jour et par véhicule, chauffeur-guide compris",
          },
        })),
      },
      {
        "@type": "Person",
        "@id": `${ORIGINE}/#agus`,
        name: AGUS.nom,
        jobTitle: "Guide touristique francophone diplômé",
        description: `${AGUS.diplome}, professionnel depuis ${AGUS.depuis}. ${AGUS.union}.`,
        knowsLanguage: ["fr", "en", "id"],
        worksFor: { "@id": `${ORIGINE}/#entreprise` },
        homeLocation: { "@type": "Place", name: "Denpasar, Bali" },
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGINE}/#site`,
        url: ORIGINE,
        name: NOM_SITE,
        inLanguage: "fr-FR",
        publisher: { "@id": `${ORIGINE}/#entreprise` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      /* Le contenu vient exclusivement de nos constantes : aucune saisie
         utilisateur ne transite ici. */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphe) }}
    />
  );
}
