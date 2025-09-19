import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="auth-container">
      <h2>Welcome </h2>
      <p>Sign in to your account or create a new one</p>

      <div className="tab-container">
        <button
          className={!isSignUp ? "tab active" : "tab"}
          onClick={() => setIsSignUp(false)}
        >
          Sign In
        </button>
        <button
          className={isSignUp ? "tab active" : "tab"}
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
      </div>

      {!isSignUp ? (
        // Sign In Form
        <form className="form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn primary">Sign In</button>
        </form>
      ) : (
        // Sign Up Form
        <form className="form">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Create a password" />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" />

          <div className="options">
            <label>
              <input type="checkbox" /> I agree to the{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="btn primary">Create Account</button>
        </form>
      )}

      <div className="divider">OR CONTINUE WITH</div>
      <div className="socials">
        <button className="btn social google">Google</button>
        <button className="btn social twitter">Facebook</button>
      </div>
    </div>
  );
};

export default Login;
