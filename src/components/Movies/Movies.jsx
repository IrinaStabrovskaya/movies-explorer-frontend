import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import useMatchMedia from "../../hooks/use-match-media";
import useSearch from '../../hooks/use-search';
import { countMoviesLoading } from '../../utils/config';

const Movies = ({
  movies,
  onSaveMovie,
  onDeleteMovie,  
  savedMovies,
  device,  
  getMovies,
  ...props
}) => {
  const { isMobile, isTablet, isDesktop } = useMatchMedia();

  const { filteredMovies, savedSearch, searchStatus, setSearchStatus, handleSubmitSearch } =
    useSearch({
      movies: movies,
      isSavedMoviesPage: false,
      getMovies: getMovies,
    });

  const [valueSearch, setValueSearch] = useState({
    searchMovie: savedSearch.searchMovie ?? '',
    shortMovie: savedMovies.shortMovie ?? false,
  });
  const [moreMovies, setMoreMovies] = useState(0);
  const [isShowMoreButton, setShowMoreButton] = useState(false);
  const [maxShowMovies, setMaxShowMovies] = useState(0);

  useEffect(() => {
    if (valueSearch.searchMovie === '') {      
      setSearchStatus((searchStatus) => ({
       ...searchStatus,
        statusMessage: "Для поиска введите ключевое слово."}))      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearch.searchMovie]);

  const handleClickMore = () => {
    setMaxShowMovies((maxMovies) => maxMovies + moreMovies);
    
  };  

  useEffect(() => {
    if ('search' in localStorage) {
      const { searchMovie, shortMovie } = JSON.parse(
        localStorage.getItem('search')
      );
      setValueSearch({
        searchMovie: searchMovie,
        shortMovie: shortMovie,
      });
    }
  }, []);

  useEffect(() => {
    setMaxShowMovies((isDesktop && countMoviesLoading.desktop.moviesCount) ||
    (isTablet && countMoviesLoading.tablet.moviesCount)||
    (isMobile && countMoviesLoading.mobile.moviesCount))

    setMoreMovies((isDesktop && countMoviesLoading.desktop.addMoreMovies)||
    (isTablet && countMoviesLoading.tablet.addMoreMovies) ||
    (isMobile && countMoviesLoading.mobile.addMoreMovies))
  }, [isMobile, isTablet, isDesktop, savedSearch]);

  useEffect(() => {
    if (filteredMovies) {
      if (!(filteredMovies.length <= maxShowMovies)) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    }
  }, [filteredMovies, maxShowMovies]);

  return (
    <>
    <Header
        isOpen={props.isOpen}
        onClose={props.onClose}
        onBurgerMenuClick={props.onBurgerMenuClick}
      />
      <SearchForm
        onSubmitSearch={handleSubmitSearch}
        isSavedMoviesPage={false}
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
        savedSearch={savedSearch}
        setMaxShowMovies={setMaxShowMovies}
        device={device}
        
        
      />
      {searchStatus.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isSavedMoviesPage={false}
          moviesList={filteredMovies.slice(0, maxShowMovies)}
          searchStatus={searchStatus}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          savedMovies={savedMovies}
          isShowMoreButton={isShowMoreButton}
          onSubmitMoreButton={handleClickMore}
          showMoreButton={isShowMoreButton}
        />
      )}
      <Footer />
    </>
  );
};

export default Movies;
