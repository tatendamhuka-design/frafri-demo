import type { Metadata } from "next";
import Link from "next/link";
import { getPackages } from "../data/packages";

export const metadata: Metadata = {
  title: "Tanzania Safari Packages",
  description:
    "Tailor-made Tanzania safari packages through the Serengeti, Ngorongoro Crater, Tarangire and Lake Manyara — private guides, custom itineraries.",
};

export default async function AllToursPage() {
  const packages = await getPackages();

  return (
    <main>
      <PageHeader
        eyebrow="Safari Packages"
        title="Tanzania safari itineraries"
        intro="Every itinerary is a starting point — tell us your dates, budget and pace, and we'll tailor it to you."
      />

      <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-page grid gap-8 md:grid-cols-2">
          {packages.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group block overflow-hidden"
              style={{
                backgroundColor: "var(--color-sand)",
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
                  {p.duration} · {p.groupSize}
                </p>
                <h3 className="mt-3">{p.title}</h3>
                <p className="mt-3 leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {p.summary}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <p className="font-display text-xl">
                    From ${p.priceFrom.toLocaleString()}
                    <span className="ml-1 text-sm" style={{ color: "var(--color-muted)" }}>
                      pp
                    </span>
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
      </section>
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section style={{ backgroundColor: "var(--color-ink)" }}>
      <div className="container-page pt-40 pb-20 md:pt-48 md:pb-28">
        <p className="eyebrow" style={{ color: "var(--color-white)" }}>
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl" style={{ color: "var(--color-white)" }}>
          {title}
        </h1>
        {intro && (
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}