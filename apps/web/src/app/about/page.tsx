import Link from "next/link";

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">About Betalflyt</h1>
          <nav className="text-sm text-zinc-600">
            <Link className="underline" href="/">
              Home
            </Link>
            <span className="mx-3">·</span>
            <Link className="underline" href="/market">
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-zinc-700">
            Betalflyt is a simple market-intel dashboard: we collect market-moving news, score it, and
            surface the highest-impact items alongside a lightweight futures overview.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-sm font-semibold">What you get</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                <li>Ranked alerts (critical/high/medium/low)</li>
                <li>Short “why it matters” factors</li>
                <li>Futures snapshot (latest ticks)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-sm font-semibold">What it’s not</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                <li>No financial advice</li>
                <li>No “magic predictions”</li>
                <li>Just signal + context, fast</li>
              </ul>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/market"
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Open dashboard
            </Link>
            <a
              href="mailto:hello@betalflyt.no?subject=Betalflyt%20feedback"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium hover:bg-zinc-50"
            >
              Send feedback
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-zinc-500">
          Tip: share any page link — we’re adding proper preview cards for nicer Telegram/Twitter
          shares.
        </p>
      </div>
    </div>
  );
}
