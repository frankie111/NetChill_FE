import React, { useEffect } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import "./BrowsePage.css";
import { getIdToken } from "firebase/auth";
import { auth } from "../../firebase";

const BrowsePage = () => {
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
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </div>
  );
};

export default BrowsePage;
