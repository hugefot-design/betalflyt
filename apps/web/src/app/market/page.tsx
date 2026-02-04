import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function MarketPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) redirect("/login?next=/market");

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Market Dashboard</h1>
          <div className="text-sm text-zinc-600">
            {session?.user?.email}
            <Link className="ml-4 underline" href="/account">
              Account
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold text-zinc-500">Status</div>
          <div className="mt-2 text-zinc-700">Login ✅ (no subscription)</div>
          <div className="mt-4 text-sm text-zinc-600">
            Next step: I’ll add the live feed: market-moving news + CrackScore v3.2 + NQ/MNQ panel.
          </div>
        </div>
      </div>
    </div>
  );
}
