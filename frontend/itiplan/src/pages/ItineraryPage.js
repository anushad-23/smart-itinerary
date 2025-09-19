import { useLocation, useNavigate } from "react-router-dom";

function ItineraryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state;

  if (!trip) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No itinerary found.</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "purple",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", background: "#faf5ff", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "purple" }}>{trip.title}</h1>
      <p style={{ textAlign: "center" }}>
        {trip.startDate} → {trip.endDate}
      </p>

      {trip.itinerary.map((dayPlan) => (
        <div
          key={dayPlan.day}
          style={{
            background: "white",
            margin: "20px auto",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "600px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h2 style={{ color: "purple" }}>Day {dayPlan.day}</h2>

          <h3>Places to Visit</h3>
          <ul>
            {dayPlan.places.map((place, i) => (
              <li key={i}>
                <strong>{place.name}</strong> ({place.time})
              </li>
            ))}
          </ul>

          <h3>Food & Dining</h3>
          <ul>
            {dayPlan.food.map((meal, i) => (
              <li key={i}>
                <strong>{meal.name}</strong> ({meal.time})
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            background: "purple",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default ItineraryPage;


