import Link from "next/link";
import Image from "next/image";
import { Listing } from "@prisma/client";

type ListingWithImages = Listing & { images: { url: string }[] };

export function ListingCard({ listing }: { listing: ListingWithImages }) {
  const img = listing.images?.[0]?.url || "/placeholder.jpg";
  return (
    <article className="card overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={img} alt={listing.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-sm text-gray-600">{listing.city} · {prettyType(listing.type)}</p>
        <p className="mt-1 text-sm">{listing.beds} bd · {listing.baths} ba · {formatPrice(listing.price)}</p>
        <Link className="btn mt-3" href={`/listings/${listing.id}`}>View</Link>
      </div>
    </article>
  );
}

function formatPrice(n: number) {
  return `$${n.toLocaleString()}`;
}
function prettyType(t: string) {
  return t[0] + t.slice(1).toLowerCase();
}