import { contact } from '@/data/site';

// Ouvre WhatsApp (application ou WhatsApp Web) vers le numéro de l'agence,
// avec un message déjà rempli. Le client n'a plus qu'à appuyer sur « Envoyer ».
export function sendToWhatsApp(title: string, fields: [label: string, value: string][]) {
  const lines = fields
    .filter(([, value]) => value.trim() !== '')
    // Les libellés viennent des formulaires traduits : on retire le « * » des champs obligatoires
    .map(([label, value]) => `*${label.replace(/\s*\*$/, '')} :* ${value.trim()}`);
  const text = [`*${title}*`, '', ...lines].join('\n');
  const url = `${contact.whatsappHref}?text=${encodeURIComponent(text)}`;

  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = url; // fenêtre bloquée : on ouvre dans l'onglet courant
}
