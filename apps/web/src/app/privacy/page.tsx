export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <a href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Tilbake
          </a>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Personvern</h1>

          <p className="mt-3 text-zinc-700">
            BetalFlyt (MVP) kan brukes uten konto.
          </p>

          <ul className="mt-4 space-y-2 text-zinc-700">
            <li>• Fakturautkastet ditt lagres lokalt i nettleseren din (localStorage).</li>
            <li>• I nåværende MVP laster vi ikke opp fakturadata til en server.</li>
            <li>• Når vi lanserer betalte funksjoner (status/kundeportal), oppdaterer vi denne siden.</li>
          </ul>

          <p className="mt-6 text-sm text-zinc-500">
            Kontakt: <a className="underline" href="mailto:hello@betalflyt.no">hello@betalflyt.no</a>
          </p>
        </div>
      </div>
    </div>
  );
}
