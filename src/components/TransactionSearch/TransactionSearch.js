import styles from "./TransactionSearch.module.css";

const TransactionSearch = () => {
  return (
    <div>
      <h1 className={styles.header}>Search Payments & Deposits</h1>
      <div className={styles.formContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
        />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Sort By:"
        />
      </div>
      <div className={styles.formContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Category"
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Payments & Deposits"
        />
      </div>
      <h3 className={styles.results}>Results:</h3>
    </div>
  );
};

export default TransactionSearch;
