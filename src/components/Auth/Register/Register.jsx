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
          placeholder="Виталий"
          minLength="2"
          maxLength="30"
        />

        <Input
          label="E-mail"
          type="text"
          name="email"          
          placeholder="pochta@yandex.ru"
        />

        <Input 
          label="Пароль" 
          type="password" 
          name="password"           
          placeholder="••••••••"
          minLength="8" />
      </Auth>
    </>
  );
};

export default Register;
