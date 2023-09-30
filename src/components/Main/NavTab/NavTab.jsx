import "./NavTab.css";
import { Link } from "react-router-dom";

const NavTab = () => {
  return (
    <nav className="navtab">
      <Link to="#project" className="navtab__link link" reloadDocument>
        О проекте
      </Link>
      <Link to="#techs" className="navtab__link link" reloadDocument>
        Технологии
      </Link>
      <Link to="#student" className="navtab__link link" reloadDocument>
        Студент
      </Link>
    </nav>
  );
};

export default NavTab;
