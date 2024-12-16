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
import ProtectedRoute from "./components/AuthWrapper/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupOption />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route element={<ProtectedRoute allowedRoles={["captain", "user"]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/location-consent" element={<LocationConsent />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
