export default function LoginValidate(formData) {
  let errors = {};
  const { email, password } = formData;

  if (!email) {
    errors.email = "Email is required";
  } else if (!/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/.test(email)) {
    errors.email = "Invalid email";
  } else if (!password) {
    errors.password = "Password is required";
  }
  return errors;
}
