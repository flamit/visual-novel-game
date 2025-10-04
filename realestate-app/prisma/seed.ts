import { PrismaClient, ListingType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: { email: "admin@example.com", name: "Admin", password: passwordHash }
  });

  const listings = [
    {
      title: "Modern 3BR Home",
      description: "Bright, modern home with open floor plan, updated kitchen, and spacious backyard.",
      type: ListingType.HOUSE,
      price: 560000,
      beds: 3,
      baths: 2,
      sqft: 1900,
      city: "Austin",
      address: "123 Oak St",
      images: {
        create: [
          { url: "/uploads/demo1.jpg", order: 0 }
        ]
      }
    },
    {
      title: "Downtown 1BR Condo",
      description: "Walk to cafes and transit. Corner unit with city views and gym access.",
      type: ListingType.CONDO,
      price: 325000,
      beds: 1,
      baths: 1,
      sqft: 780,
      city: "Seattle",
      address: "456 Pine Ave",
      images: {
        create: [
          { url: "/uploads/demo2.jpg", order: 0 }
        ]
      }
    }
  ];

  for (const l of listings) {
    await prisma.listing.create({ data: l });
  }

  console.log("Seeded:", { admin: admin.email, listings: listings.length });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});