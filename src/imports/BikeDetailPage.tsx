import { useEffect, useMemo, useState } from "react";
import {
  Star,
  MapPin,
  Shield,
  ChevronLeft,
  Heart,
  Share2,
  CheckCircle,
  User,
  Phone,
  BadgeCheck,
  Clock,
} from "lucide-react";

import BikeCard from "../components/BikeCard";
import Footer from "../components/Footer";
import BikeImage from "../components/BikeImage";
import { type Bike, type Page } from "../data";

interface BikeDetailPageProps {
  bikes: Bike[];
  onNavigate: (page: Page, bikeId?: string) => void;
  bikeId: string;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export default function BikeDetailPage({
  bikes,
  onNavigate,
  bikeId,
  wishlist,
  onToggleWishlist,
}: BikeDetailPageProps) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
  }, [bikeId]);

  const bike = useMemo(() => bikes.find((b) => b._id === bikeId) ?? null, [bikes, bikeId]);

  const related = useMemo(() => {
    if (!bike) return [];
    return bikes.filter((b) => b._id !== bike._id && b.category === bike.category).slice(0, 3);
  }, [bikes, bike]);

  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Bike not found
      </div>
    );
  }

  const wishlisted = wishlist.includes(bike._id);

  const images = [
    bike.image,
    bike.image,
    bike.image,
  ];

  const specs = [
    { label: "Brand", value: bike.brand },
    { label: "Model", value: bike.bikeName },
    { label: "Engine", value: bike.engine },
    { label: "Fuel Type", value: bike.fuelType },
    { label: "Transmission", value: bike.transmission },
    {
      label: "Availability",
      value: bike.available
        ? "Available Now"
        : "Currently Booked",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => onNavigate('bikes')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to listings
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Images + Details */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/10] mb-3">
              <BikeImage
                src={images[activeImg]}
                alt={`${bike.brand} ${bike.bikeName}`}
                className="w-full h-full"
              />
              <div
                className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  bike.available ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {bike.available ? 'Available Now' : 'Currently Booked'}
              </div>
              <button
                onClick={() => onToggleWishlist(bike._id)}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  wishlisted ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:text-red-500'
                }`}
              >
                <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 mb-8">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 aspect-video rounded-xl overflow-hidden bg-slate-100 border-2 transition-colors ${
                    activeImg === i ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <BikeImage src={img} alt={`${bike.brand} ${bike.bikeName} thumbnail ${i + 1}`} className="w-full h-full" />
                </button>
              ))}
            </div>

            {/* Title */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">{bike.brand}</p>
                <h1 className="text-2xl font-bold text-slate-900">{bike.bikeName}</h1>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
                    <span className="font-semibold text-slate-800 text-sm">{bike.rating}</span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {bike.location}
                  </div>
                </div>
              </div>
              <button className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Specifications */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <h2 className="font-semibold text-slate-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {specs.map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-slate-400 mb-1">{label}</p>
                    <p
                      className={`text-sm font-semibold ${
                        label === 'Availability'
                          ? bike.available
                            ? 'text-emerald-600'
                            : 'text-red-500'
                          : 'text-slate-800'
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Information */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-6">
              <h2 className="font-semibold text-slate-900 mb-4">Rental Information</h2>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: 'Minimum rental: 1 day' },
                  { icon: Shield, text: 'Insurance coverage included' },
                  { icon: CheckCircle, text: 'Free cancellation up to 24 hours before pickup' },
                  { icon: BadgeCheck, text: 'Bike inspected and certified' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                    <Icon className="w-4 h-4 text-blue-500 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Owner */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Owner Details</h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">Rajesh Kumar</p>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                    <span>4.8 · 120 rentals</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Phone className="w-4 h-4" /> Contact
                </button>
              </div>
            </div>
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6">
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-bold text-slate-900">₹{bike.pricePerDay.toLocaleString()}</span>
                  <span className="text-slate-500 text-sm">/day</span>
                </div>

                {/* Price Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 mb-5 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Base rate (1 day)</span>
                    <span className="text-slate-800 font-medium">₹{bike.pricePerDay.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Insurance</span>
                    <span className="text-emerald-600 font-medium">Included</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Platform fee</span>
                    <span className="text-slate-800 font-medium">₹49</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2.5 flex justify-between text-sm font-bold">
                    <span className="text-slate-900">Total (1 day)</span>
                    <span className="text-slate-900">₹{(bike.pricePerDay + 49).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('booking', bike._id)}
                  disabled={!bike.available}
                  className={`w-full py-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                    bike.available
                      ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-600/25'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {bike.available ? 'Book This Bike' : 'Currently Unavailable'}
                </button>

                <div className="flex items-center justify-center gap-4 mt-4">
                  {[Shield, CheckCircle, BadgeCheck].map((Icon, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-slate-400">
                      <Icon className="w-3.5 h-3.5 text-emerald-500" />
                      {['Insured', 'Verified', 'Certified'][i]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Bikes */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Similar Bikes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((b) => (
                <BikeCard
                  key={b._id}
                  bike={b}
                  onNavigate={onNavigate}
                  wishlisted={wishlist.includes(b._id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
