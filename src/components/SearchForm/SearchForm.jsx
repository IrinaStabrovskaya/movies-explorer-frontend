import "./SearchForm.css";
import Preloader from "../Preloader/Preloader";

const SearchForm = () => {
  return (
    <section className="search-form__container">
      <form className="search-form__form">
        <input type="text" className="search-form__input" placeholder="Фильм" />
        <button type="button" className="search-form__btn btn"></button>
      </form>
      <div className="search-form__filter-container">
        <div className="search-form__filter">
          <Preloader />
        </div>
        <p className="search-form__caption">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
