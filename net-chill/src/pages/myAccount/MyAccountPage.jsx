import React, { useEffect, useState } from "react";
import { getIdToken } from "firebase/auth";
import { auth } from "../../firebase";
import ProfileCard from "../../components/profileCard/ProfileCard";
import "./MyAccountPage.css";

const MyAccountPage = () => {
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    try {
      const token = await getIdToken(auth.currentUser);
      const response = await fetch(`https://localhost:8000/user/${auth.currentUser.uid}`, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data.user);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="account-container">
      <div className="account-content">
        <div className="profile-card-container">
          <ProfileCard username={userData.username} email={userData.email}/>
        </div>

      </div>
    </div>
  );
};

export default MyAccountPage;
