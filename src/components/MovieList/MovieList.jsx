import { NavLink, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies, hasSearched }) => {
  const location = useLocation();
  return (
    <>
      {hasSearched && movies.length === 0 && <p>No movies found</p>}

      <ul className={styles.list}>
        {movies.map(({ id, poster_path, title, release_date }) => (
          <li className={styles.listItem} key={id}>
            <NavLink
              to={`/movies/${id}`}
              state={{ from: location }}
              className={styles.movieLink}
            >
              {poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className={styles.moviePoster}
                />
              ) : (
                <div className={styles.placeholder}>No poster</div>
              )}
              <h2>
                {title} ({release_date?.slice(0, 4)})
              </h2>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
