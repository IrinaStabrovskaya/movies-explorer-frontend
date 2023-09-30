import { useState, useCallback } from "react";

const useValidForm = (oldValues = {}, oldErrors = {}, oldValid = false) => {
  const [values, setValues] = useState(oldValues);
  const [errors, setErrors] = useState(oldErrors);
  const [isValid, setIsValid] = useState(oldValid);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    setValues,
    setIsValid,
    handleChange,
    resetForm,
  };
};

export default useValidForm;
