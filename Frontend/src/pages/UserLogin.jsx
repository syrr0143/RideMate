import React, { useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import BrandLogo from "../components/BrandLogo";
import useFormValidation from "../hooks/useFormValidation.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/validation.js";
import { userLogin } from "../utils/apiHandling.js";

const UserLogin = () => {
  const navigate = useNavigate();
  const { login: AuthLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const initialState = {
    email: "",
    password: "",
  };

  const { errors, formData, onChange, resetForm, validateForm } =
    useFormValidation(initialState, validateLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    try {
      if (validateForm()) {
        const res = await userLogin(formData);
        const token = res.data.user.token;
        AuthLogin(token);
        navigate("/home");
      }
    } catch (error) {
      setApiError(error.response?.data.message);
      console.log("some error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BrandLogo />
      <div className="m-4">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="createAccount"
            className="flex justify-center font-bold text-xl mt-4 mb-4"
          >
            {" "}
            Welcome Back to Ridemate
          </label>
          <InputBox
            value={formData.email}
            onChange={onChange}
            name={"email"}
            label={"Email Address"}
            type="text"
            placeholder={"exmample@gmail.com"}
          />

          {errors.email && (
            <small className="text-red-500">{errors.email}</small>
          )}
          <InputBox
            value={formData.password}
            onChange={onChange}
            name={"password"}
            type="password"
            label={"Password"}
            placeholder={"Paasword"}
          />
          {errors.password && (
            <small className="text-red-500">{errors.password}</small>
          )}
          {apiError && <small className="text-red-500">{apiError}</small>}
          <Button
            type={"submit"}
            disabled={loading}
            name={"Login"}
            loading={loading}
            style={" bg-black w-full max-w-xs mt-4 mb-4 w- text-white"}
          />
        </form>
        <small className="flex justify-center">
          Don't have an account?{" "}
          <Link to={"/user-signup"} className="font-bold ">
            Signup
          </Link>
        </small>
      </div>
    </>
  );
};

export default UserLogin;
