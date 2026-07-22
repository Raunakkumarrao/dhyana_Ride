import { useState, useEffect } from 'react'
import { Bike, Menu, X, Heart, User } from 'lucide-react'
import type { Page } from '../data'

interface NavbarProps {
  onNavigate: (page: Page) => void
  currentPage: Page
  wishlistCount: number
  transparent?: boolean
}

const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Bikes', page: 'bikes' },
  { label: 'Dashboard', page: 'dashboard' },
]

export default function Navbar({ onNavigate, currentPage, wishlistCount, transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const solidBg = !transparent || scrolled || mobileOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 shrink-0"
            aria-label="Go to home"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Bike className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className={`font-bold text-lg ${solidBg ? 'text-slate-900' : 'text-white'}`}>
              Dhyana <span className="text-blue-500">Ride</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600/10 text-blue-600'
                    : solidBg
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <button
              onClick={() => onNavigate('wishlist')}
              aria-label="View wishlist"
              className={`relative p-2 rounded-xl transition-colors ${
                solidBg ? 'text-slate-600 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('profile')}
              aria-label="View profile"
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                solidBg ? 'text-slate-700 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>

            <button
              onClick={() => onNavigate('login')}
              aria-label="Log in"
              className={`hidden sm:block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                solidBg
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Login
            </button>

            <button
              onClick={() => onNavigate('signup')}
              className="hidden sm:block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
            >
              Sign Up
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                solidBg ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-1">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => { onNavigate(page); setMobileOpen(false) }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate('profile'); setMobileOpen(false) }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Profile
          </button>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => { onNavigate('login'); setMobileOpen(false) }}
              className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700"
            >
              Login
            </button>
            <button
              onClick={() => { onNavigate('signup'); setMobileOpen(false) }}
              className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
