import { useMemo, useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  Bell,
  User,
  LogOut,
  Bike,
  TrendingUp,
  IndianRupee,
  Calendar,
  ChevronRight,
  Menu,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Sparkles,
} from 'lucide-react'
import type { BookingRecord, NotificationRecord, Page, UserProfile } from '../data'
import BikeImage from '../components/BikeImage'

interface DashboardPageProps {
  bikes: Bike[]
  onNavigate: (page: Page) => void
  bookings: BookingRecord[]
  notifications: NotificationRecord[]
  profile: UserProfile
}

type Tab = 'dashboard' | 'bookings' | 'notifications'

const statusConfig = {
  active: { label: 'Active', bg: 'bg-blue-100', text: 'text-blue-700' },
  upcoming: { label: 'Upcoming', bg: 'bg-amber-100', text: 'text-amber-700' },
  completed: { label: 'Completed', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-700' },
} as const

export default function DashboardPage({ bikes, onNavigate, bookings, notifications, profile }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems: { tab: Tab; icon: typeof LayoutDashboard; label: string }[] = [
    { tab: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { tab: 'bookings', icon: BookOpen, label: 'My Bookings' },
    { tab: 'notifications', icon: Bell, label: 'Notifications' },
  ]

  const orderedBookings = useMemo(
    () => [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [bookings],
  )

  const recentBookings = orderedBookings.slice(0, 4)
  const activeRentals = bookings.filter((booking) => booking.status === 'active').length
  const upcomingBookings = bookings.filter((booking) => booking.status === 'upcoming').length
  const totalSpent = bookings.reduce((sum, booking) => sum + booking.amount, 0)
  const totalRides = bookings.length

  const summaryCards = [
    { label: 'Active Rentals', value: activeRentals.toString(), icon: Bike, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Upcoming Bookings', value: upcomingBookings.toString(), icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Total Rides', value: totalRides.toString(), icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
  ]

  const ProfileSummary = () => (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center shrink-0 text-blue-600 font-bold">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            profile.name.charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 text-sm truncate">{profile.name}</p>
          <p className="text-xs text-slate-400 truncate">{profile.email}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 left-0 h-full lg:h-screen w-64 bg-white border-r border-slate-100 z-40 transition-transform duration-300 flex flex-col`}
      >
        <div className="px-6 py-5 border-b border-slate-100">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
            type="button"
            aria-label="Go to home"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <Bike className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-slate-900">Ride<span className="text-blue-600">Mate</span></span>
          </button>
        </div>

        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 overflow-hidden">
              {profile.avatar ? <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" /> : profile.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 text-sm truncate">{profile.name}</p>
              <p className="text-xs text-slate-400 truncate">{profile.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          {navItems.map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSidebarOpen(false) }}
              type="button"
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${activeTab === tab ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}

          <div className="mt-4 space-y-1">
            <button
              onClick={() => onNavigate('wishlist')}
              type="button"
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <Heart className="w-4 h-4" />
              Wishlist
            </button>
            <button
              onClick={() => onNavigate('profile')}
              type="button"
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <User className="w-4 h-4" />
              Profile
            </button>
          </div>
        </nav>

        <div className="p-3 border-t border-slate-100">
          <button
            onClick={() => onNavigate('login')}
            type="button"
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-slate-900 capitalize">{activeTab === 'dashboard' ? 'Dashboard' : navItems.find((item) => item.tab === activeTab)?.label}</h1>
              <p className="text-xs text-slate-400">Welcome back, {profile.name.split(' ')[0]}!</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('bikes')}
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Bike className="w-4 h-4" /> Rent a Bike
          </button>
        </header>

        <main className="p-4 sm:p-8">
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {summaryCards.map(({ label, value, icon: Icon, color, bg, border }) => (
                  <div key={label} className={`bg-white rounded-2xl border ${border} p-5`}>
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-5">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900">Recent Bookings</h2>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    type="button"
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {recentBookings.length === 0 ? (
                  <div className="px-6 py-10 text-center text-sm text-slate-500">No bookings yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          {['Booking ID', 'Bike', 'Location', 'Dates', 'Amount', 'Status'].map((heading) => (
                            <th key={heading} className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{heading}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {recentBookings.map((booking) => {
                          const bike = bikes.find((item) => item._id === booking.bikeId) ?? bikes[0]
                          const status = statusConfig[booking.status]
                          return (
                            <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4 text-sm font-medium text-blue-600">{booking.id}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                    <BikeImage src={bike.image} alt={`${bike.brand} ${bike.bikeName}`} className="w-full h-full" />
                                  </div>
                                  <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{bike.bikeName}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{booking.pickup}</td>
                              <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{booking.dates}</td>
                              <td className="px-6 py-4 text-sm font-semibold text-slate-800">₹{booking.amount.toLocaleString()}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>{status.label}</span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {orderedBookings.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500">No bookings found.</div>
              ) : (
                orderedBookings.map((booking) => {
                  const bike = bikes.find((item) => item._id === booking.bikeId) ?? bikes[0]
                  const status = statusConfig[booking.status]
                  return (
                    <div key={booking.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <BikeImage src={bike.image} alt={`${bike.brand} ${bike.bikeName}`} className="w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">{bike.bikeName}</p>
                            <p className="text-xs text-blue-600 font-medium mt-0.5">#{booking.id}</p>
                          </div>
                          <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                          <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{booking.pickup}</div>
                          <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{booking.dates}</div>
                          <div className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />₹{booking.amount.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-3 max-w-2xl">
              {notifications.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500">No notifications yet.</div>
              ) : (
                notifications.map((notification) => {
                  const iconMap = {
                    booking: CheckCircle,
                    payment: Sparkles,
                    reminder: AlertCircle,
                    profile: User,
                  } as const
                  const colors = {
                    booking: 'text-emerald-500',
                    payment: 'text-violet-500',
                    reminder: 'text-amber-500',
                    profile: 'text-blue-500',
                  } as const
                  const NotificationIcon = iconMap[notification.type]
                  return (
                    <div key={notification.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        <NotificationIcon className={`w-5 h-5 ${colors[notification.type]}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 text-sm">{notification.title}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{notification.desc}</p>
                        <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />{notification.time}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          <div className="mt-8 lg:hidden">
            <ProfileSummary />
          </div>
        </main>
      </div>
    </div>
  )
}
