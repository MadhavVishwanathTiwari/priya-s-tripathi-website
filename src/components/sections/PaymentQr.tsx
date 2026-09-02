import Image from "next/image";

import { site } from "@/data/site";

const { payment } = site;

/**
 * Her payment QR, which she asked to have directly under the enquiry form.
 *
 * The copy does the work the placement does not. A payment code sitting under
 * a contact form reads as a gate on being answered, so the first line says
 * plainly that nothing is owed at enquiry, and the block is styled as a quiet
 * aside rather than as a second call to action competing with the form's
 * button.
 *
 * The UPI ID is set as text as well as being encoded in the card, because the
 * phone someone would pay from is usually the phone they are reading this on,
 * and it cannot scan its own screen.
 */
export function PaymentQr() {
  return (
    <section
      aria-labelledby="payment-heading"
      className="rounded-sm border border-line bg-cream p-6 sm:p-7"
    >
      <h2 id="payment-heading" className="text-[0.68rem] tracked text-gold-deep">
        Paying for a consultation
      </h2>

      <p className="mt-3 text-pretty text-[0.85rem] leading-relaxed text-ink-muted">
        Nothing is due when you write in. Once we have spoken and the fee is
        settled, this is where it goes.
      </p>

      <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7">
        <Image
          src={payment.qr}
          // Named and spelled out: to a screen reader the card itself is an
          // opaque square, and the handle is the part that can be acted on.
          alt={`UPI QR code for ${site.founder.name}, UPI ID ${payment.upiId}`}
          width={payment.qrWidth}
          height={payment.qrHeight}
          // Without this next/image assumes the slot is the full viewport and
          // fetches the 1920-wide variant for a 224px card. The width is set by
          // what has to survive: the code, at a size a phone camera can read
          // off a screen.
          sizes="224px"
          /*
            The radius is the card's own, measured off the artwork: its corner
            curve runs 90px in and 70px down on a 648x756 crop. Set as
            percentages rather than pixels so it holds at both rendered widths,
            and elliptical because the corner is a squircle, not an arc. Round
            it by eye instead and the crop's square white corners show through
            against the cream.

            No border and no background: the card is opaque and its own blue
            edge is the outline, so anything drawn behind it can only appear as
            a seam.
          */
          className="w-48 shrink-0 rounded-[13.9%_/_9.3%] sm:w-56"
        />

        <div className="text-center sm:text-left">
          <p className="text-[0.62rem] tracked text-gold-deep/80">UPI ID</p>
          <p className="mt-2 break-all text-[0.9rem] text-ink">
            {payment.upiId}
          </p>
          <p className="mt-3 text-pretty text-[0.8rem] leading-relaxed text-ink-muted">
            Scan it with any UPI app, or type the ID in by hand if you are
            reading this on the phone you pay from.
          </p>
        </div>
      </div>
    </section>
  );
}
