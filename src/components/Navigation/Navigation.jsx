import "./Navigation.css";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import TopMenu from "./TopMenu/TopMenu";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useResize } from "../../hooks/use-resize";

const Navigation = ({ isLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDesktop} = useResize();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const handleBurgerMenuClick = () => {
    setIsBurgerMenuOpen(true);
  };

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpen(false);
  };

  return (
    <>
      {(location.pathname === "/" && isLoggedIn && 
        <TopMenu isLoggedIn={isLoggedIn} />
      ) ||
        (location.pathname === "/" && !isLoggedIn && 
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
        ) ||
        (location.pathname === "/"  && !isDesktop && 
          <>
            <button
              className="burger-menu__btn-open btn"
              type="button"
              onClick={handleBurgerMenuClick}
            ></button>
            <BurgerMenu
              isOpen={isBurgerMenuOpen}
              onClose={closeBurgerMenu}
              isLoggedIn={isLoggedIn}
            />
          </>
        ) ||
        (location.pathname !== "/" && !isDesktop && 
          <>
            <button
              className="burger-menu__btn-open btn"
              type="button"
              onClick={handleBurgerMenuClick}
            ></button>

            <BurgerMenu
              isOpen={isBurgerMenuOpen}
              onClose={closeBurgerMenu}
              isLoggedIn={isLoggedIn}
            />
          </>
        ) ||
        (location.pathname !== "/" && isDesktop && 
          <TopMenu isLoggedIn={isLoggedIn} />
        )}
    </>
  );
};

export default Navigation;
