"use client";

import { useEffect, useMemo, useState } from "react";
import { loadJson, saveJson } from "@/lib/storage";
import type { Invoice, Lang, Party } from "@/lib/invoiceTypes";
import { calc } from "@/lib/invoice/calc";
import { money } from "@/lib/invoice/money";
import { downloadInvoicePdf } from "@/lib/invoice/pdf";

const STORAGE_KEY = "invoicespark:draft:v1";

const t = (lang: Lang) => {
  const dict = {
    en: {
      appName: "InvoiceSpark",
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
      appName: "InvoiceSpark",
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

// calc/money/downloadInvoicePdf are imported from lib

function defaultInvoice(): Invoice {
  return {
    invoiceNumber: "1001",
    issueDate: todayISO(),
    dueDate: addDaysISO(14),
    from: { name: "Your Business" },
    to: { name: "Customer" },
    currency: "USD",
    notes: "",
    items: [{ description: "Service", quantity: 1, unitPrice: 100, taxRatePct: 0 }],
  };
}

export default function GeneratorPage() {
  const [lang, setLang] = useState<Lang>("en");
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
                lang === "en"
                  ? "bg-zinc-900 text-white"
                  : "bg-white border border-zinc-200"
              }`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`rounded-full px-3 py-1 text-sm ${
                lang === "no"
                  ? "bg-zinc-900 text-white"
                  : "bg-white border border-zinc-200"
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

        {/* Share */}
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
          {shareError ? (
            <div className="mt-3 text-xs text-red-600">{shareError}</div>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Editor */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                label={s.invoiceNumber}
                value={invoice.invoiceNumber}
                onChange={(v) => setInvoice((x) => ({ ...x, invoiceNumber: v }))}
              />
              <Field
                label={s.currency}
                value={invoice.currency}
                onChange={(v) =>
                  setInvoice((x) => ({
                    ...x,
                    currency: v.toUpperCase().slice(0, 3),
                  }))
                }
                placeholder="USD / NOK / EUR"
              />
              <Field
                type="date"
                label={s.issueDate}
                value={invoice.issueDate}
                onChange={(v) => setInvoice((x) => ({ ...x, issueDate: v }))}
              />
              <Field
                type="date"
                label={s.dueDate}
                value={invoice.dueDate}
                onChange={(v) => setInvoice((x) => ({ ...x, dueDate: v }))}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <PartyEditor
                title={s.from}
                party={invoice.from}
                onChange={(party) => setInvoice((x) => ({ ...x, from: party }))}
                labels={s}
              />
              <PartyEditor
                title={s.to}
                party={invoice.to}
                onChange={(party) => setInvoice((x) => ({ ...x, to: party }))}
                labels={s}
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{s.items}</h3>
                <button
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50"
                  onClick={() =>
                    setInvoice((x) => ({
                      ...x,
                      items: [
                        ...x.items,
                        {
                          description: "",
                          quantity: 1,
                          unitPrice: 0,
                          taxRatePct: 0,
                        },
                      ],
                    }))
                  }
                >
                  {s.addLine}
                </button>
              </div>

              <div className="mt-3 space-y-3">
                {invoice.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 gap-2 rounded-xl border border-zinc-200 p-3 sm:grid-cols-12 sm:items-end"
                  >
                    <div className="sm:col-span-5">
                      <Field
                        label={s.description}
                        value={it.description}
                        onChange={(v) =>
                          setInvoice((x) => {
                            const items = [...x.items];
                            items[idx] = { ...items[idx], description: v };
                            return { ...x, items };
                          })
                        }
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        label={s.qty}
                        type="number"
                        value={String(it.quantity)}
                        onChange={(v) =>
                          setInvoice((x) => {
                            const items = [...x.items];
                            items[idx] = {
                              ...items[idx],
                              quantity: Number(v || 0),
                            };
                            return { ...x, items };
                          })
                        }
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        label={s.unitPrice}
                        type="number"
                        value={String(it.unitPrice)}
                        onChange={(v) =>
                          setInvoice((x) => {
                            const items = [...x.items];
                            items[idx] = {
                              ...items[idx],
                              unitPrice: Number(v || 0),
                            };
                            return { ...x, items };
                          })
                        }
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        label={s.tax}
                        type="number"
                        value={String(it.taxRatePct)}
                        onChange={(v) =>
                          setInvoice((x) => {
                            const items = [...x.items];
                            items[idx] = {
                              ...items[idx],
                              taxRatePct: Number(v || 0),
                            };
                            return { ...x, items };
                          })
                        }
                      />
                    </div>
                    <div className="sm:col-span-1 flex sm:justify-end">
                      <button
                        className="mt-1 rounded-lg px-2 py-2 text-sm text-zinc-500 hover:text-zinc-900"
                        onClick={() =>
                          setInvoice((x) => ({
                            ...x,
                            items: x.items.filter((_, i) => i !== idx),
                          }))
                        }
                        aria-label={s.remove}
                        title={s.remove}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-zinc-700">{s.notes}</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
                rows={4}
                value={invoice.notes}
                placeholder={s.placeholderNotes}
                onChange={(e) =>
                  setInvoice((x) => ({ ...x, notes: e.target.value }))
                }
              />
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              Free utility (traffic) now. Next (paid): tracking, reminders, and a branded portal.
            </p>
          </section>

          {/* Preview */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{s.preview}</h2>
              <div className="text-xs text-zinc-500">
                {s.payBy}: <span className="font-medium text-zinc-800">{invoice.dueDate}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">{s.from}</div>
                  <div className="text-sm">{invoice.from.name || "—"}</div>
                  {invoice.from.email ? (
                    <div className="text-xs text-zinc-600">{invoice.from.email}</div>
                  ) : null}
                  {invoice.from.address ? (
                    <div className="mt-1 whitespace-pre-line text-xs text-zinc-600">
                      {invoice.from.address}
                    </div>
                  ) : null}
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold">{s.invoice}</div>
                  <div className="text-xs text-zinc-600">
                    {s.invoiceNumber}: {invoice.invoiceNumber || "—"}
                  </div>
                  <div className="text-xs text-zinc-600">
                    {s.issueDate}: {invoice.issueDate || "—"}
                  </div>
                  <div className="text-xs text-zinc-600">
                    {s.dueDate}: {invoice.dueDate || "—"}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold">{s.to}</div>
                <div className="text-sm">{invoice.to.name || "—"}</div>
                {invoice.to.email ? (
                  <div className="text-xs text-zinc-600">{invoice.to.email}</div>
                ) : null}
                {invoice.to.address ? (
                  <div className="mt-1 whitespace-pre-line text-xs text-zinc-600">
                    {invoice.to.address}
                  </div>
                ) : null}
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 text-xs text-zinc-600">
                      <th className="py-2 pr-2">{s.description}</th>
                      <th className="py-2 pr-2 text-right">{s.qty}</th>
                      <th className="py-2 pr-2 text-right">{s.unitPrice}</th>
                      <th className="py-2 pr-2 text-right">{s.tax}</th>
                      <th className="py-2 text-right">{s.total}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((it, idx) => {
                      const base = it.quantity * it.unitPrice;
                      const tax = base * (it.taxRatePct / 100);
                      const lineTotal = base + tax;
                      return (
                        <tr key={idx} className="border-b border-zinc-100">
                          <td className="py-2 pr-2">{it.description || "—"}</td>
                          <td className="py-2 pr-2 text-right">{it.quantity}</td>
                          <td className="py-2 pr-2 text-right">
                            {money(it.unitPrice, invoice.currency, lang)}
                          </td>
                          <td className="py-2 pr-2 text-right">
                            {it.taxRatePct.toFixed(0)}%
                          </td>
                          <td className="py-2 text-right">
                            {money(lineTotal, invoice.currency, lang)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col items-end gap-1 text-sm">
                <div className="text-zinc-700">
                  {s.subtotal}:{" "}
                  <span className="font-medium">
                    {money(totals.subtotal, invoice.currency, lang)}
                  </span>
                </div>
                <div className="text-zinc-700">
                  {s.taxTotal}:{" "}
                  <span className="font-medium">
                    {money(totals.taxTotal, invoice.currency, lang)}
                  </span>
                </div>
                <div className="text-base font-semibold">
                  {s.total}: {money(totals.total, invoice.currency, lang)}
                </div>
              </div>

              <div className="mt-4 whitespace-pre-line text-xs text-zinc-600">
                {(invoice.notes || "").trim() ? invoice.notes : s.thankYou}
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-10 text-center text-xs text-zinc-500">
          No accounts. Your draft is saved locally in your browser.
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
        <Field
          label={labels.name}
          value={party.name || ""}
          onChange={(v) => onChange({ ...party, name: v })}
        />
        <Field
          label={labels.email}
          value={party.email || ""}
          onChange={(v) => onChange({ ...party, email: v })}
        />
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
