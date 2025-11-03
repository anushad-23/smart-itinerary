import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await API.get('/api/trips/');
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh" }}>
        <p>Loading your trips...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", background: "#f5f0ff", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "purple" }}>My Dashboard</h1>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          style={{
            background: "linear-gradient(90deg, #8b5cf6, #7c3aed)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
          onClick={() => navigate("/create-trip")}
        >
          + Create New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>No trips yet. Create your first trip to get started!</p>
        </div>
      ) : (
        trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`/itinerary/${trip.id}`)}
            style={{
              background: "white",
              padding: "20px",
              margin: "15px 0",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
          >
            <h2 style={{ color: "purple" }}>{trip.title}</h2>
            <p><strong>Destination:</strong> {trip.destination}</p>
            <p><strong>Dates:</strong> {trip.start_date} → {trip.end_date}</p>
            <p><strong>Budget:</strong> ${trip.budget}</p>
            <p><strong>Duration:</strong> {trip.duration} days</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
