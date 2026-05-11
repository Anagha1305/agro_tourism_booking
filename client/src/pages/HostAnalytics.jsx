import { useEffect, useState } from "react";
import axios from "axios";

function HostAnalytics() {
  const [data, setData] = useState([]);

  // ✅ API URL from .env
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/bookings/analytics/summary`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [API]);

  return (
    <div className="container">
      <div className="overlay">

        {/* HEADER */}
        <div className="header">
          <h1>Farm Analytics 📊</h1>
          <p>Insights into your farm bookings</p>
        </div>

        {/* CARDS */}
        <div className="analytics-grid">
          {data.length === 0 ? (
            <p className="no-data">No bookings yet</p>
          ) : (
            data.map((item, index) => (
              <div className="card" key={index}>
                
                <div className="card-content">
                  <h3>{item.farm?.name || "Unknown Farm"}</h3>

                  <p className="bookings">
                    📦 Total Bookings: <b>{item.totalBookings}</b>
                  </p>

                  <div className="users">
                    <p className="user-title">👥 Users</p>

                    {item.users.map((u, i) => (
                      <span key={i} className="user-chip">
                        {u}
                      </span>
                    ))}
                  </div>

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

/* ===== UNIQUE BACKGROUND ===== */
.container {
  min-height: 100vh;
  background: linear-gradient(
      rgba(25, 25, 50, 0.6),
      rgba(10, 10, 25, 0.8)
    ),
    url('https://images.unsplash.com/photo-1519389950473-47ba0277781c');

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
  color: #e3f2fd;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.6rem;
}

.header p {
  opacity: 0.8;
  font-size: 0.95rem;
}

/* ===== GRID ===== */
.analytics-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

/* ===== CARD ===== */
.card {
  width: 280px;
  border-radius: 18px;

  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);

  border: 1px solid rgba(255,255,255,0.2);

  box-shadow: 
    0 10px 35px rgba(0,0,0,0.6),
    inset 0 0 10px rgba(255,255,255,0.05);

  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
}

/* ✨ Hover Magic */
.card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
}

/* ✨ Glow Shine Effect */
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

/* BOOKINGS */
.bookings {
  font-size: 0.95rem;
  margin-bottom: 12px;
}

/* USERS */
.users {
  margin-top: 10px;
}

.user-title {
  font-size: 0.85rem;
  opacity: 0.8;
  margin-bottom: 5px;
}

/* USER TAGS */
.user-chip {
  display: inline-block;
  padding: 5px 10px;
  margin: 4px;
  border-radius: 20px;

  background: rgba(33,150,243,0.2);
  color: #90caf9;
  font-size: 0.75rem;

  transition: 0.3s;
}

.user-chip:hover {
  background: rgba(33,150,243,0.4);
  transform: scale(1.08);
}

/* EMPTY */
.no-data {
  color: #ddd;
  font-size: 1rem;
}
`}</style>
    </div>
  );
}

export default HostAnalytics;