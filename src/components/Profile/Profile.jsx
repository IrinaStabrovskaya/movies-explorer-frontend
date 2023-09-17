import "./Profile.css";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidForm from "../../hooks/use-valid-form";
import { QueryContext } from "../../contexts/QueryContext";

const Profile = ({
  onSubmit,
  onLogout,
  isLoggedIn,
  
}) => {
  const [isShowBtn, setShowBtn] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { isLoading, isError, errorMessage, goodMessage } = useContext(QueryContext);
  const { values, errors, isValid, setValues, setIsValid, handleChange } =
    useValidForm({ name: currentUser.name, email: currentUser.email });

  const handleChangeInput = (evt) => {
    handleChange(evt);
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    onSubmit({ name: values.name, email: values.email });
    if (errors && isError) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  };

  const handleShowBtn = () => {
    setShowBtn(true);
  };

  useEffect(() => {
    setValues((values) => ({
      ...values,
      name: currentUser.name,
      email: currentUser.email,
    }));
    if (currentUser) {
      setIsValid((isValid) => ({ ...isValid, name: true, email: true }));
    }
  }, [currentUser, setIsValid, setValues]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="profile">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form
          noValidate
          className="profile__form"
          name="profile"
          onSubmit={handleSubmitForm}
        >
         <div className="profile-form__input-wrapper">
            <label className="profile-form__input-label" htmlFor="name">
              Имя
             
            <input
              className="profile-form__input"
              type="text"
              name="name"
              placeholder="Виталий"
              value={values.name}
              minLength={2}
              maxLength={30}
              disabled={isLoading}
              required
              onChange={handleChangeInput}
              onFocus={handleShowBtn}
            ></input></label></div>
            <span className="profile-form__span-error">{errors.name}</span>
          
          <div className="profile-form__input-wrapper">
            <label className="profile-form__input-label" htmlFor="email">
              E-mail
            
            <input
              className="profile-form__input"
              type="email"
              name="email"
              placeholder="pochta@yandex.ru"
              values={values.email}
              disabled={isLoading}
              required
              onChange={handleChangeInput}
              onFocus={handleShowBtn}
            ></input></label>
            
          </div>
          <span className="profile-form__span-error">{errors.email}</span>

          <span className="profile-form__span-result">
            {(isError && errorMessage) || goodMessage}
          </span>
          {isLoading && <Preloader />}
          {!isLoading && isShowBtn && (
            <button
              className={
                "profile-form__form-btn btn profile-form__form-btn_active"
                // "profile-form__form-btn btn"
              }
              type="submit"
              disabled={!isValid}
            >
              Сохранить
            </button>
          )}
          {!isLoading && !isShowBtn && (
            <>
              <button
                className={
                  // "profile-form__form-btn btn profile-form__form-btn_active"
                  "profile-form__form-btn btn"
                }
                type="submit"
                onClick={handleShowBtn}
              >
                Редактировать
              </button>
              <Link
                className={"profile-form__link link"}
                to="/"
                onClick={onLogout}
              >
                Выйти из аккаунта
              </Link>
            </>
          )}
        </form>
      </section>
    </>
  );
};

export default Profile;
