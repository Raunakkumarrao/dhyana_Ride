const mongoose = require("mongoose");
const Bike = require("../models/Bike");

// GET All Bikes
const getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();

    res.status(200).json({
      success: true,
      count: bikes.length,
      data: bikes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Single Bike by MongoDB _id
const getBikeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bike id",
      });
    }

    const bike = await Bike.findById(id);

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    res.status(200).json({
      success: true,
      data: bike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE Bike
const createBike = async (req, res) => {
  try {
    const bike = await Bike.create(req.body);

    res.status(201).json({
      success: true,
      data: bike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE Bike
const updateBike = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bike id",
      });
    }

    const bike = await Bike.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    res.status(200).json({
      success: true,
      data: bike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE Bike
const deleteBike = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bike id",
      });
    }

    const bike = await Bike.findByIdAndDelete(id);

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBikes,
  getBikeById,
  createBike,
  updateBike,
  deleteBike,
};
