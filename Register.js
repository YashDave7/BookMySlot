import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/auth/login/", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username,
          password: pass,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      console.log(json);
      localStorage.setItem("token", json.token);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="auth-form-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="john"
              id="email"
              name="email"
            />
            <label htmlFor="password">password</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            <button type="submit">Log In</button>
          </form>
          {/* <Link to="/register" className="link-btn">
            Don't have an account? Register here.
          </Link> */}
        </div>
      </div>
    </>
  );
};