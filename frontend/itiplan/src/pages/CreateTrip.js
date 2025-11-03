import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTrip.css";
import API from "../api/axios";

function CreateTrip() {
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    preferences: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const preferencesList = [
    { id: 1, name: "Cultural & Historical Sites" },
    { id: 2, name: "Nature & Outdoor Activities" },
    { id: 3, name: "Food & Culinary Experiences" },
    { id: 4, name: "Entertainment & Nightlife" },
    { id: 5, name: "Shopping" },
    { id: 6, name: "Adventure Sports" },
    { id: 7, name: "Relaxation & Wellness" },
    { id: 8, name: "Photography" },
    { id: 9, name: "Museums & Art" },
    { id: 10, name: "Local Markets" },
    { id: 11, name: "Architecture" },
    { id: 12, name: "Wildlife" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (pref) => {
    setTrip((prev) => {
      if (prev.preferences.includes(pref.id)) {
        return {
          ...prev,
          preferences: prev.preferences.filter((p) => p !== pref.id),
        };
      } else {
        return { ...prev, preferences: [...prev.preferences, pref.id] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (trip.preferences.length === 0) {
      alert("Please select at least one preference!");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('/api/trips/', {
        title: `${trip.destination} Trip`,
        destination: trip.destination,
        start_date: trip.startDate,
        end_date: trip.endDate,
        budget: trip.budget || 0,
        interests: trip.preferences
      });
      
      alert("Trip created successfully 🎉");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Failed to create trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create New Trip</h2>
      <form onSubmit={handleSubmit}>
        <label>Destination *</label>
        <input
          type="text"
          name="destination"
          placeholder="e.g., Paris, France"
          value={trip.destination}
          onChange={handleChange}
          required
        />

        <label>Start Date *</label>
        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
          required
        />

        <label>End Date *</label>
        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
          required
        />

        <label>Budget (Optional)</label>
        <input
          type="number"
          name="budget"
          placeholder="e.g., 5000"
          value={trip.budget}
          onChange={handleChange}
          min="0"
        />

        <label>Travel Preferences *</label>
        <p style={{ fontSize: "13px", color: "#666" }}>
          Select what interests you most (choose at least one):
        </p>
        <div className="preferences">
          {preferencesList.map((pref) => (
            <label key={pref.id}>
              <input
                type="checkbox"
                checked={trip.preferences.includes(pref.id)}
                onChange={() => handleCheckbox(pref)}
              />
              {pref.name}
            </label>
          ))}
        </div>

        <div className="buttons">
          <button
            type="button"
            className="btn cancel"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn create"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Trip"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTrip;
