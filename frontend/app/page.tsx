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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      {/* Background Image - Fixed Full Screen */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/hero-bg.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      
      {/* Dark Overlay - 60% opacity */}
      <div className="fixed inset-0 bg-black/60 -z-10" />

      {/* Centered Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        {/* Glassmorphism Container - Centered & Compact */}
        <div className="w-full max-w-2xl md:max-w-3xl mx-auto">
          <div
            className="w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_10px_50px_rgba(0,0,0,0.5)] p-6 md:p-8"
          >
              {/* Navbar Inside Glass */}
              <nav className="flex items-center justify-between mb-12 sm:mb-16">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <ShieldIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-light tracking-wide text-white">
                    DharaniX
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/login')}
                  className="text-white hover:bg-white/20 text-sm font-light"
                >
                  Sign In
                </Button>
              </nav>

              {/* Main Content - Centered */}
              <div className="text-center space-y-8">
                {/* Heading - Large & Bold */}
                <div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-tight">
                    Verify Land Ownership Instantly
                  </h1>
                  <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed max-w-xl mx-auto">
                    Check ownership records and identify encumbrances in seconds. Built for modern real estate professionals.
                  </p>
                </div>

                {/* Search Bar - Glass Style */}
                <div className="pt-6">
                  <form onSubmit={handleSearch} className="w-full">
                    <div
                      className={`relative flex items-center gap-3 px-5 py-4 rounded-xl bg-white/8 border transition-all duration-300 ${
                        isSearchFocused
                          ? 'border-white/40 bg-white/12'
                          : 'border-white/20'
                      }`}
                    >
                      <Search className="w-5 h-5 text-slate-300 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Enter property address or parcel ID..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="flex-1 bg-transparent text-white placeholder:text-slate-400 text-base font-light outline-none"
                      />
                      <Button
                        type="submit"
                        className="bg-white/90 text-slate-900 hover:bg-white rounded-lg px-8 font-medium text-sm flex-shrink-0 transition-colors"
                      >
                        Search
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Feature Indicators */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-slate-300" />
                    <span>Instant verification</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <ShieldIcon className="w-4 h-4 text-slate-300" />
                    <span>Secure records</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
