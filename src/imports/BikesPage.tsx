import { useMemo, useState, type ReactNode } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import BikeCard from '../components/BikeCard'
import Footer from '../components/Footer'
import { type Bike, type Page } from "../data";

interface BikesPageProps {
  bikes: Bike[]
  onNavigate: (page: Page, bikeId?: string) => void
  wishlist: string[]
  onToggleWishlist: (id: string) => void
}

const brands = ['All', 'Honda', 'Royal Enfield', 'Yamaha', 'KTM', 'Bajaj', 'TVS', 'Ather']
const categories = ['All', 'Sports', 'Cruiser', 'Scooter', 'Electric', 'Adventure']
const fuelTypes = ['All', 'Petrol', 'Electric']
const transmissions = ['All', 'Manual', 'Automatic']

export default function BikesPage({ bikes, onNavigate, wishlist, onToggleWishlist }: BikesPageProps) {
  const [search, setSearch] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedFuel, setSelectedFuel] = useState('All')
  const [selectedTransmission, setSelectedTransmission] = useState('All')
  const [priceRange, setPriceRange] = useState(2000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(
    () => bikes.filter((bike) => {
      const searchText = search.trim().toLowerCase()
      const matchesSearch =!searchText || bike.bikeName.toLowerCase().includes(searchText) || bike.brand.toLowerCase().includes(searchText);
      if (!matchesSearch) return false
      if (selectedBrand !== 'All' && bike.brand !== selectedBrand) return false
      if (selectedCategory !== 'All' && bike.category !== selectedCategory) return false
      if (selectedFuel !== 'All' && bike.fuelType !== selectedFuel) return false
      if (selectedTransmission !== 'All' && bike.transmission !== selectedTransmission) return false
      if (bike.pricePerDay > priceRange) return false
      if (bike.rating < minRating) return false
      return true
    }),
    [minRating, priceRange, search, selectedBrand, selectedCategory, selectedFuel, selectedTransmission],
  )

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay
      if (sortBy === 'rating') return b.rating - a.rating
      return b.rating - a.rating
    }),
    [filtered, sortBy],
  )

  const clearFilters = () => {
    setSelectedBrand('All')
    setSelectedCategory('All')
    setSelectedFuel('All')
    setSelectedTransmission('All')
    setPriceRange(2000)
    setMinRating(0)
    setSearch('')
  }

  const FilterSection = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{title}</h4>
      {children}
    </div>
  )

  const FilterPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
        active
          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-slate-950 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">Explore fleet</p>
          <h1 className="text-3xl font-bold text-white mb-2">Find Your Perfect Ride</h1>
          <p className="text-slate-400">Browse {bikes.length} verified bikes across 50+ cities</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, brand or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-blue-400 transition-all cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
                type="button"
              className={`lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-colors ${
                showFilters ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}
          >
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-slate-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all
                </button>
              </div>

              <FilterSection title="Brand">
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <FilterPill
                      key={b}
                      label={b}
                      active={selectedBrand === b}
                      onClick={() => setSelectedBrand(b)}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Bike Type">
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <FilterPill
                      key={c}
                      label={c}
                      active={selectedCategory === c}
                      onClick={() => setSelectedCategory(c)}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Fuel Type">
                <div className="flex flex-wrap gap-2">
                  {fuelTypes.map((f) => (
                    <FilterPill
                      key={f}
                      label={f}
                      active={selectedFuel === f}
                      onClick={() => setSelectedFuel(f)}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Transmission">
                <div className="flex flex-wrap gap-2">
                  {transmissions.map((t) => (
                    <FilterPill
                      key={t}
                      label={t}
                      active={selectedTransmission === t}
                      onClick={() => setSelectedTransmission(t)}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title={`Price Range · Up to ₹${priceRange}/day`}>
                <input
                  type="range"
                  min={300}
                  max={2000}
                  step={100}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>₹300</span>
                  <span>₹2,000</span>
                </div>
              </FilterSection>

              <FilterSection title="Minimum Rating">
                <div className="flex flex-wrap gap-2">
                  {[['All', 0], ['4+', 4], ['4.5+', 4.5]].map(([label, val]) => (
                    <FilterPill
                      key={String(label)}
                      label={String(label)}
                      active={minRating === Number(val)}
                      onClick={() => setMinRating(Number(val))}
                    />
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">{sorted.length}</span> bikes found
              </p>
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <div className="mx-auto mb-5 w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <X className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No bikes found</h3>
                <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                  Try removing one of the filters or search for a different bike, brand or model.
                </p>
                <button
                  onClick={clearFilters}
                  type="button"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {sorted.map((bike) => (
                  <BikeCard
                    key={bike._id}
                    bike={bike}
                    onNavigate={onNavigate}
                    wishlisted={wishlist.includes(bike._id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
