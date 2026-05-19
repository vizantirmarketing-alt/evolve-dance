import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// ---------- Helpers ----------
const block = (text: string, style: 'normal' | 'h2' | 'h3' | 'blockquote' = 'normal') => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2, 10),
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
})

const linkBlock = (parts: Array<{ text: string; href?: string }>) => {
  const markDefs: any[] = []
  const children = parts.map((part) => {
    if (part.href) {
      const key = Math.random().toString(36).slice(2, 10)
      markDefs.push({ _key: key, _type: 'link', href: part.href })
      return {
        _type: 'span',
        _key: Math.random().toString(36).slice(2, 10),
        text: part.text,
        marks: [key],
      }
    }
    return { _type: 'span', _key: Math.random().toString(36).slice(2, 10), text: part.text, marks: [] }
  })
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs,
    children,
  }
}

const daysAgo = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

// ---------- Categories ----------
const categories = [
  { _id: 'category-for-parents', title: 'For Parents', slug: 'for-parents', description: 'Guidance for families navigating dance.' },
  { _id: 'category-class-guides', title: 'Class Guides', slug: 'class-guides', description: 'What each style covers and what to expect.' },
  { _id: 'category-the-project', title: 'The Project', slug: 'the-project', description: 'Inside our competitive team program.' },
  { _id: 'category-studio-life', title: 'Studio Life', slug: 'studio-life', description: 'Concerts, events, and what happens at Evolve.' },
  { _id: 'category-beginner-tips', title: 'Beginner Tips', slug: 'beginner-tips', description: 'For families new to dance.' },
]

