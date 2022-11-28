import styles from "./Budgets.module.css";
import Bubble from "../../components/Bubble/Bubble";
import { Link } from "react-router-dom";
import { getBudgets } from "../../firebase/utils/firebaseUtils";
import { useEffect, useState } from "react";

function Budgets() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    getBudgets().then((data) => {
      setBudgets(data);
    });
  }, []);

  let budgetBubbles;

  if (budgets.length > 0) {
    budgetBubbles = budgets.map((budget, ind) => {
      return (
        <Bubble
          key={ind}
          link={true}
          title={budget.name}
          size={"med"}
          url={`/budgets/${budget.id}`}
        />
      );
    });
  }

  return (
    <div className={styles.budgetContainer}>
      <div className={styles.budgetHeader}>
        <h1>Your Budgets</h1>

        <Link className={styles.budgetLink} to="/budgets/budget-form">
          <button className={styles.budgetHeaderButton}>Create Budget</button>
        </Link>
      </div>
      <div className={styles.budgets}>{budgetBubbles}</div>
    </div>
  );
}

export default Budgets;
