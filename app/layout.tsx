import type { Metadata, Viewport } from "next";
import { Archivo_Black, Figtree, IBM_Plex_Mono } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { site } from "@/lib/config/site";
import "./globals.css";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.legalName}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0a0d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
