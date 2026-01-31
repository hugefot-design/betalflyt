import Nav from "@/components/Nav";

export default function HomeEN() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto container px-4 py-16">
        <div className="card p-10">
          <div className="flex flex-col gap-10">
            {/* HERO */}
            <div>
              <div className="badge w-fit">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                <span>BetalFlyt</span>
              </div>

              <h1 className="h1 mt-5 max-w-3xl">
                Invoicing with full control:
                <br />
                Send → Seen → Paid
              </h1>

              <p className="lead mt-4 max-w-2xl">
                BetalFlyt helps you create a professional invoice, track status, and follow up with structure.
                Start free with the generator — and get Pro features free for 30 days when they launch.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a className="btn btn-primary" href="/en/pricing">
                  Try Pro free for 30 days
                </a>
                <a className="btn" href="/en/generator">
                  Open generator
                </a>
                <a className="btn" href="/en/free-invoice-generator">
                  Learn more
                </a>
              </div>

              <div className="mt-3 text-xs text-black/55">No card. No commitment. Stay on the free plan after.</div>
            </div>

            <section>
              <h2 className="h2">How it works</h2>
              <p className="mt-2 max-w-2xl text-sm text-black/60">
                From sending an invoice to getting paid: status, history, and follow-ups in one place.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <Feature title="1) Send" desc="Create an invoice and send it as PDF or a share link." />
                <Feature title="2) Seen" desc="Track status and history per invoice (sent/seen/paid)." />
                <Feature title="3) Paid" desc="Send reminders and keep a clear follow-up log." />
              </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-3">
              <ValueCard
                title="Status & history"
                bullets={[
                  "Clear overview: draft, sent, overdue, paid",
                  "Per-invoice timeline (messages, follow-ups)",
                  "Less guessing — more control",
                ]}
              />
              <ValueCard
                title="Reminders"
                bullets={["Structured follow-up when invoices are overdue", "Templates + per-invoice log", "Automation when you’re ready"]}
              />
              <ValueCard
                title="Customer portal"
                bullets={["Shareable link with payment info", "Less friction for the customer", "Fewer questions — faster payment"]}
              />
            </section>

            <section>
              <h2 className="h2">Security & privacy</h2>
              <p className="mt-2 max-w-3xl text-sm text-black/60">
                We build BetalFlyt with data minimization and clear control over sharing. In the MVP, your draft is saved
                locally in your browser (no account required).
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-black/55">
                <a className="link" href="/en/privacy">
                  Privacy
                </a>
                <a className="link" href="/en/terms">
                  Terms
                </a>
                <span>Contact: hello@betalflyt.no</span>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-xs text-black/55">
              <span>© {new Date().getFullYear()} BetalFlyt</span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <a className="link" href="/en/pricing">
                  Pricing
                </a>
                <a className="link" href="/en/generator">
                  Generator
                </a>
                <a className="link" href="/en/privacy">
                  Privacy
                </a>
                <a className="link" href="/en/terms">
                  Terms
                </a>
              </div>
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

function ValueCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-black/[0.02] p-6">
      <div className="text-sm font-semibold tracking-tight">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-black/60">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
    </div>
  );
}
