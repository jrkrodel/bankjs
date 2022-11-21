import styles from "./Bubble.module.css";
import { Link } from "react-router-dom";

function Bubble({ title, size, url, content }) {
  if (size === "sml") {
    return (
      <Link className={styles.bubbleSml}>
        {title}
        <p className={styles.content}>{content}</p>
      </Link>
    );
  }
  if (size === "med") {
    return (
      <Link className={styles.bubbleMed} to={url}>
        {title}

        <p className={styles.content}>{content}</p>
      </Link>
    );
  }
  if (size === "lrg") {
    return (
      <Link className={styles.bubbleLrg} to={url}>
        {title}

        <p className={styles.content}>{content}</p>
      </Link>
    );
  }
}

export default Bubble;
