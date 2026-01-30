import { z } from "zod";

export const PartySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().max(500).optional().or(z.literal("")),
});

export const LineItemSchema = z.object({
  description: z.string().max(300),
  quantity: z.coerce.number().finite().min(0),
  unitPrice: z.coerce.number().finite(),
  taxRatePct: z.coerce.number().finite().min(0).max(100),
});

export const InvoiceSchema = z.object({
  invoiceNumber: z.string().max(50),
  issueDate: z.string().max(20),
  dueDate: z.string().max(20),
  from: PartySchema,
  to: PartySchema,
  currency: z.string().min(3).max(3),
  notes: z.string().max(2000),
  items: z.array(LineItemSchema).min(1).max(50),
});
