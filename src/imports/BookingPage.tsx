import { useState } from 'react'
import {
  MapPin, Calendar, Clock, Tag, ChevronLeft,
  Shield, CheckCircle, CreditCard, Wallet, Smartphone
} from 'lucide-react'
import { type Bike, type Page } from '../data'
import BikeImage from '../components/BikeImage'

interface BookingPageProps {
  bikes: Bike[]
  onNavigate: (page: Page, bikeId?: string) => void
  bikeId: string
  onConfirmBooking: (draft: {
    bikeId: string
    pickup: string
    dates: string
    amount: number
    paymentMethod: string
  }) => void
}

export default function BookingPage({ bikes, onNavigate, bikeId, onConfirmBooking }: BookingPageProps) {
  const bike = bikes.find((b) => b._id === bikeId) || bikes[0]

  const [pickup, setPickup] = useState('')
  const [drop, setDrop] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [pickupTime, setPickupTime] = useState('10:00')
  const [dropTime, setDropTime] = useState('10:00')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000))
    : 1

  const baseTotal = bike.pricePerDay * days
  const discount = couponApplied ? Math.round(baseTotal * 0.1) : 0
  const platformFee = 49
  const grandTotal = baseTotal - discount + platformFee

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'RIDE10') setCouponApplied(true)
    else setError('Use coupon code RIDE10 to apply the discount.')
  }

  const confirmBooking = () => {
    if (!pickup.trim() || !drop.trim()) {
      setError('Please enter pickup and drop locations before confirming.')
      return
    }

    if (!pickupDate || !returnDate) {
      setError('Please select both pickup and return dates.')
      return
    }

    setError('')
    setIsSubmitting(true)
    onConfirmBooking({
      bikeId: bike._id,
      pickup: pickup.trim(),
      dates: `${pickupDate} to ${returnDate}`,
      amount: grandTotal,
      paymentMethod,
    })
  }

  const paymentOptions = [
    { id: 'upi', icon: Smartphone, label: 'UPI', sub: 'GPay, PhonePe, Paytm' },
    { id: 'card', icon: CreditCard, label: 'Card', sub: 'Debit / Credit Card' },
    { id: 'wallet', icon: Wallet, label: 'Wallet', sub: 'Paytm, Amazon Pay' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <button
          onClick={() => onNavigate('bike-detail', bike._id)}
          type="button"
          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to bike details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Complete Your Booking</h1>

            {/* Bike Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
              <div className="w-28 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <BikeImage src={bike.image} alt={`${bike.brand} ${bike.bikeName}`} className="w-full h-full" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{bike.brand}</p>
                <h3 className="font-bold text-slate-900">{bike.bikeName}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{bike.category} · {bike.transmission} · {bike.engine}</p>
                <p className="text-blue-600 font-semibold text-sm mt-1">₹{bike.pricePerDay.toLocaleString()}/day</p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900 mb-4">Location Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1.5">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Enter pickup address"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1.5">Drop Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                    <input
                      type="text"
                      placeholder="Enter drop-off address"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dates & Times */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900 mb-4">Schedule</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1.5">Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1.5">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1.5">Pickup Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1.5">Drop Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="time"
                      value={dropTime}
                      onChange={(e) => setDropTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900 mb-4">Promo Code</h2>
              {couponApplied ? (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">RIDE10 applied — 10% off!</span>
                  <button onClick={() => { setCouponApplied(false); setCoupon('') }} className="ml-auto text-xs text-slate-400 hover:text-slate-600">Remove</button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Enter promo code (try RIDE10)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                    />
                  </div>
                  <button
                    onClick={applyCoupon}
                    type="button"
                    className="px-5 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900 mb-4">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {paymentOptions.map(({ id, icon: Icon, label, sub }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${paymentMethod === id ? 'text-blue-600' : 'text-slate-400'}`} />
                    <p className={`text-sm font-semibold ${paymentMethod === id ? 'text-blue-700' : 'text-slate-700'}`}>{label}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sticky top-24">
              <h2 className="font-semibold text-slate-900 mb-5">Payment Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">₹{bike.pricePerDay.toLocaleString()} × {days} day{days > 1 ? 's' : ''}</span>
                  <span className="text-slate-800 font-medium">₹{baseTotal.toLocaleString()}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600">Promo (RIDE10)</span>
                    <span className="text-emerald-600 font-medium">−₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Platform fee</span>
                  <span className="text-slate-800 font-medium">₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Insurance</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-slate-900 text-lg">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={confirmBooking}
                type="button"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/25 text-base disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing booking...' : `Confirm & Pay ₹${grandTotal.toLocaleString()}`}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Secure payment · SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
