const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");


// ✅ BOOK FARM
router.post("/book", async (req, res) => {
  try {
    const { farmId, userEmail, name, phone, payment } = req.body;

    // 🔥 Get farm price
    const farm = await Farm.findById(farmId);

    const newBooking = new Booking({
      farmId,
      userEmail,
      name,
      phone,
      payment,
      price: farm.price, // ✅ ADD THIS
      date: new Date(),
    });

    await newBooking.save();

    res.json({ message: "Booking successful" });

  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
});


// ✅ GET ALL BOOKINGS (FOR HOST) → KEEP THIS ABOVE
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("farmId");
    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching bookings" });
  }
});

// ✅ BOOKINGS ANALYTICS (GROUP BY FARM)
router.get("/analytics/summary", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("farmId");

    const summary = {};

    bookings.forEach((b) => {
      const farmName = b.farmId?.name || "Unknown Farm";

      if (!summary[farmName]) {
        summary[farmName] = {
          farm: b.farmId,
          totalBookings: 0,
          users: [],
        };
      }

      summary[farmName].totalBookings += 1;
      summary[farmName].users.push(b.userEmail);
    });

    res.json(Object.values(summary));

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Analytics error" });
  }
});


// ✅ GET USER BOOKINGS
router.get("/:email", async (req, res) => {
  try {
    console.log("Fetching bookings for:", req.params.email);

    const bookings = await Booking.find({
      userEmail: req.params.email,
    }).populate("farmId");

    console.log("FOUND BOOKINGS:", bookings);

    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching bookings" });
  }
});


// ✅ CANCEL BOOKING
router.delete("/cancel/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling booking ❌" });
  }
});


module.exports = router;