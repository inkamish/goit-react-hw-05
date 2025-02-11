import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import clsx from "clsx";
import styles from "./MovieDetailsPage.module.css";
import { useEffect, useState } from "react";
import { getMovieById } from "../../components/API/API";
import MovieCard from "../../components/MovieCard/MovieCard"; // Імпортуємо MovieCard

const buildLink = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieById(movieId);
        setMovieDetails(movieData);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) return <p>Loading movie details...</p>;

  const { poster_path, title, overview, genres, vote_average, release_date } =
    movieDetails;

  const backLinkHref = location.state?.from ?? "/movies";

  return (
    <div className={styles.detailsContainer}>
      <Link to={backLinkHref} className={styles.btn}>
        Go Back
      </Link>

      <MovieCard
        poster_path={poster_path}
        title={title}
        overview={overview}
        genres={genres}
        vote_average={vote_average}
        release_date={release_date}
      />

      <div>
        <h4>Additional Information :</h4>
        <nav className={styles.nav}>
          <NavLink
            to="cast"
            className={buildLink}
            state={{ from: backLinkHref }}
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            className={buildLink}
            state={{ from: backLinkHref }}
          >
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
