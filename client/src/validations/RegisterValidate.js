export default function RegisterValidate(formData) {
  let errors = {};
  const { name, email, password, password2, role } = formData;

  if (!name) {
    errors.name = "Name is required";
  } else if (!email) {
    errors.email = "Email is required";
  } else if (!/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/.test(email)) {
    errors.email = "Invalid email";
  } else if (!role) {
    errors.role = "Role is required";
  } else if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password =
      "Minimum length of the password must be equal or greater than 8 characters";
  } else if (!password2) {
    errors.password2 = "Confirm Password is required";
  } else if (password !== password2) {
    errors.password2 = "Password and Confirm Password does not match";
  }
  return errors;
}
