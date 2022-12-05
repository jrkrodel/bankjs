import { useUserAuth } from "../../context/userAuthContext";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [gettingUser, setGettingUser] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const { login } = useUserAuth();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setGettingUser(true);
      await login(email, password);
      setGettingUser(false);
      navigate("home");
    } catch (err) {
      setGettingUser(false);
      setError("Incorrect Username or Password");
    }
  };
  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <h2 className={styles.error}>{error ? error : ""}</h2>
      <form>
        <label>Email:</label>
        <input
          value={email}
          type="email"
          placeholder="Enter email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.loginButton} onClick={loginUser}>
          {gettingUser ? "Logging in..." : "Login"}{" "}
        </button>
      </form>
      <p className={styles.loginButtonLabel}>Don't have an account?</p>
      <button className={styles.loginButton} onClick={props.switchToSignUp}>
        Create Account
      </button>
    </div>
  );
}

export default Login;
