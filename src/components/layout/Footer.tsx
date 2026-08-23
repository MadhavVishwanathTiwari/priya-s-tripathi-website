import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { GlobeIcon, MailIcon, PhoneIcon, socialIcons } from "@/components/icons";
import { site } from "@/data/site";

const contactItems = [
  { icon: PhoneIcon, label: site.contact.phone, href: site.contact.phoneHref },
  {
    icon: MailIcon,
    label: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    icon: GlobeIcon,
    label: site.contact.website,
    href: site.contact.websiteHref,
  },
];

/*
  With Cache Components a bare `new Date()` cannot be read while the page is
  being prerendered: the framework wants it said whether the value is captured
  once or produced per request. A copyright year is emphatically the former.
*/
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden bg-band-footer scroll-mt-24"
    >
      {/* Large lotus watermark, echoing the reference's footer decoration. */}
      <Image
        src="/decorative/lotus-large.png"
        alt=""
        aria-hidden="true"
        width={273}
        height={223}
        className="pointer-events-none absolute -left-10 bottom-0 w-40 opacity-40 sm:w-52 lg:w-64"
      />

      <div className="container-page relative py-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-9">
            {contactItems.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group -my-2.5 inline-flex items-center gap-3 py-2.5 text-[0.88rem] text-ink-soft transition-colors duration-200 hover:text-gold-deep"
                >
                  <Icon className="h-5 w-5 shrink-0 text-gold" />
                  <span className="break-all">{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5 lg:items-center">
            <p className="text-[0.88rem] text-ink-soft">Follow Us</p>
            <ul className="flex items-center gap-3">
              {site.social.map((item) => {
                const Icon = socialIcons[item.icon];
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-200 hover:border-gold hover:bg-peach-soft/50 hover:text-gold-deep"
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-1 lg:mt-10 lg:items-end">
          <p className="font-script text-4xl leading-tight text-gold-deep sm:text-5xl">
            {site.founder.name}
          </p>
          <p className="text-[0.62rem] tracked-wide text-ink-muted">
            {site.founder.role}
          </p>
        </div>

        <p className="mt-10 text-pretty border-t border-gold/20 pt-6 text-center text-[0.72rem] text-ink-muted">
          © {year} {site.name}. {site.tagline}
        </p>
      </div>
    </footer>
  );
}
