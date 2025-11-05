import { NextIntlClientProvider } from "next-intl";

import HomeScreen from "@/modules/app/home-screen";

import { Toaster } from "@/components/atoms/toaster";
import { TooltipProvider } from "@/components/atoms/tooltip";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider>
      <TooltipProvider>
        <Toaster />
        <HomeScreen />
      </TooltipProvider>
    </NextIntlClientProvider>
  );
}
