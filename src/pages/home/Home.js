import Bubble from "../../components/Bubble/Bubble";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.bubbleRow}>
        <Bubble title={"Budgets"} size={"med"} />
        <Bubble title={"Profile"} size={"med"} />
      </div>
      <div className={styles.bubbleRow}>
        <Bubble title={"Transactions"} size={"lrg"} />
        <Bubble title={"Up/Down"} size={"sml"} />
      </div>
    </div>
  );
}

export default Home;
