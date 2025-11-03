import React, { useState, useEffect } from "react";
import "./GoogleMaps.css";

// Note: This is a placeholder implementation
// To use real Google Maps, install @react-google-maps/api
// npm install @react-google-maps/api

function GoogleMaps({ locations, center, zoom = 10 }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Initialize map when component mounts
    if (window.google && window.google.maps) {
      setMapLoaded(true);
    } else {
      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  const getMapUrl = () => {
    if (!center) return null;
    const { lat, lng } = center;
    const markers = locations.map((loc, idx) => 
      `&markers=label:${idx + 1}|${loc.lat},${loc.lng}`
    ).join('');
    
    return `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${lat},${lng}&zoom=${zoom}${markers}`;
  };

  const getDirectionsUrl = () => {
    if (locations.length < 2) return null;
    const waypoints = locations.map(loc => `${loc.lat},${loc.lng}`).join('/');
    return `https://www.google.com/maps/dir/${waypoints}`;
  };

  return (
    <div className="google-maps-container">
      <div className="maps-header">
        <h3>📍 Map View</h3>
        <div className="map-controls">
          {locations.length >= 2 && (
            <a 
              href={getDirectionsUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-directions"
            >
              Get Directions
            </a>
          )}
        </div>
      </div>

      {getMapUrl() ? (
        <div className="map-wrapper">
          <iframe
            title="Google Maps"
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0, borderRadius: '8px' }}
            src={getMapUrl()}
            allowFullScreen
          />
        </div>
      ) : (
        <div className="map-placeholder">
          <p>📍 Map will be displayed here</p>
          <p className="placeholder-note">Add locations to see them on the map</p>
        </div>
      )}

      {locations.length > 0 && (
        <div className="locations-list">
          <h4>Markers on Map</h4>
          {locations.map((loc, idx) => (
            <div key={idx} className="location-marker">
              <span className="marker-number">{idx + 1}</span>
              <span className="marker-name">{loc.name}</span>
              {loc.address && (
                <span className="marker-address">{loc.address}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GoogleMaps;


