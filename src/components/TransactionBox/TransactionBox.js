import styles from "./TransactionBox.module.css";
import { useState } from "react";
import { makeDeposit, makePayment } from "../../firebase/utils/firebaseUtils";

const TransactionBox = (props) => {
  const [selected, setSelected] = useState("deposit");
  const [userDeposit, setUserDeposit] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userPayment, setUserPayment] = useState({
    for: "",
    amount: "",
    category: "entertainment",
    date: "",
    type: "payment",
  });

  const depositMenu = () => {
    setSelected("deposit");
  };

  const paymentMenu = () => {
    setSelected("payment");
  };

  const handleChange = (event) => {
    setUserPayment({ ...userPayment, [event.target.name]: event.target.value });
    console.log(userPayment);
  };

  const submitPayment = async () => {
    setSubmitting(true);
    await makePayment(userPayment);
    props.getAllTransactions();
    setSubmitting(false);
  };

  const submitDeposit = async () => {
    setSubmitting(true);
    await makeDeposit(userDeposit);
    props.getAllTransactions();
    setSubmitting(false);
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
              <label>For</label>
              <input
                type="text"
                value={userPayment.for}
                name="for"
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <label>Amount</label>
              <input type="number" name="amount" onChange={handleChange} />
            </div>
            <div className={styles.inputField}>
              <label>Category</label>
              <select name="category" onChange={handleChange}>
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
              <label>Date</label>
              <input type="date" name="date" onChange={handleChange} />
            </div>
            <button type="number" onClick={submitPayment}>
              {!submitting ? "Submit Payment" : "Submitting..."}
            </button>
          </>
        ) : (
          <>
            <div className={styles.inputField}>
              <label>Amount</label>
              <input
                value={userDeposit}
                onChange={(e) => setUserDeposit(e.target.value)}
                type="number"
              />
            </div>

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
