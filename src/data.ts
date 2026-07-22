export type Page =
  | 'home'
  | 'bikes'
  | 'bike-detail'
  | 'booking'
  | 'dashboard'
  | 'login'
  | 'signup'
  | 'profile'
  | 'wishlist'
  | 'payment-success'

export interface Bike {
  _id: string
  bikeName: string
  brand: string
  category: 'Sports' | 'Cruiser' | 'Scooter' | 'Electric' | 'Adventure'
  pricePerDay: number
  pricePerHour: number
  rating: number
  engine: string
  fuelType: 'Petrol' | 'Electric'
  transmission: 'Manual' | 'Automatic'
  location: string
  description: string
  available: boolean
  featured: boolean
  image: string
}

export const bikes: Bike[] = [
  {
    _id: "1",
    bikeName: 'CBR 650R',
    brand: 'Honda',
    category: 'Sports',
    pricePerDay: 1200,
    pricePerHour: 150,
    rating: 4.9,
    engine: '649cc',
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Bangalore, MG Road',
    description: 'Honda CBR 650R Sports Bike',
    available: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format',
  },
  {
    _id: "2",
    bikeName: 'Classic 350',
    brand: 'Royal Enfield',
    category: 'Cruiser',
    pricePerDay: 799,
    pricePerHour: 100,
    rating: 4.7,
    engine: '349cc',
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Mumbai, Bandra',
    description: 'Royal Enfield Classic 350 Cruiser',
    available: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&h=400&fit=crop&auto=format',
  },
    {
    _id: "3",
    bikeName: 'Activa 6G',
    brand: 'Honda',
    category: 'Scooter',
    pricePerDay: 399,
    pricePerHour: 50,
    rating: 4.6,
    engine: '109cc',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Chennai, T. Nagar',
    description: 'Honda Activa 6G Scooter',
    available: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&auto=format',
  },
  {
    _id: "4",
    bikeName: '390 Adventure',
    brand: 'KTM',
    category: 'Adventure',
    pricePerDay: 1499,
    pricePerHour: 190,
    rating: 4.8,
    engine: '373cc',
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Delhi, CP',
    description: 'KTM 390 Adventure Bike',
    available: false,
    featured: true,
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&h=400&fit=crop&auto=format',
  },
  {
    _id: "5",
    bikeName: 'Ather 450X',
    brand: 'Ather',
    category: 'Electric',
    pricePerDay: 599,
    pricePerHour: 75,
    rating: 4.8,
    engine: 'Electric Motor',
    fuelType: 'Electric',
    transmission: 'Automatic',
    location: 'Hyderabad, Jubilee Hills',
    description: 'Ather 450X Electric Scooter',
    available: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop&auto=format',
  },
  {
    _id: "6",
    bikeName: 'Duke 200',
    brand: 'KTM',
    category: 'Sports',
    pricePerDay: 899,
    pricePerHour: 115,
    rating: 4.7,
    engine: '199cc',
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Pune, Koregaon Park',
    description: 'KTM Duke 200 Sports Bike',
    available: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&h=400&fit=crop&auto=format',
  },
    {
    _id: "7",
    bikeName: 'Himalayan 450',
    brand: 'Royal Enfield',
    category: 'Adventure',
    pricePerDay: 1299,
    pricePerHour: 165,
    rating: 4.9,
    engine: '452cc',
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Manali, Old Manali',
    description: 'Royal Enfield Himalayan 450 Adventure Bike',
    available: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1605164599901-7c5e3e0e4e9b?w=600&h=400&fit=crop&auto=format',
  },
  {
    _id: "8",
    bikeName: 'Jupiter 125',
    brand: 'TVS',
    category: 'Scooter',
    pricePerDay: 329,
    pricePerHour: 45,
    rating: 4.5,
    engine: '124.8cc',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Coimbatore, RS Puram',
    description: 'TVS Jupiter 125 Scooter',
    available: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop&auto=format',
  },
  {
    _id: "9",
    bikeName: 'Pulsar NS200',
    brand: 'Bajaj',
    category: 'Sports',
    pricePerDay: 749,
    pricePerHour: 95,
    rating: 4.6,
    engine: '199.5cc',
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Ahmedabad, SG Highway',
    description: 'Bajaj Pulsar NS200 Sports Bike',
    available: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format',
  },
  {
    _id: "10",
    bikeName: 'R15 V4',
    brand: 'Yamaha',
    category: 'Sports',
    pricePerDay: 999,
    pricePerHour: 125,
    rating: 4.8,
    engine: '155cc',
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Kochi, Edappally',
    description: 'Yamaha R15 V4 Sports Bike',
    available: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop&auto=format',
  },
]
export interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  text: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Mehta',
    role: 'College Student, Bangalore',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
    rating: 5,
    text: "Dhyana Ride has completely changed my daily commute. The booking process is lightning fast and the bikes are always in perfect condition. Best app for students!",
  },
  {
    id: 2,
    name: 'Rahul Nair',
    role: 'Software Engineer, Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    rating: 5,
    text: "Rented a KTM 390 Adventure for a weekend Coorg trip. The whole experience — from booking to drop-off — was incredibly smooth. The insurance coverage gave me peace of mind.",
  },
  {
    id: 3,
    name: 'Sneha Kapoor',
    role: 'Travel Blogger, Mumbai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
    rating: 5,
    text: "As a travel blogger, I need reliable rides across cities. Dhyana Ride's presence in 50+ cities is a game changer. The verified bikes and 24/7 support make it my #1 choice.",
  },
]


