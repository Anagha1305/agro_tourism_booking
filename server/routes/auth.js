const express = require("express");
const router = express.Router(); // ✅ THIS WAS MISSING

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    console.log("User saved:", newUser);

    res.json({ message: "Signup successful ✅" });

  } catch (err) {
    console.log("Signup ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      role: user.role,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ ALSO IMPORTANT