export const siteConfig = {
  name: 'Evolve Dance Center',
  tagline: 'Where dancers become artists.',
  address: '6070 S Rainbow Blvd, Las Vegas, NV 89118',
  addressLine1: '6070 S Rainbow Blvd',
  addressLine2: 'Las Vegas, NV 89118',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=6070+S+Rainbow+Blvd%2C+Las+Vegas%2C+NV+89118',
  phone: '(702) 897-5095',
  phoneTel: '+17028975095',
  email: 'info@evolvedancecenter.com',
  enrollCtaLabel: 'Enroll Now',
  waitlistCtaLabel: 'Join Waitlist',
  viewClassesCtaLabel: 'View Classes',
  classesPath: '/classes',
  classFinderSectionId: 'classfinder',
  comboSection: {
    eyebrow: 'For Our Youngest Dancers',
    heading: 'Little ones, big moves.',
    body:
      'For ages 18 months to 6 years, we offer combination classes that split the hour between two dance styles. Perfect for little ones discovering movement for the first time.',
    ctaLabel: 'Enroll a Little One',
  },
  jackrabbitEnroll:
    'https://app3.jackrabbitclass.com/regv2.asp?id=531584',
  jackrabbitLogin: 'https://app3.jackrabbitclass.com/',
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instagram.com/evolvedancelv/' },
    { label: 'Facebook', href: 'https://www.facebook.com/LasVegasDanceStudio/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@evolvedancecenter8992' },
  ],
} as const
