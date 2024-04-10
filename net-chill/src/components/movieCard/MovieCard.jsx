import React from "react";
import "./MovieCard.css";

const MovieCard = () => {
  return (
    <div className="movie">
      <img
        src="https://pbs.twimg.com/media/Ev-Q-JFVEAQDBns?format=jpg&name=large"
        alt="godzilla vs kong"
      />

      <div className="movie-info">
        <h3>Movie title</h3>
        <span className="green">9.8</span>
      </div>

      <div className="overview">
        <h3>Overview</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi neque
        repellendus error impedit, cupiditate, deserunt dicta, iste optio ab
        asperiores fuga corrupti ipsam non unde. Illum sequi placeat aut
        recusandae?
      </div>
    </div>
  );
};

export default MovieCard;
