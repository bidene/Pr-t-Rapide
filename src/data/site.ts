export const contact = {
  phone: '+33 7 58 69 28 87',
  phoneHref: 'tel:+33758692887',
  whatsapp: '+33 7 58 69 28 87',
  whatsappHref: 'https://wa.me/33758692887',
  email: 'bancosocietegenerale042@gmail.com',
  emailHref: 'mailto:bancosocietegenerale042@gmail.com',
  address: '29 Boulevard Haussmann, 75009 Paris',
  mapsEmbed:
    'https://www.google.com/maps?q=29+Boulevard+Haussmann,+75009+Paris&output=embed',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=29+Boulevard+Haussmann,+75009+Paris',
};

export const images = {
  hero: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920&fit=crop',
  handshake:
    'https://images.pexels.com/photos/33175650/pexels-photo-33175650.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  paris:
    'https://images.pexels.com/photos/12883372/pexels-photo-12883372.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  family:
    'https://images.pexels.com/photos/3807363/pexels-photo-3807363.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  firstHome:
    'https://images.pexels.com/photos/7578990/pexels-photo-7578990.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  laptop:
    'https://images.pexels.com/photos/7735632/pexels-photo-7735632.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  cards:
    'https://images.pexels.com/photos/6266627/pexels-photo-6266627.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  houseKey:
    'https://images.pexels.com/photos/32045967/pexels-photo-32045967.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  officeHandshake:
    'https://images.pexels.com/photos/7792841/pexels-photo-7792841.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  aerialParis:
    'https://images.pexels.com/photos/11828828/pexels-photo-11828828.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  haussmann:
    'https://images.pexels.com/photos/31133951/pexels-photo-31133951.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
  team: '/images/equipe.jpg',
  banks: {
    bnp: '/images/banks/bnp-paribas.jpg',
    creditAgricole: '/images/banks/credit-agricole.jpg',
    lcl: '/images/banks/lcl.jpg',
    santander: '/images/banks/santander.jpg',
    bbva: '/images/banks/bbva.jpg',
    boursorama: '/images/banks/boursorama.jpg',
  },
  documents:
    'https://images.pexels.com/photos/5234733/pexels-photo-5234733.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
};

export const services = [
  {
    id: 'pret-perso',
    icon: 'Wallet',
    title: 'Prêt Personnel',
    desc: 'Financez vos projets personnels : voyage, mariage, équipement. Un crédit rapide de 1 000 € à 75 000 € avec des mensualités adaptées à votre budget.',
    amount: '1 000 € – 75 000 €',
    duration: '12 à 84 mois',
    rate: 'TAEG dès 2,9 %',
    image: images.cards,
  },
  {
    id: 'pret-immobilier',
    icon: 'Home',
    title: 'Prêt Immobilier',
    desc: 'Devenez propriétaire ou investissez. Un financement sur mesure pour votre résidence principale, secondaire ou votre projet locatif à Paris et partout en France.',
    amount: 'Jusqu\'à 1 000 000 €',
    duration: '5 à 25 ans',
    rate: 'TAEG dès 2 %',
    image: images.houseKey,
  },
  {
    id: 'pret-auto',
    icon: 'Car',
    title: 'Prêt Auto',
    desc: 'Achetez votre voiture neuve ou d\'occasion. Un crédit auto rapide avec une réponse de principe en 24 heures et un déblocage immédiat des fonds.',
    amount: '3 000 € – 100 000 €',
    duration: '12 à 72 mois',
    rate: 'TAEG dès 3,1 %',
    image: images.laptop,
  },
  {
    id: 'rachat-credit',
    icon: 'RefreshCw',
    title: 'Rachat de Crédit',
    desc: 'Regroupez vos prêts en un seul et réduisez vos mensualités jusqu\'à 60 %. Bénéficiez d\'une situation financière allégée et d\'un budget plus serein.',
    amount: 'Jusqu\'à 200 000 €',
    duration: 'Jusqu\'à 12 ans',
    rate: 'TAEG dès 3,5 %',
    image: images.documents,
  },
  {
    id: 'pret-pro',
    icon: 'Briefcase',
    title: 'Prêt Professionnel',
    desc: 'Développez votre entreprise : trésorerie, équipement, véhicule, investissement. Un accompagnement dédié aux entrepreneurs et PME françaises.',
    amount: '5 000 € – 500 000 €',
    duration: '12 à 120 mois',
    rate: 'TAEG dès 2,5 %',
    image: images.officeHandshake,
  },
  {
    id: 'pret-travaux',
    icon: 'Hammer',
    title: 'Prêt Travaux',
    desc: 'Rénovez, aménagez ou agrandissez votre habitat. Un financement dédié à tous vos projets de rénovation avec un suivi de chantier sans souci.',
    amount: '1 000 € – 60 000 €',
    duration: '12 à 96 mois',
    rate: 'TAEG dès 3,0 %',
    image: images.firstHome,
  },
];

export const steps = [
  {
    icon: 'FileText',
    title: '1. Déposez votre demande',
    desc: 'Remplissez notre formulaire en ligne en quelques minutes. Indiquez le montant souhaité et votre situation. Aucun engagement.',
  },
  {
    icon: 'ShieldCheck',
    title: '2. Réponse de principe',
    desc: 'Nos conseillers analysent votre dossier et vous transmettent une réponse de principe sous 24 heures, sans frais cachés.',
  },
  {
    icon: 'PenLine',
    title: '3. Signature du contrat',
    desc: 'Signez votre offre de prêt en ligne ou en agence. Un accompagnement personnalisé à chaque étape de votre projet.',
  },
  {
    icon: 'Banknote',
    title: '4. Déblocage des fonds',
    desc: 'Recevez vos fonds directement sur votre compte bancaire en 48h après signature. Rapide, simple et sécurisé.',
  },
];
