export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <a href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Back
          </a>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Terms</h1>
          <p className="mt-3 text-zinc-700">
            BetalFlyt leveres "som den er" uten garantier. You are responsible for checking
            that your invoices comply with local laws, tax rules, and business requirements.
          </p>
          <p className="mt-4 text-zinc-700">
            The MVP is a convenience tool for generating a PDF. Do not use it for sensitive secrets
            you do not want stored on your device.
          </p>
          <p className="mt-6 text-sm text-zinc-500">
            Contact: <a className="underline" href="mailto:hello@invoicespark.app">hello@invoicespark.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
