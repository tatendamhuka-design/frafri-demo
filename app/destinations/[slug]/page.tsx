import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestinations, getDestination } from "../../data/destinations";
import { getPackages } from "../../data/packages";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) return {};

  return {
    title: destination.name,
    description: destination.blurb,
    openGraph: {
      title: destination.name,
      description: destination.blurb,
      images: [destination.image],
    },
  };
}

export default async function DestinationPage({ params }: Params) {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) notFound();

  const allPackages = await getPackages();
  const related = allPackages.filter((p) =>
    p.destinations.includes(destination.slug)
  );

  return (
    <main>
      <section className="relative flex min-h-[65vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.35) 55%, rgba(10,10,10,0.5) 100%)",
            }}
          />
        </div>

        <div className="container-page relative pb-16 pt-40">
          <p
            className="text-[0.65rem] font-semibold uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {destination.region}
          </p>
          <h1 className="mt-4 max-w-3xl" style={{ color: "var(--color-white)" }}>
            {destination.name}
          </h1>
          <p
            className="mt-5 max-w-2xl text-lg"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {destination.tagline}
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-page grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="eyebrow">Overview</p>
            <h2 className="mt-4">About {destination.name}</h2>
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              {destination.blurb}
            </p>
            <p
              className="mt-5 leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              Every FraFri itinerary through this region is built around your
              travel dates, pace and priorities — private guides, carefully
              chosen lodges, and realistic driving times. Tell us what matters
              most and we&apos;ll shape the route around it.
            </p>
          </div>

          <aside
            className="h-fit p-8"
            style={{
              backgroundColor: "var(--color-sand)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <h3>Plan this trip</h3>
            <p className="mt-3 text-sm" style={{ color: "var(--color-muted)" }}>
              We&apos;ll send a tailored itinerary within 24 hours.
            </p>
            <a
              href={`https://wa.me/255781801376?text=${encodeURIComponent(
                `Hi FraFri, I'd like to plan a trip to ${destination.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent mt-6 w-full"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact-us"
              className="btn-ghost mt-3 w-full"
              style={{ color: "var(--color-ink)", borderColor: "var(--color-ink)" }}
            >
              Send an enquiry
            </Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" style={{ backgroundColor: "var(--color-sand)" }}>
          <div className="container-page">
            <p className="eyebrow">Included in</p>
            <h2 className="mt-4">Packages featuring {destination.name}</h2>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group block overflow-hidden"
                  style={{
                    backgroundColor: "var(--color-cream)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.15em]"
                      style={{ color: "var(--color-accent-dark)" }}
                    >
                      {p.duration}
                    </p>
                    <h3 className="mt-3">{p.title}</h3>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="font-display text-xl">
                        From ${p.priceFrom.toLocaleString()}
                      </p>
                      <span
                        className="text-sm font-semibold underline underline-offset-4"
                        style={{ color: "var(--color-accent-dark)" }}
                      >
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}