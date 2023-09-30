import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <ul className="footer__links">
          <li className="footer__link">
            <Link
              className="footer__link link"
              to="https://practicum.yandex.ru/"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer__link">
            <Link
              className="footer__link link"
              to="https://github.com/"
              target="_blank"
            >
              Github
            </Link>
          </li>
        </ul>
        <p className="footer__copyright">&copy;2023</p>
      </div>
    </footer>
  );
};

export default Footer;
