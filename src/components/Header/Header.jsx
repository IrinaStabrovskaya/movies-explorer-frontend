import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header
      className={location.pathname === "/" ? "header header_color" : "header"}
    >
      <div className="header__container">
        <Logo />
        <nav className="header__nav">
          <Navigation />
        </nav>
      </div>
    </header>
  );
};

export default Header;
