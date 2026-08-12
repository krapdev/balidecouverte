import PageLegale, { Article, Valeur, AComplete } from "@/components/PageLegale";
import {
  EDITEUR,
  ASSURANCE,
  GARANTIE,
  MEDIATEUR,
  ANNULATION,
  PAIEMENT,
  MAJ,
} from "@/lib/legal";
import { CONTACT } from "@/lib/data";
import { TARIFS } from "@/lib/data";

export const metadata = {
  title: "Conditions générales de vente",
  description:
    /* 152 caractères ; il en faisait 168 et la coupe tombait dans
       « responsabilité ». */
    "Les conditions de vente des prestations de guidage, de transport et de voyage d'Agus Yudiarta à Bali : devis, prix, paiement, annulation, responsabilité.",
  alternates: { canonical: "/cgv" },
  robots: { index: false, follow: true },
};

const ARTICLES = [
  [1, "Objet et champ d'application"],
  [2, "Le prestataire"],
  [3, "Nature des prestations"],
  [4, "Information précontractuelle et devis"],
  [5, "Formation du contrat"],
  [6, "Prix"],
  [7, "Ce que le prix comprend"],
  [8, "Paiement"],
  [9, "Absence de droit de rétractation"],
  [10, "Modification à la demande du Client"],
  [11, "Annulation par le Client"],
  [12, "Modification ou annulation par le Guide"],
  [13, "Circonstances exceptionnelles et inévitables"],
  [14, "Fêtes religieuses et jours d'arrêt"],
  [15, "Obligations du Client"],
  [16, "Assurances"],
  [17, "Responsabilité"],
  [18, "Réclamations et médiation"],
  [19, "Données personnelles"],
  [20, "Droit applicable et juridiction"],
];

