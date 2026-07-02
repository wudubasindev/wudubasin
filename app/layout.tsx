import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WuduBasin.ca — Ceramic Wudu Sinks & Installation in London, Ontario",
  description:
    "Book a ceramic wudu sink with professional installation for a $100 deposit — pay the remaining balance on completion. Serving homes, mosques, and Islamic schools in London, Ontario and the surrounding area.",
  openGraph: {
    title: "WuduBasin.ca — Ceramic Wudu Sinks & Installation",
    description:
      "Book a ceramic wudu sink with professional installation for a $100 deposit. Serving London, Ontario and the surrounding area.",
    siteName: "WuduBasin.ca",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand-50 text-ink-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
