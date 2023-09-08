import Auth from "../Auth";
import Input from "../Input/Input";

const Register = () => {
  return (
    <>
      <Auth
        title="Добро пожаловать!"
        button="Зарегистрироваться"
        pathBtn="/signin"
        text="Уже зарегистрированы?"
        pathLink="/signin"
        link="Войти"
      >
        <Input
          label="Имя"
          type="text"
          name="name"
          id="name"
          placeholder="Виталий"
        />

        <Input
          label="E-mail"
          type="text"
          name="email"
          id="email"
          placeholder="pochta@yandex.ru"
        />

        <Input label="Пароль" type="password" name="password" id="password" />
      </Auth>
    </>
  );
};

export default Register;
