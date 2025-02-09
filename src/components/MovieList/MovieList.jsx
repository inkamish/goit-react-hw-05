import { useNavigate } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const navigate = useNavigate();

  if (!movies || movies.length === 0) {
    return <p>No movies found</p>;
  }

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li
          className={styles.listItem}
          key={movie.id}
          onClick={() => handleMovieClick(movie.id)} // Перехід до деталей фільму
        ></li>
      ))}
    </ul>
  );
};

export default MovieList;
