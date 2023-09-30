import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({
  isSavedMoviesPage,
  moviesList,
  onSaveMovie,
  currentUser,
  savedMovies,
  onDeleteMovie,
  onSubmitMoreButton,
  showMoreButton,
}) => {
  const location = useLocation();
  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__container'>
        {moviesList.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id ?? movie._id}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            isSavedMoviesPage={isSavedMoviesPage}
            currentUser={currentUser}
            savedMovies={savedMovies}
          />
        ))}
      </ul>

      {showMoreButton && (
        <div className='movies__wrapper'>
          <button className={
            location.pathname === "/movies"
              ? "movies-card-list__btn btn"
              : "movies-card-list__btn btn movies-card-list__btn_none"
          }
          type="button"
          onClick={onSubmitMoreButton}>
            Ещё
          </button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;