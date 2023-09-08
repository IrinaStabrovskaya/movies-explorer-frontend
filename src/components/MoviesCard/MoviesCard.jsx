import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

const MoviesCard = (props) => {
  const location = useLocation();

  return (
    <>
      <div className="movie-card__container">
        <img
          className="movie-card__pic"
          src={props.photo}
          alt="постер фильма"
        ></img>
        <div className="movie-card__description">
          <p className="movie-card__name">{props.name}</p>
          <button
            className={
              (location.pathname === "/movies" && "movie-card__like-btn btn") ||
              (location.pathname === "/saved-movies" && "movie-card__del-btn btn")
            }
          ></button>
        </div>
        <p className="movie-card__time">{props.time}</p>
      </div>
    </>
  );
};

export default MoviesCard;