export type BookingStatus = 'active' | 'upcoming' | 'completed' | 'cancelled'

export interface BookingRecord {
  id: string
  bikeId: string
  pickup: string
  dates: string
  amount: number
  status: BookingStatus
  createdAt: string
}

export type NotificationType = 'booking' | 'payment' | 'reminder' | 'profile'

export interface NotificationRecord {
  id: string
  type: NotificationType
  title: string
  desc: string
  time: string
  createdAt: string
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  avatar: string
}

export const defaultUserProfile: UserProfile = {
  name: 'Arjun Sharma',
  email: 'arjun@example.com',
  phone: '+91 98765 43210',
  avatar: '',
}

export const defaultBookings: BookingRecord[] = [
  {
    id: 'RM2024001',
    bikeId: '1',
    pickup: 'Bangalore, MG Road',
    dates: 'Dec 15 – Dec 16, 2024',
    amount: 1249,
    status: 'active',
    createdAt: '2024-12-14T10:00:00.000Z',
  },
  {
    id: 'RM2024002',
    bikeId: '2',
    pickup: 'Mumbai, Bandra',
    dates: 'Jan 5 – Jan 7, 2025',
    amount: 1649,
    status: 'upcoming',
    createdAt: '2024-12-18T09:00:00.000Z',
  },
    {
    id: 'RM2024003',
    bikeId: '3',
    pickup: 'Chennai, T. Nagar',
    dates: 'Nov 20 – Nov 21, 2024',
    amount: 449,
    status: 'completed',
    createdAt: '2024-11-19T11:15:00.000Z',
  },
  {
    id: 'RM2024004',
    bikeId: '4',
    pickup: 'Delhi, CP',
    dates: 'Oct 10 – Oct 12, 2024',
    amount: 3049,
    status: 'completed',
    createdAt: '2024-10-09T08:30:00.000Z',
  },
]

export const defaultNotifications: NotificationRecord[] = [
  {
    id: 'notif-1',
    type: 'booking',
    title: 'Booking Confirmed',
    desc: 'Your Honda CBR 650R booking is confirmed.',
    time: '2 hours ago',
    createdAt: '2024-12-14T12:00:00.000Z',
  },
  {
    id: 'notif-2',
    type: 'reminder',
    title: 'Upcoming Ride Reminder',
    desc: 'Your Royal Enfield Classic 350 is due in 3 days.',
    time: '1 day ago',
    createdAt: '2024-12-13T10:00:00.000Z',
  },
  {
    id: 'notif-3',
    type: 'profile',
    title: 'Documents Expiring',
    desc: 'Your driving license expires in 30 days.',
    time: '2 days ago',
    createdAt: '2024-12-12T08:30:00.000Z',
  },
  {
    id: 'notif-4',
    type: 'payment',
    title: 'Refund Processed',
    desc: '₹450 refunded to your account.',
    time: '5 days ago',
    createdAt: '2024-12-09T15:45:00.000Z',
  },
]

export const getBikeSearchText = (bike: Bike) =>
  [
    bike.bikeName,
    bike.brand,
    bike.category,
    bike.fuelType,
    bike.transmission,
    bike.location,
  ]
    .join(' ')
    .toLowerCase()