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
import { getMovieById } from "../components/API/API";

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

      <div className={styles.imgAndDescContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className={styles.moviePoster}
        />
        <div className={styles.descContainer}>
          <h2 className={styles.movieTitle}>
            {title} ({release_date?.slice(0, 4)})
          </h2>
          <p className={styles.movieDesc}>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((genre) => genre.name).join(", ")}</p>
          <h4>Rating</h4>
          <div className={styles.ratingContainer}>
            <div
              className={styles.ratingFill}
              style={{ width: `${vote_average * 10}%` }}
            ></div>
          </div>
          <p>{vote_average}</p>
        </div>
      </div>
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
