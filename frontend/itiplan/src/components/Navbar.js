import { Link } from "react-router-dom";
import "./Navbar.css"; // import external CSS

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Left side - Brand */}
      <Link to="/" className="logo">
        Itinerary Planner
      </Link>

      {/* Right side - Nav links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/login">Login</Link>
        
      </div>
    </nav>
  );
}




