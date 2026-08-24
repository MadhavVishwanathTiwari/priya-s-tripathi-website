"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CalendarIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /*
    Clicking a hash link a second time does nothing on its own: the URL has not
    changed, so there is no navigation for the router to act on and the browser
    considers itself already there. Anyone who scrolls away and reaches for
    "Services" again is left with a dead link, which is what this handles.
  */
  function scrollToHash(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const [path, hash] = href.split("#");
    if (!hash || (path || "/") !== pathname) return;

    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    setOpen(false);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    // Keep the address bar in step without pushing a duplicate history entry.
    window.history.replaceState(null, "", href);
  }

  /*
    Only the two real routes can be current — everything else in the nav is an
    in-page anchor on the homepage. `/blog` stays marked while reading an
    article, so the section a visitor is inside is always the highlighted one.
  */
  function isCurrent(href: string) {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  // Close on Escape, and keep focus inside the panel while it is open.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative z-50 bg-cream-raised">
      <div className="container-page flex items-center justify-between gap-6 py-3 lg:py-5">
        <Logo showTagline />

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={(event) => scrollToHash(event, item.href)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-[0.82rem] transition-colors duration-200",
                    isCurrent(item.href)
                      ? "text-peach after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-peach"
                      : "text-ink-soft hover:text-gold-deep",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Wrapped rather than given `hidden` directly: both `hidden` and the
              button's own `inline-flex` are display utilities, so the winner
              would depend on stylesheet order rather than on the class list. */}
          <div className="hidden md:block">
            <Button href="/contact" icon={<CalendarIcon className="h-4 w-4" />}>
              Book Consultation
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-peach-soft/50 xl:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-line-soft bg-cream-raised shadow-[0_18px_40px_-30px_rgba(90,70,55,0.5)] xl:hidden"
      >
        <nav aria-label="Primary" className="container-page py-2">
          <ul className="flex flex-col divide-y divide-line-soft/80">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={(event) => {
                    setOpen(false);
                    scrollToHash(event, item.href);
                  }}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center text-sm tracked transition-colors duration-200",
                    isCurrent(item.href)
                      ? "text-peach"
                      : "text-ink-soft hover:text-gold-deep",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/*
            The CTA used to sit on its own row under the logo, which cost the
            mobile header half its height. It lives here now: still one tap
            away on every page, but only while the menu is open. It is inside
            the panel, so the focus trap above picks it up on its own.
          */}
          <div className="flex justify-center py-4">
            <Button
              href="/contact"
              icon={<CalendarIcon className="h-4 w-4" />}
              onClick={() => setOpen(false)}
            >
              Book Consultation
            </Button>
          </div>
        </nav>
      </div>

      <span className="block h-px w-full bg-line-soft" />
    </header>
  );
}
