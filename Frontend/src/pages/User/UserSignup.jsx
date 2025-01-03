import React, { useState } from "react";
import { BrandLogo, Button, InputBox } from "../../components/index.jsx";
import { Link, useNavigate } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation.jsx";
import { validateUserSignup } from "../../utils/validation.js";
import { userSignUp } from "../../utils/apiHandling.js";

const UserSignup = () => {
  const initialState = { fullName: "", email: "", password: "" };
  const { formData, errors, onChange, validateForm, resetForm } =
    useFormValidation(initialState, validateUserSignup);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    try {
      if (validateForm()) {
        const res = await userSignUp(formData);
        navigate("/user-login", { replace: true });
      }
    } catch (error) {
      setApiError(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <BrandLogo />
      <div className="m-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="createAccount"
              className="flex justify-center font-bold text-xl mt-4 mb-4"
            >
              Create Account as User
            </label>
            <InputBox
              value={formData.fullName}
              name={"fullName"}
              onChange={onChange}
              label={"Full Name"}
              placeholder={"John Doe"}
            />
            {errors.fullName && (
              <small className="text-red-500">{errors.fullName}</small>
            )}
            <InputBox
              value={formData.email}
              name={"email"}
              type="email"
              onChange={(e) => onChange(e)}
              label={"Email Address"}
              placeholder={"example@gmail.com"}
            />
            {errors.email && (
              <small className="text-red-500">{errors.email}</small>
            )}
            <InputBox
              value={formData.password}
              name={"password"}
              type="password"
              onChange={(e) => onChange(e)}
              label={"Password"}
              placeholder={"Password"}
            />
            {errors.password && (
              <small className="text-red-500">{errors.password}</small>
            )}
            {apiError && <small className="text-red-500">{apiError}</small>}
            <div className="flex justify-center">
              <Button
                type={"submit"}
                disabled={loading}
                loading={loading}
                name={"Signup"}
                style={"bg-black w-full max-w-xs mt-4 mb-4 text-white"}
              />
            </div>
          </form>
          <small className="flex justify-center">
            Already have an account?{" "}
            <Link to={"/user-login"} className="font-bold">
              Login
            </Link>
          </small>
          <Link to={"/signup"} className="flex justify-center">
            <Button
              name={"Continue as Captain"}
              style={"bg-black w-full max-w-xs mt-4 mb-4 text-white"}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
