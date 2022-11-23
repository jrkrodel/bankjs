import styles from "./BudgetForm.module.css";
import { useState, useEffect } from "react";
import {
  createBudget,
  getBudgets,
  getBudgetData,
  editBudget,
} from "../../firebase/utils/firebaseUtils";
import { useNavigate, useParams, Link } from "react-router-dom";
function BudgetForm() {
  const { id } = useParams();
  const [budgetID, setBudgetID] = useState(0);
  const [creatingBudget, setCreatingBudget] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [budget, setBudget] = useState({
    id: budgetID,
    name: "",
    length: "2w",
    entertainment: 0,
    education: 0,
    food: 0,
    health: 0,
    housing: 0,
    personal: 0,
    transportation: 0,
    utilities: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getBudgets().then((data) => {
      setBudgetID(data.length);
    });

    if (id !== undefined) {
      getBudgetData(id).then((data) => {
        setCurrentBudget(data);
        setBudget({
          id: data.id,
          name: data.name,
          length: data.length,
          entertainment: data.entertainment,
          education: data.education,
          food: data.food,
          health: data.health,
          housing: data.housing,
          personal: data.personal,
          transportation: data.transportation,
          utilities: data.utilities,
        });
      });
    }

    setBudget({ ...budget, id: budgetID });
  }, [budgetID, id]);

  const handleChange = (event) => {
    setBudget({ ...budget, [event.target.name]: event.target.value });
  };

  const createB = async (budget) => {
    setCreatingBudget(true);
    await createBudget(budget);
    navigate(`/budgets/${budgetID}`);
    setCreatingBudget(false);
  };

  const editB = async (budget, id) => {
    setCreatingBudget(true);
    await editBudget(budget, id);
    navigate(`/budgets/${id}`);
    setCreatingBudget(false);
  };

  return (
    <div className={styles.createBudgetContainer}>
      <div className={styles.budgetForm}>
        <div className={styles.inputContainer}>
          <div className={styles.inputForm}>
            <label htmlFor="name">Budget Name:</label>
            <input
              value={budget.name}
              onChange={handleChange}
              type="text"
              name="name"
            />
          </div>
          <div className={styles.inputForm}>
            <label>Length</label>
            <select value={budget.length} name="length" onChange={handleChange}>
              <option value="2w">2 Weeks</option>
              <option value="1m">1 Month</option>
              <option value="6m">6 Months</option>
              <option value="1y">1 Year</option>
            </select>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputForm}>
            <label htmlFor="education">Education:</label>
            <input
              value={budget.education}
              onChange={handleChange}
              type="number"
              name="education"
            />
          </div>
          <div className={styles.inputForm}>
            <label htmlFor="entertainment">Entertainment:</label>
            <input
              value={budget.entertainment}
              onChange={handleChange}
              type="number"
              name="entertainment"
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputForm}>
            <label htmlFor="food">Food:</label>
            <input
              value={budget.food}
              onChange={handleChange}
              type="number"
              name="food"
            />
          </div>
          <div className={styles.inputForm}>
            <label htmlFor="health">Health:</label>
            <input
              value={budget.health}
              onChange={handleChange}
              type="number"
              name="health"
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputForm}>
            <label htmlFor="housing">Housing:</label>
            <input
              value={budget.housing}
              onChange={handleChange}
              type="number"
              name="housing"
            />
          </div>
          <div className={styles.inputForm}>
            <label htmlFor="personal">Personal:</label>
            <input
              value={budget.personal}
              onChange={handleChange}
              type="number"
              name="personal"
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputForm}>
            <label htmlFor="transporation">Transportation</label>
            <input
              value={budget.transportation}
              onChange={handleChange}
              type="number"
              name="transportation"
            />
          </div>
          <div className={styles.inputForm}>
            <label htmlFor="utilities">Utilities:</label>
            <input
              value={budget.utilities}
              onChange={handleChange}
              type="number"
              name="utilities"
            />
          </div>
        </div>
        {currentBudget ? (
          <button
            className={styles.createButton}
            to="/budgets"
            onClick={() => editB(budget, id)}
          >
            {!creatingBudget ? "Submit Changes" : "Submitting..."}
          </button>
        ) : (
          <button
            className={styles.createButton}
            to="/budgets"
            onClick={() => createB(budget)}
          >
            {!creatingBudget ? "Create" : "Creating budget..."}
          </button>
        )}

        <Link
          to={id ? `/budgets/${id}` : `/budgets`}
          className={styles.buttonLink}
        >
          <button className={styles.cancelButton}>Cancel</button>
        </Link>
      </div>
    </div>
  );
}

export default BudgetForm;
