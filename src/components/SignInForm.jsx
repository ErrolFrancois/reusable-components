import { useState } from "react";
import { FormInput } from "./elementComponents/FormInputs";
import {
  getFieldClassName,
  getFormPassword,
  validateField,
} from "../hooks/validations";

const SignInForm = () => {
  const initialFormValues = {
    username: "",
    password: "",
  };

  const formHeader = "Sign-in Form";

  const formInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "username",
      title: "username",
      errorMessage: "",
      label: "Username",
      autoComplete: "true",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "password",
      title: "password",
      errorMessage: "",
      label: "Password",
      autoComplete: "true",
      required: true,
    },
  ];

  const [formValues, setFormValues] = useState(initialFormValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = async () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const getFieldClass = (name) => {
    const classValue = getFieldClassName(name, touched, errors, formValues);
    return classValue;
  };

  const checkErrors = (name, value) => {
    // Mark field as touched
    setTouched({ ...touched, [name]: true });
    // Validate field
    name === "confirmPassword" && getFormPassword(formValues.password);
    const error = validateField(name, value);
    // Update errors state
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    type === "checkbox"
      ? setFormValues({ ...formValues, [name]: checked })
      : setFormValues({ ...formValues, [name]: value });
    checkErrors(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    checkErrors(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div className="signUpForm">
      <form onSubmit={handleSubmit}>
        <h1>{formHeader}</h1>
        {formInputs &&
          formInputs.map((formInput) => (
            <div key={formInput.id}>
              <FormInput
                {...formInput}
                value={formValues[formInput.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getFieldClass(formInput.name)}
                passwordVisible={passwordVisible}
                togglePasswordVisible={togglePasswordVisible}
                iconClassName="eyeIcon"
                errorMessage={errors[formInput.name] || ""}
              />
            </div>
          ))}
        <button className="button lg">Submit</button>
      </form>
    </div>
  );
};

export default SignInForm;
