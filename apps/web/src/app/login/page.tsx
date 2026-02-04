import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { SignInButtons } from "./SignInButtons";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/market");

  const { next } = await searchParams;
  const nextUrl = next && next.startsWith("/") ? next : "/market";

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Back
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Logg inn</h1>
          <p className="mt-2 text-sm text-zinc-600">Logg inn for å få tilgang til Market dashboard.</p>

          <SignInButtons nextUrl={nextUrl} />
        </div>
      </div>
    </div>
  );
}
