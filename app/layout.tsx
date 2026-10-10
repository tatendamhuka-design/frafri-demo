import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import ConditionalChrome from "./components/ConditionalChrome";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FraFri Adventure Escapes — Tanzania Safaris, Kilimanjaro Treks & Zanzibar",
    template: "%s | FraFri Adventure Escapes",
  },
  description:
    "Unforgettable Tanzania safari tours, Mount Kilimanjaro climbing adventures, cultural experiences, day trips from Arusha, and Zanzibar beach holidays — planned by a local Arusha team.",
  metadataBase: new URL("https://frafriadventuresescapes.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FraFri Adventure Escapes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  );
}