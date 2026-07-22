import { useEffect, useRef, useState } from 'react'
import { Camera, User, Mail, Phone, ChevronLeft, Save, CheckCircle, Upload } from 'lucide-react'
import type { Page, UserProfile } from '../data'

interface ProfilePageProps {
  onNavigate: (page: Page) => void
  profile: UserProfile
  onSaveProfile: (profile: UserProfile) => void
}

export default function ProfilePage({ onNavigate, profile, onSaveProfile }: ProfilePageProps) {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState(profile)
  const [preview, setPreview] = useState(profile.avatar)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setForm(profile)
    setPreview(profile.avatar)
  }, [profile])

  const update = (field: keyof UserProfile) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }))

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const nextAvatar = String(reader.result ?? '')
      setPreview(nextAvatar)
      setForm((current) => ({ ...current, avatar: nextAvatar }))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    onSaveProfile(form)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  const InputField = ({
    label,
    icon: Icon,
    field,
    type = 'text',
    placeholder,
  }: {
    label: string
    icon: typeof User
    field: keyof UserProfile
    type?: string
    placeholder?: string
  }) => (
    <div>
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type={type}
          value={form[field]}
          onChange={update(field)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pt-24">
        <button
          onClick={() => onNavigate('dashboard')}
          type="button"
          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to dashboard
        </button>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full bg-blue-600 overflow-hidden flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {preview ? <img src={preview} alt={form.name} className="w-full h-full object-cover" /> : form.name.charAt(0)}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors"
                aria-label="Upload profile picture"
              >
                <Camera className="w-3.5 h-3.5 text-slate-600" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">My Profile</h1>
              <p className="text-slate-500 text-sm mb-3">Edit your account details and profile picture.</p>
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified rider
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                  <Upload className="w-3.5 h-3.5" /> JPG, PNG or WebP
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Full Name" icon={User} field="name" placeholder="Your full name" />
            <InputField label="Email Address" icon={Mail} field="email" type="email" placeholder="name@example.com" />
            <InputField label="Phone Number" icon={Phone} field="phone" type="tel" placeholder="+91 98765 43210" />
          </div>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 ${saved ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-600/25'}`}
        >
          {saved ? (
            <>
              <CheckCircle className="w-5 h-5" /> Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" /> Update Profile
            </>
          )}
        </button>
      </div>
    </div>
  )
}
