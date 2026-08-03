import { WHATSAPP_NUMBER } from "./data";

/**
 * Compose le message envoyé à Agus depuis l'état du configurateur.
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

/** URL wa.me prête à ouvrir, message encodé. */
export function whatsappUrl(message, phone = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
