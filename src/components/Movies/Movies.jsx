import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
//import MoviesCard from "../MoviesCard/MoviesCard";
// import { cards } from "../../utils/cards.js";
import Footer from "../Footer/Footer";
import { useSearch } from "../../hooks/use-search";

const Movies = ({
  isLoggedIn,
  movies,
  savedMovies,
  getMovies,
  onError,
  onSaveMovie,
  onDeleteMovie,
  ...props
}) => {
  const { isFilterMovies, handleSearch, isLoading, text } = useSearch({
    movies: movies,
    isMoviesPage: true,
    isSavedMoviesPage: false,
  });

  return (
    <>
      <Header
        isOpen={props.isOpen}
        onClose={props.onClose}
        onBurgerMenuClick={props.onBurgerMenuClick}
      />
      <SearchForm
        isLoading={isLoading}
        onError={onError}
        onSubmitRequest={handleSearch}
      />
      <MoviesCardList
        movies={isFilterMovies}
        savedMovies={savedMovies}
        infoText={text}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        isLoading={isLoading}
      
        
      />
      <Footer />
    </>
  );
};

export default Movies;
