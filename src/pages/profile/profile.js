import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { getUserData } from "../../context/userAuthContext";
import { useUserAuth } from "../../context/userAuthContext";

function Profile() {
  const [userData, setUserData] = useState();
  const { user } = useUserAuth();

  console.log(user);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserData();
      setUserData(data);
    }
    fetchUser();
  }, []);

  if (userData) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.leftCol}>
          <h1>User Profile:</h1>
          <p>Your Email: {userData.email}</p>
          <p>Your Funds: {userData.funds}</p>
          <p>Account Created Funds: {userData.funds}</p>
        </div>
        <div className={styles.rightCol}>
          <div className={styles.dataContainer}>
            <h2>Budgets: {userData.budgets}</h2>
          </div>

          <div className={styles.dataContainer}>
            <h2>Transactions: {userData.transactions}</h2>
          </div>
          <div className={styles.dataContainer}>
            <h2>
              Earnings:{" "}
              <span className={styles.earnings}>${userData.earnings}</span>
            </h2>
          </div>
          <div className={styles.dataContainer}>
            <h2>
              Spendings:{" "}
              <span className={styles.spending}>${userData.spendings}</span>
            </h2>
          </div>
          <div className={styles.deleteButton}>Delete Account</div>
        </div>
      </div>
    );
  }
}

export default Profile;
