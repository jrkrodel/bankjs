import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  getUserData,
  deleteAccountData,
} from "../../firebase/utils/firebaseUtils";
import { useUserAuth } from "../../context/userAuthContext";

function Profile() {
  const { user, updateUserDetails, logout, deleteAccount } = useUserAuth();
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [validateDelete, setValidateDelete] = useState(false);
  const [accountCreated, setAccountCreated] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(
    <>
      Are you sure?<br></br>
      <span>Click to confirm</span>
    </>
  );
  const [error, setError] = useState(null);
  const [missing, setMissing] = useState([]);

  useEffect(() => {
    if (userData) {
      setAccountDetails({
        email: user.email,
        fName: user.displayName.split(" ")[0],
        lName: user.displayName.split(" ")[1],
      });
    }
    let displayDate = new Date(userData?.accountCreated);
    let convertedDate = displayDate.toLocaleString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    // let convertedDate =
    //   (displayDate.getMonth() > 8
    //     ? displayDate.getMonth() + 1
    //     : "0" + (displayDate.getMonth() + 1)) +
    //   "/" +
    //   (displayDate.getDate() > 9
    //     ? displayDate.getDate()
    //     : "0" + displayDate.getDate()) +
    //   "/" +
    //   displayDate.getFullYear();
    setAccountCreated(convertedDate);
  }, [userData, user]);

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
    setDeleteMessage("Deleting...");
    await deleteAccountData();
    await deleteAccount();
    setDeleteMessage(
      <>
        Are you sure?<br></br>
        <span>Click to confirm</span>
      </>
    );
    if (deleteMessage !== "Deleting...") {
      logout();
    }
  };

  const handleChange = (event) => {
    setAccountDetails({
      ...accountDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    setMissing([]);
    if (
      accountDetails.email !== "" &&
      accountDetails.fName !== "" &&
      accountDetails.lName !== ""
    ) {
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
        if (update.includes("(auth/email-already-in-use)")) {
          setError("Email already in use");
          setMissing("email");
        } else if ("auth/requires-recent-login") {
          setError(
            <>
              Need Reauthorization to update email. <br />
              Log out and log back in.
            </>
          );
          setMissing("email");
        }
      }

      setSubmitting(false);
      async function fetchUser() {
        const data = await getUserData();
        setUserData(data);
      }
      fetchUser();
    } else {
      const missingInputs = [];
      Object.keys(accountDetails).forEach((key) => {
        if (accountDetails[key].trim() === "") {
          missingInputs.push(key);
        }
      });

      setMissing(missingInputs);
      setError("Missing required inputs");
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setAccountDetails({
      email: user.email,
      fName: user.displayName.split(" ")[0],
      lName: user.displayName.split(" ")[1],
    });
    setError(false);
  };

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
                <label
                  className={
                    missing.includes("fName")
                      ? styles.profileLabelError
                      : styles.profileLabel
                  }
                >
                  First Name:
                </label>
                <input
                  name="fName"
                  className={
                    missing.includes("fName")
                      ? `${styles.profileInput} ${styles.profileInputError}`
                      : styles.profileInput
                  }
                  value={accountDetails.fName}
                  onChange={handleChange}
                />
                <label
                  className={
                    missing.includes("lName")
                      ? styles.profileLabelError
                      : styles.profileLabel
                  }
                >
                  Last Name:
                </label>
                <input
                  name="lName"
                  className={
                    missing.includes("lName")
                      ? `${styles.profileInput} ${styles.profileInputError}`
                      : styles.profileInput
                  }
                  value={accountDetails.lName}
                  onChange={handleChange}
                />
              </>
            )}
            {isEditing === false ? (
              <p>Your Email: {user.email}</p>
            ) : (
              <>
                <label
                  className={
                    missing.includes("email")
                      ? styles.profileLabelError
                      : styles.profileLabel
                  }
                >
                  Email:
                </label>
                <input
                  value={accountDetails.email}
                  className={
                    missing.includes("email")
                      ? `${styles.profileInput} ${styles.profileInputError}`
                      : styles.profileInput
                  }
                  name="email"
                  onChange={handleChange}
                />
              </>
            )}

            {isEditing === false ? (
              <>
                <p>Your Funds: ${userData?.funds.toFixed(2)}</p>
                <p>Created: {accountCreated}</p>
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
              {validateDelete === true ? deleteMessage : "Delete Account"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
