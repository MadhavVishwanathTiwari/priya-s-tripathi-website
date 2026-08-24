/*
  Seed fixtures, not site content. See the note in posts.ts in this folder.

  TWO KINDS OF ROW LIVE HERE, and the difference matters.

  `placeholder: false` marks the real ones. They were recovered from the 2021
  site's successstories.php by the sibling build at
  D:\Portfolio\shivohamuniversalsol, and they replaced the invented placeholders
  that stood here before. The words are stored VERBATIM, including their
  original phrasing and minor slips. These are real people writing about a real
  person: tightening them is a decision for her and for them, not a formatting
  pass. All three were already published on the 2021 site, which is where
  consent comes from, and the CMS will not publish a testimonial without that
  consent recorded against it.

  `placeholder: true` marks the rest. Every one of them is INVENTED. They exist
  because each service page renders its testimonials in a three-column grid, and
  five of the six services had one row or none, so the pages read as unfinished.
  Nobody said these words. No consent exists for them, because there is nobody
  to give it. They are dressing for a work in progress.

  They must be replaced with real, attributed, permitted testimonials, or
  deleted, before the site is advertised as a live business. To clear them:

    delete from public.testimonials where placeholder;
*/

export type SeedTestimonial = {
  quote: string;
  name: string;
  location: string;
  /** Matches a row in `categories.label`. */
  service: string;
  /** File under `public/testimonials/`, uploaded to the media bucket on seed. */
  photo?: { file: string; alt: string };
  /** False only for the three recovered from the 2021 site. Read the note above. */
  placeholder: boolean;
};

