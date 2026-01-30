import type { Metadata } from "next";
import SeoPage from "@/lib/seo/SeoPage";
import { faqJsonLd } from "@/lib/seo/faqJsonLd";

export const metadata: Metadata = {
  title: "Faktura med MVA – BetalFlyt",
  description:
    "Lag faktura med MVA-linjer og totalsum. Fyll ut i nettleseren og last ned PDF. Bokmål.",
};

export default function Page() {
  const faq = [
    {
      question: "Hvordan legger jeg til MVA?",
      answer:
        "I BetalFlyt kan du sette MVA% på hver linje. Appen kan vise totalsum og MVA når vi ferdigstiller totals-oversikten.",
    },
    {
      question: "Hvilken MVA-sats skal jeg bruke?",
      answer:
        "Det avhenger av hva du selger. Vanlige satser i Norge er 25%, 15% og 12%. Sjekk alltid hva som gjelder for din bransje.",
    },
  ];

  return (
    <SeoPage
      title="Faktura med MVA"
      lead="Lag en faktura med MVA på linjene og last ned som PDF. Perfekt for småbedrifter og frilansere som vil fakturere ryddig."
      jsonLd={faqJsonLd(faq)}
    >
      <p>
        Når du lager <strong>faktura med MVA</strong>, er det viktig å ha riktig sats og tydelig
        oppsett. BetalFlyt lar deg legge inn MVA-prosent per linje.
      </p>

      <h2>Praktiske tips</h2>
      <ul>
        <li>Bruk tydelige linjebeskrivelser (tjeneste/produkt)</li>
        <li>Sett korrekt MVA% på hver linje</li>
        <li>Legg inn betalingsvilkår i notat-feltet</li>
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
