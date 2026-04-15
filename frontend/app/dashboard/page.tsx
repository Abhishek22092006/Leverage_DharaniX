'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Plus, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()

  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("http://127.0.0.1:8000/api/properties/search?limit=10", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })

        const data = await response.json()
        console.log("Properties API Response:", data)

        if (!response.ok) {
          throw new Error(data.detail || data.message || "Failed to fetch properties")
        }

        setResults(data.items || data.data?.items || data)
      } catch (err: unknown) {
        console.error(err)
        setError(err instanceof Error ? err.message : 'Failed to load properties')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const handleSearch = async () => {
    if (!searchValue.trim()) return

    setIsLoading(true)
    setError('')
    console.log("Search query:", searchValue)

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/properties/search?query=${encodeURIComponent(searchValue)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      const data = await response.json()
      console.log("Search results:", data)

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Search failed")
      }

      // the backend format has items array inside data: { items: [], page... }
      // but user says "setResults(data)" -> I will adapt just in case both might occur:
      setResults(data.items || data.data?.items || data)

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full relative bg-black font-sans">
      {/* 1. BACKGROUND (Cinematic Image + Overlays) */}
      <div className="fixed inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          className="w-full h-full object-cover opacity-90 object-center"
          alt=""
        />
        {/* Dark overlay 65% */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505]" />
      </div>

      {/* 2. DEPTH: Glow Lights */}
      <div className="fixed top-1/2 left-1/2 -translate-x-[40%] -translate-y-[60%] w-[80vw] max-w-[800px] h-[500px] bg-blue-500/20 blur-[130px] rounded-[100%] z-0 pointer-events-none mix-blend-screen" />
      <div className="fixed top-1/2 left-1/2 -translate-x-[60%] -translate-y-[40%] w-[80vw] max-w-[800px] h-[500px] bg-purple-500/20 blur-[140px] rounded-[100%] z-0 pointer-events-none mix-blend-screen" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header - Glass Style */}
        <div className="border-b border-white/10 sticky top-0 backdrop-blur-3xl bg-white/[0.02] z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner">
                <span className="text-sm font-semibold text-zinc-100 uppercase tracking-widest">DX</span>
              </div>
              <span className="text-xl font-light tracking-widest text-zinc-100 uppercase">DharaniX</span>
            </div>
            <Button
              onClick={() => router.push('/')}
              variant="ghost"
              className="text-zinc-400 hover:bg-white/10 hover:text-white text-sm font-light gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Main Dashboard Glass Container */}
          <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 sm:p-12 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Subtle inner top highlight to enhance 3D glass edge */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Welcome Section */}
            <div className="mb-10">
              <h1 className="text-3xl font-light text-zinc-100 tracking-wide mb-2">Welcome Back</h1>
              <p className="text-zinc-400 font-light text-lg">Your recent property searches and verification history</p>
            </div>

            {/* Search Bar */}
            <div className="mb-10">
              <div className="rounded-2xl border border-white/10 md:bg-white/[0.05] bg-white/[0.02] p-1.5 flex items-center gap-3 shadow-inner hover:bg-white/[0.08] transition-colors relative">
                <Search className="w-5 h-5 text-zinc-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent text-white placeholder:text-zinc-500 text-base font-light outline-none py-3"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-zinc-100 text-zinc-900 hover:bg-white rounded-xl mr-1.5 font-medium text-sm px-6 h-11 transition-all hover:scale-[1.02]"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
                </Button>
              </div>
              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 mt-4">
                  {error}
                </p>
              )}
            </div>

            {/* Glass Container with Table */}
            <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden shadow-inner">
              {/* Table Header */}
              <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm font-light text-zinc-400 tracking-wide">
                  <div>Property Address</div>
                  <div className="hidden sm:block">Owner</div>
                  <div className="hidden sm:block">Search Date</div>
                  <div className="text-right">Action</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-white/10">
                {results.length > 0 ? (
                  results.map((search, idx) => (
                    <div
                      key={search.id || idx}
                      className="px-6 py-5 hover:bg-white/[0.04] transition-colors cursor-pointer group"
                      onClick={() => router.push(`/property/${search.id}`)}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="text-zinc-100 font-light group-hover:text-white transition-colors">{search.survey_number || search.address}</p>
                          <p className="text-xs text-zinc-500 sm:hidden mt-1">{search.village || search.date}</p>
                        </div>
                        <div className="hidden sm:block text-zinc-300 font-light text-sm">{search.owner_name || search.current_owner || search.owner}</div>
                        <div className="hidden sm:block text-zinc-400 font-light text-sm">{search.village || search.date}</div>
                        <div className="text-right">
                          <Button
                            variant="ghost"
                            className="text-zinc-400 hover:bg-white/10 hover:text-white text-sm font-light transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/property/${search.id}`)
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-zinc-400 font-light text-sm">
                    {isLoading ? 'Searching...' : 'No properties found. Enter a search query to begin.'}
                  </div>
                )}
              </div>
            </div>

            {/* New Search CTA */}
            <div className="mt-12 text-center">
              <Button
                onClick={() => router.push('/')}
                className="bg-zinc-100 text-zinc-900 hover:bg-white font-medium gap-2 px-8 py-6 rounded-xl hover:-translate-y-1 transition-all shadow-[0_5px_20px_rgba(255,255,255,0.15)]"
              >
                <Plus className="w-4 h-4 ml-[-4px]" />
                New Search
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
