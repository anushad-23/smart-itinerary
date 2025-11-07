import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";
import ExpenseSplitter from "../components/ExpenseSplitter";
import "../pages/ItineraryPage.css";

function ItineraryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      const response = await API.get(`/api/trips/${id}/`);
      setTrip(response.data);
      // Fetch expenses for the trip
      const expensesResponse = await API.get(`/api/expenses/?trip=${id}`);
      setExpenses(expensesResponse.data);
    } catch (error) {
      console.error("Error fetching trip:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading itinerary...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No itinerary found.</h2>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="itinerary-page">
      <div className="itinerary-header">
        <h1>{trip.title}</h1>
        <p>{trip.start_date} → {trip.end_date}</p>
        <p><strong>Budget:</strong> ${trip.budget}</p>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === 'itinerary' ? 'active' : ''}
          onClick={() => setActiveTab('itinerary')}
        >
          📅 Itinerary
        </button>
        <button 
          className={activeTab === 'budget' ? 'active' : ''}
          onClick={() => setActiveTab('budget')}
        >
          💰 Budget & Expenses
        </button>
        <button 
          className={activeTab === 'hotels' ? 'active' : ''}
          onClick={() => setActiveTab('hotels')}
        >
          🏨 Hotels
        </button>
      </div>

      {activeTab === 'itinerary' && (
        <div className="itinerary-content">
          {trip.days && trip.days.length > 0 ? (
            trip.days.map((day) => (
              <div key={day.id} className="day-card">
                <h2>Day {day.day_number}</h2>
                <p className="day-date">{day.date}</p>
                {day.activities && day.activities.length > 0 ? (
                  day.activities.map((activity, idx) => (
                    <div key={idx} className="activity-item">
                      <div className="activity-time">
                        {activity.start_time} - {activity.end_time || "All Day"}
                      </div>
                      <div className="activity-details">
                        <h3>{activity.name}</h3>
                        <p className="activity-type">{activity.activity_type}</p>
                        {activity.description && <p>{activity.description}</p>}
                        {activity.location && (
                          <p className="activity-location">📍 {activity.location}</p>
                        )}
                        {activity.estimated_cost > 0 && (
                          <p className="activity-cost">💰 ${activity.estimated_cost}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-activities">No activities planned for this day.</p>
                )}
              </div>
            ))
          ) : (
            <div className="no-days">
              <p>No itinerary has been generated yet. Add activities to get started!</p>
              <button className="btn-add">Add Activities</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="budget-content">
          <div className="budget-summary">
            <h2>Budget Summary</h2>
            <div className="budget-stats">
              <div className="stat-item">
                <span className="stat-label">Total Budget</span>
                <span className="stat-value">${trip.budget}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Spent</span>
                <span className="stat-value">${trip.total_expenses || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Remaining</span>
                <span className="stat-value">${trip.budget - (trip.total_expenses || 0)}</span>
              </div>
            </div>
          </div>

          <ExpenseSplitter
            tripId={id}
            tripMembers={trip.members || []}
            expenses={expenses}
          />
        </div>
      )}

      {activeTab === 'hotels' && (
        <div className="hotels-content">
          <h2>Hotel Bookings</h2>
          <p>Hotel booking feature coming soon...</p>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="btn-back" onClick={() => navigate("/dashboard")}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default ItineraryPage;
