import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useUserAuth } from "../../context/userAuthContext";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [gettingUser, setGettingUser] = useState(false);
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      console.log("signed up");
      setGettingUser(true);
      await signUp(email, password);
      setGettingUser(false);
      navigate("home");
    } catch (err) {
      setGettingUser(false);
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h1>Signup</h1>
      <h2 className={styles.error}>{error ? error : ""}</h2>
      <form>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signUpUser}>
          {gettingUser ? "Creating Account..." : "Signup"}
        </button>
      </form>
      <p>Already have an account?</p>
      <button onClick={props.switchToLogin}>Login Here</button>
    </div>
  );
};

export default Signup;
