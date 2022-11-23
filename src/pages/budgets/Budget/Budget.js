import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBudgetData,
  deleteBudget,
  getTransactionsForGraph,
} from "../../../context/userAuthContext";
import styles from "./Budget.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import BudgetGraph from "../../../components/BudgetGraph/BudgetGraph";

function Budget() {
  const [budget, setBudget] = useState(null);
  const { id } = useParams();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    getBudgetData(id).then((data) => {
      setBudget(
        Object.keys(data)
          .sort()
          .reduce((accumulator, key) => {
            accumulator[key] = data[key];

            return accumulator;
          }, {})
      );
    });
  }, [id]);

  const fetchTransactions = async (length) => {
    const t = await getTransactionsForGraph(length);
    setTransactions(t);
  };

  useEffect(() => {
    if (budget) {
      if (budget.length === "2w") {
        const currentTime = new Date();
        const length = currentTime.setDate(currentTime.getDate() - 14);
        fetchTransactions(length);
      } else if (budget.length === "1m") {
        const currentTime = new Date();
        const length = currentTime.setMonth(currentTime.getMonth() - 1);
        fetchTransactions(length);
      } else if (budget.length === "6m") {
        const currentTime = new Date();
        const length = currentTime.setMonth(currentTime.getMonth() - 6);
        fetchTransactions(length);
      } else if (budget.length === "1y") {
        const currentTime = new Date();
        const length = currentTime.setMonth(currentTime.getMonth() - 12);
        fetchTransactions(length);
      }
    }
  }, [budget]);

  const deleteData = async (id) => {
    await deleteBudget(id);
    setDeleteConfirm(true);
  };

  // console.log(transactions);

  if (deleteConfirm) {
    return (
      <div>
        <h1>Budget Delete</h1>
      </div>
    );
  } else {
    if (budget && transactions) {
      return (
        <div className={styles.budgetContainer}>
          <div className={styles.budgetDisplay}>
            <div className={styles.budgetDisplayHeader}>
              <h1 className={styles.budgetDisplayHeaderText}>
                <Link to={`/budgets`}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className={styles.backArrow}
                  />
                </Link>
                {budget.name}
              </h1>
              <div className={styles.budgetButtons}>
                <Link
                  className={styles.editBudget}
                  to={`/budgets/budget-form/${id}`}
                >
                  Edit Budget
                </Link>
                <Link
                  onClick={() => deleteData(id)}
                  className={styles.deleteBudget}
                  to="/budgets"
                >
                  Delete Budget
                </Link>
              </div>
            </div>
            <BudgetGraph graphData={budget} compareSpending={transactions} />
          </div>
        </div>
      );
    }
  }
}

export default Budget;
