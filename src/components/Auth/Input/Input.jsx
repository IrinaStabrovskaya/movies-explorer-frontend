import "./Input.css";

const Input = (props) => {
  return (
    <>
      <label className="input__input-label">{props.label}</label>
      <input
        className={
          props.name === "password"
            ? "input__input input__input_color"
            : "input__input"
        }
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
      />
      <span className="input__input-span">Что-то пошло не так...</span>
    </>
  );
};

export default Input;
