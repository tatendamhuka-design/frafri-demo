const ITEMS = [
  {
    label: "Based in Arusha",
    sub: "Local Tanzanian team",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Tailor-made itineraries",
    sub: "Built around your trip",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 6h11M4 12h16M4 18h9" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="15" cy="18" r="2" />
      </svg>
    ),
  },
  {
    label: "TATO registered",
    sub: "Licensed operator",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "24/7 support",
    sub: "Before, during, after",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

export default function TrustStrip() {
  return (
    <section style={{ backgroundColor: "var(--color-sand)" }}>
      <div className="container-page grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 px-2 lg:justify-center"
          >
            <span style={{ color: "var(--color-accent)" }}>{item.icon}</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                {item.label}
              </p>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}