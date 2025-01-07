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
import { cacheControl } from "../middleware/CacheControl.middleware.js";
const router = express.Router();

router.post("/signup", signUpInputValidation, signUpUser);
router.post("/login", loginInputValidation, loginUser);
router.get(
  "/profile",
  authenticate,
  cacheControl({
    maxAge: 180,
  }),
  userProfile
);
router.post("/logout", authenticate, logOutUser);
router.post("/get-token", authenticate, generateNewToken);
// map related routes goes here
router.post(
  "/get-coordinates",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  getCoordinates
);
router.post(
  "/distance-eta",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  getDistanceAndETA
);
router.post(
  "/location-suggestion",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  getSuggestions
);
router.post(
  "/create-ride",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  RideCreateController
);
router.post(
  "/fare-details",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  AllRideFare
);
router.post(
  "/create-order",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  createOrder
);
router.post(
  "/payment-callback",
  authenticate,
  cacheControl({
    maxAge: 60,
  }),
  paymentCallback
);

export default router;
