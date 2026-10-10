import { prisma } from "../../lib/prisma";

export type Package = {
  slug: string;
  title: string;
  duration: string;
  groupSize: string;
  location: string;
  priceFrom: number;
  image: string;
  summary: string;
  highlights: string[];
  destinations: string[];
  featured: boolean;
};

export async function getPackages(): Promise<Package[]> {
  const rows = await prisma.package.findMany({
    where: { published: true },
    include: { destinations: true },
    orderBy: { updatedAt: "desc" },
  });

  return rows.map((p) => ({
    slug: p.slug,
    title: p.title,
    duration: p.duration,
    groupSize: p.groupSize,
    location: p.location,
    priceFrom: p.priceFrom,
    image: p.image,
    summary: p.summary,
    highlights: p.highlights,
    destinations: p.destinations.map((d) => d.slug),
    featured: p.featured,
  }));
}

export async function getPackage(slug: string): Promise<Package | null> {
  const p = await prisma.package.findUnique({
    where: { slug },
    include: { destinations: true },
  });
  if (!p || !p.published) return null;

  return {
    slug: p.slug,
    title: p.title,
    duration: p.duration,
    groupSize: p.groupSize,
    location: p.location,
    priceFrom: p.priceFrom,
    image: p.image,
    summary: p.summary,
    highlights: p.highlights,
    destinations: p.destinations.map((d) => d.slug),
    featured: p.featured,
  };
}