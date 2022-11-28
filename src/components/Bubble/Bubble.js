import styles from "./Bubble.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Bubble({ title, size, url, content, link }) {
  if (link === true) {
    if (size === "sml") {
      return (
        <Link className={styles.bubbleSml}>
          <h4 className={styles.title}>
            {title} <FontAwesomeIcon icon={faAngleRight} />
          </h4>
          <p className={styles.content}>{content}</p>
        </Link>
      );
    }
    if (size === "med") {
      return (
        <Link className={styles.bubbleMed} to={url}>
          <h4 className={styles.title}>
            {title} <FontAwesomeIcon icon={faAngleRight} />
          </h4>
          <p className={styles.content}>{content}</p>
        </Link>
      );
    }
    if (size === "lrg") {
      return (
        <Link className={styles.bubbleLrg} to={url}>
          <h4 className={styles.title}>
            {title} <FontAwesomeIcon icon={faAngleRight} />
          </h4>
          <p className={styles.content}>{content}</p>
        </Link>
      );
    }
  } else {
    return (
      <div className={styles.bubbleSmlNoLink}>
        {title}

        <p className={styles.content}>{content}</p>
      </div>
    );
  }
}

export default Bubble;
