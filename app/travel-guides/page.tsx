import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "../data/guides";
import { PageHeader } from "../all-tours/page";

export const metadata: Metadata = {
  title: "Tanzania Travel Guides",
  description:
    "Local insight on Tanzania safaris, Kilimanjaro treks and Zanzibar — planning advice, best months to visit, and what to expect.",
};

export default async function TravelGuidesPage() {
  const guides = await getGuides();

  return (
    <main>
      <PageHeader
        eyebrow="Travel Guides"
        title="Plan with local insight"
        intro="Practical guidance from our Arusha team — when to visit, where to go, and what to expect on the ground."
      />

      <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-page grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </main>
  );
}