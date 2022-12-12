import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";
import { useUserAuth } from "../../context/userAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faCreditCard,
  faChartSimple,
  faUser,
  faBars,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Nav(props) {
  const { pathname } = useLocation();
  let { logout } = useUserAuth();
  const [nav, setNav] = useState(true);
  const [activeLink, setActiveLink] = useState(pathname.split("/")[1]);

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  const openNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    setActiveLink(pathname.split("/")[1]);
  }, [pathname]);

  return (
    <div>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>BankJS</h1>

        <Link className={styles.navLink} to="/home">
          <FontAwesomeIcon className={styles.icon} icon={faHouse} />
          <p
            className={activeLink === "home" ? styles.active : styles.inactive}
          >
            Home
          </p>
        </Link>
        <Link className={styles.navLink} to="/transactions">
          <FontAwesomeIcon className={styles.icon} icon={faCreditCard} />
          <p
            className={
              activeLink === "transactions" ? styles.active : styles.inactive
            }
          >
            Transactions
          </p>
        </Link>
        <Link className={styles.navLink} to="/budgets">
          <FontAwesomeIcon className={styles.icon} icon={faChartSimple} />
          <p
            className={
              activeLink === "budgets" ? styles.active : styles.inactive
            }
          >
            Budgets
          </p>
        </Link>
        <Link className={styles.navLink} to="/profile">
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
          <p
            className={
              activeLink === "profile" ? styles.active : styles.inactive
            }
          >
            Profile
          </p>
        </Link>
        <p className={styles.funds}>Funds: ${props.funds}</p>
        <Link className={styles.navLink} onClick={logoutUser} to="/">
          <FontAwesomeIcon className={styles.icon} icon={faRightFromBracket} />
          Logout
        </Link>
        <div>
          <FontAwesomeIcon
            className={styles.mobileNav}
            icon={nav ? faBars : faXmark}
            onClick={openNav}
          />
        </div>
      </nav>
      <div
        className={nav ? styles.mobileNavBarClosed : styles.mobileNavBarOpen}
      >
        <p className={styles.fundsMobile}>Funds: ${props.funds}</p>
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
