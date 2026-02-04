import Link from "next/link";

import { auth } from "@/lib/auth";
import { SignOutButton } from "./sign-out";

export default async function AccountPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <Link href="/market" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Back
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Account</h1>
          <p className="mt-2 text-sm text-zinc-600">{session?.user?.email}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <SignOutButton />
          </div>

          <p className="mt-6 text-xs text-zinc-500">Login only (no subscription).</p>
        </div>
      </div>
    </div>
  );
}
