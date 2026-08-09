import PageLegale, { Article, Valeur } from "@/components/PageLegale";
import { EDITEUR, HEBERGEUR, ASSURANCE, MEDIATEUR, MAJ } from "@/lib/legal";
import { CONTACT } from "@/lib/data";

export const metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, hébergeur, assurance, données personnelles et médiation — les mentions légales du site balidecouverte.fr.",
  alternates: { canonical: "/mentions-legales" },
  /* `noindex` tant que le document est un brouillon : une page légale
     incomplète indexée est une page légale incomplète opposable. */
  robots: { index: false, follow: true },
};

const ARTICLES = [
  [1, "Éditeur du site"],
  [2, "Directeur de la publication"],
  [3, "Hébergement du site"],
  [4, "Activité et qualification"],
  [5, "Assurance responsabilité civile"],
  [6, "Propriété intellectuelle"],
  [7, "Données personnelles"],
  [8, "Cookies et mesure d'audience"],
  [9, "Liens vers d'autres sites"],
  [10, "Médiation de la consommation"],
  [11, "Droit applicable"],
];

export default function MentionsLegales() {
  return (
    <PageLegale
      titre="Mentions légales"
      chapo={`Qui édite ce site, qui l'héberge, et ce qu'il advient des informations que vous y laissez. Dernière mise à jour : ${MAJ}.`}
      articles={ARTICLES}
    >
      <Article n={1} titre="Éditeur du site">
        <p>
          Le site <b>balidecouverte.fr</b> est édité par :
        </p>
        <dl>
          <div>
            <dt>Nom</dt>
            <dd>{EDITEUR.nom}</dd>
          </div>
          <div>
            <dt>Forme</dt>
            <dd>{EDITEUR.forme}</dd>
          </div>
          <div>
            <dt>Adresse</dt>
            <dd>{EDITEUR.adresse}</dd>
          </div>
          <div>
            <dt>{EDITEUR.identifiantLabel}</dt>
            <dd>
              <Valeur
                v={EDITEUR.identifiant}
                quoi="numéro d'enregistrement indonésien"
              />
            </dd>
          </div>
          <div>
            <dt>Courriel</dt>
            <dd>{EDITEUR.email}</dd>
          </div>
          <div>
            <dt>Téléphone</dt>
            <dd>{EDITEUR.telephone}</dd>
          </div>
        </dl>
      </Article>

      <Article n={2} titre="Directeur de la publication">
        <p>
          {EDITEUR.directeurPublication}, en qualité d&apos;éditeur du site.
        </p>
      </Article>

      <Article n={3} titre="Hébergement du site">
        <p>Le site est hébergé par :</p>
        <dl>
          <div>
            <dt>Hébergeur</dt>
            <dd>
              <Valeur v={HEBERGEUR.nom} quoi="raison sociale de l'hébergeur" />
            </dd>
          </div>
          <div>
            <dt>Adresse</dt>
            <dd>
              <Valeur v={HEBERGEUR.adresse} quoi="adresse postale" />
            </dd>
          </div>
          <div>
            <dt>Téléphone</dt>
            <dd>
              <Valeur v={HEBERGEUR.telephone} quoi="téléphone" />
            </dd>
          </div>
        </dl>
      </Article>

      <Article n={4} titre="Activité et qualification">
        <p>
          {EDITEUR.nom} exerce l&apos;activité de <b>guide touristique privé</b>{" "}
          à Bali, en Indonésie. {EDITEUR.qualification}. {EDITEUR.union}.
        </p>
        <p>
          Les prestations proposées sur ce site sont décrites, ainsi que leurs
          conditions de vente, dans les{" "}
          <a href="/cgv">conditions générales de vente</a>.
        </p>
      </Article>

      <Article n={5} titre="Assurance responsabilité civile professionnelle">
        <dl>
          <div>
            <dt>Assureur</dt>
            <dd>
              <Valeur v={ASSURANCE.assureur} quoi="nom de l'assureur" />
            </dd>
          </div>
          <div>
            <dt>Numéro de police</dt>
            <dd>
              <Valeur v={ASSURANCE.police} quoi="numéro de contrat" />
            </dd>
          </div>
          <div>
            <dt>Étendue de la couverture</dt>
            <dd>
              <Valeur
                v={ASSURANCE.couverture}
                quoi="zone géographique et plafonds"
              />
            </dd>
          </div>
        </dl>
      </Article>

      <Article n={6} titre="Propriété intellectuelle">
        <p>
          L&apos;ensemble des éléments composant ce site — textes,
          illustrations, photographies, mise en page, code — est protégé par le
          droit d&apos;auteur. Toute reproduction ou représentation, totale ou
          partielle, sans autorisation écrite préalable, est interdite.
        </p>
        <p>
          Les noms de lieux, les termes balinais et les informations pratiques
          relèvent du domaine public et ne font l&apos;objet d&apos;aucune
          revendication.
        </p>
      </Article>

      <Article n={7} titre="Données personnelles">
        <p>
          <b>Responsable du traitement :</b> {EDITEUR.nom}, joignable à
          l&apos;adresse {CONTACT.email}.
        </p>
        <p>
          <b>Ce que ce site collecte.</b>{" "}
                Le formulaire « Sur-Mesure » ne
          transmet rien à un serveur : il compose un message dans votre propre
          logiciel de courrier, que vous relisez et envoyez vous-même. Les
          informations que vous y saisissez — prénom, mois de départ, durée,
          nombre de voyageurs, activités choisies — ne quittent votre appareil
          que par le courriel que vous décidez d&apos;envoyer.
        </p>
        <p>
          <b>Ce qui est ensuite traité.</b>{" "}
                Le courriel reçu, et les échanges
          qui le suivent : votre nom, votre adresse électronique, et les
          éléments nécessaires à l&apos;organisation du voyage.
        </p>
        <ul>
          <li>
            <b>Finalité</b> — répondre à votre demande, établir un devis et,
            le cas échéant, organiser et exécuter le voyage.
          </li>
          <li>
            <b>Base légale</b> — votre demande, puis l&apos;exécution du
            contrat.
          </li>
          <li>
            <b>Destinataires</b> — {EDITEUR.nom} seul, et les prestataires
            strictement nécessaires à votre voyage lorsqu&apos;il y en a
            (hôtel, compagnie de bateau).
          </li>
          <li>
            <b>Durée de conservation</b> — trois ans à compter du dernier
            échange pour une demande sans suite ; la durée légale de
            conservation des pièces comptables pour un voyage réalisé.
          </li>
          <li>
            <b>Transfert hors Union européenne</b> — le responsable du
            traitement est établi en Indonésie. Vos données y sont donc
            traitées, hors du cadre du RGPD.
          </li>
        </ul>
        <p>
          <b>Vos droits.</b>{" "}
                Vous disposez d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, de limitation et
          d&apos;opposition, ainsi que du droit à la portabilité de vos
          données. Il s&apos;exerce par simple courriel à {CONTACT.email}. Vous
          pouvez également introduire une réclamation auprès de la Commission
          nationale de l&apos;informatique et des libertés (CNIL), 3 place de
          Fontenoy, 75007 Paris, <span className="break-all">www.cnil.fr</span>.
        </p>
      </Article>

      <Article n={8} titre="Cookies et mesure d'audience">
        <p>
          <b>Ce site ne dépose aucun cookie</b>{" "}
          et n&apos;utilise aucun outil de mesure d&apos;audience ni de traçage publicitaire. Aucune
          bannière de consentement n&apos;est donc nécessaire.
        </p>
        <p>
          Si un outil de mesure devait être ajouté, cette page serait mise à
          jour et un dispositif de recueil du consentement mis en place avant
          tout dépôt.
        </p>
      </Article>

      <Article n={9} titre="Liens vers d'autres sites">
        <p>
          Ce site renvoie vers les pages Facebook et Instagram de {EDITEUR.nom}.
          Ces plateformes appliquent leurs propres politiques de
          confidentialité et de cookies, sur lesquelles l&apos;éditeur
          n&apos;a aucune maîtrise.
        </p>
      </Article>

      <Article n={10} titre="Médiation de la consommation">
        <p>
          Conformément au code de la consommation, tout consommateur a le droit
          de recourir gratuitement à un médiateur en vue de la résolution
          amiable d&apos;un litige. Le médiateur désigné est :
        </p>
        <dl>
          <div>
            <dt>Médiateur</dt>
            <dd>
              <Valeur v={MEDIATEUR.nom} quoi="nom du médiateur" />
            </dd>
          </div>
          <div>
            <dt>Adresse</dt>
            <dd>
              <Valeur v={MEDIATEUR.adresse} quoi="adresse postale" />
            </dd>
          </div>
          <div>
            <dt>Site</dt>
            <dd>
              <Valeur v={MEDIATEUR.site} quoi="adresse du site de saisine" />
            </dd>
          </div>
        </dl>
        <p>
          La saisine du médiateur n&apos;est recevable qu&apos;après une
          réclamation écrite préalable adressée à {CONTACT.email} et restée
          sans réponse satisfaisante.
        </p>
      </Article>

      <Article n={11} titre="Droit applicable">
        <p>
          Le présent site est édité depuis l&apos;Indonésie et s&apos;adresse
          notamment à des voyageurs résidant en France. Conformément au
          règlement européen sur la loi applicable aux obligations
          contractuelles, le consommateur qui a sa résidence habituelle en
          France conserve le bénéfice des dispositions impératives du droit
          français.
        </p>
      </Article>
    </PageLegale>
  );
}
