import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
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
  `${API}/api/auth/login`,
  form,
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

      toast.success(res.data.message);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "guest") {
        window.location.href = "/guest";
      } else {
        window.location.href = "/host";
      }

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.error || "Login failed"
      );
    }
  };

  return (
    <div className="container">
      <div className="overlay">

        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to continue</p>

          {/* 🔥 SOCIAL LOGIN */}
          <div className="social-login">
            <button className="google-btn">
              <img src="https://img.icons8.com/color/48/google-logo.png" alt="g"/>
              Continue with Google
            </button>

            <button className="github-btn">
              <img src="https://img.icons8.com/ios-glyphs/30/ffffff/github.png" alt="gh"/>
              Continue with GitHub
            </button>
          </div>

          {/* DIVIDER */}
          <div className="divider">
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account?
            <a href="/signup"> Signup</a>
          </p>
        </div>

      </div>

      {/* CSS */}
      <style>{`
* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

/* ===== BACKGROUND ===== */
.container {
  min-height: 100vh;
  background: linear-gradient(
      rgba(10, 25, 20, 0.6),
      rgba(5, 15, 10, 0.8)
    ),
    url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e');

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
.login-card {
  width: 340px;
  padding: 30px;
  border-radius: 18px;

  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);

  border: 1px solid rgba(255,255,255,0.2);

  box-shadow: 
    0 10px 40px rgba(0,0,0,0.5),
    inset 0 0 10px rgba(255,255,255,0.05);

  text-align: center;

  animation: fadeIn 0.6s ease;
}

.login-card h2 {
  color: #e8f5e9;
}

.subtitle {
  color: #c8e6c9;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

/* ===== SOCIAL LOGIN ===== */
.social-login {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.social-login button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 10px;
  border-radius: 10px;
  border: none;

  cursor: pointer;
  transition: 0.3s;
}

/* Google */
.google-btn {
  background: white;
  color: black;
}

.google-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255,255,255,0.4);
}

/* GitHub */
.github-btn {
  background: #24292e;
  color: white;
}

.github-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.6);
}

/* ===== DIVIDER ===== */
.divider {
  margin: 15px 0;
  position: relative;
  text-align: center;
  color: #ccc;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  width: 40%;
  height: 1px;
  background: rgba(255,255,255,0.2);
  top: 50%;
}

.divider::before {
  left: 0;
}
.divider::after {
  right: 0;
}

/* ===== INPUTS ===== */
.login-card input {
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

.login-card input::placeholder {
  color: #ddd;
}

.login-card input:focus {
  border: 1px solid #81c784;
  box-shadow: 0 0 8px rgba(129,199,132,0.6);
}

/* ===== LOGIN BUTTON ===== */
.login-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;

  border: none;
  cursor: pointer;

  background: linear-gradient(
    270deg,
    #2e7d32,
    #66bb6a,
    #2e7d32
  );

  background-size: 300% 300%;
  animation: gradientMove 6s ease infinite;

  color: white;
  font-weight: 600;

  transition: 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 25px rgba(76,175,80,0.5);
}

/* ===== SIGNUP ===== */
.signup-text {
  margin-top: 15px;
  color: #c8e6c9;
  font-size: 0.85rem;
}

.signup-text a {
  color: #a5d6a7;
  text-decoration: none;
  margin-left: 5px;
}

.signup-text a:hover {
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

export default Login;