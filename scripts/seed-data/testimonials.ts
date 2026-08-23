/*
  Seed fixtures, not site content. See the note in posts.ts in this folder.

  These three are real. They were recovered from the 2021 site's
  successstories.php by the sibling build at D:\Portfolio\shivohamuniversalsol,
  and they replaced the invented placeholders that stood here before.

  The words are stored VERBATIM, including their original phrasing and minor
  slips. These are real people writing about a real person: tightening them is a
  decision for her and for them, not a formatting pass. All three were already
  published on the 2021 site, which is where consent comes from, and the CMS
  will not publish a testimonial without that consent recorded against it.
*/

export type SeedTestimonial = {
  quote: string;
  name: string;
  location: string;
  /** Matches a row in `categories.label`. */
  service: string;
  /** File under `public/testimonials/`, uploaded to the media bucket on seed. */
  photo?: { file: string; alt: string };
};

export const testimonials: SeedTestimonial[] = [
  {
    quote:
      "Me and my family were going through a rough time, all doors were closed. Then I explained my problems to Priya, she was very patient and understanding, she suggested some remedies which we followed for 50 days, her remedies are very easy to follow and effective. Not just we were out of that situation but also got what we desired. She is a real friend and guide.",
    name: "Barkha",
    location: "Surat, India",
    service: "Numerology Consultation",
    photo: { file: "barkha-surat.jpg", alt: "Barkha, a client from Surat" },
  },
  {
    quote:
      "I consulted Priya in the month of March, 2019. I was facing relationship issues with my father and job instability. She did the Numero of me and my husband along with the Vastu analysis of our house. Her remedies were so effective it worked like magic, both of us got the job we were looking for quiet some time but the miracle was that she helped me mend my relationship with my Father. She is so supportive and positive, by just talking to her all my problems vanish.",
    name: "Pallavi",
    location: "Ajman, UAE",
    service: "Vastu Consultation",
    photo: { file: "pallavi-ajman.jpg", alt: "Pallavi, a client from Ajman" },
  },
  {
    quote:
      "What I appreciate most about her is that she will get to the bottom of the problem through a series of questions, which allows her to go deeper into the problem and allows me to open up without any hesitation. She is a genuine professional and doesn't pull punches and says what needs to be heard.",
    name: "Bella",
    location: "Karachi, Pakistan",
    service: "Tarot Reading",
    photo: { file: "bella-karachi.jpg", alt: "Bella, a client from Karachi" },
  },
];
