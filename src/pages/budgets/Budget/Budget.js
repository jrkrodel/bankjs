import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBudgetData,
  deleteBudget,
  getTransactionsForGraph,
} from "../../../firebase/utils/firebaseUtils";
import styles from "./Budget.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import BudgetGraph from "../../../components/BudgetGraph/BudgetGraph";

function Budget() {
  const [budget, setBudget] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [validateDelete, setValidateDelete] = useState(false);
  const [transactions, setTransactions] = useState(null);
  const [isDeleting, setIsDeleting] = useState(
    <>
      Are you sure?<br></br>
      <span>Click to confirm</span>
    </>
  );

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
    setIsDeleting("Deleting...");
    await deleteBudget(id);
    setIsDeleting(
      <>
        Are you sure?<br></br>
        <span>Click to confirm</span>
      </>
    );
    if (isDeleting !== "Deleting...") {
      navigate("/budgets");
    }
  };

  const checkIfSure = () => {
    setValidateDelete(true);
  };

  if (budget && transactions) {
    return (
      <div className={styles.budgetContainer}>
        <div className={styles.budgetDisplay}>
          <div className={styles.budgetDisplayHeader}>
            <h1 className={styles.budgetDisplayHeaderText}>
              <Link to={`/budgets`}>
                <FontAwesomeIcon
                  icon={faAngleLeft}
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
              <button
                onClick={
                  validateDelete === true ? () => deleteData(id) : checkIfSure
                }
                className={styles.deleteBudget}
              >
                {validateDelete === true ? isDeleting : "Delete Budget"}
              </button>
            </div>
          </div>
          <BudgetGraph graphData={budget} compareSpending={transactions} />
        </div>
      </div>
    );
  }
}

export default Budget;
