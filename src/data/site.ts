export const site = {
  name: "Shivoham Universal Sol",
  tagline: "Aligning Spaces. Aligning Souls.",
  description:
    "Vastu, Astrology and Numerology consultations by Priya Swaroop Tripathi. Bringing balance to your space, numbers and destiny for a life of clarity, abundance and inner peace.",
  founder: {
    name: "Priya Swaroop Tripathi",
    role: "Founder & Consultant",
    /** Her own styling, and a better description of the practice than "astrologer". */
    title: "Numero-Vastu Consultant",
  },
  contact: {
    /*
      Display and dial strings are kept apart rather than derived from each
      other: the old site shipped `tel:+8527018222` with no country code, which
      fails silently from outside India.
    */
    phone: "+91 85270 18222",
    phoneHref: "tel:+918527018222",
    whatsappHref: "https://wa.me/918527018222",
    /** Enquiries. `priya@` is her personal inbox, kept below for reference. */
    email: "services@shivohamuniversalsol.com",
    personalEmail: "priya@shivohamuniversalsol.com",
    website: "www.shivohamuniversalsol.com",
    websiteHref: "https://www.shivohamuniversalsol.com",
  },
  /*
    Where the practice is based. Consultations are remote by default, so
    anything that renders this says "by appointment" in the same breath. Kept to
    society level on purpose: this is a home practice, and the flat number is
    hers to give, not ours to publish.
  */
  location: {
    line: "Palm Olympia, Sector 16C, Greater Noida West",
    region: "Gautam Buddha Nagar, Uttar Pradesh, India",
    note: "Consultations are held online or by telephone. Visits are by appointment.",
  },
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/priyaswarooptripathi/",
      icon: "instagram",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100021775871823",
      icon: "facebook",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/priya-tripathi-727b6923",
      icon: "linkedin",
    },
    { label: "WhatsApp", href: "https://wa.me/918527018222", icon: "whatsapp" },
  ],
} as const;

/*
  Hrefs are absolute rather than bare hashes so the same nav works from the blog
  and about routes; the header marks an item current by matching the path, which
  is why only the real pages here are path-only.
*/
export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Consultations", href: "/#consultations" },
  { label: "Fees", href: "/#fees" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;
