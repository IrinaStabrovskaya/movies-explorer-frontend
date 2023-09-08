import "./Portfolio.css";
import { Link } from "react-router-dom";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          Статичный сайт
          <Link
            className="portfolio__link link"
            to="https://github.com/IrinaStabrovskaya/how-to-learn"
            target="_blank"
          >
            ↗
          </Link>
        </li>
        <li className="portfolio__item">
          Адаптивный сайт
          <Link
            className="portfolio__link link"
            to="https://github.com/IrinaStabrovskaya/russian-travel"
            target="_blank"
          >
            ↗
          </Link>
        </li>
        <li className="portfolio__item">
          Одностраничное приложение
          <Link
            className="portfolio__link link"
            to="https://github.com/IrinaStabrovskaya/react-mesto-api-full-gha"
            target="_blank"
          >
            ↗
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
