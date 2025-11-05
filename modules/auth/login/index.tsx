'use client'

import Link from 'next/link';
import { useRouter, redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { toast } from '@/lib/hooks/use-toast';
import { createClient } from "@/lib/supabase/client";

import { Label } from '@/components/atoms/label';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';

const Login: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckUserLoggedIn = async () => {
    const supabase = createClient();
  
    const { data } = await supabase.auth.getClaims();
    if (data?.claims) {
      redirect("/app");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/app");
    } catch (error: unknown) {
      // setError(error instanceof Error ? error.message : "An error occurred");
      toast({
        title: "Login failed",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCheckUserLoggedIn()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col justify-center py-4 px-6">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <Link
            href="/auth/forgot-password"
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Forgot your password?
          </Link>
          
          <div className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link
              href="/auth/sign-up"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
