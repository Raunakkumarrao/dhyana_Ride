const express = require("express");
const router = express.Router();

const {
  getAllBikes,
  getBikeById,
  createBike,
  updateBike,
  deleteBike,
} = require("../controllers/Bikecontroller");

router.get("/", getAllBikes);
router.get("/:id", getBikeById);
router.post("/", createBike);
router.put("/:id", updateBike);
router.delete("/:id", deleteBike);

module.exports = router;
