'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Check, AlertCircle, MapPin, User, Activity, Shield, ShieldIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ResultPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('query') || 'Unknown Property'
  
  // Status logic: if query includes 'risk' -> Encumbered (red), else Clear (green)
  const isEncumbered = query.toLowerCase().includes('risk')
  const status = isEncumbered ? 'Encumbered' : 'Clear'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0F19' }}>
      {/* Global Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* SECTION 1 - HEADER */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Property Report
              </h1>
              <p className="text-xl text-slate-400 font-light mb-2">
                Comprehensive ownership and encumbrance analysis
              </p>
              <p className="text-sm text-slate-500 uppercase tracking-wide">
                Property ID: {query}
              </p>
            </div>
            
            {/* Status Badge */}
            <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-200 ${
              isEncumbered 
                ? 'bg-red-500/20 border border-red-500/50' 
                : 'bg-green-500/20 border border-green-500/50'
            }`}>
              {isEncumbered ? (
                <AlertCircle className="w-6 h-6 text-red-400" />
              ) : (
                <Check className="w-6 h-6 text-green-400" />
              )}
              <span className={`text-lg font-medium ${
                isEncumbered ? 'text-red-300' : 'text-green-300'
              }`}>
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2 - MAIN HERO CARD */}
        <div className="mb-12">
          <div className="rounded-3xl border border-white/20 backdrop-blur-xl bg-white/10 p-8 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.08)] transition-all duration-200 hover:translate-y-[-3px]">
            <div className="flex items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center gap-8">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                  isEncumbered ? 'bg-red-500/20' : 'bg-green-500/20'
                }`}>
                  {isEncumbered ? (
                    <AlertCircle className="w-10 h-10 text-red-400" />
                  ) : (
                    <Check className="w-10 h-10 text-green-400" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Verification Status
                  </h2>
                  <p className={`text-2xl font-semibold ${
                    isEncumbered ? 'text-red-300' : 'text-green-300'
                  }`}>
                    {isEncumbered ? 'Risk Detected' : 'Verified'}
                  </p>
                </div>
              </div>

              {/* Right Side - Description */}
              <div className="max-w-lg text-right">
                <p className="text-lg text-slate-300 font-light">
                  {isEncumbered 
                    ? 'Potential encumbrances detected. Review detailed financial records and verify ownership chain.'
                    : 'Property records verified successfully. No issues found in ownership or encumbrance history.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 - GRID LAYOUT */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Overview Card */}
          <div className="rounded-2xl border border-white/20 backdrop-blur-xl bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-xl hover:translate-y-[-3px] transition-all duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Overview</h3>
            </div>
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-6">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Property ID</p>
                <p className="text-lg font-medium text-white">{query}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Location</p>
                <p className="text-lg font-medium text-white">Pune, Maharashtra</p>
              </div>
            </div>
          </div>

          {/* Ownership Card */}
          <div className="rounded-2xl border border-white/20 backdrop-blur-xl bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-xl hover:translate-y-[-3px] transition-all duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <User className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Ownership</h3>
            </div>
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-6">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Owner</p>
                <p className="text-lg font-medium text-white">Rohit Sharma</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Last Sale</p>
                <p className="text-lg font-medium text-white">2021</p>
              </div>
            </div>
          </div>

          {/* Encumbrance Card */}
          <div className="rounded-2xl border border-white/20 backdrop-blur-xl bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-xl hover:translate-y-[-3px] transition-all duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Encumbrance</h3>
            </div>
            
            {isEncumbered ? (
              <div className="space-y-4">
                <div className="border border-red-500/30 rounded-xl p-4 bg-red-500/10">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-lg font-medium text-white mb-2">Home Loan</p>
                      <p className="text-sm text-slate-400 mb-3">State Bank of India</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-red-300">25,00,000</span>
                        <span className="text-sm text-red-400 bg-red-500/20 px-3 py-1 rounded-lg">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-lg font-medium text-white mb-2">No encumbrances found</p>
                <p className="text-sm text-slate-400">Property is free of liens and loans</p>
              </div>
            )}
          </div>

          {/* Activity Timeline Card */}
          <div className="rounded-2xl border border-white/20 backdrop-blur-xl bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-xl hover:translate-y-[-3px] transition-all duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {[
                { date: '2024', event: 'Property tax paid', status: 'completed' },
                { date: '2023', event: 'Ownership verification', status: 'completed' },
                { date: '2021', event: 'Property registered', status: 'completed' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-white">{item.event}</p>
                    <p className="text-sm text-slate-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => router.push('/')}
            className="glass-button bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 font-light px-8 py-3"
          >
            New Search
          </Button>
          <Button 
            className="bg-white/90 text-slate-900 hover:bg-white hover:scale-105 transition-all duration-200 font-light px-8 py-3"
          >
            Download Report
          </Button>
        </div>
      </div>
    </div>
  )
}
