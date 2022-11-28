import Bubble from "../../components/Bubble/Bubble";
import styles from "./Home.module.css";
import { useUserAuth } from "../../context/userAuthContext";
import {
  getTransactions,
  getBudgets,
} from "../../firebase/utils/firebaseUtils";
import { useEffect, useState } from "react";

function Home() {
  const [recentTransaction, setRecentTransactions] = useState(null);
  const [recentBudget, setRecentBudget] = useState(null);
  const [upDown, setUpDown] = useState();
  const { user } = useUserAuth();

  const getRecentTransactions = async () => {
    let spendings = 0;
    let earnings = 0;
    let date = new Date();
    let currentDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const data = await getTransactions();
    setRecentTransactions(data[0]);
    const today = data.filter((transaction) => {
      return transaction.date === currentDate;
    });

    today.forEach((transaction) => {
      if (transaction.type === "payment") {
        console.log(transaction.amount);
        spendings += Number(transaction.amount);
      } else if (transaction.type === "deposit") {
        console.log(transaction.amount);
        earnings += Number(transaction.amount);
      }
    });

    setUpDown(earnings - spendings);
  };

  const getRecentBudget = async () => {
    const data = await getBudgets();
    setRecentBudget(data[0]);
  };

  useEffect(() => {
    getRecentTransactions();
    getRecentBudget();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.bubbleRow}>
        <Bubble
          title={"Budgets"}
          size={"med"}
          url="/budgets"
          link={true}
          content={
            recentBudget ? "Most Recent Budget: " + recentBudget?.name : "None"
          }
        />
        <Bubble
          title={"Profile"}
          size={"med"}
          url="/profile"
          link={true}
          content={user.email}
        />
      </div>
      <div className={styles.bubbleRow}>
        <Bubble
          title={"Transactions"}
          size={"lrg"}
          url="/transactions"
          link={true}
          content={
            recentTransaction
              ? "Most Recent Transaction - " +
                recentTransaction?.type.charAt(0).toUpperCase() +
                recentTransaction?.type.slice(1) +
                ": $" +
                recentTransaction?.amount
              : "None"
          }
        />
        <Bubble
          title={"Up/Down"}
          size={"sml"}
          link={false}
          content={upDown ? `Today: $${upDown}` : "None"}
        />
      </div>
    </div>
  );
}

export default Home;
