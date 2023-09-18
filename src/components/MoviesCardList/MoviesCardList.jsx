import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { countMoviesLoading } from "../../utils/config";
import { useMatchMedia } from "../../hooks/use-match-media";
import Preloader from "../Preloader/Preloader";
import { API_FILMS_URL } from "../../utils/constants/data";

const MoviesCardList = ({
  movies,
  savedMovies,
  infoText,
  onSaveMovie,
  onDeleteMovie,
  isLoading,
  isSaved,
  ...props
}) => {
  const location = useLocation();

  const { isMobile, isTablet, isDesktop } = useMatchMedia();
  // состояние показа доп фильмов
  const [showMoreMovies, setShowMoreMovies] = useState(true);
  // состояние пагинации
  const [isLoadingPaggination, setIsLoadingPaggination] = useState(false);
  // сотояние загр стр фильмов
  const [isLoadingMoviesPage, setIsLoadingMoviesPage] = useState(0);
  // сост количества фильмов
  const [moviesCount, setMoviesCount] = useState(0);

  useEffect(() => {
    setMoviesCount(
      (isMobile &&
        countMoviesLoading.mobile.moviesCount +
          countMoviesLoading.mobile.adddMoreMovies * isLoadingMoviesPage) ||
        (isTablet &&
          countMoviesLoading.tablet.moviesCount +
            countMoviesLoading.tablet.adddMoreMovies * isLoadingMoviesPage) ||
        (isDesktop &&
          countMoviesLoading.desktop.moviesCount +
            countMoviesLoading.desktop.adddMoreMovies * isLoadingMoviesPage)
    );
    (movies.length >= moviesCount && setShowMoreMovies(true)) ||
      (movies.length < moviesCount && setShowMoreMovies(false));
  }, [movies, moviesCount, isLoadingMoviesPage, isMobile, isTablet, isDesktop]);

  const isSavedMovie = (movie) => {
    return savedMovies.reduce((aсс, savedMovie) => {
      if (savedMovie.movieId === movie.id) {
        movie._id = savedMovie._id;
        return true;
      }
      return aсс;
    }, false);
  };

  const keyMovie = (movie) => {
    return movie.movieId
      ? movie.movieId
      : movie.id
  }


  const photoLink = (movie) => {
    console.log("hjk", movie.image)
    return movie.movieId

      ?  movie = movie.image //.slice(28,)  
      : API_FILMS_URL + movie.image.url 
  }

  const renderMoviesCard = (moviesCount) => {
    if (movies.length > 0) {
      return movies.slice(0, moviesCount).map((movieData) => {
        return (
          <MoviesCard
            key={keyMovie(movieData)}
            movieData={movieData}
            name={movieData.nameRU}
            time={movieData.duration}
            photo={photoLink(movieData)}
            isSaved={isSavedMovie(movieData)}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            onClick={movieData.trailer}
          />
        );
      });
    }
  };

  const handleRenderMore = () => {
    setShowMoreMovies(false);
    setIsLoadingPaggination(true);
    setTimeout(() => {
      setShowMoreMovies(true);
      setIsLoadingPaggination(false);
      setIsLoadingMoviesPage((prev) => prev + 1);
    }, 300);
  };

  return (
    <section className="movies-card-list">
      {movies.length === 0 && (
        <p className="movies-card-list__info-text">{infoText}</p>
      )}
      <ul className="movies-card-list__container">
        {isLoading ? <Preloader /> : 
        
        renderMoviesCard(moviesCount)}
      </ul>
      {showMoreMovies && (
        <button
          className={
            location.pathname === "/movies"
              ? "movies-card-list__btn btn"
              : "movies-card-list__btn btn movies-card-list__btn_none"
          }
          type="button"
          onClick={handleRenderMore}
        >
          Ещё
        </button>
      )}
      {<Preloader /> && isLoadingPaggination}
    </section>
  )
};

export default MoviesCardList;
