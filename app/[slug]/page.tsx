import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackage, getPackages } from "../data/packages";
import { getDestinations } from "../data/destinations";
import { getGuide, getGuides } from "../data/guides";
import type { Package } from "../data/packages";
import type { Destination } from "../data/destinations";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const [packages, guides] = await Promise.all([getPackages(), getGuides()]);
  return [
    ...packages.map((p) => ({ slug: p.slug })),
    ...guides.map((g) => ({ slug: g.slug })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  const pkg = await getPackage(slug);
  if (pkg) {
    return {
      title: pkg.title,
      description: pkg.summary,
      openGraph: { title: pkg.title, description: pkg.summary, images: [pkg.image] },
    };
  }

  const guide = await getGuide(slug);
  if (guide) {
    return {
      title: guide.title,
      description: guide.excerpt,
      openGraph: { title: guide.title, description: guide.excerpt, images: [guide.image] },
    };
  }

  return {};
}

export default async function SlugPage({ params }: Params) {
  const { slug } = await params;

  const pkg = await getPackage(slug);
  if (pkg) {
    const destinations = await getDestinations();
    return <PackageView pkg={pkg} destinations={destinations} />;
  }

  const guide = await getGuide(slug);
  if (guide) return <GuideView guide={guide} />;

  notFound();
}

function PackageView({ pkg, destinations }: { pkg: Package; destinations: Destination[] }) {
  const related = destinations.filter((d) => pkg.destinations.includes(d.slug));
  const whatsappHref = `https://wa.me/255781801376?text=${encodeURIComponent(
    `Hi FraFri, I'm interested in the ${pkg.title}. Could you send me more details?`
  )}`;

  return (
    <main>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" />
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
            {pkg.duration} · {pkg.groupSize} · {pkg.location}
          </p>
          <h1 className="mt-4 max-w-4xl" style={{ color: "var(--color-white)" }}>
            {pkg.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg" style={{ color: "rgba(255,255,255,0.85)" }}>
            {pkg.summary}
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-page grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="eyebrow">Itinerary</p>
            <h2 className="mt-4">What&apos;s included</h2>
            <ul className="mt-8 space-y-4">
              {pkg.highlights.map((h) => (
                <li key={h} className="flex items-start gap-4">
                  <span
                    className="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                  <span className="text-lg leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-14">Where you&apos;ll go</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group flex items-center gap-4 p-4"
                  style={{ backgroundColor: "var(--color-sand)", borderRadius: "var(--radius-md)" }}
                >
                  <div
                    className="h-14 w-14 flex-shrink-0 overflow-hidden"
                    style={{ borderRadius: "var(--radius-md)" }}
                  >
                    <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="font-semibold">{d.name}</span>
                </Link>
              ))}
            </div>

            <p className="mt-14 leading-relaxed" style={{ color: "var(--color-muted)" }}>
              This itinerary is a starting point. Every FraFri trip is tailored
              to your dates, budget, group size and pace.
            </p>
          </div>

          <aside className="h-fit lg:sticky lg:top-8">
            <div className="p-8" style={{ backgroundColor: "var(--color-sand)", borderRadius: "var(--radius-lg)" }}>
              <p className="text-xs uppercase tracking-[0.15em]" style={{ color: "var(--color-muted)" }}>
                From
              </p>
              <p className="mt-2 font-display text-4xl">
                ${pkg.priceFrom.toLocaleString()}
                <span className="ml-2 text-base" style={{ color: "var(--color-muted)" }}>
                  per person
                </span>
              </p>
              <div className="mt-8 space-y-3">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-accent w-full">
                  Enquire on WhatsApp
                </a>
                <Link
                  href="/contact-us"
                  className="btn-ghost w-full"
                  style={{ color: "var(--color-ink)", borderColor: "var(--color-ink)" }}
                >
                  Send an enquiry
                </Link>
              </div>
              <ul className="mt-8 space-y-3 text-sm" style={{ color: "var(--color-muted)" }}>
                <li>✓ Reply within 24 hours</li>
                <li>✓ Fully customisable</li>
                <li>✓ Local Arusha operator</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function GuideView({ guide }: { guide: { title: string; excerpt: string; content: string; image: string; category: string; readTime: string } }) {
  return (
    <main>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={guide.image} alt={guide.title} className="h-full w-full object-cover" />
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
            {guide.category} · {guide.readTime}
          </p>
          <h1 className="mt-4 max-w-4xl" style={{ color: "var(--color-white)" }}>
            {guide.title}
          </h1>
        </div>
      </section>

      <article className="section" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-page max-w-2xl">
          <p className="text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
            {guide.excerpt}
          </p>
          {guide.content ? (
            <div
              className="mt-6 whitespace-pre-wrap leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              {guide.content}
            </div>
          ) : (
            <p className="mt-6 leading-relaxed" style={{ color: "var(--color-muted)" }}>
              This guide is being expanded. In the full build, each travel guide
              will include practical advice on the best months to visit, what to
              pack, how to combine parks, and where to stay — written by our
              Arusha team from first-hand experience.
            </p>
          )}
        </div>
      </article>
    </main>
  );
}