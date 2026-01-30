import type { Metadata } from "next";
import SeoPage from "@/lib/seo/SeoPage";
import { faqJsonLd } from "@/lib/seo/faqJsonLd";

export const metadata: Metadata = {
  title: "Faktura eksempel – BetalFlyt",
  description:
    "Se et enkelt fakturaeksempel og lag din egen faktura med PDF på sekunder. Gratis på bokmål.",
};

export default function Page() {
  const faq = [
    {
      question: "Kan jeg bruke et faktura eksempel som mal?",
      answer:
        "Ja. Bruk eksempelet som inspirasjon, men fyll inn dine egne detaljer. BetalFlyt fungerer som en mal du kan justere.",
    },
    {
      question: "Hva bør stå i linjeteksten?",
      answer:
        "Skriv konkret hva du leverer, f.eks. 'Konsulenttjenester – 5 timer' eller 'Rengjøring – uke 5'.",
    },
  ];

  return (
    <SeoPage
      title="Faktura eksempel"
      lead="Her er et enkelt eksempel på hvordan en faktura kan se ut. Lag din egen faktura og last ned PDF med BetalFlyt."
      jsonLd={faqJsonLd(faq)}
    >
      <p>
        Et <strong>faktura eksempel</strong> er nyttig hvis du er usikker på oppsett. En god faktura
        er tydelig, kort og enkel å betale.
      </p>

      <h2>Eksempel</h2>
      <ul>
        <li><strong>Fakturanummer:</strong> 1001</li>
        <li><strong>Fakturadato:</strong> 31.01.2026</li>
        <li><strong>Forfall:</strong> 14.02.2026</li>
        <li><strong>Til:</strong> Kunde AS</li>
        <li><strong>Linje:</strong> Tjeneste – 1 stk – 1 000 kr – MVA 25%</li>
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
