import styles from "./TransactionBox.module.css";
import { useState } from "react";
import { makeDeposit, makePayment } from "../../firebase/utils/firebaseUtils";

const TransactionBox = (props) => {
  const [selected, setSelected] = useState("deposit");
  const [userDeposit, setUserDeposit] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [userPayment, setUserPayment] = useState({
    for: "",
    amount: "",
    category: "entertainment",
    date: "",
    type: "payment",
  });

  const depositMenu = () => {
    setInputError(false);
    setSelected("deposit");
  };

  const paymentMenu = () => {
    setInputError([]);
    setSelected("payment");
  };

  const handleChange = (event) => {
    setUserPayment({ ...userPayment, [event.target.name]: event.target.value });
    console.log(userPayment);
  };

  const submitPayment = async () => {
    if (userPayment.amount < 0) {
      setInputError("Amount must be great than 0");
      return;
    } else if (!userPayment.amount.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
      setInputError("Amount must have only 2 decimal places");
      console.log(inputError);
      return;
    } else if (
      userPayment.for.trim() !== "" &&
      userPayment.amount.trim() !== "" &&
      userPayment.category !== "" &&
      userPayment.date !== "" &&
      userPayment.type !== ""
    ) {
      setUserPayment({
        for: "",
        amount: "",
        category: "entertainment",
        date: "",
        type: "payment",
      });
      setInputError([]);
      setSubmitting(true);
      await makePayment(userPayment);
      props.getAllTransactions();
      setSubmitting(false);
    } else {
      const errors = [];
      Object.keys(userPayment).forEach((key) => {
        if (userPayment[key].trim() === "") {
          errors.push(key);
        }
      });
      setInputError([...errors]);
    }
  };

  const submitDeposit = async () => {
    if (userDeposit.trim() === "") {
      setInputError("Amount Required");
      return;
    }
    if (userDeposit < 0) {
      setInputError("Amount must be great than 0");
      return;
    }
    if (!userDeposit.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
      setInputError("Amount must have only 2 decimal places");
      return;
    }
    if (
      userDeposit.trim() !== "" &&
      userDeposit > 0 &&
      userDeposit.match(/^(\d*\.{0,1}\d{0,2}$)/)
    ) {
      setSubmitting(true);
      await makeDeposit(userDeposit);
      props.getAllTransactions();
      setSubmitting(false);
      setUserDeposit("");
    }
  };

  return (
    <div className={styles.transactionBoxContainer}>
      <div className={styles.boxNav}>
        <button
          onClick={depositMenu}
          className={
            selected === "deposit"
              ? `${styles.boxLinkLeft} ${styles.boxLinkSelected}`
              : `${styles.boxLinkLeft} ${styles.boxLink}`
          }
        >
          Deposit
        </button>
        <button
          onClick={paymentMenu}
          className={
            selected === "payment"
              ? `${styles.boxLinkRight} ${styles.boxLinkSelected}`
              : `${styles.boxLinkRight} ${styles.boxLink}`
          }
        >
          Payment
        </button>
      </div>
      <div className={styles.boxForm}>
        {selected === "payment" ? (
          <>
            <div className={styles.inputField}>
              <label
                className={
                  inputError.includes("for")
                    ? `${styles.transactionLabel} ${styles.inputErrorLabel}`
                    : styles.transactionLabel
                }
              >
                Comment
              </label>
              <input
                type="text"
                placeholder="Enter comment..."
                className={
                  inputError.includes("for")
                    ? `${styles.transactionInput} ${styles.inputErrorInput}`
                    : styles.transactionInput
                }
                value={userPayment.for}
                name="for"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <label
                className={
                  inputError.includes("Amount") || inputError.includes("amount")
                    ? `${styles.transactionLabel} ${styles.inputErrorLabel}`
                    : styles.transactionLabel
                }
              >
                Amount
              </label>
              <input
                className={
                  inputError.includes("Amount") || inputError.includes("amount")
                    ? `${styles.transactionInput} ${styles.inputErrorInput}`
                    : styles.transactionInput
                }
                placeholder="Enter amount..."
                type="number"
                name="amount"
                value={userPayment.amount}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <label
                className={
                  inputError.includes("category")
                    ? `${styles.transactionLabel} ${styles.inputErrorLabel}`
                    : styles.transactionLabel
                }
              >
                Category
              </label>
              <select
                className={
                  inputError.includes("category")
                    ? `${styles.transactionSelect} ${styles.inputErrorInput}`
                    : styles.transactionSelect
                }
                name="category"
                value={userPayment.category}
                onChange={handleChange}
              >
                <option value="entertainment">Entertainment</option>
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="transportation">Transportation</option>
                <option value="utilities">Utilities</option>
                <option value="housing">Housing</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div className={styles.inputField}>
              <label
                className={
                  inputError.includes("date") !== false
                    ? `${styles.transactionLabel} ${styles.inputErrorLabel}`
                    : styles.transactionLabel
                }
              >
                Date
              </label>
              <input
                className={
                  inputError.includes("date")
                    ? `${styles.transactionInput} ${styles.inputErrorInput}`
                    : styles.transactionInput
                }
                type="date"
                value={userPayment.date}
                name="date"
                onChange={handleChange}
              />
            </div>
            {inputError.length > 0 ? (
              <p className={styles.inputError}>
                {inputError.includes("Amount")
                  ? inputError
                  : "Missing Required Fields"}
              </p>
            ) : (
              ""
            )}
            <button
              className={styles.transactionButton}
              type="number"
              onClick={submitPayment}
            >
              {!submitting ? "Submit Payment" : "Submitting..."}
            </button>
          </>
        ) : (
          <>
            <div className={styles.inputField}>
              <label
                className={
                  inputError
                    ? `${styles.transactionLabel} ${styles.inputErrorLabel}`
                    : styles.transactionLabel
                }
              >
                Amount
              </label>
              <input
                placeholder="Enter amount..."
                className={
                  inputError
                    ? `${styles.transactionInput} ${styles.inputErrorInput}`
                    : styles.transactionInput
                }
                value={userDeposit}
                onChange={(e) => setUserDeposit(e.target.value)}
                type="number"
              />
            </div>
            {inputError !== false ? (
              <p className={styles.inputError}>{inputError}</p>
            ) : (
              ""
            )}
            <button
              className={styles.transactionButton}
              onClick={submitDeposit}
            >
              {!submitting ? "Submit Deposit" : "Submitting..."}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionBox;
