import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "📍",
      title: "Smart Destinations",
      description: "Discover amazing places tailored to your preferences and travel style."
    },
    {
      icon: "📅",
      title: "Perfect Timing",
      description: "Plan your trips with optimal dates and weather considerations."
    },
    {
      icon: "❤️",
      title: "Personalized Experience",
      description: "Every itinerary is crafted based on your unique interests and preferences."
    },
    {
      icon: "🌍",
      title: "Global Coverage",
      description: "Explore destinations from bustling cities to hidden gems worldwide."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "TravelPlan made my European adventure absolutely perfect! Every recommendation was spot on."
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "The personalized itineraries saved me hours of research. Highly recommended!"
    },
    {
      name: "Emma Davis",
      rating: 5,
      comment: "Found amazing hidden gems I never would have discovered on my own."
    }
  ];

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div style={{ maxWidth: "700px", padding: "20px" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
            Plan Your Perfect <br />
            <span style={{ color: "#FFD700" }}>Adventure</span>
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "30px" ,color: "white"}}>
            Create personalized travel itineraries that match your style, interests, and dreams. 
            Your next unforgettable journey starts here.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "12px 24px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer"
              }}
            >
              ✈️ Start Planning
            </button>
            <button
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "12px 24px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid white",
                cursor: "pointer"
              }}
            >
              📷 Explore Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "60px 20px", backgroundColor: "#f9fafb" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "30px" }}>
          Why Choose TravelPlan?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{feature.title}</h3>
              <p style={{ color: "#555" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: "60px 20px", backgroundColor: "#f3f4f6" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "30px" }}>
          What Travelers Say
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} style={{ color: "#FFD700", marginRight: "3px" }}>⭐</span>
                ))}
              </div>
              <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                "{t.comment}"
              </p>
              <strong>{t.name}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

