import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vyapar.AI — From Idea to Launch-Ready Brand, in Minutes",
  description:
    "AI-powered market intelligence and brand-building platform for Indian SMEs launching on Amazon. Get complete market analysis, competitor intel, pricing strategy, brand identity, and product mockups.",
  keywords: [
    "Amazon seller tools",
    "brand building",
    "market analysis",
    "AI business plan",
    "Indian SME",
    "product launch",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
