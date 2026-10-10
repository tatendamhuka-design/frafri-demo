import Link from "next/link";

const BADGES = [
  "TripAdvisor",
  "TATO Member",
  "Tanzania Unforgettable",
  "TANAPA Licensed",
  "Est. Arusha, Tanzania",
];

export default function WhyFraFri() {
  return (
    <section style={{ backgroundColor: "var(--color-sand)", position: "relative", overflow: "hidden" }}>
      <div className="container-page">
        {/* Two-column block */}
        <div className="grid gap-14 pt-20 lg:grid-cols-12 lg:gap-16 lg:pt-28">
          {/* Left — words */}
          <div className="pb-16 lg:col-span-6 lg:self-center">
            <p className="eyebrow">Introduction</p>
            <h2 className="mt-4">Welcome to FraFri Adventure Escapes</h2>

            <p
              className="mt-8 text-lg leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              Begin your Tanzania journey with FraFri Adventure Escapes and
              discover the landscapes, wildlife and cultures that make this
              country truly unforgettable. Every safari, trek or beach holiday
              can be customised to suit your travel style, budget and schedule.
              Our team understands Tanzania&apos;s parks, routes, seasons and
              hidden gems, helping you make the most of your time — and we
              support you before, during and after your trip, with clear
              communication and careful planning.
            </p>

            <Link href="/about-us" className="btn-accent mt-10">
              Learn more about us
            </Link>
          </div>

          {/* Right — image */}
          <div className="pb-16 lg:col-span-6">
            <div
              className="h-full overflow-hidden"
              style={{
                borderRadius: "var(--radius-lg)",
                minHeight: "480px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1400&q=80"
                alt="Family at a safari camp at sunset in Tanzania"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee — full-bleed, isolated, cannot affect layout of siblings */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          borderTop: "1px solid var(--color-sand-deep)",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "64px",
            width: "max-content",
            animation: "marqueeScroll 40s linear infinite",
          }}
        >
          {[...BADGES, ...BADGES].map((b, i) => (
            <span
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "64px",
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem",
                color: "var(--color-muted)",
                whiteSpace: "nowrap",
              }}
            >
              <span>{b}</span>
              <span
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "9999px",
                  backgroundColor: "var(--color-accent)",
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}