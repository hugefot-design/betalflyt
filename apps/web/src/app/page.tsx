import Nav from "@/components/Nav";
import type { ReactNode } from "react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto container px-4 py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="badge w-fit">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            <span>Gratis fakturagenerator (beta)</span>
          </div>

          <h1 className="h1 mt-5">
            Send faktura på 1–2–3.
            <br />
            Det skal være enkelt å få betalt.
          </h1>

          <p className="lead mt-4 max-w-2xl">
            BetalFlyt lar deg lage en pen PDF-faktura på sekunder — uten konto. Del som vedlegg på e-post eller
            Vipps. (Delelenke er valgfritt og er i beta.)
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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

          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs" style={{ color: "var(--muted)" }}>
            <span>Ingen innlogging</span>
            <span>•</span>
            <span>Lagrer utkast lokalt</span>
            <span>•</span>
            <span>PDF på norsk (bokmål)</span>
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <div className="kicker">Forhåndsvisning</div>
          <div className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            Et rent oppsett, tydelige summer og betalingsinfo.
          </div>

          <div className="mt-6 space-y-4">
            <PreviewRow label="Kunde" value="Ola Nordmann" />
            <PreviewRow label="Tjeneste" value="Designarbeid (10t)" />
            <PreviewRow label="Totalt" value="12 500 kr" strong />

            <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <div className="text-xs font-semibold tracking-tight">Betalingsinfo</div>
              <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                KID / kontonummer / Vipps — valgfritt.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border px-4 py-3" style={{ borderColor: "var(--border)" }}>
      <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
        {label}
      </div>
      <div className={strong ? "text-sm font-semibold" : "text-sm"}>{value}</div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="mx-auto container px-4 pb-10 sm:pb-14">
      <div className="grid gap-6 sm:grid-cols-3">
        <Step n="1" title="Fyll inn" desc="Kunde, varelinjer og (valgfritt) MVA." />
        <Step n="2" title="Sjekk" desc="Se totalsum med/uten MVA før du eksporterer." />
        <Step n="3" title="Send" desc="Last ned PDF og send på e-post eller Vipps." />
      </div>
    </section>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: "color-mix(in srgb, var(--accent) 14%, transparent)", color: "var(--foreground)" }}
        >
          {n}
        </div>
        <div className="text-sm font-semibold tracking-tight">{title}</div>
      </div>
      <div className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
        {desc}
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="mx-auto container px-4 py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="kicker">Hvorfor BetalFlyt</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Alt du trenger for å fakturere enkelt</h2>
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            Vi fokuserer på én ting: en faktura som er lett å lese og ser proff ut.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FeatureCard title="Rask" desc="Fyll ut og last ned PDF på sekunder." />
          <FeatureCard title="Enkel" desc="Ingen konto i MVP — kom i gang med én gang." />
          <FeatureCard title="Delbar" desc="Delelenke er valgfritt og kan skrus av." />
          <FeatureCard title="Klar for Pro" desc="Snart: status, purring og enkel kundeportal." />
        </div>
      </div>

      <div className="mt-10 card p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="kicker">Neste steg</div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">Vil du ha mer enn en PDF?</h3>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Når generatoren er stabil, bygger vi Pro-funksjoner: oversikt, påminnelser og betaling.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm" style={{ color: "var(--muted)" }}>
              <Bullet>Status: sendt / sett / betalt</Bullet>
              <Bullet>Påminnelser/purring</Bullet>
              <Bullet>Enkel kundeportal</Bullet>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-3xl border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <div className="text-sm font-semibold tracking-tight">Start med generatoren</div>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Lag første faktura nå. Du kan justere design og tekst senere.
              </p>
              <a className="btn btn-primary mt-5 w-full" href="/generator">
                Åpne generator
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
      <span>{children}</span>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="text-sm font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        {desc}
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <section className="mx-auto container px-4 pb-16 sm:pb-20">
      <div className="card p-8 sm:p-10">
        <div className="kicker">FAQ</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Ofte stilte spørsmål</h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <QA q="Er dette gratis?" a="Ja. Generatoren er gratis i beta. Planen er å tilby Pro-funksjoner senere." />
          <QA q="Må jeg lage konto?" a="Nei, ikke i MVP. Utkast lagres lokalt i nettleseren din." />
          <QA q="Kan jeg legge til MVA?" a="Ja, du kan fakturere med/uten MVA. Vi jobber med flere valg og satser." />
          <QA q="Er delelenke nødvendig?" a="Nei. Delelenke er valgfritt og kan skrus av." />
        </div>
      </div>
    </section>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-3xl border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="text-sm font-semibold tracking-tight">{q}</div>
      <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        {a}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mx-auto container px-4 pb-10">
      <div className="flex flex-col items-start justify-between gap-4 border-t pt-8 text-sm sm:flex-row" style={{ borderColor: "var(--border)" }}>
        <div>
          <div className="font-semibold tracking-tight">BetalFlyt</div>
          <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} BetalFlyt
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm" style={{ color: "var(--muted)" }}>
          <a className="link" href="/generator">
            Generator
          </a>
          <a className="link" href="/pricing">
            Pris
          </a>
          <a className="link" href="/privacy">
            Personvern
          </a>
          <a className="link" href="/terms">
            Vilkår
          </a>
        </div>
      </div>
    </footer>
  );
}
