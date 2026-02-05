import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.betalflyt.no"),
  title: {
    default: "Betalflyt — Market alerts & dashboard",
    template: "%s — Betalflyt",
  },
  description:
    "Market-moving news, scoring, and futures overview — fast, simple, and actionable.",
  applicationName: "Betalflyt",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Betalflyt",
    title: "Betalflyt — Market alerts & dashboard",
    description:
      "Market-moving news, scoring, and futures overview — fast, simple, and actionable.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Betalflyt — Market alerts & dashboard",
    description:
      "Market-moving news, scoring, and futures overview — fast, simple, and actionable.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
