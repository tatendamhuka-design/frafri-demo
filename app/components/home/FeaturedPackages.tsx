import Link from "next/link";
import { getPackages } from "../../data/packages";

export default async function FeaturedPackages() {
  const featured = (await getPackages()).filter((p) => p.featured);

  return (
    <section className="section" style={{ backgroundColor: "var(--color-sand)" }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Explore Great Places</p>
          <h2 className="mt-4">Best selling safari packages</h2>
          <p className="mt-5 text-lg" style={{ color: "var(--color-muted)" }}>
            Hand-crafted itineraries through Tanzania&apos;s northern circuit —
            private guides, custom pacing, and every detail handled.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group grid overflow-hidden lg:grid-cols-2"
              style={{
                backgroundColor: "var(--color-cream)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: "var(--color-accent-dark)" }}
                >
                  <span>{p.duration}</span>
                  <span style={{ color: "var(--color-muted-light)" }}>·</span>
                  <span>{p.groupSize}</span>
                  <span style={{ color: "var(--color-muted-light)" }}>·</span>
                  <span>{p.location}</span>
                </div>

                <h3 className="mt-5">{p.title}</h3>

                <p className="mt-4 leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {p.summary}
                </p>

                <ul className="mt-6 space-y-2 text-sm">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span
                        className="mt-2 inline-block h-1 w-1 rounded-full"
                        style={{ backgroundColor: "var(--color-accent)" }}
                      />
                      <span style={{ color: "var(--color-ink)" }}>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs uppercase tracking-[0.15em]"
                      style={{ color: "var(--color-muted)" }}
                    >
                      From
                    </p>
                    <p className="font-display text-2xl" style={{ color: "var(--color-ink)" }}>
                      ${p.priceFrom.toLocaleString()}
                      <span className="ml-1 text-sm" style={{ color: "var(--color-muted)" }}>
                        pp
                      </span>
                    </p>
                  </div>
                  <span className="btn-accent">View itinerary</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/all-tours" className="btn-accent">
            View all packages
          </Link>
        </div>
      </div>
    </section>
  );
}