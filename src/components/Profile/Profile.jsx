import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <div className="profile__input-wrapper">
            <label className="profile__input-label" htmlFor="profile-name">
              Имя
            </label>
            <input
              className="profile__input"
              type="text"
              name="profile-name"
              id="profile-name"
              placeholder="Виталий"
            ></input>
          </div>
          <div className="profile__input-wrapper">
            <label className="profile__input-label" htmlFor="profile-name">
              E-mail
            </label>
            <input
              className="profile__input"
              type="text"
              name="profile-email"
              id="profile-email"
              placeholder="pochta@yandex.ru"
            ></input>
          </div>
          <button className="profile__form-btn btn" type="button">
            Редактировать
          </button>
        </form>
        <Link className="profile__link link" to="/">
          Выйти из аккаунта
        </Link>
      </section>
    </>
  );
};

export default Profile;
