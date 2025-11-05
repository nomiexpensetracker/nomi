'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const code = params.get('code')
    const type = params.get('type')

    // ⚠️ In recovery flows, Supabase provides access_token not code
    const accessToken = params.get('access_token')

    const exchange = async () => {
      const supabase = createClient()

      if (accessToken) {
        // Exchange the access token manually (newer SDK handles this gracefully)
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: params.get('refresh_token')!,
        })
      } else if (code) {
        await supabase.auth.exchangeCodeForSession(code)
      }

      // Redirect user appropriately
      if (type === 'recovery') {
        router.replace('/auth/update-password')
      } else {
        router.replace('/app')
      }
    }

    exchange()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  )
}
