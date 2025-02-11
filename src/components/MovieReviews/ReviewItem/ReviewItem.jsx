import styles from "./ReviewItem.module.css";

const ReviewItem = ({ author, content }) => {
  return (
    <li className={styles.reviewItem}>
      <p>
        <span className={styles.reviewAuthor}>{author}</span>: {content}
      </p>
    </li>
  );
};

export default ReviewItem;
