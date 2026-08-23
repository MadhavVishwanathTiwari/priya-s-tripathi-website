export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export const services: Service[] = [
  {
    slug: "vastu",
    title: "Vastu Consultation",
    description:
      "Create balanced spaces that attract health, wealth & happiness.",
    icon: "/icons/services/vastu.png",
    href: "#vastu",
  },
  {
    slug: "astrology",
    title: "Astrology Consultation",
    description: "Gain clarity about life's challenges, timing & opportunities.",
    icon: "/icons/services/astrology.png",
    href: "#astrology",
  },
  {
    slug: "numerology",
    title: "Numerology Consultation",
    description: "Decode your numbers and discover your true life path.",
    icon: "/icons/services/numerology.png",
    href: "#numerology",
  },
  {
    slug: "combined",
    title: "Combined Analysis",
    description:
      "Astro + Numero + Vastu. A holistic approach to transform your life.",
    icon: "/icons/services/combined.png",
    href: "#combined",
  },
  {
    slug: "healing",
    title: "Healing & Reiki",
    description: "Energy healing to release blockages & restore inner balance.",
    icon: "/icons/services/healing.png",
    href: "#healing",
  },
  {
    slug: "tarot",
    title: "Tarot Reading",
    description: "Insightful guidance for specific questions & situations.",
    icon: "/icons/services/tarot.png",
    href: "#tarot",
  },
];
