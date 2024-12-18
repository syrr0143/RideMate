import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import LandingPage from "./pages/LandingPage";
import SignupOption from "./pages/SignupOption";
import LocationConsent from "./pages/LocationConsent";
import Forbidden from "./pages/ForbiddenPage";
import {
  ProtectedRoute,
  LoggedInProtectedRoute,
} from "./components/AuthWrapper/ProtectedRoute";
import ChoseVehicle from "./pages/ChoseVehicle";
import ConfirmRide from "./pages/ConfirmRide";
import FindTrip from "./components/FindTrip";
import DriverAssigned from "./components/DriverAssigned";
import MakePayment from "./components/MakePayment";
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<LoggedInProtectedRoute element={<LandingPage />} />}
        />
        <Route
          path="/signup"
          element={<LoggedInProtectedRoute element={<SignupOption />} />}
        />
        <Route
          path="/user-login"
          element={<LoggedInProtectedRoute element={<UserLogin />} />}
        />
        <Route
          path="/user-signup"
          element={<LoggedInProtectedRoute element={<UserSignup />} />}
        />
        <Route
          path="/captain-login"
          element={<LoggedInProtectedRoute element={<CaptainLogin />} />}
        />
        <Route
          path="/captain-signup"
          element={<LoggedInProtectedRoute element={<CaptainSignup />} />}
        />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route element={<ProtectedRoute allowedRoles={["captain", "user"]} />}>
          <Route path="/home" element={<Home />}>
            <Route index element={<FindTrip />} />
            <Route path="chose-vehicle" element={<ChoseVehicle />} />
            <Route path="confirm-ride" element={<ConfirmRide />} />
            <Route path="driver-assigned" element={<DriverAssigned />} />
            <Route path="make-payment" element={<MakePayment />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
