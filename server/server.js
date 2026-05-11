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
mongoose.connect(
  "mongodb://Anagha:Anagha%402006@ac-pfaftjt-shard-00-00.ca9eej4.mongodb.net:27017,ac-pfaftjt-shard-00-01.ca9eej4.mongodb.net:27017,ac-pfaftjt-shard-00-02.ca9eej4.mongodb.net:27017/agrotourism?ssl=true&replicaSet=atlas-t5eiwa-shard-0&authSource=admin&retryWrites=true&w=majority"
)
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