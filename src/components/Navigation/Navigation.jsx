import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const buildLink = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={buildLink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={buildLink}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
