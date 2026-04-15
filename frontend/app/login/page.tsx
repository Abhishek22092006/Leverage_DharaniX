'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldIcon, Mail, Lock, ArrowRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate authentication
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  const handleGuestAccess = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
      {/* Login Container */}
      <div className="w-full max-w-[420px]">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4">
            <ShieldIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-400">Sign in to access property intelligence</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 h-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 h-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-white focus:ring-white/20"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white/90 text-slate-900 hover:bg-white hover:scale-105 transition-all duration-200 font-medium h-12 rounded-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-slate-500">or</span>
            </div>
          </div>

          {/* Guest Access Button */}
          <Button
            onClick={handleGuestAccess}
            variant="ghost"
            className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 font-medium h-12 rounded-xl"
          >
            <div className="flex items-center justify-center gap-2">
              <User className="w-4 h-4" />
              Continue as Guest
            </div>
          </Button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-white hover:text-slate-300 transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
