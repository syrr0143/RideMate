import express from "express";
import {
  captainProfile,
  logOutCaptain,
  loginCaptain,
  signUpCaptain,
} from "../controller/captain.controller.js";
import {
  loginInputValidation,
  signUpInputValidation,
} from "../middleware/inputValidatorMiddleware/captainInput.js";
import { authenticate } from "../middleware/captain.middleware.js";
const router = express.Router();

router.post("/signup", signUpInputValidation, signUpCaptain);
router.post("/login", loginInputValidation, loginCaptain);
router.get("/profile", authenticate, captainProfile);
router.post("/logout", authenticate, logOutCaptain);

export default router;
