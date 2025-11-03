import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import {NextIntlClientProvider} from 'next-intl';

import { Toaster } from "@/components/atoms/toaster";
import MobileOnlyScreen from "@/components/organisms/mobile-only-screen";
import { TooltipProvider } from "@/components/atoms/tooltip";
import { ViewportProvider } from "@/lib/contexts/viewport-provider";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Spendly - Family Expense Tracker",
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
        <ViewportProvider>
          <MobileOnlyScreen>
            <ThemeProvider>
              <NextIntlClientProvider>
                <TooltipProvider>
                  <Toaster />
                  {children}
                </TooltipProvider>
              </NextIntlClientProvider>
            </ThemeProvider>
          </MobileOnlyScreen>
        </ViewportProvider>
      </body>
    </html>
  );
}
