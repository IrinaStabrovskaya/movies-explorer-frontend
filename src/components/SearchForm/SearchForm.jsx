import "./SearchForm.css";
//import Preloader from "../Preloader/Preloader";

const SearchForm = () => {
  return (
    <section className="search-form__container">
      <form className="search-form__form">
        <div className="search-form__input-wrapper">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            required
          />
          <button type="button" className="search-form__btn btn"></button>
        </div>

        <label className="search-form__filter-container">
          <input type="checkbox" className="search-form__filter" />
          <span className="search-form__filter-img"></span>
          Короткометражки
        </label>
      </form>
    </section>
  );
};

export default SearchForm;
