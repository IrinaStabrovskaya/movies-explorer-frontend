import Auth from "../Auth";
import Input from "../Input/Input";
import useValidForm from "../../../hooks/use-valid-form";

const Login = ({ isLoading, onAuthorization }) => {
  const { values, errors, isValid, handleChange, resetForm } = useValidForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAuthorization(values.email, values.password);
    console.log(values.email, values.password);
    resetForm();
  };
  return (
    <>
      <Auth
        title="Рады видеть!"
        button="Войти"
        text="Ещё не зарегистрированы?"
        pathLink="/signup"
        link="Регистрация"
        onSubmit={handleSubmit}
        name="authorization"
        autocomplete="off"
        isValid={isValid}
        isLoading={isLoading}
      >
        <Input
          label="E-mail"
          type="email"
          name={"email"}
          value={values.email}
          errors={errors.email}
          placeholder="pochta@yandex.ru"
          onChange={handleChange}
        />

        <Input
          label="Пароль"
          type="password"
          name={"password"}
          value={values.password}
          errors={errors.password}
          placeholder="••••••••"
          minLength={8}
          onChange={handleChange}
        />
      </Auth>
    </>
  );
};

export default Login;
