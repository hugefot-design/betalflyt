import { ReactNode } from "react";
import Nav from "@/components/Nav";

export default function SeoPage({
  title,
  lead,
  children,
  ctaLabel = "Lag faktura nå",
  ctaHref = "/generator",
  jsonLd,
}: {
  title: string;
  lead: string;
  children: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  jsonLd?: any;
}) {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto container px-4 py-16">
        <header className="card p-10">
          <div className="kicker">BetalFlyt – gratis fakturagenerator</div>
          <h1 className="h1 mt-4">{title}</h1>
          <p className="lead mt-4 max-w-2xl">{lead}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a className="btn btn-primary" href={ctaHref}>
              {ctaLabel}
            </a>
            <a className="btn" href="/">
              Til forsiden
            </a>
          </div>
        </header>

        <main className="mt-10 space-y-10">
          <div className="card p-10">
            <div className="prose prose-zinc max-w-none">{children}</div>
          </div>

          <footer className="text-center text-xs text-black/55">
            <a className="link" href="/privacy">
              Privacy
            </a>
            <span className="mx-2">·</span>
            <a className="link" href="/terms">
              Terms
            </a>
          </footer>
        </main>

        {jsonLd ? (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ) : null}
      </div>
    </div>
  );
}
