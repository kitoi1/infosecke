import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geist = Geist({
  subsets: ["latin"],
});

const mono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InfoSecKe",
  description:
    "Open-source cybersecurity learning platform built in Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${geist.className} ${mono.className}`}>
        <ThemeProvider>
          <TooltipProvider>
            <Navbar />

            {children}

            <Footer />

            <Toaster richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
