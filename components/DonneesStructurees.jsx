import { ORIGINE, NOM_SITE, DESCRIPTION } from "@/lib/site";
import { AGUS, CIRCUITS, CONTACT, WHATSAPP_DISPLAY, TARIFS } from "@/lib/data";
import { TEMOIGNAGES } from "@/lib/temoignages";

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
 *    `lib/data.js` et de `lib/temoignages.js`. Les avis sont les vrais
 *    témoignages du livre d'or, un `Review` par voyageur.
 *
 *    **Toujours pas de `aggregateRating`, et toujours pas de
 *    `reviewRating`.** Ces témoignages sont des textes, pas des notes :
 *    personne n'a mis d'étoiles. Leur en attribuer, même en déduisant
 *    « visiblement cinq sur cinq » du ton, serait fabriquer une donnée
 *    que personne n'a produite — un mensonge, et une infraction aux
 *    règles de Google sanctionnée par la perte des résultats enrichis.
 *    Conséquence assumée : pas d'étoiles dans les résultats de
 *    recherche. Les avis restent dans le graphe comme contenu, ce qui
 *    est déjà ce pour quoi ils sont là.
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
        review: TEMOIGNAGES.map((t) => ({
          "@type": "Review",
          author: { "@type": "Person", name: t.auteur },
          reviewBody: t.texte,
          inLanguage: "fr",
          itemReviewed: { "@id": `${ORIGINE}/#entreprise` },
        })),
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
      /* Le circuit, maintenant qu'il a sa page et son programme complet.
         `TouristTrip` est le type que Google attend pour un itinéraire ;
         `itinerary` reprend les sept étapes **affichées** sur la page —
         la règle « rien qui ne soit visible » vaut ici aussi. Le prix
         est celui du forfait pour deux, avec son unité écrite en toutes
         lettres : sans elle, un moteur lit 2420 € par personne. */
      {
        "@type": "TouristTrip",
        "@id": `${ORIGINE}/circuit#circuit`,
        name: "Circuit de 15 jours à Bali avec chauffeur-guide francophone",
        url: `${ORIGINE}/circuit`,
        description:
          "Quinze jours à travers Bali, dont quatorze guidés par Agus Yudiarta : sept étapes, rizières, temples, rafting sur l'Ayung, cours de cuisine chez l'habitant et sortie aux dauphins.",
        inLanguage: "fr",
        provider: { "@id": `${ORIGINE}/#entreprise` },
        touristType: "Voyageurs francophones",
        itinerary: {
          "@type": "ItemList",
          numberOfItems: CIRCUITS[0].etapes.length,
          itemListElement: CIRCUITS[0].etapes.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Place", name: `${e.lieu}, Bali` },
          })),
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: CIRCUITS[0].prixDeux.replace(/[^\d]/g, ""),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "EUR",
            price: CIRCUITS[0].prixDeux.replace(/[^\d]/g, ""),
            unitText:
              "pour deux voyageurs, activités, transport et chauffeur-guide francophone compris, hébergements non compris",
          },
        },
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
