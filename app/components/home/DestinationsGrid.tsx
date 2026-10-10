import Link from "next/link";
import { getDestinations } from "../../data/destinations";

export default async function DestinationsGrid() {
  const destinations = await getDestinations();

  return (
    <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Top Tanzania Destinations</p>
          <h2 className="mt-4">Unique experiences</h2>
          <p className="mt-5 text-lg" style={{ color: "var(--color-muted)" }}>
            From the endless plains of the Serengeti to the turquoise waters of
            Zanzibar — the places that define a Tanzanian journey.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  className="mt-2 text-sm leading-relaxed opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {d.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/destinations" className="btn-accent">
            View all destinations
          </Link>
        </div>
      </div>
    </section>
  );
}