'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AlertCircle, MapPin, Loader2, Check, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PublicResultPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  // Extract ID explicitly and validate integer
  const query = searchParams.get('query')
  const propertyId = Number(query)
  
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!query) return

    const fetchProperty = async () => {
      try {
        setLoading(true)

        if (isNaN(propertyId) || propertyId <= 0) {
          throw new Error("Invalid Property ID. A numeric ID is required.")
        }
        
        console.log("Fetching property ID:", propertyId)
        
        const response = await fetch(`http://127.0.0.1:8000/api/public/properties/${propertyId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        const data = await response.json()

        if (!response.ok) {
          console.error("API Error:", data)
          throw new Error(data.detail || data.message || "Failed to fetch property")
        }

        console.log("Public property API Response:", data)
        setProperty(data.data || data)
      } catch (err: any) {
        console.error(err)
        setError(err.message || 'Property not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [query, propertyId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-slate-400 font-light">Verifying property records...</p>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="flex flex-col items-center gap-4 text-white">
          <AlertCircle className="w-12 h-12 text-red-500/80" />
          <p className="text-red-400 font-medium text-lg">{error || 'Property not found'}</p>
          <Button onClick={() => router.push('/')} variant="ghost" className="mt-4 text-white hover:bg-white/10">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  // Derive simple safe properties based on usual schema mapping
  const propData = property.property || property
  const isEncumbered = property?.encumbrance_status === 'Encumbered'
  const status = property?.encumbrance_status || (isEncumbered ? 'Risk Detected' : 'Clear')

  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Verification Result</h1>
          <p className="text-xl text-slate-400 font-light mb-2">Public overview of requested property</p>
          <p className="text-sm text-slate-500 uppercase tracking-wide">Query / ID: {query}</p>
        </div>

        {/* Global Summary Card */}
        <div className="rounded-3xl border border-white/20 backdrop-blur-xl bg-white/10 p-8 shadow-[0_0_40px_rgba(255,255,255,0.05)] mb-10">
          <div className="flex items-center justify-between">
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
                <h2 className="text-3xl font-bold text-white mb-2">Public Status</h2>
                <p className={`text-2xl font-semibold ${isEncumbered ? 'text-red-300' : 'text-green-300'}`}>
                  {status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-6 hover:bg-white/[0.07] transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Location</h3>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Survey Number</p>
              <p className="text-lg text-white mb-4">{propData.survey_number || 'N/A'}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Village / District</p>
              <p className="text-lg text-white">{propData.village || 'Unknown'}, {propData.district || 'Unknown'}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-6 hover:bg-white/[0.07] transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Details</h3>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Owner Name</p>
              <p className="text-lg text-white mb-4">{propData.current_owner || 'Protected'}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Property Area</p>
              <p className="text-lg text-white">{propData.area_sqft ? propData.area_sqft.toLocaleString() + ' sqft' : 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/10">
           <Button
            onClick={() => router.push('/login')}
            className="bg-white/90 text-slate-900 hover:bg-white transition-all px-8 py-6 rounded-xl font-medium"
          >
            Sign in to view full records
          </Button>
        </div>
      </div>
    </div>
  )
}
