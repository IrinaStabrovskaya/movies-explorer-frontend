import "./Input.css";
//import useValidForm from "../../../hooks/use-valid-form";

const Input = ({ label, name, value,  errors, minLength, maxLength, placeholder, type, onChange }) => {
  //const { handleChange } = useValidForm();
  return (
    <>
      <label className="input__input-label" htmlFor={name}>{label}</label>
      <input
        className={
          name === "password"
            ? "input__input input__input_color"
            : "input__input"
        }
        type={type}
        name={name}  
        value={value}   
        placeholder={placeholder || null}
        minLength={minLength || null}
        maxLength={maxLength || null}
        required 
        onChange={onChange}   
      />
      <span className="input__input-message">{errors}</span>
      
    </>
  );
};

export default Input;
