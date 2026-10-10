import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });
async function main() {
  console.log("Seeding database...");

  // ─────────────────────────────────────────
  // Admin user
  // ─────────────────────────────────────────
  const passwordHash = await bcrypt.hash("frafri2026", 10);

  await prisma.adminUser.upsert({
    where: { email: "admin@frafriadventuresescapes.com" },
    update: {},
    create: {
      email: "admin@frafriadventuresescapes.com",
      passwordHash,
      name: "FraFri Admin",
      role: "admin",
    },
  });
  console.log("✓ Admin user created");

  // ─────────────────────────────────────────
  // Destinations
  // ─────────────────────────────────────────
  const destinationsData = [
    {
      slug: "serengeti-national-park",
      name: "Serengeti National Park",
      region: "Northern Tanzania",
      tagline: "Endless plains and unforgettable wildlife encounters",
      blurb:
        "Tanzania's most iconic park — home to the Great Migration, vast grasslands, and predator sightings that define the safari experience.",
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    },
    {
      slug: "ngorongoro-crater",
      name: "Ngorongoro Crater",
      region: "Northern Tanzania",
      tagline: "A natural wonder rich in wildlife and scenery",
      blurb:
        "A UNESCO World Heritage Site and the world's largest intact volcanic caldera — a self-contained Eden with dense wildlife year-round.",
      image:
        "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1600&q=80",
    },
    {
      slug: "tarangire-national-park",
      name: "Tarangire National Park",
      region: "Northern Tanzania",
      tagline: "Elephants, baobabs and classic safari landscapes",
      blurb:
        "Famous for its elephant herds and ancient baobab trees — a quieter, more intimate park that rewards those who linger.",
      image:
        "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1600&q=80",
    },
    {
      slug: "lake-manyara-national-park",
      name: "Lake Manyara National Park",
      region: "Northern Tanzania",
      tagline: "Birdlife, lake views and diverse wildlife",
      blurb:
        "A slender park along the Rift Valley escarpment — known for tree-climbing lions, flamingos, and dramatic scenery.",
      image:
        "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80",
    },
    {
      slug: "mount-kilimanjaro",
      name: "Mount Kilimanjaro",
      region: "Kilimanjaro Region",
      tagline: "Africa's highest peak — the roof of a continent",
      blurb:
        "The world's tallest free-standing mountain. Five climate zones, from rainforest to arctic summit, across a route for every ambition.",
      image:
        "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1600&q=80",
    },
    {
      slug: "zanzibar",
      name: "Zanzibar",
      region: "Zanzibar Archipelago",
      tagline: "Spice islands, turquoise water, and dhow sunsets",
      blurb:
        "The perfect safari finale — white-sand beaches, historic Stone Town, and the warm Indian Ocean on Tanzania's coast.",
      image:
        "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  for (const d of destinationsData) {
    await prisma.destination.upsert({
      where: { slug: d.slug },
      update: d,
      create: d,
    });
  }
  console.log(`✓ ${destinationsData.length} destinations seeded`);

  // ─────────────────────────────────────────
  // Packages
  // ─────────────────────────────────────────
  const packagesData = [
    {
      slug: "10-day-luxury-safari-and-zanzibar-beach-holiday",
      title: "10-Day Luxury Safari & Zanzibar Beach Holiday",
      duration: "10 Days",
      groupSize: "Private",
      location: "Tanzania",
      priceFrom: 4200,
      image:
        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=80",
      summary:
        "The definitive Tanzania journey — northern circuit parks, the Ngorongoro Crater, the Serengeti plains, and a final unwind on the beaches of Zanzibar.",
      highlights: [
        "Tarangire, Lake Manyara, Serengeti & Ngorongoro Crater",
        "Great Migration viewing (seasonal)",
        "Private 4x4 with professional guide",
        "Domestic flight to Zanzibar",
        "Beach resort stay in Zanzibar",
      ],
      featured: true,
      destinationSlugs: [
        "tarangire-national-park",
        "lake-manyara-national-park",
        "serengeti-national-park",
        "ngorongoro-crater",
        "zanzibar",
      ],
    },
    {
      slug: "6-day-tanzania-safari",
      title: "6-Day Tanzania Safari",
      duration: "6 Days",
      groupSize: "Private",
      location: "Tanzania",
      priceFrom: 2400,
      image:
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
      summary:
        "A focused northern-circuit safari through Tarangire, the Ngorongoro Crater and the Serengeti — ideal for travellers with a week to spare.",
      highlights: [
        "Tarangire National Park",
        "Ngorongoro Crater full-day game drive",
        "Serengeti National Park",
        "Private 4x4 with professional guide",
        "All park fees and full board",
      ],
      featured: true,
      destinationSlugs: [
        "tarangire-national-park",
        "ngorongoro-crater",
        "serengeti-national-park",
      ],
    },
  ];

  for (const p of packagesData) {
    const { destinationSlugs, ...packageFields } = p;
    await prisma.package.upsert({
      where: { slug: p.slug },
      update: {
        ...packageFields,
        destinations: {
          set: destinationSlugs.map((slug) => ({ slug })),
        },
      },
      create: {
        ...packageFields,
        destinations: {
          connect: destinationSlugs.map((slug) => ({ slug })),
        },
      },
    });
  }
  console.log(`✓ ${packagesData.length} packages seeded`);

  // ─────────────────────────────────────────
  // Guides
  // ─────────────────────────────────────────
  await prisma.guide.upsert({
    where: {
      slug: "serengeti-national-park-tanzanias-timeless-safari-destination",
    },
    update: {},
    create: {
      slug: "serengeti-national-park-tanzanias-timeless-safari-destination",
      title:
        "Serengeti National Park: Tanzania's Timeless Safari Destination",
      category: "Wildlife Diaries",
      readTime: "6 min read",
      excerpt:
        "Why the Serengeti remains the definitive safari experience — the migration, the predators, and the best months to visit.",
      content: "",
      image:
        "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1600&q=80",
      destination: { connect: { slug: "serengeti-national-park" } },
    },
  });
  console.log("✓ 1 guide seeded");

  console.log("\nDone.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });