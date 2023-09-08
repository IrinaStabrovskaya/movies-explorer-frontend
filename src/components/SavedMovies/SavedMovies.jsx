
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

import { savedCards } from "../../utils/cards";

const SavedMovies = () => {
  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList>
        {savedCards.map((card) => (
          <li>
            <MoviesCard photo={card.photo} name={card.name} time={card.time} />
          </li>
        ))}
      </MoviesCardList>
      <Footer />
    </>
  );
};

export default SavedMovies;
