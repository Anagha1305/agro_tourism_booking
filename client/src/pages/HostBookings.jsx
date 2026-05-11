import { useEffect, useState } from "react";
import axios from "axios";

function HostBookings() {
  const [bookings, setBookings] = useState([]);

  // ✅ API URL from .env
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/bookings`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="overlay">

        {/* HEADER */}
        <div className="header">
          <h1>All Bookings</h1>
          <p>Track guest reservations across your farms</p>
        </div>

        {/* BOOKINGS GRID */}
        <div className="booking-grid">
          {bookings.length === 0 ? (
            <p className="no-data">No bookings yet</p>
          ) : (
            bookings.map((b) => (
              <div className="card" key={b._id}>
                <div className="card-content">
                  <h3>{b.farmId?.name || "Farm Deleted"}</h3>
                  <p>📧 {b.userEmail}</p>
                  <p>📅 {new Date(b.date).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* CSS */}
      <style>{`
* {
  font-family: 'Inter', sans-serif;
}

/* ===== BACKGROUND ===== */
.container {
  min-height: 100vh;
  background: linear-gradient(
      rgba(20, 30, 20, 0.6),
      rgba(10, 20, 10, 0.7)
    ),
    url('https://images.unsplash.com/photo-1501785888041-af3ef285b470');

  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.overlay {
  padding: 50px 30px;
}

/* ===== HEADER ===== */
.header {
  text-align: center;
  color: #e8f5e9;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 600;
}

.header p {
  opacity: 0.8;
  font-size: 0.95rem;
}

/* ===== GRID ===== */
.booking-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

/* ===== CARD ===== */
.card {
  width: 260px;
  border-radius: 16px;

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

/* ✨ Hover effect */
.card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 18px 45px rgba(0,0,0,0.7);
}

/* ✨ Shine animation */
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

/* ===== CONTENT ===== */
.card-content {
  padding: 20px;
  color: #f1f5f1;
}

.card-content h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.card-content p {
  font-size: 0.9rem;
  opacity: 0.85;
  margin-bottom: 5px;
}

/* ===== EMPTY ===== */
.no-data {
  color: #ddd;
  text-align: center;
  font-size: 1rem;
}

/* ===== ANIMATION ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`}</style>
    </div>
  );
}

export default HostBookings;