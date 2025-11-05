import { NextIntlClientProvider } from "next-intl";

import MenuNavigation from "@/components/organisms/menu-navigation";
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
        {children}
        <MenuNavigation />
      </TooltipProvider>
    </NextIntlClientProvider>
  );
}
