"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

function detectLocale(pathname: string) {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/no" || pathname.startsWith("/no/")) return "no";
  return "no";
}

function stripLocale(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  if (pathname === "/no") return "/";
  if (pathname.startsWith("/no/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export default function Nav() {
  const pathname = usePathname() || "/";
  const locale = useMemo(() => detectLocale(pathname), [pathname]);
  const rest = useMemo(() => stripLocale(pathname), [pathname]);

  const homeHref = locale === "en" ? "/en" : "/no";
  const generatorHref = locale === "en" ? "/en/generator" : "/no/generator";
  const pricingHref = locale === "en" ? "/en/pricing" : "/no/pricing";

  // NOTE: templates/pages under /no exist today; /en versions come next.
  const templatesHref = locale === "en" ? "/en" : "/no/faktura-mal";

  const switchToNo = `/no${rest === "/" ? "" : rest}`;
  const switchToEn = `/en${rest === "/" ? "" : rest}`;

  return (
    <div className="nav">
      <div className="mx-auto container px-4">
        <div className="flex h-14 items-center justify-between">
          <a href={homeHref} className="link text-sm font-semibold tracking-tight">
            BetalFlyt
          </a>

          <div className="flex items-center gap-4 text-sm">
            <a className="link" href={generatorHref}>
              {locale === "en" ? "Generator" : "Generator"}
            </a>
            <a className="link" href={templatesHref}>
              {locale === "en" ? "Templates" : "Maler"}
            </a>
            <a className="link" href={pricingHref}>
              {locale === "en" ? "Pricing" : "Pris"}
            </a>

            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-2 py-1">
              <a
                className={`px-2 py-0.5 text-xs ${locale === "no" ? "font-semibold" : "text-black/60"}`}
                href={switchToNo}
              >
                NO
              </a>
              <span className="text-black/20">|</span>
              <a
                className={`px-2 py-0.5 text-xs ${locale === "en" ? "font-semibold" : "text-black/60"}`}
                href={switchToEn}
              >
                EN
              </a>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
