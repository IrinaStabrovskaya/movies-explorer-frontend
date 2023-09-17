import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import {API_FILMS_URL} from "../../utils/constants/data";

const MoviesCard = ({ key,
  movieData,
  name,
  time,
  photo,
  isSaved,
  onSaveMovie,
  onDeleteMovie}) => {
  const location = useLocation();

  const convertTime = (time) => {
    const hours = Math.floor(time/60);
    const minutes = Math.floor(time % 60);
    return `${hours > 0 ? hours + 'ч ' : ''}${minutes}м`;
  }

  

  return (
    <>
      <div className="movie-card__container" key={key}>
        <img
          className="movie-card__pic"
          src={photo}
          alt="постер фильма"
        ></img>
        <div className="movie-card__description">
          <p className="movie-card__name">{name}</p>
          <button
            className={
              (location.pathname === "/movies" && !isSaved && "movie-card__like-btn btn") ||
              (location.pathname === "/movies" &&  isSaved && "movie-card__like-btn btn movie-card__like-btn_active") ||
              (location.pathname === "/saved-movies" && "movie-card__del-btn btn")
            }
            type="button"
            onClick={
              (location.pathname === "/movies" && !isSaved && (() => onSaveMovie (movieData))) ||
              (location.pathname === "/movies" && isSaved && (() => onDeleteMovie (movieData._id))) ||
              (location.pathname === "/saved-movies" && (() => onDeleteMovie(movieData._id))) 
              

            }
          ></button>
        </div>
        <p className="movie-card__time">{convertTime(time)}</p>
      </div>
    </>
  );
};

export default MoviesCard;
