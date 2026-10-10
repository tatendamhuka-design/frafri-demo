const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=80",
    eyebrow: "Tanzania Safaris",
    line1: "The Serengeti.",
    line2: "The Crater. All in one journey.",
    body: "Northern circuit safaris built by an Arusha team who drive these routes every week — not a call centre, not a reseller.",
    secondaryLabel: "See safari packages",
    secondaryHref: "/all-tours",
  },
  {
    image:
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=2400&q=80",
    eyebrow: "Wildlife Safaris",
    line1: "Big cats at dawn.",
    line2: "The migration in motion.",
    body: "Game drives timed to when the animals actually move — early starts, patient afternoons, and guides who know where to look.",
    secondaryLabel: "Explore destinations",
    secondaryHref: "/destinations",
  },
  {
    image:
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=2400&q=80",
    eyebrow: "Mount Kilimanjaro",
    line1: "Africa's highest peak.",
    line2: "Five climate zones. One summit.",
    body: "Machame, Lemosho, Rongai — every route led by experienced local mountain teams with proper acclimatisation.",
    secondaryLabel: "See Kilimanjaro routes",
    secondaryHref: "/all-tours",
  },
  {
    image:
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=2400&q=80",
    eyebrow: "Zanzibar",
    line1: "Turquoise water.",
    line2: "Dhow sunsets and Stone Town.",
    body: "The safari finale. White-sand beaches, spice farms and the warm Indian Ocean — paired with any northern circuit itinerary.",
    secondaryLabel: "Explore Zanzibar",
    secondaryHref: "/destinations/zanzibar",
  },
  {
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=80",
    eyebrow: "Tailor-made Journeys",
    line1: "Your dates. Your pace.",
    line2: "Your Tanzania.",
    body: "Tell us what matters — private safaris, multi-country trips, family travel — and we'll shape the itinerary around you.",
    secondaryLabel: "Plan your journey",
    secondaryHref: "/contact-us",
  },
];

const WHATSAPP_HREF =
  "https://wa.me/255781801376?text=Hi%20FraFri%2C%20I%27m%20interested%20in%20planning%20a%20Tanzania%20trip.";

export default function Hero() {
  return (
    <section
      className="relative flex items-start overflow-hidden"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      {/* Images — cross-fade with slow zoom, 50s total loop (10s per slide) */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.image}
            src={slide.image}
            alt=""
            aria-hidden="true"
            className="hero-slide absolute inset-0 h-full w-full object-cover"
            style={{
              animationDelay: `${i * 10}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 35%, rgba(10,10,10,0.55) 75%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Text — one block per slide, fades with its slide */}
      <div className="container-page relative z-10 pt-10 pb-24">
        <div className="relative max-w-3xl" style={{ minHeight: "320px" }}>
          {SLIDES.map((slide, i) => (
            <div
              key={slide.image}
              className="hero-text absolute inset-0"
              style={{ animationDelay: `${i * 10}s` }}
            >
              <p className="eyebrow" style={{ color: "var(--color-accent)" }}>
                {slide.eyebrow}
              </p>

              <h1
                className="mt-6"
                style={{
                  color: "var(--color-white)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.35)",
                }}
              >
                {slide.line1}
                <br />
                <span style={{ color: "var(--color-accent)" }}>{slide.line2}</span>
              </h1>

              <p
                className="mt-7 max-w-xl text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {slide.body}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="/contact-us" className="btn-accent">
                  Start Planning
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.1 3 .1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.3-1.3-2.9-1.3-4.5C3.5 7.3 7.3 3.5 12 3.5S20.5 7.3 20.5 12 16.7 20.2 12 20.2z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                <a
                  href={slide.secondaryHref}
                  className="inline-flex items-center text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {slide.secondaryLabel} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 gap-2 md:flex">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className="hero-dot"
            style={{ animationDelay: `${i * 10}s` }}
          />
        ))}
      </div>
    </section>
  );
}