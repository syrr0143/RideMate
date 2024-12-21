const badRequest = (type) => {
  let badReq = {
    statusCode: 400,
    message: `Missing required field:${type}`,
  };
  return badReq;
};

const AllFareInputValidation = async (req, res, next) => {
  try {
    const { source, destination } = req.body;
    const requiredFields = {
      source,
      destination,
    };
    for (const [field, value] of Object.entries(requiredFields)) {
      switch (field) {
        case "source":
          if (!value) return next(badRequest("source"));
          break;
        case "destination":
          if (!value) return next(badRequest("destination"));
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

export { AllFareInputValidation };
