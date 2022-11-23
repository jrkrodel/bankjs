import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  getUserData,
  deleteAccountData,
  updateProfileDoc,
} from "../../firebase/utils/firebaseUtils";
import { useUserAuth } from "../../context/userAuthContext";

function Profile() {
  const { user, updateUserDetails } = useUserAuth();
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [validateDelete, setValidateDelete] = useState(false);
  const { logout, deleteAccount } = useUserAuth();

  console.log(userData);

  useEffect(() => {
    if (userData) {
      setAccountDetails({
        email: user.email,
        fName: user.displayName.split(" ")[0],
        lName: user.displayName.split(" ")[1],
      });
    }
  }, [userData]);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserData();
      setUserData(data);
    }
    fetchUser();
  }, []);

  const checkIfSure = async () => {
    setValidateDelete(true);
  };

  const handleDelete = async () => {
    await deleteAccountData();
    deleteAccount();
    logout();
  };

  const handleChange = (event) => {
    setAccountDetails({
      ...accountDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    setIsEditing(false);
    console.log(accountDetails.fName);
    await updateUserDetails(
      accountDetails.email,
      accountDetails.fName,
      accountDetails.lName
    );
    await updateProfileDoc(
      accountDetails.fName,
      accountDetails.lName,
      accountDetails.email
    );

    async function fetchUser() {
      const data = await getUserData();
      setUserData(data);
    }
    fetchUser();
  };

  if (userData) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.leftCol}>
          <h1>User Profile:</h1>
          {isEditing === false ? (
            <p>Name: {user.displayName}</p>
          ) : (
            <>
              <label className={styles.profileLabel}>First Name:</label>
              <input
                name="fName"
                value={accountDetails.fName}
                onChange={handleChange}
              />
              <label className={styles.profileLabel}>Last Name:</label>
              <input
                name="lName"
                value={accountDetails.lName}
                onChange={handleChange}
              />
            </>
          )}
          {isEditing === false ? (
            <p>Your Email: {user.email}</p>
          ) : (
            <>
              <label className={styles.profileLabel}>Email:</label>
              <input
                value={accountDetails.email}
                name="email"
                onChange={handleChange}
              />
            </>
          )}

          <p>Your Funds: {userData.funds}</p>
          <p>Account Created Funds: {userData.funds}</p>
          {isEditing === false ? (
            <>
              <button
                className={styles.profileButton}
                onClick={() => setIsEditing(true)}
              >
                Edit Account Details
              </button>
              <button className={styles.profileButton}>Reset Password</button>
            </>
          ) : (
            <>
              <button onClick={handleUpdate}>Submit Changes</button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          )}
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
          <div
            onClick={validateDelete === true ? handleDelete : checkIfSure}
            className={styles.deleteButton}
          >
            {validateDelete ? "Are you sure?" : "Delete Account"}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
