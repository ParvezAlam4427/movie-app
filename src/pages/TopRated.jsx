import { useEffect, useState } from "react";

import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

import { getTopRatedMovies } from "../services/movieApi";

import "./TopRated.css";

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTopRatedMovies(page);

        setMovies(data.results || []);
      } catch (err) {
        console.error(err);

        setError("Unable to load top rated movies.");

        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="top-rated-page">

      {/* PAGE TITLE */}

      <h1>Top Rated Movies</h1>

      {/* LOADING */}

      {loading && (
        <Loader text="Loading movies..." />
      )}

      {/* ERROR */}

      {error && (
        <p className="status error">
          {error}
        </p>
      )}

      {/* MOVIES */}

      {!loading && !error && (
        <>
          <MovieGrid movies={movies} />

          <Pagination
            page={page}
            setPage={setPage}
          />
        </>
      )}

    </div>
  );
}

export default TopRated;