import type { SVGProps } from "react";

/*
  UI and social icons, drawn to match the reference sheet's line style:
  thin uniform stroke, rounded caps, currentColor so they inherit the warm gold.
  The brand icons (services, trust, features, decoration) are extracted artwork
  in `public/` — see `scripts/extract-assets.py`.
*/

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 7.5h17M3.5 12h17M3.5 16.5h17" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </Icon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
      <path d="M3.5 9.75h17M8 3.5v3M16 3.5v3" />
      <path d="M8.6 14.2l.5-1.1.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5zM14.4 16.6l.35-.8.35.8.8.35-.8.35-.35.8-.35-.8-.8-.35z" />
    </Icon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8.1 3.9c.5-.4 1.2-.3 1.6.2l1.9 2.6c.3.5.3 1.1-.1 1.5l-1.2 1.2a.7.7 0 0 0-.1.8 12 12 0 0 0 4.6 4.6c.3.2.6.1.8-.1l1.2-1.2c.4-.4 1-.4 1.5-.1l2.6 1.9c.5.4.6 1.1.2 1.6l-1.2 1.4c-.7.8-1.8 1.1-2.8.8A18.6 18.6 0 0 1 5.9 8.5c-.3-1 0-2.1.8-2.8z" />
    </Icon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="1.8" />
      <path d="M3.4 6.4l7.5 6a1.8 1.8 0 0 0 2.2 0l7.5-6" />
    </Icon>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M3.5 9.4h17M3.5 14.6h17" />
      <ellipse cx="12" cy="12" rx="3.9" ry="8.75" />
      <path d="M12 3.25v17.5" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15.5M13.6 6.4L19.8 12l-6.2 5.6" />
    </Icon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.9 21v-8h2.7l.5-3.2h-3.2V7.7c0-.9.3-1.6 1.7-1.6h1.6V3.2A22 22 0 0 0 15.7 3c-2.4 0-4 1.5-4 4.3v2.5H8.9V13h2.8v8" />
    </Icon>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.6" y="5.6" width="18.8" height="12.8" rx="4" />
      <path d="M10.4 9.6l4.7 2.4-4.7 2.4z" />
    </Icon>
  );
}

/* The practice has no YouTube account, so LinkedIn takes that place in the
   footer. YouTubeIcon above stays drawn for whenever there is one. */
export function LinkedInIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3.2" />
      <path d="M7.6 10.4V17" />
      <circle cx="7.6" cy="7.4" r="0.9" />
      <path d="M11.4 17v-3.6a2.2 2.2 0 0 1 4.4 0V17" />
      <path d="M11.4 10.4V17" />
    </Icon>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.3 11.7a8.3 8.3 0 0 1-12.3 7.3L3.7 20.3l1.3-4.2a8.3 8.3 0 1 1 15.3-4.4z" />
      <path d="M9.3 8.6c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.4 0 .7a6 6 0 0 0 2.6 2.3c.3.1.5 0 .6-.1l.5-.6c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5v.5c0 .3-.2.6-.6.9-.4.2-.9.4-1.5.3a9 9 0 0 1-5.9-5.2c-.2-.6-.1-1.2.1-1.7z" />
    </Icon>
  );
}

export const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
} as const;

export type SocialIconName = keyof typeof socialIcons;
