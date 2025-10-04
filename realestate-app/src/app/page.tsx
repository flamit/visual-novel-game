import { prisma } from "@/lib/prisma";
import { ListingCard } from "@/components/ListingCard";

async function getListings(searchParams: Record<string, string | string[] | undefined>) {
  const where: any = { status: "ACTIVE" };
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const type = typeof searchParams.type === "string" ? searchParams.type : undefined;
  const minPrice = typeof searchParams.minPrice === "string" ? Number(searchParams.minPrice) : undefined;
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number(searchParams.maxPrice) : undefined;
  const beds = typeof searchParams.beds === "string" ? Number(searchParams.beds) : undefined;
  const baths = typeof searchParams.baths === "string" ? Number(searchParams.baths) : undefined;

  if (type) where.type = type;
  if (minPrice) where.price = { ...(where.price || {}), gte: minPrice };
  if (maxPrice) where.price = { ...(where.price || {}), lte: maxPrice };
  if (beds) where.beds = { gte: beds };
  if (baths) where.baths = { gte: baths };
  if (q) where.OR = [
    { title: { contains: q, mode: "insensitive" } },
    { city: { contains: q, mode: "insensitive" } },
    { description: { contains: q, mode: "insensitive" } }
  ];

  return prisma.listing.findMany({
    where,
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
    take: 48
  });
}

export default async function Home({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const listings = await getListings(searchParams);
  return (
    <div className="space-y-6">
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map((l) => <ListingCard key={l.id} listing={l as any} />)}
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <form className="card p-4 grid gap-3 md:grid-cols-5" action="/" method="get">
      <input className="input md:col-span-2" name="q" placeholder="City, neighborhood, or title" />
      <select className="select" name="type" defaultValue="">
        <option value="">Any Type</option>
        <option value="HOUSE">House</option>
        <option value="CONDO">Condo</option>
        <option value="APARTMENT">Apartment</option>
        <option value="TOWNHOUSE">Townhouse</option>
        <option value="LAND">Land</option>
      </select>
      <select className="select" name="beds" defaultValue="">
        <option value="">Beds</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
      </select>
      <select className="select" name="baths" defaultValue="">
        <option value="">Baths</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
      </select>
      <div className="md:col-span-5 flex gap-3">
        <select className="select" name="minPrice" defaultValue="">
          <option value="">Min Price</option>
          <option value="250000">$250k</option>
          <option value="500000">$500k</option>
          <option value="750000">$750k</option>
        </select>
        <select className="select" name="maxPrice" defaultValue="">
          <option value="">Max Price</option>
          <option value="500000">$500k</option>
          <option value="750000">$750k</option>
          <option value="1000000">$1M</option>
        </select>
        <button className="btn ml-auto" type="submit">Search</button>
      </div>
    </form>
  );
}