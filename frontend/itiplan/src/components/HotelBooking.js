import React, { useState, useEffect } from "react";
import API from "../api/axios";
import "./HotelBooking.css";

function HotelBooking({ tripId }) {
  const [hotels, setHotels] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Fetch hotels if trip has a destination
    // For demo, we'll populate some sample hotels
    setHotels([
      {
        id: 1,
        name: "Grand Luxury Hotel",
        address: "123 Main Street",
        city: "Paris",
        country: "France",
        price_per_night: 150,
        rating: 4.5,
        description: "Luxury hotel in the heart of the city",
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        amenities: ["WiFi", "Pool", "Spa", "Restaurant"]
      },
      {
        id: 2,
        name: "Ocean View Resort",
        address: "456 Beach Road",
        city: "Paris",
        country: "France",
        price_per_night: 200,
        rating: 4.8,
        description: "Stunning ocean views and modern amenities",
        image_url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        amenities: ["WiFi", "Pool", "Beach Access", "Bar"]
      }
    ]);
  }, []);

  const searchHotels = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/api/hotels/search/?city=${encodeURIComponent(searchCity)}`);
      setHotels(response.data);
    } catch (error) {
      console.error("Error searching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookHotel = async () => {
    if (!selectedHotel || !checkIn || !checkOut) {
      alert("Please select a hotel and dates");
      return;
    }

    try {
      const response = await API.post(`/api/trips/${tripId}/book_hotel/`, {
        hotel_id: selectedHotel.id,
        check_in: checkIn,
        check_out: checkOut
      });
      setBooking(response.data);
      alert("Hotel booked successfully!");
    } catch (error) {
      console.error("Error booking hotel:", error);
      alert("Failed to book hotel");
    }
  };

  return (
    <div className="hotel-booking">
      <h2>Hotel Booking</h2>
      
      <div className="hotel-search">
        <input
          type="text"
          placeholder="Search by city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button onClick={searchHotels}>Search</button>
      </div>

      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <div 
            key={hotel.id} 
            className={`hotel-card ${selectedHotel?.id === hotel.id ? 'selected' : ''}`}
            onClick={() => setSelectedHotel(hotel)}
          >
            <img src={hotel.image_url} alt={hotel.name} />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p className="hotel-location">{hotel.address}, {hotel.city}</p>
              <div className="hotel-rating">
                ⭐ {hotel.rating}
              </div>
              <p className="hotel-price">${hotel.price_per_night}/night</p>
              <div className="hotel-amenities">
                {hotel.amenities.map((amenity, idx) => (
                  <span key={idx} className="amenity-tag">{amenity}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedHotel && (
        <div className="booking-form">
          <h3>Book {selectedHotel.name}</h3>
          <div className="form-group">
            <label>Check-in Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Check-out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <button onClick={handleBookHotel} className="btn-book">
            Book Now
          </button>
        </div>
      )}

      {booking && (
        <div className="booking-confirmation">
          <h3>Booking Confirmed!</h3>
          <p>Hotel: {booking.hotel.name}</p>
          <p>Check-in: {booking.check_in}</p>
          <p>Check-out: {booking.check_out}</p>
          <p>Total: ${booking.total_cost}</p>
        </div>
      )}
    </div>
  );
}

export default HotelBooking;


