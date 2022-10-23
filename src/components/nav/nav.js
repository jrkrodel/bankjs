import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import { useUserAuth } from "../../context/userAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCreditCard,
  faChartSimple,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function Nav(props) {
  let { logout } = useUserAuth();
  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      await logout();
      props.hideNav();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>BankJS</h1>
        <Link className={styles.navLink} to="/home">
          <FontAwesomeIcon className={styles.icon} icon={faHouse} />
          Home
        </Link>
        <Link className={styles.navLink} to="/transactions">
          <FontAwesomeIcon className={styles.icon} icon={faCreditCard} />
          Transactions
        </Link>
        <Link className={styles.navLink} to="/budgets">
          <FontAwesomeIcon className={styles.icon} icon={faChartSimple} />
          Budgets
        </Link>
        <Link className={styles.navLink} to="/profile">
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
          Profile
        </Link>
        <Link className={styles.navLink} onClick={logoutUser} to="/">
          Logout
        </Link>
        <div>
          <FontAwesomeIcon className={styles.mobileNav} icon={faBars} />
        </div>
      </nav>
    </div>
  );
}

export default Nav;
