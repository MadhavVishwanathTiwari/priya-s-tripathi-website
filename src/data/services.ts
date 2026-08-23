export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  /** Card title, and the label on the matching row in `categories`. */
  title: string;
  /** One line, on the card and as the page description. */
  description: string;
  icon: string;
  href: string;
  /** The epigraph at the top of the service page. */
  tagline: string;
  body: string[];
  /** The "what this covers" list every old service page carried. */
  includes: string[];
  faqs: ServiceFaq[];
  /**
   * False where the words are ours rather than hers.
   *
   * Vastu, Numerology, Tarot and Healing were recovered from the 2021 site by
   * way of the sibling build and lightly edited for grammar and house style.
   * Astrology and Combined Analysis had no written source anywhere, so those two
   * are drafts in her voice and need her approval before launch.
   */
  copyApproved: boolean;
};

/*
  Fees deliberately live in `fees.ts` and are never repeated here: the service
  pages read them back so a price is written once. Where the recovered copy
  quoted a figure that disagreed with her own fee sheet, the figure was dropped
  rather than carried over.
*/
export const services: Service[] = [
  {
    slug: "vastu",
    title: "Vastu Consultation",
    description:
      "Create balanced spaces that attract health, wealth & happiness.",
    icon: "/icons/services/vastu.png",
    href: "/services/vastu",
    tagline:
      "Vastu decides the happiness or sorrows you experience in your life.",
    body: [
      "Vastu Shastra is described in Indian architecture in the Matsya Purana; the name means the science of studying architecture. It concerns design, layout, measurement and soil in relation to the work of the person living or working there, and the five tattvas: earth, water, fire, air and space.",
      "For most people a building has four directions. In Vastu we study thirty-two, covering every corner of every room: the five elements, the deity governing each zone, and the colours and metals that shift a zone's character.",
      "I work as a link between people and the study of Vastu from the Vedas, Puranas and Shastras. Most of the remedies here are drawn from the Matsya, Skanda, Agni, Garuda and Vishnu Puranas.",
      "Vastu addresses concerns around health, relationships, money, work, study, property and legal matters. Beyond solving problems, it aims at a settled and generous place to live.",
    ],
    includes: [
      "Vastu for home",
      "Vastu for office",
      "Vastu for factories and industries",
      "Vastu for shops and showrooms",
      "Vastu for hotels and restaurants",
      "Vastu for hospitals",
      "Vastu for schools and colleges",
      "Vastu for temples and religious places",
    ],
    faqs: [
      {
        question: "Why does the fee depend on the property?",
        answer:
          "Because the work scales with it. A two bedroom flat and a factory floor are not the same survey, and one published figure would either overcharge the first or underprice the second. Share the property details and you get a real number before anything is booked.",
      },
      {
        question: "Will walls have to come down?",
        answer:
          "Almost never. Most corrections are changes to weight, light, colour and direction: where the heavy storage sits, which way you sleep, what is blocking the entrance. Structural work is a last resort, not a starting point.",
      },
      {
        question: "Can this be done without a visit?",
        answer:
          "Yes, for most homes. A dimensioned floor plan with the directions marked is enough for a distant reading, which is how clients outside India are usually seen. Commercial properties are the ones that benefit most from a site visit.",
      },
    ],
    copyApproved: true,
  },
  {
    slug: "astrology",
    title: "Astrology Consultation",
    description: "Gain clarity about life's challenges, timing & opportunities.",
    icon: "/icons/services/astrology.png",
    href: "/services/astrology",
    tagline: "A chart describes the weather, not the verdict.",
    body: [
      "A horoscope maps the sky at the moment you were born. Read properly it describes conditions: the seasons a life moves through, the years when effort compounds, and the years when it merely accumulates. It hands down no sentences, and a reading that leaves you frightened has been done badly.",
      "Most of the work is timing. The planetary periods divide a life into stretches with their own texture, and knowing which one you are in changes the question from what is wrong with me to what is this season asking of me. Clients very often recognise a difficult few years the moment they are placed on that timeline.",
      "Remedies are practice rather than purchase. What a chart is short of is usually built by a discipline: a fast held properly, a charity kept up for a year, a mantra repeated at the same hour each day. Gemstones have their place at the end of that list, never at the beginning.",
    ],
    includes: [
      "Full birth chart analysis",
      "Current and coming planetary periods",
      "Career and business timing",
      "Marriage and compatibility",
      "Health indications and what to watch",
      "Property, money and legal matters",
      "Remedies you can realistically keep up",
    ],
    faqs: [
      {
        question: "Do you need my exact birth time?",
        answer:
          "As close as you can get it. Ten minutes can move the ascendant and with it the framework of the whole chart. If the time is uncertain, say so at the start: the chart can be rectified against events you already remember.",
      },
      {
        question: "Will you tell me something frightening?",
        answer:
          "No. A difficult period is described as what it is, along with what makes it easier and roughly when it lifts. Fear is not a reading, and it is not useful to anyone.",
      },
      {
        question: "Should I take numerology as well?",
        answer:
          "Not necessarily. A single reading answers a specific question well. Where a pattern is old and has survived earlier attempts to fix it, the combined analysis is the better use of your money.",
      },
    ],
    copyApproved: false,
  },
  {
    slug: "numerology",
    title: "Numerology Consultation",
    description: "Decode your numbers and discover your true life path.",
    icon: "/icons/services/numerology.png",
    href: "/services/numerology",
    tagline:
      "Numbers play a significant role in deciding your life path, success and failures.",
    body: [
      "Numerology connects the mystical world to the sequence of events in a person's life. It reads the numerical value of each letter and derives a calculated total, and it studies name, date of birth, time of birth, place of birth and the planetary positions at that moment.",
      "It is a calculative practice rather than a predictive one. With the right remedies, practised sincerely, it is a tool for manifesting what you are actually working toward.",
      "My work combines several systems of number study rather than relying on one.",
    ],
    includes: [
      "Overall analysis of your date of birth",
      "Name spelling corrections",
      "Baby name spellings",
      "Business name spellings",
      "Product and brand name spellings",
      "Lucky mobile number",
      "Lucky car number",
      "Matchmaking",
      "Best suited career option",
      "Best delivery date",
      "Future trends",
    ],
    faqs: [
      {
        question: "What is numerology?",
        answer:
          "The study of numbers calculated from date of birth, time, and name value, linked to planetary frequencies. It is calculative: it points at what can be changed with the least effort for the most benefit.",
      },
      {
        question: "Are numerology and astrology the same?",
        answer:
          "No. Astrology studies the position of the planets at the time of birth. Numerology studies numbers derived from date of birth, time and name calculation, and links those to planetary frequencies. Astrology reads what is indicated; numerology points at what can be adjusted.",
      },
      {
        question: "Does it work with Vastu?",
        answer:
          "They reinforce each other. Numerology addresses the person, Vastu addresses the space they live and work in, and in practice the results are strongest when both are looked at together.",
      },
    ],
    copyApproved: true,
  },
  {
    slug: "combined",
    title: "Combined Analysis",
    description:
      "Astro + Numero + Vastu. A holistic approach to transform your life.",
    icon: "/icons/services/combined.png",
    href: "/services/combined",
    tagline: "Three views of the same problem, laid side by side.",
    body: [
      "A recurring pattern rarely has a single cause: money that arrives and leaves, health that dips with every move, a career that stalls at the same rung. Looking at it through one discipline gives one third of a picture.",
      "The chart describes timing and temperament. The numbers describe how you meet the world and what you answer to. The space describes the conditions you live and work in every day. This sitting lays the three side by side and looks for where they agree, because agreement is the useful signal. When a difficult planetary period coincides with a mismatched working name and a bedroom in the wrong corner, the correction has three points of leverage instead of one.",
      "The chart is cast and studied before we meet, the numbers are worked out from your birth date and the name you actually use, and the space is reviewed from a floor plan with the directions marked. Only then do we sit down together. You leave with a written summary: what was found, which corrections come first, and what can wait a year.",
    ],
    includes: [
      "Full numerology from your birth date and working name",
      "Birth chart with the current and coming planetary periods",
      "Vastu reading from a floor plan, or on site where that is possible",
      "A written summary of everything found",
      "The order the corrections should be made in",
      "A follow-up once the first changes have settled",
    ],
    faqs: [
      {
        question: "How is this different from booking two consultations?",
        answer:
          "The three are read against each other rather than one after another. What matters is where they agree: a remedy that answers the chart, the name and the room at once is the one worth your effort.",
      },
      {
        question: "What do you need from me?",
        answer:
          "Your date, time and place of birth, your name as people actually use it, and for the Vastu half a dimensioned floor plan with the directions marked. A photograph of a plan is usually enough to begin.",
      },
      {
        question: "Is this ever the wrong choice?",
        answer:
          "Yes. If the question is specific and recent, a decision due this month or one room that feels wrong, a single consultation is faster and cheaper and quite sufficient. This earns its place when the pattern is old.",
      },
    ],
    copyApproved: false,
  },
  {
    slug: "healing",
    title: "Healing & Reiki",
    description: "Energy healing to release blockages & restore inner balance.",
    icon: "/icons/services/healing.png",
    href: "/services/healing",
    tagline: "Where the work is on the energy rather than the question.",
    body: [
      "Not every situation arrives as a question. Sometimes there is nothing to read and nothing to calculate: just a heaviness that has settled and will not lift, and a sense of being out of step with your own life.",
      "This is the part of the practice that works on that directly. Chakra balancing locates where the heaviness is sitting; dowsing tests what is actually going on rather than what you assume is; Reiki and crystal healing are the hands-on work; switch words are what you take away and keep using on your own.",
      "It is calming, deliberate work, and it pairs naturally with the other three. A numerology or Vastu remedy tells you what to change; this is about being in a state to actually change it. Sessions are held one to one, and you leave with a short practice to continue at home.",
      "It is complementary work, and nothing here treats a medical condition. If something needs a doctor, see a doctor. That advice is free and it comes first.",
    ],
    includes: [
      "Chakra balancing",
      "Dowsing",
      "Switch words",
      "Reiki",
      "Crystal healing",
      "Guided meditation practice to continue at home",
    ],
    faqs: [
      {
        question: "Will this cure an illness?",
        answer:
          "No, and anyone telling you otherwise is selling something. This is complementary work: it sits alongside medical care, never in place of it. What clients most often report is feeling settled enough to deal with what is in front of them.",
      },
      {
        question: "Do I need to have had a reading first?",
        answer:
          "Not at all. Some people come here first and never take a reading. Others come after a numerology or Vastu consultation, because a remedy is easier to keep up when you are not exhausted.",
      },
      {
        question: "What actually happens in a session?",
        answer:
          "You stay fully clothed and lie on a low table while the practitioner works with hands held lightly on or just above the body. Nothing is manipulated and nothing hurts. Most people report warmth, heaviness in the limbs and the drowsiness that arrives just before sleep.",
      },
    ],
    copyApproved: true,
  },
  {
    slug: "tarot",
    title: "Tarot Reading",
    description: "Insightful guidance for specific questions & situations.",
    icon: "/icons/services/tarot.png",
    href: "/services/tarot",
    tagline:
      "Tarot reading is the intuitive analysis of past, present and future.",
    body: [
      "Tarot is a study of intuition, feeling and belief. It is what happens when the voice of your inner self meets the sequence of cards drawn, and narrates an event of the past, present or future.",
      "The cards help you hear your own inner voice and take its messages seriously. Read well, they clarify what a situation is actually telling you, which is why tarot suits questions about relationships, money, healing and reconciliation better than most tools.",
    ],
    includes: [
      "Relationship consultation",
      "Job and career consultation",
      "Health consultation",
      "Money consultation",
      "Marriage and love consultation",
      "Future consultation",
      "A specific person's reading",
      "Past, present and future consultation",
    ],
    faqs: [
      {
        question: "Will you tell me my future?",
        answer:
          "Not as a fortune teller would. This is a systematic, analytical practice, but with years of meditation and intuition behind it a reading can speak to where a situation is heading and what is shaping it.",
      },
      {
        question: "What counts as one question?",
        answer:
          "One situation you want read. The cards are drawn and interpreted for that, and follow-ups that open a different situation are a new question. If you are not sure whether what you are bringing is one thing or three, ask before you book and you will be told plainly.",
      },
      {
        question: "How should I word what I bring?",
        answer:
          "Ask about your own position rather than about someone else's private thoughts. Not will he call, but what is unresolved between us. The second can be acted on by the evening; the first hands your decision to a deck of cards.",
      },
    ],
    copyApproved: true,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
