import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Market Dashboard</h1>
          <nav className="text-sm text-zinc-600">
            <Link className="underline" href="/market">
              Open dashboard
            </Link>
            <span className="mx-3">·</span>
            <Link className="underline" href="/login">
              Log in
            </Link>
          </nav>
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-zinc-700">
            This site is now focused on market intelligence: market-moving news scoring + futures overview.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/market"
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Go to Market
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium hover:bg-zinc-50"
            >
              Log in
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs text-zinc-500">
          Note: This is an open beta. Features will change.
        </p>
      </div>
    </div>
  );
}
