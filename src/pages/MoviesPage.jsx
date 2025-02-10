import SearchBar from "../components/SearchBar/SearchBar";
import MovieList from "../components/MovieList/MovieList";
import { getMovieByName } from "../components/API/API";
import { useState } from "react";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setHasSearched(true);

    try {
      const data = await getMovieByName(query);
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {hasSearched && movies.length === 0 && <p>No movies found</p>}
      {hasSearched && movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
