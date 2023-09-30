import "./MoviesCard.css";
import { Link } from "react-router-dom";
import { API_FILMS_URL } from "../../utils/constants/data";

const MoviesCard = ({
  isSavedMoviesPage,
  movie,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
}) => {
  const isLiked =
    !isSavedMoviesPage && savedMovies.some((item) => item.movieId === movie.id);

  const movieLikeButtonClassName = `movie-card__like-btn btn ${
    isLiked && "movie-card__like-btn_active"
  }`;

  function handleLikeClick() {
    onSaveMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: API_FILMS_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: API_FILMS_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
    });
  }

  function handleDeletClick() {
    onDeleteMovie(movie);
  }

  const photoLink = (movie) => {
    return movie.movieId
      ? (movie = movie.image)
      : API_FILMS_URL + movie.image.url;
  };

  const convertTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time % 60);
    return `${hours > 0 ? hours + "ч " : ""}${minutes}м`;
  };

  return (
    <li className="movie-card__container">
      <Link
        className="movie-card__link-pic link"
        to={`${movie.trailerLink}`}
        target="_blank"
      >
        <img
          className="movie-card__pic"
          src={photoLink(movie)}
          alt={movie.nameRU}
        />
      </Link>
      <div className="movie-card__description">
        <p className="movie-card__name">{movie.nameRU || movie.nameEN}</p>

        <button
          className={`movies__button ${
            isSavedMoviesPage
              ? "movie-card__del-btn btn"
              : movieLikeButtonClassName
          }`}
          type="button"
          onClick={!isSavedMoviesPage ? handleLikeClick : handleDeletClick}
        />
      </div>
      <p className="movie-card__time">{convertTime(movie.duration)}</p>
    </li>
  );
};

export default MoviesCard;
