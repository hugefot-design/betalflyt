import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function bucketDot(bucket?: string | null) {
  if (bucket === "critical") return "🔴";
  if (bucket === "high") return "🟠";
  if (bucket === "medium") return "🟡";
  return "🟢";
}

export default async function MarketPage() {
  const [events, ticks] = await Promise.all([
    prisma.marketEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      select: {
        id: true,
        createdAt: true,
        source: true,
        title: true,
        url: true,
        crackScore: true,
        bucket: true,
        topFactors: true,
      },
    }),
    prisma.marketTick.findMany({
      orderBy: { createdAtUtc: "desc" },
      take: 20,
      select: {
        createdAtUtc: true,
        symbol: true,
        price: true,
        changePct: true,
        session: true,
      },
    }),
  ]);

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

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-500">Futures (latest)</div>
            <div className="mt-4 space-y-3">
              {ticks.length === 0 ? (
                <div className="text-sm text-zinc-600">No ticks yet. (Waiting for ingest)</div>
              ) : (
                ticks.map((t, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-4">
                    <div className="font-medium">{t.symbol}</div>
                    <div className="text-sm text-zinc-700">
                      price={t.price ?? "?"} ({t.changePct?.toFixed(2) ?? "?"}%)
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-500">How it works</div>
            <div className="mt-2 text-sm text-zinc-600">
              Fact-based alerts ranked with CrackScore v3.2. Not financial advice.
            </div>
            <div className="mt-4 text-sm text-zinc-600">
              Ingest endpoint: <code>/api/market/ingest</code>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-zinc-500">Latest scored news</div>
          <div className="mt-4 space-y-4">
            {events.length === 0 ? (
              <div className="text-sm text-zinc-600">No events yet. (Waiting for ingest)</div>
            ) : (
              events.map((e) => (
                <div key={e.id} className="border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-medium">
                      {bucketDot(e.bucket)} {e.bucket?.toUpperCase() ?? "LOW"} ({e.crackScore.toFixed(1)})
                    </div>
                    <div className="text-xs text-zinc-500">
                      {e.source ?? "Unknown"}
                    </div>
                  </div>
                  <div className="mt-1 text-zinc-800">
                    {e.url ? (
                      <a className="underline" href={e.url} target="_blank" rel="noreferrer">
                        {e.title}
                      </a>
                    ) : (
                      e.title
                    )}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">top: {e.topFactors || "-"}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
