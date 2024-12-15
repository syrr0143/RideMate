import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    return hashedPassword;
  } catch (error) {
    console.log("error hashing the password");
    // throw new AppError("Error hashing password: " + error.message);
    return next({
      statusCode: 500,
      message: "server error",
    });
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log("error comparing the password");
    // throw new AppError("Error comapring password: " + error.message);
    return next({
      statusCode: 500,
      message: `Error comapring password: ${error.message}`,
    });
  }
};

export { hashPassword, comparePassword };
