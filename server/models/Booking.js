const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
  },

  userEmail: String,

  name: String,

  phone: String,

  payment: String,

  price: Number,

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);