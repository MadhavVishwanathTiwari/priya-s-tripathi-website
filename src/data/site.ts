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
    /*
      A second line, and telephone only. WhatsApp runs on the number above and
      only on that one, so whatsappHref stays pointed at it: sending anyone to
      wa.me for this number would open a chat nobody reads.
    */
    phoneSecondary: "+91 73036 85550",
    phoneSecondaryHref: "tel:+917303685550",
    whatsappHref: "https://wa.me/918527018222",
    /** Enquiries. Everything the site links to goes here. */
    email: "consultant@priyastripathi.co.in",
    website: "www.priyastripathi.co.in",
    websiteHref: "https://www.priyastripathi.co.in",
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
    postalCode: "201009",
    note: "Consultations are held online or by telephone. Visits are by appointment.",
    /*
      A coordinate, not a place name, and that is a privacy decision. Searching
      the society in an embed makes Google draw its own place card over the map,
      printing a plot number off its business listing that reads exactly like a
      flat number. A coordinate drops the card and leaves the map showing the
      society, which is all this was ever meant to show.
    */
    mapPin: "28.6163979,77.4203518",
    // 16 keeps the society's name on the tile; 17 crops the label out.
    mapZoom: 16,
    /*
      The deep link is a different job: someone tapping it wants directions, and
      a named place gives them a routable destination where a bare coordinate
      gives them a dropped pin in a field.
    */
    mapQuery:
      "Tower 12, Palm Olympia, Sector 16C, Greater Noida West, Gautam Buddha Nagar",
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
      href: "https://www.linkedin.com/in/priya-swaroop-tripathi-727b6923/",
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
  { label: "Services", href: "/services" },
  { label: "Fees", href: "/#fees" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
