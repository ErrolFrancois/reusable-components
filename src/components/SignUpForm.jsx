import { useState } from "react";
import { FormInput } from "./elementComponents/FormInputs";
import {
  getFieldClassName,
  getFormPassword,
  validateField,
} from "../hooks/validations";

const SignUpForm = () => {
  const initialFormValues = {
    username: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    choice: "choice1",
    acceptTerms: "",
    comment: "",
  };

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
      id: 2,
      name: "email",
      type: "email",
      placeholder: "email address",
      title: "email address",
      errorMessage: "",
      label: "Email",
      autoComplete: "true",
      required: true,
    },
    {
      id: 3,
      name: "birthDate",
      type: "date",
      placeholder: "date of birth",
      title: "date of birth",
      errorMessage: "",
      label: "Birth Date",
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
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "confirm password",
      title: "repeat your password",
      errorMessage: "",
      label: "Confirm Password",
      required: true,
    },
    {
      id: 6,
      name: "choice",
      type: "customRadio",
      placeholder: "",
      title: "choose by selecting a checkbox",
      errorMessage: "",
      label: "Choose between choice 1 or choice 2",
      options: [
        { value: "choice1", label: "Choice 1" },
        { value: "choice2", label: "Choice 2" },
      ],
    },
    {
      id: 7,
      name: "acceptTerms",
      type: "customCheckbox",
      value: "checked",
      placeholder: "",
      title: "accept terms",
      errorMessage: "",
      label: "Accept terms",
      required: true,
    },
    {
      id: 8,
      name: "comment",
      type: "textarea",
      placeholder: "Write your comment here",
      title: "Write your comment here",
      errorMessage: "",
      label: "Comment",
      autoComplete: "off",
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
        <h1>Form</h1>
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
                errorMessage={errors[formInput.name] || ""}
              />
            </div>
          ))}
        <button className="button lg">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
