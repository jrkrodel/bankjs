import styles from "./PaymentBox.module.css";
import { useState } from "react";
import { makeDeposit, makePayment } from "../../context/userAuthContext";

const PaymentBox = () => {
  const [selected, setSelected] = useState("deposit");
  const [userDeposit, setUserDeposit] = useState("");
  const [userPayment, setUserPayment] = useState({
    for: "",
    amount: "",
    category: "",
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
              <input type="text" name="amount" onChange={handleChange} />
            </div>
            <div className={styles.inputField}>
              <label>Category</label>
              <input type="text" name="category" onChange={handleChange} />
            </div>
            <div className={styles.inputField}>
              <label>Date</label>
              <input type="date" name="date" onChange={handleChange} />
            </div>
            <button type="number" onClick={() => makePayment(userPayment)}>
              Submit Payment
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

            <button onClick={() => makeDeposit(userDeposit)}>
              Submit Deposit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentBox;
