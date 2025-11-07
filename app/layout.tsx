import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";

import { AppProvider } from "@/lib/contexts/app-provider";
import { ViewportProvider } from "@/lib/contexts/viewport-provider";

import { Toaster } from "@/components/atoms/toaster";
import MobileOnlyScreen from "@/components/molecules/mobile-only-screen";
import { TooltipProvider } from "@/components/atoms/tooltip";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Nomi - Family Expense Tracker",
  description: "",
};

const geistSans = Mona_Sans({
  variable: "--font-mona-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider>
            <AppProvider>
              <ViewportProvider>
                <MobileOnlyScreen>
                  <TooltipProvider>
                    <Toaster />
                    {children}
                  </TooltipProvider>
                </MobileOnlyScreen>
              </ViewportProvider>
            </AppProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
