import { NextIntlClientProvider } from "next-intl";

import { AppProvider } from "@/lib/contexts/app-provider";

import { Toaster } from "@/components/atoms/toaster";
import MenuNavigation from "@/components/organisms/menu-navigation";
import { TooltipProvider } from "@/components/atoms/tooltip";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          {children}
          <MenuNavigation />
        </TooltipProvider>
      </AppProvider>
    </NextIntlClientProvider>
  );
}
