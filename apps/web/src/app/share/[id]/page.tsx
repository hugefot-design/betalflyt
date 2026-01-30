import { prisma } from "@/lib/prisma";
import { InvoiceSchema } from "@/lib/invoiceSchema";

export default async function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const row = await prisma.sharedInvoice.findUnique({
    where: { id },
    select: { payload: true, createdAt: true },
  });

  if (!row) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold">Not found</h1>
            <p className="mt-2 text-zinc-600">This shared invoice link is invalid or expired.</p>
            <a className="mt-6 inline-block underline" href="/">
              Back
            </a>
          </div>
        </div>
      </div>
    );
  }

  let invoice: any = null;
  try {
    invoice = JSON.parse(row.payload);
  } catch {
    invoice = null;
  }

  const parsed = InvoiceSchema.safeParse(invoice);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-zinc-500">InvoiceSpark</div>
              <h1 className="mt-2 text-2xl font-semibold">Shared invoice</h1>
              <p className="mt-1 text-xs text-zinc-500">Created: {row.createdAt.toISOString()}</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
                href="/generator"
              >
                Create your own invoice
              </a>
              <a
                className="rounded-2xl border border-zinc-200 px-5 py-3 text-sm hover:bg-zinc-50"
                href="/privacy"
              >
                Privacy
              </a>
            </div>
          </div>

          {!parsed.success ? (
            <p className="mt-8 text-zinc-600">This invoice data is invalid.</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 p-4">
                <div className="text-sm font-semibold">From</div>
                <div className="mt-1 text-sm">{parsed.data.from.name}</div>
                {parsed.data.from.email ? (
                  <div className="text-xs text-zinc-600">{parsed.data.from.email}</div>
                ) : null}
                {parsed.data.from.address ? (
                  <div className="mt-1 whitespace-pre-line text-xs text-zinc-600">
                    {parsed.data.from.address}
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-zinc-200 p-4">
                <div className="text-sm font-semibold">To</div>
                <div className="mt-1 text-sm">{parsed.data.to.name}</div>
                {parsed.data.to.email ? (
                  <div className="text-xs text-zinc-600">{parsed.data.to.email}</div>
                ) : null}
                {parsed.data.to.address ? (
                  <div className="mt-1 whitespace-pre-line text-xs text-zinc-600">
                    {parsed.data.to.address}
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-zinc-200 p-4 lg:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">Invoice #</div>
                    <div className="text-sm">{parsed.data.invoiceNumber || "—"}</div>
                  </div>
                  <div className="text-right text-xs text-zinc-600">
                    <div>Issue: {parsed.data.issueDate || "—"}</div>
                    <div>Due: {parsed.data.dueDate || "—"}</div>
                    <div>Currency: {parsed.data.currency}</div>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 text-xs text-zinc-600">
                        <th className="py-2 pr-2">Description</th>
                        <th className="py-2 pr-2 text-right">Qty</th>
                        <th className="py-2 pr-2 text-right">Unit price</th>
                        <th className="py-2 pr-2 text-right">Tax %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsed.data.items.map((it, idx) => (
                        <tr key={idx} className="border-b border-zinc-100">
                          <td className="py-2 pr-2">{it.description || "—"}</td>
                          <td className="py-2 pr-2 text-right">{it.quantity}</td>
                          <td className="py-2 pr-2 text-right">{it.unitPrice}</td>
                          <td className="py-2 pr-2 text-right">{it.taxRatePct.toFixed(0)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {parsed.data.notes ? (
                  <div className="mt-4 whitespace-pre-line text-xs text-zinc-600">
                    {parsed.data.notes}
                  </div>
                ) : null}

                <p className="mt-4 text-xs text-zinc-500">
                  Next: add PDF download + nicer formatting on this shared page.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
