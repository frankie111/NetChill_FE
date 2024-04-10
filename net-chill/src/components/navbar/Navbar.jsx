import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  return (
    <nav>
      <Link to="/browse" className="title">
        NetChill
      </Link>

      <form id="form">
        <input type="text" placeholder="search" className="search" />
      </form>

      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/browse">Browse</NavLink>
        </li>
        <li>
          <NavLink to="/my-account">My Account</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={handleSignOut}>
            Sign Out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
