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
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Nav(props) {
  let { logout } = useUserAuth();
  const [nav, setNav] = useState(false);
  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      await logout();
      props.hideNav();
    } catch (err) {
      console.log(err);
    }
  };

  const openNav = () => {
    setNav(!nav);
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
        <p className={styles.funds}>Funds: {props.funds}</p>
        <Link className={styles.navLink} onClick={logoutUser} to="/">
          <FontAwesomeIcon className={styles.icon} icon={faRightFromBracket} />
          Logout
        </Link>
        <div>
          <FontAwesomeIcon
            className={styles.mobileNav}
            icon={faBars}
            onClick={openNav}
          />
        </div>
      </nav>
      <div
        className={nav ? styles.mobileNavBarClosed : styles.mobileNavBarOpen}
      >
        <Link onClick={openNav} className={styles.navLinkMobile} to="/home">
          <FontAwesomeIcon className={styles.icon} icon={faHouse} />
          Home
        </Link>
        <Link
          onClick={openNav}
          className={styles.navLinkMobile}
          to="/transactions"
        >
          <FontAwesomeIcon className={styles.icon} icon={faCreditCard} />
          Transactions
        </Link>
        <Link onClick={openNav} className={styles.navLinkMobile} to="/budgets">
          <FontAwesomeIcon className={styles.icon} icon={faChartSimple} />
          Budgets
        </Link>
        <Link onClick={openNav} className={styles.navLinkMobile} to="/profile">
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
          Profile
        </Link>
        <Link className={styles.navLinkMobile} onClick={logoutUser} to="/">
          <FontAwesomeIcon className={styles.icon} icon={faRightFromBracket} />
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Nav;
