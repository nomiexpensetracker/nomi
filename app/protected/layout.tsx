import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";

import { hasEnvVars } from "@/lib/utils";

import { Toaster } from "@/components/atoms/toaster";
import { AuthButton } from "@/components/auth-button";
import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/organisms/theme-switcher";
import { TooltipProvider } from "@/components/atoms/tooltip";
import HomeScreen from "@/modules/app/home-screen";

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
