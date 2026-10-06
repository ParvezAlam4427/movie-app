import { useEffect, useState } from "react";

import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

import { getPopularMovies } from "../services/movieApi";

import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularMovies(page);

        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load popular movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="home-page">
      <h1>Popular Movies</h1>

      {loading && (
        <Loader text="Loading movies..." />
      )}

      {error && (
        <p className="status error">
          {error}
        </p>
      )}

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

export default Home;