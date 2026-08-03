import { CONTACT } from "./data";

/**
 * Compose le message envoyé à Agus depuis l'état du configurateur.
 *
 * Le canal est l'e-mail : le message devient le premier fil d'une
 * conversation de devis, que les deux côtés retrouvent, citent et
 * complètent. WhatsApp reste le contact direct pour une question rapide,
 * pas pour la demande elle-même.
 *
 * Le message dit **par quel chemin** le voyageur est arrivé, parce que
 * c'est ce qui change le travail d'Agus :
 *
 *   - avec un circuit de base, il adapte un itinéraire qu'il connaît ;
 *   - sans, il en construit un à partir d'une liste d'envies.
 *
 * Les classiques et les places secrètes sont annoncés séparément : ce
 * n'est pas la même demande, et Agus lit la seconde comme un signal sur
 * le genre de voyageur qu'il a en face.
 *
 * Sortie volontairement lisible : le voyageur la relit dans WhatsApp
 * avant d'appuyer sur envoyer.
 */
export function buildMessage(trip) {
  const { name, month, duration, adults, children, styles, activites, circuit } =
    trip;

  let voyageurs = `${adults} adulte${adults > 1 ? "s" : ""}`;
  if (children > 0) {
    voyageurs += `, ${children} enfant${children > 1 ? "s" : ""}`;
  }

  const lines = [
    "Bonjour Agus 🌿",
    "",
    name
      ? `Je m'appelle ${name} et je souhaite organiser un voyage sur-mesure à Bali avec vous.`
      : "Je souhaite organiser un voyage sur-mesure à Bali avec vous.",
    "",
    `📅 Période : ${month}`,
    `⏳ Durée : ${duration}`,
    `👥 Voyageurs : ${voyageurs}`,
    `🎯 Style : ${styles.length ? styles.join(", ") : "à définir ensemble"}`,
    "",
  ];

  /* Le circuit sert de base de discussion, pas de commande. */
  if (circuit) {
    lines.push(
      `🧭 Je pars de votre circuit « ${circuit.nom} » (${circuit.jours} jours, ${circuit.prixPers} par personne) et j'aimerais l'adapter.`
    );
    lines.push("");
  }

  const classiques = activites.filter((a) => a.famille === "classique");
  const secrets = activites.filter((a) => a.famille === "secret");

  if (classiques.length) {
    lines.push("Ce que je ne veux pas manquer :");
    classiques.forEach((a) => lines.push(`• ${a.titre}`));
  }

  if (secrets.length) {
    if (classiques.length) lines.push("");
    lines.push("Et ces endroits-là m'ont donné envie :");
    secrets.forEach((a) => lines.push(`• ${a.titre}`));
  }

  if (!activites.length) {
    lines.push(
      circuit
        ? "Je n'ai rien coché d'autre pour l'instant — dites-moi ce que vous en pensez."
        : "Je n'ai pas encore choisi d'activité — je suis ouvert(e) à vos suggestions."
    );
  }

  lines.push(
    "",
    "Pouvez-vous me proposer un itinéraire et un devis ? Merci beaucoup !"
  );

  return lines.join("\n");
}

/**
 * L'objet dit l'essentiel avant même l'ouverture : Agus trie sa boîte au
 * premier coup d'œil, et le fil garde un titre lisible.
 */
export function buildSubject(trip) {
  const qui = trip.name ? `${trip.name} — ` : "";
  return `Demande de devis Bali — ${qui}${trip.month}, ${trip.duration}`;
}

/**
 * Lien mailto prêt à ouvrir.
 *
 * Limite connue : un `mailto:` très long est tronqué par certains
 * clients, et les utilisateurs de webmail sans client configuré n'ont
 * rien qui s'ouvre. D'où le bouton « copier » à côté, et — en
 * production — un vrai formulaire côté serveur qui enverra le même
 * texte. Le corps du message est identique dans les trois cas.
 */
export function mailtoUrl(trip, message, to = CONTACT.email) {
  const params = new URLSearchParams({
    subject: buildSubject(trip),
    body: message,
  });
  /* URLSearchParams encode l'espace en « + », que les clients mail
     n'interprètent pas : on repasse en %20. */
  return `mailto:${to}?${params.toString().replace(/\+/g, "%20")}`;
}
