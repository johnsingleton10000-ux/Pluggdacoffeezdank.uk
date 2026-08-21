import type { Metadata } from "next";
import { Cinzel, Oswald, Permanent_Marker, Barlow } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { SITE } from "@/config/site";
import "./globals.css";

const display = Oswald({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const graffiti = Permanent_Marker({ subsets: ["latin"], variable: "--font-graffiti", weight: "400" });
const estate = Cinzel({ subsets: ["latin"], variable: "--font-estate", weight: ["500", "700", "900"] });
const body = Barlow({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: `${SITE.name} · ${SITE.longName}`,
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${graffiti.variable} ${estate.variable} ${body.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
