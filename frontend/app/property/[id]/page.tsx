'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Check, AlertCircle, MapPin, User, Activity, Shield, ShieldIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [property, setProperty] = useState<any>(null)
  const [deeds, setDeeds] = useState<any[]>([])
  const [encumbrances, setEncumbrances] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    deed_type: '',
    execution_date: '',
    registration_number: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editError, setEditError] = useState('')
  const [editData, setEditData] = useState({
    survey_number: '',
    village: '',
    district: '',
    area_sqft: 0,
    current_owner: ''
  })

  useEffect(() => {
    if (!id) return

    const fetchProperty = async () => {
      try {
        setIsLoading(true)
        console.log("Property ID:", id)
        const response = await fetch(`http://127.0.0.1:8000/api/properties/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })

        const data = await response.json()
        console.log("Property Data:", data)

        if (!response.ok) {
          throw new Error(data.detail || data.message || "Failed to fetch property")
        }

        setProperty(data.data || data)
        const p = (data.data?.property) || data?.property || data.data || data
        setEditData({
          survey_number: p.survey_number || '',
          village: p.village || '',
          district: p.district || '',
          area_sqft: p.area_sqft || 0,
          current_owner: p.current_owner || ''
        })
      } catch (err: any) {
        setError(err.message || 'Property not found')
      } finally {
        setIsLoading(false)
      }
    }

    const fetchDeeds = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/properties/${id}/deeds`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })

        const data = await response.json()
        console.log("Deeds:", data)

        if (!response.ok) {
          throw new Error(data.detail || data.message || "Failed to fetch deeds")
        }

        setDeeds(data.data || data)
      } catch (err) {
        console.error("Failed to load deeds:", err)
      }
    }

    const fetchEncumbrances = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/properties/${id}/encumbrances`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          }
        )

        const data = await response.json()
        console.log("Encumbrances:", data)

        if (!response.ok) {
          throw new Error(data.detail || data.message || "Failed to fetch encumbrances")
        }

        setEncumbrances(data.data || data)
      } catch (err) {
        console.error("Failed to load encumbrances:", err)
      }
    }

    fetchProperty()
    fetchDeeds()
    fetchEncumbrances()
  }, [id])

  const handleUpdate = async () => {
    try {
      setIsUpdating(true)
      setEditError('')

      const response = await fetch(`http://127.0.0.1:8000/api/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          survey_number: editData.survey_number,
          village: editData.village,
          district: editData.district,
          area_sqft: Number(editData.area_sqft),
          current_owner: editData.current_owner
        })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to update property")
      }

      console.log("Updated property:", data)

      // Merge into core state safely
      setProperty((prev: any) => ({
        ...prev,
        property: data.data || data // Assume endpoints nested the update payload
      }))
      
      setIsEditing(false)
    } catch (err: any) {
      console.error(err)
      setEditError(err.message || "Update failed")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeedSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      setSubmitError('')

      const response = await fetch(`http://127.0.0.1:8000/api/properties/${id}/deeds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to create deed")
      }

      console.log("Deed created:", data)

      // Reset form
      setFormData({
        deed_type: '',
        execution_date: '',
        registration_number: ''
      })

      // Refetch deeds to update UI
      const deedsRes = await fetch(`http://127.0.0.1:8000/api/properties/${id}/deeds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      const deedsData = await deedsRes.json()
      if (deedsRes.ok) setDeeds(deedsData.data || deedsData)

    } catch (err: any) {
      console.error(err)
      setSubmitError(err.message || "Failed to save deed")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-slate-400 font-light">Loading property records...</p>
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
          <Button onClick={() => router.push('/dashboard')} variant="ghost" className="mt-4 text-white hover:bg-white/10">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const isEncumbered = encumbrances.length > 0
  const status = isEncumbered ? 'Encumbered' : 'Clear'
  const propData = property?.property || property || {}

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
                Property ID: {propData?.survey_number || id}
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
          <div className="rounded-2xl border border-white/20 backdrop-blur-xl bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-xl hover:translate-y-[-3px] transition-all duration-200 relative">
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)} 
                variant="ghost" 
                className="absolute top-4 right-4 text-xs text-white hover:bg-white/20 px-3 py-1 bg-white/10"
              >
                Edit details
              </Button>
            )}
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Overview</h3>
            </div>
            
            {editError && isEditing && (
              <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg mb-4">{editError}</p>
            )}

            <div className="space-y-6">
              <div className="border-b border-white/10 pb-6">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Survey Number</p>
                {isEditing ? (
                  <input 
                    type="text"
                    value={editData.survey_number}
                    onChange={(e) => setEditData({...editData, survey_number: e.target.value})}
                    className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-white"
                  />
                ) : (
                  <p className="text-lg font-medium text-white">{propData?.survey_number || 'N/A'}</p>
                )}
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Village</p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={editData.village}
                        onChange={(e) => setEditData({...editData, village: e.target.value})}
                        className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-white"
                      />
                    ) : (
                      <p className="text-lg font-medium text-white">{propData?.village || 'Unknown'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">District</p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={editData.district}
                        onChange={(e) => setEditData({...editData, district: e.target.value})}
                        className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-white"
                      />
                    ) : (
                      <p className="text-lg font-medium text-white">{propData?.district || 'Unknown'}</p>
                    )}
                  </div>
                </div>
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
                {isEditing ? (
                  <input 
                    type="text"
                    value={editData.current_owner}
                    onChange={(e) => setEditData({...editData, current_owner: e.target.value})}
                    className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-white"
                  />
                ) : (
                  <p className="text-lg font-medium text-white">{propData?.current_owner || 'N/A'}</p>
                )}
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Area (Sqft)</p>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="number"
                      value={editData.area_sqft}
                      onChange={(e) => setEditData({...editData, area_sqft: Number(e.target.value) || 0})}
                      className="w-1/2 bg-black/30 border border-white/20 rounded px-3 py-2 text-white"
                    />
                    <span className="text-slate-400">sqft</span>
                  </div>
                ) : (
                  <p className="text-lg font-medium text-white">{propData?.area_sqft ? propData.area_sqft.toLocaleString() : 'N/A'} sqft</p>
                )}
              </div>
            </div>
            
            {/* Save Actions */}
            {isEditing && (
              <div className="mt-8 flex gap-3 pb-2">
                <Button 
                  onClick={handleUpdate} 
                  disabled={isUpdating}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save Changes
                </Button>
                <Button 
                  onClick={() => setIsEditing(false)} 
                  disabled={isUpdating}
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Encumbrance Card */}
          <div className="rounded-2xl border border-white/20 backdrop-blur-xl bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-xl hover:translate-y-[-3px] transition-all duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Encumbrance</h3>
            </div>
            
            {isEncumbered && encumbrances.length > 0 ? (
              <div className="space-y-4">
                {encumbrances.map((enc: any, idx: number) => (
                  <div key={idx} className="border border-red-500/30 rounded-xl p-4 bg-red-500/10">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-lg font-medium text-white mb-2">{enc.enc_type}</p>
                        <p className="text-sm text-slate-400 mb-3">{enc.description || 'Unknown details'}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-semibold text-red-300">
                            {enc.amount ? `₹${enc.amount.toLocaleString()}` : ''}
                          </span>
                          <span className="text-sm text-red-400 bg-red-500/20 px-3 py-1 rounded-lg">{enc.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
              {deeds.length > 0 ? (
                deeds.map((deed: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-white">{deed.deed_type}</p>
                      <p className="text-sm text-slate-500">Exec: {deed.execution_date || 'Unknown'} | Reg: {deed.registration_number || 'N/A'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic">No deed activities recorded.</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 4 - REGISTER NEW DEED */}
        <div className="mb-12">
          <div className="rounded-2xl border border-white/20 backdrop-blur-xl bg-white/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <h3 className="text-2xl font-semibold text-white mb-6">Register New Deed</h3>
            <form onSubmit={handleDeedSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Deed Type</label>
                  <input
                    type="text"
                    required
                    value={formData.deed_type}
                    onChange={(e) => setFormData({ ...formData, deed_type: e.target.value })}
                    placeholder="e.g. Sale Deed"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Registration Number</label>
                  <input
                    type="text"
                    required
                    value={formData.registration_number}
                    onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                    placeholder="e.g. REG-12345"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Execution Date</label>
                  <input
                    type="date"
                    required
                    value={formData.execution_date}
                    onChange={(e) => setFormData({ ...formData, execution_date: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>
              
              {submitError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {submitError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black hover:bg-slate-200 font-medium px-8 py-3 rounded-xl transition-all"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-black" /> : 'Add Deed'}
              </Button>
            </form>
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
