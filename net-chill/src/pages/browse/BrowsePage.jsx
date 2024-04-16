import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import "./BrowsePage.css";
import { getIdToken } from "firebase/auth";
import { auth } from "../../firebase";

const BrowsePage = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const fetchMostPopularMovies = async () => {
    try {
      const token = await getIdToken(auth.currentUser);
      const response = await fetch(`https://localhost:8000/movies/${page}`, {
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
      setPageCount(data.page_count || 1);
      console.log(data);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const fetchMoviesBySearch = async () => {
    try {
      const token = await getIdToken(auth.currentUser);
      const response = await fetch(
        `https://localhost:8000/movies/${searchTerm}/${page}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies by search");
      }
      const data = await response.json();
      setMovies(data.movies || []);
      setPageCount(data.page_count || 1);
      console.log(data);
    } catch (error) {
      console.error("Error fetching movies by search", error);
    }
  };

  useEffect(() => {
    if (searchTerm) fetchMoviesBySearch();
    else fetchMostPopularMovies();
  }, [page, searchTerm]);

  const handleNextPage = () => {
    if (page < pageCount) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

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

      <div className="pagination">
        <div
          className={page === 1 ? "page disabled" : "page"}
          id="prev"
          onClick={handlePrevPage}
        >
          Prev
        </div>
        <div className="current">{`${page}/${pageCount}`}</div>
        <div
          className={page === pageCount ? "page disabled" : "page"}
          id="next"
          onClick={handleNextPage}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
