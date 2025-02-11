import SearchBar from "../components/SearchBar/SearchBar";
import MovieList from "../components/MovieList/MovieList";
import { getMovieByName } from "../components/API/API";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const data = await getMovieByName(query);
        setMovies(data.results);
        setHasSearched(true);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (newQuery) => {
    if (!newQuery.trim()) return;

    setSearchParams({ query: newQuery });
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
