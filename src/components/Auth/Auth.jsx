import "./Auth.css";
import Logo from "../Logo/Logo";
import { Link, useNavigate } from "react-router-dom";

const Auth = (props) => {
  const navigate = useNavigate();

  return (
    <section className="auth">
      <Logo />
      <h1 className="auth__title">{props.title}</h1>
      <form className="auth__form">
        <div className="auth-form__input-wrapper">{props.children}</div>
        <button
          className="auth-form__btn btn"
          onClick={() => navigate(`${props.pathBtn}`)}
        >
          {props.button}
        </button>
      </form>
      <div className="auth-link__link-wrapper">
        <p className="auth-link__link-text">{props.text}</p>
        <Link className="auth__link link" to={props.pathLink}>
          {props.link}
        </Link>
      </div>
    </section>
  );
};

export default Auth;
