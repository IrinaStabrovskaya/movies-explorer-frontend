import "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">Страница не найдена</h2>
      </div>
      <Link to="/" className="not-found__link link">
        Назад
      </Link>
    </section>
  );
};

export default PageNotFound;
