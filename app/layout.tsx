import type { Metadata } from "next";
import { Anton, Cinzel, Inter, Permanent_Marker } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { site } from "@/lib/config/site";
import "./globals.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const estate = Cinzel({ subsets: ["latin"], weight: ["600", "800"], variable: "--font-estate" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const graffiti = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-graffiti" });

export const metadata: Metadata = {
  title: `${site.fullName} | ${site.name}`,
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${estate.variable} ${body.variable} ${graffiti.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
