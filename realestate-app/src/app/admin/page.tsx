import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function createListing(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }
  const payload = {
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    type: String(formData.get("type") || "HOUSE"),
    price: Number(formData.get("price") || 0),
    beds: Number(formData.get("beds") || 0),
    baths: Number(formData.get("baths") || 0),
    sqft: Number(formData.get("sqft") || 0) || null,
    city: String(formData.get("city") || ""),
    address: String(formData.get("address") || ""),
    images: String(formData.get("images") || ""),
  };
  const imageUrls = payload.images
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 10);

  await prisma.listing.create({
    data: {
      title: payload.title,
      description: payload.description,
      type: payload.type as any,
      price: payload.price,
      beds: payload.beds,
      baths: payload.baths,
      sqft: payload.sqft ?? undefined,
      city: payload.city,
      address: payload.address || undefined,
      images: { create: imageUrls.map((url, i) => ({ url, order: i })) }
    }
  });

  redirect("/admin");
}

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  const listings = await prisma.listing.findMany({
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card p-4">
        <h2 className="text-lg font-semibold mb-2">Create listing</h2>
        <form action={createListing} className="space-y-3">
          <input className="input" name="title" placeholder="Title" required />
          <textarea className="textarea" name="description" placeholder="Description" rows={5} required />
          <div className="grid grid-cols-2 gap-3">
            <select className="select" name="type" defaultValue="HOUSE">
              <option value="HOUSE">House</option>
              <option value="CONDO">Condo</option>
              <option value="APARTMENT">Apartment</option>
              <option value="TOWNHOUSE">Townhouse</option>
              <option value="LAND">Land</option>
            </select>
            <input className="input" name="city" placeholder="City" required />
            <input className="input" name="price" type="number" placeholder="Price" required />
            <input className="input" name="sqft" type="number" placeholder="Sq Ft" />
            <input className="input" name="beds" type="number" placeholder="Beds" required />
            <input className="input" name="baths" type="number" placeholder="Baths" required />
            <input className="input col-span-2" name="address" placeholder="Address (optional)" />
          </div>
          <textarea className="textarea" name="images" placeholder="Image URLs, comma separated" rows={3} />
          <button className="btn w-full" type="submit">Create</button>
        </form>
      </div>
      <div className="card p-4">
        <h2 className="text-lg font-semibold mb-2">Listings</h2>
        <ul className="space-y-3">
          {listings.map((l) => (
            <li key={l.id} className="flex items-center gap-3">
              <img src={l.images[0]?.url || "/placeholder.jpg"} alt="" className="h-12 w-16 object-cover rounded border" />
              <div className="flex-1">
                <p className="font-medium">{l.title}</p>
                <p className="text-sm text-gray-600">{l.city} · ${l.price.toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}