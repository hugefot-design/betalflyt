import type { Metadata } from "next";
import SeoPage from "@/lib/seo/SeoPage";
import { faqJsonLd } from "@/lib/seo/faqJsonLd";

export const metadata: Metadata = {
  title: "Gratis fakturagenerator (PDF) – BetalFlyt",
  description:
    "Lag faktura på sekunder og last ned som PDF. Gratis fakturagenerator på bokmål. Ingen konto i MVP.",
};

export default function Page() {
  const faq = [
    {
      question: "Er BetalFlyt gratis?",
      answer:
        "Ja, fakturageneratoren er gratis i MVP. Vi kommer senere med Pro-funksjoner som purring, status og kundeportal.",
    },
    {
      question: "Må jeg lage konto?",
      answer:
        "Nei. I MVP kan du lage faktura uten konto. Utkastet lagres lokalt i nettleseren din.",
    },
    {
      question: "Får jeg PDF?",
      answer: "Ja, du kan laste ned fakturaen som PDF med ett klikk.",
    },
  ];

  return (
    <SeoPage
      title="Gratis fakturagenerator"
      lead="Lag en profesjonell faktura på sekunder og last ned som PDF. BetalFlyt er laget for enkelhet: ingen konto i MVP, og du kommer i gang med en gang."
      jsonLd={faqJsonLd(faq)}
    >
      <p>
        Trenger du en enkel <strong>gratis fakturagenerator</strong>? Med BetalFlyt kan du fylle inn
        fra/til, linjer, forfallsdato og valuta – og så laste ned fakturaen som PDF.
      </p>
      <h2>Hva du kan gjøre</h2>
      <ul>
        <li>Lage faktura på bokmål (nå)</li>
        <li>Last ned som PDF</li>
        <li>Lagre utkast lokalt i nettleseren (praktisk hvis du blir avbrutt)</li>
        <li>Dele faktura via lenke (beta)</li>
      </ul>
      <h2>Tips</h2>
      <p>
        Legg inn tydelig beskrivelse av tjenesten/produktet, og sett realistisk forfallsdato (f.eks.
        14 dager). Dette gjør det enklere for kunden å betale raskt.
      </p>
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
