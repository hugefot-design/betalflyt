import type { Metadata } from "next";
import SeoPage from "@/lib/seo/SeoPage";
import { faqJsonLd } from "@/lib/seo/faqJsonLd";

export const metadata: Metadata = {
  title: "Faktura mal (gratis) – BetalFlyt",
  description:
    "En enkel faktura mal du kan fylle ut i nettleseren og laste ned som PDF. Gratis på bokmål.",
};

export default function Page() {
  const faq = [
    {
      question: "Hva bør en faktura inneholde?",
      answer:
        "Vanligvis: fakturanummer, dato, forfallsdato, hvem det er fra/til, beskrivelse, antall/pris, MVA (hvis relevant) og totalsum.",
    },
    {
      question: "Kan jeg bruke dette som faktura mal?",
      answer:
        "Ja. BetalFlyt fungerer som en faktura-mal du fyller ut, og så laster du ned PDF.",
    },
  ];

  return (
    <SeoPage
      title="Faktura mal (gratis)"
      lead="Bruk BetalFlyt som en enkel faktura-mal: fyll ut feltene, legg til linjer, og last ned en ryddig PDF."
      jsonLd={faqJsonLd(faq)}
    >
      <p>
        En <strong>faktura mal</strong> gjør det enklere å fakturere riktig og profesjonelt. I stedet
        for å starte fra scratch hver gang, kan du bruke BetalFlyt som en mal i nettleseren.
      </p>

      <h2>Dette er inkludert</h2>
      <ul>
        <li>Fakturanummer</li>
        <li>Fakturadato og forfallsdato</li>
        <li>Avsender (deg) og mottaker (kunde)</li>
        <li>Linjer med antall, pris og MVA%</li>
        <li>Notat (f.eks. betalingsinfo)</li>
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
