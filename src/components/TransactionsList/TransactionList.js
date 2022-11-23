import styles from "./TransactionList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faBurger,
  faHeartPulse,
  faBook,
  faCar,
  faLightbulb,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const TransactionList = ({ transactions }) => {
  let allTransactions;
  if (transactions) {
    allTransactions = transactions.map((transaction, index) => {
      if (transaction.type === "deposit") {
        return (
          <div
            className={
              index % 2 === 0 ? styles.transaction : styles.transactionEven
            }
            key={index}
          >
            <div className={styles.leftSide}>
              <h1>{transaction.date}</h1>
            </div>
            <div className={styles.rightSide}>
              <h1>${transaction.amount}</h1>
              <h1 className={styles.deposit}>
                {transaction.type.toUpperCase()}
              </h1>
            </div>
          </div>
        );
      } else {
        let icon;
        if (transaction.category === "entertainment") {
          icon = faVideo;
        } else if (transaction.category === "food") {
          icon = faBurger;
        } else if (transaction.category === "health") {
          icon = faHeartPulse;
        } else if (transaction.category === "education") {
          icon = faBook;
        } else if (transaction.category === "transportation") {
          icon = faCar;
        } else if (transaction.category === "utilities") {
          icon = faLightbulb;
        } else if (transaction.category === "housing") {
          icon = faHouse;
        } else if (transaction.category === "personal") {
          icon = faUser;
        }
        return (
          <div
            className={
              index % 2 === 0 ? styles.transaction : styles.transactionEven
            }
            key={index}
          >
            <div className={styles.leftSide}>
              <h1>{transaction.date}</h1>

              <h1>
                <FontAwesomeIcon className={styles.icon} icon={icon} />
                {transaction.category.charAt(0).toUpperCase() +
                  transaction.category.slice(1)}
              </h1>
            </div>
            <div className={styles.rightSide}>
              <h1>${transaction.amount}</h1>
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
