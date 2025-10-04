import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { NextAuthProvider } from "@/components/Providers";

export const metadata = {
  title: "Real Estate",
  description: "Property listings and management",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container py-6">{children}</main>
        <footer className="container py-8 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Real Estate</p>
        </footer>
        <NextAuthProvider />
      </body>
    </html>
  );
}