export const testimonials: SeedTestimonial[] = [
  // --- Real. Recovered from the 2021 site, published there with consent. ----
  {
    quote:
      "Me and my family were going through a rough time, all doors were closed. Then I explained my problems to Priya, she was very patient and understanding, she suggested some remedies which we followed for 50 days, her remedies are very easy to follow and effective. Not just we were out of that situation but also got what we desired. She is a real friend and guide.",
    name: "Barkha",
    location: "Surat, India",
    service: "Numerology Consultation",
    photo: { file: "barkha-surat.jpg", alt: "Barkha, a client from Surat" },
    placeholder: false,
  },
  {
    quote:
      "I consulted Priya in the month of March, 2019. I was facing relationship issues with my father and job instability. She did the Numero of me and my husband along with the Vastu analysis of our house. Her remedies were so effective it worked like magic, both of us got the job we were looking for quiet some time but the miracle was that she helped me mend my relationship with my Father. She is so supportive and positive, by just talking to her all my problems vanish.",
    name: "Pallavi",
    location: "Ajman, UAE",
    service: "Vastu Consultation",
    photo: { file: "pallavi-ajman.jpg", alt: "Pallavi, a client from Ajman" },
    placeholder: false,
  },
  {
    quote:
      "What I appreciate most about her is that she will get to the bottom of the problem through a series of questions, which allows her to go deeper into the problem and allows me to open up without any hesitation. She is a genuine professional and doesn't pull punches and says what needs to be heard.",
    name: "Bella",
    location: "Karachi, Pakistan",
    service: "Tarot Reading",
    photo: { file: "bella-karachi.jpg", alt: "Bella, a client from Karachi" },
    placeholder: false,
  },

  // --- Invented. Every row below this line. See the note at the top. --------
  {
    quote:
      "We had just moved into a flat that never felt settled, and I was expecting to be told we had bought the wrong place. Instead she spent an hour asking how we actually use the rooms, and the changes came down to moving a cupboard, shifting where we keep water, and clearing the landing outside the door. It cost us a Sunday. The difference in how the house feels in the evening is the part I did not expect.",
    name: "Meenakshi",
    location: "Pune, India",
    service: "Vastu Consultation",
    placeholder: true,
  },
  {
    quote:
      "I run a small business from home and the study had never worked for me. Priya went through the floor plan direction by direction rather than handing me a list of dos and don'ts, which is what I have had from others before. She explained why the desk was in the wrong corner, not just that it was. I turned it, and I stopped dreading the mornings.",
    name: "Rajat",
    location: "Dubai, UAE",
    service: "Vastu Consultation",
    placeholder: true,
  },
  {
    quote:
      "I came with a very specific question about timing and I was braced for something frightening. She read the chart as weather rather than a verdict, which is the phrase she used and the thing I have held on to since. She was honest that a stretch ahead would be heavy, and she was equally clear about what it was not. Knowing the shape of it made it manageable.",
    name: "Sunita",
    location: "Lucknow, India",
    service: "Astrology Consultation",
    placeholder: true,
  },
  {
    quote:
      "My mother had been to several astrologers and came back more anxious each time. Priya was the first who did not sell us anything, did not recommend an expensive stone, and did not tell us to come back every month. She answered what we asked, and told us plainly which parts of the chart she was not going to speculate about.",
    name: "Arvind",
    location: "Bengaluru, India",
    service: "Astrology Consultation",
    placeholder: true,
  },
  {
    quote:
      "The consultation was over a call from Singapore and I was worried the distance would make it impersonal. It did not. She had gone through the chart before we spoke, so the hour went on my questions rather than on her reading things out to me. I have been back twice since, both times with something specific.",
    name: "Nikhil",
    location: "Singapore",
    service: "Astrology Consultation",
    placeholder: true,
  },
  {
    quote:
      "I had been signing my name the same way for thirty years and had never once thought about it. She walked me through what the numbers in my name and my date were doing, and suggested a small correction to the spelling. The advice on which dates to keep clear for difficult conversations has been the more useful half, honestly.",
    name: "Farida",
    location: "Mumbai, India",
    service: "Numerology Consultation",
    placeholder: true,
  },
  {
    quote:
      "We were choosing between two job offers and going in circles about it. Priya did not tell me which one to take. She showed me what each pattern tended to bring out in me, and the choice made itself in about ten minutes. That felt more honest than being handed an answer.",
    name: "Deepak",
    location: "Toronto, Canada",
    service: "Numerology Consultation",
    placeholder: true,
  },
  {
    quote:
      "I had the numerology done first and came back a few months later for the Vastu and the chart together. Reading them side by side was the thing that made it click: the same theme kept surfacing in three different places. She was careful not to over-explain the overlap, which I appreciated.",
    name: "Anjali",
    location: "Hyderabad, India",
    service: "Combined Analysis",
    placeholder: true,
  },
  {
    quote:
      "We booked the full analysis before construction started, which she said was the best money we would spend on it. The layout changed in two places on her advice, and both were decisions we could still make cheaply at that stage. Doing it after the slab was poured would have been a very different conversation.",
    name: "Shweta",
    location: "Indore, India",
    service: "Combined Analysis",
    placeholder: true,
  },
  {
    quote:
      "My wife and I did this together before deciding whether to move back to India. Getting the charts, the numbers and the house looked at as one piece answered questions we had not thought to ask separately. She was frank that some of it we would simply have to live through, which I trusted her more for.",
    name: "Karan",
    location: "London, UK",
    service: "Combined Analysis",
    placeholder: true,
  },
  {
    quote:
      "I went in sceptical and said so at the start. She did not try to convince me of anything, just asked me to notice how I felt afterwards and to tell her honestly. I slept properly that night for the first time in weeks. I still cannot explain it, and she has never asked me to.",
    name: "Ritu",
    location: "Jaipur, India",
    service: "Healing & Reiki",
    placeholder: true,
  },
  {
    quote:
      "This was during a stretch when work had ground me down and I was not coping well. What helped was that she was clear about what this was and what it was not: support alongside the other things I was doing, not a replacement for any of them. The sessions gave me somewhere to put the week down for an hour.",
    name: "Sameer",
    location: "Noida, India",
    service: "Healing & Reiki",
    placeholder: true,
  },
  {
    quote:
      "Distance healing sounded far-fetched to me and I said as much when I booked. Priya explained what she would be doing and what I should expect, in plain language, with no mystique around it. Whatever it is, the heaviness I had been carrying for months lifted enough that I could think again.",
    name: "Latika",
    location: "Melbourne, Australia",
    service: "Healing & Reiki",
    placeholder: true,
  },
  {
    quote:
      "I came with a yes-or-no question and she told me almost straight away that it was the wrong question. We spent the reading working out what I was actually trying to find out. I left with something more useful than the answer I had gone in wanting.",
    name: "Nandini",
    location: "Kolkata, India",
    service: "Tarot Reading",
    placeholder: true,
  },
  {
    quote:
      "She does not do the ominous voice, which was a relief. The cards that came up were not comfortable ones and she said so, then spent the time on what could actually be done rather than leaving me sitting with it. That is the difference between a reading and a fright.",
    name: "Yusuf",
    location: "Sharjah, UAE",
    service: "Tarot Reading",
    placeholder: true,
  },
];
