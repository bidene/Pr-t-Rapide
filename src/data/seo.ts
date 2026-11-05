// Référencement (SEO) : titre et description de chaque page, tels qu'ils apparaissent dans Google.
// Titre : 50-60 caractères conseillés. Description : 140-160 caractères conseillés.

// Adresse définitive du site, sans « / » final (ex. 'https://www.pret-rapide.fr').
// Laisser vide tant que le nom de domaine n'est pas choisi : la balise canonique n'est alors pas ajoutée.
export const SITE_URL: string = '';

export type PageSeo = { title: string; description: string };

export const seoByPath: Record<string, PageSeo> = {
  '/': {
    title: 'Prêt Rapide Paris — Prêt personnel, immobilier, auto | Réponse 24h',
    description:
      'Prêt Rapide, solutions de crédit à Paris 9e : prêt personnel, immobilier, auto, rachat de crédit et prêt pro. Réponse de principe en 24h, fonds sous 48h.',
  },
  '/a-propos': {
    title: 'À propos de Prêt Rapide — Votre partenaire crédit à Paris',
    description:
      'Découvrez Prêt Rapide : plus de 10 ans d’expertise en financement, une équipe de conseillers dédiés et une agence au 29 boulevard Haussmann, Paris 9e.',
  },
  '/services': {
    title: 'Nos crédits : personnel, immobilier, auto, rachat — Prêt Rapide',
    description:
      'Prêt personnel, crédit immobilier, prêt auto, rachat de crédit, prêt professionnel et prêt travaux : comparez nos solutions de financement à Paris et en France.',
  },
  '/contact': {
    title: 'Contact Prêt Rapide — Demande de prêt à Paris 9e',
    description:
      'Contactez Prêt Rapide par téléphone, WhatsApp ou email, ou rendez-vous au 29 boulevard Haussmann, 75009 Paris. Réponse de principe sous 24h.',
  },
};
