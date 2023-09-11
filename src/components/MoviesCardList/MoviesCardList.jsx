import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";

const MoviesCardList = (props) => {
  const location = useLocation();
  return location.pathname === "/movies" ? (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">{props.children}</ul>
      <button className="movies-card-list__btn btn">Ещё</button>
    </section>
  ) : (
    <section className="movies-card-list movies-card-list_saved">
      <ul className="movies-card-list__container">{props.children}</ul>
    </section>
  );
};

export default MoviesCardList;
