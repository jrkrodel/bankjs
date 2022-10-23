import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useUserAuth } from "../../context/userAuthContext";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h1>Signup</h1>
      <label>Email:</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUpUser}>Signup</button>
      <p>Already have an account?</p>
      <button onClick={props.switchToLogin}>Login</button>
    </div>
  );
};

export default Signup;
