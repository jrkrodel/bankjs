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
    if (
      userPayment.for.trim() !== "" &&
      userPayment.amount.trim() !== "" &&
      userPayment.category !== "" &&
      userPayment.date !== "" &&
      userPayment.type !== ""
    ) {
      setInputError([]);
      setSubmitting(true);
      await makePayment(userPayment);
      props.getAllTransactions();
      setSubmitting(false);
    } else {
      const errors = [];
      if (userPayment.for.trim() === "") {
        errors.push("for");
      }
      if (userPayment.amount === "") {
        errors.push("amount");
      }
      if (userPayment.category === "") {
        errors.push("category");
      }
      if (userPayment.date === "") {
        errors.push("date");
      }
      setInputError([...errors]);
    }
  };

  const submitDeposit = async () => {
    if (userDeposit.trim() !== "") {
      setSubmitting(true);
      await makeDeposit(userDeposit);
      props.getAllTransactions();
      setSubmitting(false);
    } else {
      setInputError("Amount");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.boxNav}>
        <button
          onClick={depositMenu}
          className={
            selected === "deposit" ? styles.boxLinkSelected : styles.boxLink
          }
        >
          Deposit
        </button>
        <button
          onClick={paymentMenu}
          className={
            selected === "payment" ? styles.boxLinkSelected : styles.boxLink
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
                  inputError.includes("for") ? styles.inputErrorLabel : ""
                }
              >
                For
              </label>
              <input
                type="text"
                className={
                  inputError.includes("for") ? styles.inputErrorInput : ""
                }
                value={userPayment.for}
                name="for"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <label
                className={
                  inputError.includes("amount") ? styles.inputErrorLabel : ""
                }
              >
                Amount
              </label>
              <input
                className={
                  inputError.includes("amount") ? styles.inputErrorInput : ""
                }
                type="number"
                name="amount"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <label
                className={
                  inputError.includes("category") ? styles.inputErrorLabel : ""
                }
              >
                Category
              </label>
              <select
                className={
                  inputError.includes("category") ? styles.inputErrorInput : ""
                }
                name="category"
                onChange={handleChange}
              >
                <option value="entertainment">Entertainment</option>
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="transportation">Transportation</option>
                <option value="utilities">Utilities</option>
                <option value="housing">Housing</option>
                <option value="personal">personal</option>
              </select>
            </div>
            <div className={styles.inputField}>
              <label
                className={
                  inputError.includes("date") !== false
                    ? styles.inputErrorLabel
                    : ""
                }
              >
                Date
              </label>
              <input
                className={
                  inputError.includes("date") ? styles.inputErrorInput : ""
                }
                type="date"
                name="date"
                onChange={handleChange}
              />
            </div>
            {inputError.length > 0 ? (
              <p className={styles.inputError}>Missing Required Fields</p>
            ) : (
              ""
            )}
            <button type="number" onClick={submitPayment}>
              {!submitting ? "Submit Payment" : "Submitting..."}
            </button>
          </>
        ) : (
          <>
            <div className={styles.inputField}>
              <label
                className={inputError !== false ? styles.inputErrorLabel : ""}
              >
                Amount
              </label>
              <input
                className={inputError !== false ? styles.inputErrorInput : ""}
                value={userDeposit}
                onChange={(e) => setUserDeposit(e.target.value)}
                type="number"
              />
            </div>
            {inputError !== false ? (
              <p className={styles.inputError}>Missing Required Fields</p>
            ) : (
              ""
            )}
            <button onClick={submitDeposit}>
              {!submitting ? "Submit Deposit" : "Submitting..."}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionBox;
