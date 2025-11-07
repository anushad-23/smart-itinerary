import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import ItineraryPage from "./pages/ItineraryPage";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/itinerary/:id" element={<ItineraryPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      <button
        onClick={() => setIsChatbotOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 999
        }}
      >
        💬
      </button>
    </Router>
  );
}
