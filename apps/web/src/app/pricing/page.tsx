export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <a href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Tilbake
          </a>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Pris</h1>
          <p className="mt-2 text-zinc-600">
            Generatoren er gratis. Vi tjener penger på Pro-funksjoner som gjør det enklere å få betalt (status, påminnelser/purring og kundeportal).
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Plan
              title="Gratis"
              price="0 kr"
              bullets={["Lag faktura-PDF", "Utkast lagres lokalt", "Funker på mobil + desktop"]}
              ctaText="Start generator"
              ctaHref="/generator"
            />
            <Plan
              title="Pro (kommer)"
              price="99 kr / mnd"
              bullets={["Delelenke med status (sendt / sett / betalt)", "Påminnelser / purring", "Enkel kundeportal + branding"]}
              ctaText="Få tidlig tilgang (30 dager gratis)"
              ctaHref="mailto:hello@betalflyt.no?subject=BetalFlyt%20Pro%20%E2%80%93%20tidlig%20tilgang"
            />
          </div>

          <p className="mt-8 text-xs text-zinc-500">
            Ingen spam. Kun oppdateringer om nye funksjoner.
          </p>
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
