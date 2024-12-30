import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  UserLogin,
  UserSignup,
  CaptainLogin,
  CaptainSignup,
  LandingPage,
  SignupOption,
  LocationConsent,
  Forbidden,
} from "./pages/index.jsx";

import {
  ProtectedRoute,
  LoggedInProtectedRoute,
} from "./components/AuthWrapper/ProtectedRoute";

import {
  ChoseVehicle,
  ConfirmRide,
  FindTrip,
  DriverAssigned,
  MakePayment,
} from "./components/index.jsx";

import LiveTracking from "./pages/Common/LiveTrackinng.jsx";

import DashBoard from "./components/Captain_Component/DashBoard.jsx";

import CaptainHome from "./pages/Captain/CaptainHome.jsx";
import ReachUserLocation from "./pages/Captain/ReachUserLocation.jsx";
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
        <Route path="/location-consent" element={<LocationConsent />} />
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/home" element={<Home />}>
            <Route index element={<FindTrip />} />
            <Route path="chose-vehicle" element={<ChoseVehicle />} />
            <Route path="confirm-ride" element={<ConfirmRide />} />
            <Route path="driver-assigned" element={<DriverAssigned />} />
            <Route path="make-payment" element={<MakePayment />} />
          </Route>
          <Route path="/user/live-track" element={<LiveTracking />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["captain"]} />}>
          <Route path="/captain/home" element={<CaptainHome />}>
            <Route index element={<DashBoard />} />
          </Route>
          <Route path="/captain/live-track" element={<LiveTracking />} />
          <Route
            path="/captain/reach-user-location"
            element={<ReachUserLocation />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
