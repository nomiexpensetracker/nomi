import { NextResponse } from 'next/server'

interface HCaptchaRequest {
  token: string
}

export interface HCaptchaResponse {
  challenge_ts: string
  credit: boolean
  hostname: string
  success: boolean
}

export async function POST(req: Request) {
  const { token } = (await req.json()) as HCaptchaRequest
  const HCAPTCHA_SECRET_KEY = process.env.HCAPTCHA_SECRET_KEY || ''

  if (!token) {
    return NextResponse.json({ success: false, message: 'No token provided' }, { status: 400 })
  }

  try {
    // check verifying the token with hCaptcha API
    const response = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: HCAPTCHA_SECRET_KEY,
        response: token,
      }),
    })

    const data = (await response.json()) as HCaptchaResponse

    if (!data.success) throw new Error(`${response}`)
    return NextResponse.json({ success: true, message: 'Captcha terverifikasi' })
  } catch (error) {
    return NextResponse.json({ success: false, message: `Gagal memverifikasi captcha. ${error}` }, { status: 500 })
  }
}
