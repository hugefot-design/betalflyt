export default function PricingPageEN() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <a href="/en" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Back
          </a>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Pricing</h1>
          <p className="mt-2 text-zinc-600">
            The invoice generator is free. We charge for Pro features that help you get paid faster (status tracking,
            reminders, and a customer portal).
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Plan
              title="Free"
              price="$0"
              bullets={["Generate invoice PDF", "Draft saved locally", "Works on mobile + desktop"]}
              ctaText="Open generator"
              ctaHref="/en/generator"
            />
            <Plan
              title="Pro (coming soon)"
              price="$9 / mo"
              bullets={["Share link with status (sent / seen / paid)", "Reminders", "Simple branded customer portal"]}
              ctaText="Get early access (30 days free)"
              ctaHref="mailto:hello@betalflyt.no?subject=BetalFlyt%20Pro%20%E2%80%93%20early%20access"
            />
          </div>

          <p className="mt-8 text-xs text-zinc-500">No spam. Only product updates.</p>
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
      <a
        href={ctaHref}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
      >
        {ctaText}
      </a>
    </div>
  );
}
