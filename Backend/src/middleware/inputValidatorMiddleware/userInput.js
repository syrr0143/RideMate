const badRequest = (type) => {
  let badReq = {
    statusCode: 400,
    message: `Missing required field:${type}`,
  };
  return badReq;
};

const signUpInputValidation = (req, res, next) => {
  const { fullName, email, password } = req.body;
  const requiredFields = {
    fullName,
    email,
    password,
  };
  for (const [field, value] of Object.entries(requiredFields)) {
    switch (field) {
      case "email":
        if (!value) return next(badRequest("email"));
        break;
      case "password":
        if (!value) return next(badRequest("password"));
        break;
      case "fullName":
        if (!value) return next(badRequest("fullName"));
        break;
      default:
        break;
    }
  }

  next(); // Proceed to the next middleware/controller if validation passes
};

const loginInputValidation = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const requiredFields = {
      email,
      password,
    };
    for (const [field, value] of Object.entries(requiredFields)) {
      switch (field) {
        case "email":
          if (!value) return next(badRequest("email"));
          break;
        case "password":
          if (!value) return next(badRequest("password"));
          break;
        default:
          break;
      }
    }

    next();
  } catch (error) {}
};
export { signUpInputValidation, loginInputValidation };
