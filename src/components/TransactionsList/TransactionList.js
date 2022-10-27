import styles from "./TransactionList.module.css";

const TransactionList = ({ transactions }) => {
  console.log(transactions);
  let allTransactions;
  if (transactions) {
    allTransactions = transactions.map((transaction, index) => {
      console.log(transaction);
      if (transaction.type === "deposit") {
        return (
          <div
            className={
              index % 2 == 0 ? styles.transaction : styles.transactionEven
            }
            key={index}
          >
            <h1>{transaction.date}</h1>
            <div className={styles.rightSide}>
              <h1>{transaction.amount}</h1>
              <h1 className={styles.deposit}>
                {transaction.type.toUpperCase()}
              </h1>
            </div>
          </div>
        );
      } else {
        return (
          <div
            className={
              index % 2 == 0 ? styles.transaction : styles.transactionEven
            }
            key={index}
          >
            <h1>{transaction.date}</h1>
            <h1>{transaction.category}</h1>
            <div className={styles.rightSide}>
              <h1>{transaction.amount}</h1>
              <h1 className={styles.payment}>
                {transaction.type.toUpperCase()}
              </h1>
            </div>
          </div>
        );
      }
    });
  }
  return <div className={styles.transactionsContainer}>{allTransactions}</div>;
};

export default TransactionList;
