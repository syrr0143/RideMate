import express from "express";
import {
  captainProfile,
  logOutCaptain,
  loginCaptain,
  signUpCaptain,
} from "../controller/captain.controller.js";
import {
  confirmRideByCaptain,
  getAllRideAvailable,
  confirmRideByOtp,
  finishRide,
} from "../controller/Ride.controller.js";
import {
  loginInputValidation,
  signUpInputValidation,
} from "../middleware/inputValidatorMiddleware/captainInput.js";
import { authenticate } from "../middleware/captain.middleware.js";
const router = express.Router();

router.post("/signup", signUpInputValidation, signUpCaptain);
router.post("/login", loginInputValidation, loginCaptain);
router.get(
  "/profile",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  captainProfile
);
router.post("/logout", authenticate, logOutCaptain);
router.post(
  "/confirm-ride",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  confirmRideByCaptain
);
router.get(
  "/available-rides",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  getAllRideAvailable
);
router.post(
  "/confirm-otp",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  confirmRideByOtp
);
router.post(
  "/finish-ride",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  finishRide
);

export default router;
