import type { Metadata } from "next";
import "@/styles/fonts.css";
import "@/styles/tokens.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter, siteName } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: siteName,
  description:
    "40 let programu Erasmus (1987–2027), Česko od roku 1998. Příběhy o tom, kam lidi zkušenost posunula a co díky ní předávají dál. Chronologie, mapa Evropy a ověřená čísla DZS.",
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
