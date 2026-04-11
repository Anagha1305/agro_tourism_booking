const express = require("express");
const router = express.Router();
const Farm = require("../models/Farm");

// ✅ ADD FARM
router.post("/add", async (req, res) => {
  try {
    console.log("🔥 POST /add hit");
    console.log("Incoming data:", req.body);

    const { name, location, price, image } = req.body;

    if (!name || !location || !price || !image) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newFarm = new Farm({
      name,
      location,
      price,
      image,
    });

    await newFarm.save();

    res.json({ message: "Farm added successfully 🌿" });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Error adding farm" });
  }
});

// ✅ GET ALL FARMS
router.get("/", async (req, res) => {
  try {
    const farms = await Farm.find();
    res.json(farms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching farms" });
  }
});
// DELETE FARM
router.delete("/:id", async (req, res) => {
  try {
    await Farm.findByIdAndDelete(req.params.id);
    res.json({ message: "Farm deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;