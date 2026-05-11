const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://agro-tourism-booking-p8sb.vercel.app"
  ],
  credentials: true,
}));

// ✅ VERY IMPORTANT
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));

// ✅ Routes
const farmRoutes = require("./routes/farm");
app.use("/api/farms", farmRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const bookingRoutes = require("./routes/booking");
app.use("/api/bookings", bookingRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});