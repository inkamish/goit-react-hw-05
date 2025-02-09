import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=4e090bc10d39a7cd423941a9fddf4f4a"
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1 className={styles.listTitle}>Trending now</h1>
      <ul className={styles.list}>
        {movies.length > 0 ? (
          movies.map(({ id, poster_path, original_title }) => (
            <li className={styles.listItem} key={id}>
              <NavLink to={`/movies/${id}`} className="movie-link">
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={original_title}
                  className={styles.moviePoster}
                />
                <h2>{original_title}</h2>
              </NavLink>
            </li>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
