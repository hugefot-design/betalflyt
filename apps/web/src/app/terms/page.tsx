export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <a href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Tilbake
          </a>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Vilkår</h1>

          <p className="mt-3 text-zinc-700">
            BetalFlyt leveres «som den er» uten garantier. Du er selv ansvarlig for å kontrollere at
            fakturaene dine oppfyller gjeldende lover, MVA-regler og krav i din virksomhet.
          </p>

          <p className="mt-4 text-zinc-700">
            MVP-en er et hjelpeverktøy for å generere en faktura-PDF. Ikke bruk tjenesten til å lagre
            sensitive hemmeligheter du ikke ønsker lagret på din enhet.
          </p>

          <p className="mt-6 text-sm text-zinc-500">
            Kontakt: <a className="underline" href="mailto:hello@betalflyt.no">hello@betalflyt.no</a>
          </p>
        </div>
      </div>
    </div>
  );
}
