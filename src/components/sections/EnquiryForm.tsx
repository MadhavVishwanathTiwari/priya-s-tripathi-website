"use client";

import { useRef, useState } from "react";

import { Field, Select, TextArea, TextInput } from "@/components/ui/fields";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The enquiry form.
 *
 * There is no route handler and no mail provider on this site, and a form that
 * posts into nothing is the worst failure available: the sender believes they
 * have been in touch and waits, and nobody ever knows they wrote. So this
 * composes what you typed into a message and hands it to a channel she already
 * reads, WhatsApp, with email as the fallback. Nothing is claimed to have been
 * sent, because the sending happens in her app, in front of you.
 *
 * The day a provider is wired up, only the two handlers change; the fields, the
 * labels and the composed body all stay.
 */

const whatsappNumber = site.contact.whatsappHref.replace(/\D/g, "");

/**
 * `<input type="date">` hands back ISO whatever it displayed, and 04-02 is
 * genuinely ambiguous to whoever reads the message. Rewritten by hand rather
 * than with toLocaleDateString: parsing an ISO date into a Date shifts it by
 * the local offset, which can move a birthday to the day before.
 */
function formatDob(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : iso;
}

/**
 * The message body, as plain text. Labelled lines rather than prose: this lands
 * in a thread that is also her working inbox, where "Date of birth: 02/04/1988"
 * is still scannable months later. Blank optional fields drop out entirely.
 */
function compose(form: HTMLFormElement) {
  const data = new FormData(form);
  const get = (key: string) => String(data.get(key) ?? "").trim();

  const details = [
    ["Name", get("name")],
    ["Reach me on", get("contact")],
    ["Interested in", get("service")],
    ["Date of birth", formatDob(get("dob"))],
    ["Place of birth", get("birthplace")],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  // Blank lines are structure here, so this is assembled rather than filtered.
  return [
    `Enquiry from ${site.contact.website}`,
    "",
    ...details,
    "",
    get("message"),
  ].join("\n");
}

export function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  /** Which channel took the details, so the confirmation can name it. */
  const [handedTo, setHandedTo] = useState<"WhatsApp" | "email" | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = compose(event.currentTarget);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setHandedTo("WhatsApp");
  }

  function handleEmail() {
    const form = formRef.current;
    // The same required-field checks the submit button gets. Without this the
    // email route is a hole straight through the validation.
    if (!form || !form.reportValidity()) return;

    const subject = `Consultation enquiry: ${
      new FormData(form).get("name") || "website"
    }`;
    // location.href rather than window.open: a mailto in a new tab leaves an
    // orphan blank tab behind once the mail client takes over.
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(compose(form))}`;
    setHandedTo("email");
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <TextInput
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Ananya Mehra"
          />
        </Field>

        {/*
          One field for phone or email, not two. Everyone has a preferred
          channel and resents handing over the other, and since the message is
          delivered by hand the site never needs a machine-readable address.
        */}
        <Field label="Phone or email" htmlFor="contact">
          <TextInput
            id="contact"
            name="contact"
            required
            placeholder="+91 98765 43210"
          />
        </Field>
      </div>

      <Field
        label="What you are looking for"
        htmlFor="service"
        hint="Not sure yet is a perfectly good answer."
      >
        <Select id="service" name="service" defaultValue="">
          <option value="">Not sure yet</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </Select>
      </Field>

      {/* Both optional. Numerology and tarot want them, Vastu does not, and a
          required birth date on first contact reads as intrusive from a
          practice you have not decided to trust yet. */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date of birth (optional)" htmlFor="dob">
          <TextInput id="dob" name="dob" type="date" />
        </Field>

        <Field label="Place of birth (optional)" htmlFor="birthplace">
          <TextInput id="birthplace" name="birthplace" placeholder="Lucknow" />
        </Field>
      </div>

      <Field label="What you are facing" htmlFor="message">
        <TextArea
          id="message"
          name="message"
          required
          rows={5}
          className="resize-y"
          placeholder="A few lines about the situation: what has been going on, and what you would like to be different."
        />
      </Field>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="submit"
          className={cn(
            "inline-flex min-h-11 items-center justify-center rounded-full bg-peach px-7 text-[0.7rem] font-medium tracked text-white",
            "transition-all duration-300 hover:bg-peach-deep hover:shadow-[0_6px_18px_-8px_rgba(191,124,96,0.65)]",
          )}
        >
          Send on WhatsApp
        </button>

        <button
          type="button"
          onClick={handleEmail}
          className="text-[0.82rem] text-ink-muted underline underline-offset-4 transition-colors duration-200 hover:text-peach-deep"
        >
          or send it by email
        </button>
      </div>

      {/* Says what the button does before it is pressed. The arrangement only
          stays honest if nobody is surprised by the app switch. */}
      <p className="text-pretty text-[0.78rem] leading-relaxed text-ink-muted">
        This opens WhatsApp with your details already written out. Nothing
        leaves your device until you press send there.
      </p>

      {handedTo ? (
        <p
          role="status"
          aria-live="polite"
          className="rounded-sm border border-gold/35 bg-cream-deep px-4 py-3 text-pretty text-[0.84rem] leading-relaxed text-ink-soft"
        >
          {handedTo === "WhatsApp"
            ? "WhatsApp should have opened in a new tab with your message ready. If it did not, your browser may have blocked the pop-up, so send it by email instead."
            : "Your mail app should have opened with the message ready to send."}
        </p>
      ) : null}
    </form>
  );
}
