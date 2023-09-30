import "./Main.css";
import "../Header/Header";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";

const Main = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <main className="main__container">        
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />        
      </main>
      <Footer />
    </>
  );
};

export default Main;
