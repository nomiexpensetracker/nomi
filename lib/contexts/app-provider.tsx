'use client'

import { ReactNode } from 'react'

import { useInitializeUser } from '@/lib/hooks/use-user'

export function AppProvider({ children }: { children: ReactNode }) {
  useInitializeUser() // initializes hydration

  return <>{children}</>
}
