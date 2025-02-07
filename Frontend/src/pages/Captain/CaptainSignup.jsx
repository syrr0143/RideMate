import React, { useState } from "react";
import { Button, InputBox, BrandLogo } from "../../components/index.jsx";

import { Link, useNavigate } from "react-router-dom";
import { validateCaptainSignup } from "../../utils/validation.js";
import useFormValidation from "../../hooks/useFormValidation.jsx";
import { captainSignUp } from "../../utils/apiHandling.js";

const CaptainSignup = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const initialState = {
    fullName: "",
    email: "",
    password: "",
    vehicle: {
      color: "",
      vehicleType: "",
      numberPlate: "",
      capacity: 0,
    },
  };
  const { errors, formData, onChange, resetForm, validateForm } =
    useFormValidation(initialState, validateCaptainSignup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    try {
      if (validateForm()) {
        const res = await captainSignUp(formData);
        navigate("/captain-login", { replace: true });
      }
    } catch (error) {
      setApiError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="m-4 ml-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="createAccount"
              className="flex justify-center font-bold text-xl mt-4 mb-4"
            >
              Create Account as Captain
            </label>
            <InputBox
              label={"Full name"}
              name={"fullName"}
              onChange={onChange}
              value={formData.fullName}
              type="text"
              placeholder={"John doe"}
            />
            {errors.fullName && (
              <small className="text-red-500">{errors.fullName}</small>
            )}
            <InputBox
              label={"Email Address"}
              name={"email"}
              onChange={onChange}
              value={formData.email}
              type="text"
              placeholder={"example@gmail.com"}
            />
            {errors.email && (
              <small className="text-red-500">{errors.email}</small>
            )}
            <InputBox
              type="Password"
              name={"password"}
              onChange={onChange}
              value={formData.password}
              label={"Password"}
              placeholder={"password"}
            />
            {errors.password && (
              <small className="text-red-500">{errors.password}</small>
            )}
            {/* Vehicle Type */}
            <select
              className="select select-bordered w-full  mt-4"
              name="vehicle.vehicleType"
              onChange={onChange}
              value={formData.vehicle.vehicleType}
            >
              <option disabled value="">
                What's your vehicle type?
              </option>
              <option>Auto</option>
              <option>Car</option>
              <option>Bike</option>
            </select>
            {errors.vehicleType && (
              <small className="text-red-500">{errors.vehicleType}</small>
            )}
            <InputBox
              label={"Vehicle Color"}
              name={"vehicle.color"}
              onChange={onChange}
              value={formData.vehicle.color}
              type="text"
              placeholder={"White"}
            />
            {errors.color && (
              <small className="text-red-500">{errors.color}</small>
            )}
            <InputBox
              label={"Vehicle Number"}
              name={"vehicle.numberPlate"}
              onChange={onChange}
              value={formData.vehicle.numberPlate}
              type="text"
              placeholder={"XX XX XXXX"}
            />
            {errors.numberPlate && (
              <small className="text-red-500">{errors.numberPlate}</small>
            )}
            <InputBox
              label={"Vehicle Capacity"}
              name={"vehicle.capacity"}
              onChange={onChange}
              value={formData.vehicle.capacity}
              type="number"
              placeholder={"1"}
            />
            {errors.capacity && (
              <small className="text-red-500">{errors.capacity}</small>
            )}
            {apiError && <small className="text-red-500">{apiError}</small>}
            <div className="flex justify-center">
              <Button
                name={"Signup"}
                disabled={loading}
                type={"submit"}
                loading={loading}
                style={"bg-black w-full max-w-xs mt-4 mb-4 text-white"}
              />
            </div>
          </form>
          <small className="flex justify-center">
            Already have an account?{" "}
            <Link to={"/captain-login"} className="font-bold">
              Login
            </Link>
          </small>
        </div>
      </div>
    </>
  );
};
export default CaptainSignup;
