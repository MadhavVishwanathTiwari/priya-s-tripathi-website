import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { fees } from "@/data/fees";

/**
 * A real table at every width. `table-layout: fixed` with proportional columns
 * means it re-flows instead of overflowing, so prices stay scannable on a phone
 * without breaking the row-by-row comparison the reference relies on.
 */
export function FeeStructure() {
  return (
    <div id="fees" className="scroll-mt-24">
      <SectionHeading id="fees-heading">Fee Structure</SectionHeading>

      <Reveal className="mt-9 lg:mt-11">
        <div className="overflow-hidden rounded-sm border border-line bg-fee-base">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">
              Consultation fees by service. Prices are indicative starting points.
            </caption>
            <colgroup>
              <col className="w-[13%] sm:w-[12%]" />
              <col className="w-[54%] sm:w-[58%]" />
              <col className="w-[33%] sm:w-[30%]" />
            </colgroup>
            <thead className="sr-only">
              <tr>
                <th scope="col">Icon</th>
                <th scope="col">Service</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, index) => (
                <tr
                  key={fee.service}
                  className={
                    index % 2 === 0
                      ? "group bg-fee-row/70 border-b border-line/70 transition-colors duration-200 last:border-b-0 hover:bg-peach-soft/60"
                      : "group border-b border-line/70 transition-colors duration-200 last:border-b-0 hover:bg-peach-soft/40"
                  }
                >
                  <td className="border-r border-line/60 px-1.5 py-4 align-middle sm:px-3">
                    <Image
                      src={fee.icon}
                      alt=""
                      aria-hidden="true"
                      width={140}
                      height={140}
                      className="mx-auto h-6 w-6 object-contain xs:h-7 xs:w-7 sm:h-8 sm:w-8"
                    />
                  </td>
                  <th
                    scope="row"
                    className="border-r border-line/60 px-2.5 py-4 text-left align-middle text-[0.82rem] font-normal leading-snug text-ink sm:px-4 sm:text-[0.87rem]"
                  >
                    {/*
                      The row is a link to the service it prices. The anchor
                      wraps only the name rather than the whole row: a table row
                      cannot legally contain one, and stretching it across the
                      cells would swallow the price in the accessible name.
                    */}
                    <Link
                      href={`/services/${fee.slug}`}
                      className="transition-colors duration-200 group-hover:text-gold-deep"
                    >
                      {fee.service}
                    </Link>
                    {fee.note ? (
                      <span className="mt-1 block text-[0.66rem] leading-snug text-ink-muted">
                        ({fee.note})
                      </span>
                    ) : null}
                  </th>
                  <td className="px-2 py-4 text-center align-middle text-[0.82rem] leading-snug text-ink-soft sm:px-4 sm:text-[0.87rem]">
                    {fee.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}
