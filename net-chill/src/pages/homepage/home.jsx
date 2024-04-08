import React, { useState } from "react";
import "./home.css";
import LoginForm from "../../components/loginForm/loginForm";
import RegisterForm from "../../components/registerForm/registerForm";

const Home = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitchToLogin = () => {
    setIsRegistering(false);
  };

  const handleSwitchToRegister = () => {
    setIsRegistering(true);
  };

  return (
    <div className="home-container">
      <h1 className="title">NetChill</h1>
      {isRegistering ? (
        <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <LoginForm onSwitchToRegister={handleSwitchToRegister} />
      )}
    </div>
  );
};

export default Home;
