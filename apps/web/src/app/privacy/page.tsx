export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <a href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Back
          </a>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Privacy</h1>
          <p className="mt-3 text-zinc-700">
            BetalFlyt (MVP) krever ikke konto.
          </p>
          <ul className="mt-4 space-y-2 text-zinc-700">
            <li>• Your invoice draft is saved locally in your browser (localStorage).</li>
            <li>• We do not upload your invoice data to a server in the current MVP.</li>
            <li>• If we add paid features (tracking/portal), this policy will be updated.</li>
          </ul>
          <p className="mt-6 text-sm text-zinc-500">
            Contact: <a className="underline" href="mailto:hello@invoicespark.app">hello@invoicespark.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
