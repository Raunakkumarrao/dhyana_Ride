import { useState } from 'react'
import { Bike, Share2, Globe, Link, Mail, Phone, CheckCircle } from 'lucide-react'
import type { Page } from '../data'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSent, setNewsletterSent] = useState(false)

  const handleNavigation = (label: string) => {
    const map: Record<string, Page> = {
      'About Us': 'home',
      Careers: 'dashboard',
      Press: 'home',
      Blog: 'bikes',
      Investors: 'dashboard',
      'Help Center': 'bikes',
      Safety: 'home',
      'Cancellation Policy': 'dashboard',
      Insurance: 'bikes',
      'Contact Us': 'profile',
    }

    onNavigate(map[label] ?? 'home')
  }

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <Bike className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-white">Dhyana <span className="text-blue-500">Ride</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              India's most trusted bike rental platform. Ride anywhere, anytime — verified bikes, instant booking.
            </p>
            <div className="flex items-center gap-3">
              {[Share2, Globe, Link].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onNavigate(i === 0 ? 'profile' : 'home')}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Careers', 'Press', 'Blog', 'Investors'].map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => handleNavigation(item)} className="text-sm hover:text-white transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2.5">
              {['Help Center', 'Safety', 'Cancellation Policy', 'Insurance', 'Contact Us'].map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => handleNavigation(item)} className="text-sm hover:text-white transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>support@dhyanaride.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>1800-123-RIDE (7433)</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs text-slate-500 mb-3">Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => { if (newsletterEmail.trim()) setNewsletterSent(true) }}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {newsletterSent ? <CheckCircle className="w-4 h-4" /> : 'Go'}
                </button>
              </div>
              {newsletterSent && <p className="mt-2 text-xs text-emerald-400">Subscribed successfully.</p>}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© 2025 Dhyana Ride Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <button key={item} type="button" onClick={() => onNavigate('home')} className="hover:text-white transition-colors">{item}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
