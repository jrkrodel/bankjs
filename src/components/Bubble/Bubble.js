import styles from "./Bubble.module.css";

function Bubble({ title, size }) {
  if (size === "sml") {
    return <div className={styles.bubbleSml}>{title}</div>;
  }
  if (size === "med") {
    return <div className={styles.bubbleMed}>{title}</div>;
  }
  if (size === "lrg") {
    return <div className={styles.bubbleLrg}>{title}</div>;
  }
}

export default Bubble;
