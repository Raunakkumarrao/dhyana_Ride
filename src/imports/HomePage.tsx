import { useState } from 'react'
import {
  Search, MapPin, Calendar, Star, Shield,
  Zap, CheckCircle, Smartphone, ChevronRight,
  BadgeCheck, Headphones, IndianRupee
} from 'lucide-react'
import BikeCard from '../components/BikeCard'
import Footer from '../components/Footer'
import { testimonials, type Bike, type Page } from '../data'

interface HomePageProps {
  bikes: Bike[]
  onNavigate: (page: Page, bikeId?: string) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
}

const categories = [
  { name: 'Sports Bike', icon: '🏍️', count: 24, color: 'from-red-500 to-rose-600' },
  { name: 'Cruiser', icon: '🛵', count: 18, color: 'from-amber-500 to-orange-600' },
  { name: 'Scooter', icon: '🛺', count: 35, color: 'from-emerald-500 to-teal-600' },
  { name: 'Electric', icon: '⚡', count: 12, color: 'from-blue-500 to-indigo-600' },
  { name: 'Adventure', icon: '🏔️', count: 9, color: 'from-purple-500 to-violet-600' },
]

const features = [
  { icon: IndianRupee, title: 'Affordable Prices', desc: 'Starting at just ₹299/day with no hidden fees', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: BadgeCheck, title: 'Verified Bikes', desc: 'Every bike is inspected and certified before listing', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Shield, title: 'Insurance Included', desc: 'Comprehensive insurance coverage on all rentals', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Headphones, title: '24×7 Support', desc: 'Round-the-clock customer support via call or chat', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Zap, title: 'Instant Booking', desc: 'Confirm your booking in under 60 seconds', color: 'text-rose-600', bg: 'bg-rose-50' },
]

const stats = [
  { value: '50+', label: 'Cities' },
  { value: '12K+', label: 'Bikes Listed' },
  { value: '2.4L+', label: 'Rides Completed' },
  { value: '4.9★', label: 'Average Rating' },
]

export default function HomePage({ bikes, onNavigate, wishlist, onToggleWishlist }: HomePageProps) {
  const [city, setCity] = useState('')
  const [pickup, setPickup] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const featuredBikes = bikes.filter((b) => b.featured).slice(0, 4)
  const displayedBikes = featuredBikes.length > 0 ? featuredBikes : bikes.slice(0, 4)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[88vh] bg-slate-950 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-blue-950/80" />
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5" />
              <span>Book in 60 seconds · No deposit required</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Rent Your Perfect Bike{' '}
              <span className="text-blue-400">Anytime,</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Anywhere
              </span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              Discover verified bikes across 50+ cities. From daily commute to weekend adventures — find your perfect ride in minutes.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="City or location"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pickup date"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    placeholder="Return date"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('bikes')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-600/30"
              >
                <Search className="w-4 h-4" />
                Search Available Bikes
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-6">
              {[
                { icon: CheckCircle, text: 'Free cancellation' },
                { icon: Shield, text: 'Insurance included' },
                { icon: BadgeCheck, text: 'Verified fleet' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">Browse by type</p>
              <h2 className="text-3xl font-bold text-slate-900">Popular Categories</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('bikes')}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => onNavigate('bikes')}
                className="group relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-transparent hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 text-center overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-400">{cat.count} bikes</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bikes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">Handpicked for you</p>
              <h2 className="text-3xl font-bold text-slate-900">Featured Bikes</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('bikes')}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all bikes <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedBikes.map((bike) => (
              <BikeCard
                key={bike._id}
                bike={bike}
                onNavigate={onNavigate}
                wishlisted={wishlist.includes(bike._id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">Our promise</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Dhyana Ride?</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              We've built the infrastructure so your ride is smooth from booking to drop-off.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:shadow-blue-500/8 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">What riders say</p>
            <h2 className="text-3xl font-bold text-slate-900">Loved by thousands</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                    {t.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Smartphone className="w-3.5 h-3.5" /> Now on iOS & Android
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Download the Dhyana Ride app and ride smarter
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Book, track, and manage your rentals from your pocket. Exclusive app-only deals every week.
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-3 bg-white text-slate-900 font-semibold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                  <span className="text-xl">🍎</span>
                  <div className="text-left">
                    <div className="text-xs text-slate-500">Download on</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-white text-slate-900 font-semibold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                  <span className="text-xl">🤖</span>
                  <div className="text-left">
                    <div className="text-xs text-slate-500">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-52 h-96 bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-blue-500/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium opacity-80">Dhyana Ride App</p>
                    <p className="text-xs opacity-50 mt-1">iOS & Android</p>
                  </div>
                </div>
                <div className="absolute -right-8 top-8 w-40 h-72 bg-white/5 backdrop-blur-sm border border-white/15 rounded-[2rem] shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
