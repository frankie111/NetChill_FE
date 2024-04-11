import React from "react";
import profileIcon from "../../assets/profile-icon.svg";
import "./ProfileCard.css";

const ProfileCard = ({username, email}) => {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={profileIcon} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>{username || "Username"}</h2>
        <p>{email || "Email"}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
