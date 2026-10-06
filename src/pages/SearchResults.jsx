import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

import { searchMovies } from "../services/movieApi";

import "./SearchResults.css";

function SearchResults() {
  const { query } = useParams();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await searchMovies(query, page);

        setMovies(data.results || []);
      } catch (err) {
        console.error(err);

        setError("Unable to search movies.");

        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, page]);

  return (
    <div className="search-results-page">

      <h1>
        Search Results for "{query}"
      </h1>

      {/* LOADING */}

      {loading && (
        <Loader text="Searching movies..." />
      )}

      {/* ERROR */}

      {error && (
        <p className="search-status error">
          {error}
        </p>
      )}

      {/* NO RESULTS */}

      {!loading && !error && movies.length === 0 && (
        <p className="search-status">
          No movies found.
        </p>
      )}

      {/* RESULTS */}

      {!loading && !error && movies.length > 0 && (
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

export default SearchResults;