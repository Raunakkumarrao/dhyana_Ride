import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Bike } from 'lucide-react'
import Navbar from './components/Navbar'
import api from './lib/api'
import type {
  Bike as BikeType,
  BookingRecord,
  NotificationRecord,
  Page,
  UserProfile,
} from './data'
import {
  bikes as staticBikes,
  defaultBookings,
  defaultNotifications,
  defaultUserProfile,
} from './data'

// Used only as a safe default before the live bike list has loaded (or if the
// API request fails), so routing and the UI never crash on an empty list.
const bikes = staticBikes

const HomePage = lazy(() => import('./imports/HomePage'))
const BikesPage = lazy(() => import('./imports/BikesPage'))
const BikeDetailPage = lazy(() => import('./imports/BikeDetailPage'))
const BookingPage = lazy(() => import('./imports/BookingPage'))
const DashboardPage = lazy(() => import('./imports/DashboardPage'))
const LoginPage = lazy(() => import('./imports/LoginPage'))
const SignupPage = lazy(() => import('./imports/SignupPage'))
const ProfilePage = lazy(() => import('./imports/ProfilePage'))
const WishlistPage = lazy(() => import('./imports/WishlistPage'))
const PaymentSuccessPage = lazy(() => import('./imports/PaymentSuccessPage'))

type RouteState = {
  page: Page
  bikeId?: string
}

type BookingDraft = {
  bikeId: string
  pickup: string
  dates: string
  amount: number
  status?: BookingRecord['status']
  paymentMethod: string
}

type StoredState = {
  wishlist: string[]
  bookings: BookingRecord[]
  notifications: NotificationRecord[]
  profile: UserProfile
  lastBooking: BookingRecord | null
}

const PAGES_WITHOUT_NAVBAR: Page[] = ['login', 'signup', 'dashboard', 'payment-success']
const STORAGE_KEYS = {
  wishlist: 'ridemate:wishlist',
  bookings: 'ridemate:bookings',
  notifications: 'ridemate:notifications',
  profile: 'ridemate:profile',
  lastBooking: 'ridemate:lastBooking',
} as const

const fallbackState: StoredState = {
  wishlist: [],
  bookings: defaultBookings,
  notifications: defaultNotifications,
  profile: defaultUserProfile,
  lastBooking: null,
}

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function buildPath(route: RouteState) {
  switch (route.page) {
    case 'home':
      return '/'
    case 'bike-detail':
      return `/bike/${route.bikeId ?? bikes[0]._id}`
    case 'booking':
      return `/booking/${route.bikeId ?? bikes[0]._id}`
    case 'bikes':
    case 'dashboard':
    case 'login':
    case 'signup':
    case 'profile':
    case 'wishlist':
    case 'payment-success':
      return `/${route.page}`
    default:
      return '/'
  }
}
function parseRoute(pathname: string): RouteState {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return { page: 'home' }
  }

  if (segments[0] === 'bike') {
    const bikeId = segments[1]
    return {
      page: 'bike-detail',
      bikeId: bikeId || bikes[0]._id,
    }
  }

  if (segments[0] === 'booking') {
    const bikeId = segments[1]
    return {
      page: 'booking',
      bikeId: bikeId || bikes[0]._id,
    }
  }

  const page = segments[0] as Page
  const validPages: Page[] = [
    'home',
    'bikes',
    'bike-detail',
    'booking',
    'dashboard',
    'login',
    'signup',
    'profile',
    'wishlist',
    'payment-success',
  ]

  if (validPages.includes(page)) {
    return { page }
  }

  return { page: 'home' }
}

function createBookingId() {
  return `RM${Date.now().toString().slice(-7)}`
}

