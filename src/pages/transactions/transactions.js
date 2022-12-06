import TransactionBox from "../../components/TransactionBox/TransactionBox";
import TransactionList from "../../components/TransactionsList/TransactionList";
import styles from "./Transactions.module.css";
import { getTransactions } from "../../firebase/utils/firebaseUtils";
import { useState, useEffect } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState(null);

  const [sortedTransactions, setSortedTransactions] = useState(null);
  const [search, setSearch] = useState({
    for: "",
    category: "",
    sortBy: "latest",
    filter: "all",
  });

  const getAllTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
    setSortedTransactions(data);
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  useEffect(() => {
    const sortTransactions = async () => {
      if (transactions) {
        let sorted;
        let allTransactions = [...transactions];

        setSortedTransactions(allTransactions);

        if (search.filter === "all") {
          sorted = allTransactions;
        } else if (search.filter === "deposit") {
          sorted = allTransactions.filter((transaction) => {
            return transaction.type === "deposit";
          });
        } else if (search.filter === "payment") {
          sorted = allTransactions.filter((transaction) => {
            return transaction.type === "payment";
          });
        } else if (search.filter !== "") {
          sorted = allTransactions.filter((transaction) => {
            return transaction.category === search.filter;
          });
        }

        if (search.sortBy === "high") {
          sorted.sort((a, b) => {
            let x = Number(a.amount);
            let y = Number(b.amount);
            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          });
        } else if (search.sortBy === "low") {
          sorted.sort((a, b) => {
            let x = Number(a.amount);
            let y = Number(b.amount);
            if (x > y) {
              return 1;
            }
            if (x < y) {
              return -1;
            }
            return 0;
          });
        } else if (search.sortBy === "latest") {
          sorted.sort((a, b) => {
            if (a.date < b.date) {
              return 1;
            }
            if (a.date > b.date) {
              return -1;
            }
            return 0;
          });
        } else if (search.sortBy === "oldest") {
          sorted.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
          });
        }

        if (search.for !== "") {
          sorted = sorted.filter((transaction) => {
            if (transaction.category || transaction.for) {
              return (
                transaction.for.includes(search.for) ||
                transaction.category.includes(search.for)
              );
            } else {
              return null;
            }
          });
        }

        setSortedTransactions(sorted);
      }
    };
    sortTransactions();
  }, [search.sortBy, search.filter, search.category, search.for, transactions]);

  const handleChange = (event) => {
    setSearch({ ...search, [event.target.name]: event.target.value });
  };

  return (
    <div className={styles.transactionsContainer}>
      <TransactionBox getAllTransactions={getAllTransactions} />
      <div className={styles.transactionBar}>
        <div>
          <h1 className={styles.header}>Search Payments & Deposits</h1>
          <div className={styles.formContainer}>
            <input
              onChange={handleChange}
              name="for"
              className={styles.searchBar}
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className={styles.formContainer}>
            <select
              name="filter"
              onChange={handleChange}
              className={styles.searchInput}
              defaultValue="all"
            >
              <option value="all">All</option>
              <option value="payment">Payments</option>
              <option value="deposit">Deposits</option>
              <option value="entertainment">Entertainment</option>
              <option value="food">Food</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="transportation">Transportation</option>
              <option value="utilities">Utilities</option>
              <option value="housing">Housing</option>
              <option value="personal">Personal</option>
            </select>
            <select
              name="sortBy"
              onChange={handleChange}
              className={styles.searchInput}
              defaultValue="latest"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
          <h3 className={styles.results}>Results:</h3>
        </div>
        <TransactionList
          transactions={sortedTransactions}
          getAllTransactions={getAllTransactions}
        />
      </div>
    </div>
  );
}

export default Transactions;
