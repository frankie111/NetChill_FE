import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import "./BrowsePage.css";
import { getIdToken } from "firebase/auth";
import { auth } from "../../firebase";

const BrowsePage = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const token = await getIdToken(auth.currentUser);
      const response = await fetch(`https://localhost:8000/movies/`, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.movies || []);
      console.log(data);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="browse-container">
      <div className="browse-content">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.original_title}
            overview={movie.overview}
            rating={movie.vote_average}
            image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
