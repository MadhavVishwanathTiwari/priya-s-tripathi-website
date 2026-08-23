/**
 * Priya's own account of how she came to this work.
 *
 * Lifted from the sibling build at D:\Portfolio\shivohamuniversalsol, which
 * recovered it from the 2021 site and edited it lightly for grammar and length.
 * The voice is first person and stays that way: smoothing it into marketing copy
 * would lose the thing that makes it persuasive.
 */

/** The short version, for the band on the home page. */
export const blurb = [
  "I came to this work the long way round. A Masters in Human Resources, years inside corporates and MNCs, and a childhood spent quietly certain that numbers and cards were telling me something the adults around me had stopped listening for.",
  "Eventually I stopped arguing with it. Today I hold Master's and Grand Master qualifications in Numerology, Tarot, Vastu Shastra and Relationship Fitness, and I work with people across India and abroad on the things that actually keep them awake: health, money, work, and the people they love.",
] as const;

/** The full story, told on /about. */
export const story = [
  "I am a simple person from a small town. I did my Masters in Human Resource and Public Administration, and worked with several corporates and MNCs until I realised it was not what I wanted to do.",
  "Since early childhood I had a keen interest in tarot and numerology. I remember reading Cheiro's Book of Numbers at around fourteen, and connecting with it on another level entirely. It was describing me. My habits, my likes, my dislikes. I was astonished that it could be so accurate, and I read everything there was about a number 3 person. It was exactly me.",
  "As a child I lived in a world of my own where I believed I knew what was going to happen next. It may sound childish now, but at the time it was simply the truth of my life, and when I said something about someone and it came true, it frightened me.",
  "Then one evening we were invited to dinner at a friend's house, and I saw a deck of tarot cards. Her aunt was a reader. Everyone was asking questions, and I just watched: one question after another, she drew the cards and narrated the sequence of events, past, present and future. That was the day I connected with tarot properly. I knew this was what I wanted to do.",
  "I have been a meditative person all my life, and my intuitions have always guided my decisions, enough that people much older than me came to me for advice. At sixteen I founded a meditation institute in my town, running under the name Life and Meditation, by Pandit Ravi Sharma.",
  "For years I read and learned about numbers and cards without ever studying them formally. Then, a few years ago, I came back to tarot and took a professional course to understand every detail of it. One thing led to another and I gave myself over to this world completely, completing my Master's and Grand Master in Numerology, Tarot Reading, Vastu Shastra, Relationship Fitness, Chakra Healing and Dowsing.",
  "It feels like a lifetime now. I have clients across the globe, and this work lets me meet and help people from every walk of life. I have worked with individuals and business owners on health, wealth, work, career, illness, marriage and material success. I advise with sincerity and honesty, and I keep the solutions simple and easy to follow, whatever your faith.",
] as const;

export const vision =
  "To be a trusted consultant in creating a happy and blissful life for every living soul through simple and practical occult solutions.";

export const mission =
  "To effectively understand, guide and develop mankind by providing professional Numero-Vastu guidance and solutions, so that individuals can overcome challenging situations and live a blissful life.";

/**
 * Self-described, and carried over as she stated it. Worth confirming with her
 * before it appears anywhere that reads as a formal claim.
 */
export const credentials = [
  "Master's and Grand Master in Numerology",
  "Tarot Reading",
  "Vastu Shastra",
  "Relationship Fitness",
  "Chakra Healing",
  "Dowsing",
] as const;

/**
 * Three photographs. Both surfaces show her in a real place rather than cut out
 * of one: the room, with its wall of books, on the home page, and a session in
 * progress on /about, so the two pages do not repeat the same picture a click
 * apart. The alpha cut-out is kept for whenever a frameless treatment is wanted.
 */
export const portraits = {
  room: {
    src: "/portrait/priya-room.webp",
    width: 1000,
    height: 1333,
  },
  speaking: {
    src: "/portrait/priya-speaking.webp",
    width: 797,
    height: 796,
  },
  cutout: {
    src: "/portrait/priya.webp",
    width: 418,
    height: 573,
  },
} as const;
