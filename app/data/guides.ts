import { prisma } from "../../lib/prisma";

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  content: string;
};

export async function getGuides(): Promise<Guide[]> {
  const rows = await prisma.guide.findMany({
    where: { published: true },
    orderBy: { updatedAt: "desc" },
  });

  return rows.map((g) => ({
    slug: g.slug,
    title: g.title,
    excerpt: g.excerpt,
    image: g.image,
    category: g.category,
    readTime: g.readTime,
    content: g.content,
  }));
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const g = await prisma.guide.findUnique({ where: { slug } });
  if (!g || !g.published) return null;

  return {
    slug: g.slug,
    title: g.title,
    excerpt: g.excerpt,
    image: g.image,
    category: g.category,
    readTime: g.readTime,
    content: g.content,
  };
}