const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ Middleware (MUST COME FIRST)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://agro-tourism-booking-p8sb.vercel.app"
  ],
  credentials: true,
}));

// ✅ MongoDB Connection
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));

// ✅ Routes (AFTER middleware)
const farmRoutes = require("./routes/farm");
app.use("/api/farms", farmRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const bookingRoutes = require("./routes/booking");
app.use("/api/bookings", bookingRoutes);