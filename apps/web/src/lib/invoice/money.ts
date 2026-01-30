import type { Lang } from "@/lib/invoiceTypes";

export function money(amount: number, currency: string, lang: Lang) {
  try {
    return new Intl.NumberFormat(lang === "no" ? "nb-NO" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}
