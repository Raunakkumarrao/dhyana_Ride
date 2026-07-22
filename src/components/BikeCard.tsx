import { Star, MapPin, Heart, Zap, Fuel } from 'lucide-react'
import type { Bike, Page } from '../data'
import BikeImage from './BikeImage'

interface BikeCardProps {
  bike: Bike
  onNavigate: (page: Page, bikeId?: string) => void
  wishlisted: boolean
  onToggleWishlist: (id: string) => void
}

export default function BikeCard({ bike, onNavigate, wishlisted, onToggleWishlist }: BikeCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        <BikeImage
          src={bike.image}
          alt={`${bike.brand} ${bike.bikeName}`}
          className="w-full h-full"
          imgClassName="group-hover:scale-105 transition-transform duration-500"
        />
        {/* Availability badge */}
        <div
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
            bike.available ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {bike.available ? 'Available' : 'Booked'}
        </div>
        {/* Wishlist button */}
        <button
          type="button"
          aria-label={wishlisted ? `Remove ${bike.bikeName} from wishlist`: `Add ${bike.bikeName} to wishlist`}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(bike._id) }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            wishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/90 backdrop-blur-sm text-slate-500 hover:text-red-500'
          }`}
        >
          <Heart className="w-3.5 h-3.5" fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-0.5">{bike.brand}</p>
        <h3 className="font-bold text-slate-900 mb-2">{bike.bikeName}</h3>

        {/* Rating + Location */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
            <span className="text-sm font-semibold text-slate-800">{bike.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <MapPin className="w-3 h-3" />
            <span className="truncate max-w-[100px]">{bike.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            {bike.fuelType === 'Electric' ? (
              <Zap className="w-3 h-3 text-blue-500" />
            ) : (
              <Fuel className="w-3 h-3 text-slate-400" />
            )}
            <span>{bike.fuelType}</span>
          </div>
          <span className="text-slate-200">|</span>
          <span>{bike.transmission}</span>
          <span className="text-slate-200">|</span>
          <span>{bike.engine}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-slate-900">₹{bike.pricePerDay.toLocaleString()}</span>
            <span className="text-slate-400 text-xs">/day</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('bike-detail', bike._id)}
            aria-label={`Book ${bike.bikeName}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.97] transition-all shadow-md shadow-blue-600/20"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
