import Preloader from '../Preloader/Preloader';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import useSearch from '../../hooks/use-search';

const SavedMovies = ({ savedMovies, onDeleteMovie }) => {
  const [valueSearch, setValueSearch] = useState({ searchMovie: '', shortMovie: false });
  const [isMessageShow, setMessageShow] = useState(false);
  const { filteredMovies, searchStatus, handleSubmitSearch } = useSearch({
    movies: savedMovies,
    isSavedMoviesPage: true,
  });

  useEffect(() => {
    if (!!filteredMovies) {
      if (filteredMovies.length === 0) {
        setMessageShow(true);
      } else {
        setMessageShow(false);
      }
    }
  }, [filteredMovies]);

  return (
    <>
    <Header />
      <SearchForm
        isSavedMoviesPage={true}
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        onSubmitSearch={handleSubmitSearch}
        searchStatus={searchStatus}
        isMessageShow={isMessageShow}        
      />
      {searchStatus.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isSavedMoviesPage={true}
          moviesList={filteredMovies}
          onDeleteMovie={onDeleteMovie}
        />
      )}
      <Footer />
    </>
  );
};

export default SavedMovies;