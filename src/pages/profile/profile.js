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
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [validateDelete, setValidateDelete] = useState(false);
  const { logout, deleteAccount } = useUserAuth();
  const [error, setError] = useState(null);

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
    setSubmitting(true);
    const update = await updateUserDetails(
      accountDetails.email,
      accountDetails.fName,
      accountDetails.lName
    );

    if (!update) {
      setIsEditing(false);
      setError(false);
    } else {
      console.log(update);
      if (update.includes("(auth/email-already-in-use)")) {
        setError("Email already in use");
      } else if ("auth/requires-recent-login") {
        setError(
          <>
            Need Reauthorization to update email. <br />
            Log out and log back in.
          </>
        );
      }
    }

    setSubmitting(false);
    console.log(update);
    async function fetchUser() {
      const data = await getUserData();
      setUserData(data);
    }
    fetchUser();

    console.log(userData);
  };

  // console.log(new Date(userData.acountCreated));
  const cancelEditing = () => {
    setIsEditing(false);
    setAccountDetails({
      email: user.email,
      fName: user.displayName.split(" ")[0],
      lName: user.displayName.split(" ")[1],
    });
    setError(false);
  };

  // console.log(user.displayName);

  if (userData) {
    return (
      <div>
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
                  className={styles.profileInput}
                  value={accountDetails.fName}
                  onChange={handleChange}
                />
                <label className={styles.profileLabel}>Last Name:</label>
                <input
                  name="lName"
                  className={styles.profileInput}
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
                  className={styles.profileInput}
                  value={accountDetails.email}
                  name="email"
                  onChange={handleChange}
                />
              </>
            )}

            {isEditing === false ? (
              <>
                <p>Your Funds: {userData?.funds.toFixed(2)}</p>
                <p>Account Created: {userData?.accountCreated}</p>
                <button
                  className={styles.profileButton}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Account Details
                </button>
              </>
            ) : (
              <>
                {error ? <p className={styles.error}>{error}</p> : ""}
                <button className={styles.profileButton} onClick={handleUpdate}>
                  {!submitting ? "Submit Changes" : "Submitting..."}
                </button>
                <button className={styles.cancelButton} onClick={cancelEditing}>
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
                <span className={styles.earnings}>
                  ${userData.earnings.toFixed(2)}
                </span>
              </h2>
            </div>
            <div className={styles.dataContainer}>
              <h2>
                Spendings:{" "}
                <span className={styles.spending}>
                  ${userData.spendings.toFixed(2)}
                </span>
              </h2>
            </div>
            <div
              onClick={validateDelete === true ? handleDelete : checkIfSure}
              className={styles.cancelButton}
            >
              {validateDelete === true ? (
                <>
                  Are you sure?<br></br>
                  <span>Click to confirm</span>
                </>
              ) : (
                "Delete Account"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
