import PaymentBox from "../../components/PaymentBox/PaymentBox";
import TransactionList from "../../components/TransactionsList/TransactionList";
import TransactionSearch from "../../components/TransactionSearch/TransactionSearch";
import styles from "./transcations.module.css";
import { getTransactions } from "../../context/userAuthContext";
import { useState } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState();

  const getTrans = async () => {
    const trans = await getTransactions();
    setTransactions(trans);
  };

  return (
    <div className={styles.transactionsContainer}>
      <PaymentBox />
      <div className={styles.transactionBar}>
        <TransactionSearch />
        <button onClick={getTrans}>Get Transactions</button>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default Transactions;
