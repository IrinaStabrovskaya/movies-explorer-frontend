import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import { useSearch } from "../../hooks/use-search";

//import { savedCards } from "../../utils/config";

const SavedMovies = ({
  isLoggedIn,
  movies, 
  onError,
  onDeleteMovie,
}) => {
  const { isFilterMovies, handleSearch, isLoading, text } = useSearch({
    movies: movies,
    isSavedMoviesPage: true,
  });
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <SearchForm
        movies={isFilterMovies}
        onError={onError}
        onSubmitRequest={handleSearch}
      />
      <MoviesCardList
        movies={isFilterMovies}
        savedMovies={isFilterMovies}
        infoText={text}
        onDeleteMovie={onDeleteMovie}
        isLoading={isLoading}
      />
      <Footer />
    </>
  );
};

export default SavedMovies;