// ---------- Posts ----------
const posts = [
  // ============ POST 1 ============
  {
    _id: 'blog-post-1',
    title: 'How to Choose a Dance Studio in Las Vegas: A Parent\'s Guide',
    slug: 'how-to-choose-dance-studio-las-vegas',
    publishedAt: daysAgo(56),
    excerpt: 'Finding the right dance studio shapes your child\'s relationship with movement for years. Here\'s what Las Vegas parents should look for before signing up.',
    seoDescription: 'A practical guide for Las Vegas parents choosing a dance studio. What to look for in faculty, curriculum, class sizes, and studio culture.',
    categories: ['category-for-parents', 'category-beginner-tips'],
    tags: ['choosing a studio', 'Las Vegas dance', 'parent guide'],
    featured: true,
    body: [
      block('Walk into any dance studio in Las Vegas and you\'ll see the same things: mirrors, barres, a sound system, kids in tights. What you can\'t see from the lobby is the part that actually matters: how the teachers talk to children, whether the curriculum has structure, and what the culture feels like when no one is selling you anything.'),
      block('After years of working with families across the valley, here\'s what we\'ve learned actually separates the studios worth your time from the ones that look polished but won\'t serve your child.'),

      block('Start with the teachers, not the building', 'h2'),
      block('A beautiful studio with average instructors will give your child average training. A modest studio with serious teachers will change how they move for the rest of their life. Ask who teaches your child\'s class. Not the studio owner, not the website bio, the actual instructor in the room three days a week.'),
      block('Good questions to ask: Where did they train? How long have they taught at this level? Do they still take class themselves? Teachers who stop learning stop being able to teach growth.'),

      block('Watch a class before you commit', 'h2'),
      block('Every reputable studio will let you observe a class. What you\'re watching for: Are students engaged or watching the clock? Does the teacher give individual corrections or just demonstrate? Are the kids smiling between exercises, or does the room feel tense? Dance should be rigorous, not joyless.'),
      block('A red flag: a teacher who only corrects the strongest dancer in the room. A good teacher spreads attention across every student in every class.'),

      block('Class size matters more than you think', 'h2'),
      block('A ballet class of 25 students means your child gets about 90 seconds of personal attention per hour. A class of 12 means real correction, real progress, real relationships. Smaller classes cost the studio more to run, which is why they\'re rare. They\'re also why your child will actually improve.'),

      block('Ask about progression', 'h2'),
      block('Where does a 5-year-old in this studio end up at 10? At 14? Studios with a real curriculum can answer this immediately. Studios that just run "fun classes" will give you a vague answer. Both have a place, but you should know which one you\'re signing up for.'),

      block('The trial class tells you everything', 'h2'),
      linkBlock([
        { text: 'Most studios offer a free trial class' },
        { text: ' (we do, ' },
        { text: 'and here\'s what to expect', href: '/blog/what-to-expect-first-dance-class' },
        { text: '). Use it. Pay attention to how your child feels walking out of the building, not how they felt in the lobby. The trial is a real signal.' },
      ]),

      block('Look at the older students', 'h2'),
      block('The 14- and 16-year-olds in a studio tell you what the studio actually builds. Are they technically strong? Do they look like they enjoy being there? Are they kind to the younger kids? That\'s the long-term product of the studio\'s culture. If you don\'t like what you see at 16, your 6-year-old will end up there too.'),

      block('Trust the studio that doesn\'t oversell', 'h2'),
      block('Studios that promise your child will be a star are selling fantasy. Studios that promise consistent instruction, real growth, and a community that takes dance seriously are selling reality. One of those is worth paying for.'),

      block('A practical checklist', 'h2'),
      block('Before you sign anywhere, you should know: who teaches your child, what the curriculum looks like at the next level, how big the classes are, what the studio\'s concert and competition philosophy is, and whether parents are welcome to ask questions throughout the year. If any of those answers are unclear, keep looking.'),

      linkBlock([
        { text: 'If you\'re in southwest Las Vegas and want to see Evolve in person, ' },
        { text: 'book a free trial class', href: '/contact' },
        { text: ' or read through ' },
        { text: 'our most-asked parent questions', href: '/faq' },
        { text: '. We\'d rather have you fully informed than just signed up.' },
      ]),
    ],
  },

  // ============ POST 2 ============
  {
    _id: 'blog-post-2',
    title: 'What to Expect at Your Child\'s First Dance Class',
    slug: 'what-to-expect-first-dance-class',
    publishedAt: daysAgo(49),
    excerpt: 'A first dance class can feel overwhelming for parents and kids alike. Here\'s exactly what happens, what to bring, and how to set your child up for a good first day.',
    seoDescription: 'Everything Las Vegas parents need to know before their child\'s first dance class. What to wear, what happens, and how to prepare.',
    categories: ['category-beginner-tips', 'category-for-parents'],
    tags: ['first class', 'free trial', 'preparation'],
    featured: false,
    body: [
      block('A child\'s first dance class is rarely the experience parents picture. There\'s usually some clinging at the door, a couple of confused minutes during warm-up, and then somewhere around the fifteen-minute mark, something clicks and they\'re dancing. Knowing what to expect makes the whole day easier on everyone.'),

      block('Before you arrive', 'h2'),
      block('Eat a small snack about an hour before class. Hungry kids get distracted, full kids get sluggish. A banana, some crackers, a little cheese — light is the goal. Water bottle in the bag, hair pulled back, comfortable clothes they can move in.'),
      linkBlock([
        { text: 'You don\'t need to buy a full dancewear setup for a first class. ' },
        { text: 'Our dress code page', href: '/faq' },
        { text: ' has the full details, but for a trial, leggings or shorts and a fitted shirt are fine. Bare feet work for most styles.' },
      ]),

      block('Arrive ten minutes early', 'h2'),
      block('Not five, not on the dot. Ten. New environments take a minute to settle into, and a child who walks in calmly with time to look around is a child who participates. Rushed kids hide in corners.'),

      block('The first ten minutes of class', 'h2'),
      block('Most classes start with a warm-up circle or some kind of social opening. Teachers learn names, dancers stretch, the energy of the room sets in. Your child will probably look uncertain. That\'s normal. They\'re just figuring out the rhythm of the room.'),

      block('What you\'ll see from the lobby', 'h2'),
      block('At Evolve, parents can watch from the lobby through the observation windows. You\'ll see exercises, traveling across the floor, maybe some choreography toward the end. What looks like chaos from the outside is usually a teacher running structured progressions. Trust it.'),
      block('Resist the urge to wave, signal, or make eye contact with your child during class. The kids who do best are the ones who feel like the class is theirs, not a performance for the parent at the window.'),

      block('After class: don\'t over-debrief', 'h2'),
      block('The instinct is to ask "did you love it? Was it fun? Do you want to come back?" Most kids don\'t process a first class that way. Try instead: "What was your favorite part?" Or just let them tell you on their own time. Some kids talk the whole drive home. Some don\'t mention it until bedtime.'),
      block('A child who says nothing after class isn\'t a child who hated it. They\'re usually just processing.'),

      block('The second class is the real signal', 'h2'),
      block('If your child is excited to come back, you have your answer. If they\'re neutral, give it three classes before deciding. The first class is information; the third class is whether they\'re actually engaged. Real interest builds slowly.'),

      block('When the first class doesn\'t go well', 'h2'),
      block('Sometimes kids cry. Sometimes they sit on the side and watch. Sometimes they leave halfway through. None of these mean dance isn\'t for them — they usually mean today wasn\'t the day. We\'ve had children who couldn\'t make it through their first class become some of our strongest dancers a year later. Don\'t over-read a single morning.'),

      block('What we ask of parents on day one', 'h2'),
      block('Walk them in confidently. Don\'t linger at the door. Trust the teacher. Pick them up on time. That\'s it. The rest is our job.'),

      linkBlock([
        { text: 'Ready to book? ' },
        { text: 'Reach out through our contact page', href: '/contact' },
        { text: ' or call the studio to schedule a free trial class. We\'ll handle the rest.' },
      ]),
    ],
  },

  // ============ POST 3 ============
  {
    _id: 'blog-post-3',
    title: 'Recreational vs Competitive Dance: Which Path Is Right for Your Child?',
    slug: 'recreational-vs-competitive-dance',
    publishedAt: daysAgo(42),
    excerpt: 'Recreational and competitive dance build different things. Understanding the difference helps you choose the path that actually fits your child and your family.',
    seoDescription: 'Las Vegas parents weighing recreational vs competitive dance for their child. The real differences in time, cost, and what each path teaches.',
    categories: ['category-for-parents', 'category-the-project'],
    tags: ['competitive dance', 'The Project', 'commitment levels'],
    featured: true,
    body: [
      block('At some point in most dancers\' lives, parents face a fork: keep going recreationally, or move into competitive training. The decision isn\'t about talent, it\'s about fit. Both paths produce strong dancers and happy kids. They just build different things.'),

      block('What recreational dance actually offers', 'h2'),
      block('Recreational classes meet once or twice a week. Your child learns technique, builds friendships, performs in the year-end concert, and develops the kind of long-term relationship with movement that lasts into adulthood. There\'s no audition, no competition pressure, and no commitment beyond showing up to class.'),
      block('This is the right path for kids who love dance as one of several activities, families balancing soccer and music lessons and homework, and dancers who want to grow without the intensity that competitive training requires. Most of our students are recreational, and most of them dance with us for years.'),

      block('What competitive dance asks of your family', 'h2'),
      block('Competitive dance is a different commitment. At Evolve, our competitive program is called The Project, and dancers in it train multiple days a week, attend additional rehearsals, perform at regional competitions, and operate as part of a team with specific expectations.'),
      block('The time commitment is real. So is the cost — competition fees, costumes, travel, and additional class hours add up. The reward is also real: deeper technical training, lasting friendships built through shared work, and the kind of growth that only comes from being held to a higher standard.'),

      block('How to tell which one fits', 'h2'),
      block('Three questions help. First: does your child light up at the idea of more dance, or does the idea feel like a burden? Second: can your family realistically commit the time and budget without resentment? Third: is your child looking for community, or are they specifically looking for challenge?'),
      block('Kids who want community can find it in either program. Kids who specifically crave challenge usually need the competitive track to stay engaged long-term.'),

      block('Age and timing', 'h2'),
      block('Most competitive programs start auditioning around age 7 or 8, with younger pre-competitive feeder programs available earlier. There\'s no rush. A child who starts competitive at 10 isn\'t behind a child who started at 7 — they\'ve just spent those years building different things, both valuable.'),

      block('What we tell families on the fence', 'h2'),
      block('Try one season of competitive dance before assuming it\'s the right fit. Try one year of recreational dance before assuming your child needs more. Both decisions reverse easily. Neither one closes any doors.'),
      block('The worst version of this choice is the family that pushes a hesitant child into competition because the parent wants it, or holds back an eager child because the schedule feels overwhelming. Listen to what your kid is actually asking for.'),

      block('What success looks like in each path', 'h2'),
      block('A successful recreational dancer is one who still loves dancing after five years. A successful competitive dancer is the same — they just also have a wall of trophies and friends they\'d run through walls for. The metric isn\'t medals; it\'s whether your child still wants to be in the studio when they\'re 15.'),

      linkBlock([
        { text: 'If you\'re curious about competitive training, ' },
        { text: 'visit The Project page', href: '/the-project' },
        { text: ' for details on team levels, audition process, and what we ask of competitive families. If you have questions about recreational classes, ' },
        { text: 'reach out anytime', href: '/contact' },
        { text: '.' },
      ]),
    ],
  },

  // ============ POST 4 ============
  {
    _id: 'blog-post-4',
    title: 'The Best Age to Start Dance Classes (And Why It\'s Probably Now)',
    slug: 'best-age-to-start-dance-classes',
    publishedAt: daysAgo(35),
    excerpt: 'Parents ask us this every week. Is my child too young? Too old? Did we miss the window? Here\'s the honest answer, by age.',
    seoDescription: 'When should kids start dance classes? An honest age-by-age guide for Las Vegas parents wondering if they\'re too early or too late.',
    categories: ['category-for-parents', 'category-beginner-tips'],
    tags: ['starting dance', 'age guide', 'kids dance'],
    featured: false,
    body: [
      block('"Is my child too young to start?" "Is she too old?" "Did we miss the window?" These are the three questions we hear most often from parents at the studio. The honest answer is that there\'s no wrong age to start dancing. There are just different reasons to start at different ages.'),

      block('Ages 2 to 4: movement, not technique', 'h2'),
      block('Toddler dance classes aren\'t really about dance. They\'re about coordination, listening skills, taking turns, following a teacher who isn\'t a parent, and learning that your body can do specific things on purpose. The technique comes later — what you\'re building at this age is comfort with movement and structure.'),
      block('Signs your child is ready: they can follow simple directions, they enjoy music, they\'re okay being in a room without you for short stretches. A child who isn\'t there yet isn\'t broken, they just need a few more months.'),

      block('Ages 5 to 7: the foundational years', 'h2'),
      block('This is when real dance training begins. Bodies are coordinated enough for ballet basics, attention spans are long enough for structured class, and kids are old enough to start understanding correction without taking it personally. If you have a child in this age range who has shown interest, this is the best window to start.'),
      block('Most studios separate this age range into beginner and pre-primary levels. The goal isn\'t to push technique fast — it\'s to build clean fundamentals that will serve every other style they learn later.'),

      block('Ages 8 to 11: catching up is easy', 'h2'),
      block('A lot of parents assume an 8-year-old beginner is behind. They\'re not. Kids this age learn faster than younger beginners because their bodies and brains can absorb technique more efficiently. A motivated 9-year-old who starts ballet can catch up to a peer who started at 5 within a year or two, in most cases.'),
      block('This is also the age where kids start picking the styles they actually love. Some gravitate to jazz and hip hop, others to ballet and contemporary. Let them explore before locking into one path.'),

      block('Ages 12 to 17: it\'s not too late', 'h2'),
      block('The myth that you can\'t start dance as a teenager is one of the most discouraging things parents pass on to their kids. It\'s not true. Teen beginners often progress faster than younger dancers because they have the focus, motivation, and body awareness to apply correction immediately.'),
      block('Will a teen beginner be ready for elite competitive ballet? Probably not in two years — that\'s a different conversation. But will they become a strong, capable dancer who can perform with confidence? Absolutely yes, with consistent training.'),

      block('Adults: the secret best students', 'h2'),
      block('Adult beginners are often the most rewarding students to teach because they\'re there by choice. They listen, they apply correction, they show up consistently. If you\'re a parent who always wanted to dance and you\'re thinking about taking a class with your kid, do it.'),

      block('When to wait', 'h2'),
      block('There\'s really only one situation where waiting makes sense: when your child specifically doesn\'t want to do it and you\'re the one who wants them in dance. A reluctant child becomes a resentful student. Wait until they\'re curious on their own. They usually get there.'),

      block('The bigger truth', 'h2'),
      block('The best age to start dance is whatever age your child is right now, if they\'re interested. The window doesn\'t close at 5 or 8 or 12. What matters is consistency once they start, the quality of teaching they receive, and whether they enjoy the studio they walk into.'),

      linkBlock([
        { text: 'If you\'re weighing whether to enroll a child at any age, ' },
        { text: 'come visit Evolve', href: '/contact' },
        { text: ' or take a free trial class. The right age to start is usually sooner than you think.' },
      ]),
    ],
  },

  // ============ POST 5 ============
  {
    _id: 'blog-post-5',
    title: 'Ballet, Jazz, Hip Hop, Contemporary: A Parent\'s Guide to Dance Styles',
    slug: 'parents-guide-to-dance-styles',
    publishedAt: daysAgo(28),
    excerpt: 'Four major styles. Different histories, different demands, different rewards. Here\'s what each one teaches and how to know which fits your child.',
    seoDescription: 'What\'s the difference between ballet, jazz, hip hop, and contemporary dance? A parent\'s guide to choosing the right style for your child.',
    categories: ['category-class-guides', 'category-for-parents'],
    tags: ['ballet', 'jazz', 'hip hop', 'contemporary', 'dance styles'],
    featured: false,
    body: [
      block('Walk into the lobby of a dance studio and you\'ll see schedules listing four or five different styles. For parents new to dance, the differences aren\'t always obvious. Here\'s a real breakdown of what each style teaches, who tends to gravitate toward it, and why it matters.'),

      block('Ballet: the foundation of everything', 'h2'),
      block('Ballet is the technical base for every other style. Even hip hop dancers benefit from ballet training, because ballet teaches alignment, control, turnout, and the kind of precise body awareness that everything else builds on. If your child only takes one class a week, ballet is usually the right one.'),
      block('What it looks like in class: barre work, center exercises, traveling combinations, structured progressions that build over years. It\'s rigorous, it rewards patience, and it asks students to repeat the same movement hundreds of times until it\'s clean.'),
      block('Who loves it: kids who like structure, kids who enjoy refinement, kids who respond well to clear standards. Kids who hate ballet at 6 sometimes come back to it at 12 with new appreciation.'),

      block('Jazz: the social athlete', 'h2'),
      block('Jazz is faster, looser, more performative. It draws from ballet technique but adds isolations, sharp accents, leaps, turns, and a more theatrical performance quality. Jazz dancers tend to be expressive and physical — they\'re the ones doing across-the-floor combinations that look like sprints with style.'),
      block('What it looks like in class: warm-up, stretching, isolations, across-the-floor work, choreography. The music is usually upbeat. The energy is higher than ballet.'),
      block('Who loves it: outgoing kids, performers, athletes, dancers who want to feel like they\'re moving fast. Jazz is often the gateway style that hooks kids who didn\'t connect with ballet immediately.'),

      block('Hip hop: rhythm, style, and personality', 'h2'),
      block('Hip hop is its own world. It came from street culture, not studios, and the best hip hop training respects that history. Real hip hop classes teach foundational moves, musicality, freestyle skills, and the cultural context that makes the style what it is. It\'s not just "fun choreography to pop songs" — done well, it\'s a serious dance form.'),
      block('What it looks like in class: warm-up, foundational drills, choreography, and often freestyle circles. The music is current. The vibe is loose but the technique is real.'),
      block('Who loves it: kids who are drawn to rhythm and music more than line and form. Kids who want to dance in a way that feels current and personal. Often the favorite class of dancers who otherwise wouldn\'t identify as "dance kids."'),

      block('Contemporary: emotion and storytelling', 'h2'),
      block('Contemporary is the youngest of the four styles and the hardest to define. It pulls from ballet, modern, jazz, and improvisation, and it\'s less about codified technique than about expression, weight, and storytelling. A contemporary class often feels different than a ballet class even though they share a lot of vocabulary.'),
      block('What it looks like in class: floor work, partnering exercises, improvisation, choreography that often tells a story or conveys an emotion. Music ranges from instrumental to indie to classical.'),
      block('Who loves it: older dancers usually. Contemporary asks for emotional access and physical commitment that younger kids haven\'t built yet. Most dancers connect with contemporary somewhere around age 10 or 11.'),

      block('How to choose', 'h2'),
      block('If your child is under 8, start with ballet. It\'s the most useful foundation, and the discipline it builds transfers everywhere. Once they\'re comfortable in ballet, add a second style based on personality: jazz for the performer, hip hop for the rhythm-and-music kid, contemporary for the older expressive dancer.'),
      block('The dancers who progress fastest take ballet plus one or two complementary styles. The dancers who burn out are usually the ones taking five different classes a week with no foundation in any of them.'),

      block('Should they try all of them?', 'h2'),
      block('Eventually, yes — at least once. A jazz dancer who has never tried ballet has a ceiling on their growth. A hip hop dancer who has never tried contemporary will struggle when choreography asks for emotional range. Cross-training across styles builds the most versatile dancers.'),

      linkBlock([
        { text: 'Curious which style fits your child? ' },
        { text: 'Come try a free trial class', href: '/contact' },
        { text: ' in any of these styles. Sometimes the best way to know is to walk into the room.' },
      ]),
    ],
  },

  // ============ POST 6 ============
  {
    _id: 'blog-post-6',
    title: 'How Dance Builds Confidence, Discipline, and Friendships in Kids',
    slug: 'how-dance-builds-confidence-discipline-friendships',
    publishedAt: daysAgo(21),
    excerpt: 'The technique is what we teach. The confidence, the work ethic, the friendships — those are what dance actually builds. Here\'s how it happens.',
    seoDescription: 'How dance classes help kids build confidence, discipline, and lifelong friendships. Real benefits beyond the technical training.',
    categories: ['category-for-parents', 'category-studio-life'],
    tags: ['benefits of dance', 'confidence', 'child development'],
    featured: false,
    body: [
      block('Parents enroll their kids in dance for a lot of reasons. Some are obvious: exercise, coordination, an outlet for energy. Others reveal themselves slowly over years. The technical training is the visible product. What dance actually builds underneath is bigger.'),

      block('Confidence comes from doing hard things', 'h2'),
      block('Real confidence isn\'t something you can give a child. It\'s built through doing things that felt impossible until they weren\'t. A 6-year-old who lands a turn she\'s been working on for three weeks doesn\'t need anyone to tell her she\'s capable — she just proved it to herself.'),
      block('That stacks. Year over year, the dancer who has worked through hard combinations, performed in front of audiences, held it together through a forgotten step on stage, carries that into the rest of her life. School presentations, sports tryouts, job interviews at 22 — the same muscle.'),

      block('Discipline is built in the small things', 'h2'),
      block('Showing up to class when you\'re tired. Practicing the combination you can\'t get right. Tying your hair back the same way every week. Standing in the same spot at the barre. None of it feels dramatic. All of it teaches the same lesson: the people who get good at things are the people who show up consistently.'),
      block('Kids who learn this in the studio carry it into homework, music practice, college applications, careers. The dance is the vehicle. The discipline is the lesson.'),

      block('Friendships in dance are different', 'h2'),
      block('There\'s something specific about friendships built in dance classes. You spend hundreds of hours in the same room with the same kids, working on the same things, watching each other improve. By the time they\'re teenagers, the dancers in a class know each other in ways school friends often don\'t.'),
      block('We\'ve watched dancers who met at age 5 become each other\'s maids of honor at 25. We\'ve watched competitive teams turn into chosen families. The studio becomes a third place — not home, not school, but somewhere they\'re fully themselves.'),

      block('Performing builds something irreplaceable', 'h2'),
      block('Standing on a stage in front of an audience is one of the most useful things a child can learn to do. The adrenaline, the focus, the recovery from a mistake mid-performance — these are skills that translate to every public-facing moment of adult life.'),
      block('Kids who perform regularly become adults who can present, speak, advocate, and show up under pressure. It\'s not because they all become professional dancers. It\'s because they got reps in the most useful skill there is: doing your thing while people watch.'),

      block('Failure is taught here too', 'h2'),
      block('Every dancer falls out of a turn in a recital. Every team has a competition that doesn\'t go their way. Every student gets a correction in front of the class that stings. Studios that handle this well teach kids that failure is information, not identity. You missed the turn — let\'s figure out why. The team didn\'t place — what do we work on this month?'),
      block('That\'s a worldview. Kids who get it early are protected from a lot of the perfectionism that hits high-achieving teenagers.'),

      block('What dance doesn\'t do', 'h2'),
      block('Dance doesn\'t fix every problem. It doesn\'t turn shy kids into extroverts overnight. It doesn\'t guarantee scholarships or stardom. What it does is provide a structured environment where kids can grow at their own pace, with teachers who care, alongside peers who get them.'),
      block('That\'s enough. That\'s actually a lot.'),

      block('The long view', 'h2'),
      block('Most of our dancers won\'t become professionals. Almost none of them will. What they\'ll carry into adulthood is the work ethic, the friendships, the body awareness, the comfort with their own physicality. They\'ll know what it feels like to commit to something and improve at it. That\'s the actual product.'),

      linkBlock([
        { text: 'If you\'re thinking about getting your child into dance, ' },
        { text: 'reach out for a free trial', href: '/contact' },
        { text: '. The technique is the easy part to talk about. The rest is what keeps families with us for years.' },
      ]),
    ],
  },

  // ============ POST 7 ============
  {
    _id: 'blog-post-7',
    title: 'What to Wear to Dance Class: A Complete Dress Code Guide',
    slug: 'what-to-wear-to-dance-class',
    publishedAt: daysAgo(14),
    excerpt: 'Dance class attire isn\'t about uniformity for its own sake. The right clothes let teachers see alignment, let dancers move freely, and set the tone for serious work.',
    seoDescription: 'What kids should wear to ballet, jazz, hip hop, and contemporary dance classes. A complete dress code guide for Las Vegas parents.',
    categories: ['category-class-guides', 'category-beginner-tips'],
    tags: ['dress code', 'what to wear', 'dance attire'],
    featured: false,
    body: [
      block('New dance parents often ask why dress codes matter. It seems strict for a 5-year-old to wear a specific leotard color, and the conversation can feel like nitpicking. Here\'s why it actually matters, and a practical guide for what to wear in each style.'),

      block('Why dress codes exist at all', 'h2'),
      block('Teachers need to see the body. A dancer in baggy sweatpants might be doing a beautiful tendu, or might be doing it wrong — there\'s no way to tell. Form-fitting attire lets the teacher see hip alignment, knee tracking, shoulder placement, and everything else that matters in technique. Loose clothing hides problems that need correcting.'),
      block('Dress code also sets the tone. Walking into a ballet class in a leotard signals to the brain that something specific is about to happen. It\'s the same reason chefs wear whites and surgeons wear scrubs. The clothes prepare the mindset.'),

      block('Ballet attire', 'h2'),
      block('The standard is a leotard and tights. Color and style requirements vary by level — beginner classes are usually more flexible, advanced classes often require specific colors so the class looks unified at the barre. Hair must be in a bun, no jewelry beyond small stud earrings, and ballet shoes (usually pink leather or canvas for younger dancers).'),
      block('A practical note: invest in two leotards and at least three pairs of tights. Laundry happens. Spare tights live in the dance bag.'),

      block('Jazz attire', 'h2'),
      block('Jazz is more flexible than ballet but still asks for form-fitting clothing. Leggings or jazz shorts, fitted tops, hair pulled back. Jazz shoes (slip-on leather or canvas with a small heel for older dancers) are standard, though many jazz classes work barefoot or in foot undeez.'),
      block('Avoid anything that\'ll fly up during turns — loose tank tops, oversized shirts, baggy shorts. If it covers your face during a leap, it\'s wrong.'),

      block('Hip hop attire', 'h2'),
      block('Hip hop is the most relaxed dress code, which doesn\'t mean anything goes. The standard is athletic wear: leggings or joggers, fitted t-shirts or crop tops, sneakers (clean sneakers, dedicated to dance — don\'t wear the shoes you walked through the parking lot in).'),
      block('Hair is more flexible but should be off the face. Jewelry should be minimal — chains and bracelets that swing during choreography are distracting and can hit other dancers.'),

      block('Contemporary attire', 'h2'),
      block('Contemporary is the most variable. Some classes work in leotards and tights like ballet, others in leggings and fitted tops like jazz. Bare feet are the standard. Hair pulled back. The goal is freedom of movement combined with visible body lines.'),

      block('What never works', 'h2'),
      block('Denim of any kind. Skirts over leotards (you can\'t move). Strong perfume or cologne. Watches and rings. Anything with metal that could scratch another dancer. Loose hair, in any class.'),
      block('Also: street shoes on the dance floor. Studio floors are expensive and street shoes destroy them. Always change into dance shoes inside the studio.'),

      block('The right hair, every time', 'h2'),
      block('Hair pulled back tightly is non-negotiable across every style. For ballet, that means a bun. For jazz and hip hop, a tight ponytail or braid works. The reasons: hair in the face is dangerous during turns, hair flying around is distracting for the dancer and the class, and a teacher needs to see the dancer\'s neck and shoulders to give correction.'),

      block('Buying gear: what\'s worth it', 'h2'),
      block('Worth investing in: good ballet shoes that fit properly, quality leotards that hold up to wash, sneakers dedicated to dance only. Not worth investing in: expensive brand-name leggings for a 6-year-old (they\'ll grow out of them), competition-style costumes for beginner classes, anything you saw on Instagram and bought for image.'),
      block('Most studios have a recommended retailer or in-house dancewear option. Ask. You\'ll save money on returns.'),

      block('What to bring in the bag', 'h2'),
      block('Water bottle, hair ties (multiple), bobby pins, a small towel, a snack for after class, and the right shoes for the class style. Optional but smart: a sweater for warming up before class starts.'),

      linkBlock([
        { text: 'For Evolve\'s specific dress code by class level, ' },
        { text: 'check our FAQ', href: '/faq' },
        { text: ' or ask at the front desk. We\'re happy to walk new families through exactly what to buy.' },
      ]),
    ],
  },

  // ============ POST 8 ============
  {
    _id: 'blog-post-8',
    title: 'Preparing for the Year-End Concert: What Parents Need to Know',
    slug: 'preparing-for-year-end-concert',
    publishedAt: daysAgo(7),
    excerpt: 'The concert is the moment a year of training becomes a real performance. Here\'s how to support your child through the lead-up, the day-of, and everything after.',
    seoDescription: 'A parent\'s guide to the year-end dance concert. How to prepare your child, what to expect, and how to make the day go smoothly.',
    categories: ['category-studio-life', 'category-for-parents'],
    tags: ['concert', 'recital', 'performance', 'preparation'],
    featured: true,
    body: [
      block('Concert season is the most exciting and most exhausting part of the dance year. Costumes arrive, choreography clicks, kids who\'ve been quiet all year suddenly want to practice in the living room. For new dance parents, the lead-up can feel like a lot. Here\'s how to navigate it.'),

      block('The weeks before', 'h2'),
      block('Rehearsals get longer. Stress builds, even in classes that feel relaxed all year. This is normal. Your child may come home tired, occasionally frustrated, occasionally bursting with energy. Resist the urge to comment on their progress — let the teachers manage the technical side. Your job at home is to keep things stable.'),
      block('Sleep matters more than usual. So does nutrition. So does protecting practice time without making it feel like pressure.'),

      block('Costume day', 'h2'),
      block('When costumes come home, treat them with care. Hang them up immediately, label everything, and don\'t let your child wear them around the house. Costumes are typically rented or studio-owned, and they need to be in performance shape on concert day. Tights, hair pieces, and accessories often live in the costume bag — keep it organized in one place.'),

      block('The week of the concert', 'h2'),
      block('Most studios have a dress rehearsal in the week before. Treat this as seriously as the show itself. The dress rehearsal is when problems get found and fixed — missed cues, costume issues, music transitions. Show up on time, in full costume, hair done as it will be for the actual concert.'),
      block('Don\'t over-rehearse at home this week. Your child has done the work. Cramming the night before makes them more anxious, not more prepared.'),

      block('Concert day morning', 'h2'),
      block('Eat real food. A dancer running on a granola bar and adrenaline crashes mid-show. Solid breakfast, light lunch, water throughout the day. No energy drinks, no sugar bombs.'),
      block('Hair and makeup come together at home or at the studio depending on age. Younger dancers usually do hair and makeup at home; older dancers often handle it backstage. Either way, allow more time than you think you need.'),

      block('At the venue', 'h2'),
      block('Arrive at the call time, not before. Backstage gets chaotic with too many parents. Hand off your child to the studio team, find your seat, trust the process. Most studios have backstage coordinators who manage transitions, costume changes, and the dozens of small things parents don\'t see.'),
      block('Bring tissues. Even parents who don\'t think they\'ll cry tend to cry. Especially during the youngest dancers\' numbers.'),

      block('What kids actually need from parents on concert day', 'h2'),
      block('Calm. That\'s it. Your child will be scanning your face all day for signals about whether everything is okay. If you\'re relaxed, they\'re relaxed. If you\'re anxious about costume changes or makeup or timing, they absorb it.'),
      block('Save the "you were amazing" for after. During the day, the most useful thing you can give them is steady, low-key support. "How are you feeling? Need water? You\'ve got this."'),

      block('When things go wrong on stage', 'h2'),
      block('Sometimes they will. A missed step, a tripped landing, a costume malfunction, a frozen moment. The dancers who recover well are the ones whose parents have told them in advance: mistakes happen, you keep going, the audience usually doesn\'t notice.'),
      block('After the show, don\'t fixate on what went wrong. They know. Talk about what felt good. The technical analysis can wait until next week\'s class.'),

      block('The after-party and the comedown', 'h2'),
      block('Most concerts are followed by some kind of celebration — flowers, photos, dinner. Then comes the comedown. A lot of dancers feel a real emotional drop in the day or two after concert. They\'ve been building toward this moment for months, and suddenly it\'s done.'),
      block('Let them feel it. Don\'t immediately push them toward summer intensives or "what\'s next." Give them a week to land.'),

      block('What you keep from concert year', 'h2'),
      block('The photos and video matter, but what stays with families is something else. The car ride home with a tired, glittery, proud kid in the back seat. The friendships forged backstage. The moment your child realized she could do something hard, in front of people, and survive it. That\'s the real concert.'),

      linkBlock([
        { text: 'New to Evolve and curious how our concert works? ' },
        { text: 'Reach out to the studio', href: '/contact' },
        { text: ' for details on this year\'s show, and read ' },
        { text: 'our FAQ', href: '/faq' },
        { text: ' for the specifics on costumes, fees, and timing.' },
      ]),
    ],
  },
]

