"use client";

import Link from "next/link";
import { useState } from "react";

const GOLD = "var(--color-accent)";

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  return (
    <footer style={{ backgroundColor: "var(--color-olive)", color: "var(--color-white)" }}>
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="font-display text-xl font-semibold">
              FraFri Adventure Escapes
            </div>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              A local Arusha-based team crafting tailor-made Tanzania safaris,
              Mount Kilimanjaro treks, cultural experiences, and Zanzibar beach
              holidays. From the Serengeti to the Crater, we plan every detail
              so you can focus on the journey.
            </p>

            <img
              src="/logo.webp"
              alt="FraFri Adventure Escapes"
              style={{ height: "84px", width: "auto", display: "block", marginTop: "24px" }}
            />
          </div>

          {/* Explore */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/destinations" className="hover:opacity-80 transition-opacity">Destinations</Link></li>
              <li><Link href="/all-tours" className="hover:opacity-80 transition-opacity">Safari Packages</Link></li>
              <li><Link href="/day-trips" className="hover:opacity-80 transition-opacity">Day Trips</Link></li>
              <li><Link href="/travel-guides" className="hover:opacity-80 transition-opacity">Travel Guides</Link></li>
              <li><Link href="/about-us" className="hover:opacity-80 transition-opacity">About Us</Link></li>
              <li><Link href="/contact-us" className="hover:opacity-80 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm" style={{ color: "var(--color-white)" }}>
              <li className="flex items-start gap-3">
                <span style={{ color: GOLD }} className="mt-0.5 flex-shrink-0"><PinIcon /></span>
                <span>Moivaro, Arusha, Tanzania · P.O. Box 15225</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: GOLD }} className="mt-0.5 flex-shrink-0"><PhoneIcon /></span>
                <a href="tel:+255781801376" className="hover:opacity-80 transition-opacity">
                  +255 781 801 376
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: GOLD }} className="mt-0.5 flex-shrink-0"><MailIcon /></span>
                <a
                  href="mailto:frafriadventureescapes@gmail.com"
                  className="hover:opacity-80 transition-opacity break-all"
                >
                  frafriadventureescapes@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: GOLD }} className="mt-0.5 flex-shrink-0"><WhatsAppIcon /></span>
                <a
                  href="https://wa.me/255781801376"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  WhatsApp →
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter + socials */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              Newsletter
            </h4>
            <p
              className="mt-5 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Safari tips, seasonal advice and occasional offers from our
              Arusha team.
            </p>

            <form
              className="mt-5 flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-3 text-sm outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-ink)",
                }}
              />
              <button
                type="submit"
                className="btn-accent whitespace-nowrap transition-transform duration-200 hover:scale-105"
              >
                Subscribe
              </button>
            </form>

            {/* Socials with Follow us label */}
            <div className="mt-8 flex items-center gap-4">
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: GOLD }}
              >
                Follow us:
              </span>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-transform duration-200 hover:scale-125"
                style={{ color: GOLD }}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform duration-200 hover:scale-125"
                style={{ color: GOLD }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/255781801376"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-transform duration-200 hover:scale-125"
                style={{ color: GOLD }}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar — © left · designed by centre · TATO right */}
        <div
          className="mt-14 flex flex-col items-center gap-3 border-t pt-6 text-xs text-center lg:grid lg:grid-cols-3 lg:items-center lg:text-left"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <p className="lg:justify-self-start">
            © {year} FraFri Adventure Escapes. All rights reserved.
          </p>

          <p className="lg:justify-self-center">
            Designed by{" "}
            <a
              href="https://inkspiredigitaldesigns.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-opacity hover:opacity-80"
              style={{ color: GOLD }}
            >
              Inkspire Digital Designs
            </a>
          </p>

          <p className="lg:justify-self-end">
            Local team based in Arusha, Tanzania · TATO Member
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Icons ---------- */

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7h2.5l.5-3h-3V9.2c0-.9.3-1.5 1.6-1.5H17V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H8v3h2.5v7h3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.1 3 .1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.3-1.3-2.9-1.3-4.5C3.5 7.3 7.3 3.5 12 3.5S20.5 7.3 20.5 12 16.7 20.2 12 20.2z" />
    </svg>
  );
}