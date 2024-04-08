import React from "react";
import "./registerForm.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const RegisterForm = (props) => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" placeholder="Email" required />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>

        <div className="remember">
          <label>
            <input type="checkbox" />
            remember me
          </label>
        </div>

        <button type="submit">Register</button>

        <div className="register-link">
          <p>
            Already have an account?<a href="#" onClick={props.onSwitchToLogin}>Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
