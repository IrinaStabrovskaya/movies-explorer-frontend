import { NavLink, useNavigate } from "react-router-dom";
import "./BurgerMenu.css";

const BurgerMenu = ({ isOpen, onClose, isLoggedIn }) => {
const navigate = useNavigate();

  return (
    <>
      <div className={`burger-menu ${isOpen ? "burger-menu_opened" : ""}`}>
        <nav
          className={`burger-menu__container ${
            isOpen ? "burger-menu__container_active" : ""
          }`}
        >
          <button
            className="burger-menu__btn-close btn"
            type="button"
            onClick={onClose}
          />
          <ul className="burger-menu__links">
            <li>
              <NavLink to={"/"} className="burger-menu__link link">
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/movies"}
                className={({ isActive }) =>
                  isActive
                    ? "burger-menu__link link burger-menu__link_active"
                    : "burger-menu__link link"
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/saved-movies"}
                className={({ isActive }) =>
                  isActive
                    ? "burger-menu__link link burger-menu__link_active"
                    : "burger-menu__link link"
                }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink
            onClick={(isLoggedIn && (() => navigate("/profile")))}
            to={"/profile"}
            className={({ isActive }) =>
              isActive
                ? "burger-menu__account link burger-menu__account_active"
                : "burger-menu__account link"
            }
          >
            Аккаунт
            <span className="burger-menu__account-icon"></span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default BurgerMenu;
