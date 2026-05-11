import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function HostDashboard() {
  const [farm, setFarm] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
  });

  const [stats, setStats] = useState({
    totalFarms: 0,
    totalBookings: 0,
    revenue: 0,
  });

  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  // ✅ API URL from .env
  const API = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const farmsRes = await axios.get(`${API}/api/farms`);
      const bookingsRes = await axios.get(`${API}/api/bookings`);

      setFarms(farmsRes.data);

      const totalFarms = farmsRes.data.length;
      const totalBookings = bookingsRes.data.length;

      let revenue = 0;

      bookingsRes.data.forEach((b) => {
        revenue += b.farmId?.price || 0;
      });

      setStats({
        totalFarms,
        totalBookings,
        revenue,
      });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFarm({
      ...farm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/farms/add`,
        farm
      );

      toast.success(res.data.message);

      setFarm({
        name: "",
        location: "",
        price: "",
        image: "",
      });

      fetchData();

    } catch (err) {
      toast.error("Error adding farm");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this farm?")) return;

    try {
      await axios.delete(`${API}/api/farms/${id}`);

      toast.success("Farm removed");

      setFarms((prev) =>
        prev.filter((f) => f._id !== id)
      );

      fetchData();

    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container">
      <div className="overlay">

        {/* HEADER */}
        <div className="header">
          <h1>Host Dashboard</h1>
          <p>Manage your farms and monitor performance</p>

          <div className="header-buttons">
            <button className="btn bookings" onClick={() => navigate("/host-bookings")}>
              View Bookings
            </button>

            <button className="btn analytics" onClick={() => navigate("/host-analytics")}>
              Analytics
            </button>

            <button
              className="btn logout"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Farms</h3>
            <p>{stats.totalFarms}</p>
          </div>

          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>{stats.totalBookings}</p>
          </div>

          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>₹{stats.revenue}</p>
          </div>
        </div>

        {/* ADD FARM */}
        <div className="form-card">
          <h3>Add New Farm</h3>

          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Farm Name" value={farm.name} onChange={handleChange} />
            <input name="location" placeholder="Location" value={farm.location} onChange={handleChange} />
            <input name="price" placeholder="Price" value={farm.price} onChange={handleChange} />
            <input name="image" placeholder="Image URL" value={farm.image} onChange={handleChange} />

            <button type="submit" className="add-btn">Add Farm</button>
          </form>
        </div>

        {/* FARM LIST */}
        <div className="farm-grid">
          {farms.map((f) => (
            <div className="card" key={f._id}>
              <img src={f.image} alt="farm" />

              <div className="card-content">
                <h3>{f.name}</h3>
                <p>{f.location}</p>
                <p>₹{f.price}</p>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(f._id)}
                >
                  Remove Farm
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* CSS */}
      <style>{`
* {
  font-family: 'Inter', sans-serif;
}

.container {
  min-height: 100vh;
  background: linear-gradient(
      rgba(20, 30, 20, 0.6),
      rgba(10, 20, 10, 0.7)
    ),
    url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.overlay {
  padding: 50px 30px;
}

.header {
  text-align: center;
  color: #e8f5e9;
  margin-bottom: 30px;
}

.header-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 15px;
}

.btn {
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.25);
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}

.logout {
  color: #ff6b6b;
  background: rgba(255,0,0,0.1);
}

.bookings {
  background: rgba(255,255,255,0.9);
  color: #1b3d2f;
}

.analytics {
  background: rgba(76,175,80,0.2);
  color: #c8facc;
}

.stats-container {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin: 30px 0;
  flex-wrap: wrap;
}

.stat-card {
  padding: 20px;
  border-radius: 15px;
  width: 180px;
  text-align: center;
  color: white;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  transition: 0.3s;
}

.stat-card:hover {
  transform: translateY(-8px) scale(1.05);
}

.form-card {
  max-width: 420px;
  margin: auto;
  padding: 25px;
  border-radius: 15px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
}

.form-card input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
}

.add-btn {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background: linear-gradient(45deg, #2e7d32, #66bb6a);
  color: white;
}

.farm-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  margin-top: 40px;
}

.card {
  width: 260px;
  border-radius: 15px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-8px) scale(1.04);
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.card-content {
  padding: 12px;
  color: white;
}

.delete-btn {
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  background: rgba(255,0,0,0.2);
  color: #ff6b6b;
}

.delete-btn:hover {
  transform: scale(1.05);
}
`}</style>
    </div>
  );
}

export default HostDashboard;