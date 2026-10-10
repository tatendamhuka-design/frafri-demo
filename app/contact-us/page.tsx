import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact FraFri Adventure Escapes",
  description:
    "Get in touch with our Arusha-based team. WhatsApp, email or send an enquiry — we reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <main>
      <section style={{ backgroundColor: "var(--color-ink)" }}>
        <div className="container-page pt-40 pb-20 md:pt-48 md:pb-28">
          <p className="eyebrow" style={{ color: "var(--color-white)" }}>Contact</p>
          <h1 className="mt-5 max-w-3xl" style={{ color: "var(--color-white)" }}>
            Let&apos;s plan your Tanzania trip.
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Tell us where you want to go and when. Our Arusha team will reply
            within 24 hours with a tailored itinerary.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-page grid gap-14 lg:grid-cols-2">
          {/* Contact details */}
          <div>
            <p className="eyebrow">Reach us</p>
            <h2 className="mt-4">Talk to a local expert</h2>

            <dl className="mt-10 space-y-6">
              <ContactRow label="WhatsApp" value="+255 781 801 376" href="https://wa.me/255781801376" />
              <ContactRow label="Phone" value="+255 781 801 376" href="tel:+255781801376" />
              <ContactRow label="Email" value="frafriadventureescapes@gmail.com" href="mailto:frafriadventureescapes@gmail.com" />
              <ContactRow label="Office" value="Moivaro, Arusha, Tanzania · P.O. Box 15225" />
              <ContactRow label="Hours" value="Mon–Sun · 08:00 – 20:00 EAT" />
            </dl>
          </div>

          {/* Form */}
          <form
            className="p-8 md:p-10"
            style={{
              backgroundColor: "var(--color-sand)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" type="text" />
              <Field label="Email" name="email" type="email" />
              <Field label="Country" name="country" type="text" />
              <Field label="Travel dates" name="dates" type="text" placeholder="e.g. July 2027" />
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Group size" name="groupSize" type="text" placeholder="e.g. 2 adults" />
              <Field label="Interested in" name="interest" type="text" placeholder="Safari, Kilimanjaro, Zanzibar" />
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--color-muted)" }}>
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Any specific parks, lodges, budget or pace you have in mind?"
                className="w-full px-4 py-3 text-sm outline-none"
                style={{
                  backgroundColor: "var(--color-white)",
                  border: "1px solid var(--color-sand-deep)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-ink)",
                }}
              />
            </div>
            <button type="submit" className="btn-accent mt-7 w-full">
              Send enquiry
            </button>
            <p className="mt-4 text-center text-xs" style={{ color: "var(--color-muted)" }}>
              We reply within 24 hours. No spam, ever.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-6">
      <dt
        className="w-24 flex-shrink-0 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: "var(--color-muted)" }}
      >
        {label}
      </dt>
      <dd className="text-base">
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="underline underline-offset-4 hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-ink)" }}
          >
            {value}
          </a>
        ) : (
          <span style={{ color: "var(--color-ink)" }}>{value}</span>
        )}
      </dd>
    </div>
  );
}

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--color-muted)" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm outline-none"
        style={{
          backgroundColor: "var(--color-white)",
          border: "1px solid var(--color-sand-deep)",
          borderRadius: "var(--radius-md)",
          color: "var(--color-ink)",
        }}
      />
    </div>
  );
}