// ---------- Migration ----------
async function migrate() {
  console.log('\nStarting blog migration...\n')

  // Step 1: Categories
  console.log('Seeding categories...')
  for (const cat of categories) {
    try {
      await client.createOrReplace({
        _id: cat._id,
        _type: 'category',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        description: cat.description,
      })
      console.log(`  ✓ ${cat.title}`)
    } catch (err: any) {
      console.error(`  ✗ ${cat.title}: ${err.message}`)
    }
  }

  // Step 2: Blog Posts
  console.log('\nSeeding blog posts...')
  for (const post of posts) {
    try {
      await client.createOrReplace({
        _id: post._id,
        _type: 'blogPost',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        publishedAt: post.publishedAt,
        excerpt: post.excerpt,
        seoDescription: post.seoDescription,
        body: post.body,
        categories: post.categories.map((catId) => ({
          _type: 'reference',
          _ref: catId,
          _key: Math.random().toString(36).slice(2, 10),
        })),
        tags: post.tags,
        featured: post.featured,
        published: false,
      })
      console.log(`  ✓ ${post.title}`)
    } catch (err: any) {
      console.error(`  ✗ ${post.title}: ${err.message}`)
    }
  }

  console.log('\n✓ Migration complete.')
  console.log(`  - ${categories.length} categories`)
  console.log(`  - ${posts.length} blog posts (all drafts, published: false)`)
  console.log('\nReview in Studio at /studio, then toggle published: true to go live.\n')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
