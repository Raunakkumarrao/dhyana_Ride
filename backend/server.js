const bikeRoutes = require("./routes/bikeRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// CORS: restrict to CLIENT_URL when set, otherwise allow all (dev-friendly default)
const corsOrigin = process.env.CLIENT_URL || "*";
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use("/api/bikes", bikeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Bike Rental Backend Running");
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Central error handler (catches any thrown/uncaught errors from routes)
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });
