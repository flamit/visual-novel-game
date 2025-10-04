import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

async function register(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  const name = String(formData.get("name") || "");
  const password = String(formData.get("password") || "");
  if (!email || !password) return;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return;
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, name, password: hash } });
  redirect("/auth/login");
}

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-xl font-semibold mb-4">Create account</h1>
      <form action={register} className="space-y-3">
        <input className="input" name="name" placeholder="Name" />
        <input className="input" name="email" type="email" placeholder="Email" required />
        <input className="input" name="password" type="password" placeholder="Password" required />
        <button className="btn w-full" type="submit">Register</button>
      </form>
    </div>
  );
}