'use client'

import { useEffect } from 'react'

import { useStore } from '@/lib/stores'
import { onGetUser } from '@/lib/services/user';
import { createClient } from '@/lib/supabase/client'

export function useInitializeUser() {
  const setUserData = useStore((state) => state.setUserData);

  useEffect(() => {
    const supabase = createClient()

    // check if user already logged in (silent rehydration)
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await onGetUser({ id: user.id })
      if (!data) return

      setUserData(data)
    }

    init()

    // listen for auth events (auto-hydrate after login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') setUserData(null)
        if (event === 'SIGNED_IN' && session?.user) {
          const { data } = await onGetUser({ id: session.user.id})
          if (!data) return

          setUserData(data)
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [setUserData])
}
