#!/usr/bin/env node
/**
 * One-time seed for /faculty.
 * Uploads headshots from scripts/data/headshots/*.jpg and creates faculty docs.
 * Idempotent — skips slugs that already exist in Sanity.
 *
 * Usage:
 *   1. Put cropped headshots in scripts/data/headshots/  (filenames match slugs in this file)
 *   2. Run: node scripts/seed-faculty.mjs
 */

import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })

import { createClient } from '@sanity/client'
import fs from 'node:fs'

const HEADSHOTS_DIR = path.join(__dirname, 'data', 'headshots')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error('Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

// Convert a plain text bio into Portable Text blocks (one block per paragraph)
function toPortableText(text) {
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  return paragraphs.map((para) => ({
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).slice(2, 10),
        text: para,
        marks: [],
      },
    ],
  }))
}

const FACULTY = [
  // Pinned by order: Meghan = 10, Cheryl = 20, then 100+ alphabetical
  { slug: 'meghan-hoover',     name: 'Meghan Hoover',     role: 'Co-Founder & Director',     specialties: ['Jazz', 'Hip Hop'],                bio: 'Meghan Hoover is a graduate from the University of South Florida with a BFA degree in Dance Performance & Choreography. She was awarded "Graduate with Distinction" from the college of fine arts for her excellence in dance and academics. Meghan has received master instruction under industry greats such as Mia Michaels, Frank Hatchett, Gus Giordano, and Luigi. Growing up, Meghan trained at the Terri Gordon Dance Center, Hartford Ballet School, Boston Ballet School, Broadway Dance Center, and Steps.\n\nShe received full scholarships to The Edge Dance Center in LA and the Gus Giordano Dance Center in Chicago. She toured the world while dancing for Holland America Cruise Lines as a dance captain & assistant choreographer. Meghan was a dancer & dance captain in the long-running Las Vegas classic "Jubilee" for 5 yrs, here on the Las Vegas Strip. She has worked for talent agencies such as Stiletto Entertainment, Best Agency, Missy Cochran Entertainment, & Dick Foster Productions. She has performed in numerous industrials, and commercial jobs here in Las Vegas.\n\nMeghan has had 6 years of experience as the artistic director at Studio One\'s Southwest Dance Academy, and she looks forward to continuing on this path at Evolve Dance Center. Meghan has taught all techniques to dancers of all ages for the last 16 years, and has even taught at the University level at UNLV.\n\nShe has choreographed many numbers that have received overall level awards, recognition for exceptional choreography, and multiple "Top Studio" awards for the well-rounded program that she has developed. Meghan has a strong passion for instructing dance, as well as choreography. She has had years of experience judging at both regional and national competitions. She loves to inspire young artists and demands excellence from her students in a positive and encouraging studio environment.', order: 10 },
  { slug: 'cheryl-snow',       name: 'Cheryl Snow',       role: 'Co-Founder & Director',               specialties: ['Ballet', 'Contemporary'],         bio: 'As a dancer, teacher, and choreographer coming from a competitive gymnastics background, Cheryl has been teaching and choreographing many different techniques and styles for 15 years. She studied dance and entrepreneurship at UNLV and has a Bachelor of Fine Arts degree in dance performance and choreography. Cheryl graduated with honors and was awarded outstanding senior with distinction as best choreographer, performer, and student.\n\nShe has received master instruction and trained with some of the best in the industry including Complexions Contemporary Ballet, Cleo Parker Robinson, Jump Rhythm Jazz, and Erick Hawkins Dance Company. While training she received numerous scholarships and invitations to dance with company\'s such as Inaside Chicago Dance Company and Trinity Laban Conservatoire in London. She has performed in a wide variety of industrials and theatrical productions throughout Las Vegas and has also had the opportunity to travel and perform internationally.\n\nMost currently Cheryl has been dancing in a Las Vegas based contemporary company, Sample Dance. She has received recognition for her choreography that lead to many of her works being shown internationally in South Korea, Turks and Caicos, Germany, and Russia. Cheryl has entered works and won choreography competitions as well as being a finalist in the McCallum Theatres, "Dance Under the Stars" choreography festival. She has had the honor to co-choreograph for Cirque Du Soleil\'s Choreographers Showcase and for workshops and studios throughout the nation.\n\nCheryl continues to receive top score, judges recognition, and choreography awards every year. She has also had the opportunity to judge national competitions throughout the country. She had the opportunity to help run the dance program and head up the competition team for Kingman Dance Factory along side the director, Judy Reese. Following that she became the assistant director alongside Meghan Hoover for Studio One\'s Southwest Dance Academy. Cheryl is so thrilled to continue her journey with Evolve Dance Center while striving to connect with her students and inspire them through an energetic yet disciplined atmosphere. Her passion and drive to continue to educate, inspire and train grows each day.', order: 20 },
  { slug: 'alannah-newcomer',  name: 'Alannah Newcomer',  role: 'Faculty', specialties: ['Lyrical', 'Contemporary'],          bio: 'Alannah is a dance instructor from the Las Vegas area. Growing up she trained and danced competitively with Studio One Southwest Dance Academy. After graduating high school in 2016, she started teaching at Evolve Dance. Alannah teaches a variety of styles and age groups and has choreographed multiple competitive group and specialty pieces for Evolve Dance Center.', order: 100 },
  { slug: 'alejandro-domingo', name: 'Alejandro Domingo', role: 'Faculty', specialties: ['Ballroom', 'Jazz'],                 bio: 'Alejandro is an AEA actor, dancer and choreographer born in Buenos Aires, Argentina. In Las Vegas since 2012, his credits include Donn Arden\'s Jubilee, Cirque du Soleil\'s One Night for One Drop, Vegas! The Show (Dance Captain), and Baz! Star Crossed Love at the Palazzo (Dance Captain). He choreographs for Royal Caribbean International and Norwegian Cruise Lines.', order: 110 },
  { slug: 'eric-lehn',         name: 'Eric Lehn',         role: 'Faculty', specialties: ['Hip Hop', 'Jazz'],                  bio: 'New York native Eric Lehn received his BFA in Dance Performance from Towson University in 2013. His training came from the American Ballet Theatre Collegiate Program and the Joffrey Ballet School. Eric joined the Bad Boys of Dance for international tours and was an original cast member of Sleeping Beauty Dreams starring Diana Vishneva. He is in his third year on faculty at Evolve.', order: 120 },
  { slug: 'gregory-filler',    name: 'Gregory Filler',    role: 'Faculty', specialties: ['Tap'],                              bio: 'Gregory has performed in the 1988, 2000, and 2002 Olympic opening ceremonies, in musicals including Grease, 42nd Street, and Starlight Express, and in five international touring companies of Tap Dogs. His choreography credits include television specials on ABC/NBC and ESPN, and shows for Norwegian, Celebrity, Crystal and Royal Caribbean Cruise Lines.', order: 130 },
  { slug: 'helen-stein',       name: 'Helen Stein',       role: 'Faculty', specialties: ['Jazz', 'Musical Theater'],          bio: 'Helen began dancing as a child in California and was teaching her own classes by sixteen. She trained on scholarship at STEPS in NYC and earned her BA in Dance with a minor in Musical Theater from San Jose State. She moved to Las Vegas in 1996 and performed in Enter the Night at the Stardust (Assistant Line Captain), Tournament of Kings at Excalibur, and Siegfried & Roy at the Mirage.', order: 140 },
  { slug: 'isabelle-ibanez',   name: 'Isabelle Ibanez',   role: 'Faculty', specialties: ['Tap', 'Ballet'],                    bio: 'Isabelle started her dance training in 2010 with cultural Hawaiian hula. She joined Evolve Dance Center in 2018 and began competing with Evolve Dance Project in season 2. She graduated as the 2023 valedictorian for Durango High School and is currently at UNLV on a full ride scholarship for a biology degree.', order: 150 },
  { slug: 'jacky-pagone',      name: 'Jacky Pagone',      role: 'Faculty', specialties: ['Ballet', 'Contemporary'],           bio: 'Jacky has been professionally teaching and choreographing since 2000. She trained at The Chicago Academy for the Arts and The Ruth Page Foundation, with additional training at Houston Ballet, American Ballet Theatre, and San Diego Ballet. TV appearances include Lifetime\'s Dance Moms and NBC\'s America\'s Got Talent (twice). She is a certified Yoga, Pilates, and Hypnotherapy practitioner.', order: 160 },
  { slug: 'julie-furness',     name: 'Julie Furness',     role: 'Faculty', specialties: ['Jazz'],                             bio: 'Originally from Pittsburgh, Julie graduated from Point Park University with a BA in Dance (concentration in Jazz). She toured with the American Dance Company throughout Italy, Spain, France, Central America and the US. In Las Vegas she was dance captain of Legends in Concert for a decade and most recently performed with Matt Goss\'s show at Caesars Palace.', order: 170 },
  { slug: 'julie-mcclelland',  name: 'Julie McClelland',  role: 'Faculty', specialties: ['Tap', 'Combo'],                     bio: 'Julie was born and raised in Indiana with extensive training in tap, ballet, and jazz. At eighteen she secured an Actor\'s Equity position with the Walt Disney World Company in Beauty and the Beast. Her eighteen-year professional career also includes the Radio City Rockettes, Broadway\'s Spamalot, and Principal Showgirl in Las Vegas\'s Jubilee!.', order: 180 },
  { slug: 'mia-ibach',         name: 'Mia Ibach',         role: 'Faculty', specialties: ['Ballet', 'Contemporary'],           bio: 'Mia is a 19-year-old dancer based in Las Vegas. She began dancing at age 5 and started competing at 14. Trained in all styles, she specializes in ballet and contemporary. Mia has performed for top brands including Lululemon, GAP, Microsoft, and the NBA, and is recognized for her work in movement modeling.', order: 190 },
  { slug: 'morgan-mitchell',   name: 'Morgan Mitchell',   role: 'Faculty', specialties: ['Ballet'],                           bio: 'Morgan focused on ballet after moving to Las Vegas, studying with Tara Foy, Inez Mourning, and Ella Gourkova. She performed with Nevada Ballet\'s Youth Company and at the Las Vegas Academy of the Arts. She studied at Brigham Young University and trained at the Central Pennsylvania Youth Ballet under Marcia Dale Weary. Morgan is also certified to teach Progressing Ballet Technique.', order: 200 },
  { slug: 'nakya-fenderson',   name: 'Nakya Fenderson',   role: 'Faculty', specialties: ['Tap'],                              bio: 'Nakya began at the Metropolitan School of the Arts in Virginia, focusing on tap from age twelve. She has performed at The Kennedy Center, DC Tap Fest, the Dubrovnik Tap Festival, and Tap in Rio. She moved to Las Vegas as a performing artist for Opium at the Cosmopolitan and was most recently featured in Usher\'s Vegas Residency.', order: 210 },
  { slug: 'nay-givens',        name: 'Nay Givens',        role: 'Faculty', specialties: ['Hip Hop'],                          bio: 'Nay is a hip hop dancer, teacher, choreographer, and director in Las Vegas. She has choreographed for World of Dance Las Vegas, the NBA G-League, and Pac-12 Conference basketball during March Madness. She currently teaches at Millennium Dance Complex Las Vegas and is founder and director of the elite girls\' hip hop troupe Queenly Crew.', order: 220 },
  { slug: 'nicole-boone',      name: 'Nicole Boone',      role: 'Faculty', specialties: ['Acro', 'Jazz', 'Hip Hop'],          bio: 'Nicole\'s dance and gymnastic training began before she was three. She was a competitive dancer for twelve years, earning top overall placements and an International overall first place title. As a teenager she performed at the Kiel Festival for Dance and Gymnastics in Germany. She is a sophomore at UNLV majoring in dance performance and choreography.', order: 230 },
  { slug: 'ryan-trotman',      name: 'Ryan Trotman',      role: 'Faculty', specialties: ['Hip Hop', 'Contemporary'],          bio: 'Ryan, a Las Vegas native, began dancing at age eight and earned his BFA in Modern Dance from Point Park University. He performed with Norwegian Cruise Lines across Europe, the Mediterranean, and the Caribbean, then returned to Las Vegas for credits including Vegas! The Show, Mayfair Supperclub, and RuPaul\'s Drag Race LIVE!.', order: 240 },
  { slug: 'sakura-liu',        name: 'Sakura Liu',        role: 'Faculty', specialties: ['Hip Hop', 'Jazz'],                  bio: 'Sakura began her dance journey in 2013 at Laguna Creek High School. After graduation she spent five years with a professional theatrical dance company in the Bay Area and Los Angeles. Her work has appeared on NBC\'s America\'s Got Talent, Fox\'s Showtime at the Apollo, World of Dance, and Universal Studios Orlando\'s Halloween Horror Nights.', order: 250 },
  { slug: 'taylor-bradley',    name: 'Taylor Bradley',    role: 'Faculty', specialties: ['Jazz', 'Contemporary'],             bio: 'Taylor was born and raised in Roswell, Georgia, and began performing at age nine. He danced in films and television including Footloose and Vampire Diaries before earning his BFA in Dance from the University of Arizona. In Las Vegas he is currently dancing with Cirque du Soleil\'s The Beatles LOVE and Le Reve - The Dream at the Wynn.', order: 260 },
]

