import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Blog } from "@/components/sections/Blog";
import { FeeStructure } from "@/components/sections/FeeStructure";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <TrustBar />
        <About />

        {/*
          Services and fees share one section on wide screens, mirroring the
          desktop reference; they stack below 1280px where the two-up split would
          squeeze both columns.
        */}
        <section
          aria-label="Services and fees"
          className="bg-cream-raised py-[clamp(3.5rem,7vw,6.5rem)]"
        >
          <div className="container-page">
            <div className="grid gap-14 xl:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)] xl:gap-12">
              <Services />

              <div className="xl:border-l xl:border-line xl:pl-12">
                <FeeStructure />
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <Blog />
      </main>

      <Footer />
    </>
  );
}
