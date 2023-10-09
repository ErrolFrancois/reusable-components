import PropTypes from "prop-types"; // Import PropTypes
import "./formInput.css";

// used 'npm install --save react-icons-kit' to get eye icon
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export function EyeIcon(props) {
  const { passwordVisible, ...inputProps } = props;
  const eyeIcon = passwordVisible ? eye : eyeOff;
  const title = passwordVisible ? "hide password" : "show password";
  return <Icon {...inputProps} icon={eyeIcon} title={title} />;
}

// Define EyeIcon propTypes
EyeIcon.propTypes = {
  // Specify the expected type
  passwordVisible: PropTypes.bool,
};

export function FormInput(props) {
  const {
    label,
    onChange,
    errorMessage,
    passwordVisible,
    togglePasswordVisible,
    ...inputProps
  } = props;
  const passwordType =
    props.type === "password" && passwordVisible ? "text" : props.type;
  switch (props.type) {
    case "password":
      return (
        <div className="inputDiv">
          <label>
            {label}
            {props.required === true && <span className="reqLabel" />}
            <br />
            <input
              {...inputProps}
              type={passwordType}
              onChange={(e) => onChange(e)}
            />
            {props.name === "password" && togglePasswordVisible && (
              <span className="eyeIconOuter" onClick={togglePasswordVisible}>
                <EyeIcon
                  className="eyeIcon"
                  passwordVisible={passwordVisible}
                />
              </span>
            )}
            <span className="error-message">{errorMessage}</span>
          </label>
        </div>
      );
    case "select":
      return (
        <div className="inputDiv">
          <label>
            {label}
            {props.required === true && <span className="reqLabel" />}
            <br />
            <select {...inputProps} onChange={(e) => onChange(e)}>
              {props.options &&
                props.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
            <span className="error-message">{errorMessage}</span>
          </label>
        </div>
      );
    case "radio":
      return (
        <div className="inputDiv">
          {label}
          <div className="radioDiv">
            {props.options.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={props.name} // Ensure the name is the same for all radio buttons in the group
                  value={option.value}
                  checked={inputProps.value === option.value}
                  onChange={onChange}
                />
                {option.label}
              </label>
            ))}
          </div>
          <span className="error-message">{errorMessage}</span>
        </div>
      );
    case "customRadio":
      return (
        <div className="inputDiv">
          {label}
          <div className="radioDiv">
            {props.options.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={props.name} // Ensure the name is the same for all radio buttons in the group
                  value={option.value}
                  checked={inputProps.value === option.value}
                  onChange={onChange}
                  className="hidden"
                />
                <span
                  className={`custom-checkInput ${
                    inputProps.value === option.value ? "checked" : ""
                  }`}
                />
                {option.label}
              </label>
            ))}
          </div>
          <span className="error-message">{errorMessage}</span>
        </div>
      );
    case "checkbox":
      return (
        <div className="inputDiv">
          <div className="checkboxDiv">
            <label>
              <input
                {...inputProps}
                type="checkbox"
                checked={inputProps.checked}
                onChange={onChange}
              />
              {label}
            </label>
            <span className="error-message">{errorMessage}</span>
          </div>
        </div>
      );
    case "customCheckbox":
      return (
        <div className="inputDiv">
          <div className="checkboxDiv">
            <label>
              <input
                {...inputProps}
                type="checkbox"
                checked={inputProps.checked}
                onChange={onChange}
                className="hidden"
              />
              <span
                className={`custom-checkInput ${
                  inputProps.value ? "checked" : ""
                }`}
              ></span>
              {label}
            </label>
            <span className="error-message">{errorMessage}</span>
          </div>
        </div>
      );
    case "textarea":
      return (
        <div className="inputDiv comment">
          <label className="textArea">
            {label}
            {props.required === true && <span className="reqLabel" />}
            <br />
            <textarea
              {...inputProps}
              type={props.type}
              onChange={(e) => onChange(e)}
            />
            <span className="error-message">{errorMessage}</span>
          </label>
        </div>
      );
    default:
      return (
        <div className="inputDiv">
          <label>
            {label}
            {props.required === true && <span className="reqLabel" />}
            <br />
            <input
              {...inputProps}
              type={props.type}
              onChange={(e) => onChange(e)}
            />
            <span className="error-message">{errorMessage}</span>
          </label>
        </div>
      );
  }
}

// Define propTypes for your component
FormInput.propTypes = {
  // Specify the expected type
  placeholder: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  newType: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  passwordVisible: PropTypes.bool,
  togglePasswordVisible: PropTypes.func,
  iconClassName: PropTypes.string,
  selectedValue: PropTypes.string,
};
