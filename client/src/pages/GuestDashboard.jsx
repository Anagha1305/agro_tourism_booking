import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function GuestDashboard() {
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // Booking modal states
  const [showForm, setShowForm] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    payment: "UPI",
  });

  // Fetch farms
  useEffect(() => {
    axios
      .get(`${API}/api/farms`)
      .then((res) => setFarms(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle input
  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  // Final booking
  const confirmBooking = async () => {
    const confirm = window.confirm(
      "Are you sure you want to confirm booking?"
    );
    if (!confirm) return;

    try {
      const res = await axios.post(
        `${API}/api/bookings/book`,
        {
          farmId: selectedFarm._id,
          userEmail: "guest@test.com",
          ...bookingData,
        }
      );

      toast.success(res.data.message);

      setShowForm(false);
      setBookingData({
        name: "",
        phone: "",
        payment: "UPI",
      });
    } catch (err) {
      console.log(err);
      alert("Booking failed ");
    }
  };

  return (
    <div className="container">
      <div className="overlay">

        {/* HEADER */}
        <div className="header">
          <h1> Agro Tourism</h1>
          <h2>Welcome Guest</h2>

          <div className="header-buttons">
            <button
              className="btn logout"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </button>

            <button
              className="btn bookings"
              onClick={() => navigate("/bookings")}
            >
              My Bookings
            </button>
          </div>
        </div>

        {/* FARM CARDS */}
        <div className="farm-grid">
          {farms.length === 0 ? (
            <p className="no-data">No farms available</p>
          ) : (
            farms.map((farm) => (
              <div className="card" key={farm._id}>
                <img src={farm.image} alt="farm" />

                <div className="card-content">
                  <h3>{farm.name}</h3>
                  <p>{farm.location}</p>
                  <p>₹{farm.price}</p>

                  <button
                    className="book-btn"
                    onClick={() => {
                      setSelectedFarm(farm);
                      setShowForm(true);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Complete Booking</h2>

            <p>
              <b>{selectedFarm?.name}</b>
            </p>

            <input
              name="name"
              placeholder="Your Name"
              value={bookingData.name}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={bookingData.phone}
              onChange={handleChange}
            />

            <select
              name="payment"
              value={bookingData.payment}
              onChange={handleChange}
            >
              <option>UPI</option>
              <option>Card</option>
              <option>Cash</option>
            </select>

            <button className="confirm-btn" onClick={confirmBooking}>
              Confirm Booking ✅
            </button>

            <button
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel ❌
            </button>
          </div>
        </div>
      )}

      {/* CSS */}
      <style>{`
/* ===== Global ===== */
* {
  font-family: 'Inter', sans-serif;
}

/* ===== Background ===== */
.container {
  min-height: 100vh;
  background: linear-gradient(
      rgba(20, 40, 20, 0.5),
      rgba(20, 40, 20, 0.6)
    ),
    url('https://images.unsplash.com/photo-1501785888041-af3ef285b470');

  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* ===== Layout ===== */
.overlay {
  min-height: 100vh;
  padding: 50px 30px;
}

/* ===== Header ===== */
.header {
  text-align: center;
  color: #5fa75f;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.6rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.header h2 {
  font-size: 1rem;
  font-weight: 300;
  opacity: 0.85;
}

/* ===== Buttons ===== */
.header-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 18px;
}

.btn {
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.25);
  cursor: pointer;
  font-size: 0.9rem;
  backdrop-filter: blur(6px);
  transition: 0.3s;
  position: relative;
  overflow: hidden;
}

/* 🔴 Logout */
.logout {
  background: rgba(255, 0, 0, 0.08);
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.6);

  background-size: 300% 300%;
  animation: gradientMove 8s ease infinite;

  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.2);
}

.logout:hover {
  background: rgba(255, 0, 0, 0.15);
  box-shadow: 0 6px 25px rgba(255, 0, 0, 0.4);
  transform: translateY(-2px);
}

/* 🔵 Bookings */
.bookings {
  background: rgba(255,255,255,0.9);
  color: #1b3d2f;
  border: 1px solid rgba(255,255,255,0.8);

  box-shadow: 0 4px 15px rgba(255,255,255,0.2);
}

.bookings:hover {
  background: white;
  box-shadow: 0 6px 20px rgba(255,255,255,0.4);
  transform: translateY(-2px);
}

/* ===== Grid ===== */
.farm-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

/* ===== Card ===== */
.card {
  width: 280px;
  border-radius: 18px;

  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(14px);

  border: 1px solid rgba(255,255,255,0.2);

  box-shadow: 
    0 8px 30px rgba(0,0,0,0.4),
    inset 0 0 10px rgba(255,255,255,0.05);

  overflow: hidden;
  transition: 0.35s ease;
  position: relative;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 
    0 15px 40px rgba(0,0,0,0.6),
    inset 0 0 12px rgba(255,255,255,0.08);
}

/* ✨ Shine effect */
.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;

  background: linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,0.25),
    transparent
  );

  transition: 0.6s;
}

.card:hover::before {
  left: 100%;
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

/* ===== Card Content ===== */
.card-content {
  padding: 15px;
  color: #f1f5f1;
}

.card-content h3 {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.card-content p {
  font-size: 0.9rem;
  opacity: 0.85;
}

/* 🌈 Animated Book Button */
.book-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  border-radius: 10px;

  border: 1px solid rgba(76, 175, 80, 0.6);
  color: #d4ffd8;

  background: linear-gradient(
    270deg,
    rgba(76,175,80,0.2),
    rgba(129,199,132,0.3),
    rgba(76,175,80,0.2)
  );

  background-size: 400% 400%;
  animation: gradientMove 6s ease infinite;

  cursor: pointer;
  transition: 0.3s;

  box-shadow: 0 4px 20px rgba(76,175,80,0.2);
}

.book-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 30px rgba(76,175,80,0.5);
}

/* ===== Modal ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10,20,10,0.7);

  display: flex;
  justify-content: center;
  align-items: center;
}

/* ===== Modal Box ===== */
.modal {
  width: 320px;
  padding: 24px;
  border-radius: 16px;

  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(18px);

  border: 1px solid rgba(255,255,255,0.25);

  box-shadow: 
    0 10px 40px rgba(0,0,0,0.6),
    inset 0 0 10px rgba(255,255,255,0.08);

  display: flex;
  flex-direction: column;
  gap: 12px;

  animation: fadeIn 0.3s ease, pulseGlow 3s infinite alternate;
}

.modal h2 {
  color: #f1f5f1;
  font-size: 1.2rem;
}

/* ===== Inputs ===== */
.modal input,
.modal select {
  padding: 10px;
  border-radius: 10px;

  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.12);
  color: white;

  box-shadow: inset 0 2px 6px rgba(0,0,0,0.3);
}

.modal input::placeholder {
  color: #ddd;
}

/* ===== Buttons ===== */
.confirm-btn {
  background: #3a7d44;
  color: white;
  padding: 10px;
  border-radius: 10px;
  border: none;
}

.confirm-btn:hover {
  background: #2e5f35;
}

.cancel-btn {
  background: transparent;
  color: #ccc;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.3);
}

/* ===== Empty ===== */
.no-data {
  color: #ddd;
}

/* ===== Animations ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes pulseGlow {
  from {
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
  }
  to {
    box-shadow: 0 15px 50px rgba(76,175,80,0.3);
  }
}
`}</style>
    </div>
  );
}

export default GuestDashboard;