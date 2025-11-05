'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Button } from '@/components/atoms/button';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_HOSTNAME}/auth/callback`,
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col justify-center p-4">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Reset Link Sent!</h1>
            <p className="text-gray-600 mt-2">
              We've sent a password reset link to <br />
              <span className="font-medium">{email}</span>
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Check your email and follow the instructions to reset your password.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col justify-center p-4">
      <div className="max-w-md w-full mx-auto space-y-8">
        <Link
          href='/auth/login'
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="Enter your email address"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Reset Link...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
