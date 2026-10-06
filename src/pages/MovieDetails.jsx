import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  getMovieDetails,
  getMovieCast,
} from "../services/movieApi";

import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const movieData = await getMovieDetails(id);
        const castData = await getMovieCast(id);

        setMovie(movieData);
        setCast(castData.cast || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="details-status">
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-status error">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="details-status error">
        Movie not found.
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-details-page">

      {/* Movie Information */}

      <section className="movie-info">

        <div className="movie-main">

          <img
            src={posterUrl}
            alt={movie.title}
            className="details-poster"
          />

          <div className="movie-text">

            <h1>{movie.title}</h1>

            {movie.tagline && (
              <p className="tagline">
                "{movie.tagline}"
              </p>
            )}

            <p className="rating">
              ⭐ {movie.vote_average.toFixed(1)} / 10
            </p>

            <p>
              <strong>Release Date:</strong>{" "}
              {movie.release_date || "N/A"}
            </p>

            <p>
              <strong>Runtime:</strong>{" "}
              {movie.runtime
                ? `${movie.runtime} minutes`
                : "N/A"}
            </p>

            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres?.length
                ? movie.genres
                    .map((genre) => genre.name)
                    .join(", ")
                : "N/A"}
            </p>

          </div>
        </div>

        {/* Overview */}

        <div className="overview">

          <h2>Overview</h2>

          <p>
            {movie.overview ||
              "No overview available."}
          </p>

        </div>

      </section>

      {/* Cast */}

      <section className="cast-section">

        <h2>Cast</h2>

        <div className="cast-grid">

          {cast.slice(0, 10).map((person) => {

            const profileImage = person.profile_path
              ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
              : null;

            return (
              <div
                className="cast-card"
                key={person.id}
              >

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={person.name}
                  />
                ) : (
                  <div className="no-cast-image">
                    No Image
                  </div>
                )}

                <h3>{person.name}</h3>

                <p>
                  {person.character ||
                    "Unknown Character"}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* Back Button */}

      <div className="back-button-container">

        <Link
          to="/"
          className="back-button"
        >
          ← Back to Popular Movies
        </Link>

      </div>

    </div>
  );
}

export default MovieDetails;