async function findBySlug(slug) {
  return client.fetch(
    `*[_type == "faculty" && slug.current == $slug][0]{_id}`,
    { slug }
  )
}

async function uploadHeadshot(filePath, filename, altText) {
  const buffer = fs.readFileSync(filePath)
  return client.assets.upload('image', buffer, { filename })
}

async function seedOne(rec) {
  const existing = await findBySlug(rec.slug)
  if (existing) {
    console.log(`  skip ${rec.slug} (already exists)`)
    return
  }

  const headshotPath = path.join(HEADSHOTS_DIR, `${rec.slug}.jpg`)
  let photoField = null

  if (fs.existsSync(headshotPath)) {
    const asset = await uploadHeadshot(headshotPath, `${rec.slug}.jpg`, rec.name)
    photoField = {
      _type: 'image',
      alt: rec.name,
      asset: { _type: 'reference', _ref: asset._id },
    }
  } else {
    console.log(`  no headshot for ${rec.slug} — creating doc without photo`)
  }

  const doc = {
    _type: 'faculty',
    name: rec.name,
    slug: { _type: 'slug', current: rec.slug },
    role: rec.role,
    specialties: rec.specialties,
    bio: toPortableText(rec.bio),
    order: rec.order,
    published: true,
    ...(photoField && { photo: photoField }),
  }

  const created = await client.create(doc)
  console.log(`  ✓ ${rec.slug}  (${created._id})`)
}

async function main() {
  console.log(`Seeding ${FACULTY.length} faculty members…\n`)
  for (const rec of FACULTY) {
    try {
      await seedOne(rec)
    } catch (err) {
      console.error(`  ✗ ${rec.slug}: ${err.message}`)
    }
  }
  console.log('\nDone.')
}

main()
