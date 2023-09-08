import "./Navigation.css";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopMenu from "./TopMenu/TopMenu";
import { useResize } from "../../hooks/use-resize";

const Navigation = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDesktop } = useResize();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const handleBurgerMenuClick = () => {
    setIsBurgerMenuOpen(true);
  };

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpen(false);
  };

  return (
    <>
      {(location.pathname === "/" && (
        <>
          <Link to={"/signup"} className="navigation__link link">
            Регистрация
          </Link>
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="navigation__btn btn"
          >
            Войти
          </button>
        </>
      )) ||
        (isDesktop && <TopMenu />) ||
        (!isDesktop && (
          <button
            className="burger-menu__btn-open btn"
            type="button"
            onClick={handleBurgerMenuClick}
          ></button>
        ))}
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={closeBurgerMenu} />
    </>
  );
};

export default Navigation;
