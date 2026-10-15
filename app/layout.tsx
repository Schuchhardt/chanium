import type { Metadata, Viewport } from "next";
import { Syncopate } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { UtmCapture } from "@/components/UtmCapture";
import { site } from "@/content/site";
import "./globals.css";

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline.replace(/\.$/, "")}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={syncopate.variable}>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
        <UtmCapture />
        <Analytics />
      </body>
    </html>
  );
}
