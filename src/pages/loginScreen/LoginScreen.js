import Login from "../../components/login/login";
import styles from "./LoginScreen.module.css";
import Signup from "../../components/signup/signup";
import { useState } from "react";
import { useUserAuth } from "../../context/userAuthContext";
import { Navigate } from "react-router-dom";

function LoginScreen(props) {
  const [signUp, setSignUp] = useState(false);

  const switchToSignUp = () => {
    setSignUp(true);
  };

  const switchToLogin = () => {
    setSignUp(false);
  };

  let { user } = useUserAuth();
  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <h1>BankJS</h1>
        </div>
        <div className={styles.form}>
          {!signUp ? (
            <Login switchToSignUp={switchToSignUp} showNav={props.showNav} />
          ) : (
            <Signup switchToLogin={switchToLogin} showNav={props.showNav} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
