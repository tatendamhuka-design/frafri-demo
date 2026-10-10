import Link from "next/link";
import { getGuides } from "../../data/guides";

export default async function TravelGuidesTeaser() {
  const guides = await getGuides();

  return (
    <section
      className="py-16 md:py-20"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Travel Guides</p>
            <h2 className="mt-4">Plan with local insight</h2>
          </div>
          <Link
            href="/travel-guides"
            className="text-sm font-semibold underline underline-offset-4"
            style={{ color: "var(--color-accent-dark)" }}
          >
            All guides →
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link key={g.slug} href={`/${g.slug}`} className="group block">
              <div
                className="overflow-hidden"
                style={{ borderRadius: "var(--radius-lg)", aspectRatio: "16 / 10" }}
              >
                <img
                  src={g.image}
                  alt={g.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p
                className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--color-accent-dark)" }}
              >
                {g.category} · {g.readTime}
              </p>
              <h3 className="mt-3 leading-snug">{g.title}</h3>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {g.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}