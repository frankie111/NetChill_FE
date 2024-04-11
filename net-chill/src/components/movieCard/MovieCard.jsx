import React from "react";
import "./MovieCard.css";
import placeholderImage from "../../assets/placeholder-image.png";

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
        src={image || placeholderImage}
        alt="Missing Poster"
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
