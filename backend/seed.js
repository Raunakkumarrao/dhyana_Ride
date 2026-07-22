/**
 * Seed script — populates the Bike collection with sample data if it is empty.
 * Usage: npm run seed
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Bike = require("./models/Bike");

dotenv.config();

const sampleBikes = [
  {
    bikeName: "CBR 650R",
    brand: "Honda",
    category: "Sports",
    pricePerDay: 1200,
    pricePerHour: 150,
    rating: 4.9,
    engine: "649cc",
    mileage: "25 kmpl",
    fuelType: "Petrol",
    transmission: "Manual",
    location: "Bangalore, MG Road",
    description: "Honda CBR 650R Sports Bike",
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
  },
  {
    bikeName: "Classic 350",
    brand: "Royal Enfield",
    category: "Cruiser",
    pricePerDay: 799,
    pricePerHour: 100,
    rating: 4.7,
    engine: "349cc",
    mileage: "35 kmpl",
    fuelType: "Petrol",
    transmission: "Manual",
    location: "Mumbai, Bandra",
    description: "Royal Enfield Classic 350 Cruiser",
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&h=400&fit=crop&auto=format",
  },
  {
    bikeName: "Activa 6G",
    brand: "Honda",
    category: "Scooter",
    pricePerDay: 399,
    pricePerHour: 50,
    rating: 4.6,
    engine: "109cc",
    mileage: "50 kmpl",
    fuelType: "Petrol",
    transmission: "Automatic",
    location: "Chennai, T. Nagar",
    description: "Honda Activa 6G Scooter",
    available: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&auto=format",
  },
  {
    bikeName: "390 Adventure",
    brand: "KTM",
    category: "Adventure",
    pricePerDay: 1499,
    pricePerHour: 190,
    rating: 4.8,
    engine: "373cc",
    mileage: "28 kmpl",
    fuelType: "Petrol",
    transmission: "Manual",
    location: "Delhi, CP",
    description: "KTM 390 Adventure Bike",
    available: false,
    featured: true,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&h=400&fit=crop&auto=format",
  },
  {
    bikeName: "Ather 450X",
    brand: "Ather",
    category: "Electric",
    pricePerDay: 599,
    pricePerHour: 75,
    rating: 4.8,
    engine: "Electric Motor",
    mileage: "100 km/charge",
    fuelType: "Electric",
    transmission: "Automatic",
    location: "Hyderabad, Jubilee Hills",
    description: "Ather 450X Electric Scooter",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop&auto=format",
  },
  {
    bikeName: "Duke 200",
    brand: "KTM",
    category: "Sports",
    pricePerDay: 899,
    pricePerHour: 115,
    rating: 4.7,
    engine: "199cc",
    mileage: "30 kmpl",
    fuelType: "Petrol",
    transmission: "Manual",
    location: "Pune, Koregaon Park",
    description: "KTM Duke 200 Sports Bike",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&h=400&fit=crop&auto=format",
  },
  {
    bikeName: "Himalayan 450",
    brand: "Royal Enfield",
    category: "Adventure",
    pricePerDay: 1299,
    pricePerHour: 165,
    rating: 4.9,
    engine: "452cc",
    mileage: "30 kmpl",
    fuelType: "Petrol",
    transmission: "Manual",
    location: "Manali, Old Manali",
    description: "Royal Enfield Himalayan 450 Adventure Bike",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1605164599901-7c5e3e0e4e9b?w=600&h=400&fit=crop&auto=format",
  },
  {
    bikeName: "Jupiter 125",
    brand: "TVS",
    category: "Scooter",
    pricePerDay: 329,
    pricePerHour: 45,
    rating: 4.5,
    engine: "124.8cc",
    mileage: "45 kmpl",
    fuelType: "Petrol",
    transmission: "Automatic",
    location: "Coimbatore, RS Puram",
    description: "TVS Jupiter 125 Scooter",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop&auto=format",
  },
  {
    bikeName: "Pulsar NS200",
    brand: "Bajaj",
    category: "Sports",
    pricePerDay: 749,
    pricePerHour: 95,
    rating: 4.6,
    engine: "199.5cc",
    mileage: "35 kmpl",
    fuelType: "Petrol",
    transmission: "Manual",
    location: "Ahmedabad, SG Highway",
    description: "Bajaj Pulsar NS200 Sports Bike",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
  },
  {
    bikeName: "R15 V4",
    brand: "Yamaha",
    category: "Sports",
    pricePerDay: 999,
    pricePerHour: 125,
    rating: 4.8,
    engine: "155cc",
    mileage: "40 kmpl",
    fuelType: "Petrol",
    transmission: "Manual",
    location: "Kochi, Edappally",
    description: "Yamaha R15 V4 Sports Bike",
    available: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop&auto=format",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const existingCount = await Bike.countDocuments();

    if (existingCount > 0) {
      console.log(`ℹ️  Bike collection already has ${existingCount} document(s). Skipping seed.`);
      console.log("   Pass --force to wipe and reseed, e.g. `node seed.js --force`.");

      if (!process.argv.includes("--force")) {
        await mongoose.disconnect();
        return;
      }

      await Bike.deleteMany({});
      console.log("🗑️  Existing bikes cleared (--force).");
    }

    const inserted = await Bike.insertMany(sampleBikes);
    console.log(`🚀 Seeded ${inserted.length} bikes into the database.`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
