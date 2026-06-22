import type { Metadata } from "next";
import { Syncopate } from "next/font/google";
import CustomCursor from "../components/CustomCursor";

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chanium.com"),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Chanium",
  },
  twitter: { card: "summary_large_image" },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={syncopate.variable}>
      <body
        className="min-h-screen bg-ch-bg text-ch-fg antialiased"
        style={{ fontFamily: "var(--font-syncopate), sans-serif" }}
      >
        <div
          className="relative min-h-screen overflow-x-hidden"
          style={{ background: "#050505", color: "#F0F0F0" }}
        >
          {/* Grain overlay */}
          <div
            className="grain-overlay fixed pointer-events-none"
            style={{
              inset: "-50%",
              width: "200%",
              height: "200%",
              zIndex: 9991,
              opacity: 0.05,
              mixBlendMode: "screen",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
              animation: "chGrain 0.4s steps(3) infinite",
            }}
          />
          <CustomCursor />
          {children}
        </div>
      </body>
    </html>
  );
}
