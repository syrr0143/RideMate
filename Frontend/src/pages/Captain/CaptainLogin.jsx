import React, { useState } from "react";
import { Button, InputBox, BrandLogo } from "../../components/index.jsx";
import { Link, useNavigate } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation.jsx";
import { validateLogin } from "../../utils/validation.js";
import { captainLogin } from "../../utils/apiHandling.js";
import useAuth from "../../hooks/useAuth.jsx";

const CaptainLogin = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };

  const { errors, formData, onChange, resetForm, validateForm } =
    useFormValidation(initialState, validateLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);
    try {
      if (validateForm()) {
        const res = await captainLogin(formData);
        const token = res.data.captain.token;
        handleLogin(token);
        navigate("/captain/home", { replace: true });
      }
    } catch (error) {
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="m-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="createAccount"
              className="flex justify-center font-bold text-xl mt-4 mb-4"
            >
              Welcome Back to Ridemate, Captain!
            </label>
            <InputBox
              value={formData.email}
              name={"email"}
              onChange={onChange}
              label={"Email Address"}
              placeholder={"example@gmail.com"}
            />
            {errors.email && (
              <small className="text-red-500">{errors.email}</small>
            )}
            <InputBox
              value={formData.password}
              name={"password"}
              onChange={onChange}
              type="password"
              label={"Password"}
              placeholder={". . . . . ."}
            />
            {errors.password && (
              <small className="text-red-500">{errors.password}</small>
            )}
            {apiError && <small className="text-red-500">{apiError}</small>}
            <div className="flex justify-center">
              <Button
                name={"Login"}
                disabled={loading}
                type={"submit"}
                loading={loading}
                style={"bg-black w-full max-w-xs mt-4 mb-4 text-white"}
              />
            </div>
          </form>
          <small className="flex justify-center">
            Don't have an account?{" "}
            <Link to={"/captain-signup"} className="font-bold">
              Signup
            </Link>
          </small>
          <Link to={"/signup"} className="flex justify-center">
            <Button
              name={"Continue as User"}
              style={"bg-black w-full max-w-xs mt-4 mb-4 text-white"}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CaptainLogin;
