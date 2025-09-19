import React from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  return (
    <div>
      <Navbar />
      <h1 style={{ marginTop: "100px", textAlign: "center" }}>👤 Profile</h1>
      <p style={{ textAlign: "center" }}>Manage your account and preferences.</p>
    </div>
  );
}
