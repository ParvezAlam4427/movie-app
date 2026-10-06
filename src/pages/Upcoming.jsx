import { useEffect, useState } from "react";

import MovieGrid from "../components/MovieGrid";
import { getUpcomingMovies } from "../services/movieApi";

import "./Upcoming.css";

function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUpcomingMovies(page);

        setMovies(data.results);
      } catch (err) {
        console.error(err);
        setError("Unable to load upcoming movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="upcoming-page">
      <h1>Upcoming Movies</h1>

      {loading && (
        <p className="status">
          Loading movies...
        </p>
      )}

      {error && (
        <p className="status error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <MovieGrid movies={movies} />

          <div className="pagination">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              ← Previous
            </button>

            <span>Page {page}</span>

            <button
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Upcoming;