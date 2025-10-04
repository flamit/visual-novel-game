import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const filterSchema = z.object({
  q: z.string().optional(),
  type: z.enum(["", "HOUSE", "CONDO", "APARTMENT", "TOWNHOUSE", "LAND"]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  beds: z.coerce.number().optional(),
  baths: z.coerce.number().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = filterSchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid filters" }, { status: 400 });
  }
  const { q, type, minPrice, maxPrice, beds, baths } = parsed.data;

  const where: any = { status: "ACTIVE" };
  if (type) where.type = type || undefined;
  if (minPrice) where.price = { ...(where.price || {}), gte: minPrice };
  if (maxPrice) where.price = { ...(where.price || {}), lte: maxPrice };
  if (beds) where.beds = { gte: beds };
  if (baths) where.baths = { gte: baths };
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } }
    ];
  }

  const items = await prisma.listing.findMany({
    where,
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
    take: 48,
  });
  return NextResponse.json(items);
}

const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  type: z.enum(["HOUSE", "CONDO", "APARTMENT", "TOWNHOUSE", "LAND"]),
  price: z.number().int().nonnegative(),
  beds: z.number().int().nonnegative(),
  baths: z.number().int().nonnegative(),
  sqft: z.number().int().optional(),
  city: z.string().min(2),
  address: z.string().optional(),
  images: z.array(z.string().url()).default([]),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const created = await prisma.listing.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      price: data.price,
      beds: data.beds,
      baths: data.baths,
      sqft: data.sqft,
      city: data.city,
      address: data.address,
      images: { create: data.images.map((url, i) => ({ url, order: i })) }
    },
    include: { images: true }
  });

  return NextResponse.json(created, { status: 201 });
}