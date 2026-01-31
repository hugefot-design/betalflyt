import { redirect } from "next/navigation";

// Backwards-compatible route.
// Some external links may use /templates.
export default function TemplatesRedirectPage() {
  redirect("/no/faktura-mal");
}
