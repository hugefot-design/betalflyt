import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Back
          </Link>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Pricing</h1>
          <p className="mt-2 text-zinc-600">Fakturageneratoren er gratis. Market dashboard er gratis (kun login).</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Plan
              title="Free"
              price="0 kr"
              bullets={["Generate invoice PDF", "English + Norwegian", "Draft saved locally"]}
              ctaText="Use the generator"
              ctaHref="/generator"
            />
            <Plan
              title="Market (login)"
              price="0 kr"
              bullets={["High-impact news feed", "CrackScore v3.2 + why", "NQ + MNQ panel"]}
              ctaText="Go to Market"
              ctaHref="/market"
            />
          </div>

          <p className="mt-8 text-xs text-zinc-500">No subscription required.</p>
        </div>
      </div>
    </div>
  );
}

function Plan({
  title,
  price,
  bullets,
  ctaText,
  ctaHref,
}: {
  title: string;
  price: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-6">
      <div className="text-sm font-semibold text-zinc-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold">{price}</div>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
      >
        {ctaText}
      </Link>
    </div>
  );
}
