import React from "react";
import "./MovieCard.css";

const MovieCard = ({ title, overview, rating, image }) => {
  const getRatingColor = () => {
    if (rating >= 8) {
      return "green";
    }
    if (rating >= 6) {
      return "orange";
    }
    return "red";
  };

  return (
    <div className="movie">
      <img
        src={image || "https://via.placeholder.com/200"}
        alt="godzilla vs kong"
      />

      <div className="movie-info">
        <h3>{title || "Movie title"}</h3>
        <span className={getRatingColor()}>{rating || "N/A"}</span>
      </div>

      <div className="overview">
        <h3>Overview</h3>
        {overview || "No overview"}
      </div>
    </div>
  );
};

export default MovieCard;
