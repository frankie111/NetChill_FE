import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./LoginPage.css";
import LoginForm from "../../components/loginForm/loginForm";
import RegisterForm from "../../components/registerForm/registerForm";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { auth } from "../../firebase";

const LoginPage = ({ user }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitchToLogin = () => {
    setIsRegistering(false);
  };

  const handleSwitchToRegister = () => {
    setIsRegistering(true);
  };

  const handleLogin = ({ email, password }) => {
    console.log("login");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleRegister = async ({ email, username, password }) => {
    console.log("register");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await getIdToken(user);

      const response = await fetch("https://localhost:8000/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          uid: user.uid,
          email: email,
          username: username,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save additional user data");
      }

      const responseData = await response.json();
      console.log(responseData.message);
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  if (user) {
    return <Navigate to="/browse"></Navigate>;
  }

  return (
    <div className="login-container">
      <h1 className="title">NetChill</h1>
      {isRegistering ? (
        <RegisterForm
          onSwitchToLogin={handleSwitchToLogin}
          onRegister={handleRegister}
        />
      ) : (
        <LoginForm
          onSwitchToRegister={handleSwitchToRegister}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default LoginPage;
