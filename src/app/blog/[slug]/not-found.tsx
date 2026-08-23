import { ArrowRightIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";

/** Shown when a slug does not match an article, in the site's own dressing. */
export default function ArticleNotFound() {
  return (
    <>
      <Header />

      <main>
        <section className="bg-cream py-[clamp(4rem,10vw,7rem)]">
          <div className="container-page flex flex-col items-center text-center">
            <p className="text-[0.62rem] tracked-wide text-gold-deep">404</p>

            <h1 className="mt-4 text-balance font-serif text-display font-light text-ink">
              That article has moved on
            </h1>

            <p className="mt-5 max-w-md text-pretty text-[0.95rem] leading-relaxed text-ink-soft">
              The piece you were looking for is not here. The journal itself is,
              though.
            </p>

            <DecorativeDivider className="mt-8" />

            <Button
              href="/blog"
              variant="ghost"
              className="mt-8"
              trailing={<ArrowRightIcon className="h-3.5 w-3.5" />}
            >
              Read all articles
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
