// screens nay de check valid cua man hinh login, logout
import validator from "is_js";

const checkEmpty = (val, key) => {
  if (validator.empty(val.trim())) {
    return `${key}`;
  } else {
    return "";
  }
};

const checkMinLength = (val, minLength, key) => {
  if (val.trim().length < minLength) {
    return `Please enter ${key}`;
  } else {
    return "";
  }
};
export default function (data) {
  const { name, email, password, password_confirmation } = data;

  if (name !== undefined) {
    let emtyValidationText = checkEmpty(name, "Please enter your user name");

    if (emtyValidationText !== "") {
      return emtyValidationText;
    } else {
      let minLengthValidation = checkMinLength(name, 3, "name");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }
  if (email !== undefined) {
    let emtyValidationText = checkEmpty(email, "Please enter your email");

    if (emtyValidationText !== "") {
      return emtyValidationText;
    } else {
      if (!validator.email(email)) {
        return "Please enter valid email";
      }
    }
  }
  if (password !== undefined) {
    let emtyValidationText = checkEmpty(password, "Please enter your password");

    if (emtyValidationText !== "") {
      return emtyValidationText;
    } else {
      let minLengthValidation = checkMinLength(password, 3, "password");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }
  if (password_confirmation !== undefined) {
    let emtyValidationText = checkEmpty(
      password_confirmation,
      "Please enter your password"
    );

    if (emtyValidationText !== "") {
      return emtyValidationText;
    } else {
      let minLengthValidation = checkMinLength(
        password_confirmation,
        3,
        "password"
      );
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }
}
