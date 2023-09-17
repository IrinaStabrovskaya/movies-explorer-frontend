import "./SearchForm.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchForm = ({ isLoading, onSubmitRequest, onError }) => {
  const location = useLocation();
  //состояние до первого запроса
  const [searchRequest, setSearchRequest] = useState({
    searchMovie: "",
    shortMovie: false,
  });
  
  // ф-ция сабмита 
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!searchRequest.searchMovie.trim()) {
      onError();
      return setSearchRequest({ ...searchRequest, searchMovie: "" });
    }
    onSubmitRequest(searchRequest);
  };
  // ф-ция изменения состояния запроса при вводе данных в инпут
  const handleChange = (e) => {
    setSearchRequest({ ...searchRequest, searchMovie: e.target.value });
  };

  // ф-ция изменения состояния запроса при переключении чекбокса короткометражек
  const handleChangeCheckbox = (e) => {
    if (!searchRequest.searchMovie.trim()) {
      onError();
      return setSearchRequest({ ...searchRequest, searchMovie: "" });
    }
    setSearchRequest({ ...searchRequest, shortMovie: e.target.checked });
    onSubmitRequest({ ...searchRequest, shortMovie: e.target.checked });
  };
  
  //если уже есть предыдущий запрос в локалсторадж, то меняется состояние в соответствии с этими данными
  useEffect(() => {
    if (location.pathname === "/movies" && localStorage.getItem("search")) {
      const { searchMovie, shortMovie } = JSON.parse(
        localStorage.getItem("search")
      );
      setSearchRequest({
        searchMovie,
        shortMovie,
      });
    }
  }, [location]);

  return (
    <section className="search-form__container">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <label className="search-form__input-wrapper">
          <input
            className="search-form__input"
            type="text"
            name="searchMovie"
            placeholder="Фильм"
            value={searchRequest.searchMovie}
            required
            disabled={isLoading}
            onChange={handleChange}
          />
          <button className="search-form__btn btn" ></button>
        </label>

        <label className="search-form__filter-container">
          <input
            className="search-form__filter"
            type="checkbox"
            name="shortMovie"
            disabled={isLoading}
            checked={searchRequest.shortMovie}
            onChange={handleChangeCheckbox}
            
          />
          <span className="search-form__filter-img"></span>
          Короткометражки
        </label>
      </form>
    </section>
  );
};

export default SearchForm;
