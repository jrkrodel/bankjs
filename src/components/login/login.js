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
      console.log(err);
      setGettingUser(false);
      setError("Incorrect Username or Password");
    }
  };
  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <h2 className={styles.error}>{error ? error : ""}</h2>
      <label>Email:</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginUser}>
        {gettingUser ? "Logging in..." : "Login"}{" "}
      </button>
      <p>Don't have an account?</p>
      <button onClick={props.switchToSignUp}>Create Account</button>
    </div>
  );
}

export default Login;