import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ListingDetail({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: { order: "asc" } } }
  });
  if (!listing) return notFound();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 card overflow-hidden">
          <div className="relative h-80 w-full">
            <Image src={listing.images[0]?.url || "/placeholder.jpg"} alt={listing.title} fill className="object-cover" />
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-semibold">{listing.title}</h1>
            <p className="text-gray-600">{listing.city} · {prettyType(listing.type)} · {listing.beds} bd · {listing.baths} ba</p>
            <p className="mt-2 text-xl font-semibold">{formatPrice(listing.price)}</p>
            <p className="mt-4 text-gray-800 whitespace-pre-wrap">{listing.description}</p>
          </div>
        </div>
        <div className="space-y-4">
          <LeadForm listingId={listing.id} />
          <div className="card p-4">
            <h3 className="font-medium mb-2">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {listing.images.map((img) => (
                <div key={img.id} className="relative aspect-video">
                  <Image src={img.url} alt="" fill className="object-cover rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatPrice(n: number) { return `$${n.toLocaleString()}`; }
function prettyType(t: string) { return t[0] + t.slice(1).toLowerCase(); }

async function createLead(data: FormData) {
  "use server";
  const payload = {
    listingId: String(data.get("listingId")),
    name: String(data.get("name") || ""),
    email: String(data.get("email") || ""),
    phone: String(data.get("phone") || ""),
    message: String(data.get("message") || "")
  };
  await fetch(`${process.env.NEXTAUTH_URL || ""}/api/leads`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

function LeadForm({ listingId }: { listingId: string }) {
  return (
    <form action={createLead} className="card p-4 space-y-3">
      <h3 className="font-medium">Contact</h3>
      <input type="hidden" name="listingId" value={listingId} />
      <input className="input" name="name" placeholder="Your name" required />
      <input className="input" name="email" type="email" placeholder="Your email" required />
      <input className="input" name="phone" placeholder="Phone (optional)" />
      <textarea className="textarea" name="message" placeholder="Message" rows={4} />
      <button className="btn w-full" type="submit">Send inquiry</button>
    </form>
  );
}