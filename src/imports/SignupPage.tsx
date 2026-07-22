import { useState } from 'react'
import {
  User, Mail, Phone, Lock, Eye, EyeOff, Upload,
  Bike, ArrowRight, CheckCircle
} from 'lucide-react'
import type { Page } from '../data'

interface SignupPageProps {
  onNavigate: (page: Page) => void
}

export default function SignupPage({ onNavigate }: SignupPageProps) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: ''
  })
  const [showPass, setShowPass] = useState(false)
  const [licenseUploaded, setLicenseUploaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const passwordStrength = () => {
    const p = form.password
    if (p.length === 0) return 0
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  }

  const strengthColors = ['bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-emerald-400']
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong']
  const strength = passwordStrength()

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-slate-950 to-blue-950 relative overflow-hidden flex-col items-center justify-center p-12">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative text-center text-white">
          <div className="w-20 h-20 bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Bike className="w-10 h-10 text-blue-300" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Join 5 lakh+ riders</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-10">
            Create your free account and start riding in minutes. No hidden fees, no surprises.
          </p>
          {[
            'Free cancellation up to 24 hours',
            'Insurance included on every ride',
            'Verified & inspected bikes',
            '24×7 roadside assistance',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 mb-3 text-left">
              <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-white overflow-y-auto">
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
            <Bike className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg text-slate-900">Ride<span className="text-blue-600">Mate</span></span>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm mb-8">Start your riding journey today</p>

          {/* Google */}
          <button type="button" onClick={() => onNavigate('dashboard')} className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors mb-6">
            <span className="text-sm font-bold" style={{color:'#4285F4'}}>G</span>
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsSubmitting(true); window.setTimeout(() => onNavigate('dashboard'), 250) }}>
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Arjun Sharma" value={form.name} onChange={update('name')} required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" placeholder="arjun@example.com" value={form.email} onChange={update('email')} required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={update('phone')} required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={update('password')} required
                  className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColors[strength - 1] : 'bg-slate-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">{strengthLabels[strength - 1] || ''}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="password" placeholder="Re-enter password" value={form.confirm} onChange={update('confirm')} required
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                    form.confirm && form.confirm !== form.password ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-blue-400'
                  }`} />
                {form.confirm && form.confirm === form.password && (
                  <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                )}
              </div>
            </div>

            {/* License Upload */}
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">Driving License</label>
              <div
                onClick={() => setLicenseUploaded(true)}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                  licenseUploaded ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                {licenseUploaded ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">License uploaded</span>
                  </div>
                ) : (
                  <div className="text-slate-400">
                    <Upload className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Click to upload driving license</p>
                    <p className="text-xs mt-0.5">JPG, PNG or PDF — max 5MB</p>
                  </div>
                )}
              </div>
            </div>

            <button type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/25 disabled:opacity-80"
            >
              {isSubmitting ? 'Creating account...' : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="text-blue-600 font-semibold hover:text-blue-700">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
