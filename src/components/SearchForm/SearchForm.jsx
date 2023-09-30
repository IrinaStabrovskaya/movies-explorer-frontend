import "./SearchForm.css";
import useMatchMedia from "../../hooks/use-match-media";
import { countMoviesLoading } from "../../utils/config";

const SearchForm = ({
  onSubmitSearch,
  isSavedMoviesPage,
  valueSearch,
  setValueSearch,
  searchStatus,
  setSearchStatus,
  setMaxShowMovies, 
}) => {
  const { isMobile, isTablet, isDesktop } = useMatchMedia();
  
  const handleChange = (evt) => {
    setValueSearch((valueSearch) => {
      return { ...valueSearch, searchMovie: evt.target.value };
    });
  };

  const handleChangeCheckbox = (evt) => {
    setValueSearch((valueSearch) => {
      return { ...valueSearch, shortMovie: evt.target.checked };
    });

    if (!isSavedMoviesPage && searchStatus.isFirstSearch) {
      return;
    }
    onSubmitSearch({ ...valueSearch, shortMovie: evt.target.checked });
    console.log({ ...valueSearch, shortMovie: evt.target.checked });
    isDesktop &&
      !isSavedMoviesPage &&
      setMaxShowMovies(countMoviesLoading.desktop.moviesCount);
    isTablet &&
      !isSavedMoviesPage &&
      setMaxShowMovies(countMoviesLoading.tablet.moviesCount);
    isMobile &&
      !isSavedMoviesPage &&
      setMaxShowMovies(countMoviesLoading.mobile.moviesCount);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitSearch(valueSearch);
    isDesktop &&
      !isSavedMoviesPage &&
      setMaxShowMovies(countMoviesLoading.desktop.moviesCount);
    isTablet &&
      !isSavedMoviesPage &&
      setMaxShowMovies(countMoviesLoading.tablet.moviesCount);
    isMobile &&
      !isSavedMoviesPage &&
      setMaxShowMovies(countMoviesLoading.mobile.moviesCount);
  };

  return (
    <section className="search-form__container">
      <form
        className="search-form__form"
        name="searchMovie"
        onSubmit={handleSubmit}
        searchStatus={searchStatus}             
        noValidate
      >
        <label className="search-form__input-wrapper">
          <input
            className="search-form__input"
            key="searchMovie"
            type="text"
            name="searchMovie"
            placeholder="Фильм"
            required
            autoFocus
            autoComplete="on"
            value={valueSearch.searchMovie}
            isChecked={valueSearch.shortMovie}
            onChange={handleChange}
            isSavedMoviesPage={isSavedMoviesPage}
            
          />
          <button className="search-form__btn btn" type="submit" disabled={valueSearch.searchMovie === ""}></button>
        </label>
        {(isSavedMoviesPage && (
          <span className="search-form__span-query">
            {searchStatus.statusMessage}
          </span>
        )) || (
          <span className="search-form__span-query">
            {searchStatus.statusMessage}
          </span>
        )}
        <label className="search-form__filter-container">
          <input
            className="search-form__filter"
            key="shortMovie"
            name="shortMovie"
            type="checkbox"
            value={valueSearch.shortMovie}
            isChecked={valueSearch.shortMovie}
            onChange={handleChangeCheckbox}
            isSavedMoviesPage={isSavedMoviesPage}
            disabled={searchStatus.isLoading}
          />
          <span className="search-form__filter-img"></span>
          Короткометражки
        </label>
      </form>
    </section>
  );
};

export default SearchForm;
