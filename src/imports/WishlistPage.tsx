import { Heart, ChevronLeft } from 'lucide-react'
import BikeCard from '../components/BikeCard'
import { type Bike, type Page } from '../data'

interface WishlistPageProps {
  bikes: Bike[]
  onNavigate: (page: Page, bikeId?: string) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
}

export default function WishlistPage({ bikes, onNavigate, wishlist, onToggleWishlist }: WishlistPageProps) {
  const wishlisted = bikes.filter((b) => wishlist.includes(b._id))

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pt-24">
        <button
          onClick={() => onNavigate('bikes')}
          type="button"
          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to listings
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Wishlist</h1>
            <p className="text-slate-500 text-sm">{wishlisted.length} saved bike{wishlisted.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {wishlisted.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No saved bikes yet</h3>
            <p className="text-slate-500 mb-6">Browse our fleet and save bikes you love</p>
            <button
              onClick={() => onNavigate('bikes')}
              type="button"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Explore Bikes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlisted.map((bike) => (
              <BikeCard
                key={bike._id}
                bike={bike}
                onNavigate={onNavigate}
                wishlisted={true}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
