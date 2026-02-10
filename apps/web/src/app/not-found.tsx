import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="mt-2 text-sm text-zinc-600">That page doesn’t exist.</p>
        <div className="mt-6">
          <Link className="underline" href="/">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
