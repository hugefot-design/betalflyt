export type Lang = "en" | "no";

export type LineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRatePct: number; // 0-100
};

export type Party = {
  name: string;
  email?: string;
  address?: string;
};

export type Invoice = {
  invoiceNumber: string;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  from: Party;
  to: Party;
  currency: string;
  notes: string;
  items: LineItem[];
};
