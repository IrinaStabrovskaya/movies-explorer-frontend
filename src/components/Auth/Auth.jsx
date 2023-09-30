import "./Auth.css";
import { useContext } from "react";
import { QueryContext } from "../../contexts/QueryContext";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Preloader from "../Preloader/Preloader";

const Auth = ({
  title,
  button,
  text,
  pathLink,
  link,
  onSubmit,
  name,
  isValid,
  isLoading,
  ...props
}) => {
  const { isError, errMessage } = useContext(QueryContext);

  return (
    <section className="auth">
      <Logo />
      <h1 className="auth__title">{`${title}`}</h1>
      <form
        className="auth__form"
        name={name}
        autoComplete="off"
        onSubmit={onSubmit}
        isLoading={isLoading}
        noValidate
      >
        <div className="auth-form__input-wrapper">{props.children}</div>
        <span
          className={
            isValid
              ? "auth-form__span-result auth-form__span-result_inactive"
              : "auth-form__span-result "
          }
        >
          {isError && errMessage}
        </span>
        {isLoading && <Preloader />}
        <button
          className={
            isValid
              ? "auth-form__btn btn"
              : "auth-form__btn auth-form__btn_inactive"
          }
          type="submit"
          disabled={!isValid}
        >
          {`${button}`}
        </button>
      </form>
      <div className="auth-link__link-wrapper">
        <p className="auth-link__link-text">{`${text}`}</p>
        <Link className="auth__link link" to={pathLink}>
          {link}
        </Link>
      </div>
    </section>
  );
};

export default Auth;
