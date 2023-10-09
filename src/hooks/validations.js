//------------------------------------------------------------//
const getFieldClassName = (fieldName, touched, errors, values) => {
  const hasTouched = touched[fieldName];
  const hasError = errors[fieldName];
  const fieldValue = values[fieldName];
  const isNumber = typeof fieldValue === "number" && fieldValue > 0;
  const hasValue =
    (fieldValue !== undefined &&
      fieldValue !== null &&
      fieldValue !== "" &&
      fieldValue.length > 0) ||
    isNumber;

  if (hasTouched || hasValue) {
    return hasError ? "error-input" : "filled-input";
  }
  return "";
};

//extract password for comparrison from values in the app
let passwordValue;
const getFormPassword = (value) => {
  passwordValue = value;
};

const validateField = (name, value) => {
  function ageCalculator(value) {
    const currentDate = new Date();
    const birthDate = new Date(value);

    // Calculate age
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if birthday has not occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--; // Subtract 1 from the calculated age
    }

    return age;
  }
  //SchemaRegex
  const upperCaseRegex = /^(?=.*[A-Z])/;
  const lowerCaseRegex = /^(?=.*[a-z])/;
  const letterRegex = /[a-zA-Z]/g;
  const characterRegex = /^(?=.*[!@#$%^&*])/;
  const numberRegex = /^(?=.*\d)/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  // Test for count of numbers and characters in the value
  // Number of non letters
  const numNonLetters = (value.match(/[^a-zA-Z]/g) || []).length;
  // Number of letters
  const numLetters = (value.match(letterRegex) || []).length;

  let error = "";
  switch (name) {
    case "firstName":
      // Example: firstName should contain only letters
      error =
        value.length < 1
          ? "First name cannot be blank"
          : value.length < 3
          ? "First name must contain at least 3 or more letters"
          : value.length > 20
          ? "Name cannot be more than 20 characters"
          : numberRegex.test(value)
          ? "Name cannot contain numbers"
          : characterRegex.test(value)
          ? "Name cannot contain special characters"
          : "";
      break;

    case "lastName":
      // Example: lastName should contain only letters
      error =
        value.length < 1
          ? "Last name cannot be blank"
          : value.length < 3
          ? "Last name must contain at least 3 or more letters"
          : value.length > 20
          ? "Name cannot be more than 20 characters"
          : numberRegex.test(value)
          ? "Name cannot contain numbers"
          : characterRegex.test(value)
          ? "Name cannot contain special characters"
          : "";
      break;

    case "username":
      // Example: Username should not be blank and not more than 20 characters
      error =
        value.length < 1
          ? "Username cannot be blank"
          : value.length < 3
          ? "Username must contain at least 3 or more letters"
          : value.length > 20
          ? "Username cannot be more than 20 characters"
          : numNonLetters > numLetters
          ? "Username cannot contain more non-letter characters than letters"
          : "";
      break;

    case "birthDate":
      // Validate date using the new function
      error = value = isNaN(Date.parse(value))
        ? "Invalid date"
        : ageCalculator(value) < 18
        ? `You're ${ageCalculator(
            value
          )}! You must be at least 18 years old to sign up.`
        : "";
      break;

    case "email":
      // Example: Email should follow a simple email format
      error =
        value.length < 1
          ? "Email cannot be blank"
          : !emailRegex.test(value)
          ? "Invalid email format"
          : "";
      break;

    case "password":
      // Example: Password should contain at least 8 characters, including uppercase, lowercase, and digits
      error =
        value.length < 1
          ? "Password cannot be blank"
          : !upperCaseRegex.test(value)
          ? "Password must contain at least 1 upper case letter"
          : !lowerCaseRegex.test(value)
          ? "Password must contain at least 1 lower case letter"
          : !characterRegex.test(value)
          ? "Password must contain at least 1 special character"
          : !numberRegex.test(value)
          ? "Password must contain at least 1 number"
          : value.length < 8
          ? "Password must be more than 8 characters"
          : "";
      break;

    case "confirmPassword":
      // Example: Confirmation password should not be blank and should match the password
      error =
        value.length < 1
          ? "Password cannot be blank"
          : value !== passwordValue
          ? "Passwords do not match"
          : "";
      break;

    case "guests":
      // Example: Guests should contain numbers, greater than 1 and less than 11
      error = !numberRegex.test(value)
        ? "Guests must be a number"
        : value < 1
        ? "Guests cannot be less than 1"
        : value > 10
        ? "Guests cannot be more than 10"
        : "";
      break;

    default:
      break;
  }

  return error;
};
//-----------------------------------------------------------//
export { getFieldClassName, validateField, getFormPassword };
