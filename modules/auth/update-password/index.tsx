'use client';

import { Mail } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from 'react';

import useCaptcha from '@/lib/hooks/use-captcha';
import { createClient } from "@/lib/supabase/client";

import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Button } from '@/components/atoms/button';
import { toast } from '@/lib/hooks/use-toast';

const UpdatePassword: React.FC = () => {
  const router = useRouter();
  const {
    captchaRef,
    captchaToken,
    handleResetCaptcha,
    handleVerifyCaptcha,
    handleVerifyChallenge,
  } = useCaptcha()

  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    try {
      if (!captchaToken) {
        toast({
          title: 'Gagal memverifikasi captcha!',
          variant: 'destructive',
          description: 'Harap selesaikan verifikasi captcha.',
        })
        return
      }

      setError(null);
      setIsLoading(true);

      if (await handleVerifyCaptcha()) {
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;

        // Update this route to redirect to an authenticated route. The user already has an active session.
        handleResetCaptcha();
        router.push("/app");
      }

    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [password, router, handleResetCaptcha, handleVerifyCaptcha, captchaToken, confirmPassword]);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col justify-center py-4 px-6">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
          <p className="text-gray-600 mt-2">
            Please enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="password">New password</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="Enter your new password"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="confirm">Confirm password</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                placeholder="Confirm your new password"
                required
              />
            </div>
          </div>

          <HCaptcha
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
            onVerify={handleVerifyChallenge}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
