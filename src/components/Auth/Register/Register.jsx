import Auth from "../Auth";
import Input from "../Input/Input";
import useValidForm from "../../../hooks/use-valid-form";

const Register = ({ isLoading, onRegister }) => {
  const { values, errors, isValid, handleChange, resetForm } = useValidForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values.name, values.email, values.password);
    resetForm(values);
  };

  return (
    <>
      <Auth
        title="Добро пожаловать!"
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
        pathLink="/signin"
        link="Войти"
        onSubmit={handleSubmit}
        name="register"
        autocomplete="off"
        isValid={isValid}
        isLoading={isLoading}
      >
        <Input
          label="Имя"
          type="text"
          name={"name"}
          value={values.name}
          errors={errors.name}
          placeholder="Виталий"
          minLength={2}
          maxLength={30}
          onChange={handleChange}
        />

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

export default Register;
