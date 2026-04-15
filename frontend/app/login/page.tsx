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
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-black font-sans">
      {/* 1. BACKGROUND (Cinematic Image + Overlays) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          className="w-full h-full object-cover opacity-90 object-center"
          alt=""
        />
        {/* Dark overlay 70% */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Gradient overlay for depth (Transparent at top, dark at bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505]" />
      </div>

      {/* 3. DEPTH GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[60%] w-[80vw] max-w-[800px] h-[500px] bg-blue-500/20 blur-[130px] rounded-[100%] z-0 pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[40%] w-[80vw] max-w-[800px] h-[500px] bg-purple-500/20 blur-[140px] rounded-[100%] z-0 pointer-events-none mix-blend-screen" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-[440px] px-4 sm:px-0">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/10 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden">
             {/* Inner subtle glow for Logo */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <ShieldIcon className="w-8 h-8 text-zinc-100" />
          </div>
          <h1 className="text-3xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 mb-2">Welcome Back</h1>
          <p className="text-sm font-light text-zinc-400 tracking-wide">Sign in to access property intelligence</p>
        </div>

        {/* 2. GLASS FORM CARD */}
        <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 sm:p-10 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Subtle top edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
            {/* Email Field */}
            <div className="space-y-2.5">
              <label className="text-sm font-light tracking-wide text-zinc-300 ml-1">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors duration-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 h-14 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] focus:ring-1 focus:ring-white/20 transition-all duration-300 font-light"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <label className="text-sm font-light tracking-wide text-zinc-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors duration-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-4 h-14 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] focus:ring-1 focus:ring-white/20 transition-all duration-300 font-light tracking-widest"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-4 h-4 rounded-[4px] border border-white/20 bg-white/5 checked:bg-white/20 checked:border-white/40 focus:ring-1 focus:ring-white/20 transition-all cursor-pointer"
                  />
                  <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
                  </svg>
                </div>
                <span className="text-sm font-light text-zinc-400 group-hover:text-zinc-300 transition-colors">Remember device</span>
              </label>
              <button
                type="button"
                className="text-sm font-light text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-zinc-100 text-zinc-900 hover:bg-white hover:-translate-y-1 transition-all duration-300 font-medium h-14 rounded-2xl shadow-[0_5px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)] flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-zinc-500 border-t-zinc-900 rounded-full animate-spin" />
                    <span className="text-base tracking-wide">Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-base tracking-wide">
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-zinc-600 font-light">or</span>
            </div>
          </div>

          {/* Guest Access Button */}
          <Button
            onClick={handleGuestAccess}
            variant="ghost"
            className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-zinc-300 hover:bg-white/[0.06] hover:text-white hover:-translate-y-0.5 transition-all duration-300 font-light tracking-wide h-14 rounded-2xl"
          >
            <div className="flex items-center justify-center gap-2">
              <User className="w-5 h-5" />
              Continue as Guest
            </div>
          </Button>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-sm font-light text-zinc-500">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-zinc-300 hover:text-white font-medium transition-colors border-b border-transparent hover:border-white/30 pb-0.5"
              >
                Create one now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
