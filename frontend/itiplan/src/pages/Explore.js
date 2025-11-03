import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDestinations = async () => {
    if (!search) return;
    setLoading(true);

    try {
      const response = await API.get(
        `/api/search_places/?query=${encodeURIComponent(search)}`
      );

      if (response.data.results) {
        setResults(response.data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setResults([]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchDestinations();
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🌍 Explore Destinations</h1>

      {/* Search bar */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            padding: "12px",
            fontSize: "1rem",
            width: "60%",
            maxWidth: "400px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={fetchDestinations}
          style={{
            marginLeft: "10px",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🔍 Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>⏳ Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >
          {results.length > 0 ? (
            results.map((place, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  background: "white",
                  transition: "transform 0.2s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <h3 style={{ marginBottom: "10px", color: "#333" }}>{place.name}</h3>
                <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
                  {place.formatted_address}
                </p>
                {place.photos && place.photos.length > 0 ? (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=YOUR_API_KEY`}
                    alt={place.name}
                    style={{ 
                      width: "100%", 
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "15px"
                    }}
                  />
                ) : (
                  <div style={{ 
                    width: "100%", 
                    height: "200px",
                    background: "#f0f0f0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "15px"
                  }}>
                    <p style={{ color: "#999" }}>📍 No image available</p>
                  </div>
                )}
                {place.rating && (
                  <p style={{ marginBottom: "10px" }}>
                    ⭐ {place.rating} {place.user_ratings_total && `(${place.user_ratings_total} reviews)`}
                  </p>
                )}
                <button
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                    width: "100%"
                  }}
                  onClick={() => {
                    // Navigate to create trip or add to existing trip
                    navigate("/create-trip");
                  }}
                >
                  ➕ Add to Trip
                </button>
              </div>
            ))
          ) : search ? (
            <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#999", fontSize: "18px" }}>
              No results found. Try another destination.
            </p>
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#999", fontSize: "18px" }}>
              Start searching to discover amazing places! 🌟
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