export default function CGV() {
  return (
    <PageLegale
      titre="Conditions générales de vente"
      chapo={`Ce que le Guide s'engage à faire, ce que le Client s'engage à payer, et ce qui se passe quand l'un des deux doit annuler. Dernière mise à jour : ${MAJ}.`}
      articles={ARTICLES}
    >
      <Article n={1} titre="Objet et champ d'application">
        <p>
          Les présentes conditions générales régissent les prestations de
          guidage, de transport et d&apos;organisation de voyage proposées par{" "}
          {EDITEUR.nom} (ci-après « le Guide ») à toute personne qui les
          commande (ci-après « le Client »).
        </p>
        <p>
          Elles sont portées à la connaissance du Client avant la conclusion du
          contrat et leur acceptation conditionne celui-ci. Toute condition
          contraire opposée par le Client est inopposable au Guide, sauf accord
          écrit.
        </p>
      </Article>

      <Article n={2} titre="Le prestataire">
        <dl>
          <div>
            <dt>Identité</dt>
            <dd>
              {EDITEUR.nom} — {EDITEUR.forme}
            </dd>
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
            <dt>Contact</dt>
            <dd>
              {CONTACT.email} · {EDITEUR.telephone}
            </dd>
          </div>
          <div>
            <dt>Assurance responsabilité civile professionnelle</dt>
            <dd>
              <Valeur
                v={ASSURANCE.assureur}
                quoi="assureur, police et étendue"
              />
            </dd>
          </div>
        </dl>
      </Article>

      <Article n={3} titre="Nature des prestations">
        <p>Le Guide propose deux natures de prestations distinctes.</p>
        <p>
          <b>a) La prestation de guidage et de transport seule.</b>{" "}
                Le Guide met
          à disposition un véhicule avec chauffeur-guide francophone, à la
          journée ou sur plusieurs jours, et accompagne le Client sur les sites
          visités. Le Client réserve lui-même son hébergement et contracte
          directement avec les hôteliers. Il s&apos;agit d&apos;un service de
          voyage unique.
        </p>
        <p>
          <b>b) Le voyage incluant l&apos;hébergement.</b> À la demande du
          Client, le Guide peut sélectionner et réserver les hébergements en
          plus du transport et du guidage.{" "}
          <b>
            La combinaison d&apos;un transport et d&apos;un hébergement vendus
            pour un même voyage constitue un forfait touristique
          </b>{" "}
          au sens de la directive européenne 2015/2302 relative aux voyages à
          forfait. Le Client bénéficie alors de la protection attachée à ce
          régime, notamment de la responsabilité de plein droit du Guide sur la
          bonne exécution de l&apos;ensemble des services et d&apos;une
          protection contre l&apos;insolvabilité.
        </p>
        <dl>
          <div>
            <dt>Garantie contre l&apos;insolvabilité</dt>
            <dd>
              <Valeur
                v={GARANTIE.organisme}
                quoi="organisme garant et montant"
              />
            </dd>
          </div>
        </dl>
        <p>
          En l&apos;absence de cette garantie, le Guide ne peut pas vendre de
          voyage incluant l&apos;hébergement à un Client résidant dans
          l&apos;Union européenne. Tant qu&apos;elle n&apos;est pas souscrite,
          seule la prestation décrite au <i>a)</i> est proposée, et la
          réservation des hébergements est faite par le Client lui-même, le
          Guide se limitant à des recommandations.
        </p>
      </Article>

      <Article n={4} titre="Information précontractuelle et devis">
        <p>
          Toute demande donne lieu à un <b>devis écrit et gratuit</b>, adressé
          par courriel, qui précise : l&apos;itinéraire jour par jour, les
          prestations comprises et exclues, le prix total en euros, le
          calendrier de paiement, le barème d&apos;annulation applicable et,
          pour un forfait, les coordonnées de la garantie contre
          l&apos;insolvabilité.
        </p>
        <p>
          Le devis est valable <AComplete>durée de validité du devis</AComplete>{" "}
          à compter de son envoi. Les informations qu&apos;il contient
          prévalent sur les descriptions générales du site en cas de
          divergence.
        </p>
      </Article>

      <Article n={5} titre="Formation du contrat">
        <p>
          Le contrat est formé lorsque le Client accepte le devis par écrit —
          un courriel de confirmation suffit — <b>et</b>{" "}
          que l&apos;acompte prévu à l&apos;article 8 a été reçu. Aucune date n&apos;est bloquée
          avant ces deux conditions.
        </p>
        <p>
          Les échanges antérieurs, y compris le message composé depuis le site,
          n&apos;engagent aucune des deux parties.
        </p>
      </Article>

      <Article n={6} titre="Prix">
        <p>
          Les prix sont exprimés en euros, toutes taxes indonésiennes
          comprises.
        </p>
        <p>
          <b>À la journée</b>, le prix s&apos;entend{" "}
          <b>par jour et par véhicule</b>, et non par personne : il ne varie
          pas selon le nombre de voyageurs à l&apos;intérieur d&apos;une même
          tranche. Il dépend de la saison et de la capacité du véhicule, selon
          le barème publié sur la page <a href="/tarifs">Tarifs</a>.
        </p>
        <p>
          <b>{TARIFS.supplement.titre}</b> — {TARIFS.supplement.montant} sont
          dus pour l&apos;hébergement et les repas du Guide sur place lorsque
          le Client loge dans les régions suivantes :
        </p>
        <ul>
          {TARIFS.supplement.regions.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p>
          <b>En circuit de plusieurs jours</b>, le prix est un forfait global
          par personne, qui réunit le transport, le chauffeur-guide, les
          activités et les entrées.
        </p>
        <p>
          Les prix sont fermes une fois le devis accepté. Ils ne peuvent être
          révisés après la conclusion du contrat, sauf variation du coût des
          transports directement liée au prix des carburants, et seulement
          jusqu&apos;à vingt jours avant le départ ; une hausse supérieure à 8 %
          du prix total ouvre au Client le droit de résilier sans frais.
        </p>
      </Article>

      <Article n={7} titre="Ce que le prix comprend">
        <p>Sauf mention contraire du devis, le prix à la journée comprend :</p>
        <ul>
          {TARIFS.inclus.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p>Il ne comprend pas :</p>
        <ul>
          {TARIFS.exclus.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p>
          Les entrées et activités payantes sont réglées par le Client sur
          place, sauf lorsqu&apos;un forfait de circuit les inclut
          expressément.
        </p>
      </Article>

      <Article n={8} titre="Paiement">
        <p>
          Un acompte de{" "}
          {PAIEMENT.acompteValide ? (
            <b>{PAIEMENT.acompte}</b>
          ) : (
            <AComplete>montant de l&apos;acompte à valider</AComplete>
          )}{" "}
          du prix total est exigible à la conclusion du contrat. Le solde est
          réglé{" "}
          <AComplete>
            échéance du solde : avant le départ, ou en fin de prestation
          </AComplete>
          .
        </p>
        <p>Moyens de paiement acceptés :</p>
        <ul>
          {PAIEMENT.moyens.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p>
          Les frais bancaires de virement international sont à la charge du
          Client. Le défaut de paiement du solde à l&apos;échéance autorise le
          Guide à considérer le contrat comme annulé par le Client, avec
          application du barème de l&apos;article 11.
        </p>
      </Article>

      <Article n={9} titre="Absence de droit de rétractation">
        <p>
          Conformément à l&apos;article L. 221-28 du code de la consommation,{" "}
          <b>
            le droit de rétractation de quatorze jours ne s&apos;applique pas
          </b>{" "}
          aux prestations de transport, d&apos;hébergement et de loisirs
          fournies à une date ou selon une périodicité déterminée. Le Client ne
          dispose donc d&apos;aucun délai de rétractation après acceptation du
          devis. Seul le barème d&apos;annulation de l&apos;article 11
          s&apos;applique.
        </p>
      </Article>

      <Article n={10} titre="Modification à la demande du Client">
        <p>
          Toute demande de modification — dates, durée, itinéraire, nombre de
          voyageurs — est adressée par écrit. Le Guide s&apos;efforce d&apos;y
          répondre favorablement dans la limite des disponibilités.
        </p>
        <p>
          Une modification acceptée donne lieu à un devis rectificatif. Si elle
          entraîne une réduction du nombre de journées ou de voyageurs, elle
          est traitée comme une annulation partielle et le barème de
          l&apos;article 11 s&apos;applique à la part annulée.
        </p>
      </Article>

      <Article n={11} titre="Annulation par le Client">
        <p>
          Toute annulation est notifiée par écrit. La date de réception du
          courriel détermine le palier applicable.
        </p>
        {!ANNULATION.valide && (
          <p>
            <AComplete>
              barème à valider par le Guide — les paliers ci-dessous sont une
              proposition
            </AComplete>
          </p>
        )}
        <dl>
          {ANNULATION.paliers.map((p) => (
            <div key={p.delai}>
              <dt>{p.delai}</dt>
              <dd>
                <b className="text-ink">{p.retenue}</b>
                {p.detail ? ` — ${p.detail}` : ""}
              </dd>
            </div>
          ))}
        </dl>
        <p>
          Les sommes retenues ne peuvent en aucun cas excéder le prix total du
          voyage. Le Client qui a souscrit une assurance annulation en fait son
          affaire directement auprès de son assureur.
        </p>
      </Article>

      <Article n={12} titre="Modification ou annulation par le Guide">
        <p>
          Le Guide peut être contraint de modifier un itinéraire pour des
          raisons de sécurité — état d&apos;une route, activité volcanique,
          conditions de mer, fermeture d&apos;un site. Il en informe le Client
          sans délai et propose une prestation de qualité équivalente, sans
          supplément.
        </p>
        <p>
          Si le Guide se trouve dans l&apos;impossibilité d&apos;exécuter la
          prestation, il en informe le Client au plus tôt et lui propose soit
          un remplacement par un guide de son union, soit le remboursement
          intégral des sommes versées. Le remboursement intervient dans un
          délai de quatorze jours.
        </p>
        <p>
          Une modification substantielle imposée au Client lui ouvre le droit
          d&apos;accepter la prestation modifiée ou de résilier sans frais, avec
          remboursement intégral.
        </p>
      </Article>

      <Article n={13} titre="Circonstances exceptionnelles et inévitables">
        <p>
          Aucune indemnité n&apos;est due de part et d&apos;autre lorsque
          l&apos;inexécution résulte de circonstances exceptionnelles et
          inévitables, échappant au contrôle de la partie qui les invoque et
          dont les conséquences n&apos;auraient pu être évitées : catastrophe
          naturelle, éruption volcanique et fermeture de l&apos;espace aérien,
          épidémie, troubles graves à l&apos;ordre public, décision
          administrative de fermeture.
        </p>
        <p>
          Dans ce cas, les sommes versées sont remboursées, déduction faite des
          frais réellement engagés et justifiés auprès des prestataires.
        </p>
      </Article>

      <Article n={14} titre="Fêtes religieuses et jours d'arrêt">
        <p>
          Certaines dates du calendrier balinais restreignent les
          déplacements. En particulier, <b>Nyepi</b>, le jour du silence,
          impose vingt-quatre heures d&apos;arrêt total : aucune circulation,
          aucune activité, aéroport fermé. Les dates suivent le calendrier
          saka et varient chaque année.
        </p>
        <p>
          Le Guide informe le Client des dates connues avant l&apos;acceptation
          du devis. Aucune prestation ne peut être exécutée ces jours-là, et
          leur survenance ne constitue pas une inexécution du contrat.
        </p>
      </Article>

      <Article n={15} titre="Obligations du Client">
        <ul>
          <li>
            <b>Documents de voyage</b> — passeport valide au moins six mois
            après la date d&apos;entrée, visa ou autorisation requis, taxe
            touristique le cas échéant. Leur obtention relève de la seule
            responsabilité du Client, qui vérifie les conditions en vigueur
            auprès des autorités compétentes.
          </li>
          <li>
            <b>Santé</b> — le Client s&apos;assure d&apos;être en état de
            suivre les activités prévues et signale au Guide, avant le départ,
            toute limitation ou condition médicale ayant une incidence sur le
            programme.
          </li>
          <li>
            <b>Respect des lieux</b> — les temples et les cérémonies obéissent
            à des règles que le Guide expose sur place : tenue couverte,
            écharpe nouée à la taille, comportement. Le Client s&apos;y
            conforme.
          </li>
          <li>
            <b>Ponctualité</b> — les horaires convenus permettent
            d&apos;éviter l&apos;affluence et la chaleur. Un retard peut
            entraîner la suppression d&apos;une étape, sans réduction de prix.
          </li>
        </ul>
        <p>
          Le Guide peut mettre fin à la prestation, sans remboursement, en cas
          de comportement mettant en danger la sécurité du groupe ou portant
          gravement atteinte aux personnes et aux lieux visités.
        </p>
      </Article>

      <Article n={16} titre="Assurances">
        <p>
          <b>
            Aucune assurance de personne n&apos;est comprise dans le prix.
          </b>{" "}
          Le Guide recommande vivement au Client de souscrire, avant le départ,
          une assurance couvrant l&apos;annulation, les frais médicaux, le
          rapatriement sanitaire et la responsabilité civile à
          l&apos;étranger.
        </p>
        <p>
          Le Guide est assuré pour sa responsabilité civile professionnelle
          dans les conditions indiquées à l&apos;article 2. Le véhicule est
          assuré conformément à la réglementation indonésienne.
        </p>
      </Article>

      <Article n={17} titre="Responsabilité">
        <p>
          Le Guide est responsable de la bonne exécution des prestations
          qu&apos;il fournit lui-même : conduite, accompagnement, organisation
          des journées.
        </p>
        <p>
          Pour un voyage à forfait au sens de l&apos;article 3 <i>b)</i>, le
          Guide est responsable de plein droit de la bonne exécution de
          l&apos;ensemble des services compris dans le forfait, y compris ceux
          exécutés par d&apos;autres prestataires.
        </p>
        <p>
          Sa responsabilité ne peut être engagée pour les prestations que le
          Client a contractées directement auprès de tiers, ni pour les
          conséquences de circonstances exceptionnelles et inévitables au sens
          de l&apos;article 13, ni pour un fait imputable au Client.
        </p>
      </Article>

      <Article n={18} titre="Réclamations et médiation">
        <p>
          Toute réclamation est portée à la connaissance du Guide{" "}
          <b>pendant le voyage</b>, afin qu&apos;il puisse y remédier
          immédiatement, puis confirmée par écrit à {CONTACT.email} dans un
          délai de trente jours après le retour, accompagnée des pièces
          justificatives.
        </p>
        <p>
          À défaut de réponse satisfaisante dans un délai de soixante jours, le
          Client consommateur peut saisir gratuitement le médiateur de la
          consommation :
        </p>
        <dl>
          <div>
            <dt>Médiateur</dt>
            <dd>
              <Valeur v={MEDIATEUR.nom} quoi="nom du médiateur" />
            </dd>
          </div>
          <div>
            <dt>Saisine</dt>
            <dd>
              <Valeur v={MEDIATEUR.site} quoi="adresse de saisine" />
            </dd>
          </div>
        </dl>
        <p>
          Le Client peut également recourir à la plateforme européenne de
          règlement en ligne des litiges.
        </p>
      </Article>

      <Article n={19} titre="Données personnelles">
        <p>
          Le traitement des données personnelles du Client est décrit à
          l&apos;article 7 des{" "}
          <a href="/mentions-legales">mentions légales</a>, qui fait partie
          intégrante des présentes conditions.
        </p>
      </Article>

      <Article n={20} titre="Droit applicable et juridiction">
        <p>
          Les présentes conditions sont soumises au droit indonésien, sans que
          ce choix puisse priver le Client consommateur ayant sa résidence
          habituelle en France de la protection que lui assurent les
          dispositions impératives du droit français.
        </p>
        <p>
          Le Client consommateur peut porter son action devant les juridictions
          de son lieu de résidence. Les parties s&apos;efforcent de régler tout
          différend à l&apos;amiable avant toute action contentieuse.
        </p>
      </Article>
    </PageLegale>
  );
}
