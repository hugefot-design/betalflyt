"use client";

import { useEffect, useMemo, useState } from "react";
import { loadJson, saveJson } from "@/lib/storage";
import type { Invoice, Lang } from "@/lib/invoiceTypes";
import { downloadInvoicePdf } from "@/lib/invoice/pdf";

const STORAGE_KEY = "betalflyt:draft:v1";

// Free plan guardrail: limit PDF exports per day (local only).
const DAILY_EXPORT_LIMIT = 5;
const EXPORT_COUNT_KEY = "betalflyt:exports:v1";

function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function readExportCountForToday() {
  try {
    const raw = localStorage.getItem(EXPORT_COUNT_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { day?: string; count?: number };
    if (parsed.day !== todayKey()) return 0;
    return Number(parsed.count || 0);
  } catch {
    return 0;
  }
}

function bumpExportCount() {
  const day = todayKey();
  const current = readExportCountForToday();
  const next = Math.max(0, current) + 1;
  try {
    localStorage.setItem(EXPORT_COUNT_KEY, JSON.stringify({ day, count: next }));
  } catch {
    // ignore
  }
  return next;
}

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

function defaultInvoiceEN(): Invoice {
  return {
    invoiceNumber: "1001",
    issueDate: todayISO(),
    dueDate: addDaysISO(14),
    from: { name: "Your business" },
    to: { name: "Customer" },
    currency: "USD",
    notes: "",
    items: [{ description: "Service", quantity: 1, unitPrice: 100, taxRatePct: 0 }],
  };
}

export default function GeneratorPageEN() {
  const [lang, setLang] = useState<Lang>("en");
  const s = useMemo(() => t(lang), [lang]);

  const [invoice, setInvoice] = useState<Invoice>(() => loadJson<Invoice>(STORAGE_KEY, defaultInvoiceEN()));
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const [exportsToday, setExportsToday] = useState<number>(0);

  useEffect(() => {
    // localStorage is available only on client
    setExportsToday(readExportCountForToday());
  }, []);

  const exportsLeft = Math.max(0, DAILY_EXPORT_LIMIT - exportsToday);
  const exportLocked = exportsToday >= DAILY_EXPORT_LIMIT;

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
              <a href="/en" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
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
                  const next = defaultInvoiceEN();
                  setInvoice(next);
                  saveJson(STORAGE_KEY, next);
                  setSavedAt(Date.now());
                }
              }}
            >
              {s.reset}
            </button>

            <button
              className={`rounded-xl px-4 py-2 text-sm font-medium text-white ${
                exportLocked ? "bg-zinc-400" : "bg-zinc-900 hover:bg-zinc-800"
              }`}
              disabled={exportLocked}
              onClick={() => {
                // Guardrail: limit free PDF exports per day
                if (exportLocked) return;
                downloadInvoicePdf(invoice, lang);
                const next = bumpExportCount();
                setExportsToday(next);
              }}
            >
              {s.downloadPdf}
            </button>
          </div>
        </header>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700">
          <div className="font-medium">Free limit</div>
          <div className="mt-1 text-zinc-600">
            You can export up to <span className="font-medium">{DAILY_EXPORT_LIMIT}</span> invoice PDFs per day on the free plan.
            {exportLocked ? (
              <span className="text-red-600"> You’ve reached today’s limit.</span>
            ) : (
              <span> Remaining today: <span className="font-medium">{exportsLeft}</span>.</span>
            )}
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <a className="rounded-xl bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-800" href="/en/pricing">
              Upgrade (coming)
            </a>
            <a className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-center text-sm hover:bg-zinc-50" href="/en/privacy">
              Privacy
            </a>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-zinc-500">No accounts. Your draft is saved locally in your browser.</footer>
      </div>
    </div>
  );
}
