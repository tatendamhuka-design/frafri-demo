"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV = [
  { label: "Destinations", href: "/destinations" },
  { label: "Safari Packages", href: "/all-tours" },
  { label: "Day Trips", href: "/day-trips" },
  { label: "Travel Guides", href: "/travel-guides" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      {/* Topbar — collapses on scroll */}
      <div
        style={{
          backgroundColor: "var(--color-white)",
          borderBottom: scrolled ? "none" : "1px solid var(--color-sand-deep)",
          maxHeight: scrolled ? 0 : "80px",
          overflow: "hidden",
          transition: "max-height 0.3s ease, border 0.3s ease",
        }}
      >
        <div className="container-page flex items-center justify-between py-3">
          <div className="flex items-center gap-6 text-sm font-bold" style={{ color: "var(--color-olive)" }}>
            {today && (
              <span className="hidden items-center gap-2 whitespace-nowrap lg:flex">
                <CalendarIcon />
                <span>{today}</span>
              </span>
            )}
            <a
              href="tel:+255781801376"
              className="flex items-center gap-2 whitespace-nowrap transition-transform duration-200 hover:scale-110 origin-left"
              style={{ color: "var(--color-olive)" }}
            >
              <PhoneIcon />
              <span>+255 781 801 376</span>
            </a>
            <a
              href="mailto:frafriadventureescapes@gmail.com"
              className="hidden items-center gap-2 whitespace-nowrap transition-transform duration-200 hover:scale-110 origin-left md:flex"
              style={{ color: "var(--color-olive)" }}
            >
              <MailIcon />
              <span>frafriadventureescapes@gmail.com</span>
            </a>
            <span className="hidden items-center gap-2 whitespace-nowrap lg:flex" style={{ color: "var(--color-olive)" }}>
              <PinIcon />
              <span>Moivaro, Arusha · Tanzania</span>
            </span>
          </div>

          <div className="flex items-center gap-5" style={{ color: "var(--color-olive)" }}>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-transform duration-200 hover:scale-125" style={{ color: "var(--color-olive)" }}>
              <FacebookIcon />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform duration-200 hover:scale-125" style={{ color: "var(--color-olive)" }}>
              <InstagramIcon />
            </a>
            <a href="https://wa.me/255781801376" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-transform duration-200 hover:scale-125" style={{ color: "var(--color-olive)" }}>
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-cream) 0%, var(--color-cream) 24%, var(--color-olive) 55%, var(--color-olive) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0) 55%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container-page relative flex items-center justify-between py-3"
          style={{ minHeight: "100px" }}
        >
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center flex-shrink-0">
            <img
              src="/logo.webp"
              alt="FraFri Adventure Escapes"
              style={{ height: "88px", width: "auto", display: "block" }}
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-block text-base font-semibold transition-transform duration-200 hover:scale-110 whitespace-nowrap"
                style={{ color: "var(--color-white)" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://wa.me/255781801376"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent text-sm transition-transform duration-200 hover:scale-105 whitespace-nowrap"
            >
              WhatsApp Us
            </a>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-6 transition-transform" style={{ backgroundColor: "var(--color-white)", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
              <span className="block h-0.5 w-6 transition-opacity" style={{ backgroundColor: "var(--color-white)", opacity: open ? 0 : 1 }} />
              <span className="block h-0.5 w-6 transition-transform" style={{ backgroundColor: "var(--color-white)", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-0 z-40 flex flex-col lg:hidden" style={{ backgroundColor: "var(--color-olive)" }}>
          <div className="container-page flex items-center justify-between py-4">
            <img src="/logo.webp" alt="FraFri Adventure Escapes" style={{ height: "64px", width: "auto", display: "block" }} />
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center">
              <span className="text-2xl leading-none" style={{ color: "var(--color-white)" }}>×</span>
            </button>
          </div>

          <nav className="container-page mt-8 flex flex-col gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="inline-block font-display text-3xl transition-transform duration-200 hover:scale-105 origin-left"
                style={{ color: "var(--color-white)" }}
              >
                {item.label}
              </Link>
            ))}
            <a href="https://wa.me/255781801376" target="_blank" rel="noopener noreferrer" className="btn-accent mt-4 w-fit">
              WhatsApp Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- Icons ---------- */

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true" className="flex-shrink-0">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true" className="flex-shrink-0">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true" className="flex-shrink-0">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true" className="flex-shrink-0">
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7h2.5l.5-3h-3V9.2c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H8v3h2.5v7h3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.1 3 .1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.3-1.3-2.9-1.3-4.5C3.5 7.3 7.3 3.5 12 3.5S20.5 7.3 20.5 12 16.7 20.2 12 20.2z" />
    </svg>
  );
}