import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Popular Movies */}
        <Route path="/" element={<Home />} />

        {/* Top Rated Movies */}
        <Route path="/top-rated" element={<TopRated />} />

        {/* Upcoming Movies */}
        <Route path="/upcoming" element={<Upcoming />} />

        {/* Movie Details */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* Search Results */}
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;