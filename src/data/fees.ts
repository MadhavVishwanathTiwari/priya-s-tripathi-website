export type Fee = {
  service: string;
  note?: string;
  price: string;
  icon: string;
  /**
   * Which service page this row belongs to. It makes the row a link, and lets
   * a service page read its own rows back, so a price is written once and shows
   * in both places.
   */
  slug: string;
};

export const fees: Fee[] = [
  {
    service: "VASTU – 2 to 3 BHK Flat",
    slug: "vastu",
    price: "Starting ₹25,000",
    icon: "/icons/services/vastu.png",
  },
  {
    service: "VASTU – Kothi / Villa",
    slug: "vastu",
    price: "Up to ₹50,000",
    icon: "/icons/features/harmonize.png",
  },
  {
    service: "Commercial Vastu",
    slug: "vastu",
    price: "₹1,00,000+",
    icon: "/icons/services/combined.png",
  },
  {
    service: "Numerology Consultation",
    slug: "numerology",
    price: "Starting ₹11,000",
    icon: "/icons/services/numerology.png",
  },
  {
    service: "Astro–Numerology Consultation",
    slug: "astrology",
    price: "₹15,000 per person",
    icon: "/icons/services/astrology.png",
  },
  {
    service: "Combined Astro–Numero–Vastu Analysis",
    slug: "combined",
    note: "Detailed Astro–Numero + Brief Vastu on Map & Distant Vastu",
    price: "₹25,000 per person",
    icon: "/icons/features/numbers.png",
  },
  {
    service: "Tarot Reading",
    slug: "tarot",
    price: "₹5,100 per question",
    icon: "/icons/services/tarot.png",
  },
  {
    service: "Healing / Reiki",
    slug: "healing",
    price: "₹5,100 per person",
    icon: "/icons/services/healing.png",
  },
];
