export default function TermsPageEN() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <a href="/en" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Back
          </a>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Terms</h1>

          <p className="mt-3 text-zinc-700">
            BetalFlyt is provided “as is” without warranties. You are responsible for ensuring your invoices comply with
            local laws, tax rules, and business requirements.
          </p>

          <p className="mt-4 text-zinc-700">
            The MVP is a convenience tool for generating an invoice PDF. Do not use the service to store sensitive
            secrets you do not want saved on your device.
          </p>

          <p className="mt-6 text-sm text-zinc-500">
            Contact: <a className="underline" href="mailto:hello@betalflyt.no">hello@betalflyt.no</a>
          </p>
        </div>
      </div>
    </div>
  );
}
