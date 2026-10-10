import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About FraFri Adventure Escapes",
  description:
    "FraFri Adventure Escapes is a local Arusha-based tour operator crafting tailor-made Tanzania safaris, Kilimanjaro treks and Zanzibar beach holidays.",
};

export default function AboutPage() {
  return (
    <main>
      <section style={{ backgroundColor: "var(--color-ink)" }}>
        <div className="container-page pt-40 pb-20 md:pt-48 md:pb-28">
          <p className="eyebrow" style={{ color: "var(--color-white)" }}>About us</p>
          <h1 className="mt-5 max-w-3xl" style={{ color: "var(--color-white)" }}>
            A local Arusha team, building Tanzania journeys from the ground up.
          </h1>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-page grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-4">Born in Tanzania, built for travellers.</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
              <p>
                FraFri Adventure Escapes is a Tanzania-based tour operator based
                in Moivaro, just outside Arusha — the gateway city to the
                northern safari circuit. We plan and run tailor-made safaris,
                Mount Kilimanjaro treks, cultural experiences, day trips, and
                Zanzibar beach holidays.
              </p>
              <p>
                We are not a booking platform or an overseas reseller. We are a
                local team who drive the routes, know the guides, understand the
                seasons, and are on the ground when your trip is happening.
              </p>
              <p>
                That matters because Tanzania rewards local knowledge. Which
                park to visit in which month. Which lodge fits your pace. How
                long the drive really takes. When to leave camp to catch the
                light. Every itinerary we build is shaped by that experience.
              </p>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              <Stat label="Based in" value="Arusha, TZ" />
              <Stat label="Trips run" value="Safari · Trek · Beach" />
              <Stat label="Response time" value="Within 24 hrs" />
            </div>
          </div>

          <aside
            className="h-fit p-8"
            style={{
              backgroundColor: "var(--color-sand)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <h3>Start planning</h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Tell us your dates and what matters most. We&apos;ll send a
              tailored itinerary within 24 hours.
            </p>
            <Link href="/contact-us" className="btn-accent mt-6 w-full">
              Send an enquiry
            </Link>
            <a
              href="https://wa.me/255781801376"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-3 w-full"
              style={{ color: "var(--color-ink)", borderColor: "var(--color-ink)" }}
            >
              Chat on WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="h-px w-10" style={{ backgroundColor: "var(--color-accent)" }} />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--color-muted)" }}>
        {label}
      </p>
      <p className="mt-2 font-display text-xl">{value}</p>
    </div>
  );
}