import type { Metadata } from "next";
import SeoPage from "@/lib/seo/SeoPage";
import { faqJsonLd } from "@/lib/seo/faqJsonLd";

export const metadata: Metadata = {
  title: "Lage faktura – slik gjør du det (gratis) – BetalFlyt",
  description:
    "Slik kan du lage faktura enkelt: fra/til, linjer, forfallsdato, MVA og PDF. Bruk BetalFlyt gratis.",
};

export default function Page() {
  const faq = [
    {
      question: "Hvordan lager jeg faktura fort?",
      answer:
        "Fyll inn hvem det er fra/til, legg til linjer med pris og antall, sett forfallsdato, og last ned PDF. Det er akkurat det BetalFlyt er laget for.",
    },
    {
      question: "Hva er vanlig forfallsdato?",
      answer:
        "Mange bruker 14 dager, men det varierer. Velg noe som passer kundene dine og bransjen.",
    },
  ];

  return (
    <SeoPage
      title="Lage faktura"
      lead="Her er en enkel oppskrift på hvordan du lager faktura. Bruk BetalFlyt til å lage en ryddig PDF på sekunder."
      jsonLd={faqJsonLd(faq)}
    >
      <h2>Steg-for-steg</h2>
      <ol>
        <li>Velg fakturanummer (f.eks. 1001, 1002, ...)</li>
        <li>Sett fakturadato og forfallsdato</li>
        <li>Fyll inn «Fra» (deg/bedriften) og «Til» (kunden)</li>
        <li>Legg til linjer med beskrivelse, antall og pris</li>
        <li>Legg inn MVA% hvis relevant</li>
        <li>Last ned PDF og send til kunde</li>
      </ol>

      <h2>Vanlige feil</h2>
      <ul>
        <li>Utydelig beskrivelse av hva kunden betaler for</li>
        <li>Mangler forfallsdato</li>
        <li>Feil MVA-sats</li>
      </ul>

      <h2>FAQ</h2>
      <ul>
        {faq.map((f) => (
          <li key={f.question}>
            <strong>{f.question}</strong>
            <div>{f.answer}</div>
          </li>
        ))}
      </ul>
    </SeoPage>
  );
}
