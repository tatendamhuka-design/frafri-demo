import type { MetadataRoute } from "next";
import { getPackages } from "./data/packages";
import { getDestinations } from "./data/destinations";
import { getGuides } from "./data/guides";

const BASE = "https://frafriadventuresescapes.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [packages, destinations, guides] = await Promise.all([
    getPackages(),
    getDestinations(),
    getGuides(),
  ]);

  const staticPages = [
    { url: "", priority: 1.0 },
    { url: "/all-tours", priority: 0.9 },
    { url: "/destinations", priority: 0.9 },
    { url: "/day-trips", priority: 0.7 },
    { url: "/travel-guides", priority: 0.7 },
    { url: "/about-us", priority: 0.6 },
    { url: "/contact-us", priority: 0.7 },
  ].map((p) => ({
    url: `${BASE}${p.url}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.priority,
  }));

  const packagePages = packages.map((p) => ({
    url: `${BASE}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const destinationPages = destinations.map((d) => ({
    url: `${BASE}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guidePages = guides.map((g) => ({
    url: `${BASE}/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...packagePages, ...destinationPages, ...guidePages];
}