import Link from "next/link";

export default async function MarketPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Market Dashboard</h1>
          <div className="text-sm text-zinc-600">
            <Link className="underline" href="/login">
              Logg inn
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold text-zinc-500">Status</div>
          <div className="mt-2 text-zinc-700">Open beta ✅ (login kommer senere)</div>
          <div className="mt-4 text-sm text-zinc-600">
            Next step: live feed: market-moving news + CrackScore v3.2 + NQ/MNQ panel.
          </div>
        </div>
      </div>
    </div>
  );
}
