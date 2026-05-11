import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // ✅ API URL from .env
  const API = process.env.REACT_APP_API_URL;

  // 🔥 Fetch bookings
  useEffect(() => {
    axios
      .get(`${API}/api/bookings/guest@test.com`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, [API]);

  // ❌ Cancel booking
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      const res = await axios.delete(
        `${API}/api/bookings/cancel/${bookingId}`
      );

      toast.success(res.data.message);

      setBookings((prev) =>
        prev.filter((b) => b._id !== bookingId)
      );

    } catch (err) {
      toast.error("Cancel failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="overlay">

        {/* HEADER */}
        <div className="header">
          <h1>My Bookings</h1>
          <p>Your peaceful farm experiences 🌿</p>
        </div>

        {/* BOOKINGS */}
        {bookings.length === 0 ? (
          <p className="no-data">No bookings yet ❌</p>
        ) : (
          <div className="booking-grid">
            {bookings.map((b) => (
              <div className="card" key={b._id}>
                <div className="card-content">
                  <h3>{b.farmId?.name}</h3>
                  <p>📍 {b.farmId?.location}</p>
                  <p>💰 ₹{b.farmId?.price}</p>
                  <p>📅 {new Date(b.date).toLocaleString()}</p>

                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(b._id)}
                  >
                    Cancel ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* CSS */}
      <style>{`
* {
  font-family: 'Inter', sans-serif;
}

/* 🌿 CALM BACKGROUND */
.container {
  min-height: 100vh;
  background: linear-gradient(
      rgba(20, 40, 30, 0.6),
      rgba(10, 25, 20, 0.7)
    ),
    url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8');

  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.overlay {
  padding: 50px 30px;
}

/* HEADER */
.header {
  text-align: center;
  color: #e8f5e9;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
}

.header p {
  opacity: 0.8;
}

/* GRID */
.booking-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

/* CARD */
.card {
  width: 280px;
  border-radius: 18px;

  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(14px);

  border: 1px solid rgba(255,255,255,0.2);

  box-shadow: 
    0 10px 30px rgba(0,0,0,0.5),
    inset 0 0 10px rgba(255,255,255,0.05);

  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
}

/* ✨ Hover */
.card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 18px 45px rgba(0,0,0,0.7);
}

/* ✨ Shine */
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

/* CONTENT */
.card-content {
  padding: 18px;
  color: #f1f5f1;
}

.card-content h3 {
  margin-bottom: 8px;
}

.card-content p {
  font-size: 0.9rem;
  opacity: 0.85;
}

/* CANCEL BUTTON */
.cancel-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;

  border-radius: 10px;
  border: none;

  background: linear-gradient(
    270deg,
    #ff4d4d,
    #ff1a1a,
    #ff4d4d
  );

  background-size: 300% 300%;
  animation: gradientMove 6s ease infinite;

  color: white;
  font-weight: bold;

  cursor: pointer;
  transition: 0.3s;
}

.cancel-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(255,0,0,0.5);
}

/* EMPTY */
.no-data {
  color: #ddd;
  text-align: center;
}

/* ANIMATION */
@keyframes gradientMove {
  0% { background-position: 0% }
  50% { background-position: 100% }
  100% { background-position: 0% }
}
`}</style>
    </div>
  );
}

export default MyBookings;