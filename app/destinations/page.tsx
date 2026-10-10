import type { Metadata } from "next";
import Link from "next/link";
import { getDestinations } from "../data/destinations";
import { PageHeader } from "../all-tours/page";

export const metadata: Metadata = {
  title: "Tanzania Safari Destinations",
  description:
    "The Serengeti, Ngorongoro Crater, Tarangire, Lake Manyara, Mount Kilimanjaro and Zanzibar — the destinations that define a Tanzanian journey.",
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <main>
      <PageHeader
        eyebrow="Destinations"
        title="Where to go in Tanzania"
        intro="From the northern safari circuit to the summit of Kilimanjaro and the beaches of Zanzibar — the places we know best."
      />

      <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group relative block overflow-hidden"
              style={{ borderRadius: "var(--radius-lg)", aspectRatio: "4 / 5" }}
            >
              <img
                src={d.image}
                alt={d.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,14,12,0.85) 0%, rgba(15,14,12,0.15) 55%, rgba(15,14,12,0) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {d.region}
                </p>
                <h3 className="mt-2" style={{ color: "var(--color-white)" }}>
                  {d.name}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {d.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}