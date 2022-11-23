import styles from "./Budgets.module.css";
import Bubble from "../../components/Bubble/Bubble";
import { Link } from "react-router-dom";
import { getBudgets } from "../../context/userAuthContext";
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
    budgetBubbles = budgets.map((budget) => {
      return (
        <Bubble
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

        <Link className={styles.budgetLink} to="/budgets/create-budget">
          <button>Create Budget</button>
        </Link>
      </div>
      <div className={styles.budgets}>{budgetBubbles}</div>
    </div>
  );
}

export default Budgets;
