import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ onSearch }) => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(e.target.elements[0].value);
  };

  return (
    <div className="nav-container">
      <nav>
        <Link to="/browse" className="title">
          NetChill
        </Link>

        {location.pathname !== "/my-account" && (
          <form onSubmit={handleSearch}>
            <div className="search-box">
              <input type="text" placeholder="search" className="search" />
              <FaSearch className="icon" />
            </div>
          </form>
        )}

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
    </div>
  );
};

export default Navbar;
