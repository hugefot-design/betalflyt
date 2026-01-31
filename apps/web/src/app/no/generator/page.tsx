"use client";

import { useEffect, useMemo, useState } from "react";
import { loadJson, saveJson } from "@/lib/storage";
import type { Invoice, Lang } from "@/lib/invoiceTypes";
import { downloadInvoicePdf } from "@/lib/invoice/pdf";

const STORAGE_KEY = "betalflyt:draft:v1";

const t = (lang: Lang) => {
  const dict = {
    en: {
      appName: "BetalFlyt",
      tagline: "Free invoice generator — download a clean PDF in seconds.",
      language: "Language",
      invoice: "Invoice",
      saved: "Saved",
      reset: "Reset",
      resetConfirm: "Reset draft?",
      downloadPdf: "Download PDF",
    },
    no: {
      appName: "BetalFlyt",
      tagline: "Gratis fakturagenerator — last ned en pen PDF på sekunder.",
      language: "Språk",
      invoice: "Faktura",
      saved: "Lagret",
      reset: "Nullstill",
      resetConfirm: "Nullstille utkast?",
      downloadPdf: "Last ned PDF",
    },
  } as const;
  return dict[lang];
};

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addDaysISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function defaultInvoiceNO(): Invoice {
  return {
    invoiceNumber: "1001",
    issueDate: todayISO(),
    dueDate: addDaysISO(14),
    from: { name: "Ditt firma" },
    to: { name: "Kunde" },
    currency: "NOK",
    notes: "",
    items: [{ description: "Tjeneste", quantity: 1, unitPrice: 1000, taxRatePct: 0 }],
  };
}

export default function GeneratorPageNO() {
  const [lang, setLang] = useState<Lang>("no");
  const s = useMemo(() => t(lang), [lang]);

  const [invoice, setInvoice] = useState<Invoice>(() => loadJson<Invoice>(STORAGE_KEY, defaultInvoiceNO()));
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      saveJson(STORAGE_KEY, invoice);
      setSavedAt(Date.now());
    }, 300);
    return () => window.clearTimeout(handle);
  }, [invoice]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <a href="/no" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
                {s.appName}
              </a>
              <span className="text-xs text-zinc-300">/</span>
              <span className="text-sm font-semibold">{s.invoice}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-600">{s.tagline}</p>
          </div>

          <div className="flex items-center gap-2">
            {savedAt ? (
              <span className="text-xs text-zinc-500">
                {s.saved}: {new Date(savedAt).toLocaleTimeString()}
              </span>
            ) : null}

            <span className="ml-2 text-sm text-zinc-600">{s.language}:</span>
            <button
              className={`rounded-full px-3 py-1 text-sm ${
                lang === "en" ? "bg-zinc-900 text-white" : "bg-white border border-zinc-200"
              }`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`rounded-full px-3 py-1 text-sm ${
                lang === "no" ? "bg-zinc-900 text-white" : "bg-white border border-zinc-200"
              }`}
              onClick={() => setLang("no")}
            >
              NO
            </button>

            <button
              className="ml-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
              onClick={() => {
                if (confirm(s.resetConfirm)) {
                  const next = defaultInvoiceNO();
                  setInvoice(next);
                  saveJson(STORAGE_KEY, next);
                  setSavedAt(Date.now());
                }
              }}
            >
              {s.reset}
            </button>

            <button
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              onClick={() => downloadInvoicePdf(invoice, lang)}
            >
              {s.downloadPdf}
            </button>
          </div>
        </header>

        <footer className="mt-10 text-center text-xs text-zinc-500">
          Ingen konto. Utkastet lagres lokalt i nettleseren din.
        </footer>
      </div>
    </div>
  );
}
