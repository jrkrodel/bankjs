import PaymentBox from "../../components/PaymentBox/PaymentBox";
import TransactionList from "../../components/TransactionsList/TransactionList";
import TransactionSearch from "../../components/TransactionSearch/TransactionSearch";
import styles from "./transcations.module.css";
import { getTransactions } from "../../context/userAuthContext";
import { useState, useEffect } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState();

  const getTrans = async () => {
    const trans = await getTransactions();
    setTransactions(trans);
  };

  return (
    <div className={styles.container}>
      <PaymentBox />
      <div>
        <TransactionSearch />
        <TransactionList transactions={transactions} />
        <button onClick={getTrans}></button>
      </div>
    </div>
  );
}

export default Transactions;
