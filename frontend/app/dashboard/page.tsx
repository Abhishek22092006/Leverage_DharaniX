'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()

  const recentSearches = [
    { id: 1, address: '1234 Oak Street, San Francisco', date: 'Feb 15, 2025', owner: 'Smith & Associates LLC' },
    { id: 2, address: '5678 Maple Avenue, Oakland', date: 'Feb 10, 2025', owner: 'Chen Properties Inc' },
    { id: 3, address: '9012 Pine Road, Berkeley', date: 'Feb 5, 2025', owner: 'Bay Area Real Estate Trust' },
    { id: 4, address: '3456 Elm Court, San Jose', date: 'Jan 28, 2025', owner: 'Premier Holdings LLC' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Glass Style */}
      <div className="border-b border-white/10 sticky top-0 backdrop-blur-md bg-background/80 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">LL</span>
            </div>
            <span className="text-lg font-light tracking-wide text-white">LandLedger</span>
          </div>
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="text-slate-300 hover:bg-white/10 hover:text-white text-sm font-light gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 font-light">Your recent property searches and verification history</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="rounded-xl border border-white/20 backdrop-blur-md bg-white/10 p-1.5 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input
              type="text"
              placeholder="Search properties..."
              className="flex-1 bg-transparent text-white placeholder:text-slate-500 text-base font-light outline-none py-2"
            />
            <Button className="bg-white/90 text-slate-900 hover:bg-white rounded-lg mr-1.5 font-light text-sm px-6">
              Search
            </Button>
          </div>
        </div>

        {/* Glass Container with Table */}
        <div className="rounded-2xl border border-white/20 backdrop-blur-md bg-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="border-b border-white/10 px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm font-light text-slate-400">
              <div>Property Address</div>
              <div className="hidden sm:block">Owner</div>
              <div className="hidden sm:block">Search Date</div>
              <div className="text-right">Action</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/10">
            {recentSearches.map((search, idx) => (
              <div
                key={search.id}
                className="px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => router.push(`/result?query=${encodeURIComponent(search.address)}`)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-white font-light">{search.address}</p>
                    <p className="text-xs text-slate-500 sm:hidden mt-1">{search.date}</p>
                  </div>
                  <div className="hidden sm:block text-slate-300 font-light text-sm">{search.owner}</div>
                  <div className="hidden sm:block text-slate-400 font-light text-sm">{search.date}</div>
                  <div className="text-right">
                    <Button
                      variant="ghost"
                      className="text-slate-300 hover:bg-white/20 hover:text-white text-sm font-light"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/result?query=${encodeURIComponent(search.address)}`)
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Search CTA */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => router.push('/')}
            className="bg-white/90 text-slate-900 hover:bg-white font-light gap-2 px-8"
          >
            <Plus className="w-4 h-4" />
            New Search
          </Button>
        </div>
      </div>
    </div>
  )
}
