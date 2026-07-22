import { useEffect, useState } from 'react'
import { Bike } from 'lucide-react'

interface BikeImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  eager?: boolean
}

const palette = [
  ['#0f172a', '#2563eb', '#06b6d4'],
  ['#111827', '#7c3aed', '#ec4899'],
  ['#172554', '#0ea5e9', '#22c55e'],
  ['#1e293b', '#f59e0b', '#ef4444'],
  ['#0f172a', '#14b8a6', '#3b82f6'],
]

function hashString(input: string) {
  let hash = 0
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0
  }
  return hash
}

function createArtworkDataUri(label: string, seed: string) {
  const [start, mid, end] = palette[hashString(seed) % palette.length]
  const shortLabel = label.split(' ').slice(0, 2).join(' ')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="55%" stop-color="${mid}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.25)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg)" />
      <rect width="800" height="500" fill="url(#glow)" />
      <circle cx="640" cy="110" r="85" fill="rgba(255,255,255,0.12)" />
      <circle cx="150" cy="390" r="120" fill="rgba(255,255,255,0.08)" />
      <rect x="96" y="328" width="608" height="30" rx="15" fill="rgba(255,255,255,0.22)" />
      <path d="M145 280 L260 185 L410 185 L515 255 L605 255" fill="none" stroke="white" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" />
      <path d="M255 185 L305 120 L440 120 L490 180" fill="none" stroke="white" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity="0.62" />
      <circle cx="225" cy="330" r="78" fill="none" stroke="white" stroke-width="16" opacity="0.9" />
      <circle cx="560" cy="330" r="78" fill="none" stroke="white" stroke-width="16" opacity="0.9" />
      <circle cx="225" cy="330" r="28" fill="rgba(255,255,255,0.5)" />
      <circle cx="560" cy="330" r="28" fill="rgba(255,255,255,0.5)" />
      <path d="M305 250 L360 205 L460 205 L520 250" fill="none" stroke="white" stroke-width="14" stroke-linecap="round" opacity="0.7" />
      <text x="56" y="92" fill="rgba(255,255,255,0.88)" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="4">DHYANA RIDE</text>
      <text x="56" y="132" fill="rgba(255,255,255,0.7)" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="500">${shortLabel}</text>
    </svg>
  `
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export default function BikeImage({ src, alt, className = '', imgClassName = '', eager = false }: BikeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const displaySrc = hasError ? createArtworkDataUri(alt, src) : src

  useEffect(() => {
    setHasError(false)
    setIsLoaded(false)
  }, [src])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 animate-pulse">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.28),transparent_30%)]" />
          <div className="absolute inset-0 flex items-center justify-center text-white/70">
            <div className="flex flex-col items-center gap-2">
              <Bike className="w-8 h-8" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Loading bike</span>
            </div>
          </div>
        </div>
      )}

      <img
        src={displaySrc}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true)
            setIsLoaded(false)
          }
        }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  )
}
