import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { InvoiceSchema } from "@/lib/invoiceSchema";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = InvoiceSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid invoice", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const payload = JSON.stringify(parsed.data);

    const row = await prisma.sharedInvoice.create({
      data: { payload },
      select: { id: true },
    });

    return NextResponse.json({ id: row.id }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error", detail: String(e?.message ?? e) },
      { status: 500 },
    );
  }
}
