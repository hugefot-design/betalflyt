export default function PrivacyPageEN() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <a href="/en" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            ← Back
          </a>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">Privacy</h1>

          <p className="mt-3 text-zinc-700">BetalFlyt (MVP) can be used without an account.</p>

          <ul className="mt-4 space-y-2 text-zinc-700">
            <li>• Your invoice draft is saved locally in your browser (localStorage).</li>
            <li>• In the current MVP, we do not upload invoice data to a server.</li>
            <li>• When we launch paid features (status/portal), we will update this page.</li>
          </ul>

          <p className="mt-6 text-sm text-zinc-500">
            Contact: <a className="underline" href="mailto:hello@betalflyt.no">hello@betalflyt.no</a>
          </p>
        </div>
      </div>
    </div>
  );
}
