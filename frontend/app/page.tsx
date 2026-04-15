'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, CheckCircle2, Shield as ShieldIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandLedgerLanding() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/result?query=${encodeURIComponent(searchValue)}`)
    }
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
        {/* Dark overlay 65% */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Gradient overlay for depth (Transparent at top, dark at bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505]" />
      </div>

      {/* 3. DEPTH: Glow Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[60%] w-[80vw] max-w-[800px] h-[500px] bg-blue-500/20 blur-[130px] rounded-[100%] z-0 pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[40%] w-[80vw] max-w-[800px] h-[500px] bg-purple-500/20 blur-[140px] rounded-[100%] z-0 pointer-events-none mix-blend-screen" />

      {/* Foreground Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center min-h-screen">
        
        {/* 2. GLASS CONTAINER */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 sm:p-12 md:p-16 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Subtle inner top highlight to enhance 3D glass edge */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Navbar inside glass */}
            <nav className="flex items-center justify-between mb-16 relative z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner">
                  <ShieldIcon className="w-5 h-5 text-zinc-100" />
                </div>
                <span className="text-xl font-light tracking-widest text-zinc-100 uppercase">
                  DharaniX
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
                className="text-zinc-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium tracking-wide rounded-lg px-6"
              >
                Sign In
              </Button>
            </nav>

            {/* Main Content */}
            <div className="text-center space-y-10 relative z-20">
              
              {/* 5. TYPOGRAPHY */}
              <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 leading-[1.1] pb-2 drop-shadow-sm">
                  Verify Land Ownership Instantly
                </h1>
                <p className="text-lg sm:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
                  Check ownership records and identify encumbrances in seconds.<br className="hidden sm:block" />Built for modern real estate professionals.
                </p>
              </div>

              {/* 4. SEARCH BAR */}
              <div className="pt-2">
                <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
                  <div
                    className={`relative flex items-center gap-4 p-2 sm:p-3 rounded-2xl bg-white/[0.03] backdrop-blur-xl border transition-all duration-500 ease-out ${
                      isSearchFocused
                        ? 'border-white/30 shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] ring-1 ring-white/20'
                        : 'border-white/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    <div className="pl-4 hidden sm:flex">
                      <Search className={`w-5 h-5 transition-colors duration-300 ${isSearchFocused ? 'text-zinc-300' : 'text-zinc-500'}`} />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter property address or parcel ID..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="flex-1 w-full bg-transparent text-zinc-100 placeholder:text-zinc-600 text-base sm:text-lg font-light outline-none transition-all px-4 sm:px-0"
                    />
                    <Button
                      type="submit"
                      className="bg-zinc-100 text-zinc-900 hover:bg-white rounded-xl px-6 sm:px-8 py-6 h-auto font-medium text-sm sm:text-base flex-shrink-0 transition-all duration-300 shadow-[0_5px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:-translate-y-1"
                    >
                      Search
                    </Button>
                  </div>
                </form>
              </div>

              {/* Feature Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-3 text-sm text-zinc-400 bg-black/20 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-md shadow-inner">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400/80" />
                  <span className="font-light tracking-wide uppercase text-xs">Instant verification</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400 bg-black/20 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-md shadow-inner">
                  <ShieldIcon className="w-4 h-4 text-indigo-400/80" />
                  <span className="font-light tracking-wide uppercase text-xs">Secure records</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
