import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useUserAuth } from "../../context/userAuthContext";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [signUpForm, setSignUpForm] = useState({
    fName: "",
    lName: "",
  });
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [gettingUser, setGettingUser] = useState(false);
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpForm({ ...signUpForm, [event.target.name]: event.target.value });
    console.log(signUpForm);
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      console.log("signed up");
      setGettingUser(true);
      await signUp(email, password, signUpForm);
      setGettingUser(false);
      navigate("home");
    } catch (err) {
      setGettingUser(false);
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div id="signUpContainer" className={styles.signUpContainer}>
      <h1>Signup</h1>
      <h2 className={styles.error}>{error ? error : ""}</h2>
      <form>
        <div className={styles.topRow}>
          <div className={styles.leftCol}>
            <label>First Name:</label>
            <input
              placeholder="Enter first name..."
              className={styles.signUpInput}
              name="fName"
              value={signUpForm.fName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.rightCol}>
            <label>Last Name:</label>
            <input
              placeholder="Enter last name..."
              className={styles.signUpInput}
              name="lName"
              value={signUpForm.lName}
              onChange={handleChange}
            />
          </div>
        </div>
        <label>Email:</label>
        <input
          placeholder="Enter email..."
          value={email}
          type="email"
          className={styles.signUpInput}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          className={styles.signUpInput}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
