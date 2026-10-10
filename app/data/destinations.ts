import { prisma } from "../../lib/prisma";

export type Destination = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  image: string;
  region: string;
};

export async function getDestinations(): Promise<Destination[]> {
  const rows = await prisma.destination.findMany({
    where: { published: true },
    orderBy: { name: "asc" },
  });

  return rows.map((d) => ({
    slug: d.slug,
    name: d.name,
    tagline: d.tagline,
    blurb: d.blurb,
    image: d.image,
    region: d.region,
  }));
}

export async function getDestination(slug: string): Promise<Destination | null> {
  const d = await prisma.destination.findUnique({ where: { slug } });
  if (!d || !d.published) return null;

  return {
    slug: d.slug,
    name: d.name,
    tagline: d.tagline,
    blurb: d.blurb,
    image: d.image,
    region: d.region,
  };
}