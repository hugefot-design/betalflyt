import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto container px-4 py-16">
        <div className="card p-10">
          <div className="flex flex-col gap-8">
            <div>
              <div className="badge w-fit">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                <span>BetalFlyt – gratis fakturagenerator</span>
              </div>
              <h1 className="h1 mt-5">
                Lag faktura.
                <br />
                Send den.
                <br />
                Få betalt.
              </h1>
              <p className="lead mt-4 max-w-2xl">
                BetalFlyt er en gratis fakturagenerator på bokmål. Lag PDF på sekunder. Del via lenke.
                Snart: status, purring og kundeportal.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a className="btn btn-primary" href="/generator">
                Start generator
              </a>
              <a className="btn" href="/no/gratis-fakturagenerator">
                Les mer
              </a>
              <a className="btn" href="/pricing">
                Pris
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <Feature title="Rask" desc="Fyll ut og last ned PDF." />
              <Feature title="Enkel" desc="Ingen konto i MVP." />
              <Feature title="Delbar" desc="Lag share-link (beta)." />
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-black/55">
              <a className="link" href="/privacy">Privacy</a>
              <a className="link" href="/terms">Terms</a>
              <span>© {new Date().getFullYear()} BetalFlyt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-black/[0.02] p-6">
      <div className="text-sm font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm text-black/60">{desc}</div>
    </div>
  );
}
