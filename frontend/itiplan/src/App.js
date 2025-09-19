import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import ItineraryPage from "./pages/ItineraryPage";
import Explore from "./pages/Explore";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/itinerary/:id" element={<ItineraryPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}
