import styles from "./App.module.css";
import { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import clsx from "clsx";

const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));

const buildLink = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

function App() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <nav className={styles.nav}>
          <NavLink to="/" className={buildLink}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLink}>
            Movies
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
