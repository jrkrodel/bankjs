import styles from "./TransactionSearch.module.css";

const TransactionSearch = () => {
  return (
    <div>
      <h1 className={styles.header}>Search Payments & Deposits</h1>
      <div className={styles.formContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search..."
        />
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Sort By:"
        />
      </div>
      <div className={styles.formContainer}>
        <select name="category" className={styles.testInput}>
          <option value="" disabled selected>
            Select Category
          </option>
          <option value="entertainment">Entertainment</option>
          <option value="food">Food</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="housing">Housing</option>
          <option value="personal">personal</option>
        </select>
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
