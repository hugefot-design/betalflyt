import type { Invoice } from "@/lib/invoiceTypes";

export function calc(invoice: Invoice) {
  const subtotal = invoice.items.reduce(
    (sum, it) => sum + it.quantity * it.unitPrice,
    0,
  );
  const taxTotal = invoice.items.reduce((sum, it) => {
    const base = it.quantity * it.unitPrice;
    return sum + base * (it.taxRatePct / 100);
  }, 0);
  const total = subtotal + taxTotal;
  return { subtotal, taxTotal, total };
}
