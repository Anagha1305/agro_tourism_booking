import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "guest",
  });

  // ✅ API URL from .env
  const API = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/auth/signup`,
        form
      );

      toast.success(res.data.message);

    } catch (err) {
      toast.error(
        err.response?.data?.error || "Signup failed ❌"
      );
    }
  };

  return (
    <div className="container">
      <div className="overlay">

        <div className="signup-card">
          <h2>Create Account</h2>
          <p className="subtitle">Join Agro Tourism 🌿</p>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            {/* ROLE SELECT */}
            <select name="role" onChange={handleChange}>
              <option value="guest">Guest 🌾</option>
              <option value="host">Host 🚜</option>
            </select>

            <button type="submit" className="signup-btn">
              Signup
            </button>
          </form>

          <p className="login-text">
            Already have an account?
            <a href="/"> Login</a>
          </p>
        </div>

      </div>

      {/* CSS */}
      <style>{`
* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

/* ===== BACKGROUND (different from login) ===== */
.container {
  min-height: 100vh;
  background: linear-gradient(
      rgba(20, 30, 40, 0.6),
      rgba(10, 20, 30, 0.8)
    ),
    url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6');

  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.overlay {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ===== CARD ===== */
.signup-card {
  width: 350px;
  padding: 30px;
  border-radius: 18px;

  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(18px);

  border: 1px solid rgba(255,255,255,0.2);

  box-shadow: 
    0 10px 40px rgba(0,0,0,0.5),
    inset 0 0 10px rgba(255,255,255,0.05);

  text-align: center;

  animation: fadeIn 0.6s ease;
}

.signup-card h2 {
  color: #e3f2fd;
}

.subtitle {
  color: #bbdefb;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

/* ===== INPUTS ===== */
.signup-card input,
.signup-card select {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;

  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.25);

  background: rgba(255,255,255,0.12);
  color: white;

  outline: none;
  transition: 0.3s;
}

.signup-card input::placeholder {
  color: #ddd;
}

.signup-card input:focus,
.signup-card select:focus {
  border: 1px solid #64b5f6;
  box-shadow: 0 0 8px rgba(100,181,246,0.6);
}

/* ===== BUTTON ===== */
.signup-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;

  border: none;
  cursor: pointer;

  background: linear-gradient(
    270deg,
    #1976d2,
    #42a5f5,
    #1976d2
  );

  background-size: 300% 300%;
  animation: gradientMove 6s ease infinite;

  color: white;
  font-weight: 600;

  transition: 0.3s;
}

.signup-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 25px rgba(33,150,243,0.5);
}

/* ===== LOGIN LINK ===== */
.login-text {
  margin-top: 15px;
  color: #bbdefb;
  font-size: 0.85rem;
}

.login-text a {
  color: #90caf9;
  text-decoration: none;
  margin-left: 5px;
}

.login-text a:hover {
  text-decoration: underline;
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

@keyframes gradientMove {
  0% { background-position: 0% }
  50% { background-position: 100% }
  100% { background-position: 0% }
}
`}</style>
    </div>
  );
}

export default Signup;