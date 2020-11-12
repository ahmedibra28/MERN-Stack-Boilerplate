export default function ChangePasswordValidate(formData) {
  let errors = {};
  const { password, password2 } = formData;

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password =
      "Minimum length of the password must be equal or greater than 6 characters";
  } else if (!password2) {
    errors.password2 = "Confirm Password is required";
  } else if (password !== password2) {
    errors.password2 = "Password and Confirm Password does not match";
  }
  return errors;
}
