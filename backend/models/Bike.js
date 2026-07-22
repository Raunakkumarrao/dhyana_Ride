const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
  {
    bikeName: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Sports", "Cruiser", "Scooter", "Adventure", "Electric"],
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    engine: {
      type: String,
      required: true,
    },

    mileage: {
      type: String,
      required: true,
    },

    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric"],
    },

    transmission: {
      type: String,
      required: true,
      enum: ["Manual", "Automatic"],
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
      default: "",
    },

    available: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bike", bikeSchema);