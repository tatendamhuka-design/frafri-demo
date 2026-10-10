import Link from "next/link";

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2400&q=80"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(15,14,12,0.92) 0%, rgba(15,14,12,0.7) 60%, rgba(15,14,12,0.5) 100%)",
          }}
        />
      </div>

      <div className="container-page relative py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow" style={{ color: "var(--color-white)" }}>
            Plan your trip
          </p>
          <h2 className="mt-4" style={{ color: "var(--color-white)" }}>
            Ready to experience the Serengeti, Kilimanjaro and Zanzibar?
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            Tell us where you want to go, when you plan to travel, and the kind
            of experience you&apos;re looking for. We&apos;ll send a tailored
            itinerary within 24 hours.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact-us" className="btn-accent">
              Plan your trip
            </Link>
            <a
              href="https://wa.me/255781801376?text=Hi%20FraFri%2C%20I%27d%20like%20help%20planning%20a%20Tanzania%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}