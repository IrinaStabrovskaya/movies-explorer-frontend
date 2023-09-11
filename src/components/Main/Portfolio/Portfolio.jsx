import "./Portfolio.css";
import { Link } from "react-router-dom";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">

        <li className="portfolio__item">          
          <Link
            className="portfolio__link link"
            to="https://github.com/IrinaStabrovskaya/how-to-learn"
            target="_blank"
          >Статичный сайт
            <span className="portfolio__link-icon">↗</span>
          </Link>
        </li>

        <li className="portfolio__item">          
          <Link
            className="portfolio__link link"
            to="https://github.com/IrinaStabrovskaya/russian-travel"
            target="_blank"
          >Адаптивный сайт
            <span className="portfolio__link-icon">↗</span>
          </Link>
        </li>

        <li className="portfolio__item">          
          <Link
            className="portfolio__link link"
            to="https://github.com/IrinaStabrovskaya/react-mesto-api-full-gha"
            target="_blank"
          >Одностраничное приложение
            <span className="portfolio__link-icon">↗</span>
          </Link>
        </li>

      </ul>
    </section>
  );
};

export default Portfolio;
