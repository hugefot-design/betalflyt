import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Invoice, Lang } from "@/lib/invoiceTypes";
import { calc } from "@/lib/invoice/calc";
import { money } from "@/lib/invoice/money";

const strings = (lang: Lang) => {
  const dict = {
    en: {
      invoice: "Invoice",
      invoiceNumber: "Invoice #",
      issueDate: "Issue date",
      dueDate: "Due date",
      from: "From",
      to: "Bill to",
      description: "Description",
      qty: "Qty",
      unitPrice: "Unit price",
      tax: "Tax %",
      subtotal: "Subtotal",
      taxTotal: "Tax",
      total: "Total",
      notes: "Notes",
      thankYou: "Thank you for your business.",
    },
    no: {
      invoice: "Faktura",
      invoiceNumber: "Faktura #",
      issueDate: "Fakturadato",
      dueDate: "Forfallsdato",
      from: "Fra",
      to: "Til",
      description: "Beskrivelse",
      qty: "Ant",
      unitPrice: "Enhetspris",
      tax: "MVA %",
      subtotal: "Sum eks. MVA",
      taxTotal: "MVA",
      total: "Totalt",
      notes: "Notat",
      thankYou: "Takk for handelen.",
    },
  } as const;

  return dict[lang];
};

export function downloadInvoicePdf(invoice: Invoice, lang: Lang) {
  const s = strings(lang);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;

  const { subtotal, taxTotal, total } = calc(invoice);

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(s.invoice, margin, 64);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Right column meta
  const metaX = pageWidth - margin;
  const metaY = 54;
  const metaLines = [
    `${s.invoiceNumber}: ${invoice.invoiceNumber || "—"}`,
    `${s.issueDate}: ${invoice.issueDate || "—"}`,
    `${s.dueDate}: ${invoice.dueDate || "—"}`,
  ];
  metaLines.forEach((line, i) => {
    doc.text(line, metaX, metaY + i * 14, { align: "right" });
  });

  // Parties
  doc.setFont("helvetica", "bold");
  doc.text(s.from, margin, 110);
  doc.text(s.to, pageWidth / 2, 110);

  doc.setFont("helvetica", "normal");
  const fromLines = [
    invoice.from.name || "—",
    invoice.from.email || "",
    invoice.from.address || "",
  ].filter(Boolean);
  const toLines = [
    invoice.to.name || "—",
    invoice.to.email || "",
    invoice.to.address || "",
  ].filter(Boolean);

  fromLines.forEach((line, i) => doc.text(line, margin, 126 + i * 14));
  toLines.forEach((line, i) => doc.text(line, pageWidth / 2, 126 + i * 14));

  // Table
  const tableBody = invoice.items.map((it) => {
    const lineSubtotal = it.quantity * it.unitPrice;
    const lineTax = lineSubtotal * (it.taxRatePct / 100);
    const lineTotal = lineSubtotal + lineTax;

    return [
      it.description || "—",
      String(it.quantity || 0),
      money(it.unitPrice || 0, invoice.currency, lang),
      `${(it.taxRatePct || 0).toFixed(0)}%`,
      money(lineTotal, invoice.currency, lang),
    ];
  });

  autoTable(doc, {
    startY: 190,
    head: [[s.description, s.qty, s.unitPrice, s.tax, s.total]],
    body: tableBody.length ? tableBody : [["—", "0", "—", "0%", "—"]],
    styles: { font: "helvetica", fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [17, 24, 39] },
    columnStyles: {
      1: { halign: "right" },
      2: { halign: "right" },
      3: { halign: "right" },
      4: { halign: "right" },
    },
  });

  const finalY = (doc as any).lastAutoTable?.finalY ?? 190;

  // Totals
  const totalsY = finalY + 18;
  const totalsX = pageWidth - margin;

  doc.setFont("helvetica", "normal");
  doc.text(`${s.subtotal}: ${money(subtotal, invoice.currency, lang)}`, totalsX, totalsY, {
    align: "right",
  });
  doc.text(`${s.taxTotal}: ${money(taxTotal, invoice.currency, lang)}`, totalsX, totalsY + 14, {
    align: "right",
  });

  doc.setFont("helvetica", "bold");
  doc.text(`${s.total}: ${money(total, invoice.currency, lang)}`, totalsX, totalsY + 32, {
    align: "right",
  });

  // Notes
  const notesY = totalsY + 70;
  doc.setFont("helvetica", "bold");
  doc.text(s.notes, margin, notesY);
  doc.setFont("helvetica", "normal");
  const noteText = (invoice.notes || "").trim() || s.thankYou;
  doc.text(doc.splitTextToSize(noteText, pageWidth - margin * 2), margin, notesY + 16);

  doc.save(`invoice-${invoice.invoiceNumber || "draft"}.pdf`);
}
