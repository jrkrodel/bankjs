import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useUserAuth } from "../../context/userAuthContext";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [signUpForm, setSignUpForm] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [gettingUser, setGettingUser] = useState(false);
  const [missing, setMissing] = useState([]);
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpForm({ ...signUpForm, [event.target.name]: event.target.value });
    console.log(signUpForm);
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    setMissing([]);
    console.log(signUpForm.fName);
    console.log(signUpForm.fName.trim());
    if (
      signUpForm.fName.trim() !== "" &&
      signUpForm.lName.trim() !== "" &&
      signUpForm.email.trim() !== "" &&
      signUpForm.password.trim() !== ""
    ) {
      try {
        setMissing([]);
        setError(null);
        setGettingUser(true);
        await signUp(
          signUpForm.email,
          signUpForm.password,
          signUpForm.fName,
          signUpForm.lName
        );
        setGettingUser(false);
        navigate("home");
      } catch (err) {
        setGettingUser(false);
        if (err.message.includes("auth/email-already-in-use")) {
          setError("Email already in use");
          setMissing("email");
        } else if (err.message.includes("(auth/weak-password)")) {
          setError("Password must be atleast 6 characters");
          setMissing("password");
        } else {
          setError(err.message);
        }
      }
    } else {
      const missingInputs = [];
      Object.keys(signUpForm).forEach((key) => {
        if (signUpForm[key].trim() === "") {
          missingInputs.push(key);
        }
      });
      setMissing(missingInputs);
      setError("Missing required inputs");
    }
  };

  return (
    <div id="signUpContainer" className={styles.signUpContainer}>
      <h1>Signup</h1>
      <h2 className={styles.error}>{error ? error : ""}</h2>
      <form>
        <div className={styles.topRow}>
          <div className={styles.leftCol}>
            <label
              className={
                missing.includes("fName") ? styles.signUpLabelError : ""
              }
            >
              First Name:
            </label>
            <input
              placeholder="Enter first name..."
              className={
                missing.includes("fName")
                  ? styles.signUpInputError
                  : styles.signUpInput
              }
              name="fName"
              value={signUpForm.fName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.rightCol}>
            <label
              className={
                missing.includes("lName") ? styles.signUpLabelError : ""
              }
            >
              Last Name:
            </label>
            <input
              placeholder="Enter last name..."
              className={
                missing.includes("lName")
                  ? styles.signUpInputError
                  : styles.signUpInput
              }
              name="lName"
              value={signUpForm.lName}
              onChange={handleChange}
            />
          </div>
        </div>
        <label
          className={missing.includes("email") ? styles.signUpLabelError : ""}
        >
          Email:
        </label>
        <input
          placeholder="Enter email..."
          value={signUpForm.email}
          type="email"
          name="email"
          className={
            missing.includes("email")
              ? styles.signUpInputError
              : styles.signUpInput
          }
          onChange={handleChange}
        />
        <label
          className={
            missing.includes("password") ? styles.signUpLabelError : ""
          }
        >
          Password:
        </label>
        <input
          className={
            missing.includes("password")
              ? styles.signUpInputError
              : styles.signUpInput
          }
          type="password"
          name="password"
          value={signUpForm.password}
          onChange={handleChange}
        />

        <button className={styles.signUpButton} onClick={signUpUser}>
          {gettingUser ? "Creating Account..." : "Signup"}
        </button>
      </form>
      <p className={styles.signUpButtonLabel}>Already have an account?</p>
      <button className={styles.signUpButton} onClick={props.switchToLogin}>
        Login Here
      </button>
    </div>
  );
};

export default Signup;
