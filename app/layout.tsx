import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DCBD | One Player. One Ecosystem.",
    template: "%s | DCBD",
  },
  description:
    "The connected DCBD player ecosystem for identity, progression, collecting, community, commerce and Flip.",
  applicationName: "DCBD",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09080d",
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <a
          className="fixed left-3 top-3 z-[60] -translate-y-24 rounded-lg bg-gold px-4 py-3 font-black text-ink transition-transform focus:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
