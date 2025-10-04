"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const res = await signIn("credentials", { redirect: true, email, password, callbackUrl: "/admin" });
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input" name="email" type="email" placeholder="Email" defaultValue="admin@example.com" required />
        <input className="input" name="password" type="password" placeholder="Password" defaultValue="admin123" required />
        <button className="btn w-full" disabled={loading} type="submit">{loading ? "Signing in..." : "Sign in"}</button>
      </form>
      <p className="text-sm text-gray-600 mt-3">
        No account? <Link href="/auth/register" className="text-brand">Register</Link>
      </p>
    </div>
  );
}