import Auth from "../Auth";
import Input from "../Input/Input";

const Login = () => {
  return (
    <>
      <Auth
        title="Рады видеть!"
        button="Войти"
        pathBtn="/movies"
        text="Ещё не зарегистрированы?"
        pathLink="/signup"
        link="Регистрация"
      >
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

export default Login;
