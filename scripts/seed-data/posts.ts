/*
  Seed fixtures, not site content.

  These are the articles the site shipped with before the CMS existed. The site
  itself now reads from Supabase; `scripts/seed-content.ts` uses this file once
  to fill an empty project. Delete both files in this folder after seeding, or
  keep them as a record of what the placeholder copy said.
*/

export type PostSection = {
  heading: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  /** One-line summary used on the cards and as the page description. */
  excerpt: string;
  /** Matches a service, so the post can borrow that service's glyph. */
  category: string;
  icon: string;
  /** ISO date; posts are surfaced newest first. */
  date: string;
  readingMinutes: number;
  /** Opening paragraph, set larger than the body on the article page. */
  lead: string;
  sections: PostSection[];
};

/**
 * Placeholder articles in the founder's voice — replace with the real writing
 * before launch. Everything the blog renders comes from here, so the homepage
 * section and both blog routes stay presentational.
 */
const entries: Post[] = [
  {
    slug: "five-vastu-corrections-without-breaking-a-wall",
    title: "Five Vastu Corrections That Need No Demolition",
    excerpt:
      "Small, reversible changes to light, weight and flow that settle a home long before any structural work is considered.",
    category: "Vastu Consultation",
    icon: "/icons/services/vastu.png",
    date: "2026-08-12",
    readingMinutes: 6,
    lead:
      "Most people arrive at a Vastu consultation braced for bad news, certain that a wall must come down or a kitchen must move. In nine visits out of ten, nothing of the sort is needed.",
    sections: [
      {
        heading: "Start with weight, not walls",
        paragraphs: [
          "A home carries its heaviness in the south and west, and keeps the north and east open and light. Before anything structural is discussed, look at where the almirahs, the safe and the storage beds are standing. Shifting a heavy cupboard from the north-east to the south-west costs an afternoon and changes how a room feels to walk into.",
          "The same logic applies to clutter. The north-east corner of a plot is its lightest point; a stack of cartons parked there does quiet, daily damage that no remedy can offset.",
        ],
      },
      {
        heading: "Let the entrance breathe",
        paragraphs: [
          "The main door is where a home draws its breath. A shoe rack pressed against it, a broken bell, a bulb that has been out for months: none of these are superstitions to be waved away. They are signals that the threshold is being treated as storage rather than as an entrance.",
          "Clear a metre of space in front of the door, fix the light, and keep the door itself clean and freshly painted. Clients often report the change in mood within the first week.",
        ],
      },
      {
        heading: "Correct the direction you sleep in",
        paragraphs: [
          "Sleeping with the head to the south or the east tends to produce deeper rest; the north is best avoided. Turning a bed is the least invasive correction in the entire discipline and, for anyone waking unrested, usually the most immediately felt.",
        ],
      },
      {
        heading: "Mirrors, water and the north",
        paragraphs: [
          "Mirrors on the north and east walls extend a room and are welcome. Mirrors facing a bed are not. Water, whether an aquarium, a small fountain or the drinking water pot, belongs to the north-east, and does its best work when it is visibly clean and actually moving.",
        ],
      },
      {
        heading: "Give the fire its own corner",
        paragraphs: [
          "The south-east governs fire. A cooking range placed there, with the cook facing east, is the single most consequential kitchen alignment. Where the slab cannot be moved, keeping the burner at the south-east end of the existing counter recovers much of the benefit.",
          "None of these five need a mason. They are where every consultation should begin, and often where it can end.",
        ],
      },
    ],
  },
  {
    slug: "reading-a-birth-chart-without-fear",
    title: "Reading a Birth Chart Without Fear",
    excerpt:
      "A chart describes weather, not verdicts. How to read your own horoscope as a map of timing rather than a list of sentences.",
    category: "Astrology Consultation",
    icon: "/icons/services/astrology.png",
    date: "2026-07-28",
    readingMinutes: 7,
    lead:
      "People come to astrology with one of two questions. The first is what will happen. The second, quieter and far more useful, is why the last few years felt the way they did.",
    sections: [
      {
        heading: "A chart is a description, not a decree",
        paragraphs: [
          "A horoscope maps the sky at the moment of a birth. It describes conditions: the seasons a life will move through, the years when effort compounds and the years when it merely accumulates. It hands down no sentences, and any reading that leaves you frightened has been done badly.",
        ],
      },
      {
        heading: "Dashas explain the years that made no sense",
        paragraphs: [
          "The Vimshottari dasha divides a life into planetary periods, each with its own texture. A Saturn period asks for patience and structure, and gives back slowly. A Jupiter period widens the field. Clients frequently recognise a difficult stretch the moment it is placed on this timeline. The difficulty had a shape, and it had an end date.",
          "Knowing which period you are in changes the question from what is wrong with me to what is this season asking of me.",
        ],
      },
      {
        heading: "Remedies are practice, not purchase",
        paragraphs: [
          "A remedy is meant to build the quality a chart is short of. That is usually a discipline: a fast held properly, a charity kept up for a year, a mantra repeated at the same hour each day. Gemstones have their place, but they belong at the end of the list rather than the beginning, and no honest consultant will sell you one in the same conversation that recommends it.",
        ],
      },
      {
        heading: "What to bring to a reading",
        paragraphs: [
          "An accurate birth time matters more than anything else you can bring. Ten minutes can move the ascendant and, with it, the entire framework of the chart. If the time is uncertain, say so at the outset. The chart can be rectified against events you already remember.",
        ],
      },
    ],
  },
  {
    slug: "what-your-name-number-is-telling-you",
    title: "What Your Name Number Is Actually Telling You",
    excerpt:
      "Before changing the spelling of your name, understand the difference between the number you were born with and the one you answer to.",
    category: "Numerology Consultation",
    icon: "/icons/services/numerology.png",
    date: "2026-07-09",
    readingMinutes: 5,
    lead:
      "Every few months a client arrives having added a letter to their name on someone's advice, and reports that nothing has changed. Usually nothing was wrong with the name to begin with.",
    sections: [
      {
        heading: "Two numbers, two different jobs",
        paragraphs: [
          "Your birth number comes from the date you arrived and cannot be altered. It describes temperament, the raw material. Your name number comes from the letters you are actually called by, and describes how that temperament meets the world.",
          "Trouble tends to appear when the two pull in opposite directions, not because either one is inherently unlucky. There are no unlucky numbers.",
        ],
      },
      {
        heading: "The name that counts is the one people use",
        paragraphs: [
          "A legal name on a certificate that nobody says aloud carries far less weight than the short form used by colleagues and family every day. This is why adding a silent letter to a passport rarely produces the promised change: the vibration being altered is not the one in circulation.",
        ],
      },
      {
        heading: "When a correction is worth making",
        paragraphs: [
          "A spelling change is worth considering when a birth number and a working name are genuinely at odds, and when the person is willing to use the new spelling consistently for at least a year: in signatures, in email, in introductions. Half-adoption gives half-results, which is to say none.",
          "Where the two numbers already agree, the honest advice is to leave the name alone and put the effort into timing instead.",
        ],
      },
    ],
  },
  {
    slug: "what-a-reiki-session-feels-like",
    title: "What a Reiki Session Actually Feels Like",
    excerpt:
      "For anyone curious but sceptical: what happens in the room, what it does not claim to do, and how to tell a careful practitioner from a careless one.",
    category: "Healing & Reiki",
    icon: "/icons/services/healing.png",
    date: "2026-06-21",
    readingMinutes: 5,
    lead:
      "Energy healing suffers from its own vocabulary. Described plainly, a Reiki session is an hour of stillness with a trained practitioner, and much of what it offers is available to anyone willing to lie down and stop.",
    sections: [
      {
        heading: "The hour itself",
        paragraphs: [
          "You stay fully clothed and lie on a low table. The practitioner works with hands held lightly on or just above the body, moving through a fixed sequence of positions from the head down. Nothing is manipulated and nothing hurts.",
          "Most people report warmth, a heaviness in the limbs, and the particular drowsiness that arrives just before sleep. A few feel very little the first time. Both are ordinary.",
        ],
      },
      {
        heading: "What it is good for",
        paragraphs: [
          "Reiki is at its most useful for the things that sit on top of a life rather than inside a diagnosis: sleeplessness, a grief that will not settle, the flattened exhaustion that follows a long stretch of caregiving. It is a support, and it works best alongside medical care rather than instead of it.",
          "Any practitioner who tells you to stop a prescribed treatment should be left immediately.",
        ],
      },
      {
        heading: "Choosing a practitioner",
        paragraphs: [
          "Ask where they trained and who attuned them. Ask how many sessions they expect to need, and be wary of an answer that stretches indefinitely into the future. A session should leave you steadier and rather less dependent, not more.",
        ],
      },
    ],
  },
  {
    slug: "asking-the-tarot-a-better-question",
    title: "Asking the Tarot a Better Question",
    excerpt:
      "The spread is rarely the problem. How a question is framed decides whether a reading gives you guidance or a fortune cookie.",
    category: "Tarot Reading",
    icon: "/icons/services/tarot.png",
    date: "2026-05-30",
    readingMinutes: 4,
    lead:
      "A tarot reading is only as good as the question it is asked. Bring a closed question and you will get a closed answer, which is another way of saying an unusable one.",
    sections: [
      {
        heading: "Closed questions waste the cards",
        paragraphs: [
          "Will he call. Will I get the job. Will we buy the house. Each of these reduces a spread to a coin toss and hands a decision to a deck of cards, which was never the point.",
          "Reframed, the same concerns become workable: what is unresolved between us, what is this role asking of me, what am I not seeing about this purchase.",
        ],
      },
      {
        heading: "Ask about your own position",
        paragraphs: [
          "The cards read the querent, not the absent third party. Questions about what someone else is secretly thinking tend to produce projections dressed as insight. Questions about your own footing in a situation produce something you can act on by the evening.",
        ],
      },
      {
        heading: "One question, held steady",
        paragraphs: [
          "Shuffling again because the first answer was unwelcome does not change the situation; it only muddies the reading. Take the spread you were given, sit with it for a few days, and return when circumstances have actually moved.",
        ],
      },
    ],
  },
  {
    slug: "when-one-reading-is-not-enough",
    title: "When One Reading Is Not Enough",
    excerpt:
      "Some questions sit where a chart, a number and a floor plan meet. How a combined analysis is put together, and when it earns its place.",
    category: "Combined Analysis",
    icon: "/icons/services/combined.png",
    date: "2026-05-14",
    readingMinutes: 6,
    lead:
      "A recurring pattern rarely has a single cause: money that arrives and leaves, health that dips with every move, a career that stalls at the same rung. Looking at it through one discipline gives one third of a picture.",
    sections: [
      {
        heading: "Three views of the same problem",
        paragraphs: [
          "The chart describes timing and temperament. The numbers describe how a person meets the world and what they answer to. The space describes the conditions they live and work in every day. A combined analysis lays the three side by side and looks for where they agree.",
          "Agreement is the useful signal. When a difficult planetary period coincides with a mismatched working name and a bedroom in the wrong corner of the house, the correction has three points of leverage instead of one.",
        ],
      },
      {
        heading: "How the sitting is structured",
        paragraphs: [
          "The chart is cast and studied before we meet. The numbers are worked out from the birth date and the name in daily use. The space is reviewed from a dimensioned floor plan with directions marked, or on site where that is possible. Only then do we sit down together, usually for around ninety minutes.",
          "You leave with a written summary: what was found, which corrections come first, and what can wait a year.",
        ],
      },
      {
        heading: "When a single consultation is the better answer",
        paragraphs: [
          "If the question is specific and recent (a decision due this month, one room that feels wrong), a single consultation is faster, cheaper and quite sufficient. A combined analysis earns its place when the pattern is old and has survived earlier attempts to fix it.",
        ],
      },
    ],
  },
];

/** Newest first, so the homepage and the index agree without manual ordering. */
export const posts: Post[] = [...entries].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** The three carried on the homepage. */
export const featuredPosts = posts.slice(0, 3);

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Further reading offered at the foot of an article. */
export function relatedPosts(slug: string, count = 2): Post[] {
  return posts.filter((post) => post.slug !== slug).slice(0, count);
}
