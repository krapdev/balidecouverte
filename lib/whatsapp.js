import { WHATSAPP_NUMBER } from "./data";

/**
 * Compose le message envoyé à Agus depuis l'état du configurateur.
 * Sortie volontairement lisible : le voyageur la relit dans WhatsApp
 * avant d'appuyer sur envoyer.
 */
export function buildMessage(trip) {
  const { name, month, duration, adults, children, styles, selected, islands, circuit } =
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

  /* Le circuit sert de base de discussion, pas de commande : la phrase
     dit explicitement qu'on part de là pour l'adapter. */
  if (circuit) {
    lines.push(
      `🧭 Je pars de votre circuit « ${circuit.nom} » (${circuit.jours} jours, ${circuit.prixPers} par personne) et j'aimerais l'adapter.`
    );
    lines.push("");
  }

  if (selected.length) {
    lines.push("Les expériences qui m'intéressent :");
    selected.forEach((e, i) => {
      lines.push(`${i + 1}. ${e.title} (${e.place})`);
    });
  } else {
    lines.push(
      "Je n'ai pas encore choisi d'expérience — je suis ouvert(e) à vos suggestions."
    );
  }

  if (islands && islands.length) {
    lines.push("");
    lines.push("Et une extension vers les îles voisines :");
    islands.forEach((e) => {
      lines.push(`• ${e.title} — ${e.island} (${e.duration})`);
    });
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
