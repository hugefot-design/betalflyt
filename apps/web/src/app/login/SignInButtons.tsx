"use client";

import { signIn } from "next-auth/react";

export function SignInButtons({ nextUrl }: { nextUrl: string }) {
  return (
    <div className="mt-6 grid gap-3">
      <button
        onClick={() => signIn("google", { callbackUrl: nextUrl })}
        className="w-full rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Continue with Google
      </button>
      <button
        onClick={() => signIn("github", { callbackUrl: nextUrl })}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium hover:bg-zinc-50"
      >
        Continue with GitHub
      </button>
      <div className="mt-2 text-xs text-zinc-500">
        Email magic link is available on <code>/api/auth/signin</code> when EMAIL_SERVER + EMAIL_FROM are set.
      </div>
    </div>
  );
}
