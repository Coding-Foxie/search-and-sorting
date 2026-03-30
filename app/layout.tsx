import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoScope - Algorithm Visualizer",
  description: "Interactive visualizations of searching and sorting algorithms. Built for developers, by Coding Foxie.",
  keywords: ["Bubble Sort", "Algorithm Visualizer", "InnoTrace", "Coding Foxie", "Learn Programming"],
  authors: [{ name: "Coding Foxie", url: "https://codingfoxie.com" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-y-auto custom-scrollbar antialiased`}
    >
      <Analytics />
      <SpeedInsights/>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
