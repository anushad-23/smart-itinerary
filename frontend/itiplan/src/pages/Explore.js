import React, { useState } from "react";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDestinations = async () => {
    if (!search) return;
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/search_places/?query=${encodeURIComponent(search)}`
      );

      const data = await response.json();
      if (data.results) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🌍 Explore Destinations</h1>

      {/* Search bar */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
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
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          🔍 Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p style={{ textAlign: "center" }}>⏳ Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
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
                }}
              >
                <h3>{place.name}</h3>
                <p>{place.formatted_address}</p>
                {place.photos ? (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=YOUR_API_KEY`}
                    alt={place.name}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                ) : (
                  <p>📍 No image available</p>
                )}
                <button
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  ➕ Add to Trip
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              No results found. Try another destination.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;




