import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../API/API";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const data = await getReviews(movieId);
        setReviews(data.results);
        setVisibleReviews(data.results.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching reviews:", error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleShowMore = () => {
    setShowMore(true);
    setVisibleReviews(reviews);
  };

  return (
    <div>
      {isLoading && <p>Loading reviews...</p>}
      {reviews.length === 0 && !isLoading && <p>No reviews available.</p>}

      {visibleReviews.length > 0 && !isLoading && (
        <ul className={styles.reviewList}>
          {visibleReviews.map((review) => (
            <li className={styles.reviewItem} key={review.id}>
              <p>
                <span className={styles.reviewAuthor}>{review.author}</span>:{" "}
                {review.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      {reviews.length > 5 && !showMore && (
        <button className={styles.showMoreBtn} onClick={handleShowMore}>
          Show More..
        </button>
      )}
    </div>
  );
};

export default MovieReviews;
