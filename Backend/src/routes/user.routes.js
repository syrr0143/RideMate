import express from "express";
import {
  signUpUser,
  loginUser,
  userProfile,
  logOutUser,
} from "../controller/user.controller.js";
import {
  signUpInputValidation,
  loginInputValidation,
} from "../middleware/inputValidatorMiddleware/userInput.js";
import { authenticate } from "../middleware/user.middleware.js";
const router = express.Router();

router.post("/signup", signUpInputValidation, signUpUser);
router.post("/login", loginInputValidation, loginUser);
router.get("/profile", authenticate, userProfile);
router.post("/logout", authenticate, logOutUser);

export default router;
