import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GuestDashboard from "./pages/GuestDashboard";
import HostDashboard from "./pages/HostDashboard";
import MyBookings from "./pages/MyBookings";
import HostBookings from "./pages/HostBookings";
import HostAnalytics from "./pages/HostAnalytics";

function App() {
  return (
    <Router>
      {/* 🌐 Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/guest" element={<GuestDashboard />} />
        <Route path="/host" element={<HostDashboard />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/host-bookings" element={<HostBookings />} />
        <Route path="/host-analytics" element={<HostAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;