import express from "express";
import {
  signUpUser,
  loginUser,
  userProfile,
  logOutUser,
  generateNewToken,
} from "../controller/user.controller.js";
import {
  RideCreateController,
  AllRideFare,
} from "../controller/Ride.controller.js";
import {
  createOrder,
  paymentCallback,
} from "../controller/payment.controller.js";
import {
  getCoordinates,
  getDistanceAndETA,
  getSuggestions,
} from "../controller/map.controller.js";
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
router.post("/get-token", authenticate, generateNewToken);
// map related routes goes here
router.post("/get-coordinates", authenticate, getCoordinates);
router.post("/distance-eta", authenticate, getDistanceAndETA);
router.post("/location-suggestion", authenticate, getSuggestions);
router.post("/create-ride", authenticate, RideCreateController);
router.post("/fare-details", authenticate, AllRideFare);
router.post("/create-order", authenticate, createOrder);
router.post("/payment-callback", authenticate, paymentCallback);

export default router;
