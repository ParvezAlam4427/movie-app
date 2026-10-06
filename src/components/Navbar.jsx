import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import "./Navbar.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const searchQuery = query.trim();

    if (!searchQuery) {
      return;
    }

    navigate(`/search/${encodeURIComponent(searchQuery)}`);
    setQuery("");
  };

  const handleMobileSearch = () => {
    const searchQuery = window.prompt("Enter movie name:");

    if (searchQuery && searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          MOVIEDB
        </Link>

        <nav className="nav-links">
          <Link to="/">Popular</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>
        </nav>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            className="desktop-search-input"
            type="text"
            placeholder="Movie Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="desktop-search-button"
          >
            Search
          </button>

          <button
            type="button"
            className="mobile-search-button"
            onClick={handleMobileSearch}
            aria-label="Search movies"
          >
            <FiSearch />
          </button>
        </form>

      </div>
    </header>
  );
}

export default Navbar;