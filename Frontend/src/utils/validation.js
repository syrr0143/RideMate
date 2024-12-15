const validateUserSignup = (data) => {
  const errors = {};
  if (!data.fullName.trim()) {
    errors.fullName = "Full Name is required";
  }
  if (data.fullName.length < 3) {
    errors.fullName = "Full Name should be at least 3 char long";
  }
  if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
};
const validateLogin = (data) => {
  const errors = {};

  if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (data.password.length < 6) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
};

const validateCaptainSignup = (data) => {
  const errors = {};
  if (!data.fullName.trim()) {
    errors.fullName = "Full Name is required";
  }
  if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (data.password.length < 6) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
};

export { validateUserSignup, validateCaptainSignup, validateLogin };
