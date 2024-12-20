import React, { useState } from "react";
import useFormValidation from "../../hooks/useFormValidation.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/validation.js";
import { userLogin } from "../../utils/apiHandling.js";
import { Button, InputBox, BrandLogo } from "../../components/index.jsx";

const UserLogin = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
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
        console.log("login user is ", res.data.user.role);
        handleLogin(token);
        navigate("/user/home", { replace: true });
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
