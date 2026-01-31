import Nav from "@/components/Nav";

export default function FreeInvoiceGeneratorEN() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="mx-auto container px-4 py-16">
        <div className="card p-10">
          <h1 className="h1">Free invoice generator</h1>
          <p className="lead mt-4 max-w-2xl">
            Create a clean invoice PDF in seconds. BetalFlyt is built for simple invoicing now — with tracking,
            reminders, and a customer portal coming in Pro.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="btn btn-primary" href="/en/generator">
              Open generator
            </a>
            <a className="btn" href="/en/pricing">
              Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
