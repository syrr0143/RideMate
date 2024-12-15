const badRequest = (type) => {
  let badReq = {
    statusCode: 400,
    message: `Missing required field:${type}`,
  };
  return badReq;
};
const signUpInputValidation = (req, res, next) => {
  try {
    const { fullName, email, password, vehicle } = req.body;
    const { color, numberPlate, capacity, vehicleType } = vehicle;

    const requiredFields = {
      email,
      password,
      fullName,
      color,
      numberPlate,
      capacity,
      vehicleType,
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
        case "color":
          if (!value) return next(badRequest("color"));
          break;
        case "numberPlate":
          if (!value) return next(badRequest("numberPlate"));
          break;
        case "capacity":
          if (!value) return next(badRequest("capacity"));
          break;
        case "vehicleType":
          if (!value) return next(badRequest("vehicleType"));
          break;
        default:
          break;
      }
    }

    next();
  } catch (error) {
    return next({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
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
  } catch (error) {
    return next({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
export { signUpInputValidation, loginInputValidation };
