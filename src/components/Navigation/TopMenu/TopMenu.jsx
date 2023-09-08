import "./TopMenu.css";
import { NavLink } from "react-router-dom";

const TopMenu = () => {
  return (
    <nav className="top-menu__menu">
      <ul className="top-menu__links">
        <li>
          <NavLink to={"/movies"}
            className={({ isActive }) =>
              isActive
                ? "top-menu__link link top-menu__link_active"
                : "top-menu__link link"
            }>Фильмы</NavLink>
        </li>
        <li>
          <NavLink to={"/saved-movies"}
            className={({ isActive }) =>
              isActive
                ? "top-menu__link link top-menu__link_active"
                : "top-menu__link link"
            }>Сохранённые фильмы</NavLink>
        </li>
      </ul>
      <NavLink to="/profile" className="top-menu__account link" >Аккаунт
        <span className="top-menu__account-icon"></span>
      </NavLink>
    </nav>
  );
};

export default TopMenu;
