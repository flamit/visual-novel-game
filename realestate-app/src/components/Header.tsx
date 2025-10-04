"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-brand">RealEstate</Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className={navClass(pathname === "/")}>Listings</Link>
          <Link href="/admin" className={navClass(pathname?.startsWith("/admin"))}>Admin</Link>
          {session?.user ? (
            <button onClick={() => signOut()} className="text-sm text-gray-600 hover:text-gray-900">Sign out</button>
          ) : (
            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function navClass(active?: boolean) {
  return [
    "text-sm",
    active ? "text-brand font-medium" : "text-gray-600 hover:text-gray-900"
  ].join(" ");
}