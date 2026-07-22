import { useState, useEffect } from 'react'
import {
  CheckCircle, Download, LayoutDashboard, Bike,
  MapPin, Calendar, Clock, Tag
} from 'lucide-react'
import type { Bike as BikeType, BookingRecord, Page } from '../data'

interface PaymentSuccessPageProps {
  onNavigate: (page: Page) => void
  booking: BookingRecord | null
  bike: BikeType
}

export default function PaymentSuccessPage({ onNavigate, booking, bike }: PaymentSuccessPageProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  const details = [
    { icon: Bike, label: 'Bike', value: `${bike.brand} ${bike.bikeName}` },
    { icon: MapPin, label: 'Pickup', value: booking?.pickup ?? bike.location },
    { icon: Calendar, label: 'Dates', value: booking?.dates ?? 'Scheduled booking' },
    { icon: Clock, label: 'Pickup Time', value: '10:00 AM' },
    { icon: Tag, label: 'Amount Paid', value: `₹${(booking?.amount ?? bike.pricePerDay).toLocaleString()}` },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-blue-500/10 p-8 max-w-md w-full text-center transition-all duration-700 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Success Icon with rings */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-32 h-32 rounded-full bg-emerald-100/60 animate-ping" />
          <div className="absolute w-24 h-24 rounded-full bg-emerald-100" />
          <div className="relative w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <CheckCircle className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h1>
        <p className="text-slate-500 text-sm mb-2">
          {booking ? 'Your booking has been confirmed and the owner has been notified.' : 'Your booking is ready. You can browse more bikes or return to your dashboard.'}
        </p>

        {/* Booking ID */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 mb-7">
          <span className="text-sm text-blue-500 font-medium">Booking ID</span>
          <span className="text-blue-800 font-bold font-mono tracking-wider">{booking?.id ?? 'RM0000000'}</span>
        </div>

        {/* Details */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-6 space-y-3 text-left">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg border border-slate-100 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-xs text-slate-400">{label}</span>
                <span className="text-sm font-semibold text-slate-800">{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onNavigate('dashboard')}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/25"
          >
            <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
          </button>
          <button type="button" onClick={() => window.print()} className="w-full flex items-center justify-center gap-2 py-3.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Download Invoice
          </button>
          <button
            onClick={() => onNavigate('bikes')}
            type="button"
            className="w-full text-sm text-slate-400 hover:text-slate-600 py-2 transition-colors"
          >
            Explore more bikes →
          </button>
        </div>
      </div>
    </div>
  )
}
