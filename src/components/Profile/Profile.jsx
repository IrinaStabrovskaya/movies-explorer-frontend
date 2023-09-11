import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const [isClick, setIsClick] = useState(false);
  const handleButtonClick = () => {
    setIsClick(true);
  };


  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <div className="profile-form__input-wrapper">
            <label className="profile-form__input-label" htmlFor="profile-name">
              Имя
            </label>
            <input
              className="profile-form__input"
              type="text"
              name="profile-name"              
              placeholder="Виталий"
              minLength={2}
              maxLength={30}
              required
            ></input>
          </div>
          <div className="profile-form__input-wrapper">
            <label className="profile-form__input-label" htmlFor="profile-name">
              E-mail
            </label>
            <input
              className="profile-form__input"
              type="text"
              name="profile-email"              
              placeholder="pochta@yandex.ru"
              required
            ></input>
          </div>
          <button onClick={handleButtonClick} className={isClick ? "profile-form__form-btn btn profile-form__form-btn_active" : "profile-form__form-btn btn"} type="button" >
            {isClick ? "Сохранить" : "Редактировать"}
          </button>
        </form>
        <Link className={isClick ? "profile__link link profile__link_invisible" : "profile__link link"} to="/">
          Выйти из аккаунта
        </Link>
      </section>
    </>
  );
};

export default Profile;
