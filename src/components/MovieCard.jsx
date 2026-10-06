import { Link } from "react-router-dom";

import "./MovieCard.css";

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card-link"
    >
      <div className="movie-card">
        <img
          src={posterUrl}
          alt={movie.title}
        />

        <h3>{movie.title}</h3>

        <p>
          ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;