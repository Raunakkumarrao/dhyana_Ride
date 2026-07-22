import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Bike, ArrowRight } from 'lucide-react'
import type { Page } from '../data'

interface LoginPageProps {
  onNavigate: (page: Page) => void
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden flex-col items-center justify-center p-12">
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, white 1.5px, transparent 1.5px)',
            backgroundSize: '36px 36px',
          }}
        />
        {/* Floating cards */}
        <div className="absolute top-16 right-12 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-48 text-white shadow-xl">
          <p className="text-xs font-semibold opacity-70 mb-1">Today's rides</p>
          <p className="text-2xl font-bold">2,847</p>
          <p className="text-xs opacity-60 mt-1">↑ 12% from yesterday</p>
        </div>
        <div className="absolute bottom-24 left-12 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-48 text-white shadow-xl">
          <p className="text-xs font-semibold opacity-70 mb-1">Avg. rating</p>
          <p className="text-2xl font-bold">4.9 ⭐</p>
          <p className="text-xs opacity-60 mt-1">Based on 24k reviews</p>
        </div>

        <div className="relative text-center text-white">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Bike className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Ride further.<br />Live freer.
          </h2>
          <p className="text-blue-100 text-base leading-relaxed max-w-xs mx-auto">
            Join over 500,000 riders who trust Dhyana Ride for their daily adventures across India.
          </p>
          <div className="flex items-center justify-center gap-6 mt-10">
            {[['50+', 'Cities'], ['12K+', 'Bikes'], ['4.9★', 'Rating']].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="text-2xl font-bold">{val}</p>
                <p className="text-xs text-blue-200">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
            <Bike className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg text-slate-900">Ride<span className="text-blue-600">Mate</span></span>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-900 mb-1.5">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to your Dhyana Ride account</p>

          {/* Google */}
          <button type="button" onClick={() => onNavigate('dashboard')} className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors mb-6">
            <span className="text-sm font-bold" style={{color:'#4285F4'}}>G</span>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsSubmitting(true); window.setTimeout(() => onNavigate('dashboard'), 250) }}>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="arjun@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button type="button" onClick={() => onNavigate('signup')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/25 mt-2 disabled:opacity-80"
            >
              {isSubmitting ? 'Signing in...' : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              type="button"
              className="text-blue-600 font-semibold hover:text-blue-700"
            >
              Sign up free
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
