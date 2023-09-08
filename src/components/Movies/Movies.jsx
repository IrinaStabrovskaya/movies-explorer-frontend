
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import { cards } from "../../utils/cards.js";
import Footer from "../Footer/Footer";

const Movies = (props) => {
  return (
    <>
      <Header
        isOpen={props.isOpen}
        onClose={props.onClose}
        onBurgerMenuClick={props.onBurgerMenuClick}
      />
      <SearchForm />
      <MoviesCardList>
        {cards.map((card) => (
          <li>
            <MoviesCard photo={card.photo} name={card.name} time={card.time} />
          </li>
        ))}
      </MoviesCardList>
      <Footer />
    </>
  );
};

export default Movies;
