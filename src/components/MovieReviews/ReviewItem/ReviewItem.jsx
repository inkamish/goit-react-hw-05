import styles from "./ReviewItem.module.css";
import ReactMarkdown from "react-markdown";

const ReviewItem = ({ author, content, author_details }) => {
  const avatarUrl = author_details?.avatar_path
    ? `https://image.tmdb.org/t/p/w500${author_details.avatar_path}`
    : null;

  const formattedContent = content.replace(/\n/g, "\n\n");

  return (
    <li className={styles.reviewItem}>
      <div className={styles.authorContainer}>
        {avatarUrl ? (
          <img className={styles.avatar} src={avatarUrl} alt={author} />
        ) : (
          <div className={styles.avatar}></div>
        )}
        <span className={styles.reviewAuthor}>{author}</span>
      </div>
      <ReactMarkdown className={styles.reviewText}>
        {formattedContent}
      </ReactMarkdown>
    </li>
  );
};

export default ReviewItem;
