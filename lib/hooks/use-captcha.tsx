import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useLocale } from 'next-intl'
import { useCallback, useRef, useState } from 'react'

import { CommonResponse } from '@/types/common'

import { toast } from './use-toast'

interface UseCaptchaResult {
  captchaRef: React.RefObject<HCaptcha | null>
  captchaToken: string | null
  handleResetCaptcha: () => void
  handleVerifyCaptcha: () => Promise<boolean>
  handleVerifyChallenge: (token: string | null) => void
  loadingVerifyCaptcha: boolean
}

const useCaptcha = (): UseCaptchaResult => {
  const hostUrl = process.env.NEXT_PUBLIC_APP_HOSTNAME || ''

  const locale = useLocale()
  const captchaRef = useRef<HCaptcha | null>(null)

  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [loadingVerifyCaptcha, setLoadingVerifyCaptcha] = useState<boolean>(false)

  const handleVerifyChallenge = useCallback((token: string | null) => setCaptchaToken(token), [])

  const handleResetCaptcha = useCallback(() => {
    setCaptchaToken(null)
    captchaRef.current?.resetCaptcha()
  }, [])

  const handleVerifyCaptcha = useCallback(async () => {
    try {
      setLoadingVerifyCaptcha(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_HOSTNAME}/api/verify-captcha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: captchaToken }),
      })

      const data = (await response.json()) as CommonResponse

      if (data.success) {
        setLoadingVerifyCaptcha(false)
        return true
      }
      throw new Error(data.message)
    } catch (error) {
      toast({
        title: 'Gagal memverifikasi captcha!',
        variant: 'destructive',
        description: `${error}` || 'Terjadi kesalahan saat memverifikasi captcha. Coba lagi nanti.',
      })
      handleResetCaptcha()
      setLoadingVerifyCaptcha(false)
      return false
    }
  }, [locale, captchaToken, hostUrl, handleResetCaptcha, toast])

  return {
    captchaRef,
    captchaToken,
    loadingVerifyCaptcha,
    handleResetCaptcha,
    handleVerifyCaptcha,
    handleVerifyChallenge,
  }
}

export default useCaptcha;
