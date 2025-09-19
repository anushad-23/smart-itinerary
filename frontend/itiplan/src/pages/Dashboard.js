import { useNavigate } from "react-router-dom";

const trips = [
  {
    id: 1,
    title: "Paris Adventure",
    startDate: "2025-09-20",
    endDate: "2025-09-27",
    itinerary: [
      {
        day: 1,
        places: [
          { name: "Eiffel Tower", time: "10:00 AM - 12:30 PM" },
          { name: "Louvre Museum", time: "2:00 PM - 6:00 PM" }
        ],
        food: [
          { name: "Le Jules Verne", time: "1:00 PM (Lunch)" },
          { name: "Café de Flore", time: "7:30 PM (Dinner)" }
        ]
      },
      {
        day: 2,
        places: [
          { name: "Notre Dame", time: "9:00 AM - 11:00 AM" },
          { name: "Seine River Cruise", time: "4:00 PM - 6:00 PM" }
        ],
        food: [
          { name: "Le Procope", time: "12:30 PM (Lunch)" },
          { name: "Ladurée", time: "6:30 PM (Dinner)" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Tokyo Getaway",
    startDate: "2025-10-05",
    endDate: "2025-10-12",
    itinerary: [
      {
        day: 1,
        places: [
          { name: "Shibuya Crossing", time: "10:00 AM - 11:30 AM" },
          { name: "Meiji Shrine", time: "12:00 PM - 2:00 PM" }
        ],
        food: [
          { name: "Ichiran Ramen", time: "2:15 PM (Lunch)" },
          { name: "Sushi Dai", time: "7:00 PM (Dinner)" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Goa Beach Trip",
    startDate: "2025-11-15",
    endDate: "2025-11-20",
    itinerary: [
      {
        day: 1,
        places: [
          { name: "Baga Beach", time: "10:00 AM - 1:00 PM" },
          { name: "Fort Aguada", time: "2:00 PM - 4:30 PM" }
        ],
        food: [
          { name: "Fisherman's Wharf", time: "1:15 PM (Lunch)" },
          { name: "Gunpowder", time: "7:00 PM (Dinner)" }
        ]
      }
    ]
  }
];

function Dashboard() {
  const navigate = useNavigate();

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

      {trips.map((trip) => (
        <div
          key={trip.id}
          onClick={() => navigate(`/itinerary/${trip.id}`, { state: trip })}
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
          <p>Date: {trip.startDate}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
