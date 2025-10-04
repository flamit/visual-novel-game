import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  listingId: z.string().cuid(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional()
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { listingId, name, email, phone, message } = parsed.data;

  const created = await prisma.lead.create({
    data: { listingId, name, email, phone, message }
  });

  // Placeholder: email notification could be added here
  return NextResponse.json({ ok: true, leadId: created.id }, { status: 201 });
}