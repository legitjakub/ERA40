import type { Metadata } from "next";
import "@/styles/fonts.css";
import "@/styles/tokens.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERASMUS V ČESKU — Příběhy, které překračují hranice",
  description:
    "Dokumentární scrollytelling o Erasmu v Česku: lidské příběhy, chronologie od 1998, mapa Evropy a ověřená čísla DZS.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <SmoothScroll>
          <SkipLink />
          <SiteNav />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
