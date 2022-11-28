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
  const [inputError, setInputError] = useState("");
  const [invalidFields, setInvalidFields] = useState("");
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
    } else {
      setCurrentBudget(false);
    }

    setBudget({ ...budget, id: budgetID });
  }, [budgetID, id]);

  const handleChange = (event) => {
    setBudget({ ...budget, [event.target.name]: event.target.value });
  };

  const createB = async (budget) => {
    const errors = [];
    setInvalidFields("");
    Object.keys(budget).forEach((key) => {
      if (key !== "id" && key !== "name" && key !== "length") {
        console.log(budget[key]);
        if (budget[key] < 0) {
          setInputError("Values must be great than 0");
          errors.push(key);
          return;
        } else if (
          !budget[key].toString().match(/^(\d*\.{0,1}\d{0,2}$)/) &&
          errors.length === 0
        ) {
          errors.push(key);
          setInputError("Amount must have only 2 decimal places");
          return;
        }
      }
    });

    if (errors.length === 0) {
      if (budget.name.trim() !== "" && budget.length !== "") {
        setInputError("");
        setCreatingBudget(true);
        await createBudget(budget);
        navigate(`/budgets/${budgetID}`);
        setCreatingBudget(false);
      } else {
        setInputError("Budget name required");
      }
    } else {
      setInvalidFields(errors);
    }
  };

  const editB = async (budget, id) => {
    const errors = [];
    setInvalidFields("");
    Object.keys(budget).forEach((key) => {
      if (key !== "id" && key !== "name" && key !== "length") {
        console.log(budget[key]);
        if (budget[key] < 0) {
          setInputError("Values must be great than 0");
          errors.push(key);
          return;
        } else if (
          !budget[key].toString().match(/^(\d*\.{0,1}\d{0,2}$)/) &&
          errors.length === 0
        ) {
          errors.push(key);
          setInputError("Amount must have only 2 decimal places");
          return;
        }
      }
    });

    if (errors.length === 0) {
      if (budget.name.trim() !== "" && budget.length !== "") {
        setInputError("");
        setCreatingBudget(true);
        await editBudget(budget, id);
        navigate(`/budgets/${id}`);
        setCreatingBudget(false);
      } else {
        setInputError("Budget name required");
      }
    } else {
      setInvalidFields(errors);
    }
  };

  if (currentBudget !== null) {
    return (
      <div className={styles.createBudgetContainer}>
        <div className={styles.budgetForm}>
          <div className={styles.inputContainer}>
            <div className={styles.inputForm}>
              <label
                className={
                  inputError.includes("Budget")
                    ? styles.inputErrorLabel
                    : styles.budgetFormLabel
                }
                htmlFor="name"
              >
                Budget Name:
              </label>
              <input
                placeholder="Enter budget name..."
                className={
                  inputError.includes("Budget")
                    ? `${styles.budgetFormInput} ${styles.budgetFormInputError}`
                    : styles.budgetFormInput
                }
                value={budget.name}
                onChange={handleChange}
                type="text"
                step=".01"
                min="0"
                name="name"
              />
            </div>
            <div className={styles.inputForm}>
              <label className={styles.budgetFormLabel}>Length</label>
              <select
                className={styles.budgetFormSelect}
                value={budget.length}
                name="length"
                onChange={handleChange}
              >
                <option value="2w">2 Weeks</option>
                <option value="1m">1 Month</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
              </select>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputForm}>
              <label
                className={
                  invalidFields.includes("education")
                    ? `${styles.inputErrorLabel}`
                    : styles.budgetFormLabel
                }
                htmlFor="education"
              >
                Education:
              </label>
              <input
                step=".01"
                min="0"
                className={
                  invalidFields.includes("education")
                    ? `${styles.budgetFormInput} ${styles.budgetFormInputError}`
                    : styles.budgetFormInput
                }
                value={budget.education}
                onChange={handleChange}
                type="number"
                name="education"
              />
            </div>
            <div className={styles.inputForm}>
              <label
                className={
                  invalidFields.includes("entertainment")
                    ? `${styles.inputErrorLabel}`
                    : styles.budgetFormLabel
                }
                htmlFor="entertainment"
              >
                Entertainment:
              </label>
              <input
                step=".01"
                min="0"
                className={
                  invalidFields.includes("entertainment")
                    ? `${styles.budgetFormInput} ${styles.budgetFormInputError}`
                    : styles.budgetFormInput
                }
                value={budget.entertainment}
                onChange={handleChange}
                type="number"
                name="entertainment"
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputForm}>
              <label
                className={
                  invalidFields.includes("food")
                    ? `${styles.inputErrorLabel}`
                    : styles.budgetFormLabel
                }
                htmlFor="food"
              >
                Food:
              </label>
              <input
                step=".01"
                min="0"
                className={
                  invalidFields.includes("food")
                    ? `${styles.budgetFormInput} ${styles.budgetFormInputError}`
                    : styles.budgetFormInput
                }
                value={budget.food}
                onChange={handleChange}
                type="number"
                name="food"
              />
            </div>
            <div className={styles.inputForm}>
              <label
                className={
                  invalidFields.includes("health")
                    ? `${styles.inputErrorLabel}`
                    : styles.budgetFormLabel
                }
                htmlFor="health"
              >
                Health:
              </label>
              <input
                step=".01"
                min="0"
                className={
                  invalidFields.includes("health")
                    ? `${styles.budgetFormInput} ${styles.budgetFormInputError}`
                    : styles.budgetFormInput
                }
                value={budget.health}
                onChange={handleChange}
                type="number"
                name="health"
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputForm}>
              <label
                className={
                  invalidFields.includes("housing")
                    ? `${styles.inputErrorLabel}`
                    : styles.budgetFormLabel
                }
                htmlFor="housing"
              >
                Housing:
              </label>
              <input
                step=".01"
                min="0"
                className={
                  invalidFields.includes("housing")
                    ? `${styles.budgetFormInput} ${styles.budgetFormInputError}`
                    : styles.budgetFormInput
                }
                value={budget.housing}
                onChange={handleChange}
                type="number"
                name="housing"
              />
            </div>
            <div className={styles.inputForm}>
              <label
                className={
                  invalidFields.includes("personal")
                    ? `${styles.inputErrorLabel}`
                    : styles.budgetFormLabel
                }
                htmlFor="personal"
              >
                Personal:
              </label>
              <input
                step=".01"
                min="0"
                className={
                  invalidFields.includes("personal")
                    ? `${styles.budgetFormInput} ${styles.budgetFormInputError}`
                    : styles.budgetFormInput
                }
                value={budget.personal}
                onChange={handleChange}
                type="number"
                name="personal"
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputForm}>
              <label
                className={
                  invalidFields.includes("transportation")
                    ? `${styles.inputErrorLabel}`
                    : styles.budgetFormLabel
                }
                htmlFor="transporation"
              >
                Transportation
              </label>
              <input
                step=".01"
                min="0"
                className={
                  invalidFields.includes("transportation")
                    ? `${styles.budgetFormInput} ${styles.budgetFormInputError}`
                    : styles.budgetFormInput
                }
                value={budget.transportation}
                onChange={handleChange}
                type="number"
                name="transportation"
              />
            </div>
            <div className={styles.inputForm}>
              <label
                className={
                  invalidFields.includes("utilities")
                    ? `${styles.inputErrorLabel}`
                    : styles.budgetFormLabel
                }
                htmlFor="utilities"
              >
                Utilities:
              </label>
              <input
                step=".01"
                className={
                  invalidFields.includes("utilities")
                    ? `${styles.budgetFormInput} ${styles.budgetFormInputError}`
                    : styles.budgetFormInput
                }
                value={budget.utilities}
                onChange={handleChange}
                type="number"
                name="utilities"
              />
            </div>
          </div>
          {inputError ? (
            <p className={styles.inputErrorText}>{inputError}</p>
          ) : (
            ""
          )}
          {currentBudget ? (
            <button
              className={styles.createButton}
              to="/budgets"
              onClick={() => editB(budget, id)}
            >
              {!creatingBudget && currentBudget
                ? "Submit Changes"
                : "Submitting..."}
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
}

export default BudgetForm;
