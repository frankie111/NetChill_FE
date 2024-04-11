import React, { useState } from "react";
import "./LoginForm.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const LoginForm = ({ onSwitchToRegister, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="remember-forget">
          <label>
            <input type="checkbox" />
            remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit">Login</button>

        <div className="register-link">
          <p>
            Don't have an account?
            <a href="#" onClick={onSwitchToRegister}>
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
