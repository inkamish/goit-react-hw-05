import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCredits } from "../API/API";
import styles from "./MovieCast.module.css";
import { PropagateLoader } from "react-spinners";

const MovieCast = () => {
  const { movieId } = useParams();
  const [actorsWithPhoto, setActorsWithPhoto] = useState([]);
  const [actorsWithoutPhoto, setActorsWithoutPhoto] = useState([]);
  const [visibleActors, setVisibleActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function fetchCredits() {
      try {
        setIsLoading(true);
        const movieCredits = await getCredits(movieId);

        const withPhoto = movieCredits.cast.filter(
          (actor) => actor.profile_path
        );
        const withoutPhoto = movieCredits.cast.filter(
          (actor) => !actor.profile_path
        );

        setActorsWithPhoto(withPhoto);
        setActorsWithoutPhoto(withoutPhoto);
        setVisibleActors(withPhoto.slice(0, 8));
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching credits:", error);
        setIsLoading(false);
      }
    }

    fetchCredits();
  }, [movieId]);

  const handleShowMore = () => {
    setShowMore(true);
    setVisibleActors([...actorsWithPhoto]);
  };

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <PropagateLoader />
      </div>
    );
  }

  return (
    <>
      {actorsWithPhoto.length === 0 &&
        actorsWithoutPhoto.length === 0 &&
        !isLoading && <p>No cast information available.</p>}

      {visibleActors.length > 0 && (
        <ul className={styles.castList}>
          {visibleActors.map(({ id, name, profile_path }) => (
            <li key={id} className={styles.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={name}
                className={styles.actorImage}
              />
              <span className={styles.actorName}>{name}</span>
            </li>
          ))}
        </ul>
      )}

      {actorsWithPhoto.length + actorsWithoutPhoto.length > 8 && !showMore && (
        <button onClick={handleShowMore} className={styles.showMoreBtn}>
          Show More..
        </button>
      )}

      {showMore && actorsWithoutPhoto.length > 0 && (
        <ul className={styles.noPhotoList}>
          {actorsWithoutPhoto.map(({ id, name }) => (
            <li key={id} className={styles.noPhotoItem}>
              <span className={styles.actorName}>{name}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