function formatBookingDates(dates: string) {
  return dates.trim()
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center space-y-5">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center animate-pulse">
          <Bike className="w-7 h-7 text-blue-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-[0.3em]">Dhyana Ride</p>
          <p className="mt-3 text-white/70">Loading your ride experience...</p>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 animate-[pulse_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseRoute(window.location.pathname))
  // Live bikes fetched from the MongoDB-backed API. Falls back to the static
  // demo list (from data.ts) while loading or if the request fails, so the
  // app stays usable even if the backend is unreachable.
  const [apiBikes, setApiBikes] = useState<BikeType[]>([])
  const liveBikes = apiBikes.length > 0 ? apiBikes : bikes
  const [wishlist, setWishlist] = useState<string[]>(() => readStoredValue(STORAGE_KEYS.wishlist, fallbackState.wishlist))
  const [bookings, setBookings] = useState<BookingRecord[]>(() => readStoredValue(STORAGE_KEYS.bookings, fallbackState.bookings))
  const [notifications, setNotifications] = useState<NotificationRecord[]>(() => readStoredValue(STORAGE_KEYS.notifications, fallbackState.notifications))
  const [profile, setProfile] = useState<UserProfile>(() => readStoredValue(STORAGE_KEYS.profile, fallbackState.profile))
  const [lastBooking, setLastBooking] = useState<BookingRecord | null>(() => readStoredValue(STORAGE_KEYS.lastBooking, fallbackState.lastBooking))

  useEffect(() => {
    const handlePopState = () => setRoute(parseRoute(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    let cancelled = false

    const fetchBikes = async () => {
      try {
        const res = await api.get('/bikes')
        const fetched: BikeType[] = res.data?.data ?? []
        if (!cancelled && fetched.length > 0) {
          setApiBikes(fetched)
        }
      } catch (error) {
        console.error('Failed to load bikes from the API, using demo data instead:', error)
      }
    }

    fetchBikes()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist))
      window.localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings))
      window.localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications))
      window.localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile))
      window.localStorage.setItem(STORAGE_KEYS.lastBooking, JSON.stringify(lastBooking))
    } catch {
      // Ignore storage failures and keep the UI functional.
    }
  }, [bookings, lastBooking, notifications, profile, wishlist])

  useEffect(() => {
    const activeBike = liveBikes.find((bike) => bike._id === route.bikeId) ?? liveBikes[0]
    const pageTitle =
      route.page === 'home'
        ? 'Dhyana Ride | Premium Bike Rentals'
        : route.page === 'bike-detail'
          ? `${activeBike.brand} ${activeBike.bikeName} | Dhyana Ride`
          : route.page === 'booking'
            ? `Book ${activeBike.bikeName} | Dhyana Ride`
            : `${route.page.charAt(0).toUpperCase()}${route.page.slice(1)} | Dhyana Ride`

    document.title = pageTitle
  }, [route, liveBikes])

  const navigate = (target: Page, bikeId?: string) => {
    const nextRoute: RouteState = bikeId === undefined ? { page: target } : { page: target, bikeId }
    window.history.pushState({}, '', buildPath(nextRoute))
    setRoute(nextRoute)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleWishlist = (id: string) => {
    setWishlist((current) => (current.includes(id) ? current.filter((bikeId) => bikeId !== id) : [...current, id]))
  }

  const confirmBooking = (draft: BookingDraft) => {
    const bike = liveBikes.find((item) => item._id === draft.bikeId) ?? liveBikes[0]
    const booking: BookingRecord = {
      id: createBookingId(),
      bikeId: bike._id,
      pickup: draft.pickup || bike.location,
      dates: formatBookingDates(draft.dates),
      amount: draft.amount,
      status: draft.status ?? 'upcoming',
      createdAt: new Date().toISOString(),
    }

    setBookings((current) => [booking, ...current])
    setLastBooking(booking)
    setNotifications((current) => [
      {
        id: `notif-${Date.now()}`,
        type: 'booking',
        title: 'Booking Confirmed',
        desc: `${bike.brand} ${bike.bikeName} is ready for pickup.`,
        time: 'Just now',
        createdAt: new Date().toISOString(),
      },
      ...current,
    ])
    navigate('payment-success')
  }

  const updateProfile = (nextProfile: UserProfile) => {
    setProfile(nextProfile)
    setNotifications((current) => [
      {
        id: `notif-${Date.now() + 1}`,
        type: 'profile',
        title: 'Profile Updated',
        desc: 'Your profile details were saved successfully.',
        time: 'Just now',
        createdAt: new Date().toISOString(),
      },
      ...current,
    ])
  }

  const activeBike = useMemo(
    () => liveBikes.find((bike: BikeType) => bike._id === route.bikeId) ?? liveBikes[0],
    [liveBikes, route.bikeId],
  )

  const showNavbar = !PAGES_WITHOUT_NAVBAR.includes(route.page)

  return (
    <div className="font-sans antialiased min-h-screen bg-white">
      {showNavbar && (
        <Navbar
          onNavigate={navigate}
          currentPage={route.page}
          wishlistCount={wishlist.length}
          transparent={route.page === 'home'}
        />
      )}

      <Suspense fallback={<PageLoader />}>
        {route.page === 'home' && (
          <HomePage
            bikes={liveBikes}
            onNavigate={navigate}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
          />
        )}

        {route.page === 'bikes' && (
          <div className="pt-16">
            <BikesPage
              bikes={liveBikes}
              onNavigate={navigate}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          </div>
        )}

        {route.page === 'bike-detail' && (
          <BikeDetailPage
            bikes={liveBikes}
            onNavigate={navigate}
            bikeId={activeBike._id}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
          />
        )}

        {route.page === 'booking' && (
          <BookingPage
            bikes={liveBikes}
            onNavigate={navigate}
            bikeId={activeBike._id}
            onConfirmBooking={confirmBooking}
          />
        )}

        {route.page === 'dashboard' && (
          <DashboardPage
            bikes={liveBikes}
            onNavigate={navigate}
            bookings={bookings}
            notifications={notifications}
            profile={profile}
          />
        )}

        {route.page === 'login' && <LoginPage onNavigate={navigate} />}
        {route.page === 'signup' && <SignupPage onNavigate={navigate} />}

        {route.page === 'profile' && (
          <ProfilePage
            onNavigate={navigate}
            profile={profile}
            onSaveProfile={updateProfile}
          />
        )}

        {route.page === 'wishlist' && (
          <div className="pt-16">
            <WishlistPage
              bikes={liveBikes}
              onNavigate={navigate}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          </div>
        )}

        {route.page === 'payment-success' && (
          <PaymentSuccessPage
            onNavigate={navigate}
            booking={lastBooking}
            bike={lastBooking ? liveBikes.find((bike) => bike._id === lastBooking.bikeId) ?? liveBikes[0] : activeBike}
          />
        )}
      </Suspense>
    </div>
  )
}
