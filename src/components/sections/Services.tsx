import { ServiceCard } from "@/components/sections/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <div id="services" className="scroll-mt-24">
      <SectionHeading id="services-heading">My Services</SectionHeading>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-11 lg:grid-cols-3 lg:gap-5">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 70}>
            <ServiceCard service={service} index={index} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
