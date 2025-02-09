import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import styles from "./MovieDetailsPage.module.css";
import { useEffect, useState } from "react";
import { getMovieById, getCredits, getReviews } from "../components/API/API";

const buildLink = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieById(movieId);
        const movieCredits = await getCredits(movieId);
        const movieReviews = await getReviews(movieId);

        setMovieDetails(movieData);
        setCredits(movieCredits.cast);
        setReviews(movieReviews.results);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) return <p>Loading movie details...</p>;

  const { poster_path, original_title, overview, genres, vote_average } =
    movieDetails;

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.btn} onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className={styles.imgAndDescContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={original_title}
          className={styles.moviePoster}
        />
        <div>
          <h2 className={styles.movieTitle}>{original_title}</h2>
          <p className={styles.movieDesc}>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((genre) => genre.name).join(", ")}</p>
          <h4>Rating</h4>
          <p>{vote_average}</p>
        </div>
      </div>
      <div>
        <h4>Additional Information</h4>
        <nav className={styles.nav}>
          <NavLink to="cast" className={buildLink}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={buildLink}>
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
