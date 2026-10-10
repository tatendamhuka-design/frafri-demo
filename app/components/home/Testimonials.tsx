const REVIEWS = [
  {
    quote:
      "FraFri handled everything — the crater, the Serengeti, the beach. Our guide knew every corner and the whole trip ran without a single hiccup.",
    name: "Sarah & Tom",
    country: "United Kingdom",
  },
  {
    quote:
      "We planned the trip in three weeks and they still tailored every day to what we wanted. Genuinely local knowledge, not a call-centre operation.",
    name: "Michael R.",
    country: "United States",
  },
  {
    quote:
      "Kilimanjaro was the hardest and best thing I've done. The team's pacing and support made the summit feel possible.",
    name: "Anja K.",
    country: "Germany",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-16 md:py-20"
      style={{ backgroundColor: "var(--color-sand)" }}
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Travellers</p>
          <h2 className="mt-4">What our guests say</h2>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col justify-between p-8"
              style={{
                backgroundColor: "var(--color-cream)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div
                className="flex gap-1"
                style={{ color: "var(--color-accent)" }}
                aria-hidden="true"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="m12 2 2.9 6.9L22 9.6l-5.4 4.7L18.2 22 12 18.3 5.8 22l1.6-7.7L2 9.6l7.1-.7L12 2Z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mt-6 font-display text-lg leading-snug">
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-8 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span style={{ color: "var(--color-muted)" }}> · {r.country}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}