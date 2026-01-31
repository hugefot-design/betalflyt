import Nav from "@/components/Nav";

export default function Home() {
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
                Fakturering med full kontroll:
                <br />
                Send → Sett → Betalt
              </h1>

              <p className="lead mt-4 max-w-2xl">
                BetalFlyt gjør det enkelt å lage en profesjonell faktura, følge status og ta strukturert oppfølging.
                Start gratis med generatoren – og få Pro-funksjoner gratis i 30 dager når de lanseres.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a className="btn btn-primary" href="/pricing">
                  Prøv Pro gratis i 30 dager
                </a>
                <a className="btn" href="/generator">
                  Start generator
                </a>
                <a className="btn" href="/no/gratis-fakturagenerator">
                  Les mer
                </a>
              </div>

              <div className="mt-3 text-xs text-black/55">
                Uten kort. Ingen binding. Fortsett gratis etterpå.
              </div>
            </div>

            {/* HOW IT WORKS */}
            <section>
              <h2 className="h2">Slik fungerer det</h2>
              <p className="mt-2 max-w-2xl text-sm text-black/60">
                Fra du sender faktura til den er betalt: status, historikk og oppfølging på ett sted.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <Feature title="1) Send" desc="Lag faktura og send som PDF eller delelenke." />
                <Feature title="2) Sett" desc="Følg status og historikk per faktura (sendt/sett/betalt)." />
                <Feature title="3) Betalt" desc="Send påminnelser/purring og loggfør alt per faktura." />
              </div>
            </section>

            {/* VALUE */}
            <section className="grid gap-8 lg:grid-cols-3">
              <ValueCard
                title="Status og historikk"
                bullets={[
                  "Tydelig oversikt: utkast, sendt, forfalt, betalt",
                  "Historikk per faktura (utsendelser, oppfølging)",
                  "Mindre gjetting – mer kontroll",
                ]}
              />
              <ValueCard
                title="Påminnelser og purring"
                bullets={[
                  "Strukturert oppfølging når faktura blir forfalt",
                  "Maler og logg per faktura",
                  "Automatisering kan aktiveres når dere er klare",
                ]}
              />
              <ValueCard
                title="Kundeportal"
                bullets={[
                  "Delbar lenke med betalingsinfo",
                  "Mindre friksjon for kunden",
                  "Færre spørsmål – raskere betaling",
                ]}
              />
            </section>

            {/* TRUST */}
            <section>
              <h2 className="h2">Sikkerhet og personvern</h2>
              <p className="mt-2 max-w-3xl text-sm text-black/60">
                Vi bygger BetalFlyt med dataminimering og tydelig kontroll på deling. I MVP lagres utkast lokalt i
                nettleseren (uten konto).
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-black/55">
                <a className="link" href="/privacy">
                  Personvern
                </a>
                <a className="link" href="/terms">
                  Vilkår
                </a>
                <span>Kontakt: hello@betalflyt.no</span>
              </div>
            </section>

            {/* FOOTER */}
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-xs text-black/55">
              <span>© {new Date().getFullYear()} BetalFlyt</span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <a className="link" href="/pricing">
                  Pris
                </a>
                <a className="link" href="/generator">
                  Generator
                </a>
                <a className="link" href="/privacy">
                  Personvern
                </a>
                <a className="link" href="/terms">
                  Vilkår
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

function ValueCard({
  title,
  bullets,
}: {
  title: string;
  bullets: string[];
}) {
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
