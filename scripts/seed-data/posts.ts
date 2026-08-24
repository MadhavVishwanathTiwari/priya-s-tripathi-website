/*
  Seed fixtures, not site content.

  The site reads from Supabase; `scripts/seed-content.ts` uses this file to fill
  a project, and can be re-run safely because articles upsert on their slug.

  Everything here is filler. Each row carries `placeholder: true` into the
  database, so the CMS can show which articles are hers and which are the
  build's, and so all of them can be cleared in one statement before launch:

    delete from public.posts where placeholder;
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
  /**
   * True for every article here. All of it is filler written in her voice to
   * give each service three pieces of reading; none of it is her writing.
   * Cleared with `delete from public.posts where placeholder;`.
   */
  placeholder: boolean;
  /** Opening paragraph, set larger than the body on the article page. */
  lead: string;
  sections: PostSection[];
};

/**
 * Eighteen placeholder articles in the founder's voice, three per service, so
 * that the "Reading on this" grid on each service page has something to fill
 * its three columns. Every one of them is written by the build, not by her.
 * They are marked `placeholder: true` all the way through to the database, and
 * they are meant to be replaced with her own writing before launch.
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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
    placeholder: true,
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
  {
    slug: "when-three-readings-disagree",
    title: "When Three Readings Say Different Things",
    excerpt:
      "Vastu, the chart and the numbers can each point somewhere else. Where they diverge is usually the most useful part of the consultation.",
    category: "Combined Analysis",
    icon: "/icons/services/combined.png",
    date: "2026-08-05",
    readingMinutes: 6,
    placeholder: true,
    lead:
      "Clients sometimes come back unsettled because the numerologist said one thing and the astrologer another, and they want to know which of the two was wrong. Usually neither was.",
    sections: [
      {
        heading: "Three instruments, three questions",
        paragraphs: [
          "Vastu asks what the space is doing to the people in it. A chart asks about timing: what is arriving, and roughly when. Numbers ask about temperament, the grain of the person the other two are happening to. These are different questions, and there is no reason their answers should coincide.",
          "Expecting all three to agree is like expecting a thermometer and a clock to return the same reading. When they do line up, that is information. When they do not, that is also information, and it is more often the interesting kind.",
        ],
      },
      {
        heading: "Where they overlap, act there first",
        paragraphs: [
          "The moment worth waiting for in a combined analysis is when the same theme surfaces independently in all three. A north-east that has been closed off, a chart period that pulls at the same area of life, a birth number that has always struggled with exactly that: three unrelated instruments pointing at one thing.",
          "That is where the first remedy goes. Not because it is the most dramatic finding, but because three confirmations mean the diagnosis is unlikely to be an artefact of how I read any single one of them.",
        ],
      },
      {
        heading: "Where they diverge, look at the question",
        paragraphs: [
          "Most apparent contradictions dissolve once you ask what each instrument was actually being asked. A chart saying a period will be demanding and a Vastu report saying the house is sound are not in conflict. One is describing weather, the other is describing the roof.",
          "The genuine contradictions are rarer and they tend to be about emphasis rather than fact: two of the three make something look central that the third treats as minor. That is worth sitting with rather than resolving quickly.",
        ],
      },
      {
        heading: "What I do with a contradiction",
        paragraphs: [
          "I say it. A consultation that arrives at a single seamless story has usually had its inconvenient parts trimmed, and the client is the one who pays for that later.",
          "So the report says where the three agreed, where they did not, and which of the disagreements I think matters. You are entitled to the untidy version. It is the one that is true.",
        ],
      },
    ],
  },
  {
    slug: "what-reiki-is-not",
    title: "What Reiki Is Not",
    excerpt:
      "Being clear about the limits of a healing session is the thing that makes the rest of it worth trusting.",
    category: "Healing & Reiki",
    icon: "/icons/services/healing.png",
    date: "2026-07-19",
    readingMinutes: 5,
    placeholder: true,
    lead:
      "The most useful conversation I have with a new client is usually about what a session will not do. It costs me a booking now and again, and I would rather it did.",
    sections: [
      {
        heading: "It is not a substitute for treatment",
        paragraphs: [
          "If you are under a doctor's care, stay under it. Nothing in a healing session replaces medication, therapy, or a diagnosis someone qualified has given you. I will ask what else you have in place, and if the honest answer is nothing, I will say that the first call should be to a doctor rather than to me.",
          "This is not modesty. Anyone who tells you to stop a treatment because of what they felt in a session is telling you something dangerous, whatever else they may be good at.",
        ],
      },
      {
        heading: "It is not a diagnosis",
        paragraphs: [
          "What I notice in a session is where a person seems to be holding tension, and what comes up when they stop holding it. That is not the same as knowing what is wrong with them, and I do not present it as though it were.",
          "If something I notice seems worth investigating, the sentence I use is that it might be worth mentioning to your doctor. Not that you have a condition.",
        ],
      },
      {
        heading: "It is not a guarantee",
        paragraphs: [
          "Some people get up from a session and describe an obvious shift. Some feel pleasantly rested and nothing more. A few feel nothing at all, and I have no explanation for them that would be honest.",
          "I do not promise outcomes at the booking stage, and I would be wary of anyone in this field who does.",
        ],
      },
      {
        heading: "What is left is still worth having",
        paragraphs: [
          "An hour in which nothing is asked of you, nobody needs a decision from you, and the week is allowed to be set down. Attention from someone whose only job in that hour is to pay it. For a great many people who come to me, that is the substance of it rather than a consolation prize.",
          "Told plainly, that is a modest offer. It is also one I can make without overstating a thing.",
        ],
      },
    ],
  },
  {
    slug: "the-cards-that-frighten-people",
    title: "The Cards That Frighten People",
    excerpt:
      "Death, the Tower and the Devil turn up far more often than their reputation suggests, and almost never mean what the film version implies.",
    category: "Tarot Reading",
    icon: "/icons/services/tarot.png",
    date: "2026-07-02",
    readingMinutes: 6,
    placeholder: true,
    lead:
      "Three cards make a client's face change the moment they land on the table. I have never once used any of them to predict a death, and I am not going to start.",
    sections: [
      {
        heading: "Death is the ending card, not the dying card",
        paragraphs: [
          "It marks something concluding, and it is usually blunt about the fact that the conclusion is not optional. A job, an arrangement, a version of yourself that the last few years have quietly finished with.",
          "The reason it unsettles people is rarely the imagery. It is that they already know what is ending and have been avoiding saying so out loud.",
        ],
      },
      {
        heading: "The Tower is the one you already know about",
        paragraphs: [
          "In readings the Tower almost always attaches to a structure the client has privately understood to be unsound for some time. The card does not announce a disaster out of nowhere. It says the propping up has a shelf life.",
          "Where it is genuinely useful is in the question that follows: if this comes down, what do you want to be standing when it does. That is a planning conversation, not a prophecy.",
        ],
      },
      {
        heading: "The Devil is about the thing you keep choosing",
        paragraphs: [
          "Not evil, and not someone doing something to you. It points at a pattern the person is participating in and getting something from, which is precisely why it persists. The arrangement is uncomfortable and it is also working for them in some way they have not admitted.",
          "Read like that, it is the least frightening of the three and by some distance the most confronting.",
        ],
      },
      {
        heading: "Why the reputation persists",
        paragraphs: [
          "Dread sells. A reader who leans on these three can produce a memorable hour and a client who comes back out of anxiety rather than usefulness. It is a poor way to work and it is not hard to spot.",
          "If a card is difficult, I say it is difficult and then we spend the remaining time on what can be done. Leaving somebody alone with an image and a grim tone is not a reading. It is just a fright.",
        ],
      },
    ],
  },
  {
    slug: "vastu-when-you-cannot-change-the-building",
    title: "Vastu When You Cannot Change the Building",
    excerpt:
      "Most clients are tenants. Nearly everything worth doing in Vastu can be done without touching a wall or asking a landlord for anything.",
    category: "Vastu Consultation",
    icon: "/icons/services/vastu.png",
    date: "2026-06-13",
    readingMinutes: 6,
    placeholder: true,
    lead:
      "A good share of the people who write to me are renting, and they open with an apology: they cannot make structural changes, so is there any point in a consultation. There is, and usually more than they expect.",
    sections: [
      {
        heading: "You are not correcting the building",
        paragraphs: [
          "This is the reframe that makes the rest possible. A consultation is not principally about the walls. It is about how the people inside are using what the walls have given them, and that is entirely yours to change whether you own the place or not.",
          "Two families in identical flats in the same block will often have very different reports, because they have furnished and inhabited them differently.",
        ],
      },
      {
        heading: "Four things a tenant can always move",
        paragraphs: [
          "The bed, and which way the head points. The desk, and which way you face when you work. Where the drinking water and any other water sits. And weight: the almirah, the trunks, the boxes nobody has opened since the last move.",
          "Those four cover the majority of what I would recommend to an owner as well. None of them require permission, a mason, or a deposit you will never see again.",
        ],
      },
      {
        heading: "Light and air cost nothing",
        paragraphs: [
          "A bulb that has been out for months on the landing. A window that is never opened because the frame sticks. A curtain kept drawn on the one side of the flat that gets morning sun. These come up in nearly every rented property I look at, and every one of them is a tenant's decision rather than a landlord's.",
        ],
      },
      {
        heading: "What genuinely needs an owner",
        paragraphs: [
          "Some things I cannot help with in a rental, and it is only fair to name them. A main door in a difficult direction cannot be relocated. A kitchen slab built into the wrong corner stays where it is. A toilet in the north-east is a real problem and not one a tenant can solve.",
          "Where that is the case I will say so, suggest what can be done to offset it, and be honest that offsetting is not the same as fixing. If a place is badly enough set up, the most useful advice I can give is to remember this at the end of the lease.",
        ],
      },
    ],
  },
  {
    slug: "choosing-a-date-that-holds",
    title: "Choosing a Date That Holds",
    excerpt:
      "How date selection actually works for a wedding, a registration or a first day, and why the perfect date usually does not exist.",
    category: "Numerology Consultation",
    icon: "/icons/services/numerology.png",
    date: "2026-06-04",
    readingMinutes: 5,
    placeholder: true,
    lead:
      "People ask for the best date for something and expect one line in reply. What they get is a shortlist, a ranking, and a plain note about what each option costs them.",
    sections: [
      {
        heading: "There is rarely one right date",
        paragraphs: [
          "A date has to answer to the person's own numbers, to the nature of what is being started, and to the calendar as it actually is. Those three almost never converge on a single day within a window anyone can work with.",
          "So the output is a handful of workable dates in order, with the reasoning attached. If somebody hands you one date and no alternatives, ask what the second best was and why.",
        ],
      },
      {
        heading: "The date has to be one you can use",
        paragraphs: [
          "A beautifully chosen day that requires forty relatives to take leave at ten days' notice is not a good date. Neither is one that puts a registration in a week you already know will be chaotic at work.",
          "I ask about the constraints before I look at anything else, because a recommendation that gets quietly abandoned has done nobody any good.",
        ],
      },
      {
        heading: "What a date can and cannot carry",
        paragraphs: [
          "A well-chosen starting date supports something that is otherwise sound. It does not rescue a business with no customers or a marriage that both parties have doubts about. I have watched people load a great deal onto a date and then feel betrayed by it.",
          "Where the underlying thing is shaky, I would rather say that than pick a day and let the day take the blame later.",
        ],
      },
      {
        heading: "Working backwards from the constraint",
        paragraphs: [
          "In practice the most useful version of this work is the reverse of what people ask for. Rather than finding the ideal date and asking the world to accommodate it, tell me the two or three windows you can realistically manage. I will tell you which is the kindest, and what to be careful about within it.",
        ],
      },
    ],
  },
  {
    slug: "sade-sati-without-the-dread",
    title: "Sade Sati Without the Dread",
    excerpt:
      "The seven and a half years everyone fears, described as what it usually is: a long and demanding stretch that people come out of changed rather than ruined.",
    category: "Astrology Consultation",
    icon: "/icons/services/astrology.png",
    date: "2026-05-22",
    readingMinutes: 6,
    placeholder: true,
    lead:
      "No phrase empties a client's face faster than Sade Sati. It has become shorthand for catastrophe, which is neither accurate nor much use to somebody living through it.",
    sections: [
      {
        heading: "What it actually is",
        paragraphs: [
          "Saturn moving through the three signs around the natal moon, which takes about seven and a half years. Everybody gets it. Most people get it two or three times in a life, which ought to be the first clue that it is not the calamity its reputation suggests.",
          "Saturn's business is consequence and structure. Periods under it tend to be slow, effortful, and unusually clear about which of your arrangements are load-bearing and which were never going to hold.",
        ],
      },
      {
        heading: "It is not uniform",
        paragraphs: [
          "The three phases are not equal, and they do not weigh the same for every chart. Where Saturn sits natally, what it rules for that person, and their age all change the texture of it considerably. A stretch that is punishing at twenty-four can be steadying at fifty-two.",
          "Any reading that treats the whole seven and a half years as one undifferentiated block of bad luck has not looked at the chart.",
        ],
      },
      {
        heading: "What people describe afterwards",
        paragraphs: [
          "The reports are remarkably consistent and rarely match the dread beforehand. Work that finally had to be faced. A relationship or a job that ended and, in hindsight, had been ending for years. A version of themselves they had outgrown and had not put down.",
          "Demanding is the word that recurs. Ruinous is not, though I will not pretend it is never true for anyone.",
        ],
      },
      {
        heading: "What helps and what does not",
        paragraphs: [
          "What helps is unremarkable: routine, honest accounting, finishing things, and not starting what you cannot sustain. Saturn rewards durability, so the useful posture is to become slightly more boring for a while.",
          "What does not help is buying your way out. If someone responds to this period by recommending an expensive remedy and an urgent timeline, you are being sold something. The people who fare best treat it as a stretch to be worked through rather than a curse to be lifted.",
        ],
      },
    ],
  },
  {
    slug: "what-to-check-before-you-buy-the-plot",
    title: "What to Check Before You Buy the Plot",
    excerpt:
      "The cheapest Vastu consultation is the one that happens before the sale deed, while everything is still a choice.",
    category: "Combined Analysis",
    icon: "/icons/services/combined.png",
    date: "2026-05-05",
    readingMinutes: 7,
    placeholder: true,
    lead:
      "By the time most people call me about a property, the papers are signed. The consultation is still worth having, but the range of what I can suggest has narrowed a great deal.",
    sections: [
      {
        heading: "Shape and slope come first",
        paragraphs: [
          "A regular rectangle or square is the straightforward case. Plots with a cut corner, particularly in the north-east, are the ones I ask people to think hardest about, because that is the correction you cannot make later without buying land you do not own.",
          "Slope matters and is easy to check on a walk around. Ground falling towards the north or the east is favourable. Ground rising there, with the low point in the south-west, is the arrangement I would want a good reason to accept.",
        ],
      },
      {
        heading: "The roads around it",
        paragraphs: [
          "Which sides the plot is approached from changes what can be built and where the entrance can sensibly go. A corner plot opens options; a plot with a single approach from an awkward direction closes several before you have drawn anything.",
          "This is worth checking against a plan rather than from memory of a site visit, because people routinely misremember which way they were facing.",
        ],
      },
      {
        heading: "What the chart adds at this stage",
        paragraphs: [
          "A property purchase is a large commitment made at a particular moment, and the chart speaks to the moment rather than the plot. It will not tell you whether the land is good. It can tell you whether this is a period in which you are likely to be making a clear-headed large decision or a pressured one.",
          "In practice I have used this more often to slow a purchase down by a few months than to stop one.",
        ],
      },
      {
        heading: "When to walk away",
        paragraphs: [
          "Rarely, and I try to say it plainly when I mean it. A north-east cut combined with an unfavourable slope and an approach that forces the entrance into a difficult direction is a stack of problems where each one makes the others harder to offset.",
          "Where the issues are individually manageable, they are usually worth managing. Where they compound, and where the buyer will be stretched financially on top of it, I will say that the next plot is likely to be a better purchase.",
        ],
      },
      {
        heading: "What skipping this costs",
        paragraphs: [
          "Not much, if the property turns out to be sound. If it does not, the difference between knowing at the offer stage and knowing after possession is the difference between choosing a different plot and living with a compromise for twenty years.",
        ],
      },
    ],
  },
  {
    slug: "how-a-distance-session-is-arranged",
    title: "How a Distance Session Is Actually Arranged",
    excerpt:
      "The practical side of a remote healing session: what you send beforehand, why the time is fixed, and what you are asked to do at your end.",
    category: "Healing & Reiki",
    icon: "/icons/services/healing.png",
    date: "2026-04-21",
    readingMinutes: 5,
    placeholder: true,
    lead:
      "Distance sessions raise more practical questions than anything else I offer, and almost none of them turn out to be about whether it works.",
    sections: [
      {
        heading: "What I ask for beforehand",
        paragraphs: [
          "Your name as you are actually called, a photograph if you are comfortable sending one, and a short note on what has brought you. Not a medical history. Just enough that I am not working from nothing.",
          "If you are under treatment for something, tell me. It does not stop the session, but it changes what I will and will not say about it afterwards.",
        ],
      },
      {
        heading: "The time is fixed for a reason",
        paragraphs: [
          "We agree a slot and you keep it, in your own timezone. The point is not that the hour is magical. It is that you are not doing something else during it.",
          "Clients who treat it as background while answering email get correspondingly less out of it, which is unsurprising and worth saying in advance.",
        ],
      },
      {
        heading: "What you do at your end",
        paragraphs: [
          "Lie down or sit somewhere you will not be interrupted, phone silent, no need to do anything in particular with your mind. Falling asleep is common and is not a failure.",
          "Some people notice warmth, or heaviness, or nothing at all. I ask clients not to go in looking for a sensation, because searching for one tends to be the thing that prevents any.",
        ],
      },
      {
        heading: "Afterwards",
        paragraphs: [
          "I write a short note on what I noticed, and we speak if you want to. Drink water, keep the evening light if you can, and expect to sleep well or oddly for a night.",
          "If nothing happened for you, say so. I would rather know than be told what I would like to hear, and it is a useful thing to know before deciding whether to book another.",
        ],
      },
    ],
  },
  {
    slug: "the-kitchen-is-the-hardest-room",
    title: "The Kitchen Is the Hardest Room",
    excerpt:
      "Fire, water and storage all want different corners of the same space, and a modern flat rarely offers any choice about it.",
    category: "Vastu Consultation",
    icon: "/icons/services/vastu.png",
    date: "2026-04-08",
    readingMinutes: 6,
    placeholder: true,
    lead:
      "If a consultation runs over its hour, it will be because of the kitchen. It is where the principles collide most often with what the builder settled years before anyone moved in.",
    sections: [
      {
        heading: "Fire wants the south-east",
        paragraphs: [
          "The burner is the single most consequential thing in the room, and the south-east is where it belongs, with the cook facing east. Where the whole kitchen sits in the south-east, this is easy and the rest of the room falls into place around it.",
          "Where the kitchen has been put in the north-east, which happens in a surprising number of flats, nothing about the room will be straightforward and the honest work is in ranking compromises rather than solving them.",
        ],
      },
      {
        heading: "Water wants to be somewhere else",
        paragraphs: [
          "The sink and the water storage want the north-east, which is to say the opposite corner from the burner. That is fine in a large kitchen and awkward in a galley, where the slab gives you a single straight run and the sink ends up a foot from the hob.",
          "Where they must share a wall, the thing to avoid is having them directly adjacent. Even a small separation, with the storage or the working space between them, is worth arranging.",
        ],
      },
      {
        heading: "What a modular kitchen takes away",
        paragraphs: [
          "Fitted kitchens are sold on the promise that everything has its place, and the cost is that nothing can be moved afterwards. Once the slab is cast and the units are screwed to the wall, the burner is where it is going to stay.",
          "This is the one room where I would ask to be consulted before the carpenter rather than after. An hour at the drawing stage is worth more here than a full consultation once it is installed.",
        ],
      },
      {
        heading: "Ranking the compromises",
        paragraphs: [
          "When the room cannot be right, the order I work in is: burner position first, then the direction the cook faces, then the separation of fire and water, then storage and weight. The further down the list you go, the more a compromise can be lived with.",
          "A kitchen that gets the first two right and fudges the rest is a working kitchen. One that gets the first two wrong is where I would spend the budget.",
        ],
      },
    ],
  },
  {
    slug: "numbers-in-a-business-name",
    title: "Numbers in a Business Name",
    excerpt:
      "What to weigh when naming a company, and why the number should be the last consideration rather than the first.",
    category: "Numerology Consultation",
    icon: "/icons/services/numerology.png",
    date: "2026-03-25",
    readingMinutes: 5,
    placeholder: true,
    lead:
      "A business name has to be sayable, spellable, and available. If a name clears those three and the numbers are also kind to it, that is a bonus rather than the starting point.",
    sections: [
      {
        heading: "Say it out loud first",
        paragraphs: [
          "Before any calculation, say the name down a bad phone line and ask somebody to spell it back. A name that needs to be repeated twice at every introduction will cost the business more over ten years than any numerological advantage will return.",
          "I have talked more clients out of numerically excellent names than into them, for exactly this reason.",
        ],
      },
      {
        heading: "The founder's numbers matter more",
        paragraphs: [
          "A company is run by a person, and in a small business the founder's chart and numbers do far more work than the trading name does. Where the two are at odds, I look at the founder first.",
          "This is also why the same name can suit one proprietor and sit awkwardly with another. There is no universally lucky business name, and anyone selling one is selling a list.",
        ],
      },
      {
        heading: "Registration dates do real work",
        paragraphs: [
          "Of the things within your control when starting a company, the date of incorporation is the one I would spend the most attention on. It is a fixed moment, it is genuinely yours to choose within a window, and unlike the name it cannot be quietly changed later.",
          "If you come to me with only one question about a new business, make it this one rather than the name.",
        ],
      },
      {
        heading: "When renaming is worth the disruption",
        paragraphs: [
          "Rarely, and almost never for an established business with customers who can find it. The cost of a rename is measured in signage, search results, and the people who lose track of you, and it is routinely underestimated.",
          "For a business under a year old with little momentum, it is a reasonable thing to consider. For one with a decade of goodwill attached to the old name, the numbers would have to be doing something unusual before I recommended it.",
        ],
      },
    ],
  },
  {
    slug: "what-a-birth-chart-cannot-tell-you",
    title: "What a Birth Chart Cannot Tell You",
    excerpt:
      "An honest list of the questions I decline, and why declining them is part of the work rather than a failure of it.",
    category: "Astrology Consultation",
    icon: "/icons/services/astrology.png",
    date: "2026-03-11",
    readingMinutes: 6,
    placeholder: true,
    lead:
      "Some questions arrive most weeks and I answer none of them. It is worth saying which, and why, before somebody books an hour expecting otherwise.",
    sections: [
      {
        heading: "How long someone will live",
        paragraphs: [
          "I do not read for lifespan, my own or anyone else's, and I will end a consultation that keeps pushing towards it. There is no version of that answer that helps the person receiving it, and there is a long history of harm attached to people who give it anyway.",
          "This holds for the softer forms too, including questions about elderly parents phrased as asking about a difficult period ahead.",
        ],
      },
      {
        heading: "Whether someone else loves you",
        paragraphs: [
          "A chart describes the person it belongs to. Bringing me somebody else's birth details to find out how they feel is a question about their interior life, asked without their knowledge, and I am not comfortable answering it.",
          "What I can look at is your own chart, and what you tend to do in relationships, which is more useful than it sounds and considerably more actionable.",
        ],
      },
      {
        heading: "Exact figures and exact dates",
        paragraphs: [
          "How much the settlement will be. The day the offer will arrive. Whether it is the flat in Sector 12 or the one in Sector 15. Charts describe conditions and periods, not line items, and anybody producing that level of specificity is improvising.",
          "I will give you a window and a texture. If you need a number, that is a conversation with an accountant.",
        ],
      },
      {
        heading: "Anything a doctor or a lawyer should hear",
        paragraphs: [
          "Diagnoses, prognoses, whether to take a treatment, whether to sign something. These are not astrological questions and treating them as though they were is where this field does real damage.",
          "If a question belongs to a professional, I will say so, and I would rather lose the booking than answer it.",
        ],
      },
      {
        heading: "What is left",
        paragraphs: [
          "Timing, temperament, the shape of a period, what you tend to repeat, and where the pressure in a given stretch is likely to come from. Which is a great deal, and it is the part that has held up over the years.",
          "A short honest list is worth more than a long one that cannot be relied on.",
        ],
      },
    ],
  },
  {
    slug: "how-often-to-pull-cards",
    title: "How Often to Pull Cards",
    excerpt:
      "Asking the same question every week does not produce a better answer. It produces a worse one, and the reason is not mysterious.",
    category: "Tarot Reading",
    icon: "/icons/services/tarot.png",
    date: "2026-02-24",
    readingMinutes: 5,
    placeholder: true,
    lead:
      "The habit I most often try to talk clients out of is the daily re-reading of a question that has not changed since yesterday.",
    sections: [
      {
        heading: "Repetition erodes the question",
        paragraphs: [
          "The first reading of a question is asked by someone who wants to know. The fifth is asked by someone who wants a particular answer, and by then they have seen enough spreads to know which cards would give it to them.",
          "That is not the cards failing. It is the reading becoming a negotiation with yourself, which it will win every time.",
        ],
      },
      {
        heading: "The answer that has not had time to happen",
        paragraphs: [
          "Most readings describe something in motion. Asking again three days later is asking for a progress report on a process that has barely started, and the honest answer would be that nothing has changed yet.",
          "What people take from the second reading instead is usually a slightly different emphasis, which then reads as a contradiction and produces a third.",
        ],
      },
      {
        heading: "A reasonable interval",
        paragraphs: [
          "For a genuine question about a situation in motion, leave it until something in the situation has actually moved. In practice that is rarely less than a month, and often longer.",
          "If circumstances change materially, ask again immediately. A new question is not a repeat, and the distinction is usually obvious to the person asking if they are honest with themselves.",
        ],
      },
      {
        heading: "What to do in between",
        paragraphs: [
          "Write down what the reading actually said, on the day, before it starts drifting. Memory is generous towards the parts that suited us and quietly loses the rest.",
          "Then go and do the thing the reading pointed at. Almost every client who has been through a stretch of compulsive re-reading has told me afterwards that the problem was never the answer. It was that they already knew what it required.",
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
