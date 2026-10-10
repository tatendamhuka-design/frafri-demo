import Link from "next/link";

const ITEMS = [
  {
    title: "Mountain Adventures",
    body: "Guided climbs, scenic trails and Kilimanjaro experiences.",
    image:
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80",
    href: "/all-tours",
  },
  {
    title: "Wildlife Safaris",
    body: "Game drives, big cats and unforgettable wilderness moments.",
    image:
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
    href: "/all-tours",
  },
  {
    title: "Cultural Encounters",
    body: "Meet local communities and discover everyday Tanzanian life.",
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80",
    href: "/all-tours",
  },
  {
    title: "Nature Escapes",
    body: "Hot springs, waterfalls, forests and peaceful outdoor getaways.",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80",
    href: "/all-tours",
  },
  {
    title: "Private Journeys",
    body: "Custom trips planned around your time, budget and interests.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    href: "/contact-us",
  },
  {
    title: "Beach Holidays",
    body: "Island relaxation, ocean views and coastal experiences.",
    image:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80",
    href: "/all-tours",
  },
];

export default function WaysToExperience() {
  return (
    <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Choose Your Style</p>
          <h2 className="mt-4">Ways to experience Tanzania</h2>
          <p className="mt-5 text-lg" style={{ color: "var(--color-muted)" }}>
            Every traveller comes to Tanzania for something different. Tell us
            what draws you here, and we&apos;ll shape the journey around it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative block overflow-hidden"
              style={{ borderRadius: "var(--radius-lg)", aspectRatio: "3 / 4" }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
              />

              {/* Base gradient */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,14,12,0.88) 0%, rgba(15,14,12,0.35) 45%, rgba(15,14,12,0.05) 75%, rgba(15,14,12,0) 100%)",
                }}
              />

              {/* Hover darken */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: "rgba(15,14,12,0.25)" }}
              />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3
                  className="text-2xl leading-tight"
                  style={{ color: "var(--color-white)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {item.body}
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "var(--color-white)" }}
                >
                  Explore
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}