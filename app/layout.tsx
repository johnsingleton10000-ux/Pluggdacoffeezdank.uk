import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Oswald } from "next/font/google";
import { AgeGate } from "@/components/layout/AgeGate";
import { AppShell } from "@/components/layout/AppShell";
import { SITE } from "@/config/site";
import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: `${SITE.name} · Connected ecosystem`,
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <AgeGate>
          <AppShell>{children}</AppShell>
        </AgeGate>
      </body>
    </html>
  );
}
