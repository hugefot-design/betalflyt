import { redirect } from "next/navigation";

// Backwards-compatible route.
// The site uses /no/faktura-mal as the primary templates page, but some links (and older deployments)
// may point to /maler.
export default function MalerRedirectPage() {
  redirect("/no/faktura-mal");
}
