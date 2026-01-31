"use client";

import { useEffect, useMemo, useState } from "react";
import { loadJson, saveJson } from "@/lib/storage";
import type { Invoice, Lang, Party } from "@/lib/invoiceTypes";
import { calc } from "@/lib/invoice/calc";
import { money } from "@/lib/invoice/money";
import { downloadInvoicePdf } from "@/lib/invoice/pdf";

const STORAGE_KEY = "betalflyt:draft:v1";

const t = (lang: Lang) => {
  const dict = {
    en: {
      appName: "BetalFlyt",
      tagline: "Free invoice generator — download a clean PDF in seconds.",
      language: "Language",
      invoice: "Invoice",
      invoiceNumber: "Invoice #",
      issueDate: "Issue date",
      dueDate: "Due date",
      from: "From",
      to: "Bill to",
      name: "Name",
      email: "Email",
      address: "Address",
      currency: "Currency",
      items: "Line items",
      description: "Description",
      qty: "Qty",
      unitPrice: "Unit price",
      tax: "Tax %",
      addLine: "+ Add line",
      remove: "Remove",
      notes: "Notes",
      downloadPdf: "Download PDF",
      preview: "Preview",
      subtotal: "Subtotal",
      taxTotal: "Tax",
      total: "Total",
      payBy: "Pay by",
      thankYou: "Thank you for your business.",
      placeholderNotes: "Payment terms, bank details, or a short thank you…",
      saved: "Saved",
      reset: "Reset",
      resetConfirm: "Reset draft?",
    },
    no: {
      appName: "BetalFlyt",
      tagline: "Gratis fakturagenerator — last ned en pen PDF på sekunder.",
      language: "Språk",
      invoice: "Faktura",
      invoiceNumber: "Faktura #",
      issueDate: "Fakturadato",
      dueDate: "Forfallsdato",
      from: "Fra",
      to: "Til",
      name: "Navn",
      email: "E-post",
      address: "Adresse",
      currency: "Valuta",
      items: "Linjer",
      description: "Beskrivelse",
      qty: "Ant",
      unitPrice: "Enhetspris",
      tax: "MVA %",
      addLine: "+ Legg til linje",
      remove: "Fjern",
      notes: "Notat",
      downloadPdf: "Last ned PDF",
      preview: "Forhåndsvisning",
      subtotal: "Sum eks. MVA",
      taxTotal: "MVA",
      total: "Totalt",
      payBy: "Betal innen",
      thankYou: "Takk for handelen.",
      placeholderNotes: "Betalingsvilkår, bankinfo, eller en kort takk…",
      saved: "Lagret",
      reset: "Nullstill",
      resetConfirm: "Nullstille utkast?",
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

function defaultInvoice(): Invoice {
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

export default function GeneratorPage() {
  const [lang, setLang] = useState<Lang>("no");
  const s = useMemo(() => t(lang), [lang]);

  const [invoice, setInvoice] = useState<Invoice>(() =>
    loadJson<Invoice>(STORAGE_KEY, defaultInvoice()),
  );

  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      saveJson(STORAGE_KEY, invoice);
      setSavedAt(Date.now());
    }, 300);

    return () => window.clearTimeout(handle);
  }, [invoice]);

  const totals = useMemo(() => calc(invoice), [invoice]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <a href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
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
                  const next = defaultInvoice();
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

        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold">Share link (beta)</div>
              <div className="text-xs text-zinc-600">
                Creates a read-only link. (We will add full preview + PDF later.)
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50 disabled:opacity-60"
                disabled={shareLoading}
                onClick={async () => {
                  setShareError(null);
                  setShareLoading(true);
                  try {
                    const res = await fetch("/api/share", {
                      method: "POST",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify(invoice),
                    });
                    if (!res.ok) {
                      const msg = await res.text();
                      throw new Error(msg || `HTTP ${res.status}`);
                    }
                    const data = (await res.json()) as { id: string };
                    setShareId(data.id);
                  } catch (e: any) {
                    setShareError(String(e?.message ?? e));
                  } finally {
                    setShareLoading(false);
                  }
                }}
              >
                {shareLoading ? "Creating…" : "Create share link"}
              </button>

              {shareId ? (
                <a
                  className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                  href={`/share/${shareId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open link
                </a>
              ) : null}
            </div>
          </div>

          {shareId ? (
            <div className="mt-3 text-xs text-zinc-700">
              Link: <span className="font-mono">/share/{shareId}</span>
            </div>
          ) : null}
          {shareError ? <div className="mt-3 text-xs text-red-600">{shareError}</div> : null}
        </div>

        <footer className="mt-10 text-center text-xs text-zinc-500">
          Ingen konto. Utkastet lagres lokalt i nettleseren din.
        </footer>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-zinc-700">{label}</div>
      <input
        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function PartyEditor({
  title,
  party,
  onChange,
  labels,
}: {
  title: string;
  party: Party;
  onChange: (p: Party) => void;
  labels: ReturnType<typeof t>;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 space-y-3">
        <Field label={labels.name} value={party.name || ""} onChange={(v) => onChange({ ...party, name: v })} />
        <Field label={labels.email} value={party.email || ""} onChange={(v) => onChange({ ...party, email: v })} />
        <label className="block">
          <div className="text-sm font-medium text-zinc-700">{labels.address}</div>
          <textarea
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            rows={3}
            value={party.address || ""}
            onChange={(e) => onChange({ ...party, address: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}
