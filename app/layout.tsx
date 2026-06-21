import type { Metadata } from "next";
import { Syncopate } from "next/font/google";
import "./globals.css";

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Chanium — Build once. Scale forever.",
  description:
    "Chanium builds software, AI systems and digital products that compound business growth — owned and operated, not outsourced.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={syncopate.variable}>
      <body
        className="min-h-screen bg-ch-bg text-ch-fg antialiased"
        style={{ fontFamily: "var(--font-syncopate), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
