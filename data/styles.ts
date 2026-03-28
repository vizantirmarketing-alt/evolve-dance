export interface DanceStyle {
  id: string
  name: string
  description: string
  ageRange: string
  ageMin: number
  ageMax: number
  whatToWear: string
  shoes: string
  highlight: string
}

export const danceStyles: DanceStyle[] = [
  {
    id: 'ballet',
    name: 'Ballet',
    description:
      'An artistic dance form performed to music using precise and highly formalized steps and gestures. Characterized by light, graceful, and fluid movements. Class format: barre, stretching, center, and across the floor. Progressions include variations and pointe work.',
    ageRange: 'Ages 3–18',
    ageMin: 3,
    ageMax: 18,
    whatToWear: 'Black leotard, pink tights, pink ballet shoes',
    shoes: 'Ballet shoes',
    highlight: 'Builds the strongest technical foundation of any dance style',
  },
  {
    id: 'jazz',
    name: 'Jazz',
    description:
      'Matched to the rhythms of jazz music. Unlike ballet, movements can be done in parallel instead of turned out. Class begins with warm up and stretch, then moves into technique and combinations.',
    ageRange: 'Ages 4–18',
    ageMin: 4,
    ageMax: 18,
    whatToWear: 'Form fitting top, dance shorts or leggings',
    shoes: 'Jazz shoes',
    highlight: 'High energy and performance focused',
  },
  {
    id: 'hiphop',
    name: 'Hip Hop',
    description:
      'A range of street dance styles including waacking, breaking, and house. Typically danced to Hip Hop or Pop music. Rooted in culture and self-expression.',
    ageRange: 'Ages 5–18',
    ageMin: 5,
    ageMax: 18,
    whatToWear: 'Comfortable, baggy or street-style clothing',
    shoes: 'Clean sneakers',
    highlight: 'Most popular style for self-expression and confidence',
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    description:
      'A free and expressive style combining classical modern, jazz, and improvisation. Class begins with a warm up then shifts into technique across the floor and combination work. Ballet enrollment required.',
    ageRange: 'Ages 6–18',
    ageMin: 6,
    ageMax: 18,
    whatToWear: 'Form fitting top, dance shorts or leggings',
    shoes: 'Pirouettes, half soles, socks, or barefoot',
    highlight: 'Where technique meets pure artistry',
  },
  {
    id: 'lyrical',
    name: 'Lyrical',
    description:
      'Combines elements of ballet, jazz, acrobatics, and modern dance. Associated with emotional displays and illustration of song lyrics. Ballet enrollment required.',
    ageRange: 'Ages 5–18',
    ageMin: 5,
    ageMax: 18,
    whatToWear: 'Form fitting top, dance shorts or leggings',
    shoes: 'Pirouettes or half soles',
    highlight: 'Storytelling through movement',
  },
  {
    id: 'acro',
    name: 'Acro',
    description:
      'Combines elements of acrobatics and floor gymnastics with classical dance. Dancers work on back bends, front walkovers, aerials, and back handsprings through progressions. Self-motivated class format.',
    ageRange: 'Ages 4–18',
    ageMin: 4,
    ageMax: 18,
    whatToWear:
      'Form fitting top, shorts or leggings — dancers will be inverted',
    shoes: 'Barefoot',
    highlight: 'Builds strength, flexibility, and fearlessness',
  },
  {
    id: 'tap',
    name: 'Tap',
    description:
      'Performed wearing shoes fitted with metal taps, characterized by rhythmical tapping of the toes and heels. Develops musicality and rhythmic precision.',
    ageRange: 'Ages 5–18',
    ageMin: 5,
    ageMax: 18,
    whatToWear: 'Form fitting top, dance shorts or leggings',
    shoes: 'Tap shoes',
    highlight: 'The most musical of all dance styles',
  },
  {
    id: 'ballroom',
    name: 'Ballroom',
    description:
      'An umbrella for a variety of European partner dance styles. Dancers may wear ballroom shoes with a heel. Develops poise, partnering skills, and performance presence.',
    ageRange: 'Ages 8–18',
    ageMin: 8,
    ageMax: 18,
    whatToWear: 'Dress clothes or dancewear, ballroom shoes',
    shoes: 'Ballroom shoes with heel',
    highlight: 'Elegance and partner connection',
  },
  {
    id: 'jumpsnturns',
    name: 'Jumps & Turns',
    description:
      'Works exclusively on the technical elements of jazz — various turns, jumps, and leg extensions. A technique-focused class that elevates performance in all other styles.',
    ageRange: 'Ages 8–18',
    ageMin: 8,
    ageMax: 18,
    whatToWear: 'Form fitting top, dance shorts or leggings',
    shoes: 'Jazz shoes, pirouettes, or half soles',
    highlight: 'Fast-track your technical growth',
  },
  {
    id: 'stretch',
    name: 'Stretch & Pilates',
    description:
      'Focuses on increasing strength, control, and flexibility. Combines elements of pilates and deep stretches. Dancers should bring their own yoga mat.',
    ageRange: 'Ages 10–18',
    ageMin: 10,
    ageMax: 18,
    whatToWear: 'Comfortable workout clothes',
    shoes: 'Barefoot',
    highlight: 'The secret weapon behind great dancers',
  },
  {
    id: 'combo',
    name: 'Combo Classes',
    description:
      'For our youngest dancers ages 18 months to 6 years. Combo splits the hour between two styles — tap and ballet, jazz and acro, tap and hip hop — helping little ones explore movement and build attention span.',
    ageRange: 'Ages 18mo–6',
    ageMin: 0,
    ageMax: 6,
    whatToWear: 'Comfortable dancewear, leotard optional',
    shoes: 'Depends on combo — ask at front desk',
    highlight: 'The perfect first dance experience',
  },
]
