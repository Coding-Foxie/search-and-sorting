import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
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
  authors: [{ name: "Coding Foxie", url: "https://codingfoxie.com" }],
  openGraph: {
    title: "AlgoScope - Algorithm Visualizer",
    description: "Interactive visualizations of searching and sorting algorithms. Built for developers, by Coding Foxie.",
    url: "https://algoscope.com",
    siteName: "AlgoScope",
    images: [
      {
        url: "https://algoscope.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AlgoScope OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlgoScope - Algorithm Visualizer",
    description: "Interactive visualizations of searching and sorting algorithms. Built for developers, by Coding Foxie.",
    images: ["https://algoscope.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Analytics />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
