const BADGES = [
  "TripAdvisor",
  "TATO Member",
  "Tanzania Unforgettable",
  "TANAPA Licensed",
];

export default function TrustBadges() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-cream)",
        borderTop: "1px solid var(--color-sand-deep)",
        borderBottom: "1px solid var(--color-sand-deep)",
      }}
    >
      <div className="container-page py-8">
        <p
          className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.25em]"
          style={{ color: "var(--color-muted)" }}
        >
          Trusted &amp; Registered
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BADGES.map((b) => (
            <span
              key={b}
              className="font-display text-base"
              style={{ color: "var(--color-ink)", opacity: 0.75 }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}