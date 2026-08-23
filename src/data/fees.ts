export type Fee = {
  service: string;
  note?: string;
  price: string;
  icon: string;
};

export const fees: Fee[] = [
  {
    service: "VASTU – 2 to 3 BHK Flat",
    price: "Starting ₹25,000",
    icon: "/icons/services/vastu.png",
  },
  {
    service: "VASTU – Kothi / Villa",
    price: "Up to ₹50,000",
    icon: "/icons/features/harmonize.png",
  },
  {
    service: "Commercial Vastu",
    price: "₹1,00,000+",
    icon: "/icons/services/combined.png",
  },
  {
    service: "Numerology Consultation",
    price: "Starting ₹11,000",
    icon: "/icons/services/numerology.png",
  },
  {
    service: "Astro–Numerology Consultation",
    price: "₹15,000 per person",
    icon: "/icons/services/astrology.png",
  },
  {
    service: "Combined Astro–Numero–Vastu Analysis",
    note: "Detailed Astro–Numero + Brief Vastu on Map & Distant Vastu",
    price: "₹25,000 per person",
    icon: "/icons/features/numbers.png",
  },
  {
    service: "Tarot Reading",
    price: "₹5,100 per question",
    icon: "/icons/services/tarot.png",
  },
  {
    service: "Healing / Reiki",
    price: "₹5,100 per person",
    icon: "/icons/services/healing.png",
  },
];
