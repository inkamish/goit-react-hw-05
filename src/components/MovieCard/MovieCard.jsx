import styles from "./MovieCard.module.css";

const MovieCard = ({
  poster_path,
  title,
  overview,
  genres,
  vote_average,
  release_date,
}) => {
  return (
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
  );
};

export default MovieCard;
