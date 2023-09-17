import "./Auth.css";
import { useContext } from "react";
import { QueryContext } from "../../contexts/QueryContext";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Preloader from "../Preloader/Preloader";
import useValidForm from "../../hooks/use-valid-form";


const Auth = (props) => {
  const {  isValid } = useValidForm();
  const { isLoading } =useContext(QueryContext);

  return (
    <section className="auth">
      <Logo />
      <h1 className="auth__title">{`${props.title}`}</h1>
      <form className="auth__form" 
        name={props.name}
        autoComplete="on"
        onSubmit={props.onSubmit}
        noValidate
        >
        <div className="auth-form__input-wrapper">{props.children}</div>
        <span className="auth-form__span-result">
            
          </span>
          {isLoading ? <Preloader /> :
        <button
          className={`"auth-form__btn btn" ${!isValid && "auth-form__btn auth-form__btn_inactive btn"}`}
          type="submit" 
          disabled={isValid}      
        >
          {`${props.button}`}
        </button> }
      </form>
      <div className="auth-link__link-wrapper">
        <p className="auth-link__link-text">{`${props.text}`}</p>
        <Link className="auth__link link" to={props.pathLink}>
          {props.link}
        </Link>
      </div>
    </section>
  );
};

export default Auth;
