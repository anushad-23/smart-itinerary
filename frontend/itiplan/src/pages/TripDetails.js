import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`api/trips/${id}/`)
      .then(res => setTrip(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!trip) return <div style={{ padding: 24 }}>Trip not found.</div>;

  return (
    <div style={{ padding: 24 }} className="container">
      <h2 style={{ color: "var(--brand)" }}>{trip.title || `${trip.destination} Trip`}</h2>
      <p style={{ color: "var(--muted)" }}>{trip.destination} • {trip.start_date} → {trip.end_date}</p>

      <h3 style={{ marginTop: 18 }}>Activities</h3>
      {trip.activities && trip.activities.length ? (
        <ul>
          {trip.activities.map(a => (
            <li key={a.id} style={{ padding: "8px 0" }}>
              <strong>Day {a.day}</strong> — {a.name} {a.category ? `(${a.category})` : ""} {a.start_time ? `• ${a.start_time}` : ""}
              {a.notes && <div style={{ color: "var(--muted)", marginTop: 6 }}>{a.notes}</div>}
            </li>
          ))}
        </ul>
      ) : <p style={{ color: "var(--muted)" }}>No activities added yet.</p>}
    </div>
  );
}
