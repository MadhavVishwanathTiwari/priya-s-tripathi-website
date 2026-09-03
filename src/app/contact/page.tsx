import type { Metadata } from "next";
import Image from "next/image";

import { GlobeIcon, MailIcon, PhoneIcon, socialIcons } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { PaymentQr } from "@/components/sections/PaymentQr";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

const description =
  "Reach Shivoham Universal Sol by WhatsApp, telephone or email to discuss a consultation. Sittings are held remotely, so distance is no obstacle.";

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description,
  openGraph: { title: `Contact ${site.name}`, description, type: "website" },
};

/*
  The direct channels, kept alongside the form rather than replaced by it.
  Plenty of people would simply rather tap a number than fill anything in, and
  these three are the shortest path for them.

  The two numbers are labelled by what each is for, at her request, rather than
  sitting together under "Telephone": the first line is the one she carries and
  answers, the second is the one appointments are fixed on.

  Everything a visitor reads on this page is in her voice, as the rest of the
  site is, so nothing here refers to her in the third person.
*/
const channels = [
  {
    label: "WhatsApp & Consultation",
    value: site.contact.phone,
    href: site.contact.whatsappHref,
    note: "Usually the quickest way to reach me.",
    icon: socialIcons.whatsapp,
    external: true,
  },
  {
    label: "Book appointment",
    value: site.contact.phoneSecondary,
    href: site.contact.phoneSecondaryHref,
    note: "Call this line to fix a time. India Standard Time.",
    icon: PhoneIcon,
    external: false,
  },
  {
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    note: "Best for detailed enquiries and Vastu plans.",
    icon: MailIcon,
    external: false,
  },
];

const { location } = site;

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  location.mapPin,
)}&z=${location.mapZoom}&output=embed`;

const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  location.mapQuery,
)}`;

export default function ContactPage() {
  return (
    <>
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-cream py-[clamp(2.75rem,6vw,5rem)]">
          <Image
            src="/decorative/botanical-1.png"
            alt=""
            aria-hidden="true"
            width={300}
            height={300}
            className="pointer-events-none absolute -left-10 -top-6 w-32 opacity-25 sm:w-40 lg:w-52"
          />

          <div className="container-page relative">
            <div className="flex flex-col items-center text-center">
              <p className="text-[0.62rem] tracked-wide text-gold-deep">
                Contact
              </p>

              <h1 className="mt-4 text-balance font-serif text-display font-light text-ink">
                Tell me what you are facing
              </h1>

              <p className="mt-5 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-ink-soft">
                Share your situation and you will get a clear sense of what the
                work involves, and what it costs, before anything is committed.
                Consultations are held remotely, so distance is not an obstacle.
                Clients write in from across India and abroad.
              </p>

              <DecorativeDivider className="mt-8" />
            </div>
          </div>
        </section>

        {/*
          Nothing in this block is wrapped in Reveal, deliberately. Reveal
          starts at opacity 0 and waits for JavaScript, and this is the first
          thing on the page: if the bundle ever failed to arrive, the entire
          enquiry form would be invisible.

          The columns are not even either. The form is the job of this page and
          the address is context for it, and `items-start` keeps the map from
          being stretched to the form's height.
        */}
        <section
          aria-label="Send an enquiry"
          className="bg-cream-raised py-[clamp(2.5rem,5.5vw,4.5rem)]"
        >
          <div className="container-page">
            <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
              {/* The QR is hers to place and she asked for it here, under the
                  form. It shares the form's column so it stays subordinate to
                  it: given its own full-width strip it would read as the point
                  of the page. */}
              <div className="flex flex-col gap-8">
                <EnquiryForm />
                <PaymentQr />
              </div>

              <div className="flex flex-col gap-5">
                <div className="overflow-hidden rounded-sm border border-line bg-white p-1.5">
                  <iframe
                    // To a screen reader this is otherwise an unlabelled frame
                    // full of map furniture.
                    title={`Map showing ${location.line}`}
                    src={mapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-64 w-full rounded-[2px] border-0"
                  />
                </div>

                <div>
                  <p className="text-[0.68rem] tracked text-gold-deep">
                    Where I am based
                  </p>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-soft">
                    {location.line}
                    <span className="block">{location.region}</span>
                    <span className="block">{location.postalCode}</span>
                  </p>
                  <p className="mt-3 text-pretty text-[0.8rem] leading-relaxed text-ink-muted">
                    {location.note}
                  </p>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-[0.8rem] text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors duration-200 hover:text-peach"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="direct-heading"
          className="bg-cream py-[clamp(3rem,6vw,5rem)]"
        >
          <div className="container-page">
            <SectionHeading id="direct-heading">
              Or reach me directly
            </SectionHeading>

            <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:mt-11 lg:gap-5">
              {channels.map(({ label, value, href, note, icon: Icon, external }, index) => {
                const outward = external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {};
                const tint = index % 2 === 0 ? "bg-card-cream" : "bg-card-rose";

                return (
                  <Reveal key={label} delay={index * 70}>
                    <a
                      href={href}
                      {...outward}
                      className={
                        "group flex h-full flex-col rounded-sm border border-transparent p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/25 " +
                        tint
                      }
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 shrink-0 text-gold transition-colors duration-200 group-hover:text-gold-deep" />
                        <span className="text-[0.62rem] tracked text-gold-deep/80">
                          {label}
                        </span>
                      </span>

                      {/* Inter rather than the serif: a phone number and an
                          email address are data, and the display face renders
                          them as small caps and breaks the domain mid-word. */}
                      <span className="mt-4 block break-all text-[0.9rem] text-ink">
                        {value}
                      </span>

                      <span className="mt-2 block text-[0.8rem] text-ink-muted">
                        {note}
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-cream-raised py-[clamp(3rem,6vw,5rem)]">
          <div className="container-page">
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
              <Reveal>
                <article className="h-full rounded-sm bg-card-cream p-7 sm:p-8">
                  <h2 className="font-serif text-[1.25rem] font-normal text-ink">
                    Writing to me directly?
                  </h2>
                  <p className="mt-3 text-[0.85rem] text-ink-muted">
                    If you skip the form, please include:
                  </p>
                  <ul className="mt-4 flex flex-col gap-2 text-[0.88rem] leading-relaxed text-ink-soft">
                    <li>Your full name, date of birth and place of birth</li>
                    <li>A short description of what you are dealing with</li>
                    <li>
                      For Vastu: the property type, and a floor plan if you have
                      one
                    </li>
                  </ul>
                </article>
              </Reveal>

              <Reveal delay={70}>
                <article className="h-full rounded-sm bg-card-rose p-7 sm:p-8">
                  <h2 className="font-serif text-[1.25rem] font-normal text-ink">
                    Follow along
                  </h2>
                  <p className="mt-3 text-[0.85rem] text-ink-muted">
                    Where I post between consultations.
                  </p>
                  <ul className="mt-5 flex items-center gap-3">
                    {site.social.map((item) => {
                      const Icon = socialIcons[item.icon];
                      return (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-200 hover:border-gold hover:bg-peach-soft/50 hover:text-gold-deep"
                          >
                            <Icon className="h-[1.15rem] w-[1.15rem]" />
                            <span className="sr-only">{item.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href={site.contact.websiteHref}
                    className="mt-6 inline-flex items-center gap-2 text-[0.82rem] text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors duration-200 hover:text-peach"
                  >
                    <GlobeIcon className="h-4 w-4" />
                    {site.contact.website}
                  </a>
                </article>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
