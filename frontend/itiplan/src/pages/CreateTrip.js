import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTrip.css"; 

function CreateTrip() {
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    preferences: [],
  });
  const navigate = useNavigate();
  const preferencesList = [
    "Cultural & Historical Sites",
    "Nature & Outdoor Activities",
    "Food & Culinary Experiences",
    "Entertainment & Nightlife",
    "Shopping",
    "Adventure Sports",
    "Relaxation & Wellness",
    "Photography",
    "Museums & Art",
    "Local Markets",
    "Architecture",
    "Wildlife",
  ];

  // Handle text/date inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckbox = (pref) => {
    setTrip((prev) => {
      if (prev.preferences.includes(pref)) {
        return {
          ...prev,
          preferences: prev.preferences.filter((p) => p !== pref),
        };
      } else {
        return { ...prev, preferences: [...prev.preferences, pref] };
      }
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (trip.preferences.length === 0) {
      alert("Please select at least one preference!");
      return;
    }

    console.log("Trip Saved:", trip);
    alert("Trip saved successfully 🎉 (check console)");

    // Example: Save to localStorage
    localStorage.setItem("trip", JSON.stringify(trip));
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Create New Trip</h2>
      <form onSubmit={handleSubmit}>
        {/* Destination */}
        <label>Destination *</label>
        <input
          type="text"
          name="destination"
          placeholder="e.g., Paris, France"
          value={trip.destination}
          onChange={handleChange}
          required
        />

        {/* Dates */}
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

        {/* Preferences */}
        <label>Travel Preferences *</label>
        <p style={{ fontSize: "13px", color: "#666" }}>
          Select what interests you most (choose at least one):
        </p>
        <div className="preferences">
          {preferencesList.map((pref) => (
            <label key={pref}>
              <input
                type="checkbox"
                checked={trip.preferences.includes(pref)}
                onChange={() => handleCheckbox(pref)}
              />
              {pref}
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="buttons">
          <button
            type="button"
            className="btn cancel"
            onClick={() =>
              setTrip({ destination: "", startDate: "", endDate: "", preferences: [] })
            }
          >
            Cancel
          </button>
          <button type="submit" className="btn create">
            Create Trip
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTrip;

