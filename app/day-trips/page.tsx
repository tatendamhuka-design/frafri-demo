import type { Metadata } from "next";
import { PageHeader } from "../all-tours/page";

export const metadata: Metadata = {
  title: "Day Trips from Arusha",
  description:
    "Day trips from Arusha — Arusha National Park, cultural experiences, waterfalls and local markets. Perfect for travellers with a spare day.",
};

export default function DayTripsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Day Trips"
        title="Day trips from Arusha"
        intro="Short excursions for travellers with a spare day — national parks, cultural visits, waterfalls and local markets."
      />

      <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-page max-w-2xl">
          <p className="text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Our full day-trip collection is coming soon. In the meantime, tell
            us what you&apos;re interested in and we&apos;ll put together a
            half-day or full-day itinerary around your schedule.
          </p>
          <a
            href="https://wa.me/255781801376?text=Hi%20FraFri%2C%20I%27m%20interested%20in%20a%20day%20trip%20from%20Arusha."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent mt-8"
          >
            Ask about day trips
          </a>
        </div>
      </section>
    </main>
  );
}